<template>
  <div v-if="item">
    <h1 class="text-center">{{ item.title }}</h1>
    <div class="text-center">
      <small><em>Created</em>: {{ returnFriendlyCreatedDate(item) }}</small
      >,
      <small
        ><em>Last updated</em>: {{ returnFriendlyUpdatedDate(item) }}</small
      >
    </div>
    <v-divider class="mb-3"></v-divider>
    <v-img class="mb-2" :src="getFeaturedImage(item)"></v-img>
    <v-container>
      <TLDR :post="item" />
      <TOC :post="item" />
      <nuxt-content :document="item" />
    </v-container>
  </div>
  <v-container v-else>
    <SkeletonContent />
  </v-container>
</template>

<script>
import ContentHandlers from "../../mixins/ContentHandlers";
import AssetHandlers from "../../mixins/AssetHandlers";
import DateHandlers from "../../mixins/DateHandlers";
import SkeletonContent from "../../components/progress/SkeletonContent";
import TLDR from "../../components/content/TLDR";
import TOC from "../../components/content/TOC";
export default {
  layout: "blogPost",
  props: [],
  data() {
    return {
      item: null,
    };
  },
  components: { SkeletonContent, TLDR, TOC },
  mixins: [ContentHandlers, AssetHandlers, DateHandlers],
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