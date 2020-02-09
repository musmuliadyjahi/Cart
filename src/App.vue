<template>
  <div id="app">
    <FoodList msg="List Menu" />
    <hr />
    <Cart />
  </div>
</template>

<script>
import FoodList from './components/FoodList.vue';
import Cart from './components/Cart.vue';

export default {
  name: 'App',
  components: {
    FoodList,
    Cart
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
