<template>
  <div class="user">
    <div class="user-show">
      <el-card>
        <div class="user-show-avatar">
          <el-avatar :src="userInfo.avatar"></el-avatar>
        </div>
        <div class="user-show-info">
          <div class="info-name">
            <h2>{{userInfo.username}}</h2>
          </div>
          <div class="info-sex" v-if="userInfo.sex===0">
            <img src="../assets/sex_man.png" alt="男" />
          </div>
          <div class="info-sex" v-else-if="userInfo.sex===1">
            <img src="../assets/sex_woman.png" alt="女" />
          </div>
          <div class="info-sex" v-else>
            <img src="../assets/sex.png" alt="保密" />
          </div>
        </div>
        <div class="info-intro">{{userInfo.introduction}}</div>
        <div class="info-edit">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="gotoEditInfo"></el-button>
        </div>
      </el-card>
      <div class="user-tabs">
        <el-tabs v-model="activeTab" @tab-click="changeActiveTab" :stretch="true">
          <el-tab-pane label="动态" name="first">
            <router-view></router-view>
          </el-tab-pane>
          <el-tab-pane label="游戏" name="second">
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>>

<script>
import { mapState } from 'vuex';

export default {
  mounted() {
    console.log(this.userInfo.sex);
  },
  components: {
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  methods: {
    changeActiveTab(tab) {
      if (tab.$el.id === 'pane-first') {
        this.$router.push({
          name: 'activities',
        });
      } else {
        this.$router.push({
          name: 'gameShow',
        });
      }
    },
    gotoEditInfo() {
      this.$router.push({
        name: 'profile',
      });
    },
  },
  data() {
    return {
      activeTab: '',
    };
  },
};
</script>

<style scoped>
.user {
  margin: 0 auto;
  margin-top: 6rem;
  width: 70%;
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

.el-avatar {
  width: 7.5rem;
  height: 7.5rem;
}

img {
  width: 100%;
}
</style>
