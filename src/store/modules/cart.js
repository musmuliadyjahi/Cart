import shop from '@/api/shop';

export default {
  state: {
    items: [],
    checkoutStatus: null
  },

  getters: {
    cartFoods(state, getters, rootState) {
      return state.items.map(cartItem => {
        const food = rootState.foods.items.find(
          food => food.id === cartItem.id
        );
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
    pushFoodToCart(state, foodId) {
      state.items.push({
        id: foodId,
        quantity: 1
      });
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },

    emptyCart(state) {
      state.items = [];
    }
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
    addFoodToCart({ state, getters, commit, rootState }, food) {
      if (getters.foodIsInStock(food)) {
        const cartItem = state.items.find(item => item.id === food.id);
        if (!cartItem) {
          commit('pushFoodToCart', food.id);
        } else {
          commit('incrementItemQuantity', cartItem);
        }
        commit('decrementFoodInventory', food);
      }
    },

    checkout({ state, commit }) {
      shop.buyFoods(
        state.items,
        () => {
          commit('emptyCart');
          commit('setCheckoutStatus', 'success');
        },
        () => {
          commit('setCheckoutStatus', 'fail');
        }
      );
    }
  }
};
