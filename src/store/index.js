import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // state berisi data
    foods: [],
    cart: [],
    checkoutStatus: null
  },

  getters: {
    //computed properties
    availableFoods(state) {
      return state.foods.filter(food => food.inventory > 0);
    },

    cartFoods(state) {
      return state.cart.map(cartItem => {
        const food = state.foods.find(food => food.id === cartItem.id);
        return {
          title: food.title,
          price: food.price,
          quantity: cartItem.quantity
        };
      });
    },

    cartTotal(state, getters) {
      return getters.cartFoods.reduce(
        (total, food) => total + food.price * food.quantity,
        0
      );
    }
  },

  mutations: {
    //mutations bertugas mengubah datanya
    setFoods(state, foods) {
      state.foods = foods;
    },

    pushFoodToCart(state, foodId) {
      state.cart.push({
        id: foodId,
        quantity: 1
      });
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    decrementFoodInventory(state, food) {
      food.inventory--;
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },

    emptyCart(state) {
      state.cart = [];
    }
  },

  actions: {
    //actions memanggil mutations
    fetchFoods({ commit }) {
      return new Promise(resolve => {
        shop.getFoods(foods => {
          commit('setFoods', foods);
          resolve();
        });
      });
    },

    addFoodToCart(context, food) {
      if (food.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id == food.id);
        if (!cartItem) {
          context.commit('pushFoodToCart', food.id);
        } else {
          context.commit('incrementItemQuantity', cartItem);
        }
        context.commit('decrementFoodInventory', food);
      }
    },

    checkout({ state, commit }) {
      shop.buyFoods(
        state.cart,
        () => {
          commit('emptyCart');
          commit('setCheckoutStatus', 'success');
        },
        () => {
          commit('setCheckoutStatus', 'fail');
        }
      );
    }
  },

  modules: {}
});
