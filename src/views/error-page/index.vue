<template>
  <div class="error-page">
    <h3>访问资源不存在...</h3>
    <img :src="require('/public/images/404.png')" alt="">
  </div>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>

<style lang="scss" scoped>
  .error-page {
    width: 100%;
    height: 100%;
    h3 {
      color: bisque;
      text-align: center;
      height: 100px;
      line-height: 100px;
      margin: 0;
      background-image: linear-gradient(135deg, blue, purple);
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin-top: 100px;
      margin-left: 30px;
    }
  }
</style>
