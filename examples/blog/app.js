/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import 'babel-polyfill';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
/* eslint-enable */

import store from './store';
import router from './router';
import App from './App.vue';

sync(store, router);

export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
