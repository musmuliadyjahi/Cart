import shop from '@/api/shop';

export default {
  state: {
    // state berisi data
    items: []
  },
  getters: {
    //computed properties
    availableFoods(state) {
      return state.items.filter(food => food.inventory > 0);
    },

    foodIsInStock() {
      return food => {
        return food.inventory > 0;
      };
    }
  },
  mutations: {
    //mutations bertugas mengubah datanya
    setFoods(state, foods) {
      state.items = foods;
    },

    decrementFoodInventory(state, food) {
      food.inventory--;
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
    }
  }
};
