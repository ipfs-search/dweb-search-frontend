// loosely adapted from: https://github.com/AnthumChris/fetch-progress-indicators/blob/master/fetch-enhanced/supported-browser.js

/**
 * class Doggy
 * fetches an object, keeping track of its downloaded progress
 *
 * methods:
 * @fetch(input,options,{mimetype}) call fetch with input, either request or url
 * @cancel() abort current fetch operation
 *
 * @onComplete(func) add event hook on complete
 * @onCancel(func) add event hook on cancel being called
 * @onProgress(func) add event hook on download progress
 * @onError(func) add event hook on Error event
 * @on(func) add event on one of these. Returns Symbol to id the hook.
 * @off(id) destroys all hooks, or a target hook given by id
 // N.b., not all hooks have been properly tested!
 *
 * properties:
 * @progress current state of fetch progress
 * @total total file size
 * @blob the output blob of the file
 * @objectURL local URL pointing to aforementioned blob
 *
 * N.b. these properties are normal public properties so that Vue can make them reactive
 */
export default class FetchDoggy {
  constructor() {
    this.progress = 0;
    this.total = undefined;
    this.objectURL = undefined;
    this.controller = new AbortController();
    this.hooks = {
      progress: {},
      complete: {},
      cancel: {},
      error: {},
    };
  }

  // mimic native fetch() instantiation and return Promise
  fetch(input, init = {}, extraOptions = { mimetype: "application/pdf" }) {
    const request = input instanceof Request ? input : new Request(input);
    const { signal } = this.controller;
    return fetch(request, { signal, ...init })
      .then((response) => {
        if (!response.body) {
          throw Error("ReadableStream is not yet supported in this browser.");
        }

        if (!response.ok) {
          // HTTP error server response
          const error = Error(`Server responded ${response.status} ${response.statusText}`);
          this.callHooks("error", error);
          throw error;
        }

        // to access headers, server must send CORS header
        // "Access-Control-Expose-Headers: content-encoding, content-length x-file-size"
        // server must send custom x-file-size header if gzip or other content-encoding is used
        const contentLength = response.headers.get(
          response.headers.get("content-encoding") ? "x-file-size" : "content-length"
        );

        // don't evaluate download progress if we can't compare against a total size
        if (contentLength === null) throw Error("Response size header unavailable");

        this.total = parseInt(contentLength, 10);
        this.onProgress((amount) => {
          this.progress += amount;
        });

        // ensure onProgress called when content-length=0
        if (this.total === 0) {
          this.callHooks("progress");
          this.callHooks("complete");
        }

        const responseReader = response.body.getReader();
        const callHooks = this.callHooks.bind(this);

        return new Response(
          new ReadableStream({
            async start(controller) {
              if (signal.aborted) {
                controller.close();
                await responseReader.cancel();
              }
              async function read() {
                let done = false;
                let value;
                while (!done) {
                  ({ value, done } = await responseReader.read());
                  if (done) break;
                  callHooks("progress", value.byteLength);
                  controller.enqueue(value);
                }
                callHooks("complete");
                controller.close();
              }
              await read().catch((error) => {
                controller(error);
                callHooks("error");
              });
            },
          })
        );
      })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => new Blob([arrayBuffer], { type: extraOptions.mimetype }))
      .then((blob) => {
        if (this.progress === this.total) {
          this.objectURL = window.URL.createObjectURL(blob);
        }
      });
  }

  cancel() {
    this.total = undefined;
    this.progress = 0;
    this.controller.abort();
    this.callHooks("cancel");
  }

  /**
   * add hook
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param hook
   * @param func
   * @returns {symbol}
   */
  on(hook, func) {
    if (typeof func !== "function") {
      throw Error(`trying to set non-function on ${hook} hook`);
    }
    if (!Object.prototype.hasOwnProperty.call(this.hooks, hook)) {
      throw Error(`hook unavailable: ${hook}`);
    }
    const s = Symbol(hook);
    this.hooks[hook][s] = func;
    return s;
  }

  /**
   * add hook to fetch completed event
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param func: () => <any>
   * @returns {symbol}
   */
  onComplete(func) {
    return this.on("complete", func);
  }

  /**
   * add hook to fetch cancel event
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param func: () => <any>
   * @returns {symbol}
   */
  onCancel(func) {
    return this.on("cancel", func);
  }

  /**
   * add hook to progress updates.
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param func: () => <any>
   * @returns {symbol}
   */
  onProgress(func) {
    return this.on("progress", func);
  }

  /**
   * add hook to error event
   * Returns the identifier symbol of the hook, for removing the hooks
   * @param func: (error: Error) => <any>
   * @returns {symbol}
   */
  onError(func) {
    return this.on("error", func);
  }

  /**
   * destroy a specific hook or all hooks.
   * @param target <Symbol> hook to be destroyed. If undefined, destroys all hooks.
   */
  off(target) {
    Reflect.ownKeys(this.hooks).forEach((hook) => {
      Reflect.ownKeys(this.hooks[hook]).forEach((s) => {
        if (target === s || target === undefined) delete this.hooks[hook][s];
      });
    });
  }

  callHooks(hook, ...args) {
    Reflect.ownKeys(this.hooks[hook]).forEach((s) => this.hooks[hook][s](...args));
  }
}
