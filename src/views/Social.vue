<template>
  <div class="social">
    <div class="social-tabs">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#000"
        active-text-color="blue"
      >
        <el-menu-item index="1">
          <span slot="title">推荐</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">关注</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">热门</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="social-body">
      <div class="social-body-send">
        <div class="send-input">
          <el-input type="textarea" resize="none" maxlength="999" :rows="4" show-word-limit></el-input>
        </div>
        <div class="send-options">
          <div class="options-item">
            <i class="el-icon-picture"></i>
            <span>图片</span>
          </div>
        </div>
      </div>
      <div class="social-body-show">send</div>
    </div>
  </div>
</template>>

<script>
export default {
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.social {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 7rem;
}

.social-tabs {
  width: 6rem;
  position: fixed;
  margin-top: 3.5rem;
  margin-left: -38rem;
}

.social-body {
  width: 33rem;
  margin-left: 8rem;
}
</style>
