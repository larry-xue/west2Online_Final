<template>
  <div class="trendItem">
    <div class="trend-header">
      <div class="user-avatar">
        <el-avatar :src="itemInfo.avatar"></el-avatar>
      </div>
      <div class="header-info">
        <div class="header-user-info">
          <h3>{{ itemInfo.username }}</h3>
          <div class="sendTime">{{ itemInfo.time }}</div>
        </div>
      </div>
      <div class="user-sex">
        <div class="info-sex" v-if="itemInfo.sex==='0'">
          <img src="../../assets/sex_man.png" alt="男" />
        </div>
        <div class="info-sex" v-else-if="itemInfo.sex==='1'">
          <img src="../../assets/sex_woman.png" alt="女" />
        </div>
        <div class="info-sex" v-else style="width:1rem;height:1rem">
          <img src="../../assets/sex.png" alt="保密" />
        </div>
      </div>
    </div>
    <div class="trend-content">
      <div class="content-word">
        <span>{{ showContent }}</span>
        <div class="showAll" v-if="showAll" @click="showAllContent">{{nowContentState}}</div>
      </div>
      <div class="content-imgs"></div>
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
    <div class="trend-comment">
      <div class="comment-input" v-show="showComment">
        <el-avatar style="width: 2.4rem;height: 2.4rem"></el-avatar>
        <el-input size="mini"></el-input>
        <el-button type="primary" size="mini" style="background-color: rgb(3,113,223)">评论</el-button>
      </div>
      <div class="comments"></div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'itemInfo',
  ],
  data() {
    return {
      showAll: false,
      showComment: false,
      newsComments: [],
      showContent: '',
      nowContentState: '展开',
      likeClassGroup: ['el-icon-caret-top', 'grey'],
    };
  },
  mounted() {
    if (this.itemInfo.content && this.itemInfo.content.length > 10) {
      this.showAll = true;
      this.showContent = this.itemInfo.content.substring(0, 11);
    } else {
      this.showContent = this.itemInfo.content;
    }

    // 如果喜欢此动态
    console.log(this.itemInfo.liked);
    if (this.itemInfo.liked) {
      this.likeClassGroup.pop();
      this.likeClassGroup.push('becomeBlue');
    }
  },
  methods: {
    showComments() {
      if (this.showComment) {
        this.showComment = false;
      } else {
        this.showComment = true;
        if (this.newsComments.length === 0) {
          console.log('apply');
        }
      }
    },
    showAllContent() {
      if (this.nowContentState === '展开') {
        this.showContent = this.itemInfo.content;
        this.nowContentState = '收起';
      } else {
        this.showContent = this.itemInfo.content.substring(0, 11);
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
  width: 72%;
  margin: 0 auto;
  text-align: left;
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
  justify-content: space-between;
  align-items: center;
  background-color: rgb(250, 251, 252);
  padding: 1rem;
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
  width: 100%;
}
</style>
