<template>
  <v-container>
    <div id="categoryContainer">
      <v-btn
        v-for="category in categories"
        :key="category"
        class="mr-2"
        small
        rounded
        :disabled="isLoading"
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
      :disabled="isLoading"
      class="mt-2"
      outlined
      placeholder="Search..."
      v-model="searchCriteria"
      append-outer-icon="mdi-magnify"
      @click:append-outer="submitSearch"
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
    <v-row v-else-if="todos">
      <v-col
        v-for="place in places"
        :key="place.place_id"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card class="mb-4 h-100" outlined>
          <v-img height="200" :src="getFeaturedImage(place)"></v-img>
          <div class="pa-3">
            <h3 class="title">{{ place.name }}</h3>
            <p class="caption">{{ place.description }}</p>
            <v-chip small outlined class="mr-1" color="default">{{
              place.vicinity
            }}</v-chip>
            <v-chip small outlined class="mr-1" color="default"
              >Google Rating: {{ place.rating }}</v-chip
            >
          </div>
          <v-card-actions class="justify-space-between">
            <v-btn rounded text color="primary" @click="navigateToPage(place)"
              >View</v-btn
            >
            <v-btn
              v-if="!todos.find((item) => item.place_id === place.place_id)"
              small
              rounded
              text
              color="teal"
              @click="$store.commit(`todos/add`, place)"
            >
              Add to List
            </v-btn>
            <v-btn
              v-else
              small
              rounded
              text
              color="red"
              @click="$store.commit(`todos/remove`, place)"
            >
              Remove From List
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import generateHeadTags from "../../lib/generateMeta";
import ContentHandlers from "../../mixins/ContentHandlers";
import AssetHandlers from "../../mixins/AssetHandlers";
import axios from "axios";
export default {
  head: generateHeadTags(
    "Oahu",
    "Search for what to do in Oahu Hawaii.",
    "oahu",
    "oahu"
  ),
  layout: "oahu",
  components: {},
  mixins: [ContentHandlers, AssetHandlers],
  data() {
    return {
      pageTitle: "Oahu",
      isLoading: true,
      categories: [
        "beach",
        "hike",
        "sites",
        "lookouts",
        "surf",
        "snorkel",
        "sail",
      ],
      selectedCategories: ["beach"],
      places: [],
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
        post.categories?.some((cat) => lowered.includes(cat))
      );
    },
  },
  methods: {
    navigateToPage(place) {
      this.$router.push(`/oahu/details/${place.place_id}`);
    },
    async updateSelectedCategories(selectedCategory) {
      this.isLoading = true;

      // clear search criteria to show results from filters
      this.searchCriteria = "";

      // update filters
      if (this.selectedCategories.includes(selectedCategory))
        this.selectedCategories = this.selectedCategories.filter(
          (cat) => cat !== selectedCategory
        );
      else this.selectedCategories.push(selectedCategory);

      await this.getPlacesCategory();
      this.isLoading = false;
    },
    async submitSearch() {
      if (this.searchCriteria.trim().length < 3)
        return this.getPlacesCategory();

      this.isLoading = true;

      this.selectedCategories = [];

      await this.getPlacesSearch();

      this.isLoading = false;
    },
    async getPlacesSearch() {
      let getPlacesResponse;
      try {
        getPlacesResponse = await axios.get(
          `/api/list-places?category=${this.searchCriteria}`
        );
      } catch (error) {
        getPlacesResponse = {
          data: (error = error.message || JSON.stringify(error)),
        };
      }

      if (getPlacesResponse.error) {
        console.error(getPlacesResponse.error);
        this.places = [];
      }
      this.places = getPlacesResponse.data.results;

      console.log("getPlacesResponse", getPlacesResponse);

      console.log("places", this.places);
    },
    async getPlacesCategory() {
      if (this.selectedCategories.length == 0)
        this.selectedCategories = ["beach"];

      let getPlacesResponse;
      try {
        getPlacesResponse = await axios.get(
          `/api/list-places?category=${this.selectedCategories.join(",")}`
        );
      } catch (error) {
        getPlacesResponse = {
          data: (error = error.message || JSON.stringify(error)),
        };
      }

      if (getPlacesResponse.error) {
        console.error(getPlacesResponse.error);
        this.places = [];
      }
      this.places = getPlacesResponse.data.results;

      console.log("getPlacesResponse", getPlacesResponse);

      console.log("places", this.places);
    },
    async init() {
      this.isLoading = true;
      await this.getPlacesCategory();
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