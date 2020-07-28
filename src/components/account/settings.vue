<template>
  <div class="user-settings">
    <nav>
      <navBar></navBar>
    </nav>
    <div class="settings-tabs">
      <el-tabs v-model="activeName" @tab-click="changeSettings" :stretch="true">
        <el-tab-pane label="个人资料" name="first">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <router-view></router-view>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import navBar from '../nav.vue';

export default {
  components: {
    navBar,
  },
  methods: {
    changeSettings(tab) {
      if (tab.$el.id === 'pane-first') {
        this.$router.push({
          name: 'profile',
        });
      } else {
        this.$router.push({
          name: 'password',
        });
      }
    },
  },
  data() {
    return {
      activeName: 'first',
    };
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  z-index: 999;
}

.user-settings {
}

.settings-tabs {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-top: 4.5rem;
}
</style>
