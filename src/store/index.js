import { createStore } from 'vuex';
import authModule from './modules/auth/auth.js';
import materialsModule from './modules/materials/materials.js';
import palletizerModule from './modules/palletizer/palletizer.js';

export default createStore({
  modules: {
    authModule: authModule,
    materials: materialsModule,
    palletizer: palletizerModule,
  },
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
});
