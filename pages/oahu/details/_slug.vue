<template>
  <div v-if="place">
    <h1 class="text-center">{{ place.name }}</h1>
    <v-divider class="mb-3"></v-divider>
    <!-- <v-img class="mb-2" :src="getFeaturedImage(place_id)"></v-img> -->
    <v-container>
      <BuyMeCoffee />
    </v-container>
  </div>
  <v-container v-else>
    <SkeletonContent />
  </v-container>
</template>

<script>
import SkeletonContent from "../../../components/progress/SkeletonContent";
import TOC from "../../../components/content/TOC";
import axios from "axios";
import BuyMeCoffee from "../../../components/BuyMeCoffee";
export default {
  layout: "oahuView",
  data() {
    return {
      place: null,
    };
  },
  components: { SkeletonContent, TOC, BuyMeCoffee },
  methods: {
    async getPlace() {
      let response;
      try {
        response = await axios.get(
          `/api/place-details?id=${this.$route.params.slug}`
        );
      } catch (error) {
        console.log("error", error);
        throw error;
      }
      return response.data.result;
    },
    async init() {
      this.place = await this.getPlace();
    },
  },
  async created() {
    await this.init();
    this.$nuxt.$emit("pageTitleChange", this.place.name);
  },
};
</script>