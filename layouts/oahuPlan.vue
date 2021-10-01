<template>
  <v-app dark>
    <v-app-bar fixed app flat class="grey lighten-3">
      <v-btn
        icon
        :aria-label="`Back to Oahu search`"
        @click="$router.push('/oahu')"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main class="grey lighten-5">
      <v-container style="margin: auto">
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation fixed app flat>
      <v-btn @click="$router.push('/oahu')" value="recent">
        <span>Back</span>

        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn value="recent">
        <span>Download</span>

        <v-icon>mdi-download-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <TermsConsent />
  </v-app>
</template>

<script>
import MenuIcon from "../components/icons/MenuIcon.vue";
import ReloadIcon from "../components/icons/ReloadIcon";
import TermsConsent from "../components/TermsConsent";
export default {
  components: {
    TermsConsent,
    ReloadIcon,
    MenuIcon,
  },
  data() {
    return {
      title: "",
      value: "recent",
    };
  },
  methods: {},
  async created() {
    this.$nuxt.$on("pageTitleChange", (title) => (this.title = title));
  },
  beforeDestroy() {
    this.$nuxt.$off("pageTitleChange");
  },
};
</script>

<style scoped>
#navDrawer {
  max-height: 100% !important;
}
</style>

