<template>
  <article :class="`article-${article.id}`">
    <router-link :to="{ name: 'article', params: { id: article.id } }">
      <h1>{{ article.title }}</h1>
    </router-link>

    <p>
      <a class="edit-article" href="javascript:void(0);" @click="onEdit">Edit (PATCH)</a>
      |
      <a class="replace-article" href="javascript:void(0);" @click="onReplace">Replace (PUT)</a>
      |
      <a class="delete-article" href="javascript:void(0);" @click="onDelete">Delete</a>
    </p>

    <p class="content">{{ article.content }}</p>
    <hr />
  </article>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */
  import { mapActions } from 'vuex';
  import Ipsum from 'bavaria-ipsum';
  /* eslint-enable */

  const ipsum = new Ipsum();

  export default {
    props: {
      article: {
        type: Object,
        required: true
      }
    },

    methods: {
      ...mapActions('articles', [
        'update',
        'replace',
        'destroy'
      ]),

      onEdit() {
        this.update({
          id: this.article.id,
          data: {
            title: ipsum.generateSentence(),
            content: ipsum.generateParagraph()
          }
        });
      },

      onReplace() {
        this.replace({
          id: this.article.id,
          data: {
            title: ipsum.generateSentence(),
            content: ipsum.generateParagraph()
          }
        });
      },

      onDelete() {
        this.destroy({
          id: this.article.id
        });
      }
    }
  };
</script>
