<template>
  <div class="requestList-wrapper">
    <div class="requestList-body">
      <h2>好友申请</h2>
      <!-- undeal -->
      <vue-scroll slot="refresh-start" ref="body">
        <ul>
          <li v-for="item in undealRequest" :key="item.uid" class="cursor">
            <div class="request-info" @click="() => {this.$emit('lookThisGuyTrend', item.uid)}">
              <div class="info-avatar">
                <el-avatar :src="'http://39.97.113.252:8080/static/' + item.avatar"></el-avatar>
              </div>
              <div class="info-name-saying">
                <h3>{{ item.username }}</h3>
                <div>{{item.saying}}</div>
              </div>
            </div>
            <div class="options">
              <div class="option-item">
                <i class="el-icon-plus" @click="addThisGuy(item, true)"></i>
              </div>
              <div class="option-item">
                <i class="el-icon-delete" @click="addThisGuy(item, false)"></i>
              </div>
            </div>
          </li>
        </ul>
      </vue-scroll>
      <!-- dealed -->
      <div class="dealed-request">
        <h2>已处理的申请</h2>
        <vue-scroll slot="refresh-start" ref="body">
          <ul>
            <li v-for="item in handledRequest" :key="item.uid" class="cursor">
              <div class="request-info">
                <div class="info-avatar">
                  <el-avatar :src="'http://39.97.113.252:8080/static/' + item.avatar"></el-avatar>
                </div>
                <div class="info-name-saying">
                  <h3>{{ item.username }}</h3>
                  <div>{{item.saying}}</div>
                </div>
              </div>
              <div class="options">
                <div class="option-item">
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </li>
          </ul>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getRequestList();
    this.getUndeadedList();
  },
  methods: {
    addThisGuy(item, agree) {
      console.log(item);
      this.$http.post(`/v1/friends/agree/${item.mid}`, {
        agree,
      }).then((res) => {
        console.log(res);
      });
    },
    getRequestList(pages = 1) {
      // getRequestList
      this.$http.get('/v1/friends/not_handle', {
        params: {
          pages,
        },
      }).then((res) => {
        console.log(res);
        this.undealRequest = res.data.data.reply;
      });
    },
    getUndeadedList(pages = 1) {
      // dealed
      this.$http.get('/v1/friends/handled', {
        params: {
          pages,
        },
      }).then((res) => {
        console.log(res);
        this.handledRequest = res.data.data.reply;
      });
    },
  },
  data() {
    return {
      undealRequest: [],
      handledRequest: [],
    };
  },
};
</script>

<style scoped>
.requestList-wrapper {
  padding: 0.3rem;
}

.requestList-body {
  background-color: #fff;
  height: 12rem;
}

.dealed-request {
  background-color: #fff;
  height: 12rem;
}

.request-info {
  display: flex;
  align-items: center;
  width: 80%;
  overflow: hidden;
}

.request-info .info-avatar {
  margin-top: 0.5rem;
  margin-left: 0.2rem;
}

.request-info .info-name-saying {
  text-align: left;
  margin-left: 1rem;
}

.info-name-saying div {
  color: #999;
  font-size: 13px;
}

.options {
  width: 30%;
  display: flex;
  justify-content: space-around;
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
  padding-top: 4rem;
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
