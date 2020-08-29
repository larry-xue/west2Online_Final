<template>
  <div id="app">
    <router-view />
    <div class="chat-cmp">
      <div v-show="chatButton" class="chatButton cursor" @click="openChat">
        <i class="el-icon-chat-line-square"></i>
      </div>
      <div class="chat-body">
        <chat v-show="showChat"></chat>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import chat from './components/chat.vue';

export default {
  components: {
    chat,
  },
  mounted() {
    // const body = document.getElementById('app');
    // body.style.width = `calc(100vw - ${this.getScrollWidth()}px)`;
    const tHis = this;
    document.addEventListener('click', (e) => {
      // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
      const flag = e.target.contains(document.getElementsByClassName('el-drawer')[0]);
      if (!flag) return;
      tHis.$store.commit('changeChatButton', {
        type: 'close',
      });
    });
  },
  computed: {
    ...mapState({
      showChat: (state) => state.showChat,
      chatButton: (state) => state.chatButton,
    }),
  },
  methods: {
    getScrollWidth() {
      // 计算scroll宽度，防止因为下拉导致100vw溢出
      const oDiv = document.createElement('div');
      console.log(oDiv);
      oDiv.style.cssText = 'position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;';
      const noScroll = document.body.appendChild(oDiv).clientWidth;
      oDiv.style.overflowY = 'scroll';
      const scroll = oDiv.clientWidth;
      document.body.removeChild(oDiv);
      return noScroll - scroll;
    },
    openChat() {
      this.$store.commit('changeChatButton', {
        type: 'open',
      });
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Inter UI", "-apple-system", "BlinkMacSystemFont", "Segoe UI",
    "Roboto", "Helvetica Neue", Arial, sans-serif, "AppleColor Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: rgb(244, 245, 245);
}

body {
  background-color: rgb(244, 245, 245);
}

.cursor {
  cursor: pointer;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
input::-webkit-input-placeholder {
  /* WebKit browsers 适配谷歌 */
  color: #bdcada;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 适配火狐 */
  color: #bdcada;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ 适配火狐 */
  color: #bdcada;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+  适配ie*/
  color: #bdcada;
}

.chatButton {
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 99999;
  color: #ccc;
  transition: all 0.3s ease-in-out;
}

.chatButton > i {
  font-size: 3rem;
}

.chatButton:hover {
  color: #fff;
}
</style>
