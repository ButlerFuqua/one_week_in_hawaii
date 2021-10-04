<template>
  <v-list flat dense>
    <v-subheader>Table of contents</v-subheader>
    <v-list-item-group color="blue">
      <v-list-item v-for="(link, i) in post.toc" :key="i">
        <v-list-item-icon>
          <v-icon>mdi-link</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "TOC",
  props: ["post"],
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>