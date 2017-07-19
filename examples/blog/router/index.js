/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import Vue from 'vue';
import Router from 'vue-router';
/* eslint-enable */

import Blog from '../components/Blog.vue';
import Article from '../components/Article.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blog',
      component: Blog
    },

    {
      path: '/articles/:id',
      name: 'article',
      component: Article
    }
  ]
});
