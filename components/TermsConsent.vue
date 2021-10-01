<template>
  <transition name="slide">
    <v-alert
      v-if="show"
      id="consent"
      border="top"
      tile
      colored-border
      type="info"
      elevation="2"
      class="mb-0"
      color="secondary"
    >
      By Accessing this website, you consent to its
      <NuxtLink to="/info/terms">terms</NuxtLink>.
      <v-btn rounded elevation="0" small color="secondary" @click="giveConsent"
        >Ok</v-btn
      >
    </v-alert>
  </transition>
</template>

<script>
export default {
  name: "TermsConsent",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    giveConsent() {
      localStorage.setItem("oneweekinhawaii.com-consent", "true");
      this.show = false;
    },
    init() {
      const hasConsent = localStorage.getItem("oneweekinhawaii.com-consent");
      if (!hasConsent) this.show = true;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
#consent {
  position: fixed;
  bottom: 0;
  width: 100vh;
  z-index: 9999999;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  transform: translate(0, 100%);
}
.slide-leave-to {
  transform: translate(0, 100%);
}
</style>