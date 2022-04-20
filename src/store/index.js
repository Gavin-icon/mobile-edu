import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.sessionStorage.getItem('user')) || null
  },
  mutations: {
    setUserInfo (state, payout) {
      // 注意user的格式是对象，不是字符串
      state.user = JSON.parse(payout)
      window.sessionStorage.setItem('user', payout)
    }
  },
  actions: {
  },
  modules: {
  }
})
