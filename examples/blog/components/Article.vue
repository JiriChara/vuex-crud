<template>
  <main>
    <router-link :to="{ name: 'blog' }">Back to Articles</router-link>
    <blog-article v-if="currentArticle" :article="currentArticle" />
  </main>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */
  import { mapState, mapGetters, mapActions } from 'vuex';
  /* eslint-enable */
  import ArticleDetail from './ArticleDetail.vue';

  export default {
    components: {
      'blog-article': ArticleDetail
    },

    computed: {
      ...mapGetters('articles', {
        articleById: 'byId'
      }),

      ...mapState([
        'route'
      ]),

      currentArticle() {
        return this.articleById(this.route.params.id);
      }
    },

    methods: {
      ...mapActions('articles', {
        fetchArticle: 'fetchSingle'
      }),

      fetchData() {
        return this.fetchArticle({
          id: this.route.params.id
        });
      }
    },

    watch: {
      $route: 'fetchData'
    },

    created() {
      this.fetchData();
    }
  };
</script>
