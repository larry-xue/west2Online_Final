<template>
  <div class="user-profile">
    <el-card>
      <div style="width: 80%;margin: 0 auto">
        <div class="profile-header">
          <h2>个人资料</h2>
        </div>
        <el-divider></el-divider>
        <div class="profile-common profile-avatar">
          <div class="left-desc">头像</div>
          <div class="right-content" style="justify-content: unset">
            <el-avatar shape="square" :src="picSrc" size="large"></el-avatar>
            <div class="upload-avatar">
              <div class="upload-desc el-upload__tip">支持 jpg、png 格式大小 5M 以内的图片</div>
              <div class="upload-btn">
                <el-button size="mini" type="primary" @click="openFolder('avatar')">点击上传</el-button>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="profile-common">
          <div class="left-desc">用户名</div>
          <div class="right-content">
            <div class="profile-input">
              <input
                type="text"
                @focus="inputFocus('username', 1)"
                @blur="inputFocus('username', 2)"
                class="input-style"
                v-model="username"
              />
            </div>
            <div class="editOption-undo" v-show="!do_undo.username">
              <span class="cursor" @click="autoFocus('username')">修改</span>
            </div>
            <div class="editOption-do" v-show="do_undo.username">
              <span
                class="cursor"
                style="color: blue; margin-right: 10px"
                @click="saveChange('username')"
              >保存</span>
              <span class="cursor" @click="cancelEdit('username')">取消</span>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="profile-common">
          <div class="left-desc">性别</div>
          <div class="right-content">
            <el-radio-group v-model="sex" @change="saveChange('sex')">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
              <el-radio label="2">保密</el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="profile-common">
          <div class="left-desc">介绍</div>
          <div class="right-content">
            <div class="profile-input">
              <input
                type="text"
                @focus="inputFocus('intro', 1)"
                class="input-style"
                @blur="inputFocus('intro', 2)"
                v-model="introduction"
              />
            </div>
            <div class="editOption-undo" v-show="!do_undo.introduction">
              <span class="cursor" @click="autoFocus('intro')">修改</span>
            </div>
            <div class="editOption-do" v-show="do_undo.introduction">
              <span
                class="cursor"
                style="color: blue; margin-right: 10px"
                @click="saveChange('introduction')"
              >保存</span>
              <span class="cursor" @click="cancelEdit('intro')">取消</span>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="profile-common">
          <div class="left-desc">主页背景</div>
          <div class="right-content" style="justify-content: unset">
            <el-avatar shape="square" size="large"></el-avatar>
            <div class="upload-avatar">
              <div class="upload-desc el-upload__tip">支持 jpg、png 格式大小 5M 以内的图片</div>
              <div class="upload-btn">
                <el-button size="mini" type="primary" @click="openFolder('bgc')">点击上传</el-button>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
    </el-card>
    <input
      ref="filElem"
      style="display: none"
      type="file"
      class="upload-file"
      @change="uploadAvatar"
    />
  </div>
</template>>

<script>
import { mapState } from 'vuex';

export default {
  mounted() {
    this.username = this.userInfo.username;
    this.introduction = this.userInfo.introduction;
    if (this.userInfo.sex !== null) {
      this.sex = String(this.userInfo.sex);
    } else {
      this.sex = '2';
    }
    console.log(this.userInfo);
  },
  data() {
    return {
      username: '',
      introduction: '',
      sex: '',
      updateType: '',
      do_undo: {
        username: false,
        introduction: false,
      },
      picSrc: '',
    };
  },
  methods: {
    // http://39.97.113.252:8080/static/
    uploadAvatar(e) {
      const file = e.target.files[0];
      // 上传图片
      const param = new FormData(); // 创建form对象
      param.append('images', file); // 通过append向form对象添加数据
      this.$http.post('v1/files', param).then((res) => {
        console.log(this.picSrc);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const that = this;
        // eslint-disable-next-line func-names
        reader.onload = function () {
          const url = this.result.substring(this.result.indexOf(',') + 1);
          that.picSrc = `data:image/png;base64,${url}`;
          // that.$refs['imgimg'].setAttribute('src','data:image/png;base64,'+url);
        };
        // 保存信息
        this.$http.put('/v1/user', {
          avatar: res.data.data.files[0].path,
        }).then((res2) => {
          console.log(res2.data.data);
          this.$store.commit('updateUserInfo', res2.data.data);
          this.$notify({
            message: '头像已更新',
            duration: 1000,
            showClose: false,
          });
        });
      });
    },
    openFolder(type) {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'));
      this.updateType = type;
    },
    inputFocus(type, id) {
      if (type === 'username' && id === 1) {
        this.do_undo.username = true;
      } else if (type === 'intro' && id === 1) {
        this.do_undo.introduction = true;
      } else if (type === 'username' && id === 2 && this.username === this.userInfo.username) {
        this.do_undo.username = false;
      } else if (type === 'intro' && id === 2 && this.userInfo.introduction === this.introduction) {
        this.do_undo.introduction = false;
      }
    },
    autoFocus(type) {
      if (type === 'username') {
        const input = document.getElementsByClassName('input-style')[0];
        input.focus();
        input.select();
      } else {
        const input = document.getElementsByClassName('input-style')[1];
        input.focus();
        input.select();
      }
    },
    cancelEdit(type) {
      if (type === 'username') {
        this.username = this.userInfo.userusername;
        this.do_undo.username = false;
      } else {
        this.introduction = this.userInfo.introduction;
        this.do_undo.introduction = false;
      }
    },
    saveChange(type) {
      // 修改用户的姓名，性别，介绍，头像，背景
      const param = {};
      if (type === 'username') {
        param.username = this.username;
      } else if (type === 'sex') {
        param.sex = Number(this.sex);
      } else if (type === 'introduction') {
        param.introduction = this.introduction;
      }
      if (this[type] !== this.userInfo[type]) {
        console.log(this[type]);
        console.log(param);
        this.$http.put('/v1/user', param).then((res) => {
          console.log(res.data.data);
          this.$store.commit('updateUserInfo', res.data.data);
          this.$notify({
            message: '更新成功',
            duration: 1000,
            showClose: false,
          });
          this.do_undo[type] = false;
        });
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
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

.upload-avatar {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.upload-avatar .upload-desc {
  padding-bottom: 20px;
}

.editOption-undo {
  position: absolute;
  right: 0;
}

.editOption-do {
  position: absolute;
  right: 0;
}

.el-avatar {
  width: 5rem;
  height: 5rem;
}

.profile-input {
  width: 70%;
}

.input-style {
  border: none;
  outline: none;
  color: #999;
  font-size: 1rem;
  width: 100%;
}
</style>
