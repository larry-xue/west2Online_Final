<template>
  <div class="nav-wrapper">
    <div class="nav-logo" @click="jump('Home')" style="cursor: pointer">
      <h1>seaFlow</h1>
      <div class="logoPng"></div>
    </div>
    <div class="nav-others">
      <div class="item">
        <el-link :underline="false" :class="select[0]" @click="jump('games', 0)" type="info">Games</el-link>
      </div>
      <div class="item">
        <el-link :underline="false" :class="select[1]" @click="jump('social', 1)" type="info">Social</el-link>
      </div>
      <div class="item">
        <el-link
          :underline="false"
          :class="select[2]"
          @click="jump('friends', 2)"
          type="info"
        >Friends</el-link>
      </div>
      <div class="item">
        <el-link
          :underline="false"
          :class="select[3]"
          @click="jump('contact', 3)"
          type="info"
        >Contact</el-link>
      </div>
      <div class="item item-myself" @click="jump('user')">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  mounted() {
    console.log(this.nowNavVisit);
  },
  methods: {
    jump(cmp, index) {
      this.$router.push({
        name: cmp,
      });
      this.select = ['', '', '', ''];
      this.select[index] = 'selectColor';
    },
  },
  computed: {
    ...mapState({
      nowNavVisit: (state) => state.nowNavVisit,
    }),
  },
  data() {
    return {
      select: ['', '', '', ''],
    };
  },
};
</script>

<style scoped>
.nav-wrapper {
  min-height: 4.5rem;
  background-color: hsl(195, 100%, 7%);
  margin-bottom: -71.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  width: 20%;
  color: RGB(64, 158, 255);
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logoPng {
  width: 3rem;
  height: 3rem;
  /* background-color: red; */
  margin-top: 10px;
  z-index: 998;
  border-image-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../assets/logo.png");
}

.nav-others {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
}

.item {
  padding: 0 2vw;
  color: white;
}

.item-myself {
  cursor: pointer;
}

.el-link {
  font-size: 1.1rem;
}

.selectColor {
  color: RGB(64, 158, 255);
}
</style>
