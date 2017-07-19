<template>
  <main>
    <button @click="onFetchArticles">Fetch Articles</button>
    <button @click="onCreateArticle">Create New Article</button>

    <blog-article
      v-for="article in articles"
      :article="article"
      :key="article.id" />
  </main>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */
  import { mapActions, mapGetters } from 'vuex';
  import Ipsum from 'bavaria-ipsum';
  /* eslint-enable */
  import ArticleDetail from './ArticleDetail.vue';

  const ipsum = new Ipsum();

  export default {
    components: {
      'blog-article': ArticleDetail
    },

    computed: {
      ...mapGetters('articles', {
        articles: 'list'
      })
    },

    methods: {
      onFetchArticles() {
        this.fetchArticles();
      },

      onCreateArticle() {
        this.createArticle({
          data: {
            title: ipsum.generateSentence(),
            content: ipsum.generateParagraph()
          }
        });
      },

      ...mapActions('articles', {
        fetchArticles: 'fetchList',
        createArticle: 'create'
      })
    }
  };
</script>
