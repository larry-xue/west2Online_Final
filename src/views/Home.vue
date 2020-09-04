<template>
  <div class="home">
    <nav>
      <navBar></navBar>
    </nav>
    <div class="home-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CHAT from '../chat/index';
import navBar from '../components/nav.vue';

export default {
  components: {
    navBar,
  },
  mounted() {
    this.$http.get('/v1/user').then((res) => {
      CHAT.init();
      this.$store.commit('updateUserInfo', res.data.data);
    });
  },
  data() {
    return {
      CHAT,
    };
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  z-index: 999;
}

.home {
  width: 100%;
  height: 100%;
}

.home-wrapper {
  width: 98%;
}
</style>
