import Vuex from 'vuex';
import Vue from 'vue';
import * as module from './modules';

Vue.use(Vuex);

export const appState = {
  data: {}
};

export const store = new Vuex.Store({
  strict: true,
  state: {
    ...appState,
  },
  mutations: module.mutations,
  actions: module.actions,
  getters: {
    isDisable: state => {
      return state.isDisable;
    },
  },
});
