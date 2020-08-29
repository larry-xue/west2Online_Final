<template>
  <div class="friends">
    <div class="Lists">
      <friendList :itemInfo="myFriendList"></friendList>
      <requestList :itemInfo="myFriendList"></requestList>
    </div>
    <div class="friendTrend">
      <friendTrend :uid="6"></friendTrend>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import friendList from '../components/friends/friendList.vue';
import requestList from '../components/friends/requestList.vue';
import friendTrend from '../components/friends/friendTrend.vue';

export default {
  components: {
    friendList,
    requestList,
    friendTrend,
  },
  data() {
    return {
      myFriendList: [
        {
          name: 'azoux1',
          sex: 0,
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          uid: 1,
          saying: 'hhhssssssssssssssssssssssssssshhh',
        },
        {
          name: 'azoux1',
          sex: 0,
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          uid: 1,
          saying: 'hhhssssssssssssssssssssssssssshhh',
        },
        {
          name: 'azoux1',
          sex: 0,
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          uid: 1,
          saying: 'hhhssssssssssssssssssssssssssshhh',
        },
        {
          name: 'azoux1',
          sex: 0,
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          uid: 1,
          saying: 'hhhssssssssssssssssssssssssssshhh',
        },
        {
          name: 'azoux1',
          sex: 0,
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          uid: 1,
          saying: 'hhhssssssssssssssssssssssssssshhh',
        },
      ],
    };
  },
};
</script>

<style scoped>
.friends {
  height: 70vh;
  width: 90vw;
  margin: 0 auto;
  margin-top: 7rem;

  display: flex;
  justify-content: space-around;
}

.friends .Lists {
  width: 20%;
}

.friends .friendTrend {
  width: 95%;
  margin-left: 2%;
}
</style>
