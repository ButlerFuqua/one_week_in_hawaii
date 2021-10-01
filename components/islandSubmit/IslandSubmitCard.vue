<template>
  <v-card dark>
    <div class="pa-3 text-center">
      <h1 class="headline">{{ islandTitle }}</h1>
      <h3 class="title">
        <em>Not yet available</em>
      </h3>
      <p>
        Please submit your email if you would like to be notified when
        information on this island is available.
      </p>
      <IslandSubmitForm :island="islandTitle" />
      <small>Your email will not be shared with other services.</small>
    </div>
    <v-card-actions>
      <v-btn text color="primary lighten-3" @click="$router.push('/oahu')"
        >Search Oahu</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import IslandSubmitForm from "./IslandSubmitForm";
export default {
  layout: "islandNotReady",
  props: ["islandTitle"],
  components: { IslandSubmitForm },
};
</script>
