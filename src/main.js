import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入lib-flexible
import 'amfe-flexible'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// import Vconosle from 'vconsole'
// // eslint-disable-next-line
// let Vconsole = new Vconosle()
// 注册vant为Vue插件
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
