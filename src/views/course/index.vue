<template>
  <div class="course">
    <course-header></course-header>
    <course-content></course-content>
    <common-footer-page></common-footer-page>
  </div>
</template>

<script>
import CourseHeader from './components/courseHeader'
import CourseContent from './components/courseContent'
import CommonFooterPage from '@/components/commonFooterPage/index'
export default {
  name: 'Course',
  components: {
    CourseHeader,
    CourseContent,
    CommonFooterPage
  }
}
</script>

<style lang="scss" scoped>

</style>
