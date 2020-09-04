<template>
  <div class="messageItem" :style="{ float: float, backgroundColor: color }">
    <!-- 一条消息 -->
    <div class="picture" v-if="itemInfo.is_url">
      <el-image :src="picUrl"></el-image>
    </div>
    <div class="content" v-else>{{itemInfo.content}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['itemInfo'],
  mounted() {
    if (this.itemInfo.from === this.userInfo.uid) {
      this.float = 'right';
      this.color = 'rgb(129,212,250)';
    }
  },
  data() {
    return {
      float: 'left',
      color: 'rgb(88,109,179)',
    };
  },
  computed: {
    picUrl() {
      return `http://39.97.113.252:8080/static/${this.itemInfo.content}`;
    },
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
};
</script>

<style scoped>
.messageItem {
  padding: 0.5rem 0.4rem;
  border-radius: 10px;
  max-width: 60%;
  text-align: left;
  margin: 1rem;
  float: left;
  clear: both;
  color: #fff;
}
</style>
