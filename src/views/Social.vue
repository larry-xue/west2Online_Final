<template>
  <div class="social">
    <div class="social-tabs">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#000"
        active-text-color="blue"
      >
        <el-menu-item index="1">
          <span slot="title">推荐</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">关注</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">热门</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="social-body">
      <sendInput inputType="textarea"></sendInput>
      <div class="show-trend">
        <trendItem v-for="item in likeTrend" :key="item.tid" :itemInfo="item"></trendItem>
        <div class="loading" v-loading="loading"></div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>>

<script>
import { mapState } from 'vuex';
import sendInput from '../components/social/sendInput.vue';
import trendItem from '../components/social/trendItem.vue';

export default {
  mounted() {
    if (this.likeTrend.length === 0) {
      // 先获取所有动态
      this.$http.get('/v1/news').then((res) => {
        console.log(res);
        this.likePage = res.data.data.current + 1;
        console.log(this.likePage);
        this.$store.commit('addLikeTrend', res.data.data.news);
      }).catch((err) => {
        console.log(err);
      });
    }
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
          const d = new Date().getTime() + 1000;
          // eslint-disable-next-line no-empty
          for (; d > new Date().getTime();) { }
          document.scrollHeight = Math.ceil(scrollTop) + windowHeight;
        }
      };
    });
  },
  components: {
    sendInput,
    trendItem,
  },
  data() {
    return {
      // 推荐动态已经获取到的页数
      likePage: 1,
      likeFull: false,
      // 热门动态已经获取到的页数
      hotPage: 1,
      hotFull: false,
      // 好友动态已经获取到的页数
      friendPage: 1,
      friendFull: false,
      loading: true,
    };
  },
  methods: {
    getNews(type = 0) {
      if (!type) {
        // 推荐动态
        if (!this.likeFull) {
          console.log(this.likePage);

          this.$http.get(`/v1/news/page/${this.likePage}`, {
          }).then((res) => {
            const resData = res.data.data;
            console.log(resData);
            if (resData.current === resData.pages) {
              this.likeFull = true;
            }
            this.likePage = resData.current + 1;
            this.$store.commit('addLikeTrend', resData.news, 1);
          });
        } else {
          this.$notify({
            message: '你已经刷到底辣！',
          });
          this.loading = false;
        }
      }
    },
  },
  computed: {
    ...mapState({
      likeTrend: (state) => state.likeTrend,
    }),
  },
};
</script>

<style scoped>
.social {
  width: 70%;
  margin: 0 auto;
  margin-top: 7rem;
  height: 500px;
}

.social-tabs {
  width: 6rem;
  position: fixed;
  margin-left: 10%;
}

.social-body {
  width: 33rem;
  margin-left: 29%;
}

.show-trend {
  width: 33rem;
  margin-top: 1rem;
}

.loading {
  margin-top: 3rem;
  background-color: rgb(244, 245, 245);
}
</style>
