<template>
  <div class="user-password">
    <el-card>
      <div style="width: 80%;margin: 0 auto">
        <div class="profile-header">
          <h2>个人资料</h2>
        </div>
        <el-divider></el-divider>
        <div class="profile-common">
          <div class="left-desc">旧密码</div>
          <div class="right-content">
            <div class="profile-input">
              <input type="text" placeholder="请输入原密码" class="input-style" v-model="oldPassword" />
            </div>
            <a
              href="#"
              @click="gotoRecorver"
              style="font-size: 0.9rem; color: blue;"
              class="cursor editOption-do"
            >忘记密码？</a>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="profile-common">
          <div class="left-desc">旧密码</div>
          <div class="right-content">
            <div class="profile-input">
              <input type="text" placeholder="请输入新密码" class="input-style" v-model="newPassword" />
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="profile-common">
          <div class="left-desc">旧密码</div>
          <div class="right-content">
            <div class="profile-input">
              <input type="text" placeholder="确认新密码" class="input-style" v-model="rePassword" />
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      rePassword: '',
      do_undo: {
        oldPassword: false,
        newPassword: false,
        rePassword: false,
      },
    };
  },
  methods: {
    autoFocus(type) {
      if (type === 'oldPassword') {
        const input = document.getElementsByClassName('input-style')[0];
        input.focus();
        input.select();
      } else if (type === 'newPassword') {
        const input = document.getElementsByClassName('input-style')[1];
        input.focus();
        input.select();
      } else {
        const input = document.getElementsByClassName('input-style')[1];
        input.focus();
        input.select();
      }
    },
    gotoRecorver() {
      this.$router.push({
        name: 'recover',
      });
    },
  },
};
</script>

<style scoped>
.profile-common {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-header {
  display: flex;
}

.left-desc {
  width: 20%;
  text-align: left;
  font-size: 0.95rem;
}

.right-content {
  width: 80%;
  display: flex;
  align-items: center;
  position: relative;
}

.editOption-do {
  position: absolute;
  text-decoration: unset;
  right: 0;
}

.profile-input {
  width: 70%;
}

.input-style {
  border: none;
  outline: none;
  font-size: 1rem;
  width: 100%;
}
</style>
