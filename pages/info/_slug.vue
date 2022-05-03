<template>
  <v-container v-if="item">
    <nuxt-content :document="item" />
    <BuyMeCoffee />
  </v-container>
  <v-container v-else>
    <SkeletonContent />
  </v-container>
</template>

<script>
import ContentHandlers from "../../mixins/ContentHandlers";
import SkeletonContent from "../../components/progress/SkeletonContent";
import BuyMeCoffee from "../../components/BuyMeCoffee";
export default {
  props: ["pathToContent"],
  data() {
    return {
      item: null,
    };
  },
  components: { SkeletonContent, BuyMeCoffee },
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