<template>
  <div class="register-wrapper">
    <div class="left-container">
      <div class="left-pics">
        <img src="../../assets/register_bgc.jpg" alt="seaFlow" />
      </div>
      <div class="left-hover">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          version="1.1"
          class="injected-svg"
          data-src="assets/img/dividers/divider-vertical-1.svg"
        >
          <path
            d="M0,0 L100,0 L100,100 L0,100 C66.6666667,83.3333333 100,66.6666667 100,50 C100,33.3333333 66.6666667,16.6666667 0,0 Z"
            stroke-width="0"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
    <div class="right-container">
      <div class="register">
        <div class="text-content">
          <h1 style="padding: 15px; font-size: 2.5rem">Create Acount</h1>
          <span>To make friends...To play together</span>
        </div>
        <div class="register-form">
          <el-form :model="register" size="medium" :rules="rules" ref="register">
            <el-form-item prop="email">
              <el-input v-model="register.email" placeholder="Email Adress"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="register.password"
                type="password"
                placeholder="Password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="rePassword">
              <el-input
                v-model="register.rePassword"
                type="password"
                placeholder="Confirm Password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input
                style="width: 13rem; float: left"
                placeholder="captcha"
                v-model="register.captcha"
              ></el-input>
              <el-button
                v-show="showCaptchaTimeLimit"
                disabled
                style="width: 8rem; float: right;"
                type="warning"
              >{{timeLimit}}秒</el-button>
              <el-button
                v-show="!showCaptchaTimeLimit"
                style="width: 8rem; float: right;"
                type="primary"
                @click="getCaptcha"
              >发送验证码</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="registerNow('register')">Sign up</el-button>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <div class="login">
            <span>Already have an account yet?</span>
            <el-link type="primary" @click="go2Login" :underline="false">Sign in</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>>

<script>
import md5 from 'js-md5';

export default {
  mounted() {
    // this.showCaptchaTimeLimit = true;
    // this.timeLimit = 60;
    // this.cutDown(new Date().getTime() + 60000);
  },
  computed: {
  },
  data() {
    const valideteEmail = (rule, value, callback) => {
      const rightFormat = new RegExp(/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/);
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (rightFormat.test(value)) {
        callback();
      } else {
        callback(new Error('邮箱格式错误'));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length > 16 && value.length > 7) {
        callback(new Error('密码长度在8 - 16 位之间'));
      } else {
        if (this.register.password !== '') {
          this.$refs.register.validateField('rePassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.register.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      register: {
        email: '',
        password: '',
        rePassword: '',
        captcha: '',
      },
      timeLimit: 0,
      showCaptchaTimeLimit: false, // 限制重复请求发送验证码
      rules: {
        email: [
          { validator: valideteEmail, trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        rePassword: [
          { validator: validatePass2, trigger: 'blur' },
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    // 跳转到登录页
    go2Login() {
      this.$router.push({
        name: 'login',
      });
    },
    // 注册
    registerNow(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/v1/user', {
            email: this.register.email,
            password: md5(this.register.password),
            captcha: this.register.captcha,
          }).then(() => {
            this.$message({
              message: '注册成功！',
              type: 'success',
            });
          }).catch((err) => {
            console.log(err);
            this.$message({
              message: err.response,
              type: 'warning',
            });
          });
        }
      });
    },
    getCaptcha() {
      // 发送验证码
      // 先判断是否有邮箱
      const rightFormat = new RegExp(/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/);
      if (rightFormat.test(this.register.email)) {
        this.$http.post('/v1/email', {
          email: this.register.email,
          subject: 0,
        }).then(() => {
          this.$message({
            message: '邮箱验证码已发送，请注意查收',
          });
        });
      } else {
        this.$message({
          message: '请确认邮箱格式正确',
        });
      }
    },
    cutDown(t) {
      // 倒计时
      console.log(t);
      console.log(new Date().getTime());
      if (new Date().getTime() > t) {
        this.showCaptchaTimeLimit = false;
        return true;
      }
      setTimeout(() => {
        this.timeLimit -= 1;
        this.cutDown(t);
      }, 1000);
      return true;
    },
  },
};
</script>

<style scoped>
.register-wrapper {
  height: 100vh;
  background-color: #fff;
  display: flex;
}

.left-container {
  width: 35%;
  position: relative;
  overflow: hidden;
}

.left-pics {
  position: absolute;
  height: 100%;
}

.left-pics img {
  width: 100vw;
}

.left-hover {
  position: absolute;
  right: 0;
  width: 20%;
  height: 100%;
  z-index: 23;
}

.right-container {
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.5;
}

.register {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-form {
  width: 50%;
  max-width: 400px;
  padding: 2.5rem;
}

.el-input {
  width: 25rem;
  font-size: 1rem;
}

.el-button {
  width: 25rem;
}

.el-tooltip {
  background-color: rgb(230, 162, 60);
  color: white;
}
</style>
