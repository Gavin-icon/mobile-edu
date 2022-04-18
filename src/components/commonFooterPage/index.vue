<template>
  <div class="common-footer-page">
    <van-tabbar route>
      <van-tabbar-item replace
                       to="/"
                       icon="apps-o">选课</van-tabbar-item>
      <van-tabbar-item replace
                       to="/learn"
                       icon="desktop-o">学习</van-tabbar-item>
                             <van-tabbar-item replace
                       to="/user"
                       icon="user-circle-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'CommonFooterPage'
}
</script>

<style lang="scss" scoped>
</style>
