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
    friendTrend: [],
    hotTrend: [],
    likeTrend: [],
  },
  mutations: {
    updateUserInfo(state, payload) {
      state.userInfo = payload;
    },
    addLikeTrend(state, payload) {
      if (payload instanceof Array) {
        state.likeTrend.push(...payload);
      } else {
        state.likeTrend.unshift(payload);
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
