<template>
  <div class="chat">
    <el-drawer
      :visible="showChat"
      direction="rtl"
      :close-on-press-escape="true"
      :withHeader="false"
      size="35%"
      :show-close="false"
      :modal="false"
      :modal-append-to-body="false"
      title="聊天列表"
    >
      <div class="chat-list" v-show="!showHeader">
        <vue-scroll>
          <friendList @chatWithAGuy="chatWhithSomeone" ref="body"></friendList>
        </vue-scroll>
      </div>
      <div class="chat-body-wrapper" v-show="showHeader">
        <el-page-header style="padding: 0.5rem" @back="goBack" :content="chatWithWho"></el-page-header>
        <div class="chat-body">
          <vue-scroll slot="refresh-start" ref="body2" @handle-resize="handleResize" :ops="ops">
            <div class="chat-body-content">
              <!-- 聊天内容 -->
              <messageItem v-for="item in messages" :key="item.mid" :itemInfo="item"></messageItem>
            </div>
          </vue-scroll>
          <div class="chat-body-input">
            <!-- 输入框ww -->
            <div class="send-input" :class="sendClasses">
              <div
                contenteditable="true"
                id="messageInput"
                class="input-editor"
                placeholder="告诉你个小秘密~~"
              ></div>
              <div class="input-bottom">
                <!-- 图片预览 -->
                <div class="img-item-wrapper" v-for="(item, index) in imgs" :key="index">
                  <el-image :src="item" :preview-src-list="imgs"></el-image>
                  <span class="del-img" @click="delThisImg(index)"></span>
                </div>
              </div>
            </div>
            <div class="bottom-bottom">
              <div class="send-options">
                <div class="options-item" @click="onOptions">
                  <i class="el-icon-moon-night"></i>
                  <el-popover placement="bottom" width="400" trigger="click">
                    <emoji-picker @selectEmoji="addEmojiContent"></emoji-picker>
                    <span slot="reference">&nbsp;心情</span>
                  </el-popover>
                </div>

                <div class="options-item" @click="selectImg">
                  <i class="el-icon-picture"></i>
                  <span>&nbsp;图片</span>
                </div>
              </div>
              <div class="send-trend">
                <el-button type="primary" size="mini" @click="sendMessage()">发送</el-button>
              </div>
            </div>
            <input type="file" style="display: none" @change="uploadImg" id="img2" />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import friendList from './friends/friendList.vue';
import emojiPicker from './emojiPick.vue';
import messageItem from './social/messageItem.vue';
import CHAT from '../chat/index';

