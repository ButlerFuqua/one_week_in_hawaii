<template>
  <v-container v-if="plan">
    <nuxt-content :document="plan" />
  </v-container>
  <v-container v-else>
    <SkeletonContent />
  </v-container>
</template>

<script>
import ContentHandlers from "../../../mixins/ContentHandlers";
import SkeletonContent from "../../../components/progress/SkeletonContent";
export default {
  layout: "oahuView",
  data() {
    return {
      plan: null,
    };
  },
  components: { SkeletonContent },
  mixins: [ContentHandlers],
  methods: {
    async init() {
      const { params } = this.$route;
      this.plan = await this.returnContentFromParams();
    },
  },
  async created() {
    await this.init();
    this.$nuxt.$emit("pageTitleChange", this.plan.title);
  },
};
</script>