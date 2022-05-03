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
    "Kahoolawe",
    "What to do and see in Kahoolawe",
    "welcome",
    null,
    true
  ),
  layout: "islandNotReady",
  components: { IslandSubmitCard },
  data() {
    return {
      pageTitle: "Kahoolawe",
    };
  },
  created() {
    this.$nuxt.$emit("pageTitleChange", this.pageTitle);
  },
};
</script>