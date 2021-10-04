<template>
  <div v-if="item">
    <h1 class="text-center">{{ item.title }}</h1>
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
import SkeletonContent from "../../components/progress/SkeletonContent";
import TLDR from "../../components/content/TLDR";
import TOC from "../../components/content/TOC";
export default {
  props: ["item"],
  components: { SkeletonContent, TLDR, TOC },
  mixins: [ContentHandlers, AssetHandlers],
};
</script>