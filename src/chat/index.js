// socket io init
import io from 'socket.io-client';
import store from 'vuex';

const CHAT = {
  socket: null,
  init() {
    this.socket = io.connect('ws://39.97.113.252:8080/api/v1/chat');
    // 接收聊天内容
    this.socket.on('chat', (res) => {
      console.log(res);
      const resData = res.data.data;
      for (let i = 0; i < resData.messages.length; i += 1) {
        if (resData[i].type === 'message') {
          // 消息
          store.commit('messageOperate', {
          });
        } else if (resData[i].type === 'apply') {
          // 好友申请
        } else if (resData[i].type === 'notice') {
          // 系统通知，可能是已被移除好友
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
