import request from '@/utils/request'

// 创建商品订单接口
export const createOrder = data => {
  return request({
    method: 'POST',
    url: '/front/order/saveOrder',
    data
  })
}

// 获取支付方式接口
export const getPayInfo = shopOrderNo => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayInfo',
    params: {
      shopOrderNo
    }
  })
}

// 创建支付订单接口
export const initPayment = data => {
  return request({
    method: 'POST',
    url: '/front/pay/saveOrder',
    data
  })
}

// 查询订单接口
export const getPayResult = orderNo => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayResult',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      orderNo
    }
  })
}
