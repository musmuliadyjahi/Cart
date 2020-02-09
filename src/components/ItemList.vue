<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />

    <ul v-else>
      <li v-for="food in foods" :key="food.id">
        {{ food.title }} - {{ food.price }}
      </li>
    </ul>
  </div>
</template>

<script>
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
    foods() {
      return this.$store.getters.availableFoods;
    }
  },

  created() {
    this.loading = true;
    this.$store.dispatch('fetchFoods').then(() => (this.loading = false));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
