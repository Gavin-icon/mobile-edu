import request from '@/utils/request'

// 获取广告位及对应的广告
export const getAds = params => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params
  })
}

// 分页查询课程内容
export const getQueryCourse = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 获取已购课程接口
export const purchaseCourse = () => {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse'
  })
}
