import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({
  isCompression: false
});

Vue.use(Vuex)

// const URL_API = 'http://localhost';

export default new Vuex.Store({
  state: {
    draw: true
  },
  plugins: [createPersistedState({
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key)
    }
  })],
  mutations: {
    setDraw(state){
      state.draw = !state.draw;
    }
  },
  actions: {
    setDraw({commit}){
      commit('setDraw')
    }
  },
  modules: {},
  getters: {
    getDraw(state){
      return state.draw
    }
  }
})