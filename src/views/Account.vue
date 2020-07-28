<template>
    <div>
        <router-view></router-view>
    </div>
</template>>

<script>
export default {
  mounted() {
    // 如果访问account就定位到登录页
    if (this.$router.history.current.name === 'Account') {
      this.$router.push({
        name: 'login',
      });
    }
  },
};
</script>>
