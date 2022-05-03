<template>
  <v-container>
    <div id="categoryContainer">
      <v-btn
        v-for="category in categories"
        :key="category"
        class="mr-2"
        small
        rounded
        :outlined="
          selectedCategory ? !selectedCategory.includes(category) : true
        "
        :color="
          selectedCategory
            ? !selectedCategory.includes(category)
              ? 'default'
              : 'secondary'
            : 'default'
        "
        elevation="0"
        @click="updateSelectedCategory(category)"
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
        <v-img :src="getFeaturedImage(post)"></v-img>
        <div class="pa-3">
          <h3 class="title">{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <v-chip
            small
            :outlined="post.hasContent"
            :color="post.hasContent ? 'primary' : 'default'"
            :disabled="!post.hasContent"
            >{{ post.hasContent ? "Has Content" : "No Content yet" }}</v-chip
          >
        </div>
        <v-card-actions class="justify-space-between">
          <v-btn
            rounded
            text
            color="primary"
            @click="$router.push(`/islands/${post.slug}`)"
            >Read More</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import ContentHandlers from "../../mixins/ContentHandlers";
import AssetHandlers from "../../mixins/AssetHandlers";
export default {
  layout: "blog",
  components: {},
  mixins: [ContentHandlers, AssetHandlers],
  data() {
    return {
      pageTitle: "Islands",
      isLoading: true,
      categories: [],
      posts: [],
      searchCriteria: "",
      selectedCategory: null,
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
    filteredPosts() {
      const { posts, searchCriteria, selectedCategory } = this;

      // SEARCH ==/
      // There is search criteria
      if (searchCriteria.trim() !== "") {
        this.selectedCategory = null;
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
      if (!selectedCategory) return posts;

      // Selected has or no content
      if (selectedCategory.toLowerCase().includes("has"))
        return posts.filter((post) => post.hasContent);
      else return posts.filter((post) => !post.hasContent);
    },
  },
  methods: {
    fillCategoriesArray() {
      this.categories = ["Has Content", "No Contet"];
    },
    updateSelectedCategory(category) {
      // Clear search results
      this.searchCriteria = "";

      // Return based on category
      if (category === this.selectedCategory) this.selectedCategory = null;
      else this.selectedCategory = category;
    },
    async init() {
      this.isLoading = true;
      this.posts = await this.returnAllIslands();
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