import axios from 'axios'
import store from '@/store/store'
import router from '@/router'
import $ from "jquery";

const configBase = require('../../config');
//console.log(process.env);//0.0.0.0
console.log(configBase.dev.host);//0.0.0.0

// axios.defaults.withCredentials = true;
var host = process.env.NODE_ENV === 'development' ? 'http://hmspapi.afarsoft.com' : '/_gataway';
//var host = '/_gataway';
const service = axios.create({
  baseURL: host,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    '.AspNetCore.Culture': 'c=zh-Hans|uic=zh-Hans',
  },
})


//采用jquery easyui loading css效果   
function ajaxLoading(){   
  $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",zIndex:10,height:$(window).height()}).appendTo("body");   
  $("<div class=\"datagrid-mask-msgTwo\"><img src='/static/loading.gif' /></div>").appendTo("body").css({display:"block",position: "absolute",zIndex:10,left:($(document.body).outerWidth(true) - 80) / 2,top:($(window).height() - 45) / 2});   
}   
function ajaxLoadEnd(){   
   $(".datagrid-mask").remove();   
   $(".datagrid-mask-msgTwo").remove();               
} 
// request请求拦截器 ==> 对请求参数做处理
// 请求拦截  设置统一header
service.interceptors.request.use(config => {
    // 加载
    ajaxLoading()
    // 在发送请求之前做些什么
    let token = store.state.token
    //console.log(token);
    if (token){
      config.headers['Authorization'] = "Bearer " + token
    }
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    console.log(reg.test(configBase.dev.host));
    if(configBase && configBase.dev && configBase.dev.host && reg.test(configBase.dev.host)){
      config.headers['Abp.TenantId'] = "2"
    }
    return config
}, error => {
  return Promise.reject(error)
})

// service.interceptors.request.use(
//   // 在发送请求之前做些什么
//   function (config) {
//     let token = store.state.token
//     if (token) {
//       config.headers['Authorization'] = "Bearer " + token
//     }
//     return config
//   },
// )



//response拦截器

service.interceptors.response.use(
  response => {
    ajaxLoadEnd();
    var res = response.data;
    console.log(res)
    // if (res.Result.Code != 0 && res.Result.Code) {
    //   marg.$messager.alert({
    //     title: "提示",
    //     msg: res.Result.Message
    //   });
    //   return
    // }
    // if (response.data.code == 51001) { // 重新登录
    //   Message.error({
    //     content: response.data.msg,
    //     duration: 2
    //   })
    //   router.push({
    //     path: '/login'
    //   })
    //   return false
    // }
    //console.log(res);
    return res;
  },error => {
    ajaxLoadEnd();
    if(error.response && error.response.data && error.response.data.Error.Message){
      marg.$messager.alert({
        title: "Error",
        icon: "error",
        msg: error.response.data.Error.Message
      });
    }
    if (error && error.response && sterror.response == 401) {
        marg.$messager.alert({
          title: "Error",
          icon: "error",
          msg: "token值无效，请重新登录"
        });
        // 清除token
        store.state.token = null;
        this.$store.commit("setToken", null);

        // 页面跳转
        router.push('/login')
    }

    // marg.$messager.alert({
    //   title: "Error",
    //   icon: "error",
    //   msg: "请求出错，请稍后重试。"
    // });
    return Promise.reject(error)
  }
)

export default service
