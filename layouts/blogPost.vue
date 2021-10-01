<template>
  <v-app v-if="post" dark>
    <v-app-bar fixed app flat class="grey lighten-3">
      <v-btn
        icon
        :aria-label="`Back to Oahu search`"
        @click="$router.push('/blog')"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-text="post.title" />
      <v-spacer />
    </v-app-bar>
    <v-main class="grey lighten-5">
      <v-container style="margin: auto">
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation fixed app flat>
      <v-btn @click="$router.push('/oahu')" value="oahu">
        <span>Search Oahu</span>

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
import MenuIcon from "../components/icons/MenuIcon.vue";
import ReloadIcon from "../components/icons/ReloadIcon";
import ContentHandlers from "../mixins/ContentHandlers";
import TermsConsent from "../components/TermsConsent";
export default {
  components: {
    TermsConsent,
    ReloadIcon,
    MenuIcon,
  },
  mixins: [ContentHandlers],
  data() {
    return {
      title: "",
      dir: "",
      slug: "",
      post: null,
      value: "recent",
    };
  },
  computed: {
    postInList() {
      const posts = this.$store.state.todos.list;
      return posts.find((post) => post.slug === this.post.slug);
    },
    todos() {
      return this.$store.state.todos.list;
    },
  },
  methods: {
    async init() {
      const { query } = this.$route;
      this.title = query.title;
      this.dir = query.dir;
      this.slug = query.slug;
      this.post = await this.returnContentFromParams();
    },
  },
  async created() {
    await this.init();
  },
  beforeDestroy() {},
};
</script>

<style scoped>
#navDrawer {
  max-height: 100% !important;
}
</style>

