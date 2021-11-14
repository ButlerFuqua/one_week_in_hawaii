<template>
  <v-app v-if="post" dark>
    <v-app-bar fixed app flat class="grey lighten-3">
      <v-btn
        icon
        :aria-label="`Back to Oahu search`"
        @click="$router.push('/oahu')"
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
        <span>Oahu</span>

        <v-icon>mdi-island</v-icon>
      </v-btn>

      <v-btn
        v-if="!postInList"
        text
        value="add"
        @click="$store.commit(`todos/add`, post)"
      >
        <span>To List</span>

        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-else value="remove" @click="$store.commit(`todos/remove`, post)">
        <span>From List</span>

        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <ShareButton />
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
import ShareButton from "../components/ShareButton";
import axios from "axios";
export default {
  components: {
    TermsConsent,
    ShareButton,
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
    async getPlace() {
      let response;
      try {
        response = await axios.get(
          `/api/place-details?id=${this.$route.params.slug}`
        );
      } catch (error) {
        console.log("error", error);
        throw error;
      }
      console.log("response", response);
      return response.data.result;
    },
    async init() {
      const { query } = this.$route;
      console.log("query", query);
      this.title = query.title;
      this.dir = query.dir;
      this.post = await this.getPlace();
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

