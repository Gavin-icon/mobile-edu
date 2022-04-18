<template>
  <div class="course-content">
    <!-- 轮播 -->
    <van-swipe
              :autoplay="3000"
              indicator-color="white">
      <van-swipe-item
        v-for="ad in activeAdList"
        @click="routeTo(ad.link)"
        :key="ad.id"><img :src="ad.img"></van-swipe-item>
    </van-swipe>
    <!-- 课程列表 -->
    <course-list></course-list>
  </div>
</template>

<script>
import CourseList from './courseList'
import { getAds } from '@/services/course'
export default {
  name: 'CourseContent',
  data () {
    return {
      // 轮播图图片列表
      adList: []
    }
  },
  components: {
    CourseList
  },
  created () {
    this.loadAds()
  },
  computed: {
    // 对上架的进行筛选，在计算属性中可以缓存，利用filter
    activeAdList () {
      return this.adList.filter(ad => ad.status === 1)
    }
  },
  methods: {
    async loadAds () {
      const { data } = await getAds({
        spaceKeys: '999'
      })
      // console.log(data)
      if (data.state === 1) {
        this.adList = data.content[0].adDTOList
      }
    },
    // 实现跳转
    routeTo (link) {
      location.href = link
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-swipe {
    width: 100%;
    .van-swipe-item {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 170px;
    }
  }
  .course-list {
    top: 225px;
    bottom: 55px;
  }
</style>
