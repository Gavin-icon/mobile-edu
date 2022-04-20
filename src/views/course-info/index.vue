<template>
  <div class="course-info">
    <van-cell-group :style="styleOptions">
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-description">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-sale-info">
          <!-- 课程价格 -->
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <s>￥{{ course.price }}</s>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详情 -->
      <van-cell class="course-detail">
        <!-- 需要给van-taps设置scrollspy属性为滚动导航，到达指定页面切换tab栏 -->
        <van-tabs sticky scrollspy>
        <van-tab title="详情">
          <!-- 详情页面在后台是HTML富文本格式 -->
          <div v-html="course.courseDescription"></div>
        </van-tab>
        <van-tab title="内容">
          <course-section-and-lesson
            v-for="item in section"
            :key="item.id"
            :sectionData="item"
          ></course-section-and-lesson>
        </van-tab>
      </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <s>￥{{ course.price }}</s>
      </div>
      <van-button type="primary" @click="handlePay">立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course'
import { getSectionAndLesson } from '@/services/course-section'
import CourseSectionAndLesson from './components/courseSectionAndLesson'
export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    CourseSectionAndLesson
  },
  data () {
    return {
      // 存储课程信息
      course: {},
      section: [],
      // 样式信息
      styleOptions: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadSection()
  },
  methods: {
    // 支付功能
    handlePay () {
      // 检测是否登录
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        // 跳转到登录页面
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    async loadCourse () {
      try {
        const { data } = await getCourseById(this.courseId)
        console.log(data)
        this.course = data.content
        if (data.content.isBuy) {
          this.styleOptions = {
            bottom: 0
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loadSection () {
      const { data } = await getSectionAndLesson(this.courseId)
      console.log(data)
      this.section = data.content.courseSectionList
    }
  }
}
</script>

<style lang="scss" scoped>
  // 清除van-cell组件的默认边距
  .van-cell {
    padding: 0
  }
  // 课程图片设置
  .course-img {
    height: 280px;
    img {
      width: 100%;
      height: 280px;
    }
  }
  // 课程描述区域
  .course-description {
    padding: 10px 20px;
    height: 150px;
    .course-sale-info {
      display: flex;
      .course-price {
        flex: 1;
        margin: 0;
      }
      .tag {
        background-color: #f8f9fa;
        font-size: 12px;
        font-weight: 700;
        color: #666;
        padding: 7px;
        line-height: 15px;
        border-radius: 5px;
      }
    }
  }
  .discounts {
    color: #ff7452;
    font-size: 24px!important;
    font-weight: 700;
    margin-right: 10px;
  }
  // 底部样式
  .van-cell-group {
    width: 100%;
    position: fixed;
    bottom: 50px;
    top: 0;
    // 出现问题，不能滚动,
    overflow: auto;
  }
  .van-tabbar {
    line-height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span, s {
      font-size: 14px;
    }
    .van-button {
      width: 50%;
      height: 80%;
      border-radius: 1px;
    }
  }
</style>
<!--设置富文本编辑器内部的代码样式 -->
<style lang="css">
  .course-detail img {
    width: 100%;
  }
</style>
