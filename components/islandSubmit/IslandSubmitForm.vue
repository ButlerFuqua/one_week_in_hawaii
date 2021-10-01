<template>
  <v-form v-if="!isLoading && !showFeedback" ref="form" v-model="valid">
    <v-text-field
      filled
      dense
      v-model="email"
      label="Email"
      required
      :color="color2"
      :rules="emailRules"
    ></v-text-field>
    <v-btn
      class="submitBtn"
      :disabled="!valid"
      @click="submitForm"
      :color="color1"
      dark
      >Submit</v-btn
    >
  </v-form>
  <div v-else-if="showFeedback && !isLoading">
    <v-alert :class="`${feedbackType} text-left`" :type="feedbackType">
      {{ feedbackMessage }}
    </v-alert>
    <v-btn
      @click="resetData"
      dark
      v-if="feedbackType === 'error'"
      :color="color2"
      class="info"
      >Try again</v-btn
    >
  </div>
  <v-container v-else-if="isLoading">
    <v-progress-circular
      :size="70"
      :width="7"
      :color="color1"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script>
import Airtable from "airtable";
export default {
  name: "IslandSubmitForm",
  props: ["island"],
  data() {
    return {
      color1: "pink",
      color2: "purple",
      email: "",
      valid: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) =>
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            v
          ) || "E-mail must be valid",
      ],
      isLoading: false,
      showFeedback: false,
      feedbackType: "info",
      feedbackMessage: "",
    };
  },
  methods: {
    async submitForm() {
      // Show errors if not valid
      this.$refs.form.validate();

      // Return if not valid
      if (!this.valid) return;

      this.isLoading = true;

      //Submit form
      try {
        await this.submitToDb();
        this.feedbackMessage =
          "Your email has been submitted! You will receive an email if and when a Word is received for you. Thank you and God bless.";
        this.feedbackType = "success";
      } catch (error) {
        this.feedbackMessage =
          "Sorry, there was an error submitting your email. Please try again at another time.";
        this.feedbackType = "error";
      }

      // Show feedback
      this.showFeedback = true;
      this.isLoading = false;
    },
    submitToDb() {
      return new Promise((resolve, reject) => {
        var base = new Airtable({ apiKey: process.env.api_key }).base(
          process.env.base_id
        );

        base("notify_island_available").create(
          {
            email: this.email,
            island: this.island,
          },
          function (err, record) {
            if (err) {
              console.error(err);
              reject(err);
            }
            resolve("Successful submission");
          }
        );
      });
    },
    resetData() {
      this.name = "";
      this.email = "";
      this.isLoading = false;
      this.showFeedback = false;
      this.feedbackType = "info";
      this.feedbackMessage = "";
    },
  },
};
</script>

<style scoped>
.submitBtn {
  background-image: linear-gradient(90deg, #f093fb 0%, #f5576c 100%) !important;
}
.info {
  background-image: linear-gradient(
    to top,
    #00c6fb 0%,
    #005bea 100%
  ) !important;
}
.success {
  background-image: linear-gradient(
    to top,
    #43e97b 0%,
    #38f9d7 100%
  ) !important;
  color: #333333;
}
.error {
  background-image: linear-gradient(
    to top,
    #f43b47 0%,
    #453a94 100%
  ) !important;
}
</style>