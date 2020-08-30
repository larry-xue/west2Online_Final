<template>
  <div class="trendItem">
    <div class="trend-header">
      <div class="user-avatar">
        <el-popover placement="top-start" trigger="hover">
          <el-avatar :src="picUrl" slot="reference"></el-avatar>
          <div class="addFriend" style="display:flex; justify-content:center">
            <el-button @click="openAddNweFriend" type="primary">添加好友</el-button>
          </div>
        </el-popover>
      </div>
      <div class="header-info">
        <div class="header-user-info">
          <div class="info-sex-name">
            <span>{{ itemInfo.username }}</span>
            <div class="user-sex">
              <div class="info-sex" v-if="itemInfo.sex===0">
                <img src="../../assets/sex_man.png" alt="男" />
              </div>
              <div class="info-sex" v-else-if="itemInfo.sex===1">
                <img src="../../assets/sex_woman.png" alt="女" />
              </div>
              <div class="info-sex" v-else style="width:1rem;height:1rem">
                <img src="../../assets/sex.png" alt="保密" />
              </div>
            </div>
          </div>
          <div class="sendTime">{{ itemInfo.time }}</div>
        </div>
      </div>
    </div>
    <div class="trend-content">
      <div class="content-word">
        <span>{{ showContent }}</span>
        <div class="showAll" v-if="showAll" @click="showAllContent">{{nowContentState}}</div>
      </div>
      <div class="content-imgs">
        <img
          v-for="(item, index) in itemInfo.imgs"
          :class="picClass"
          :key="index"
          :src="'http://39.97.113.252:8080/static/' + item"
        />
      </div>
    </div>
    <div class="trend-bottom">
      <div class="bottom-item" @click="likeThisTrend">
        <el-icon :class="likeClassGroup"></el-icon>
        {{itemInfo.likes}}
      </div>
      <div class="bottom-item trend-botttom-center" @click="showComments()">
        <el-icon class="el-icon-chat-round grey"></el-icon>
        {{ itemInfo.comments }}
      </div>
    </div>
    <div class="trend-comment" v-show="showComment">
      <div class="comment-input">
        <el-avatar style="width: 2rem;height: 2rem" :src="picUrl"></el-avatar>
        <el-input size="mini" v-model="commentInput"></el-input>
        <el-button
          @click="sendComment"
          type="primary"
          size="mini"
          style="background-color: rgb(3,113,223)"
        >评论</el-button>
      </div>
      <div class="comments">
        <commentItem v-for="item in comments" :key="item.gid" :itemInfo="item"></commentItem>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :page-count="totalPage"
        small
        :hide-on-single-page="true"
        :current-page.sync="currentPage"
        @current-change="showNextPageComment"
      ></el-pagination>
    </div>
    <el-dialog title="添加好友" :visible.sync="showAddFriend">
      <div style="display:flex;justify-content:space-between">
        <el-input v-model="checkInfo"></el-input>
        <el-button type="primary" @click="sendAddFriend">发送好友请求</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import commentItem from './commentItem.vue';

