<template>
  <div class="login">
    <!--导航栏-->
    <van-nav-bar title="登录"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <!--表单-->
    <van-form @submit="onSubmit">
      <van-field v-model="phone"
                 name="phone"
                 label="手机号"
                 placeholder="请输入手机号"
                 :rules="[
                 { required: true, message: '请填写手机号' },
                 { validator: phoneCheck, message: '格式错误' }
                 ]" />
      <van-field v-model="password"
                 type="password"
                 name="password"
                 label="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' },
                 { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '格式错误' }]" />
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    :loading="isLoading"
                    native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/services/user'
import Store from '@/store'
export default {
  name: 'Login',
  data () {
    return {
      phone: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    // 回退
    onClickLeft () {
      this.$router.go(-1)
    },
    // 登录
    onSubmit (values) {
      // 启动登录状态
      this.isLoading = true
      // console.log('submit', values)
      this.$toast.loading('验证中...')
      setTimeout(async () => {
        try {
          const { data } = await login(values)
          if (data.state === 1) {
            this.$toast.clear()
            console.log('登录成功', data)
            // 存储token
            Store.commit('setUserInfo', data.content)
            // 跳转
            this.$router.push({ path: this.$route.query.redirect || '/' })
            // 登录成功状态
            this.$toast.success('登录成功')
          } else {
            this.$toast.clear()
            this.$toast.fail('登录失败')
          }
        } catch (err) {
          // 提示登录失败
          this.$toast.fail('登录失败')
        } finally {
          // 停止登录状态
          this.isLoading = false
        }
      }, 200)
    },
    // 手机号验证
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
