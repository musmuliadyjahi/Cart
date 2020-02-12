const _foods = [
  { id: 1, title: 'Nasi Padang', price: 10000, inventory: 2 },
  { id: 2, title: 'Nasi Goreng', price: 11000, inventory: 10 },
  { id: 3, title: 'Coto Makassar', price: 20000, inventory: 5 }
];

const _clients = [
  { id: 1, name: 'Musmuliadu Jahi' },
  { id: 2, name: 'Akbar' },
  { id: 3, name: 'Afif' }
];

export default {
  getFoods(cb) {
    setTimeout(() => cb(_foods), 100);
  },

  getClients(cb) {
    setTimeout(() => cb(_clients), 100);
  },

  buyFoods(foods, cb, errorCb) {
    setTimeout(() => {
      Math.random() > 0.5 || navigator.webdriver ? cb() : errorCb();
    }, 100);
  }
};
