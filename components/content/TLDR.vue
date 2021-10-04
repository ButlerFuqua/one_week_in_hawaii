<template>
  <div v-if="post.description">
    <div class="grey lighten-3 pa-2">
      <h3 class="title mb-0">TL;DR</h3>
      <small>( <em>too long, didn't read</em> )</small>
      <p class="mt-2">{{ post.tldr || post.description }}</p>
    </div>
    <v-divider class="my-3"></v-divider>
  </div>
</template>

<script>
export default {
  name: "TLDR",
  props: ["post"],
};
</script>

