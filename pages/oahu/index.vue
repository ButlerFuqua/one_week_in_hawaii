<template>
  <v-container>
    <div id="categoryContainer">
      <v-btn
        v-for="category in categories"
        :key="category"
        class="mr-2"
        small
        rounded
        :outlined="!selectedCategories.includes(category)"
        :color="
          !selectedCategories.includes(category) ? 'default' : 'secondary'
        "
        elevation="0"
        @click="updateSelectedCategories(category)"
        >{{ category }}</v-btn
      >
    </div>
    <v-text-field
      dense
      class="mt-2"
      outlined
      placeholder="Search..."
      v-model="searchCriteria"
    ></v-text-field>
    <div v-if="isLoading">
      <v-card
        v-for="num in 7"
        :key="num"
        loading
        outlined
        color="grey lighten-2"
        class="mb-3"
      >
        <v-skeleton-loader type="article, actions"></v-skeleton-loader>
      </v-card>
    </div>
    <div v-else-if="todos">
      <v-card
        v-for="post in filteredPosts"
        :key="post.title"
        class="mb-2"
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
            :color="
              selectedCategories
                .map((str) => str.toLowerCase())
                .includes(category)
                ? 'secondary'
                : 'default'
            "
            >{{ category }}</v-chip
          >
        </div>
        <v-card-actions class="justify-space-between">
          <v-btn rounded text color="primary" @click="navigateToPage(post)"
            >View</v-btn
          >
          <v-btn
            v-if="!todos.find((item) => item.slug === post.slug)"
            small
            rounded
            text
            color="teal"
            @click="$store.commit(`todos/add`, post)"
          >
            Add to List
          </v-btn>
          <v-btn
            v-else
            small
            rounded
            text
            color="red"
            @click="$store.commit(`todos/remove`, post)"
          >
            Remove From List
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import ContentHandlers from "../../mixins/ContentHandlers";
export default {
  layout: "oahu",
  components: {},
  mixins: [ContentHandlers],
  data() {
    return {
      pageTitle: "Oahu",
      isLoading: true,
      categories: [],
      selectedCategories: [],
      posts: [],
      searchCriteria: "",
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
    filteredPosts() {
      const { posts, selectedCategories, searchCriteria } = this;

      // SEARCH ==/
      // There is search criteria
      if (searchCriteria.trim() !== "") {
        this.selectedCategories = [];
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchCriteria.toLowerCase()) ||
            post.description
              .toLowerCase()
              .includes(searchCriteria.toLowerCase())
        );
      }

      // FILTERS ==/
      // There are no filters selected (show all)
      if (selectedCategories.length < 1) return posts;
      // Return posts that have any category that matches any selected filter
      const lowered = selectedCategories.map((cat) => cat.toLowerCase());
      return posts.filter((post) =>
        post.categories.some((cat) => lowered.includes(cat))
      );
    },
  },
  methods: {
    navigateToPage(post) {
      const { categories } = post;

      const isPlan = categories.includes("plans");

      if (isPlan) this.$router.push(`/oahu/plans/${post.slug}`);
      else this.$router.push(`/oahu/do/${post.slug}`);
    },
    fillCategoriesArray(arry) {
      if (arry) {
        this.categories = arry;
        return;
      }
      this.categories = [
        ...new Set(this.posts.map((post) => post.categories).flat()),
      ];
    },
    updateSelectedCategories(selectedCategory) {
      // clear search criteria to show results from filters
      this.searchCriteria = "";

      // update filters
      if (this.selectedCategories.includes(selectedCategory))
        this.selectedCategories = this.selectedCategories.filter(
          (cat) => cat !== selectedCategory
        );
      else this.selectedCategories.push(selectedCategory);
    },
    async init() {
      this.isLoading = true;
      this.posts = await this.returnAllPosts();
      this.fillCategoriesArray();
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