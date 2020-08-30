<template>
  <div class="messageItem">
    <!-- 一条消息 -->
    <div class="picture" v-if="itemInfo.is_url">
      <el-image style="width: 100px; height: 100px" :src="picUrl"></el-image>
    </div>
    <div class="content" v-else>{{itemInfo.content}}</div>
  </div>
</template>

<script>
export default {
  props: ['itemInfo'],
  data() {
    return {

    };
  },
  computed: {
    picUrl() {
      return `http://39.97.113.252:8080/static/${this.itemInfo.content}`;
    },
  },
};
</script>

<style scoped>
</style>
