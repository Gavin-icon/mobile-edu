<template>
  <div class="pay">
    <van-cell-group>
      <van-cell class="course-info">
        <img :src="course.courseImgUrl" alt="">
        <div class="price-info">
          <!-- 标题 -->
          <div class="course-name" v-text="course.courseName"></div>
          <div class="discounts">￥{{ course.discounts }}</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买成功成功成功成功</div>
        <div class="username">
          当前账号: {{ userName }}
        </div>
      </van-cell>
      <van-cell class="pay-channel">
        <div class="title">
          <p>支付方式</p>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell clickable @click="radio = '1'">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png" alt="">
                  <span>微信支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell clickable @click="radio = '2'">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png" alt="">
                  <span>支付宝支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <van-button @click="handlePay">￥{{ course.discounts }} 立即支付</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course'
// eslint-disable-next-line
import { Toast } from 'vant'
import { createOrder, getPayInfo, initPayment, getPayResult } from '@/services/pay'
export default {
  name: 'Pay',
  props: {
    courseId: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      course: {},
      radio: '1',
      orderNo: {}
    }
  },
  created () {
    this.loadCourse()
    // 创建一个商品订单
    this.loadOrder()
  },
  computed: {
    userName () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  },
  methods: {
    // 支付请求
    async handlePay () {
      // 发起支付请求，获取支付地址与支付订单号
      const { data } = await initPayment({
        goodsOrderNo: this.orderNo,
        channel: this.radio === 1 ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.lagounews.com/'
      })
      console.log(data)
      // 接收响应地址，并进行跳转
      // window.location.href = 'https://www.alipay.com/'
      window.location.href = data.content.payUrl

      const timer = setInterval(async () => {
        // 发起查询支付结果请求(此处使用)
        const { data: payResult } = await getPayResult({
          orderNo: data.content.orderNo
        })
        // 如果支付结果成功，清除定时器，并提示购买成功，跳回到学习页
        if (payResult.content && payResult.content.status === 2) {
          clearInterval(timer)
          Toast.success('购买成功！')
          this.$router.push({
            name: 'learn'
          })
        }
      }, 1000)
    },
    // 创建商品订单以及支付方式
    async loadOrder () {
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      console.log(data)
      // 得到了商品订单的编号
      this.orderNo = data.content.orderNo
      // 获取支付方式 --无意义，最终后端要的和这个接口给的不一致，还是得手动拼接
      const { data: payInfo } = await getPayInfo(this.orderNo)
      console.log(payInfo)
    },
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      // console.log(data)
      this.course = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
.pay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.pay-channel {
  // 占满剩余空间
  flex: 1;
  .van-cell {
    // 留出padding,每个val-cell
    padding: 20px 10px;
  }
  // 整个支付区域，flex布局，div + button 各占据一半
  .van-cell__value {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .van-cell__title {
      // 解决图标和文字不在同一行的问题
      display: flex;
      align-items: center;
      img {
        width: 28px;
        height: 28px;
      }
      span {
        font-size: 16px;
        margin-left: 10px;
      }
    }
    ::v-deep .van-radio__icon--checked .van-icon {
      border: 0;
      background-color: #fbc546;
    }
    .van-button {
       background: linear-gradient(270deg, #faa83e, #fbc546);
       border-radius: 20px;
       margin-bottom: 10px;
       font-size: 18px;
    }
  }
}
.van-cell-group {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.course-info {
  height: 170px;
  padding: 40px 20px 0;
  img {
    width: 80px;
    height: 107px;
    border-radius: 10px;
  }
  .price-info {
    height: 107px;
    padding: 5px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .course-name {
      font-size: 16px;
    }
    .discounts {
      font-size: 22px;
      font-weight: 700;
      color: #ff7452;
    }
  }
  .van-cell__value {
    display: flex;
  }
}
.account-info {
  height: 120px;
  margin-bottom: 10px;
  div:nth-child(2) {
    font-size: 12px;
    color: #999;
  }
  .username {
    margin: 20px 0 10px;
    font-size: 16px;
  }
}
</style>
