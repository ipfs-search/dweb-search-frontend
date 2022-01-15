// adapted/copied from: https://github.com/AnthumChris/fetch-progress-indicators/blob/master/fetch-enhanced/supported-browser.js

// TODO: add pause function

export default class GoldenRetriever {
  /**
   * add hook
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param hook
   * @param func
   * @returns {symbol}
   */
  on(hook, func) {
    if (typeof func !== 'function') {
      throw Error(`trying to set non-function on ${hook} hook`);
    }
    if (!Object.prototype.hasOwnProperty.call(this.#hooks, hook)) {
      throw Error(`hook unavailable: ${hook}`);
    }

    const s = Symbol(hook);
    this.#hooks[hook][s] = func;
    return s
  }

  /**
   * add hook to fetch completed event
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param func: () => <any>
   * @returns {symbol}
   */
  onComplete(func) {
    return this.on('complete', func);
  }

  /**
   * add hook to fetch cancel event
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param func: () => <any>
   * @returns {symbol}
   */
  onCancel(func) {
    return this.on('cancel', func);
  }

  /**
   * add hook to progress updates.
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param func: ({loaded: Number, total: Number}) => <any>
   * @returns {symbol}
   */
  onProgress(func) {
    return this.on('progress', func);
  }

  /**
   * add hook to error event
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param func: (error: Error) => <any>
   * @returns {symbol}
   */
  onError(func) {
    return this.on('error', func);
  }

  /**
   * destroy a specific hook or all hooks.
   * @param target <Symbol> hook to be destroyed. If undefined, destroys all hooks.
   */
  off(target) {
    Reflect.ownKeys(this.#hooks).forEach((hook) => {
      Reflect.ownKeys(this.#hooks[hook]).forEach((s) => {
        if (target === s || target === undefined) delete this.#hooks[hook][s];
      });
    });
  }

  /**
   * support for multiple hooks and different hooks
   */
  #hooks = {
    progress: {},
    complete: {},
    cancel: {},
    error: {},
  };

  #callHooks(hook, ...args) {
    Reflect.ownKeys(this.#hooks[hook]).forEach((s) => this.#hooks[hook][s](...args));
  }

  #reader;

  #cancelRequested;

  // mimic native fetch() instantiation and return Promise
  fetch(input, init = {}) {
    const request = (input instanceof Request) ? input : new Request(input);
    this.#cancelRequested = false;

    return fetch(request, init)
      .then((response) => {
        if (!response.body) {
          throw Error('ReadableStream is not yet supported in this browser.  <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">More Info</a>');
        }

        // this occurs if cancel() was called before server responded
        // (before fetch() Promise resolved)
        if (this.#cancelRequested) {
          return response.body.getReader()
            .cancel()
            .then(() => {
              const error = Error('cancel requested before server responded.');
              this.#callHooks('error', error);
              return Promise.reject(error);
            });
        }

        if (!response.ok) {
          // HTTP error server response
          const error = Error(`Server responded ${response.status} ${response.statusText}`);
          this.#callHooks('error', error);
          throw error;
        }

        // to access headers, server must send CORS header
        // "Access-Control-Expose-Headers: content-encoding, content-length x-file-size"
        // server must send custom x-file-size header if gzip or other content-encoding is used
        const contentEncoding = response.headers.get('content-encoding');
        // eslint-disable-next-line max-len
        const contentLength = response.headers.get(contentEncoding ? 'x-file-size' : 'content-length');
        if (contentLength === null) {
          // don't evaluate download progress if we can't compare against a total size
          throw Error('Response size header unavailable');
        }

        const total = parseInt(contentLength, 10);
        let loaded = 0;

        this.#reader = response.body.getReader();

        const me = this;

        return new Response(
          new ReadableStream({
            start(controller) {
              if (me.#cancelRequested) {
                me.#callHooks('cancel', {
                  loaded,
                  total,
                });
                controller.close();
              }

              function read() {
                me.#reader.read()
                  .then(({
                    done,
                    value,
                  }) => {
                    if (done) {
                      // ensure onProgress called when content-length=0
                      if (total === 0) {
                        me.#callHooks('progress', {
                          loaded,
                          total,
                        });
                      }

                      me.#callHooks('complete');
                      controller.close();
                      return;
                    }

                    loaded += value.byteLength;
                    me.#callHooks('progress', {
                      loaded,
                      total,
                    });
                    controller.enqueue(value);
                    // TODO: change this recursive function for loop or generator
                    read();
                  })
                  .catch((error) => {
                    me.#callHooks('error', error);
                    controller.error(error);
                  });
              }

              read();
            },
          }),
        );
      });
  }

  cancel() {
    this.#cancelRequested = true;
    if (this.#reader) {
      return this.#reader.cancel();
    }
    return Promise.resolve();
  }
}
