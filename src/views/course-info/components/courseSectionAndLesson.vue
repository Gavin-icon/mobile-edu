<template>
  <div class="course-section-and-lesson">
    <!-- 课时列表组件 -->
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <p class="lesson"
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      @click="handleClick(item)"
    >
      <!-- 课时名称 -->
      <span v-text="item.theme"></span>
      <!-- 课程是否可以播放 -->
      <van-icon v-if="item.canPlay" name="play-circle" size="20"></van-icon>
      <van-icon v-else name="lock" size="20"></van-icon>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CourseSectionAndLesson',
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick (lessonInfo) {
      if (lessonInfo.canPlay) {
        // 可以播放就跳转到播放页面
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-section-and-lesson {
  padding: 0 20px;
}
.lesson {
  display: flex;
  justify-content: space-between;
}
</style>
