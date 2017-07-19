/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Vuex from 'vuex';
/* eslint-enable */

import articles from './articles';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articles
  }
});
