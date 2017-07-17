export default {
  successResponse: {},

  errorResponse: {},

  isSuccessful: true,

  get() {
    const promise = new Promise((resolve, reject) => ((this.isSuccessful) ?
        resolve(this.successResponse) :
        reject(this.errorResponse)
    ));

    return promise;
  },

  post() {
    const promise = new Promise((resolve, reject) => ((this.isSuccessful) ?
        resolve(this.successResponse) :
        reject(this.errorResponse)
    ));

    return promise;
  },

  patch() {
    const promise = new Promise((resolve, reject) => ((this.isSuccessful) ?
        resolve(this.successResponse) :
        reject(this.errorResponse)
    ));

    return promise;
  },

  put() {
    const promise = new Promise((resolve, reject) => ((this.isSuccessful) ?
        resolve(this.successResponse) :
        reject(this.errorResponse)
    ));

    return promise;
  },

  delete() {
    const promise = new Promise((resolve, reject) => ((this.isSuccessful) ?
        resolve(this.successResponse) :
        reject(this.errorResponse)
    ));

    return promise;
  }
};
