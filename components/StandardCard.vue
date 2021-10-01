<template>
  <v-card :tile="tile" :class="bgClass ? bgClass : ''" class="pa-3" flat>
    <slot name="content"></slot>
  </v-card>
</template>

<script>
export default {
  name: "StandardCard",
  props: ["bgClass", "tile"],
};
</script>

<style lang="scss" scoped>
.fadedWhite {
  background: rgba(255, 255, 255, 0.5);
}
</style>