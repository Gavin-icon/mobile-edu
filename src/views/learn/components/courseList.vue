<template>
  <div class="course-list">
    <van-pull-refresh v-model="isRefreshing" :head-height="80" @refresh="onRefresh">
      <template #pulling="props">
        <img
          class="doge"
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
      </template>
      <van-list v-model="loading"
                :finished="finished"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了"
                @load="onLoad">
        <van-cell v-for="item in list"
                  :key="item.id">
          <!--所有课程与已购课程的图不一样：课程左侧图片-->
          <div><img :src="item.image" alt=""></div>
          <!--课程右侧信息-->
          <div class="course-info">
            <h3 v-text="item.name"></h3>
            <p v-html="item.previewFirstField"></p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  props: {
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 数据页数，当前页数，触底
      currentPage: 1,
      // 一页加载几条
      pageSize: 10,
      // 下拉刷新状态
      isRefreshing: false,
      // 加载失败
      error: false,
      // 记录刷新次数
      count: 0
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await this.fetchData()
        // console.log(data)
        if (data.content && data.content.length !== 0) {
          // 因为每次触底后是往list数组添加内容，所以要添加的是数据，而不是数组
          this.list = data.content
        }
        // 请求后loading状态为false,组件监控到false会再发请求
        this.loading = false
        this.finished = true
      } catch (error) {
        await setTimeout(() => {
          this.loading = false
          this.error = true
        }, 1000)
      }
    },
    // 上拉刷新操作
    async onRefresh () {
      try {
        const { data } = await this.fetchData()
        await setTimeout(() => {
          // 该组件会被复用，可能后台数据不一致，所以不要轻易赋值,只有一种情况下才可已赋值：data.data存在，data.data.records存在,data.data.records!==0才可以赋值，否则会报错
          if (data.content && data.content.length !== 0) {
            this.list = data.content
          }
          // 刷新成功后关闭下拉刷新状态
          this.isRefreshing = false
          // 提示设置
          this.$toast.success('刷新成功')
        }, 800)
      } catch (error) {
        await setTimeout(() => {
          this.isRefreshing = false
          this.$toast.fail('刷新失败')
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  // 狗头设置
  .doge {
    width: 160px;
    height: 75px;
    margin-top: 8px;
    border-radius: 4px;
  }
  // 列表固定，滚动
  .course-list {
    position: fixed;
    overflow-y: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  // 列表项的样式
  .van-cell__value {
    display: flex;
    height: 100px;
    padding: 10px 0;
    img {
      width: 80px;
      height: 100%;
      border-radius: 5px;
    }
    .course-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0 10px;
      p, h3 {
        margin: 0;
      }
      p:nth-child(2) {
        flex-grow: 1;
      }
      p:nth-child(3) {
        .course-discounts {
          color: #ff7452;
          margin-right: 10px;
        }
      }
    }
  }
</style>
