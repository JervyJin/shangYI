import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    token: state.token, // 这个就是存入localStorage的值
    WXTempKey: state.WXTempKey,
    fromRoute: state.fromRoute,
    homeData:state.homeData
  })
})
const store = new Vuex.Store({
  state: {
    token: '',
    WXTempKey: '',
    isLogin: false,
    fromRoute:'',
    homeData:''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setLogin(state, flag) {
      state.isLogin = flag
    },
    setWXTempKey (state, WXTempKey) {
      state.WXTempKey = WXTempKey
    },
    setFromRoute (state, fromRoute) {
      state.fromRoute = fromRoute
    },
    setHomeData (state, homeData) {
      state.homeData = homeData
    }
  },

  actions: {},
  plugins: [vuexLocal.plugin]
})

export default store
