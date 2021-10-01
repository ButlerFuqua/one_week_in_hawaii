<template>
  <div>
    <v-skeleton-loader max-width="250" type="text"></v-skeleton-loader>
    <v-progress-linear
      indeterminate
      color="grey lighten-2"
      class="my-3"
    ></v-progress-linear>
    <div v-for="num in 4" :key="num" class="mb-3">
      <v-skeleton-loader max-width="150" type="text"></v-skeleton-loader>
      <v-skeleton-loader type="text@3"></v-skeleton-loader>
      <v-skeleton-loader class="mt-3" type="text@2"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonContent",
};
</script>

