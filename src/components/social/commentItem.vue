<template>
  <div class="commentItem">
    <!-- 展示ancestor 循环展示members -->
    <div class="ci-avatar">
      <el-avatar :src="'http://39.97.113.252:8080/static/' + itemInfo.ancestor.avatar"></el-avatar>
    </div>
    <div class="ci-body">
      <div class="ci-body-wrapper">
        <div class="ci-body-name">{{ itemInfo.ancestor.username }}</div>
        <div class="ci-body-comment">{{ itemInfo.ancestor.content }}</div>
        <div class="ci-body-others">
          <div class="others-time">{{ itemInfo.ancestor.time }}</div>
          <div class="others-wrapper">
            <div class="others-plus cursor" @click="likeThisComment">
              <el-icon :class="likeClassGroup"></el-icon>
              <span>{{ itemInfo.ancestor.likes }}</span>
            </div>
            <div class="others-reply cursor" @click="showReply()">
              <i class="el-icon-chat-line-round"></i>
              <span>&nbsp;回复</span>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-input" v-show="showReplyInput">
        <el-input size="mini" ref="reply" v-model="replyCommentInput"></el-input>
        <el-button
          @click="sendReply"
          type="primary"
          size="mini"
          style="background-color: rgb(3,113,223)"
        >回复</el-button>
      </div>
      <div class="comment-reply">
        <commentReplyItem
          v-for="CRitem in members_1"
          :key="CRitem.cid"
          :itemInfo="CRitem"
          :parentUID="itemInfo.ancestor.uid"
          @addCommentReply="addMembers"
        ></commentReplyItem>
        <div v-if="members_2.length>0 && delShowMore" style="margin-top: 0.5rem;">
          <el-link :underline="false" @click="showMembers_2">显示更多</el-link>
        </div>
        <div v-if="show_Members_2">
          <commentReplyItem
            v-for="CRitem in members_2"
            :key="CRitem.cid"
            :itemInfo="CRitem"
            :parentUID="itemInfo.ancestor.uid"
            @addCommentReply="addMembers"
          ></commentReplyItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import commentReplyItem from './commentReplyItem.vue';

export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  components: {
    commentReplyItem,
  },
  props: ['itemInfo'],
  mounted() {
    if (this.itemInfo.ancestor.liked) {
      this.likeClassGroup.pop();
      this.likeClassGroup.push('becomeBlue');
    }

    const tHis = this;
    document.addEventListener('click', (e) => {
      // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
      const flag = e.target.contains(document.getElementsByClassName('commentItem')[0]);
      if (!flag) return;
      this.$emit('closeOtherInput');
      tHis.showReplyInput = false;
    });

    this.members_1 = this.itemInfo.members.filter((a, index) => index < 2);
    this.members_2 = this.itemInfo.members.filter((a, index) => index >= 2);

    console.log(this.members_1, this.members_2.length, this.itemInfo.members.length);
  },
  data() {
    return {
      likeClassGroup: ['el-icon-caret-top', 'grey'],
      showReplyInput: false,
      replyCommentInput: '',
      members_1: [], // 前两个
      members_2: [], // 后续
      delShowMore: true, // 控制显示更多的显示
      show_Members_2: false,
    };
  },
  methods: {
    showMembers_2() {
      // ,显示更多
      this.delShowMore = false;
      this.show_Members_2 = true;
    },
    addMembers(res) {
      // 增加该组成员
      this.itemInfo.members.push(res);
    },
    likeThisComment() {
      this.$http.put(`/v1/like/comments/${this.itemInfo.ancestor.cid}`).then((res) => {
        console.log(res);
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
          cid: this.itemInfo.ancestor.cid,
        }).then((res) => {
          console.log(res);
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
        console.log(this.$refs.reply.$el.children[0]);
        this.$refs.reply.$el.children[0].placeholder = `回复${this.itemInfo.ancestor.username}...`;
        setTimeout(() => {
          this.$refs.reply.$el.children[0].focus();
        }, 100);
      }
    },
  },
};
</script>

<style scoped>
.commentItem {
  width: 80%;
  margin: 0 auto;
  display: flex;
  margin-top: 1rem;
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
