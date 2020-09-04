<template>
  <div class="user-activities">
    <el-card>
      <trendItem v-for="item in myTrend" :key="item.tid" :itemInfo="item"></trendItem>
    </el-card>
    <div class="loading" v-loading="loading"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import trendItem from '../social/trendItem.vue';

export default {
  components: {
    trendItem,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
      myTrend: (state) => state.myTrend,
    }),
  },
  mounted() {
    // myTrend
    this.$http.get(`v1/user/${this.userInfo.uid}/news/page/1`).then((res) => {
      if (res.data.data.current === res.data.data.pages) {
        this.trendFull = true;
      }
      if (this.myTrend.length === 0) {
        this.$store.commit('updateMyTrend', res.data.data.news);
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
      onloading: false,
      trendFull: false,
      loading: true,
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
        this.$http.get(`/v1/user/${this.userInfo.uid}/news/page/${(this.myTrend.length / 5 + 1)}`, {
        }).then((res) => {
          const resData = res.data.data;
          console.log(resData);
          if (resData.current === resData.pages) {
            this.trendFull = true;
          }
          this.$store.commit('updateMyTrend', res.data.data.news);
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
.my-info {
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

.my-trend {
  height: 50%;
  margin-top: 1rem;
}

.loading {
  height: 3rem;
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
