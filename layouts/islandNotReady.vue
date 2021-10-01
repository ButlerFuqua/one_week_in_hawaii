<template>
  <v-app dark>
    <v-navigation-drawer id="navDrawer" v-model="drawer" fixed app>
      <MainNav />
    </v-navigation-drawer>
    <v-app-bar fixed app flat class="grey lighten-3">
      <v-btn
        icon
        :aria-label="`Toggle Side nav`"
        @click.stop="drawer = !drawer"
      >
        <menu-icon />
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main class="grey lighten-5">
      <div id="contentWrapper" style="margin: auto; height: 100%">
        <nuxt />
      </div>
    </v-main>
    <TermsConsent />
  </v-app>
</template>

<script>
import MainNav from "../components/layout/MainNav";
import MenuIcon from "../components/icons/MenuIcon.vue";
import ReloadIcon from "../components/icons/ReloadIcon";
import TermsConsent from "../components/TermsConsent";
export default {
  components: {
    MainNav,
    TermsConsent,
    ReloadIcon,
    MenuIcon,
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      title: "",
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
#contentWrapper {
  background: url("~assets/images/landing_background.jpg");
  background-size: cover;
  background-position: center;
}
</style>

