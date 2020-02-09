<template>
  <div class="cart">
    <ul>
      <li v-for="food in foods" :key="food.id">
        {{ food.title }} - {{ food.price }} - {{ food.quantity }}
      </li>
    </ul>

    <p>Total : {{ total }}</p>
    <button @click="$store.dispatch('checkout')">Checkout</button>
    <p v-if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    msg: String
  },

  computed: {
    foods() {
      return this.$store.getters.cartFoods;
    },

    total() {
      return this.$store.getters.cartTotal;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
