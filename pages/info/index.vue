<template>
  <v-container>
    <div v-if="isLoading">
      <v-card
        v-for="num in 3"
        :key="num"
        loading
        outlined
        color="grey lighten-2"
        class="mb-3"
      >
        <v-skeleton-loader type="article"></v-skeleton-loader>
      </v-card>
    </div>
    <div v-else-if="todos">
      <v-card v-for="post in posts" :key="post.title" class="mb-2" outlined>
        <div class="pa-3">
          <h3 class="title">{{ post.title }}</h3>
          <p>{{ post.description }}</p>
        </div>
        <v-card-actions class="justify-space-between">
          <v-btn
            rounded
            text
            color="primary"
            @click="$router.push(`/info/${post.slug}`)"
            >Read More</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import ContentHandlers from "../../mixins/ContentHandlers";
export default {
  components: {},
  mixins: [ContentHandlers],
  data() {
    return {
      pageTitle: "Site Info",
      isLoading: true,
      posts: [],
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
  },
  methods: {
    async init() {
      this.isLoading = true;
      this.posts = await this.returnAllInfoPages();
      this.isLoading = false;
    },
  },
  async created() {
    this.$nuxt.$emit("pageTitleChange", this.pageTitle);
    if (process.client) await this.init();
  },
};
</script>

<style lang="scss" scoped>
#categoryContainer {
  overflow: auto;
  width: 100%;
  display: flex;
  flex-flow: nowrap;
  padding-bottom: 1rem;
}
.done {
  text-decoration: line-through;
}
</style>