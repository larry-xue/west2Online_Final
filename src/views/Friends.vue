<template>
  <div class="friends">
    <div class="friendList">
      <friendList :itemInfo="myFriendList"></friendList>
    </div>
    <div class="friendTrend">12</div>
  </div>
</template>

<script>
import friendList from '../components/friends/friendList.vue';

export default {
  components: {
    friendList,
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

.friends .friendList {
  width: 20%;
}

.friends .friendTrend {
  width: 60%;
  background-color: blue;
}
</style>
