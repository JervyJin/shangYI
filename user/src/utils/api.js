import axios from 'axios'
import store from '@/store/store'
import { Notify,Toast } from 'vant'
import Vue from 'vue'
import router from '../router/index'
import Store from '../store/store'

Vue.use(Notify)

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://hmspapi.afarsoft.com' : '/_gataway',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    '.AspNetCore.Culture': 'c=zh-Hans|uic=zh-Hans'
  }
})
// request请求拦截器 ==> 对请求参数做处理
service.interceptors.request.use(
  // 在发送请求之前做些什么
  function (config) {
    let token = store.state.token
    if(config.method=='get'){
      Toast({
        mask: false,
        message: '加载中...',
        position: 'bottom'
      });
    }else{
      Toast.loading({
        mask: true,
        message: '加载中...',
        position: 'middle',
        loadingType:'spinner'
      });
    }
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  }
)
// response拦截器
service.interceptors.response.use((response) => {
  Toast.clear();
  if (response.status === 200) {
    if (response.data.Result) {
      if (response.data.Result.Code && response.data.Result.Code !== 0) {
        Notify({ type: 'danger', message: response.data.Result.Message, duration: 1500 })
        return Promise.resolve(response.data)
      } else {
        return Promise.resolve(response.data.Result)
      }
    }else{
      return Promise.resolve(response.data)
    }
  } else {
    Notify({ type: 'danger', message: '请求失败,请稍后再试!!!', duration: 1500 })
    return Promise.reject(response)
  }
}, (err) => {
  Toast.clear();
  if (err.response.data.Error) {
    Notify({ type: 'danger', message: err.response.data.Error.Message, duration: 1500 })
    if(err.response.status == 401){
      console.log(router)
      Store.commit("setToken", '');
      router.push({
          path: "/login",
          query:{
            redirect:router.currentRoute.fullPath
          }
      });
    }
  } else {
    Notify({ type: 'danger', message: '请求失败!!!', duration: 1500 })
  }
  return Promise.reject(err)
})

export default service
