<template>
  <v-container id="pdf">
    <div v-if="(todos && todos.length < 1) || todos.length < 1">
      <p>Your list is empty!</p>
    </div>
    <div v-else>
      <h2 class="headline">Oahu</h2>
      <v-divider class="my-2"></v-divider>

      <v-card
        v-for="post in todos"
        :key="post.title"
        class="mb-2 todo-card"
        outlined
      >
        <div class="pa-3">
          <h3 class="title">{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <v-chip
            v-for="category in post.categories"
            :key="category"
            small
            outlined
            class="mr-1"
            >{{ category }}</v-chip
          >
        </div>
        <v-card-actions class="justify-space-between">
          <v-btn rounded text color="primary" @click="navigateToPage(post)"
            >View</v-btn
          >
          <v-btn
            small
            rounded
            text
            color="secondary"
            @click="removeHandler(post)"
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import generateHeadTags from "../lib/generateMeta";
import ContentHandlers from "../mixins/ContentHandlers";
export default {
  head: generateHeadTags(
    "Your Vacation List",
    "A list of activites you've saved for your trip.",
    "welcome",
    null,
    true
  ),
  layout: "list",
  components: {},
  mixins: [ContentHandlers],
  data() {
    return {
      pageTitle: "Your Vacation List",
      islands: [
        "Ohau",
        "Hawaii",
        "Maui",
        "Kauai",
        "Molokai",
        "Lanai",
        "Kahoolawe",
      ],
      todos: [],
    };
  },
  computed: {},
  methods: {
    navigateToPage(post) {
      const { categories } = post;

      const isPlan = categories.includes("plans");

      if (isPlan) this.$router.push(`/oahu/plans/${post.slug}`);
      else this.$router.push(`/oahu/do/${post.slug}`);
    },
    async removeHandler(item) {
      this.$store.commit(`todos/remove`, item);
      await this.populatTodos();
    },
    async populatTodos() {
      const itemsInStorage = this.$store.state.todos.list;
      const items = await Promise.all(
        itemsInStorage.map(
          async (item) => await this.returnContentFromObj(item)
        )
      );
      this.todos = items;
    },
    async init() {
      await this.populatTodos();
    },
  },
  async created() {
    this.$nuxt.$emit("pageTitleChange", this.pageTitle);
    if (process.client) await this.init();
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.todo-card {
  margin-bottom: 30px;
}
</style>

