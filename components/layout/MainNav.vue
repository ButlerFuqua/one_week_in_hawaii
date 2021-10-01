<template>
  <v-list>
    <v-list-item
      v-for="(navItem, idx) in navItems"
      :key="idx"
      :to="navItem.to"
      router
      exact
      :aria-label="`${navItem.title}`"
    >
      <v-list-item-action>
        <v-icon>
          {{ navItem.icon }}
        </v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="navItem.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      drawer: false,
      fixed: false,
      itemsInList: [],
      navItems: [
        {
          icon: "mdi-format-list-text",
          title: "Your List",
          to: "/list",
        },
        {
          icon: "mdi-human-greeting",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-turtle",
          title: "Oahu",
          to: "/oahu",
        },
        {
          icon: "mdi-island",
          title: "About Each Island",
          to: "/islands",
        },
        {
          icon: "mdi-information-outline",
          title: "About this site",
          to: "/info/about",
        },
        {
          icon: "mdi-newspaper-variant-multiple",
          title: "Articles",
          to: "/blog",
        },
      ],
      title: "",
    };
  },
};
</script>