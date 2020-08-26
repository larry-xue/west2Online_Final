<template>
  <div class="login">
    <div class="logo">
      <h1>seaFlow</h1>
    </div>
    <div class="login-wrapper">
      <div class="login-text">
        <h1 style="font-size: 2.5rem">Welcome back</h1>
        <span>Enter your account details below</span>
      </div>
      <div class="login-form">
        <el-form :model="login" :rules="rules" ref="login">
          <el-form-item prop="email">
            <el-input v-model="login.email" placeholder="Email Adress"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="login.password" type="password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signIn('login')">Sign in</el-button>
          </el-form-item>
        </el-form>
        <div class="keep-login">
          <div class="keep-login-inner">
            <el-checkbox v-model="keepAlive">Keep me signed in</el-checkbox>
          </div>
        </div>
        <div class="divider-wrapper">
          <el-divider></el-divider>
        </div>
        <div class="other-link">
          <div class="other-link-forget">
            <el-link :underline="false" @click="jump('recover')">Forget your password？</el-link>
          </div>
          <div class="other-link-create">
            <span style="font-size: 14px; color: #777">Don't have an account yet?</span>
            <el-link type="primary" :underline="false" @click="jump('register')">Create one</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5';

export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      keepAlive: false,
      rules: {
        email: [
          {
            trigger: 'blur',
            required: true,
            message: '请输入邮箱',
          },
        ],
        password: [
          {
            trigger: 'blur',
            required: true,
            message: '请输入密码',
          },
        ],
      },
    };
  },
  methods: {
    jump(link) {
      this.$router.push({
        name: link,
      });
    },
    signIn(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.$http.post('/v1/auth', {
            email: this.login.email,
            password: md5(this.login.password),
          }).then((res) => {
            if (res.data.message === 'success') {
              this.$message({
                message: '登录成功！',
                type: 'success',
              });
              const tokens = res.data.data;
              if (this.keepAlive) {
                this.$storage.localSet('token', tokens.access_token);
                this.$storage.localSet('refresh_token', tokens.refresh_token);
              } else {
                this.$storage.localSet('token', tokens.access_token);
              }
              this.$router.push({
                name: 'Home',
              });
            }
          }).catch((err) => {
            this.$message({
              message: err,
              type: 'warning',
            });
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 0;
}

.logo {
  width: 100%;
}

.login-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  padding-top: 7rem;
}

.login-form {
  padding-top: 3rem;
  margin: 0 auto;
  max-width: 400px;
}

.keep-login {
  position: relative;
}

.el-input {
  width: 350px;
  font-size: 1rem;
}

.divider-wrapper {
  padding-top: 1rem;
}

.keep-login-inner {
  position: absolute;
}

.el-button {
  width: 350px;
}
</style>
