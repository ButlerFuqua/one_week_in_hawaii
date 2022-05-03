<template>
  <v-app dark>
    <v-main class="grey lighten-5">
      <div style="margin: auto; height: 100%">
        <nuxt />
      </div>
    </v-main>
    <SiteFooter />
    <TermsConsent />
  </v-app>
</template>

<script>
import SiteFooter from "../components/layout/SiteFooter";
import TermsConsent from "../components/TermsConsent";
export default {
  components: { SiteFooter, TermsConsent },
  data() {
    return {
      title: "Onew Week in Hawaii",
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

