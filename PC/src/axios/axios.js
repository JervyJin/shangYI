import axios from 'axios'
//import Messager  from 'vx-easyui'
import store from '../store/store'
import vue from 'vue';
import { getToken } from '../utils/auth'


// 创建axios实例
const service = axios.create({
  baseURL:"http://192.168.0.253:8087", // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      vue.$Message.error({
        message: res.Message,
        duration: 5 * 1000,
        closable: true
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    vue.$Message.error({
      message: res.Message,
      duration: 5 * 1000,
      closable: true
    });
    return Promise.reject(error)
  }
)

export default service
