<template>
  <v-container id="pdf">
    <div v-if="(todos && todos.length < 1) || todos.length < 1">
      <p>Your list is empty!</p>
    </div>
    <div v-else>
      <h2 class="headline">Oahu</h2>
      <v-divider class="my-2"></v-divider>

      <v-list>
        <template v-for="(place, idx) in todos">
          <v-list-item two-line :key="place.name">
            <v-list-item-content>
              <v-list-item-title>{{ place.name }}</v-list-item-title>
              <v-list-item-subtitle>
                Rating: {{ place.rating }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                small
                text
                rounded
                color="red"
                @click="removeHandler(place)"
                >Remove</v-btn
              >
            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                small
                text
                rounded
                color="blue"
                @click="navigateToPage(place)"
                >View</v-btn
              >
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="idx"></v-divider>
        </template>
      </v-list>
    </div>
  </v-container>
</template>

<script>
import generateHeadTags from "../lib/generateMeta";
import ContentHandlers from "../mixins/ContentHandlers";
import AssetHandlers from "../mixins/AssetHandlers";
export default {
  head: generateHeadTags(
    "Your Vacation List",
    "A list of activities you've saved for your trip.",
    "welcome",
    null,
    true
  ),
  layout: "list",
  components: {},
  mixins: [ContentHandlers, AssetHandlers],
  data() {
    return {
      pageTitle: "Your Vacation List",
      islands: [
        "Ohau",
        "Hawaii",
        "Maui",
        "Kauai",
        "Molokai",
        "Lanai",
        "Kahoolawe",
      ],
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
  },
  methods: {
    navigateToPage(place) {
      this.$router.push(`/oahu/details/${place.place_id}`);
    },
    async removeHandler(item) {
      this.$store.commit(`todos/remove`, item);
    },
  },
  async created() {
    this.$nuxt.$emit("pageTitleChange", this.pageTitle);
    // if (process.client) await this.init();

    if (this.todos) console.log("todos", this.todos);
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.todo-card {
  margin-bottom: 30px;
}
</style>

