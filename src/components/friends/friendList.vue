<template>
  <div class="friendList-wrapper">
    <div class="friendList-body">
      <ul>
        <li v-for="item in itemInfo" :key="item.key" class="cursor">
          <div class="friend-info">
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
              <i class="el-icon-chat-line-round"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemInfo'],
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
