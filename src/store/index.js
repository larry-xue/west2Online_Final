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
    messages: {}, // message 里面键为uid，键值为聊天内容数组
    nowChatMessages: [], // 当前的聊天数组
    nowChatUID: 0,
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
    messageOperate(state, payload) {
      if (state.messages[payload.to] === undefined) {
        state.messages[payload.to] = [];
        state.messages[payload.to].push(payload);
      } else {
        state.messages[payload.to].push(payload);
      }
    },
    nowMessageOPT(state, payload) {
      if (payload.change) {
        // 更换聊天对象
        this.nowChatMessages = [];
        if (state.messages[payload.uid] !== undefined) {
          this.nowChatMessages = state.messages[payload.uid];
        }
      } else {
        // 没有更换，有新消息
        // eslint-disable-next-line no-lonely-if
        if (state.nowChatMessages) {
          state.nowChatMessages.push(payload.message);
        }
      }
      console.log(state.nowChatMessages);
    },
    updateNowChatUID(state, payload) {
      state.nowChatUID = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
