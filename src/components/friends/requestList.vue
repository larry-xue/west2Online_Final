<template>
  <div class="requestList-wrapper">
    <div class="requestList-body">
      <h2>好友申请</h2>
      <vue-scroll slot="refresh-start" ref="body">
        <ul>
          <li v-for="item in itemInfo" :key="item.key" class="cursor">
            <div class="request-info">
              <div class="info-avatar">
                <el-avatar :src="item.avatar"></el-avatar>
              </div>
              <div class="info-name-saying">
                <h3>{{ item.name }}</h3>
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
</template>

<script>
export default {
  props: ['itemInfo'],
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
