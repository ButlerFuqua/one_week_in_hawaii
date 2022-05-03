<template>
  <div class="blue-grey darken-2 white--text">
    <v-container>
      <v-row>
        <v-col sm="12" md="4">
          <h5 class="title">Pages</h5>
          <v-btn
            v-for="btn in pageLinks"
            :key="btn.text"
            text
            rounded
            color="teal lighten-4"
            @click="$router.push(btn.path)"
            >{{ btn.text }}</v-btn
          >
        </v-col>
        <v-col sm="12" md="4">
          <h5 class="title">Islands</h5>
          <v-btn
            v-for="btn in islandLinks"
            :key="btn.text"
            text
            rounded
            color="teal lighten-4"
            @click="$router.push(btn.path)"
            >{{ btn.text }}</v-btn
          >
        </v-col>
        <v-col sm="12" md="4">
          <h5 class="title">Other</h5>
          <v-btn
            v-for="btn in otherLinks"
            :key="btn.text"
            text
            rounded
            color="teal lighten-4"
            @click="$router.push(btn.path)"
            >{{ btn.text }}</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <p>
        <small>
          &copy; Copyright 2021{{
            new Date().getFullYear() > 2021
              ? `-${new Date().getFullYear()}`
              : ""
          }}
        </small>
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SiteFooter",
  data() {
    return {
      pageLinks: [
        {
          text: "About this site",
          path: "/info/about",
        },
        {
          text: "Articles",
          path: "/blog",
        },
      ],
      islandLinks: [
        {
          text: "About the islands",
          path: "/blog/which-hawaiian-island-is-which",
        },
        {
          text: "Oahu",
          path: "/oahu",
        },
        {
          text: "Big Island",
          path: "/big",
        },
        {
          text: "Maui",
          path: "/maui",
        },
        {
          text: "Kauai",
          path: "/kauai",
        },
        {
          text: "Molokai",
          path: "/molokai",
        },
        {
          text: "Kahoolawe",
          path: "/kahoolawe",
        },
      ],
      otherLinks: [
        {
          text: "You List",
          path: "/list",
        },
        {
          text: "Site information",
          path: "/info",
        },
        {
          text: "Contact",
          path: "/info/contact",
        },
        {
          text: "Disclaimer",
          path: "/info/disclaimer",
        },
        {
          text: "Terms",
          path: "/info/terms",
        },
      ],
    };
  },
};
</script>