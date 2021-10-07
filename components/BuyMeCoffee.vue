<template>
  <div>
    <v-card class="teal lighten-4 pa-3 rounded" outlined>
      <p class="title">Enjoying the site?</p>
      <p>
        Please consider
        <a
          id="linkToCheckout"
          href="https://buy.stripe.com/test_5kAeXXgfF48Df4c7ss"
          target="_blank"
          >buying me a coffee</a
        >.
      </p>
      <p>
        <small>Your support helps keep this site free for all to use.</small>
      </p>
    </v-card>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script>
export default {
  name: "BuyMeCoffee",
};
</script>