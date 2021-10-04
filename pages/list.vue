<template>
  <v-container id="pdf">
    <div v-if="(todos && todos.length < 1) || todos.length < 1">
      <p>Your list is empty!</p>
    </div>
    <div v-else>
      <h2 class="headline">Oahu</h2>
      <v-divider class="my-2"></v-divider>

      <v-list>
        <template v-for="(post, idx) in todos">
          <v-list-item two-line :key="post.title">
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ post.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn small text rounded color="red" @click="removeHandler(post)"
                >Remove</v-btn
              >
            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                small
                text
                rounded
                color="blue"
                @click="navigateToPage(post)"
                >View</v-btn
              >
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="idx"></v-divider>
        </template>
      </v-list>
    </div>
  </v-container>
</template>

<script>
import generateHeadTags from "../lib/generateMeta";
import ContentHandlers from "../mixins/ContentHandlers";
import AssetHandlers from "../mixins/AssetHandlers";
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
  mixins: [ContentHandlers, AssetHandlers],
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

