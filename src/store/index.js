import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: 'azoux',
      sex: 1,
      introduction: 'a nice guy',
      pageBgc: '#afa',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      lock: false,
      email: '1612395322@qq.com',
    },
  },
  mutations: {
    updateUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
