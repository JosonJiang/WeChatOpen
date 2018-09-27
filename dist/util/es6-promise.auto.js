'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.ES6Promise = factory();
})(undefined, function () {
    'use strict';

    function objectOrFunction(x) {
        var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
        return x !== null && (type === 'object' || type === 'function');
    }

    function isFunction(x) {
        return typeof x === 'function';
    }

    var _isArray = void 0;
    if (Array.isArray) {
        _isArray = Array.isArray;
    } else {
        _isArray = function _isArray(x) {
            return Object.prototype.toString.call(x) === '[object Array]';
        };
    }

    var isArray = _isArray;

    var len = 0;
    var vertxNext = void 0;
    var customSchedulerFn = void 0;

    var asap = function asap(callback, arg) {
        queue[len] = callback;
        queue[len + 1] = arg;
        len += 2;
        if (len === 2) {
            // If len is 2, that means that we need to schedule an async flush.
            // If additional callbacks are queued before the queue is flushed, they
            // will be processed by this flush that we are scheduling.
            if (customSchedulerFn) {
                customSchedulerFn(flush);
            } else {
                scheduleFlush();
            }
        }
    };

    function setScheduler(scheduleFn) {
        customSchedulerFn = scheduleFn;
    }

    function setAsap(asapFn) {
        asap = asapFn;
    }

    var browserWindow = typeof window !== 'undefined' ? window : undefined;
    var browserGlobal = browserWindow || {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

    // node
    function useNextTick() {
        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
        // see https://github.com/cujojs/when/issues/410 for details
        return function () {
            return process.nextTick(flush);
        };
    }

    // vertx
    function useVertxTimer() {
        if (typeof vertxNext !== 'undefined') {
            return function () {
                vertxNext(flush);
            };
        }

        return useSetTimeout();
    }

    function useMutationObserver() {
        var iterations = 0;
        var observer = new BrowserMutationObserver(flush);
        var node = document.createTextNode('');
        observer.observe(node, {
            characterData: true
        });

        return function () {
            node.data = iterations = ++iterations % 2;
        };
    }

    // web worker
    function useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = flush;
        return function () {
            return channel.port2.postMessage(0);
        };
    }

    function useSetTimeout() {
        // Store setTimeout reference so es6-promise will be unaffected by
        // other code modifying setTimeout (like sinon.useFakeTimers())
        var globalSetTimeout = setTimeout;
        return function () {
            return globalSetTimeout(flush, 1);
        };
    }

    var queue = new Array(1000);

    function flush() {
        for (var i = 0; i < len; i += 2) {
            var callback = queue[i];
            var arg = queue[i + 1];

            callback(arg);

            queue[i] = undefined;
            queue[i + 1] = undefined;
        }

        len = 0;
    }

    function attemptVertx() {
        try {
            var vertx = Function('return this')().require('vertx');
            vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return useVertxTimer();
        } catch (e) {
            return useSetTimeout();
        }
    }

    var scheduleFlush = void 0;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (isNode) {
        scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
    } else if (isWorker) {
        scheduleFlush = useMessageChannel();
    } else if (browserWindow === undefined && typeof require === 'function') {
        scheduleFlush = attemptVertx();
    } else {
        scheduleFlush = useSetTimeout();
    }

    function then(onFulfillment, onRejection) {
        var parent = this;

        var child = new this.constructor(noop);

        if (child[PROMISE_ID] === undefined) {
            makePromise(child);
        }

        var _state = parent._state;

        if (_state) {
            var callback = arguments[_state - 1];
            asap(function () {
                return invokeCallback(_state, child, callback, parent._result);
            });
        } else {
            subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
    }

    /**
      `Promise.resolve` returns a promise that will become resolved with the
      passed `value`. It is shorthand for the following:
      ```javascript
      let promise = new Promise(function(resolve, reject){
        resolve(1);
      });
      promise.then(function(value){
        // value === 1
      });
      ```
      Instead of writing the above, your code now simply becomes the following:
      ```javascript
      let promise = Promise.resolve(1);
      promise.then(function(value){
        // value === 1
      });
      ```
      @method resolve
      @static
      @param {Any} value value that the returned promise will be resolved with
      Useful for tooling.
      @return {Promise} a promise that will become fulfilled with the given
      `value`
    */
    function resolve$1(object) {
        /*jshint validthis:true */
        var Constructor = this;

        if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
            return object;
        }

        var promise = new Constructor(noop);
        resolve(promise, object);
        return promise;
    }

    var PROMISE_ID = Math.random().toString(36).substring(2);

    function noop() {}

    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    var TRY_CATCH_ERROR = {
        error: null
    };

    function selfFulfillment() {
        return new TypeError("You cannot resolve a promise with itself");
    }

    function cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
    }

    function getThen(promise) {
        try {
            return promise.then;
        } catch (error) {
            TRY_CATCH_ERROR.error = error;
            return TRY_CATCH_ERROR;
        }
    }

    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
        try {
            then$$1.call(value, fulfillmentHandler, rejectionHandler);
        } catch (e) {
            return e;
        }
    }

    function handleForeignThenable(promise, thenable, then$$1) {
        asap(function (promise) {
            var sealed = false;
            var error = tryThen(then$$1, thenable, function (value) {
                if (sealed) {
                    return;
                }
                sealed = true;
                if (thenable !== value) {
                    resolve(promise, value);
                } else {
                    fulfill(promise, value);
                }
            }, function (reason) {
                if (sealed) {
                    return;
                }
                sealed = true;

                reject(promise, reason);
            }, 'Settle: ' + (promise._label || ' unknown promise'));

            if (!sealed && error) {
                sealed = true;
                reject(promise, error);
            }
        }, promise);
    }

    function handleOwnThenable(promise, thenable) {
        if (thenable._state === FULFILLED) {
            fulfill(promise, thenable._result);
        } else if (thenable._state === REJECTED) {
            reject(promise, thenable._result);
        } else {
            subscribe(thenable, undefined, function (value) {
                return resolve(promise, value);
            }, function (reason) {
                return reject(promise, reason);
            });
        }
    }

    function handleMaybeThenable(promise, maybeThenable, then$$1) {
        if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
            handleOwnThenable(promise, maybeThenable);
        } else {
            if (then$$1 === TRY_CATCH_ERROR) {
                reject(promise, TRY_CATCH_ERROR.error);
                TRY_CATCH_ERROR.error = null;
            } else if (then$$1 === undefined) {
                fulfill(promise, maybeThenable);
            } else if (isFunction(then$$1)) {
                handleForeignThenable(promise, maybeThenable, then$$1);
            } else {
                fulfill(promise, maybeThenable);
            }
        }
    }

    function resolve(promise, value) {
        if (promise === value) {
            reject(promise, selfFulfillment());
        } else if (objectOrFunction(value)) {
            handleMaybeThenable(promise, value, getThen(value));
        } else {
            fulfill(promise, value);
        }
    }

    function publishRejection(promise) {
        if (promise._onerror) {
            promise._onerror(promise._result);
        }

        publish(promise);
    }

    function fulfill(promise, value) {
        if (promise._state !== PENDING) {
            return;
        }

        promise._result = value;
        promise._state = FULFILLED;

        if (promise._subscribers.length !== 0) {
            asap(publish, promise);
        }
    }

    function reject(promise, reason) {
        if (promise._state !== PENDING) {
            return;
        }
        promise._state = REJECTED;
        promise._result = reason;

        asap(publishRejection, promise);
    }

    function subscribe(parent, child, onFulfillment, onRejection) {
        var _subscribers = parent._subscribers;
        var length = _subscribers.length;

        parent._onerror = null;

        _subscribers[length] = child;
        _subscribers[length + FULFILLED] = onFulfillment;
        _subscribers[length + REJECTED] = onRejection;

        if (length === 0 && parent._state) {
            asap(publish, parent);
        }
    }

    function publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;

        if (subscribers.length === 0) {
            return;
        }

        var child = void 0,
            callback = void 0,
            detail = promise._result;

        for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];

            if (child) {
                invokeCallback(settled, child, callback, detail);
            } else {
                callback(detail);
            }
        }

        promise._subscribers.length = 0;
    }

    function tryCatch(callback, detail) {
        try {
            return callback(detail);
        } catch (e) {
            TRY_CATCH_ERROR.error = e;
            return TRY_CATCH_ERROR;
        }
    }

    function invokeCallback(settled, promise, callback, detail) {
        var hasCallback = isFunction(callback),
            value = void 0,
            error = void 0,
            succeeded = void 0,
            failed = void 0;

        if (hasCallback) {
            value = tryCatch(callback, detail);

            if (value === TRY_CATCH_ERROR) {
                failed = true;
                error = value.error;
                value.error = null;
            } else {
                succeeded = true;
            }

            if (promise === value) {
                reject(promise, cannotReturnOwn());
                return;
            }
        } else {
            value = detail;
            succeeded = true;
        }

        if (promise._state !== PENDING) {
            // noop
        } else if (hasCallback && succeeded) {
            resolve(promise, value);
        } else if (failed) {
            reject(promise, error);
        } else if (settled === FULFILLED) {
            fulfill(promise, value);
        } else if (settled === REJECTED) {
            reject(promise, value);
        }
    }

    function initializePromise(promise, resolver) {
        try {
            resolver(function resolvePromise(value) {
                resolve(promise, value);
            }, function rejectPromise(reason) {
                reject(promise, reason);
            });
        } catch (e) {
            reject(promise, e);
        }
    }

    var id = 0;

    function nextId() {
        return id++;
    }

    function makePromise(promise) {
        promise[PROMISE_ID] = id++;
        promise._state = undefined;
        promise._result = undefined;
        promise._subscribers = [];
    }

    function validationError() {
        return new Error('Array Methods must be provided an Array');
    }

    var Enumerator = function () {
        function Enumerator(Constructor, input) {
            this._instanceConstructor = Constructor;
            this.promise = new Constructor(noop);

            if (!this.promise[PROMISE_ID]) {
                makePromise(this.promise);
            }

            if (isArray(input)) {
                this.length = input.length;
                this._remaining = input.length;

                this._result = new Array(this.length);

                if (this.length === 0) {
                    fulfill(this.promise, this._result);
                } else {
                    this.length = this.length || 0;
                    this._enumerate(input);
                    if (this._remaining === 0) {
                        fulfill(this.promise, this._result);
                    }
                }
            } else {
                reject(this.promise, validationError());
            }
        }

        Enumerator.prototype._enumerate = function _enumerate(input) {
            for (var i = 0; this._state === PENDING && i < input.length; i++) {
                this._eachEntry(input[i], i);
            }
        };

        Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
            var c = this._instanceConstructor;
            var resolve$$1 = c.resolve;

            if (resolve$$1 === resolve$1) {
                var _then = getThen(entry);

                if (_then === then && entry._state !== PENDING) {
                    this._settledAt(entry._state, i, entry._result);
                } else if (typeof _then !== 'function') {
                    this._remaining--;
                    this._result[i] = entry;
                } else if (c === Promise$2) {
                    var promise = new c(noop);
                    handleMaybeThenable(promise, entry, _then);
                    this._willSettleAt(promise, i);
                } else {
                    this._willSettleAt(new c(function (resolve$$1) {
                        return resolve$$1(entry);
                    }), i);
                }
            } else {
                this._willSettleAt(resolve$$1(entry), i);
            }
        };

        Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
            var promise = this.promise;

            if (promise._state === PENDING) {
                this._remaining--;

                if (state === REJECTED) {
                    reject(promise, value);
                } else {
                    this._result[i] = value;
                }
            }

            if (this._remaining === 0) {
                fulfill(promise, this._result);
            }
        };

        Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
            var enumerator = this;

            subscribe(promise, undefined, function (value) {
                return enumerator._settledAt(FULFILLED, i, value);
            }, function (reason) {
                return enumerator._settledAt(REJECTED, i, reason);
            });
        };

        return Enumerator;
    }();

    /**
      `Promise.all` accepts an array of promises, and returns a new promise which
      is fulfilled with an array of fulfillment values for the passed promises, or
      rejected with the reason of the first passed promise to be rejected. It casts all
      elements of the passed iterable to promises as it runs this algorithm.
      Example:
      ```javascript
      let promise1 = resolve(1);
      let promise2 = resolve(2);
      let promise3 = resolve(3);
      let promises = [ promise1, promise2, promise3 ];
      Promise.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```
      If any of the `promises` given to `all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:
      Example:
      ```javascript
      let promise1 = resolve(1);
      let promise2 = reject(new Error("2"));
      let promise3 = reject(new Error("3"));
      let promises = [ promise1, promise2, promise3 ];
      Promise.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```
      @method all
      @static
      @param {Array} entries array of promises
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
      @static
    */
    function all(entries) {
        return new Enumerator(this, entries).promise;
    }

    /**
      `Promise.race` returns a new promise which is settled in the same way as the
      first passed promise to settle.
      Example:
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 2');
        }, 100);
      });
      Promise.race([promise1, promise2]).then(function(result){
        // result === 'promise 2' because it was resolved before promise1
        // was resolved.
      });
      ```
      `Promise.race` is deterministic in that only the state of the first
      settled promise matters. For example, even if other promises given to the
      `promises` array argument are resolved, but the first settled promise has
      become rejected before the other promises became fulfilled, the returned
      promise will become rejected:
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error('promise 2'));
        }, 100);
      });
      Promise.race([promise1, promise2]).then(function(result){
        // Code here never runs
      }, function(reason){
        // reason.message === 'promise 2' because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```
      An example real-world use case is implementing timeouts:
      ```javascript
      Promise.race([ajax('foo.json'), timeout(5000)])
      ```
      @method race
      @static
      @param {Array} promises array of promises to observe
      Useful for tooling.
      @return {Promise} a promise which settles in the same way as the first passed
      promise to settle.
    */
    function race(entries) {
        /*jshint validthis:true */
        var Constructor = this;

        if (!isArray(entries)) {
            return new Constructor(function (_, reject) {
                return reject(new TypeError('You must pass an array to race.'));
            });
        } else {
            return new Constructor(function (resolve, reject) {
                var length = entries.length;
                for (var i = 0; i < length; i++) {
                    Constructor.resolve(entries[i]).then(resolve, reject);
                }
            });
        }
    }

    /**
      `Promise.reject` returns a promise rejected with the passed `reason`.
      It is shorthand for the following:
      ```javascript
      let promise = new Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
      Instead of writing the above, your code now simply becomes the following:
      ```javascript
      let promise = Promise.reject(new Error('WHOOPS'));
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
      @method reject
      @static
      @param {Any} reason value that the returned promise will be rejected with.
      Useful for tooling.
      @return {Promise} a promise rejected with the given `reason`.
    */
    function reject$1(reason) {
        /*jshint validthis:true */
        var Constructor = this;
        var promise = new Constructor(noop);
        reject(promise, reason);
        return promise;
    }

    function needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.
      Terminology
      -----------
      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.
      A promise can be in one of three states: pending, fulfilled, or rejected.
      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.
      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.
      Basic Usage:
      ------------
      ```js
      let promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);
        // on failure
        reject(reason);
      });
      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
      Advanced Usage:
      ---------------
      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.
      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();
          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }
      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
      Unlike callbacks, promises are great composable primitives.
      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON
        return values;
      });
      ```
      @class Promise
      @param {Function} resolver
      Useful for tooling.
      @constructor
    */

    var Promise$2 = function () {
        function Promise(resolver) {
            this[PROMISE_ID] = nextId();
            this._result = this._state = undefined;
            this._subscribers = [];

            if (noop !== resolver) {
                typeof resolver !== 'function' && needsResolver();
                this instanceof Promise ? initializePromise(this, resolver) : needsNew();
            }
        }

        /**
        The primary way of interacting with a promise is through its `then` method,
        which registers callbacks to receive either a promise's eventual value or the
        reason why the promise cannot be fulfilled.
         ```js
        findUser().then(function(user){
          // user is available
        }, function(reason){
          // user is unavailable, and you are given the reason why
        });
        ```
         Chaining
        --------
         The return value of `then` is itself a promise.  This second, 'downstream'
        promise is resolved with the return value of the first promise's fulfillment
        or rejection handler, or rejected if the handler throws an exception.
         ```js
        findUser().then(function (user) {
          return user.name;
        }, function (reason) {
          return 'default name';
        }).then(function (userName) {
          // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
          // will be `'default name'`
        });
         findUser().then(function (user) {
          throw new Error('Found user, but still unhappy');
        }, function (reason) {
          throw new Error('`findUser` rejected and we're unhappy');
        }).then(function (value) {
          // never reached
        }, function (reason) {
          // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
          // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
        });
        ```
        If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
         ```js
        findUser().then(function (user) {
          throw new PedagogicalException('Upstream error');
        }).then(function (value) {
          // never reached
        }).then(function (value) {
          // never reached
        }, function (reason) {
          // The `PedgagocialException` is propagated all the way down to here
        });
        ```
         Assimilation
        ------------
         Sometimes the value you want to propagate to a downstream promise can only be
        retrieved asynchronously. This can be achieved by returning a promise in the
        fulfillment or rejection handler. The downstream promise will then be pending
        until the returned promise is settled. This is called *assimilation*.
         ```js
        findUser().then(function (user) {
          return findCommentsByAuthor(user);
        }).then(function (comments) {
          // The user's comments are now available
        });
        ```
         If the assimliated promise rejects, then the downstream promise will also reject.
         ```js
        findUser().then(function (user) {
          return findCommentsByAuthor(user);
        }).then(function (comments) {
          // If `findCommentsByAuthor` fulfills, we'll have the value here
        }, function (reason) {
          // If `findCommentsByAuthor` rejects, we'll have the reason here
        });
        ```
         Simple Example
        --------------
         Synchronous Example
         ```javascript
        let result;
         try {
          result = findResult();
          // success
        } catch(reason) {
          // failure
        }
        ```
         Errback Example
         ```js
        findResult(function(result, err){
          if (err) {
            // failure
          } else {
            // success
          }
        });
        ```
         Promise Example;
         ```javascript
        findResult().then(function(result){
          // success
        }, function(reason){
          // failure
        });
        ```
         Advanced Example
        --------------
         Synchronous Example
         ```javascript
        let author, books;
         try {
          author = findAuthor();
          books  = findBooksByAuthor(author);
          // success
        } catch(reason) {
          // failure
        }
        ```
         Errback Example
         ```js
         function foundBooks(books) {
         }
         function failure(reason) {
         }
         findAuthor(function(author, err){
          if (err) {
            failure(err);
            // failure
          } else {
            try {
              findBoooksByAuthor(author, function(books, err) {
                if (err) {
                  failure(err);
                } else {
                  try {
                    foundBooks(books);
                  } catch(reason) {
                    failure(reason);
                  }
                }
              });
            } catch(error) {
              failure(err);
            }
            // success
          }
        });
        ```
         Promise Example;
         ```javascript
        findAuthor().
          then(findBooksByAuthor).
          then(function(books){
            // found books
        }).catch(function(reason){
          // something went wrong
        });
        ```
         @method then
        @param {Function} onFulfilled
        @param {Function} onRejected
        Useful for tooling.
        @return {Promise}
        */

        /**
        `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
        as the catch block of a try/catch statement.
        ```js
        function findAuthor(){
        throw new Error('couldn't find that author');
        }
        // synchronous
        try {
        findAuthor();
        } catch(reason) {
        // something went wrong
        }
        // async with promises
        findAuthor().catch(function(reason){
        // something went wrong
        });
        ```
        @method catch
        @param {Function} onRejection
        Useful for tooling.
        @return {Promise}
        */

        Promise.prototype.catch = function _catch(onRejection) {
            return this.then(null, onRejection);
        };

        /**
          `finally` will be invoked regardless of the promise's fate just as native
          try/catch/finally behaves
        
          Synchronous example:
        
          ```js
          findAuthor() {
            if (Math.random() > 0.5) {
              throw new Error();
            }
            return new Author();
          }
        
          try {
            return findAuthor(); // succeed or fail
          } catch(error) {
            return findOtherAuther();
          } finally {
            // always runs
            // doesn't affect the return value
          }
          ```
        
          Asynchronous example:
        
          ```js
          findAuthor().catch(function(reason){
            return findOtherAuther();
          }).finally(function(){
            // author was either found, or not
          });
          ```
        
          @method finally
          @param {Function} callback
          @return {Promise}
        */

        Promise.prototype.finally = function _finally(callback) {
            var promise = this;
            var constructor = promise.constructor;

            return promise.then(function (value) {
                return constructor.resolve(callback()).then(function () {
                    return value;
                });
            }, function (reason) {
                return constructor.resolve(callback()).then(function () {
                    throw reason;
                });
            });
        };

        return Promise;
    }();

    Promise$2.prototype.then = then;
    Promise$2.all = all;
    Promise$2.race = race;
    Promise$2.resolve = resolve$1;
    Promise$2.reject = reject$1;
    Promise$2._setScheduler = setScheduler;
    Promise$2._setAsap = setAsap;
    Promise$2._asap = asap;

    /*global self*/
    function polyfill() {
        var local = void 0;

        if (typeof global !== 'undefined') {
            local = global;
        } else if (typeof self !== 'undefined') {
            local = self;
        } else {
            try {
                local = Function('return this')();
            } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
            }
        }

        var P = local.Promise;

        if (P) {
            var promiseToString = null;
            try {
                promiseToString = Object.prototype.toString.call(P.resolve());
            } catch (e) {
                // silently ignored
            }

            if (promiseToString === '[object Promise]' && !P.cast) {
                return;
            }
        }

        local.Promise = Promise$2;
    }

    // Strange compat..
    Promise$2.polyfill = polyfill;
    Promise$2.Promise = Promise$2;

    Promise$2.polyfill();

    return Promise$2;
});

