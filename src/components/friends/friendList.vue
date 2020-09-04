<template>
  <div class="friendList-wrapper">
    <div class="friendList-body">
      <h2>好友列表</h2>
      <vue-scroll slot="refresh-start" ref="body">
        <ul>
          <li v-for="item in myFriendList" :key="item.key" class="cursor">
            <div class="friend-info">
              <div class="info-avatar">
                <el-avatar :src="'http://39.97.113.252:8080/static/' + item.avatar"></el-avatar>
              </div>
              <div class="info-name-saying">
                <h3>{{ item.username }}</h3>
                <div>{{ item.saying }}</div>
              </div>
            </div>
            <div class="options">
              <div class="option-item" @click="chatWhithThisGuy(item)">
                <i class="el-icon-chat-line-round"></i>
              </div>
            </div>
          </li>
          <li v-if="myFriendList.length===0">你还没有好友喔，快去添加吧~~</li>
        </ul>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getFriendList();
  },
  methods: {
    chatWhithThisGuy(item) {
      this.$emit('chatWithAGuy', item);
      this.$store.commit('updateNowChatUID', item.uid);
    },
    getFriendList(pages = 1) {
      // getFriendList
      this.$http.get('/v1/friends', {
        params: {
          pages,
        },
      }).then((res) => {
        console.log(res);
        const { friends } = res.data.data;
        for (let i = 0; i < friends.length; i += 1) {
          // 请求好友信息
          this.$http.get(`/v1/user/uid/${friends[i]}`).then((res2) => {
            console.log(res2);
            this.myFriendList.push(res2.data.data);
          });
        }
      });
    },
  },
  data() {
    return {
      myFriendList: [],
    };
  },
};
</script>

<style scoped>
.friendList-wrapper {
  padding: 0.3rem;
}

.friendList-body {
  background-color: #fff;
}

.friend-info {
  display: flex;
  align-items: center;
  width: 80%;
  overflow: hidden;
}

.friend-info .info-avatar {
  margin-top: 0.5rem;
  margin-left: 0.2rem;
}

.friend-info .info-name-saying {
  text-align: left;
  margin-left: 1rem;
}

.info-name-saying div {
  color: #999;
  font-size: 13px;
}

.options {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.options .option-item {
  color: blue;
}

/* ---------- */

h2 {
  text-align: left;
  background-color: rgb(244, 245, 245);
  padding: 1rem;
  padding-left: 0;
}

ul {
  background-color: rgb(244, 245, 245);
}

li {
  list-style: none;
  display: flex;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 1rem;
}

li:hover {
  background-color: #eee;
  transition: all 0.3s;
}
</style>
