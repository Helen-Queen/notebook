import Auth from '@/apis/auth'
import router from '@/router'

window.router = router
const state = {
  user: null
}

const getters = {
  // 只写user会报user没有定义
  username: state => state.user === null ? '未登录' : state.user.username,
  slug: state => state.user === null ? '未' : state.user.username.charAt(0)
}

// 修改state
const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return Auth.login({ username, password })
      .then(res => {
        commit('setUser', { user: res.data })
      })
  },

  register({ commit }, { username, password }) {
    return Auth.register({ username, password })
      .then(res => {
        commit('setUser', { user: res.data })
      })
  },
// payload传递进来得对象{ path: '/login' }
  checkLogin({ commit,state }, payload) {
    if(state != null) return Promise.resolve()
    return Auth.getInfo()
      .then(res => {
        if(!res.isLogin) {
          console.log('jump')
          router.push(payload)
        } else {
          commit('setUser', { user: res.data })
        }
      })
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}