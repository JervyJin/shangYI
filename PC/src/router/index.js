import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Layout from '@/views/layout/Layout'
import Login from '@/views/Login/login'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: resolve => require(['../views/Login/login.vue'], resolve)
    },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/home',
      name: 'home',
      component: Layout,
      redirect: 'home',
      children: [{
          path: '/home',
          component: resolve => require(['../views/home.vue'], resolve),
          meta: {
            title: '首页',
            isLogin: true,
          }
        },
        //会员
        {
          path: '/members',
          name:"members",
          component: resolve => require(['../views/members/index.vue'], resolve),
          meta: {
            title: '菜单',
            isLogin: true,
            keepAlive: false
          }
        },

        {
          path: '/MemberBusiness',
          name:"MemberBusiness",
          component: resolve => require(['../views/members/MembersBusiness.vue'], resolve),
          meta: {
            title: '会员业务办理',
            isLogin: true,
            keepAlive: true
          }
        },
        {
          path: '/MemberPortrait',
          name:"MemberPortrait",
          component: resolve => require(['../views/members/MemberPortrait.vue'], resolve),
          meta: {
            title: '会员画像',
            isLogin: true,
          }
        },
        {
          path: '/MsgSendRecord',
          name:"MsgSendRecord",
          component: resolve => require(['../views/members/MsgSendRecord.vue'], resolve),
          meta: {
            title: '短信发送记录',
            isLogin: true,
          }
        },
        {
          path: '/MemberOperationRecords',
          name:"MemberOperationRecords",
          component: resolve => require(['../views/members/MemberOperationRecords.vue'], resolve),
          meta: {
            title: '会员操作记录',
            isLogin: true,
          }
        },
        {
          path: '/MemberGrowthValue',
          name:"MemberGrowthValue",
          component: resolve => require(['../views/members/MemberGrowthValue.vue'], resolve),
          meta: {
            title: '会员成长值流水',
            isLogin: true,
          }
        },
        {
          path: '/AccountRecords',
          name: 'AccountRecords',
          component: resolve => require(['../views/members/AccountRecords.vue'], resolve),
          meta: {
            title: '会员账户操作记录',
            isLogin: true,
          }
        },
        {
          path: '/MemberDataQuery',
          name:"MemberDataQuery",
          component: resolve => require(['../views/members/MemberDataQuery.vue'], resolve),
          meta: {
            title: '会员资料查询',
            isLogin: true,
          }
        },
        {
          path: '/MemberGrowth',
          name:"MemberGrowth",
          component: resolve => require(['../views/members/MemberGrowth.vue'], resolve),
          meta: {
            title: '会员成长值管理',
            isLogin: true,
          }
        },
        { 
          path: '/MemberTag',
          name:"MemberTag",
          component: resolve => require(['../views/members/MemberTag.vue'], resolve),
          meta: {
            title: '会员标签',
            isLogin: true,
          }
        },
        {
          path: '/MemberLevel',
          name:"MemberLevel",
          component: resolve => require(['../views/members/MemberLevel.vue'], resolve),
          meta: {
            title: '会员等级',
            isLogin: true,
          }
        },
        {
          path: '/MemberPrivilege',
          name:"MemberPrivilege",
          component: resolve => require(['../views/members/MemberPrivilege.vue'], resolve),
          meta: {
            title: '会员特权',
            isLogin: true,
          }
        },
        //基础
        {
          path: '/basicData',
          name:"basicData",
          component: resolve => require(['../views/members/index.vue'], resolve),
          meta: {
            title: '基础菜单',
            isLogin: true,
          }
        },
        {
          path: '/Synchronous',
          name:"Synchronous",
          component: resolve => require(['../views/members/Synchronous.vue'], resolve),
          meta: {
            title: '商品同步',
            isLogin: true,
          }
        },
        {
          path: '/wxTemplateMsg',
          name:"wxTemplateMsg",
          component: resolve => require(['../views/members/wxTemplateMsg.vue'], resolve),
          meta: {
            title: '微信模板消息',
            isLogin: true,
          }
        },
        {
          path: '/smsTemplateMsg',
          name:"smsTemplateMsg",
          component: resolve => require(['../views/members/smsTemplateMsg.vue'], resolve),
          meta: {
            title: '短信模板消息',
            isLogin: true,
          }
        },
        {
          path: '/baseSet',
          component: resolve => require(['../components/baseSet.vue'], resolve),
          meta: {
            title: '基础设置',
            isLogin: true,
          }
        },
         {
          path: '/MakeCardManagement',
          component: resolve => require(['../views/members/MakeCardManagement.vue'], resolve),
          meta: {
            title: '制卡管理',
            isLogin: true,
          }
        }, 
        // 
        {
          path: '/MakeCardDetail',
          component: resolve => require(['../views/members/MakeCardDetail.vue'], resolve),
          meta: {
            title: '制卡详情',
            isLogin: true,
          }
        }, 
        {
          path: '/WeChatSynchronization',
          component: resolve => require(['../views/members/WeChatSynchronization.vue'], resolve),
          meta: {
            title: '微信授权',
            isLogin: true,
          }
        },
        {
          path: '/basicDataManagement',
          component: resolve => require(['../views/basicData/basicDataManagement.vue'], resolve),
          meta: {
            title: '资料方案',
            isLogin: true,
          }
        },
        {
          path: '/terminalManagement',
          component: resolve => require(['../views/basicData/terminalManagement.vue'], resolve),
          meta: {
            title: '终端管理',
            isLogin: true,
          }
        },
        {
          path: '/formatsManagement',
          component: resolve => require(['../views/basicData/formatsManagement.vue'], resolve),
          meta: {
            title: '业态管理',
            isLogin: true,
          }
        },
        {
          path: '/roleManagement',
          component: resolve => require(['../views/basicData/roleManagement.vue'], resolve),
          meta: {
            title: '角色管理',
            isLogin: true,
          }
        },
        {
          path: '/staffManagement',
          component: resolve => require(['../views/basicData/staffManagement.vue'], resolve),
          meta: {
            title: '员工管理',
            isLogin: true,
          }
        },
        {
          path: '/staffGroup',
          component: resolve => require(['../views/basicData/staffGroup.vue'], resolve),
          meta: {
            title: '员工分组',
            isLogin: true,
          }
        },
        {
          path: '/agencyArea',
          component: resolve => require(['../views/basicData/agencyArea.vue'], resolve),
          meta: {
            title: '机构区域',
            isLogin: true,
          }
        },
        {
          path: '/institutionsManagement',
          component: resolve => require(['../views/basicData/institutionsManagement.vue'], resolve),
          meta: {
            title: '机构管理',
            isLogin: true,
          }
        },
        //营销
        {
          path: '/basicData',
          component: resolve => require(['../views/members/index.vue'], resolve),
          meta: {
            title: '营销中心',
            isLogin: true,
          }
        },

        {
          path: '/MarketCoupons',
          component: resolve => require(['../views/Market/MarketCoupons.vue'], resolve),
          meta: {
            title: '优惠券',
            isLogin: true,
          }
        },
        {
          path: '/MarketCouponsExchangeManagement',
          component: resolve => require(['../views/Market/MarketCouponsExchangeManagement.vue'], resolve),
          meta: {
            title: '积分兑换优惠券',
            isLogin: true,
          }
        },
        {
          path: '/MarketCouponsExchangeHistory',
          component: resolve => require(['../views/Market/MarketCouponsExchangeHistory.vue'], resolve),
          meta: {
            title: '积分兑换优惠券',
            isLogin: true,
          }
        },
        {
          path: '/MarketScreening',
          component: resolve => require(['../views/Market/MarketScreening.vue'], resolve),
          meta: {
            title: '筛选条件管理',
            isLogin: true,
          }
        },
        {
          path: '/MarketArchUse',
          component: resolve => require(['../views/Market/MarketArchUse.vue'], resolve),
          meta: {
            title: '券使用营销',
            isLogin: true,
          }
        },
        {
          path: '/MarketAccurate',
          component: resolve => require(['../views/Market/MarketAccurate.vue'], resolve),
          meta: {
            title: '精准营销方案',
            isLogin: true,
          }
        },
        {
          path: '/MarketCustomers',
          component: resolve => require(['../views/Market/MarketCustomers.vue'], resolve),
          meta: {
            title: '精准客群筛选',
            isLogin: true,
          }
        },
        {
          path: '/MarketOrdinary',
          component: resolve => require(['../views/Market/MarketOrdinary.vue'], resolve),
          meta: {
            title: '普通营销',
            isLogin: true,
          }
        },
        {
          path: '/MarketAllChannels',
          component: resolve => require(['../views/Market/MarketAllChannels.vue'], resolve),
          meta: {
            title: '全渠道营销管理',
            isLogin: true,
          }
        },
        {
          path: '/MarketMembersNew',
          component: resolve => require(['../views/Market/MarketMembersNew.vue'], resolve),
          meta: {
            title: '会员拉新营销',
            isLogin: true,
          }
        },
        {
          path: '/scanCodeRedPacket',
          component: resolve => require(['../views/members/scanCodeRedPacket.vue'], resolve),
          meta: {
            title: '扫码领红包',
            isLogin: true,
          }
        },
        {
          path: '/MarketVouchers',
          component: resolve => require(['../views/Market/MarketVouchers.vue'], resolve),
          meta: {
            title: '券使用营销',
            isLogin: true,
          }
        },
        {
          path: '/MarketRecharge',
          component: resolve => require(['../views/Market/MarketRecharge.vue'], resolve),
          meta: {
            title: '充值奖励营销',
            isLogin: true,
          }
        },
        {
          path: '/MarketSingle',
          component: resolve => require(['../views/Market/MarketSingle.vue'], resolve),
          meta: {
            title: '单笔销售奖励',
            isLogin: true,
          }
        },
        {
          path: '/MaReceivePacket',
          component: resolve => require(['../views/Market/MaReceivePacket.vue'], resolve),
          meta: {
            title: '扫码领红包',
            isLogin: true,
          }
        },
        {
          path: '/MarketArchUseQuery',
          component: resolve => require(['../views/Market/MarketArchUseQuery.vue'], resolve),
          meta: {
            title: '券使用查询',
            isLogin: true,
          }
        },
        {
          path: '/MarketArchInfoQuery',
          name:"MarketArchInfoQuery",
          component: resolve => require(['../views/Market/MarketArchInfoQuery.vue'], resolve),
          meta: {
            title: '券信息查询',
            isLogin: true,
          }
        },
        //套餐
        {
          path: '/basicData',
          component: resolve => require(['../views/members/index.vue'], resolve),
          meta: {
            title: '套餐中心',
            isLogin: true,
          }
        },
        {
          path: '/ComboManagement',
          component: resolve => require(['../views/Combo/ComboManagement.vue'], resolve),
          meta: {
            title: '套餐管理',
            isLogin: true,
          }
        },
        {
          path: '/ComboInfoQuery',
          component: resolve => require(['../views/Combo/ComboInfoQuery.vue'], resolve),
          meta: {
            title: '套餐信息查询',
            isLogin: true,
          }
        },
        //报表
        {
          path: '/ReportNewStatistics',
          component: resolve => require(['../views/Report/ReportNewStatistics.vue'], resolve),
          meta: {
            title: '新客统计',
            isLogin: true,
          }
        },

        {
          path: '/ReportMemberAnalysis',
          component: resolve => require(['../views/Report/ReportMemberAnalysis.vue'], resolve),
          meta: {
            title: '会员分析',
            isLogin: true,
          }
        },
        {
          path: '/ReportConsumptionRanking',
          component: resolve => require(['../views/Report/ReportConsumptionRanking.vue'], resolve),
          meta: {
            title: '会员消费排名',
            isLogin: true,
          }
        },
        {
          path: '/ReportIntegralAnalysis',
          component: resolve => require(['../views/Report/ReportIntegralAnalysis.vue'], resolve),
          meta: {
            title: '积分分析',
            isLogin: true,
          }
        },
        //门店
        {
          path: '/StoresSales',
          name:'StoresSales',
          component: resolve => require(['../views/Stores/StoresSales.vue'], resolve),
          meta: {
            title: '商品销售',
            isLogin: true,
            keepAlive: false
          }
        },
        {
          path: '/StoresSalesDetail',
          name:'StoresSalesDetail',
          component: resolve => require(['../views/Stores/StoresSalesDetail.vue'], resolve),
          meta: {
            title: '销售明细',
            isLogin: true,
          }
        },
        {
          path: '/StoresInstitutionsCashier',
          name:'StoresInstitutionsCashier',
          component: resolve => require(['../views/Stores/StoresInstitutionsCashier.vue'], resolve),
          meta: {
            title: '机构收银流水',
            isLogin: true,
          }
        },
        {
          path: '/StoresSalesCashier',
          component: resolve => require(['../views/Stores/StoresSalesCashier.vue'], resolve),
          meta: {
            title: 'CRM销售收银流水',
            isLogin: true,
          }
        },
        {
          path: '/StoresReconciliation',
          component: resolve => require(['../views/Stores/StoresReconciliation.vue'], resolve),
          meta: {
            title: 'CRM&ERP订单对账',
            isLogin: true,
          }
        },
        {
          path: '/StoresReconERPabnormal',
          component: resolve => require(['../views/Stores/StoresReconERPabnormal.vue'], resolve),
          meta: {
            title: 'ERP异常流水',
            isLogin: true,
          }
        },
      ]
    },
  ]
})
// 添加路由守卫
router.beforeEach((to, from, next) => {
  //路由器判断是否token可使用
  const isLogin = store.state.token ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

// 给所有路由加上当页面加载的时候滚动条置顶
router.afterEach((to, from, next) => {
  store.commit("setFromRoute", from.path);
  window.scrollTo(0, 0);
})
export default router