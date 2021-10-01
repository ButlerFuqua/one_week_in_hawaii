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
      <v-container style="margin: auto">
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation fixed app flat>
      <v-btn @click="$router.push('/oahu')" value="oahu">
        <span>Oahu</span>

        <v-icon>mdi-island</v-icon>
      </v-btn>
      <v-btn @click="$router.push('/list')" value="list">
        <span>List ({{ todos.length }})</span>

        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>
    </v-bottom-navigation>
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
  mixins: [],
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      itemsInList: [],
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
</style>

