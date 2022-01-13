// adapted/copied from: https://github.com/AnthumChris/fetch-progress-indicators/blob/master/fetch-enhanced/supported-browser.js

// TODO: add pause function

export default class ProgressFetcher {
  /**
   * add hook to progress updates.
   * Returns the identifier symbol of the ook, for future implementation of removing the hooks
   * @param func
   * @returns {symbol}
   */
  onProgress(func) {
    if (typeof func !== 'function') throw Error('trying to set non-function on hook');

    const s = Symbol('progress');
    this.#hooks.progress[s] = func;
    return s;
  }

  /**
   * support for multiple hooks and different hooks
   * for future implementation of onReady and onError hooks
   */
  #hooks = {
    progress: {},
  };

  #callHooks(hook, ...args) {
    console.log(this.#hooks[hook], args);
    Reflect.ownKeys(this.#hooks[hook]).forEach((s) => this.#hooks[hook][s](...args));
  }

  #reader;

  #cancelRequested;

  // mimic native fetch() instantiation and return Promise
  fetch(input, init = {}) {
    const request = (input instanceof Request) ? input : new Request(input);
    this.#cancelRequested = false;

    return fetch(request, init).then((response) => {
      if (!response.body) {
        throw Error('ReadableStream is not yet supported in this browser.  <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">More Info</a>');
      }

      // this occurs if cancel() was called before server responded
      // (before fetch() Promise resolved)
      if (this.#cancelRequested) {
        return response.body.getReader().cancel()
          .then(() => {
            throw Error('cancel requested before server responded.');
          });
      }

      if (!response.ok) {
        // HTTP error server response
        throw Error(`Server responded ${response.status} ${response.statusText}`);
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
              // console.log('canceling read');
              controller.close();
              return;
            }

            function read() {
              me.#reader.read().then(({ done, value }) => {
                if (done) {
                  // ensure onProgress called when content-length=0
                  if (total === 0) {
                    // me.onProgress.call(me, { loaded, total });
                    me.#callHooks('progress', { loaded, total });
                  }

                  controller.close();
                  return;
                }

                loaded += value.byteLength;
                me.#callHooks('progress', { loaded, total });
                controller.enqueue(value);
                read();
              }).catch((error) => {
                console.error(error);
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
    // console.log('download cancel requested.');
    this.#cancelRequested = true;
    if (this.#reader) {
      // console.log('cancelling current download');
      return this.#reader.cancel();
    }
    return Promise.resolve();
  }
}
