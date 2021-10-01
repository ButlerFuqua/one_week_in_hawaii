<template>
  <div class="d-flex justify-center align-center pa-3 text-center h-100">
    <IslandSubmitCard :islandTitle="pageTitle" />
  </div>
</template>
<script>
import generateHeadTags from "../../lib/generateMeta";
import IslandSubmitCard from "../../components/islandSubmit/IslandSubmitCard";
export default {
  head: generateHeadTags(
    "Kauai",
    "What to do and see in Kauai",
    "welcome",
    null,
    true
  ),
  layout: "islandNotReady",
  components: { IslandSubmitCard },
  data() {
    return {
      pageTitle: "Kauai",
    };
  },
  created() {
    this.$nuxt.$emit("pageTitleChange", this.pageTitle);
  },
};
</script>