export default {
  computed: {
    ...mapState({
      showChat: (state) => state.showChat,
      messages: (state) => state.nowChatMessages,
    }),
  },
  components: {
    emojiPicker,
    friendList,
    messageItem,
  },
  watch: {
    messages() {
      console.log('ioas');
      this.$refs.body2.scrollTo(
        {
          y: '100%',
        },
        700,
      );
    },
  },
  data() {
    return {
      chatWithWho: 'azoux',
      showHeader: false,
      sendClasses: ['input-content'],
      imgs: [],
      uploadImgs: [],
      haveImg: false,
      CHAT,
      otherInfo: {},
      ops: {
        vuescroll: {
          mode: 'slide',
          sizeStrategy: 'percent',
          detectResize: true,
          scroller: {
            minZoom: 1,
            maxZoom: 1,
          },
        },
      },
    };
  },
  methods: {
    handleResize(a, b, c) {
      // 有新消息就滑动到底部
      console.log(a, b, c);
    },
    sendMessage() {
      let message = document.getElementById('messageInput').innerHTML;
      message = message.replace(/<div>/g, '');
      message = message.replace(/<\/div>/g, '\r\n');
      message = message.replace(/&nbsp;/g, ' ');
      message = message.replace(/<br>/g, '\r\n');
      console.log(message);
      // 发送信息
      console.log(this.imgs);
      if (this.haveImg) {
        // 有图片，再判断是否有content
        if (message !== '') {
          // 分成 两条发送
          CHAT.sendMessage(message, false, this.otherInfo.uid);
          CHAT.sendMessage(this.uploadImgs[0], true, this.otherInfo.uid);
        } else {
          // 只有图片
          CHAT.sendMessage(this.uploadImgs[0], true, this.otherInfo.uid);
        }
      } else {
        // 只有content
        CHAT.sendMessage(message, false, this.otherInfo.uid);
      }
      document.getElementById('messageInput').innerHTML = '';
      this.uploadImgs = [];
      this.imgs = [];
      this.haveImg = false;
    },
    goBack() {
      this.showHeader = false;
    },
    chatWhithSomeone(item) {
      this.showHeader = true;
      this.otherInfo = item;
      this.chatWithWho = item.username;
    },
    uploadImg(e) {
      const file = e.target.files[0];
      // 上传图片
      const param = new FormData(); // 创建form对象
      param.append('images', file); // 通过append向form对象添加数据
      this.$http.post('v1/files', param).then((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const that = this;
        // eslint-disable-next-line func-names
        reader.onload = function () {
          const url = this.result.substring(this.result.indexOf(',') + 1);
          that.imgs.push(`data:image/png;base64,${url}`);
          // that.$refs['imgimg'].setAttribute('src','data:image/png;base64,'+url);
        };
        // 保存信息
        console.log(res.data.data);
        this.uploadImgs.push(res.data.data.files[0].path);
        this.haveImg = true;
      });
    },
    addEmojiContent(item) {
      document.getElementById('messageInput').innerHTML += item;
    },
    selectImg() {
      // 上传图片到服务器，返回url
      if (!this.haveImg) {
        const img = document.getElementById('img2');
        img.click();
      } else {
        this.$notify({
          message: '一次最多发送一张图片',
          position: 'bottom-left',
          timeout: 1500,
        });
      }
    },
    delThisImg(index) {
      // 删除上传的指定图片
      this.imgs.splice(index, 1);
      this.uploadImgs.splice(index, 1);
      this.haveImg = false;
    },
    onOptions() {
      this.doNotMiss = true;
    },
  },
};
</script>

<style scoped>
.chat {
  position: relative;
}

.chat-list {
  height: 90vh;
}

.chat-body {
  height: 66vh;
}

.chat-body-input {
  position: absolute;
  width: 90%;
  bottom: 0;
  right: 0;
  margin-right: 5%;
}

.chat-list-header {
  text-align: left;
  font-size: 14px;
  padding: 0.5rem;
}

.social-body-send {
  background-color: #fff;
  padding: 1rem;
}

.send-input {
}

.input-content {
  border: 1px solid #ccc;
  min-height: 40px;
  background-color: rgb(249, 250, 251);
}

.input-editor {
  text-align: left;
  padding: 0.5rem;
  cursor: text;
}

.input-focus {
  border: 1px blue solid;
  background-color: #fff;
}

[contenteditable]:focus {
  outline: none;
}

.input-editor:empty::before {
  content: attr(placeholder);
  font-size: 14px;
  color: #ccc;
  line-height: 21px;
  padding-top: 10px;
}

.send-options {
  width: 40%;
  display: flex;
  justify-content: space-around;
}

.bottom-bottom {
  margin-top: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.options-item {
  color: #027fff;
  font-size: 14px;
  cursor: pointer;
}

.input-bottom {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 12px;
  position: relative;
}

.img-item-wrapper {
  position: relative;
  cursor: pointer;
}

.input-bottom .el-image {
  border-radius: 2px;
  margin: 0 0.666rem 0.666rem 0;
  width: 5.68rem;
  height: 5.68rem;
  background-repeat: no-repeat;
  background-size: cover;
  flex: 0 0 auto;
  background-position: 50%;
}

.del-img {
  cursor: pointer;
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  top: 0.333rem;
  right: 1rem;
  border-radius: 50%;
  border: 1px solid #c5c5c5;
  background: rgba(0, 0, 0, 0.4);
  transform: rotate(45deg);
  overflow: hidden;
}

.del-img::before {
  content: "";
  width: 0.5rem;
  height: 1px;
  display: block;
  position: absolute;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.del-img::after {
  content: "";
  width: 0.5rem;
  height: 1.5px;
  display: block;
  position: absolute;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
}
</style>
