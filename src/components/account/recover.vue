<template>
  <div class="recover">
    <div class="logo">
      <h1>seaFlow</h1>
    </div>
    <div class="recover-wrapper">
      <div class="recover-text">
        <h1  style="font-size: 2.5rem">Forget Password</h1>
      </div>
      <div class="revover-steps">
        <el-steps :active="nowStep" finish-status="success">
          <el-step title="step 1" description="Enter your email"></el-step>
          <el-step title="step 2" description="Enter reset code"></el-step>
          <el-step title="step 3" description="Reset password"></el-step>
        </el-steps>
      </div>
      <div class="step-show">
        <div class="email-show" v-if="nowStep===0">
          <el-input v-model="email" placeholder="Email Adress"></el-input>
          <div></div>
          <el-button type="primary" @click="sendResetCode">Send reset code</el-button>
        </div>
        <div class="code-show" v-if="nowStep===1">
          <el-input v-model="resetCode" placeholder="Enter reset code"></el-input>
          <div></div>
          <el-button type="primary" @click="checkResetCode">verify code</el-button>
        </div>
        <div class="pw-show" v-if="nowStep===2">
          <el-input v-model="resetPassword" placeholder="Reset password"></el-input>
          <div></div>
          <el-button type="primary" @click="resetPassword">Enter new Password</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowStep: 0,
      resetCode: '',
      resetPassword: '',
      email: '',
    };
  },
  methods: {
    sendResetCode() {
      // 发送重置密码的验证码
      const rightFormat = new RegExp(/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/);
      if (rightFormat.test(this.email)) {
        this.$http.post('/email', {
          email: this.email,
          subject: 1,
        }).then(() => {
          this.$message({
            message: '重置验证码已发送，请注意查收',
          });
        });
      } else {
        this.$message({
          message: '请确认邮箱格式正确',
        });
      }
    },
  },
};
</script>

<style scoped>
  .recover {
    width: 100%;
    margin: 0 auto;
    max-width: 960px;
    padding: 3rem 0;
  }

  .logo {
    width: 100%;
  }

  .recover-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    padding-top: 5rem;
  }

  .revover-steps {
    width: 100%;
    padding-top: 2rem;
  }

  .el-input {
    width: 350px;
    font-size: 1rem;
  }

  .step-show {
    padding-top: 1rem;
  }

  .el-button {
    width: 350px;
    margin-top: 2rem;
  }
</style>
