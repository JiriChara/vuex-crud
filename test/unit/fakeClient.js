export default {
  successResponse: {},

  errorResponse: {},

  isSuccessful: true,

  defaultPromise() {
    const promise = new Promise((resolve, reject) => ((this.isSuccessful) ?
        resolve(this.successResponse) :
        reject(this.errorResponse)
    ));

    return promise;
  },

  get() {
    return this.defaultPromise();
  },

  post() {
    return this.defaultPromise();
  },

  patch() {
    return this.defaultPromise();
  },

  put() {
    return this.defaultPromise();
  },

  delete() {
    return this.defaultPromise();
  }
};
