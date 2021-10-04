<template>
  <div v-if="item">
    <h1 class="text-center">{{ item.title }}</h1>
    <v-divider class="mb-3"></v-divider>
    <v-img class="mb-2" :src="getFeaturedImage(item)"></v-img>
    <v-container>
      <TLDR :post="item" />
      <Amenities :post="item" class="mb-3" />
      <TOC :post="item" class="mb-3" />
      <nuxt-content :document="item" />
    </v-container>
  </div>
  <v-container v-else>
    <SkeletonContent />
  </v-container>
</template>

<script>
import ContentHandlers from "../../../mixins/ContentHandlers";
import AssetHandlers from "../../../mixins/AssetHandlers";
import SkeletonContent from "../../../components/progress/SkeletonContent";
import TLDR from "../../../components/content/TLDR";
import TOC from "../../../components/content/TOC";
import Amenities from "../../../components/content/Amenities";
export default {
  layout: "oahuView",
  props: ["pathToContent"],
  data() {
    return {
      item: null,
    };
  },
  components: { SkeletonContent, TLDR, TOC },
  mixins: [ContentHandlers, AssetHandlers, Amenities],
  methods: {
    async init() {
      this.item = await this.returnContentFromParams();
    },
  },
  async created() {
    await this.init();
    this.$nuxt.$emit("pageTitleChange", this.item.title);
  },
};
</script>