export default {
  props: [
    'itemInfo',
  ],
  components: {
    commentItem,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
    picUrl() {
      return `http://39.97.113.252:8080/static/${this.userInfo.avatar}`;
    },
  },
  data() {
    return {
      showAll: false,
      showComment: false,
      newsComments: [],
      showContent: '',
      nowContentState: '展开',
      likeClassGroup: ['el-icon-caret-top', 'grey'],
      picClass: [],
      commentInput: '',
      comments: [],
      totalPage: 0,
      currentPage: 1,
      showAddFriend: false,
      checkInfo: '',
    };
  },
  mounted() {
    if (this.itemInfo.content && this.itemInfo.content.length > 100) {
      this.showAll = true;
      this.showContent = this.itemInfo.content.substring(0, 100);
    } else {
      this.showContent = this.itemInfo.content;
    }

    // 如果喜欢此动态
    if (this.itemInfo.liked) {
      this.likeClassGroup.pop();
      this.likeClassGroup.push('becomeBlue');
    }

    // 图片格式
    if (this.itemInfo.imgs && this.itemInfo.imgs.length > 1) {
      // 小图模式
      this.picClass.push('smallPic');
    } else {
      this.picClass.push('biggerPic');
    }
  },
  methods: {
    openAddNweFriend() {
      // 打开添加好友对话框
      this.showAddFriend = true;
    },
    sendAddFriend() {
      // 发送添加好友请求
      console.log(this.itemInfo);
      this.$http.post(`/v1/friends/${this.itemInfo.uid}`, {
        message: this.checkInfo,
      }).then((res) => {
        if (res.data.message === 'success') {
          this.$notify({
            message: '好友请求发送成功辣~~',
            timeout: 1500,
          });
          this.showAddFriend = false;
        }
      });
    },
    showNextPageComment() {
      // 请求下一页
      this.$http.get(`/v1/news/${this.itemInfo.tid}/comments`, {
        params: {
          page: this.currentPage,
        },
      }).then((res) => {
        const { replies } = res.data.data;
        // this.comments = replies;
        // eslint-disable-next-line radix
        const { length } = this.comments;
        for (let i = 0; i < length; i += 1) {
          this.comments.splice(i, 1, replies[i]);
        }
        this.totalPage = res.data.data.pages;
        this.currentPage = res.data.data.current;
      });
    },
    sendComment() {
      // 对某条动态发布评论
      if (this.commentInput === '') {
        this.$notify({
          message: '评论不能为空',
          timeout: 1000,
        });
      } else {
        // 发表评论
        this.$http.post(`/v1/news/${this.itemInfo.tid}/comments`, {
          tid: this.itemInfo.tid,
          content: this.commentInput,
        }).then((res) => {
          const comment = {};
          comment.ancestor = res.data.data;
          this.comments.push(comment);
          this.commentInput = '';
          this.$notify({
            message: '评论发送成功',
            timeout: 1000,
          });
          this.itemInfo.comments += 1;
        });
      }
    },
    showComments() {
      if (this.showComment) {
        this.showComment = false;
      } else {
        this.showComment = true;
      }

      if (this.showComment) {
        // 请求评论
        this.$http.get(`/v1/news/${this.itemInfo.tid}/comments`).then((res) => {
          const { replies } = res.data.data;
          this.comments = replies;
          console.log(replies);
          // eslint-disable-next-line radix
          this.totalPage = parseInt(res.data.data.pages);
          this.currentPage = res.data.data.current;
        });
      }
    },
    showAllContent() {
      if (this.nowContentState === '展开') {
        this.showContent = this.itemInfo.content;
        this.nowContentState = '收起';
      } else {
        this.showContent = this.itemInfo.content.substring(0, 100);
        this.nowContentState = '展开';
      }
    },
    likeThisTrend() {
      this.$http.put(`/v1/like/news/${this.itemInfo.tid}`).then((res) => {
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
  },
};
</script>

<style scoped>
.trendItem {
  background-color: #fff;
  margin-top: 1rem;
  padding: 1rem;
}

.trend-header {
  display: flex;
}

.header-user-info {
  margin-left: 10px;
  cursor: pointer;
}

.sendTime {
  font-size: 13px;
  text-align: left;
}

.trend-content {
  margin: 0 auto;
  text-align: left;
  width: 80%;
  margin-left: calc(3.6rem + 10px);
}

.content-word span {
  color: #17181a;
  line-height: 1.6;
  white-space: pre-line;
  font-size: 15px;
  word-break: break-all;
}

.showAll {
  cursor: pointer;
  color: #007fff;
  margin-top: 4rem;
}

.trend-bottom {
  margin-top: 1.7rem;
  padding-top: 0.7rem;
  display: flex;
  justify-content: space-between;

  border-top: #ddd 0.6px solid;
}

.bottom-item {
  width: 50%;
  text-align: center;
  cursor: pointer;
}

.trend-botttom-center {
  border-left: #ddd 1.3px solid;
}

.trend-comment {
  margin-top: 1rem;
}

.comment-input {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(250, 251, 252);
  padding: 1rem;
}

.comment-input .el-input {
  margin-left: 1rem;
}

.comment-input .el-button {
  margin-left: 2rem;
}

.info-sex-name {
  display: flex;
}

.info-sex-name .user-sex {
  margin-left: 0.3rem;
}

.info-sex img {
  width: 80%;
}

.smallPic {
  width: 25%;
}

.biggerPic {
  overflow: hidden;
  width: 16rem;
  height: 9rem;
}

.content-imgs {
  display: flex;
  flex-wrap: wrap;
}
/* ----------------- */

.becomeBlue {
  color: Blue;
  transition: all 0.9s;
}

.grey {
  color: #aaa;
}

.info-sex {
  margin-top: 0.2rem;
  width: 1.3rem;
  height: 1.3rem;
}

.el-avatar {
  width: 3.6rem;
  height: 3.6rem;
  cursor: pointer;
}

.el-input {
  width: 70%;
}

img {
  width: 50%;
}
</style>
