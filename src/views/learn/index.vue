<template>
  <div class="learn">
    <!--顶部功能-->
    <van-nav-bar title="已购课程" />
    <!--课程列表-->
  <course-list :fetchData="fetchData"></course-list>
    <!--底部导航-->
    <common-footer-page></common-footer-page>
  </div>
</template>

<script>
import CourseList from './components/courseList'
import CommonFooterPage from '@/components/commonFooterPage/index'
import { purchaseCourse } from '@/services/course'
export default {
  name: 'Learn',
  components: {
    CommonFooterPage,
    CourseList
  },
  created () {
    this.loadPurchaseCourse()
  },
  methods: {
    fetchData () {
      return purchaseCourse()
    },
    loadPurchaseCourse () {
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.course-list {
  top: 50px;
  bottom: 50px;
}
</style>
