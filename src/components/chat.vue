<template>
  <div class="chat">
    <el-drawer
      :visible="showChat"
      direction="rtl"
      :close-on-press-escape="true"
      size="35%"
      :show-close="false"
      :modal="false"
      :modal-append-to-body="false"
      title="聊天列表"
    >
      <div class="chat-list"></div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      showChat: (state) => state.showChat,
    }),
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
</style>
