<template>
  <div id="homeContainer">
    <div id="heading">
      <div id="headingContent" class="d-flex align-center">
        <v-container class="white--text">
          <h1 class="display-4">One Week in Hawai'i</h1>
          <h2 class="headline">
            How to get the most out of your vacation in Hawai'i.
          </h2>
          <v-btn
            rounded
            class="mt-2"
            color="secondary lighten-1"
            @click="$router.push('/oahu')"
            >Search Oahu</v-btn
          >
        </v-container>
      </div>
    </div>
    <v-container
      id="islandInfo"
      class="d-flex justify-center align-center"
    ></v-container>
    <v-container id="pickIsland" class="d-flex flex-column align-center">
      <h3 class="title">What <strong>island</strong> are you interested in?</h3>
      <v-btn text rounded color="primary" @click="$router.push('/islands')"
        >Which is which?</v-btn
      >
      <div v-if="!islands">
        <v-card
          v-for="num in 7"
          :key="num"
          loading
          outlined
          min-width="300"
          color="grey lighten-2"
          class="mb-3"
        >
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-card>
      </div>
      <v-row v-else class="mt-3">
        <v-col
          v-for="island in islands"
          :key="island.title"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-card outlined class="mb-3 h-100">
            <v-img :src="getFeaturedImage(island)"></v-img>
            <div class="pa-2">
              <h4 class="title">{{ island.title }}</h4>
              <p>{{ island.description }}</p>
              <v-chip
                small
                :outlined="island.hasContent"
                :color="island.hasContent ? 'primary' : 'default'"
                :disabled="!island.hasContent"
                >{{
                  island.hasContent ? "Has Content" : "No Content yet"
                }}</v-chip
              >
              <v-card-actions>
                <v-btn text color="primary" @click="$router.push(island.home)"
                  >Discover</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import generateHeadTags from "../lib/generateMeta";
import StandardCard from "../components/StandardCard";
import PrimaryBtn from "../components/PrimaryBtn";
import WaterWaves from "../components/WaterWaves";
import ContentHandlers from "../mixins/ContentHandlers";
import AssetHandlers from "../mixins/AssetHandlers";
export default {
  head: generateHeadTags(
    "One Week in Hawaii",
    "How to get the most out of your vacation in Hawai'i.",
    "welcome",
    null,
    true
  ),
  layout: "landing",
  components: { StandardCard, PrimaryBtn, WaterWaves },
  mixins: [ContentHandlers, AssetHandlers],
  components: { StandardCard, PrimaryBtn },
  data() {
    return {
      pageTitle: "One Week in Hawaii",
      islandButtons: [
        {
          text: "Oahu",
          link: "/oahu/",
          color: "secondary",
        },
        {
          text: "Maui",
          link: "/maui/",
          color: "primary",
        },
        {
          text: "Kauai",
          link: "/kauai/",
          color: "primary",
        },
        {
          text: "Hawaii (Big Island)",
          link: "/big/",
          color: "primary",
        },
        {
          text: "Molokai",
          link: "/molokai/",
          color: "primary",
        },
        {
          text: "Lanai",
          link: "/lanai/",
          color: "primary",
        },
        {
          text: "Kahoolawe",
          link: "/kahoolawe/",
          color: "primary",
        },
      ],
      islands: null,
    };
  },
  methods: {
    async init() {
      this.islands = await this.returnAllIslands();
    },
  },
  async created() {
    this.$nuxt.$emit("pageTitleChange", this.pageTitle);
    await this.init();
  },
};
</script>

<style scoped lang="scss">
#homeContainer {
  height: 100%;
  max-width: 100%;
}
#heading {
  position: relative;
  height: 100vh;
  background: url("~assets/images/landing_background.jpg");
  background-size: cover;
  background-position: center;
  // background-image: linear-gradient(to top, #fa709a 0%, #fee140 100%);
}
#headingContent {
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
#wavesHolder {
  height: 150px;
}
</style>

