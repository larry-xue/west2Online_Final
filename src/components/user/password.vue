<template>
  <div class="user-password">
    <el-card>
      <div style="width: 80%;margin: 0 auto">
        <div class="password-header">
          <h2>个人资料</h2>
        </div>
        <el-divider></el-divider>
        <div class="password-common">
          <div class="left-desc">旧密码</div>
          <div class="right-content">
            <div class="password-input">
              <input type="password" placeholder="请输入原密码" class="input-style" v-model="oldPassword" />
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
        <div class="password-common">
          <div class="left-desc">旧密码</div>
          <div class="right-content">
            <div class="password-input">
              <input type="password" placeholder="请输入新密码" class="input-style" v-model="newPassword" />
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="password-common">
          <div class="left-desc">旧密码</div>
          <div class="right-content">
            <div class="password-input">
              <input type="password" placeholder="确认新密码" class="input-style" v-model="rePassword" />
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="password-common" style="flex-direction: row-reverse;">
          <el-button type="primary" @click="changePassword">确认修改</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import md5 from 'js-md5';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
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
    changePassword() {
      // 先验证是否正确
      if (this.newPassword.length < 6) {
        this.$notify({
          message: '密码长度不能小于6位',
          showClose: false,
          duration: 1000,
        });
        this.autoFocus('newPassword');
      } else if (this.newPassword !== this.rePassword) {
        this.$notify({
          message: '两次输入的密码不一致',
          showClose: false,
          duration: 1000,
        });
        this.autoFocus('rePassword');
      } else {
        // 发送请求
        this.$http.put('/password', {
          email: this.userInfo.email,
          old_password: md5(this.oldPassword),
          new_password: md5(this.newPassword),
        }).then((res) => {
          console.log(res);
          console.log('%c123123', 'font-size: 20px; color: orange;');
        }).catch((err) => {
          this.$notify({
            message: '原密码错误',
            showClose: false,
            duration: 1000,
          });
          console.log(err.type);
        });
      }
    },
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
        const input = document.getElementsByClassName('input-style')[2];
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
.password-common {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.password-header {
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

.password-input {
  width: 70%;
}

.input-style {
  border: none;
  outline: none;
  font-size: 1rem;
  width: 100%;
}
</style>
