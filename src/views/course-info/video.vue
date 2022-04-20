<template>
  <div class="course-video">
    <!-- 顶部导航 -->
    <van-nav-bar title="视频"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)" />
    <!-- 设置视频容器 -->
    <div id="video-container"></div>
  </div>
</template>

<script>
import { getVideoInfo } from '@/services/course-section'
export default {
  name: 'courseVideo',
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 存储视频信息
      videoInfo: {}
    }
  },
  created () {
    this.loadVideo()
  },
  methods: {
    async loadVideo () {
      const { data } = await getVideoInfo(this.lessonId)
      console.log(data)
      /* eslint-disable */
      var player = new window.Aliplayer({
        // 挂载的元素
        id: 'video-container',
        width: '100%',
        height: '100%',
        vid: data.content.fileId, //  必选参数。音视频ID。示例：1e067a2831b641db90d570b6480f****。
        playauth: data.content.playAuth, //  必选参数。音视频播放凭证。
        format: 'mp4' // 必须配置format
        // qualitySort: 'asc',
        // mediaType: 'video',
        // autoplay: true,
        // isLive: false,
        // playsinline: true,
        // preload: true,
        // rePlay: false,
        // controlsBraVisibility: 'hover',
        // useH5Prism: true
      }, function (player) {
        console.log('The player is created.')
      })
      /* eslint-enable */
    }
  }
}
</script>

<style>
  #video-container {
    height: 210px!important;
  }
</style>
