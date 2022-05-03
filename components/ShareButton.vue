<template>
  <v-btn :disabled="isLoading" value="share" @click="handleShareClicked">
    <span>Share</span>

    <v-icon>mdi-share-outline</v-icon>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="error ? 'red' : 'green'"
    >
      {{ feedbackMessage }}
    </v-snackbar>
  </v-btn>
</template>

<script>
import PrimarySnackbar from "../components/PrimarySnackbar";
export default {
  name: "ShareButton",
  components: { PrimarySnackbar },
  data() {
    return {
      isLoading: false,
      feedbackMessage: "",
      snackbar: false,
      error: false,
    };
  },
  methods: {
    handleShareClicked() {
      this.isLoading = true;

      if (navigator && navigator.share) this.shareUsingNavigator();
      else if (navigator && navigator.clipboard);
      else this.setCannotCopyMessage();

      this.isLoading = false;
    },
    shareUsingNavigator() {
      navigator.share({ url: window.location.href });
    },
    shareUsingCopy() {
      navigator.clipboard.writeText(window.location.href);
      this.showFeedback("Link copied to clipboard!");
    },
    setCannotCopyMessage() {
      this.error = true;
      this.showFeedback("Sorry.\nThere was an error sharing the link. ");
    },
    showFeedback(message) {
      this.feedbackMessage = message;
      this.snackbar = true;
    },
    toggleSnackbar() {
      this.snackbar = false;
      console.log("hiding snackbar");
    },
  },
};
</script>