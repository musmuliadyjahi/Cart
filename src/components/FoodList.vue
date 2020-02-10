<template>
  <div class="food">
    <h1>{{ msg }}</h1>

    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />

    <ul v-else>
      <li v-for="food in foods" :key="food.id">
        {{ food.title }} - {{ food.price }} - {{ food.inventory }}
        <button :disabled="!foodIsInStock(food)" @click="addFoodToCart(food)">
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'FoodList',
  props: {
    msg: String
  },

  data() {
    return {
      loading: false
    };
  },

  computed: {
    ...mapState({
      foods: state => state.foods.items
    }),

    ...mapGetters({
      foodIsInStock: 'foodIsInStock'
    })
  },

  methods: {
    ...mapActions({
      fetchFoods: 'fetchFoods',
      addFoodToCart: 'addFoodToCart'
    })
  },

  created() {
    this.loading = true;
    this.fetchFoods().then(() => (this.loading = false));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
