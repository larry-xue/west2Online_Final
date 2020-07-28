<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  mounted() {
    // const body = document.getElementById('app');
    // body.style.width = `calc(100vw - ${this.getScrollWidth()}px)`;
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
  },
  components: {
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
</style>
