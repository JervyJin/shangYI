// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios;
import './iconfont/iconfont.css'
import './mock'
import store from '@/store/store'
import dayjs from 'dayjs'
Vue.use(dayjs);
//easyui
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';
import locale from 'vx-easyui/dist/locale/easyui-lang-zh_CN';
Vue.use(EasyUI, {locale: locale});
// 公共组件
// import ImgUpload from './components/imgUpload'
// Vue.component('imgupload', ImgUpload)
// Vue.config.productionTip = false
import {
  default as tableHeight
} from '@/utils/tableHeight.js';
Vue.prototype.resizeTable = tableHeight;

// VTree
import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式
import VTree from 'vue-tree-halower'
Vue.use(VTree)
import './static/css/common.css'
import './static/css/black.css'
Vue.prototype.globalVerb = {
  openMpOpenPlatformHost: "http://afopen.afarsoft.com"
}

/* eslint-disable no-new */
window.marg = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
