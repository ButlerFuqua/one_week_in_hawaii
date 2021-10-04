<template>
  <div v-if="item">
    <v-img class="mb-2" :src="getFeaturedImage(item)"></v-img>
    <v-container>
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
export default {
  layout: "oahuView",
  props: ["pathToContent"],
  data() {
    return {
      item: null,
    };
  },
  components: { SkeletonContent },
  mixins: [ContentHandlers, AssetHandlers],
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