<template>
  <div class="replyItem">
    <div class="ci-avatar">
      <el-avatar :src="'http://39.97.113.252:8080/static/' + itemInfo.avatar"></el-avatar>
    </div>
    <div class="ci-body">
      <div class="ci-body-wrapper">
        <div class="ci-body-name">{{ itemInfo.username }}</div>
        <div class="ci-body-comment">
          <span v-if="showReplyName">
            回复
            <el-link :underline="false" href="#">{{ replyTO.username }}：</el-link>
          </span>
          {{ itemInfo.content }}
        </div>
        <div class="ci-body-others">
          <div class="others-time">{{ itemInfo.time }}</div>
          <div class="others-wrapper">
            <div class="others-plus cursor" @click="likeThisComment">
              <el-icon :class="likeClassGroup"></el-icon>
              <span>{{ itemInfo.likes }}</span>
            </div>
            <div class="others-reply cursor" @click="showReply()">
              <i class="el-icon-chat-line-round"></i>
              <span>&nbsp;回复</span>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-input" v-show="showReplyInput">
        <el-input
          size="mini"
          class="comment-input-check"
          ref="reply_2"
          :title="itemInfo.cid"
          v-model="replyCommentInput"
        ></el-input>
        <el-button
          @click="sendReply"
          type="primary"
          size="mini"
          style="background-color: rgb(3,113,223)"
        >回复</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['itemInfo', 'parentUID'],
  computed: {
    ...mapState({
      otherUserInfo: (state) => state.otherUserInfo,
    }),
  },
  mounted() {
    if (this.itemInfo.liked) {
      this.likeClassGroup.pop();
      this.likeClassGroup.push('becomeBlue');
    }

    const tHis = this;
    document.addEventListener('click', (e) => {
      // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
      const flag = e.target.contains(document.getElementsByClassName('replyItem')[0]);
      if (!flag) return;
      tHis.showReplyInput = false;
    });

    // 查看自己的ancestors是不是祖评论
    if (this.itemInfo.ancestor !== this.itemInfo.parent) {
      // 请求信息uid，
      // 先判断之前有无请求过
      this.showReplyName = true;
      let flag = false; // false表示没找到
      console.log(this.parentUID);
      for (let i = 0; i < this.otherUserInfo.length; i += 1) {
        if (this.otherUserInfo[i].uid === this.parentUID) {
          this.replyTO = this.otherUserInfo[i];
          flag = true;
          break;
        }
      }
      if (!flag) {
        // 去请求
        this.$http.get(`/v1/user/uid/${this.parentUID}`).then((res) => {
          this.$store.commit('changeOtherUserInfo', res.data.data);
          this.replyTO = res.data.data;
        });
      }
    } else {
      console.log('who');
    }
  },
  data() {
    return {
      likeClassGroup: ['el-icon-caret-top', 'grey'],
      showReplyInput: false,
      replyCommentInput: '',
      members: [],
      replyTO: {
        username: '',
      },
      showReplyName: false,
    };
  },
  methods: {
    likeThisComment() {
      this.$http.put(`/v1/like/comments/${this.itemInfo.cid}`).then((res) => {
        this.itemInfo.liked = res.data.data.liked;
        this.itemInfo.likes = res.data.data.likes;
        if (this.itemInfo.liked) {
          this.likeClassGroup.pop();
          this.likeClassGroup.push('becomeBlue');
        } else {
          this.likeClassGroup.pop();
          this.likeClassGroup.push('grey');
        }
      });
    },
    sendReply() {
      if (this.replyCommentInput !== '') {
        this.$http.post('v1/comment', {
          content: this.replyCommentInput,
          cid: this.itemInfo.cid,
        }).then((res) => {
          const resData = res.data.data;
          this.$emit('addCommentReply', resData);
          this.$notify({
            message: '回复成功',
            timeout: 1000,
          });
          this.replyCommentInput = '';
        });
      } else {
        this.$notify({
          message: '回复的消息不能为空噢',
          timeout: 1000,
        });
      }
    },
    showReply() {
      this.showReplyInput = !this.showReplyInput;
      if (this.showReplyInput) {
        const input = document.getElementsByClassName('comment-input-check');
        for (let i = 0; i < input.length; i += 1) {
          if (input[i].children[0].title === String(this.itemInfo.cid)) {
            input[i].children[0].setAttribute('placeholder', `回复${this.itemInfo.username}`);
            setTimeout(() => {
              input[i].children[0].focus();
            }, 100);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.replyItem {
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  margin-top: 1rem;
  background-color: rgb(250, 251, 252);
}

.ci-avatar {
  width: 10%;
}

.ci-body {
  width: 100%;
}

.ci-body-wrapper {
  width: 100%;
  position: relative;
}

.ci-body-name {
  font-size: 1.083rem;
  font-weight: 400;
  width: 0;
  color: #333;
}

.ci-body-comment {
  margin-top: 0.55rem;
  font-size: 1.083rem;
  line-height: 1.833rem;
  word-wrap: break-word;
  white-space: pre-wrap;
  color: #505050;
  overflow: hidden;
  text-align: left;
}

.others-time {
  font-size: 1.083rem;
  color: #8a9aa9;
  cursor: default;
  margin-top: 1rem;
  text-align: left;
}

.others-wrapper {
  display: flex;
  position: absolute;
  min-width: 8.8rem;
  justify-content: space-around;
  bottom: 0;
  right: 0;
}

.others-plus:hover {
  color: #999;
}

.others-reply:hover {
  color: #999;
}

.comment-input {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgb(250, 251, 252);
  padding: 1rem;
  margin-top: 0.5rem;
}

.comment-input .el-button {
  margin-left: 0.6rem;
}
/* ---- */
.grey {
  color: #aaa;
}

.el-avatar {
  width: 2rem;
  height: 2rem;
}

.becomeBlue {
  color: Blue;
  transition: all 0.9s;
}
</style>
