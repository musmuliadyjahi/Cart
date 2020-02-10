<template>
  <div class="cart">
    <ul>
      <li v-for="food in foods" :key="food.id">
        {{ food.title }} - {{ food.price }} - {{ food.quantity }}
      </li>
    </ul>

    <p>Total : {{ total }}</p>
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'Cart',
  props: {
    msg: String
  },

  computed: {
    ...mapGetters({
      foods: 'cartFoods',
      total: 'cartTotal'
    }),

    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    })
  },

  methods: {
    ...mapActions(['checkout'])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
