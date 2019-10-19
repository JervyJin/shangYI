// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
import './iconfont/iconfont.css'
import './utils/rem'
import './assets/css/common.css'
import router from './router'
import axios from 'axios'
import 'amfe-flexible/index.js'
import store from './store/store'

Vue.use(Vant)
Vue.prototype.$http = axios
Vue.config.productionTip = false
window.globalVerb={};
/* eslint-disable no-new */
// eslint-disable-next-line
/* eslint-disable */

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
