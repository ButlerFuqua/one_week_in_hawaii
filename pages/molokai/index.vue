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
    "Molokai",
    "What to do and see in Molokai",
    "welcome",
    null,
    true
  ),
  layout: "islandNotReady",
  components: { IslandSubmitCard },
  data() {
    return {
      pageTitle: "Molokai",
    };
  },
  created() {
    this.$nuxt.$emit("pageTitleChange", this.pageTitle);
  },
};
</script>