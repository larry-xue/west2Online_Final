import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: '',
      sex: 1,
      introduction: '',
      pageBgc: '#afa',
      avatar: '',
      lock: false,
      email: '1612395322@qq.com',
    },
    friendTrend: [],
    hotTrend: [],
    likeTrend: [],
    otherUserInfo: [],
    myTrend: [],
    showChat: false,
    chatButton: true,
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
    changeOtherUserInfo(state, payload) {
      state.otherUserInfo.push(payload);
    },
    updateMyTrend(state, payload) {
      state.myTrend.push(...payload);
    },
    changeChatButton(state, payload) {
      if (payload.type === 'open') {
        state.chatButton = false;
        state.showChat = true;
      } else {
        state.chatButton = true;
        state.showChat = false;
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
