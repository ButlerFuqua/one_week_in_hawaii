<template>
  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="toggleSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: ["snackbar", "text", "toggleSnackbar"],
};
</script>