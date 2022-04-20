<template>
  <div class="user">
    <!--顶部功能-->
    <van-cell-group>
      <!--用户信息区域-->
      <van-cell class="user-info" :border="false">
        <!--头像-->
        <van-image width="50"
                   height="50"
                   round
                   :src="userInfo.portrait || 'https://img01.yzcdn.cn/vant/cat.jpeg'"></van-image>
        <!--用户信息内容-->
        <div class="user-info-content">
          <h3 v-text="userInfo.userName">昵称</h3>
          <span>
            <van-icon name="edit" />
            编辑个人资料
          </span>
        </div>
      </van-cell>
      <!--账户信息-->
      <van-cell class="account-info">
        <van-grid :border="false">
          <van-grid-item>
            <span class="grid-item-val">14.05</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-val">200</span>
            <span>钱包/勾豆</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-val">1</span>
            <span>优惠卷</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-val">213</span>
            <span>学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <van-cell icon="user-o" title="分销中心" is-link value="收益200元" />
      <van-cell icon="setting-o" title="个性化设置" is-link />
      <van-cell icon="down" title="我的下载" is-link />
      <van-cell icon="question-o" title="帮助与反馈" is-link />
      <van-cell icon="info-o" title="关于拉钩教育" is-link value="v2.0.0" />
    </van-cell-group>
    <!--底部导航-->
    <common-footer-page></common-footer-page>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/user'
import CommonFooterPage from '@/components/commonFooterPage/index'
export default {
  name: 'User',
  components: {
    CommonFooterPage
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      // console.log(data)
      this.userInfo = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info .van-cell__value {
  display: flex;
}
.user-info {
  padding: 30px 20px 0 20px;
  background-color: rgb(248, 150, 3);
}
.user-info-content {
  padding-left: 15px;
  h3 {
    margin: 5px;
    font-size: 18px;
  }
}
.account-info {
  margin-top: -1px;
  background-color: rgb(248, 150, 3);
  .van-cell__value {
    border-radius: 10px;
    overflow: hidden;
    .grid-item-val {
      font-size: 22px;
      font-weight: 700;
    }
  }
}
</style>
