<template>
  <v-btn
    :class="btnColor ? btnColor : 'primaryBtn'"
    rounded
    :dark="dark"
    :disabled="disabled"
    @click="action ? action() : null"
    >{{ text }}</v-btn
  >
</template>

<script>
export default {
  name: "PrimaryBtn",
  props: ["text", "action", "btnColor", "disabled", "dark"],
};
</script>

<style lang="scss" scoped>
button {
  font-weight: regular;
}
.primaryBtn {
  background-image: $primary-gradient;
}
.secondaryBtn {
  background-image: $secondary-gradient;
}
</style>