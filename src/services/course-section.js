import request from '@/utils/request'

// 获取课程章节接口
export const getSectionAndLesson = courseId => {
  return request({
    method: 'GET',
    url: '/front/course/session/getSectionAndLesson',
    params: {
      courseId
    }
  })
}

// 获取阿里云视频接口
export const getVideoInfo = lessonId => {
  return request({
    method: 'GET',
    url: '/front/course/media/videoPlayInfo',
    params: {
      lessonId
    }
  })
}
