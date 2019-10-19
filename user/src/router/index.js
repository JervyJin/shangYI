import Vue from 'vue'
import store from '../store/store'
import Router from 'vue-router'
import { getQueryString } from '../utils/index'
import {default as request} from '@/utils/api'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '', redirect: '/login' },
    {
      path: '/index',
      meta: {
        title: '首页'
      },
      component: resolve => require(['../components/index.vue'], resolve)
    },
    {
      path: '/Registered',
      name: 'Registered',
      meta: {
        title: '会员注册'
      },
      component: resolve => require(['../components/Registered.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登陆'
      },
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/MyCard/:id',
      meta: {
        title: '我的'
      },
      component: resolve => require(['../components/views/MyCard.vue'], resolve)
    },
    {
      path: '/ChangePassword',
      meta: {
        title: '修改密码'
      },
      component: resolve => require(['../components/views/ChangePassword.vue'], resolve)
    },
    {
      path: '/MemberQuery',
      meta: {
        title: '会员查询'
      },
      component: resolve => require(['../components/views/MemberQuery.vue'], resolve)
    },
    {
      path: '/MemberDetails/:id',
      name: 'MemberDetails',
      meta: {
        title: '会员详情'
      },
      component: resolve => require(['../components/views/MemberDetails.vue'], resolve)
    },
    {
      path: '/StoresDetails/:id',
      meta: {
        title: '机构消费详情'
      },
      component: resolve => require(['../components/views/StoresDetails.vue'], resolve)
    },
    {
      path: '/ConsumptionDetails/:id',
      meta: {
        title: '消费详情'
      },
      component: resolve => require(['../components/views/ConsumptionDetails.vue'], resolve)
    },
    {
      path: '/StickTag/:id',
      meta: {
        title: '贴标签'
      },
      component: resolve => require(['../components/views/StickTag.vue'], resolve)
    },
    {
      path: '/NewMember',
      meta: {
        title: '拉新转化',
        keepAlive:true
      },
      component: resolve => require(['../components/views/NewMember.vue'], resolve)
    },
    {
      name: 'NewMenberList',
      path: '/NewMenberList/:StartDate/:EndDate/:num/:pageData',
      meta: {
        title: '拉新转化列表'
      },
      component: resolve => require(['../components/views/NewMenberList.vue'], resolve)
    },
    {
      name: 'AgencyMembers',
      path: '/AgencyMembers',
      meta: {
        title: '机构会员'
      },
      component: resolve => require(['../components/views/AgencyMembers.vue'], resolve)
    },
    {
      path: '/MyMember',
      meta: {
        title: '我的会员'
      },
      component: resolve => require(['../components/views/MyMember.vue'], resolve)
    },
    {
      path: '/ScreeningGroup',
      meta: {
        title: '筛选客群'
      },
      component: resolve => require(['../components/views/ScreeningGroup.vue'], resolve)
    },
    {
      path: '/TagQuery',
      meta: {
        title: '会员标签查询'
      },
      component: resolve => require(['../components/views/TagQuery.vue'], resolve)
    },
    {
      path: '/TagManagement',
      meta: {
        title: '会员标签管理'
      },
      component: resolve => require(['../components/views/TagManagement.vue'], resolve)
    },
    {
      path: '/MemberSale',
      meta: {
        title: '会员销售'
      },
      component: resolve => require(['../components/views/MemberSale.vue'], resolve)
    },
    {
      path: '/MemberSaleDetails',
      meta: {
        title: '会员销售详情'
      },
      component: resolve => require(['../components/views/MemberSaleDetails.vue'], resolve)
    },
    {
      path: '/MerchantsSale',
      meta: {
        title: '商户销售'
      },
      component: resolve => require(['../components/views/MerchantsSale.vue'], resolve)
    },
    {
      path: '/MerchantsSaleDetails',
      meta: {
        title: '商户销售详情'
      },
      component: resolve => require(['../components/views/MerchantsSaleDetails.vue'], resolve)
    },
    {
      path: '/StoresSale',
      meta: {
        title: '门店销售'
      },
      component: resolve => require(['../components/views/StoresSale.vue'], resolve)
    },
    {
      path: '/StoresSaleDetails/:id/:name/:money',
      meta: {
        title: '门店销售详情'
      },
      component: resolve => require(['../components/views/StoresSaleDetails.vue'], resolve)
    },
    {
      path: '/Complain',
      meta: {
        title: '客诉管理'
      },
      component: resolve => require(['../components/views/Complain.vue'], resolve)
    },
    {
      path: '/ComplainAdd',
      meta: {
        title: '新增客诉'
      },
      component: resolve => require(['../components/views/ComplainAdd.vue'], resolve)
    },
    {
      path: '/ComplainDetails/:id',
      meta: {
        title: '客诉详情'
      },
      component: resolve => require(['../components/views/ComplainDetails.vue'], resolve)
    },
    {
      path: '/MemberEvaluation',
      meta: {
        title: '会员评价'
      },
      component: resolve => require(['../components/views/MemberEvaluation.vue'], resolve)
    },
    {
      path: '/MemberEvaluaDetails',
      meta: {
        title: '会员评价详情'
      },
      component: resolve => require(['../components/views/MemberEvaluaDetails.vue'], resolve)
    },
    {
      path: '/BestMember',
      meta: {
        title: '最佳会员'
      },
      component: resolve => require(['../components/views/BestMember.vue'], resolve)
    },
    {
      path: '/ProblemAtch',
      meta: {
        title: '券核销'
      },
      component: resolve => require(['../components/views/ProblemAtch.vue'], resolve)
    },
    {
      path: '/memberInfo/:id',
      meta: {
        title: '基本情况'
      },
      component: resolve => require(['../components/views/MemberInfo.vue'], resolve)
    },
    {
      path: '/agreement',
      meta: {
        title: '会员协议'
      },
      component: resolve => require(['../components/Agreement.vue'], resolve)
    },
    {
      path: '/pclogin',
      meta: {
        title: 'pc登录'
      },
      component: resolve => require(['../components/views/pclogin.vue'], resolve)
    }
  ]
})
/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  const whiteList = ['login', 'Registered']
  const wx = navigator.userAgent.toLowerCase().indexOf('micromessenger')
  if (to.matched.length > 0) {
    if (wx === -1) {
      if (store.state.token) {
        if (to.name === 'login') {
          next({ path: '/index' })
        } else {
          next()
        }
      } else {
        if (whiteList.includes(to.name)) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    } else {
      if (store.state.token) {
        if (to.name === 'login') {
          next({ path: '/index' })
        } else {
          next()
        }
      } else {
        if (to.query.code && to.query.refer=="afopen") {
          request({
            url: '/api/TokenAuth/AuthenticateForWechat',
            method: 'post',
            data: {
              AppId: to.query.appid,
              WechatCode: to.query.code
            }
          }).then(res => {

            if (true) {
              if (res.AccessToken) {
                store.commit('setToken', res.AccessToken);
                if (to.name === 'login') next({ path: '/index' })
                else next()
              } else {
                store.commit('setWXTempKey', res.WXTempKey)
                if (to.name === 'login') {
                  next()
                } else {
                  next({ path: '/login' })
                }
              }
            } else {
              if (to.name === 'login') {
                next()
              } else {
                next({ path: '/login' })
              }
            }
          })
        } else {
          if (!whiteList.includes(to.name)) {
            next()
            return
          } 
          request({
            url: '/api/services/app/Setting/GetSetting',
            method: 'get'
          }).then(res => {
            if (res.Data && res.Data.BindMpAppId && res.Data.MicroOpenPlatformAppId) {
              var url=encodeURIComponent(res.Data.MicroOpenPlatformHost+"/mp/OAuthRedirectCallBack?return_url="+encodeURIComponent(window.location.protocol+"//"+window.location.host));
              window.location.href =
                'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.Data.BindMpAppId +
                '&redirect_uri='+url +
                '&response_type=code&scope=snsapi_userinfo&state=1&' +
                'component_appid=' + res.Data.MicroOpenPlatformAppId +
                '#wechat_redirect'
            } else {
              if (to.name === 'login') {
                next()
              } else {
                next({ path: '/login' })
              }
            }
          })
        }
      }
    }
  } else {
    if (!store.state.token) next({ path: '/login' })
    else next({ path: '/index' })
  }
})

// 给所有路由加上当页面加载的时候滚动条置顶
router.afterEach((to, from, next) => {
  store.commit("setFromRoute", from.path);
  window.scrollTo(0, 0)
})
export default router
