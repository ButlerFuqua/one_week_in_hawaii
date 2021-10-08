<template>
  <v-card outlined>
    <v-alert outlined color="teal" class="mb-0">
      <v-card-title
        ><v-icon> mdi-coffee-outline </v-icon>
        <span class="ml-2"> Enjoying the site?</span></v-card-title
      >
      <v-card-text>
        <p>
          Please consider
          <a
            id="linkToCheckout"
            href="https://buy.stripe.com/test_5kAeXXgfF48Df4c7ss"
            target="_blank"
          >
            buying me a coffee</a
          >.
        </p>
        <p>Your support helps keep this site free for all to use.</p>
      </v-card-text>
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: "BuyMeCoffee",
};
</script>