//# sourceMappingURL=es6-promise.auto.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi1wcm9taXNlLmF1dG8uanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJFUzZQcm9taXNlIiwib2JqZWN0T3JGdW5jdGlvbiIsIngiLCJ0eXBlIiwiaXNGdW5jdGlvbiIsIl9pc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwibGVuIiwidmVydHhOZXh0IiwiY3VzdG9tU2NoZWR1bGVyRm4iLCJhc2FwIiwiY2FsbGJhY2siLCJhcmciLCJxdWV1ZSIsImZsdXNoIiwic2NoZWR1bGVGbHVzaCIsInNldFNjaGVkdWxlciIsInNjaGVkdWxlRm4iLCJzZXRBc2FwIiwiYXNhcEZuIiwiYnJvd3NlcldpbmRvdyIsIndpbmRvdyIsInVuZGVmaW5lZCIsImJyb3dzZXJHbG9iYWwiLCJCcm93c2VyTXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJXZWJLaXRNdXRhdGlvbk9ic2VydmVyIiwiaXNOb2RlIiwic2VsZiIsInByb2Nlc3MiLCJpc1dvcmtlciIsIlVpbnQ4Q2xhbXBlZEFycmF5IiwiaW1wb3J0U2NyaXB0cyIsIk1lc3NhZ2VDaGFubmVsIiwidXNlTmV4dFRpY2siLCJuZXh0VGljayIsInVzZVZlcnR4VGltZXIiLCJ1c2VTZXRUaW1lb3V0IiwidXNlTXV0YXRpb25PYnNlcnZlciIsIml0ZXJhdGlvbnMiLCJvYnNlcnZlciIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZVRleHROb2RlIiwib2JzZXJ2ZSIsImNoYXJhY3RlckRhdGEiLCJkYXRhIiwidXNlTWVzc2FnZUNoYW5uZWwiLCJjaGFubmVsIiwicG9ydDEiLCJvbm1lc3NhZ2UiLCJwb3J0MiIsInBvc3RNZXNzYWdlIiwiZ2xvYmFsU2V0VGltZW91dCIsInNldFRpbWVvdXQiLCJpIiwiYXR0ZW1wdFZlcnR4IiwidmVydHgiLCJGdW5jdGlvbiIsInJlcXVpcmUiLCJydW5Pbkxvb3AiLCJydW5PbkNvbnRleHQiLCJlIiwidGhlbiIsIm9uRnVsZmlsbG1lbnQiLCJvblJlamVjdGlvbiIsInBhcmVudCIsImNoaWxkIiwiY29uc3RydWN0b3IiLCJub29wIiwiUFJPTUlTRV9JRCIsIm1ha2VQcm9taXNlIiwiX3N0YXRlIiwiYXJndW1lbnRzIiwiaW52b2tlQ2FsbGJhY2siLCJfcmVzdWx0Iiwic3Vic2NyaWJlIiwicmVzb2x2ZSQxIiwib2JqZWN0IiwiQ29uc3RydWN0b3IiLCJwcm9taXNlIiwicmVzb2x2ZSIsIk1hdGgiLCJyYW5kb20iLCJzdWJzdHJpbmciLCJQRU5ESU5HIiwiRlVMRklMTEVEIiwiUkVKRUNURUQiLCJUUllfQ0FUQ0hfRVJST1IiLCJlcnJvciIsInNlbGZGdWxmaWxsbWVudCIsIlR5cGVFcnJvciIsImNhbm5vdFJldHVybk93biIsImdldFRoZW4iLCJ0cnlUaGVuIiwidGhlbiQkMSIsInZhbHVlIiwiZnVsZmlsbG1lbnRIYW5kbGVyIiwicmVqZWN0aW9uSGFuZGxlciIsImhhbmRsZUZvcmVpZ25UaGVuYWJsZSIsInRoZW5hYmxlIiwic2VhbGVkIiwiZnVsZmlsbCIsInJlYXNvbiIsInJlamVjdCIsIl9sYWJlbCIsImhhbmRsZU93blRoZW5hYmxlIiwiaGFuZGxlTWF5YmVUaGVuYWJsZSIsIm1heWJlVGhlbmFibGUiLCJwdWJsaXNoUmVqZWN0aW9uIiwiX29uZXJyb3IiLCJwdWJsaXNoIiwiX3N1YnNjcmliZXJzIiwibGVuZ3RoIiwic3Vic2NyaWJlcnMiLCJzZXR0bGVkIiwiZGV0YWlsIiwidHJ5Q2F0Y2giLCJoYXNDYWxsYmFjayIsInN1Y2NlZWRlZCIsImZhaWxlZCIsImluaXRpYWxpemVQcm9taXNlIiwicmVzb2x2ZXIiLCJyZXNvbHZlUHJvbWlzZSIsInJlamVjdFByb21pc2UiLCJpZCIsIm5leHRJZCIsInZhbGlkYXRpb25FcnJvciIsIkVycm9yIiwiRW51bWVyYXRvciIsImlucHV0IiwiX2luc3RhbmNlQ29uc3RydWN0b3IiLCJfcmVtYWluaW5nIiwiX2VudW1lcmF0ZSIsIl9lYWNoRW50cnkiLCJlbnRyeSIsImMiLCJyZXNvbHZlJCQxIiwiX3RoZW4iLCJfc2V0dGxlZEF0IiwiUHJvbWlzZSQyIiwiX3dpbGxTZXR0bGVBdCIsInN0YXRlIiwiZW51bWVyYXRvciIsImFsbCIsImVudHJpZXMiLCJyYWNlIiwiXyIsInJlamVjdCQxIiwibmVlZHNSZXNvbHZlciIsIm5lZWRzTmV3IiwiUHJvbWlzZSIsImNhdGNoIiwiX2NhdGNoIiwiZmluYWxseSIsIl9maW5hbGx5IiwiX3NldFNjaGVkdWxlciIsIl9zZXRBc2FwIiwiX2FzYXAiLCJwb2x5ZmlsbCIsImxvY2FsIiwiUCIsInByb21pc2VUb1N0cmluZyIsImNhc3QiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7QUFRQyxXQUFVQSxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQjtBQUN4QixZQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQW5CLElBQStCLE9BQU9DLE1BQVAsS0FBa0IsV0FBakQsR0FBK0RBLE9BQU9ELE9BQVAsR0FBaUJELFNBQWhGLEdBQ0ksT0FBT0csTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsT0FBT0MsR0FBdkMsR0FBNkNELE9BQU9ILE9BQVAsQ0FBN0MsR0FDS0QsT0FBT00sVUFBUCxHQUFvQkwsU0FGN0I7QUFHSCxDQUpBLGFBSVEsWUFBWTtBQUNqQjs7QUFFQSxhQUFTTSxnQkFBVCxDQUEwQkMsQ0FBMUIsRUFBNkI7QUFDekIsWUFBSUMsY0FBY0QsQ0FBZCx5Q0FBY0EsQ0FBZCxDQUFKO0FBQ0EsZUFBT0EsTUFBTSxJQUFOLEtBQWVDLFNBQVMsUUFBVCxJQUFxQkEsU0FBUyxVQUE3QyxDQUFQO0FBQ0g7O0FBRUQsYUFBU0MsVUFBVCxDQUFvQkYsQ0FBcEIsRUFBdUI7QUFDbkIsZUFBTyxPQUFPQSxDQUFQLEtBQWEsVUFBcEI7QUFDSDs7QUFJRCxRQUFJRyxXQUFXLEtBQUssQ0FBcEI7QUFDQSxRQUFJQyxNQUFNQyxPQUFWLEVBQW1CO0FBQ2ZG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LENBRUUsT0FBT25CLENBQVAsRUFBVTtBQUNSO0FBQ0g7O0FBRUQsZ0JBQUlvRyxvQkFBb0Isa0JBQXBCLElBQTBDLENBQUNELEVBQUVFLElBQWpELEVBQXVEO0FBQ25EO0FBQ0g7QUFDSjs7QUFFREgsY0FBTVQsT0FBTixHQUFnQlgsU0FBaEI7QUFDSDs7QUFFRDtBQUNBQSxjQUFVbUIsUUFBVixHQUFxQkEsUUFBckI7QUFDQW5CLGNBQVVXLE9BQVYsR0FBb0JYLFNBQXBCOztBQUVBQSxjQUFVbUIsUUFBVjs7QUFFQSxXQUFPbkIsU0FBUDtBQUVILENBcG1DQSxDQUFEOztBQXdtQ0EiLCJmaWxlIjoiZXM2LXByb21pc2UuYXV0by5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXHJcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE0IFllaHVkYSBLYXR6LCBUb20gRGFsZSwgU3RlZmFuIFBlbm5lciBhbmQgY29udHJpYnV0b3JzIChDb252ZXJzaW9uIHRvIEVTNiBBUEkgYnkgSmFrZSBBcmNoaWJhbGQpXHJcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcclxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3N0ZWZhbnBlbm5lci9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxyXG4gKiBAdmVyc2lvbiAgIHY0LjIuNCszMTRlNDgzMVxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XHJcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XHJcbiAgICAgICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcclxuICAgICAgICAgICAgKGdsb2JhbC5FUzZQcm9taXNlID0gZmFjdG9yeSgpKTtcclxufSh0aGlzLCAoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9iamVjdE9yRnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHg7XHJcbiAgICAgICAgcmV0dXJuIHggIT09IG51bGwgJiYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHZhciBfaXNBcnJheSA9IHZvaWQgMDtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KSB7XHJcbiAgICAgICAgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNBcnJheSA9IF9pc0FycmF5O1xyXG5cclxuICAgIHZhciBsZW4gPSAwO1xyXG4gICAgdmFyIHZlcnR4TmV4dCA9IHZvaWQgMDtcclxuICAgIHZhciBjdXN0b21TY2hlZHVsZXJGbiA9IHZvaWQgMDtcclxuXHJcbiAgICB2YXIgYXNhcCA9IGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xyXG4gICAgICAgIHF1ZXVlW2xlbl0gPSBjYWxsYmFjaztcclxuICAgICAgICBxdWV1ZVtsZW4gKyAxXSA9IGFyZztcclxuICAgICAgICBsZW4gKz0gMjtcclxuICAgICAgICBpZiAobGVuID09PSAyKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cclxuICAgICAgICAgICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcclxuICAgICAgICAgICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYnkgdGhpcyBmbHVzaCB0aGF0IHdlIGFyZSBzY2hlZHVsaW5nLlxyXG4gICAgICAgICAgICBpZiAoY3VzdG9tU2NoZWR1bGVyRm4pIHtcclxuICAgICAgICAgICAgICAgIGN1c3RvbVNjaGVkdWxlckZuKGZsdXNoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNjaGVkdWxlRmx1c2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcclxuICAgICAgICBjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0QXNhcChhc2FwRm4pIHtcclxuICAgICAgICBhc2FwID0gYXNhcEZuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBicm93c2VyV2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbiAgICB2YXIgYnJvd3Nlckdsb2JhbCA9IGJyb3dzZXJXaW5kb3cgfHwge307XHJcbiAgICB2YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xyXG4gICAgdmFyIGlzTm9kZSA9IHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xyXG5cclxuICAgIC8vIHRlc3QgZm9yIHdlYiB3b3JrZXIgYnV0IG5vdCBpbiBJRTEwXHJcbiAgICB2YXIgaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgIC8vIG5vZGVcclxuICAgIGZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xyXG4gICAgICAgIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxyXG4gICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3Vqb2pzL3doZW4vaXNzdWVzLzQxMCBmb3IgZGV0YWlsc1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHZlcnR4XHJcbiAgICBmdW5jdGlvbiB1c2VWZXJ0eFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmVydHhOZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmVydHhOZXh0KGZsdXNoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcclxuICAgICAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBub2RlLmRhdGEgPSBpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMjtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlYiB3b3JrZXJcclxuICAgIGZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XHJcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVzZVNldFRpbWVvdXQoKSB7XHJcbiAgICAgICAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gZXM2LXByb21pc2Ugd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XHJcbiAgICAgICAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXHJcbiAgICAgICAgdmFyIGdsb2JhbFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxTZXRUaW1lb3V0KGZsdXNoLCAxKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmbHVzaCgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xyXG4gICAgICAgICAgICB2YXIgYXJnID0gcXVldWVbaSArIDFdO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2soYXJnKTtcclxuXHJcbiAgICAgICAgICAgIHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBxdWV1ZVtpICsgMV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZW4gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGF0dGVtcHRWZXJ0eCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgdmVydHggPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpLnJlcXVpcmUoJ3ZlcnR4Jyk7XHJcbiAgICAgICAgICAgIHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VWZXJ0eFRpbWVyKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlU2V0VGltZW91dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2NoZWR1bGVGbHVzaCA9IHZvaWQgMDtcclxuICAgIC8vIERlY2lkZSB3aGF0IGFzeW5jIG1ldGhvZCB0byB1c2UgdG8gdHJpZ2dlcmluZyBwcm9jZXNzaW5nIG9mIHF1ZXVlZCBjYWxsYmFja3M6XHJcbiAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgICAgc2NoZWR1bGVGbHVzaCA9IHVzZU5leHRUaWNrKCk7XHJcbiAgICB9IGVsc2UgaWYgKEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XHJcbiAgICAgICAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcclxuICAgIH0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcclxuICAgICAgICBzY2hlZHVsZUZsdXNoID0gdXNlTWVzc2FnZUNoYW5uZWwoKTtcclxuICAgIH0gZWxzZSBpZiAoYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgc2NoZWR1bGVGbHVzaCA9IGF0dGVtcHRWZXJ0eCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcclxuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XHJcblxyXG4gICAgICAgIGlmIChjaGlsZFtQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG1ha2VQcm9taXNlKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfc3RhdGUgPSBwYXJlbnQuX3N0YXRlO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKF9zdGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbX3N0YXRlIC0gMV07XHJcbiAgICAgICAgICAgIGFzYXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludm9rZUNhbGxiYWNrKF9zdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCBwYXJlbnQuX3Jlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgIGBQcm9taXNlLnJlc29sdmVgIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZWNvbWUgcmVzb2x2ZWQgd2l0aCB0aGVcclxuICAgICAgcGFzc2VkIGB2YWx1ZWAuIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcclxuICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgcmVzb2x2ZSgxKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgICAgLy8gdmFsdWUgPT09IDFcclxuICAgICAgfSk7XHJcbiAgICAgIGBgYFxyXG4gICAgICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XHJcbiAgICAgIGBgYGphdmFzY3JpcHRcclxuICAgICAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoMSk7XHJcbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgICAgLy8gdmFsdWUgPT09IDFcclxuICAgICAgfSk7XHJcbiAgICAgIGBgYFxyXG4gICAgICBAbWV0aG9kIHJlc29sdmVcclxuICAgICAgQHN0YXRpY1xyXG4gICAgICBAcGFyYW0ge0FueX0gdmFsdWUgdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGhcclxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxyXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSBmdWxmaWxsZWQgd2l0aCB0aGUgZ2l2ZW5cclxuICAgICAgYHZhbHVlYFxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlc29sdmUkMShvYmplY3QpIHtcclxuICAgICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XHJcbiAgICAgICAgcmVzb2x2ZShwcm9taXNlLCBvYmplY3QpO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBQUk9NSVNFX0lEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5vb3AoKSB7IH1cclxuXHJcbiAgICB2YXIgUEVORElORyA9IHZvaWQgMDtcclxuICAgIHZhciBGVUxGSUxMRUQgPSAxO1xyXG4gICAgdmFyIFJFSkVDVEVEID0gMjtcclxuXHJcbiAgICB2YXIgVFJZX0NBVENIX0VSUk9SID0ge1xyXG4gICAgICAgIGVycm9yOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGZGdWxmaWxsbWVudCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2Fubm90UmV0dXJuT3duKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGhlbihwcm9taXNlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbjtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBUUllfQ0FUQ0hfRVJST1IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgcmV0dXJuIFRSWV9DQVRDSF9FUlJPUjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJ5VGhlbih0aGVuJCQxLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhlbiQkMS5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSwgdGhlbiQkMSkge1xyXG4gICAgICAgIGFzYXAoZnVuY3Rpb24gKHByb21pc2UpIHtcclxuICAgICAgICAgICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSB0cnlUaGVuKHRoZW4kJDEsIHRoZW5hYmxlLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWFsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlYWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlYWxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XHJcbiAgICAgICAgICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgc2VhbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBwcm9taXNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSkge1xyXG4gICAgICAgIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xyXG4gICAgICAgICAgICBmdWxmaWxsKHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xyXG4gICAgICAgICAgICByZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJDEpIHtcclxuICAgICAgICBpZiAobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3RvciA9PT0gcHJvbWlzZS5jb25zdHJ1Y3RvciAmJiB0aGVuJCQxID09PSB0aGVuICYmIG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gcmVzb2x2ZSQxKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGVuJCQxID09PSBUUllfQ0FUQ0hfRVJST1IpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCBUUllfQ0FUQ0hfRVJST1IuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgVFJZX0NBVENIX0VSUk9SLmVycm9yID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGVuJCQxID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGVuJCQxKSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCBzZWxmRnVsZmlsbG1lbnQoKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xyXG4gICAgICAgICAgICBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlLCBnZXRUaGVuKHZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xyXG4gICAgICAgIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1Ymxpc2gocHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xyXG4gICAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9taXNlLl9yZXN1bHQgPSB2YWx1ZTtcclxuICAgICAgICBwcm9taXNlLl9zdGF0ZSA9IEZVTEZJTExFRDtcclxuXHJcbiAgICAgICAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBhc2FwKHB1Ymxpc2gsIHByb21pc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XHJcbiAgICAgICAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvbWlzZS5fc3RhdGUgPSBSRUpFQ1RFRDtcclxuICAgICAgICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XHJcblxyXG4gICAgICAgIGFzYXAocHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIF9zdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IF9zdWJzY3JpYmVycy5sZW5ndGg7XHJcblxyXG5cclxuICAgICAgICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xyXG5cclxuICAgICAgICBfc3Vic2NyaWJlcnNbbGVuZ3RoXSA9IGNoaWxkO1xyXG4gICAgICAgIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcclxuICAgICAgICBfc3Vic2NyaWJlcnNbbGVuZ3RoICsgUkVKRUNURURdID0gb25SZWplY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xyXG4gICAgICAgICAgICBhc2FwKHB1Ymxpc2gsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHB1Ymxpc2gocHJvbWlzZSkge1xyXG4gICAgICAgIHZhciBzdWJzY3JpYmVycyA9IHByb21pc2UuX3N1YnNjcmliZXJzO1xyXG4gICAgICAgIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XHJcblxyXG4gICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkID0gdm9pZCAwLFxyXG4gICAgICAgICAgICBjYWxsYmFjayA9IHZvaWQgMCxcclxuICAgICAgICAgICAgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgIGNoaWxkID0gc3Vic2NyaWJlcnNbaV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkZXRhaWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGV0YWlsKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XHJcbiAgICAgICAgICAgIHJldHVybiBUUllfQ0FUQ0hfRVJST1I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIHByb21pc2UsIGNhbGxiYWNrLCBkZXRhaWwpIHtcclxuICAgICAgICB2YXIgaGFzQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcclxuICAgICAgICAgICAgdmFsdWUgPSB2b2lkIDAsXHJcbiAgICAgICAgICAgIGVycm9yID0gdm9pZCAwLFxyXG4gICAgICAgICAgICBzdWNjZWVkZWQgPSB2b2lkIDAsXHJcbiAgICAgICAgICAgIGZhaWxlZCA9IHZvaWQgMDtcclxuXHJcbiAgICAgICAgaWYgKGhhc0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFRSWV9DQVRDSF9FUlJPUikge1xyXG4gICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVycm9yID0gdmFsdWUuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5lcnJvciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCBjYW5ub3RSZXR1cm5Pd24oKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGRldGFpbDtcclxuICAgICAgICAgICAgc3VjY2VlZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xyXG4gICAgICAgICAgICAvLyBub29wXHJcbiAgICAgICAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmYWlsZWQpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IEZVTEZJTExFRCkge1xyXG4gICAgICAgICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IFJFSkVDVEVEKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVQcm9taXNlKHByb21pc2UsIHJlc29sdmVyKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHByb21pc2UsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgaWQgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5leHRJZCgpIHtcclxuICAgICAgICByZXR1cm4gaWQrKztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlUHJvbWlzZShwcm9taXNlKSB7XHJcbiAgICAgICAgcHJvbWlzZVtQUk9NSVNFX0lEXSA9IGlkKys7XHJcbiAgICAgICAgcHJvbWlzZS5fc3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHByb21pc2UuX3N1YnNjcmliZXJzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGlvbkVycm9yKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FycmF5IE1ldGhvZHMgbXVzdCBiZSBwcm92aWRlZCBhbiBBcnJheScpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBFbnVtZXJhdG9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIEVudW1lcmF0b3IoQ29uc3RydWN0b3IsIGlucHV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcclxuICAgICAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByb21pc2VbUFJPTUlTRV9JRF0pIHtcclxuICAgICAgICAgICAgICAgIG1ha2VQcm9taXNlKHRoaXMucHJvbWlzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGlucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBpbnB1dC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzdWx0ID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VudW1lcmF0ZShpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QodGhpcy5wcm9taXNlLCB2YWxpZGF0aW9uRXJyb3IoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbiBfZW51bWVyYXRlKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyB0aGlzLl9zdGF0ZSA9PT0gUEVORElORyAmJiBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VhY2hFbnRyeShpbnB1dFtpXSwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBFbnVtZXJhdG9yLnByb3RvdHlwZS5fZWFjaEVudHJ5ID0gZnVuY3Rpb24gX2VhY2hFbnRyeShlbnRyeSwgaSkge1xyXG4gICAgICAgICAgICB2YXIgYyA9IHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3I7XHJcbiAgICAgICAgICAgIHZhciByZXNvbHZlJCQxID0gYy5yZXNvbHZlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNvbHZlJCQxID09PSByZXNvbHZlJDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhlbiA9IGdldFRoZW4oZW50cnkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfdGhlbiA9PT0gdGhlbiAmJiBlbnRyeS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXR0bGVkQXQoZW50cnkuX3N0YXRlLCBpLCBlbnRyeS5fcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtYWluaW5nLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzdWx0W2ldID0gZW50cnk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09IFByb21pc2UkMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IGMobm9vcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgX3RoZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uIChyZXNvbHZlJCQxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlJCQxKGVudHJ5KTtcclxuICAgICAgICAgICAgICAgICAgICB9KSwgaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aWxsU2V0dGxlQXQocmVzb2x2ZSQkMShlbnRyeSksIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgRW51bWVyYXRvci5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uIF9zZXR0bGVkQXQoc3RhdGUsIGksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gUEVORElORykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtYWluaW5nLS07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSBSRUpFQ1RFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmdWxmaWxsKHByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBFbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24gX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKSB7XHJcbiAgICAgICAgICAgIHZhciBlbnVtZXJhdG9yID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHN1YnNjcmliZShwcm9taXNlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChGVUxGSUxMRUQsIGksIHZhbHVlKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChSRUpFQ1RFRCwgaSwgcmVhc29uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEVudW1lcmF0b3I7XHJcbiAgICB9KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgIGBQcm9taXNlLmFsbGAgYWNjZXB0cyBhbiBhcnJheSBvZiBwcm9taXNlcywgYW5kIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaFxyXG4gICAgICBpcyBmdWxmaWxsZWQgd2l0aCBhbiBhcnJheSBvZiBmdWxmaWxsbWVudCB2YWx1ZXMgZm9yIHRoZSBwYXNzZWQgcHJvbWlzZXMsIG9yXHJcbiAgICAgIHJlamVjdGVkIHdpdGggdGhlIHJlYXNvbiBvZiB0aGUgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gYmUgcmVqZWN0ZWQuIEl0IGNhc3RzIGFsbFxyXG4gICAgICBlbGVtZW50cyBvZiB0aGUgcGFzc2VkIGl0ZXJhYmxlIHRvIHByb21pc2VzIGFzIGl0IHJ1bnMgdGhpcyBhbGdvcml0aG0uXHJcbiAgICAgIEV4YW1wbGU6XHJcbiAgICAgIGBgYGphdmFzY3JpcHRcclxuICAgICAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcclxuICAgICAgbGV0IHByb21pc2UyID0gcmVzb2x2ZSgyKTtcclxuICAgICAgbGV0IHByb21pc2UzID0gcmVzb2x2ZSgzKTtcclxuICAgICAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XHJcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcclxuICAgICAgICAvLyBUaGUgYXJyYXkgaGVyZSB3b3VsZCBiZSBbIDEsIDIsIDMgXTtcclxuICAgICAgfSk7XHJcbiAgICAgIGBgYFxyXG4gICAgICBJZiBhbnkgb2YgdGhlIGBwcm9taXNlc2AgZ2l2ZW4gdG8gYGFsbGAgYXJlIHJlamVjdGVkLCB0aGUgZmlyc3QgcHJvbWlzZVxyXG4gICAgICB0aGF0IGlzIHJlamVjdGVkIHdpbGwgYmUgZ2l2ZW4gYXMgYW4gYXJndW1lbnQgdG8gdGhlIHJldHVybmVkIHByb21pc2VzJ3NcclxuICAgICAgcmVqZWN0aW9uIGhhbmRsZXIuIEZvciBleGFtcGxlOlxyXG4gICAgICBFeGFtcGxlOlxyXG4gICAgICBgYGBqYXZhc2NyaXB0XHJcbiAgICAgIGxldCBwcm9taXNlMSA9IHJlc29sdmUoMSk7XHJcbiAgICAgIGxldCBwcm9taXNlMiA9IHJlamVjdChuZXcgRXJyb3IoXCIyXCIpKTtcclxuICAgICAgbGV0IHByb21pc2UzID0gcmVqZWN0KG5ldyBFcnJvcihcIjNcIikpO1xyXG4gICAgICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcclxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xyXG4gICAgICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zIGJlY2F1c2UgdGhlcmUgYXJlIHJlamVjdGVkIHByb21pc2VzIVxyXG4gICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgIC8vIGVycm9yLm1lc3NhZ2UgPT09IFwiMlwiXHJcbiAgICAgIH0pO1xyXG4gICAgICBgYGBcclxuICAgICAgQG1ldGhvZCBhbGxcclxuICAgICAgQHN0YXRpY1xyXG4gICAgICBAcGFyYW0ge0FycmF5fSBlbnRyaWVzIGFycmF5IG9mIHByb21pc2VzXHJcbiAgICAgIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGxhYmVsaW5nIHRoZSBwcm9taXNlLlxyXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXHJcbiAgICAgIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiBhbGwgYHByb21pc2VzYCBoYXZlIGJlZW5cclxuICAgICAgZnVsZmlsbGVkLCBvciByZWplY3RlZCBpZiBhbnkgb2YgdGhlbSBiZWNvbWUgcmVqZWN0ZWQuXHJcbiAgICAgIEBzdGF0aWNcclxuICAgICovXHJcbiAgICBmdW5jdGlvbiBhbGwoZW50cmllcykge1xyXG4gICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvcih0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICBgUHJvbWlzZS5yYWNlYCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2ggaXMgc2V0dGxlZCBpbiB0aGUgc2FtZSB3YXkgYXMgdGhlXHJcbiAgICAgIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIHNldHRsZS5cclxuICAgICAgRXhhbXBsZTpcclxuICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHJlc29sdmUoJ3Byb21pc2UgMicpO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAvLyByZXN1bHQgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgaXQgd2FzIHJlc29sdmVkIGJlZm9yZSBwcm9taXNlMVxyXG4gICAgICAgIC8vIHdhcyByZXNvbHZlZC5cclxuICAgICAgfSk7XHJcbiAgICAgIGBgYFxyXG4gICAgICBgUHJvbWlzZS5yYWNlYCBpcyBkZXRlcm1pbmlzdGljIGluIHRoYXQgb25seSB0aGUgc3RhdGUgb2YgdGhlIGZpcnN0XHJcbiAgICAgIHNldHRsZWQgcHJvbWlzZSBtYXR0ZXJzLiBGb3IgZXhhbXBsZSwgZXZlbiBpZiBvdGhlciBwcm9taXNlcyBnaXZlbiB0byB0aGVcclxuICAgICAgYHByb21pc2VzYCBhcnJheSBhcmd1bWVudCBhcmUgcmVzb2x2ZWQsIGJ1dCB0aGUgZmlyc3Qgc2V0dGxlZCBwcm9taXNlIGhhc1xyXG4gICAgICBiZWNvbWUgcmVqZWN0ZWQgYmVmb3JlIHRoZSBvdGhlciBwcm9taXNlcyBiZWNhbWUgZnVsZmlsbGVkLCB0aGUgcmV0dXJuZWRcclxuICAgICAgcHJvbWlzZSB3aWxsIGJlY29tZSByZWplY3RlZDpcclxuICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ3Byb21pc2UgMicpKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgICB9KTtcclxuICAgICAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnNcclxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcclxuICAgICAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBwcm9taXNlIDIgYmVjYW1lIHJlamVjdGVkIGJlZm9yZVxyXG4gICAgICAgIC8vIHByb21pc2UgMSBiZWNhbWUgZnVsZmlsbGVkXHJcbiAgICAgIH0pO1xyXG4gICAgICBgYGBcclxuICAgICAgQW4gZXhhbXBsZSByZWFsLXdvcmxkIHVzZSBjYXNlIGlzIGltcGxlbWVudGluZyB0aW1lb3V0czpcclxuICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICBQcm9taXNlLnJhY2UoW2FqYXgoJ2Zvby5qc29uJyksIHRpbWVvdXQoNTAwMCldKVxyXG4gICAgICBgYGBcclxuICAgICAgQG1ldGhvZCByYWNlXHJcbiAgICAgIEBzdGF0aWNcclxuICAgICAgQHBhcmFtIHtBcnJheX0gcHJvbWlzZXMgYXJyYXkgb2YgcHJvbWlzZXMgdG8gb2JzZXJ2ZVxyXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXHJcbiAgICAgIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB3aGljaCBzZXR0bGVzIGluIHRoZSBzYW1lIHdheSBhcyB0aGUgZmlyc3QgcGFzc2VkXHJcbiAgICAgIHByb21pc2UgdG8gc2V0dGxlLlxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIHJhY2UoZW50cmllcykge1xyXG4gICAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCFpc0FycmF5KGVudHJpZXMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICBgUHJvbWlzZS5yZWplY3RgIHJldHVybnMgYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIHBhc3NlZCBgcmVhc29uYC5cclxuICAgICAgSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxyXG4gICAgICBgYGBqYXZhc2NyaXB0XHJcbiAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICByZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgICAgIC8vIENvZGUgaGVyZSBkb2Vzbid0IHJ1biBiZWNhdXNlIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIVxyXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xyXG4gICAgICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnV0hPT1BTJ1xyXG4gICAgICB9KTtcclxuICAgICAgYGBgXHJcbiAgICAgIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcclxuICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xyXG4gICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgICAgIC8vIENvZGUgaGVyZSBkb2Vzbid0IHJ1biBiZWNhdXNlIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIVxyXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xyXG4gICAgICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnV0hPT1BTJ1xyXG4gICAgICB9KTtcclxuICAgICAgYGBgXHJcbiAgICAgIEBtZXRob2QgcmVqZWN0XHJcbiAgICAgIEBzdGF0aWNcclxuICAgICAgQHBhcmFtIHtBbnl9IHJlYXNvbiB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aC5cclxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxyXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gYHJlYXNvbmAuXHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVqZWN0JDEocmVhc29uKSB7XHJcbiAgICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cclxuICAgICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xyXG4gICAgICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5lZWRzUmVzb2x2ZXIoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhIHJlc29sdmVyIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5lZWRzTmV3KCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcclxuICAgICAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcclxuICAgICAgcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGUgcmVhc29uXHJcbiAgICAgIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxyXG4gICAgICBUZXJtaW5vbG9neVxyXG4gICAgICAtLS0tLS0tLS0tLVxyXG4gICAgICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxyXG4gICAgICAtIGB0aGVuYWJsZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyBhIGB0aGVuYCBtZXRob2QuXHJcbiAgICAgIC0gYHZhbHVlYCBpcyBhbnkgbGVnYWwgSmF2YVNjcmlwdCB2YWx1ZSAoaW5jbHVkaW5nIHVuZGVmaW5lZCwgYSB0aGVuYWJsZSwgb3IgYSBwcm9taXNlKS5cclxuICAgICAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXHJcbiAgICAgIC0gYHJlYXNvbmAgaXMgYSB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aHkgYSBwcm9taXNlIHdhcyByZWplY3RlZC5cclxuICAgICAgLSBgc2V0dGxlZGAgdGhlIGZpbmFsIHJlc3Rpbmcgc3RhdGUgb2YgYSBwcm9taXNlLCBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXHJcbiAgICAgIEEgcHJvbWlzZSBjYW4gYmUgaW4gb25lIG9mIHRocmVlIHN0YXRlczogcGVuZGluZywgZnVsZmlsbGVkLCBvciByZWplY3RlZC5cclxuICAgICAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcclxuICAgICAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxyXG4gICAgICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cclxuICAgICAgUHJvbWlzZXMgY2FuIGFsc28gYmUgc2FpZCB0byAqcmVzb2x2ZSogYSB2YWx1ZS4gIElmIHRoaXMgdmFsdWUgaXMgYWxzbyBhXHJcbiAgICAgIHByb21pc2UsIHRoZW4gdGhlIG9yaWdpbmFsIHByb21pc2UncyBzZXR0bGVkIHN0YXRlIHdpbGwgbWF0Y2ggdGhlIHZhbHVlJ3NcclxuICAgICAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXHJcbiAgICAgIGl0c2VsZiByZWplY3QsIGFuZCBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIHdpbGxcclxuICAgICAgaXRzZWxmIGZ1bGZpbGwuXHJcbiAgICAgIEJhc2ljIFVzYWdlOlxyXG4gICAgICAtLS0tLS0tLS0tLS1cclxuICAgICAgYGBganNcclxuICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAvLyBvbiBzdWNjZXNzXHJcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICAgICAgLy8gb24gZmFpbHVyZVxyXG4gICAgICAgIHJlamVjdChyZWFzb24pO1xyXG4gICAgICB9KTtcclxuICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gb24gZnVsZmlsbG1lbnRcclxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgLy8gb24gcmVqZWN0aW9uXHJcbiAgICAgIH0pO1xyXG4gICAgICBgYGBcclxuICAgICAgQWR2YW5jZWQgVXNhZ2U6XHJcbiAgICAgIC0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICBQcm9taXNlcyBzaGluZSB3aGVuIGFic3RyYWN0aW5nIGF3YXkgYXN5bmNocm9ub3VzIGludGVyYWN0aW9ucyBzdWNoIGFzXHJcbiAgICAgIGBYTUxIdHRwUmVxdWVzdGBzLlxyXG4gICAgICBgYGBqc1xyXG4gICAgICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XHJcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcclxuICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XHJcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSB0aGlzLkRPTkUpIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZ2V0SlNPTjogYCcgKyB1cmwgKyAnYCBmYWlsZWQgd2l0aCBzdGF0dXM6IFsnICsgdGhpcy5zdGF0dXMgKyAnXScpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcclxuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxyXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcclxuICAgICAgICAvLyBvbiByZWplY3Rpb25cclxuICAgICAgfSk7XHJcbiAgICAgIGBgYFxyXG4gICAgICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxyXG4gICAgICBgYGBqc1xyXG4gICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgZ2V0SlNPTignL3Bvc3RzJyksXHJcbiAgICAgICAgZ2V0SlNPTignL2NvbW1lbnRzJylcclxuICAgICAgXSkudGhlbihmdW5jdGlvbih2YWx1ZXMpe1xyXG4gICAgICAgIHZhbHVlc1swXSAvLyA9PiBwb3N0c0pTT05cclxuICAgICAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgICAgfSk7XHJcbiAgICAgIGBgYFxyXG4gICAgICBAY2xhc3MgUHJvbWlzZVxyXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlclxyXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXHJcbiAgICAgIEBjb25zdHJ1Y3RvclxyXG4gICAgKi9cclxuXHJcbiAgICB2YXIgUHJvbWlzZSQyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIpIHtcclxuICAgICAgICAgICAgdGhpc1tQUk9NSVNFX0lEXSA9IG5leHRJZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub29wICE9PSByZXNvbHZlcikge1xyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIG5lZWRzUmVzb2x2ZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlID8gaW5pdGlhbGl6ZVByb21pc2UodGhpcywgcmVzb2x2ZXIpIDogbmVlZHNOZXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgVGhlIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsXHJcbiAgICAgICAgd2hpY2ggcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGVcclxuICAgICAgICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXHJcbiAgICAgICAgIGBgYGpzXHJcbiAgICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uKHVzZXIpe1xyXG4gICAgICAgICAgLy8gdXNlciBpcyBhdmFpbGFibGVcclxuICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xyXG4gICAgICAgICAgLy8gdXNlciBpcyB1bmF2YWlsYWJsZSwgYW5kIHlvdSBhcmUgZ2l2ZW4gdGhlIHJlYXNvbiB3aHlcclxuICAgICAgICB9KTtcclxuICAgICAgICBgYGBcclxuICAgICAgICAgQ2hhaW5pbmdcclxuICAgICAgICAtLS0tLS0tLVxyXG4gICAgICAgICBUaGUgcmV0dXJuIHZhbHVlIG9mIGB0aGVuYCBpcyBpdHNlbGYgYSBwcm9taXNlLiAgVGhpcyBzZWNvbmQsICdkb3duc3RyZWFtJ1xyXG4gICAgICAgIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmaXJzdCBwcm9taXNlJ3MgZnVsZmlsbG1lbnRcclxuICAgICAgICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cclxuICAgICAgICAgYGBganNcclxuICAgICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgIHJldHVybiB1c2VyLm5hbWU7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgcmV0dXJuICdkZWZhdWx0IG5hbWUnO1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHVzZXJOYW1lKSB7XHJcbiAgICAgICAgICAvLyBJZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHVzZXJOYW1lYCB3aWxsIGJlIHRoZSB1c2VyJ3MgbmFtZSwgb3RoZXJ3aXNlIGl0XHJcbiAgICAgICAgICAvLyB3aWxsIGJlIGAnZGVmYXVsdCBuYW1lJ2BcclxuICAgICAgICB9KTtcclxuICAgICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jyk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jyk7XHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcclxuICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgICAvLyBpZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHJlYXNvbmAgd2lsbCBiZSAnRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknLlxyXG4gICAgICAgICAgLy8gSWYgYGZpbmRVc2VyYCByZWplY3RlZCwgYHJlYXNvbmAgd2lsbCBiZSAnYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYGBgXHJcbiAgICAgICAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXHJcbiAgICAgICAgIGBgYGpzXHJcbiAgICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYGBgXHJcbiAgICAgICAgIEFzc2ltaWxhdGlvblxyXG4gICAgICAgIC0tLS0tLS0tLS0tLVxyXG4gICAgICAgICBTb21ldGltZXMgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHByb3BhZ2F0ZSB0byBhIGRvd25zdHJlYW0gcHJvbWlzZSBjYW4gb25seSBiZVxyXG4gICAgICAgIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcclxuICAgICAgICBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gaGFuZGxlci4gVGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIHRoZW4gYmUgcGVuZGluZ1xyXG4gICAgICAgIHVudGlsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlzIHNldHRsZWQuIFRoaXMgaXMgY2FsbGVkICphc3NpbWlsYXRpb24qLlxyXG4gICAgICAgICBgYGBqc1xyXG4gICAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XHJcbiAgICAgICAgICAvLyBUaGUgdXNlcidzIGNvbW1lbnRzIGFyZSBub3cgYXZhaWxhYmxlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYGBgXHJcbiAgICAgICAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxyXG4gICAgICAgICBgYGBqc1xyXG4gICAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XHJcbiAgICAgICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCByZWplY3RzLCB3ZSdsbCBoYXZlIHRoZSByZWFzb24gaGVyZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGBgYFxyXG4gICAgICAgICBTaW1wbGUgRXhhbXBsZVxyXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcclxuICAgICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICAgIGxldCByZXN1bHQ7XHJcbiAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXN1bHQgPSBmaW5kUmVzdWx0KCk7XHJcbiAgICAgICAgICAvLyBzdWNjZXNzXHJcbiAgICAgICAgfSBjYXRjaChyZWFzb24pIHtcclxuICAgICAgICAgIC8vIGZhaWx1cmVcclxuICAgICAgICB9XHJcbiAgICAgICAgYGBgXHJcbiAgICAgICAgIEVycmJhY2sgRXhhbXBsZVxyXG4gICAgICAgICBgYGBqc1xyXG4gICAgICAgIGZpbmRSZXN1bHQoZnVuY3Rpb24ocmVzdWx0LCBlcnIpe1xyXG4gICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAvLyBmYWlsdXJlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBzdWNjZXNzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYGBgXHJcbiAgICAgICAgIFByb21pc2UgRXhhbXBsZTtcclxuICAgICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICAgIGZpbmRSZXN1bHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAvLyBzdWNjZXNzXHJcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcclxuICAgICAgICAgIC8vIGZhaWx1cmVcclxuICAgICAgICB9KTtcclxuICAgICAgICBgYGBcclxuICAgICAgICAgQWR2YW5jZWQgRXhhbXBsZVxyXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcclxuICAgICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICAgIGxldCBhdXRob3IsIGJvb2tzO1xyXG4gICAgICAgICB0cnkge1xyXG4gICAgICAgICAgYXV0aG9yID0gZmluZEF1dGhvcigpO1xyXG4gICAgICAgICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcclxuICAgICAgICAgIC8vIHN1Y2Nlc3NcclxuICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xyXG4gICAgICAgICAgLy8gZmFpbHVyZVxyXG4gICAgICAgIH1cclxuICAgICAgICBgYGBcclxuICAgICAgICAgRXJyYmFjayBFeGFtcGxlXHJcbiAgICAgICAgIGBgYGpzXHJcbiAgICAgICAgIGZ1bmN0aW9uIGZvdW5kQm9va3MoYm9va3MpIHtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xyXG4gICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICBmYWlsdXJlKGVycik7XHJcbiAgICAgICAgICAgIC8vIGZhaWx1cmVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBmYWlsdXJlKGVycik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kQm9va3MoYm9va3MpO1xyXG4gICAgICAgICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWx1cmUocmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHN1Y2Nlc3NcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBgYGBcclxuICAgICAgICAgUHJvbWlzZSBFeGFtcGxlO1xyXG4gICAgICAgICBgYGBqYXZhc2NyaXB0XHJcbiAgICAgICAgZmluZEF1dGhvcigpLlxyXG4gICAgICAgICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXHJcbiAgICAgICAgICB0aGVuKGZ1bmN0aW9uKGJvb2tzKXtcclxuICAgICAgICAgICAgLy8gZm91bmQgYm9va3NcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xyXG4gICAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcclxuICAgICAgICB9KTtcclxuICAgICAgICBgYGBcclxuICAgICAgICAgQG1ldGhvZCB0aGVuXHJcbiAgICAgICAgQHBhcmFtIHtGdW5jdGlvbn0gb25GdWxmaWxsZWRcclxuICAgICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXHJcbiAgICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxyXG4gICAgICAgIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxyXG4gICAgICAgIGFzIHRoZSBjYXRjaCBibG9jayBvZiBhIHRyeS9jYXRjaCBzdGF0ZW1lbnQuXHJcbiAgICAgICAgYGBganNcclxuICAgICAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN5bmNocm9ub3VzXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICBmaW5kQXV0aG9yKCk7XHJcbiAgICAgICAgfSBjYXRjaChyZWFzb24pIHtcclxuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhc3luYyB3aXRoIHByb21pc2VzXHJcbiAgICAgICAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XHJcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcclxuICAgICAgICB9KTtcclxuICAgICAgICBgYGBcclxuICAgICAgICBAbWV0aG9kIGNhdGNoXHJcbiAgICAgICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3Rpb25cclxuICAgICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXHJcbiAgICAgICAgQHJldHVybiB7UHJvbWlzZX1cclxuICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGlvbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICBgZmluYWxseWAgd2lsbCBiZSBpbnZva2VkIHJlZ2FyZGxlc3Mgb2YgdGhlIHByb21pc2UncyBmYXRlIGp1c3QgYXMgbmF0aXZlXHJcbiAgICAgICAgICB0cnkvY2F0Y2gvZmluYWxseSBiZWhhdmVzXHJcbiAgICAgICAgXHJcbiAgICAgICAgICBTeW5jaHJvbm91cyBleGFtcGxlOlxyXG4gICAgICAgIFxyXG4gICAgICAgICAgYGBganNcclxuICAgICAgICAgIGZpbmRBdXRob3IoKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBdXRob3IoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaW5kQXV0aG9yKCk7IC8vIHN1Y2NlZWQgb3IgZmFpbFxyXG4gICAgICAgICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmluZE90aGVyQXV0aGVyKCk7XHJcbiAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAvLyBhbHdheXMgcnVuc1xyXG4gICAgICAgICAgICAvLyBkb2Vzbid0IGFmZmVjdCB0aGUgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBgYGBcclxuICAgICAgICBcclxuICAgICAgICAgIEFzeW5jaHJvbm91cyBleGFtcGxlOlxyXG4gICAgICAgIFxyXG4gICAgICAgICAgYGBganNcclxuICAgICAgICAgIGZpbmRBdXRob3IoKS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmluZE90aGVyQXV0aGVyKCk7XHJcbiAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vIGF1dGhvciB3YXMgZWl0aGVyIGZvdW5kLCBvciBub3RcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYGBgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICBAbWV0aG9kIGZpbmFsbHlcclxuICAgICAgICAgIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICBAcmV0dXJuIHtQcm9taXNlfVxyXG4gICAgICAgICovXHJcblxyXG5cclxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gZnVuY3Rpb24gX2ZpbmFsbHkoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY29uc3RydWN0b3IgPSBwcm9taXNlLmNvbnN0cnVjdG9yO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyByZWFzb247XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2U7XHJcbiAgICB9KCk7XHJcblxyXG4gICAgUHJvbWlzZSQyLnByb3RvdHlwZS50aGVuID0gdGhlbjtcclxuICAgIFByb21pc2UkMi5hbGwgPSBhbGw7XHJcbiAgICBQcm9taXNlJDIucmFjZSA9IHJhY2U7XHJcbiAgICBQcm9taXNlJDIucmVzb2x2ZSA9IHJlc29sdmUkMTtcclxuICAgIFByb21pc2UkMi5yZWplY3QgPSByZWplY3QkMTtcclxuICAgIFByb21pc2UkMi5fc2V0U2NoZWR1bGVyID0gc2V0U2NoZWR1bGVyO1xyXG4gICAgUHJvbWlzZSQyLl9zZXRBc2FwID0gc2V0QXNhcDtcclxuICAgIFByb21pc2UkMi5fYXNhcCA9IGFzYXA7XHJcblxyXG4gICAgLypnbG9iYWwgc2VsZiovXHJcbiAgICBmdW5jdGlvbiBwb2x5ZmlsbCgpIHtcclxuICAgICAgICB2YXIgbG9jYWwgPSB2b2lkIDA7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBsb2NhbCA9IGdsb2JhbDtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBsb2NhbCA9IHNlbGY7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxvY2FsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb2x5ZmlsbCBmYWlsZWQgYmVjYXVzZSBnbG9iYWwgb2JqZWN0IGlzIHVuYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xyXG5cclxuICAgICAgICBpZiAoUCkge1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZVRvU3RyaW5nID0gbnVsbDtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQLnJlc29sdmUoKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNpbGVudGx5IGlnbm9yZWRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHByb21pc2VUb1N0cmluZyA9PT0gJ1tvYmplY3QgUHJvbWlzZV0nICYmICFQLmNhc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWwuUHJvbWlzZSA9IFByb21pc2UkMjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdHJhbmdlIGNvbXBhdC4uXHJcbiAgICBQcm9taXNlJDIucG9seWZpbGwgPSBwb2x5ZmlsbDtcclxuICAgIFByb21pc2UkMi5Qcm9taXNlID0gUHJvbWlzZSQyO1xyXG5cclxuICAgIFByb21pc2UkMi5wb2x5ZmlsbCgpO1xyXG5cclxuICAgIHJldHVybiBQcm9taXNlJDI7XHJcblxyXG59KSkpO1xyXG5cclxuXHJcblxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lczYtcHJvbWlzZS5hdXRvLm1hcCJdfQ==