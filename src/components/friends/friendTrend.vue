<template>
  <div class="friendTrend">
    <!-- 上边是个人信息，下边是动态 -->
    <div class="friend-info">
      <el-card>
        <div class="user-show-avatar">
          <el-avatar :src="picUrl"></el-avatar>
        </div>
        <div class="user-show-info">
          <div class="info-name">
            <h2>{{friendInfo.username}}</h2>
          </div>
          <div class="info-sex" v-if="friendInfo.sex===0">
            <img src="../../assets/sex_man.png" alt="男" />
          </div>
          <div class="info-sex" v-else-if="friendInfo.sex===1">
            <img src="../../assets/sex_woman.png" alt="女" />
          </div>
          <div class="info-sex" v-else>
            <img src="../../assets/sex.png" alt="保密" />
          </div>
        </div>
        <div class="info-intro">{{friendInfo.introduction}}</div>
      </el-card>
    </div>
    <div class="friend-trend">
      <el-card>
        <trendItem v-for="item in friendTrend" :key="item.tid" :itemInfo="item"></trendItem>
      </el-card>
      <div class="loading" v-loading="loading"></div>
    </div>
  </div>
</template>

<script>
import trendItem from '../social/trendItem.vue';

export default {
  props: ['uid'],
  components: {
    trendItem,
  },
  computed: {
  },
  mounted() {
    // 接受一个参数uid，请求信息，并且请求他的动态
    this.$http.get(`/v1/user/uid/${this.uid}`).then((res) => {
      this.friendInfo = res.data.data;
      this.picUrl = `http://39.97.113.252:8080/static/${this.friendInfo.avatar}`;
    }).catch((err) => {
      console.log(err);
    });

    this.$http.get(`/v1/user/${this.uid}/news/page/${this.page}`).then((res) => {
      const resData = res.data.data;
      this.page = resData.current + 1;
      this.friendTrend = resData.news;
      if (res.data.data.current === res.data.data.pages) {
        this.trendFull = true;
      }
    });

    // scroll
    const storeThis = this;
    this.$nextTick(() => {
      // eslint-disable-next-line func-names
      window.onscroll = function () {
        // 变量scrollTop是滚动条滚动时，距离顶部的距离
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 变量windowHeight是可视区的高度
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 变量scrollHeight是滚动条的总高度
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 滚动条到底部的条件
        if (Math.ceil(scrollTop) + windowHeight === scrollHeight) {
          // 写后台加载数据的函数
          // 请求新数据
          storeThis.getNews();
          // eslint-disable-next-line no-empty
          // document.scrollHeight = Math.ceil(scrollTop) + windowHeight;
        }
      };
    });
  },
  data() {
    return {
      friendInfo: {},
      friendTrend: [],
      page: 1,
      loading: true,
      trendFull: false,
      picUrl: '',
      onloading: false,
    };
  },
  methods: {
    // eslint-disable-next-line consistent-return
    getNews() {
      // 推荐动态
      if (this.onloading) {
        return false;
      }
      // 正在请求，避免重复请求
      this.onloading = true;
      if (!this.trendFull) {
        this.$http.get(`/v1/user/${this.uid}/news/page/${this.page}`, {
        }).then((res) => {
          const resData = res.data.data;
          console.log(resData);
          if (resData.current === resData.pages) {
            this.trendFull = true;
          }
          this.page = resData.current + 1;
          this.friendTrend.push(...resData.news);
          setTimeout(() => {
            this.onloading = false;
          }, 200);
        });
      } else {
        this.$notify({
          message: '你已经刷到底辣！',
        });
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.frendTrend {
}

.friend-info {
  width: 100%;
}

.user-show-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1.1rem;
}

.info-sex {
  margin-top: 0.4rem;
  margin-left: 0.4rem;
  width: 1.3rem;
  height: 1.3rem;
}

.info-intro {
  color: #aba;
  padding: 5px;
}

.friend-trend {
  height: 50%;
  margin-top: 1rem;
}

.loading {
  margin-top: 3rem;
  background-color: rgb(244, 245, 245);
}
/* ---------- */

.el-avatar {
  width: 5.5rem;
  height: 5.5rem;
}

img {
  width: 100%;
}
</style>
