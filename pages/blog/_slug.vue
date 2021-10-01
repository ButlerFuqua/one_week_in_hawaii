<template>
  <v-container v-if="item">
    <nuxt-content :document="item" />
  </v-container>
  <v-container v-else>
    <SkeletonContent />
  </v-container>
</template>

<script>
import ContentHandlers from "../../mixins/ContentHandlers";
import SkeletonContent from "../../components/progress/SkeletonContent";
export default {
  layout: "blogPost",
  props: ["pathToContent"],
  data() {
    return {
      item: null,
    };
  },
  components: { SkeletonContent },
  mixins: [ContentHandlers],
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