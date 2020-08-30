<template>
  <div class="social-body-send">
    <div class="send-input" :class="sendClasses">
      <div contenteditable="true" class="input-editor" placeholder="告诉你个小秘密~~"></div>
      <div class="input-bottom">
        <!-- 图片预览 -->
        <div class="img-item-wrapper" v-for="(item, index) in imgs" :key="index">
          <el-image :src="item" :preview-src-list="imgs"></el-image>
          <span class="del-img" @click="delThisImg(index)"></span>
        </div>
      </div>
    </div>
    <div class="bottom-bottom">
      <div class="send-options">
        <div class="options-item" @click="onOptions">
          <i class="el-icon-moon-night"></i>
          <el-popover placement="bottom" width="400" trigger="click">
            <emoji-picker @selectEmoji="addEmojiContent"></emoji-picker>
            <span slot="reference">&nbsp;心情</span>
          </el-popover>
        </div>

        <div class="options-item" @click="selectImg">
          <i class="el-icon-picture"></i>
          <span>&nbsp;图片</span>
        </div>
      </div>
      <div class="send-trend">
        <el-button type="primary" size="mini" @click="releaseNews()">发布</el-button>
      </div>
    </div>
    <input type="file" style="display: none" @change="uploadImg" id="img" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import emojiPicker from '../emojiPick.vue';

export default {
  components: {
    emojiPicker,
  },
  props: [
    'inputType',
  ],
  methods: {
    uploadImg(e) {
      const file = e.target.files[0];
      // 上传图片
      const param = new FormData(); // 创建form对象
      param.append('images', file); // 通过append向form对象添加数据
      this.$http.post('v1/files', param).then((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const that = this;
        // eslint-disable-next-line func-names
        reader.onload = function () {
          const url = this.result.substring(this.result.indexOf(',') + 1);
          that.imgs.push(`data:image/png;base64,${url}`);
          // that.$refs['imgimg'].setAttribute('src','data:image/png;base64,'+url);
        };
        // 保存信息
        this.uploadImgs.push(res.data.data.files[0].fid);
        console.log(this.uploadImgs);
      });
    },
    addEmojiContent(item) {
      document.getElementsByClassName('input-editor')[0].innerHTML += item;
    },
    selectImg() {
      // 上传图片到服务器，返回url
      const img = document.getElementById('img');
      img.click();
    },
    delThisImg(index) {
      // 删除上传的指定图片
      this.imgs.splice(index, 1);
      this.uploadImgs.splice(index, 1);
    },
    onOptions() {
      this.doNotMiss = true;
    },
    releaseNews() {
      // 发布动态
      const content = document.getElementsByClassName('input-editor')[0].innerHTML;
      if (content === '' && this.uploadImgs.length === 0) {
        this.$notify({
          message: '发布内容不能为空！',
        });
      } else {
        this.$http.post('/v1/news', {
          content,
          imgs: this.uploadImgs,
        }).then((res) => {
          console.log(res.data.data);
          this.$notify({
            message: '发布成功！',
          });
          document.getElementsByClassName('input-editor')[0].innerHTML = '';
          const newTrend = {
            ...res.data.data,
            content,
            name: this.userInfo.username,
            sex: this.userInfo.sex,
            imgs: this.imgs,
            time: new Date().getTime(),
            avatar: this.userInfo.avatar,
            likes: 0,
            comments: 0,
          };
          this.$store.commit('addLikeTrend', newTrend);
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  },
  data() {
    return {
      sendClasses: ['input-content'],
      imgs: [],
      uploadImgs: [],
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
};
</script>

<style scoped>
.social-body-send {
  background-color: #fff;
  padding: 1rem;
}

.send-input {
}

.input-content {
  border: 1px solid #ccc;
  min-height: 40px;
  background-color: rgb(249, 250, 251);
}

.input-editor {
  text-align: left;
  padding: 0.5rem;
  cursor: text;
}

.input-focus {
  border: 1px blue solid;
  background-color: #fff;
}

[contenteditable]:focus {
  outline: none;
}

.input-editor:empty::before {
  content: attr(placeholder);
  font-size: 14px;
  color: #ccc;
  line-height: 21px;
  padding-top: 10px;
}

.send-options {
  width: 40%;
  display: flex;
  justify-content: space-around;
}

.bottom-bottom {
  margin-top: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.options-item {
  color: #027fff;
  font-size: 14px;
  cursor: pointer;
}

.input-bottom {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 12px;
  position: relative;
}

.img-item-wrapper {
  position: relative;
  cursor: pointer;
}

.input-bottom .el-image {
  border-radius: 2px;
  margin: 0 0.666rem 0.666rem 0;
  width: 5.68rem;
  height: 5.68rem;
  background-repeat: no-repeat;
  background-size: cover;
  flex: 0 0 auto;
  background-position: 50%;
}

.del-img {
  cursor: pointer;
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  top: 0.333rem;
  right: 1rem;
  border-radius: 50%;
  border: 1px solid #c5c5c5;
  background: rgba(0, 0, 0, 0.4);
  transform: rotate(45deg);
  overflow: hidden;
}

.del-img::before {
  content: "";
  width: 0.5rem;
  height: 1px;
  display: block;
  position: absolute;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.del-img::after {
  content: "";
  width: 0.5rem;
  height: 1.5px;
  display: block;
  position: absolute;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
}
</style>
