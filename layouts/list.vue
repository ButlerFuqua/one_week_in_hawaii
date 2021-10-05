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
    <v-main v-if="!showSupport" class="grey lighten-5">
      <v-container style="margin: auto">
        <nuxt />
      </v-container>
    </v-main>
    <v-main v-else class="grey lighten-5">
      <v-container class="d-flex justify-center align-center h-100 text-center">
        <div>
          <h1 class="title mb-5">You're download has started.</h1>
          <h2 class="headline mb-5">Hope you enjoy your vacation!</h2>
          <h2 class="title mb-3">Buy me a coffee?</h2>
          <p class="display-1">
            <a
              id="linkToCheckout"
              href="https://buy.stripe.com/test_5kAeXXgfF48Df4c7ss"
              target="_blank"
              >$2.50 - Of course!</a
            >
          </p>
          <p class="mt-4">
            Your support helps keep this site free for all to use.
          </p>
          <v-btn rounded text small color="primary" @click="showSupport = false"
            >No thanks</v-btn
          >
        </div>
      </v-container>
    </v-main>
    <v-bottom-navigation fixed app flat>
      <v-btn @click="$router.push('/oahu')" value="oahu">
        <span>Oahu</span>

        <v-icon>mdi-island</v-icon>
      </v-btn>

      <v-btn
        text
        value="doanload"
        :disabled="!todos || todos.length < 1"
        @click="downloadHandler()"
      >
        <span>Download list</span>

        <v-icon>mdi-download-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <TermsConsent />
  </v-app>
</template>

<script>
import MainNav from "../components/layout/MainNav";
import MenuIcon from "../components/icons/MenuIcon.vue";
import ReloadIcon from "../components/icons/ReloadIcon";
import ContentHandlers from "../mixins/ContentHandlers";
import TermsConsent from "../components/TermsConsent";
import { jsPDF } from "jspdf";
export default {
  components: {
    MainNav,
    TermsConsent,
    ReloadIcon,
    MenuIcon,
  },
  mixins: [ContentHandlers],
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
  },
  data() {
    return {
      showSupport: false,
      drawer: false,
      title: "Your vacation List",
      value: "download",
    };
  },
  methods: {
    async downloadHandler(setLoader, sourceArray) {
      // Show loading state, if applicable
      if (setLoader) setLoader(true);

      const {
        window: {
          location: { origin: rootDomain },
        },
      } = window;

      const doc = new jsPDF();

      // Fetch items from conent
      // User passed in array if present, otherwise use list in state
      let items;
      if (sourceArray)
        items = await Promise.all(
          sourceArray.map(async (item) => this.returnContentFromObj(item))
        );
      else
        items = await Promise.all(
          this.todos.map(async (item) => this.returnContentFromObj(item))
        );

      if (items.length < 1) return alert("You have no items in your list.");

      // Print Items
      // Set page consts and items to track
      let currentPage = 1;
      let startingPoint = 20;
      const itemLength = 50;
      doc.setPage(currentPage);

      items.forEach((item, idx) => {
        let pageHeight = doc.internal.pageSize.getHeight();

        // Reset page if run out of room
        if (startingPoint + itemLength > pageHeight - 10) {
          doc.addPage();
          currentPage++;
          doc.setPage(currentPage);
          startingPoint = 25;
        }

        // Write item to PDF
        doc.setFontSize(14);
        doc.text(item.title, 10, startingPoint);
        doc.setFontSize(12);
        doc.text(item.description, 10, startingPoint + 10);
        doc.setTextColor(255, 30, 200);
        doc.textWithLink("Visit Page", 10, startingPoint + 20, {
          url: `${rootDomain}/oahu/${
            item.dir.includes("plans") ? "plans" : "do"
          }/${item.slug}`,
        });
        doc.setTextColor(0, 0, 0);
        doc.text("________________", 10, startingPoint + 30); // End line

        // Update starting point
        startingPoint += itemLength;
      });

      // Download pdf
      doc.save("hawaii_vacation_list.pdf");

      // Remove loading state if applicable
      if (setLoader) setLoader(false);

      // Show support page
      this.showSupport = true;
    },
  },
};
</script>

<style scoped>
#navDrawer {
  max-height: 100% !important;
}
</style>

