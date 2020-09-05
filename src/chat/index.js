// socket io init
import io from 'socket.io-client';
import Vue from 'vue';
import store from '../store/index';
import Storage from '../storage/storage';

const v = new Vue();

const CHAT = {
  socket: null,
  init() {
    const token = Storage.localGet('token');
    this.socket = io.connect('http://39.97.113.252:5000/chat', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `JWT ${token}`,
            withCredentials: true,
          },
        },
      },
    });
    // 接收聊天内容
    this.socket.on('chat', (res) => {
      console.log(res);
      const resData = res.data;
      for (let i = 0; i < resData.messages.length; i += 1) {
        if (resData.messages[i].type === 'message') {
          // 消息
          store.commit('messageOperate', resData.messages[i]);
          if (store.state.nowChatUID === resData.messages[i].to || store.state.nowChatUID === resData.messages[i].from) {
            store.commit('nowMessageOPT', {
              message: resData.messages[i],
              change: false,
            });
          }
        } else if (resData.messages[i].type === 'apply') {
          // 好友申请
          if (resData.messages[i].from !== store.state.userInfo.uid) {
            v.$notify({
              message: '有人添加你为好友嗷~~快去看看吧',
              position: 'left',
              timeout: 1500,
            });
          }
        } else if (resData.messages[i].type === 'notice') {
          // 系统通知，可能是已被移除好友
          v.$notify({
            message: resData.messages[i].content,
            position: 'left',
            timeout: 1500,
          });
        }
      }
    });
  },
  // eslint-disable-next-line camelcase
  sendMessage(content, is_url, to) {
    this.socket.emit('chat', {
      content,
      is_url,
      to,
    });
  },

};

export default CHAT;
