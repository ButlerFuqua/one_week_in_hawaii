<template>
  <div v-if="post">
    <v-chip
      v-for="amenity of amenities"
      :key="amenity"
      small
      outlined
      class="ma-1"
      :color="
        post.amenities && post.amenities.includes(amenity)
          ? 'teal lighten-2'
          : 'grey'
      "
    >
      <v-icon small v-if="post.amenities && post.amenities.includes(amenity)"
        >mdi-check</v-icon
      >
      <v-icon small v-else>mdi-close</v-icon>
      {{ amenity }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "Amenities",
  props: ["post"],
  data() {
    return {
      amenities: ["bathroom", "beach shower", "free parking"],
    };
  },
};
</script>