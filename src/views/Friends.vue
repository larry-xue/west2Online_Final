<template>
  <div class="friends">
    <div class="Lists">
      <requestList @lookThisGuy="lookThisGuyTrend"></requestList>
    </div>
    <div class="friendTrend">
      <friendTrend :uid="6"></friendTrend>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import requestList from '../components/friends/requestList.vue';
import friendTrend from '../components/friends/friendTrend.vue';

export default {
  components: {
    requestList,
    friendTrend,
  },
  data() {
    return {

    };
  },
  methods: {
    lookThisGuyTrend(uid) {
      console.log(uid);
    },
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
