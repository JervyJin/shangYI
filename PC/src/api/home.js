import {
  default as request
} from '../utils/api'

// 获取会员总数报表
export function GetMemberTotalNum() {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMemberTotalNum',
    method: 'get'
  })
}

// 获取会员销售金额（2019年）
export function GetMemberSaleAmount() {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMemberSaleAmount',
    method: 'get'
  })
}


// 获取销售金额（2019年）
export function GetSaleAmount() {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetSaleAmount',
    method: 'get'
  })
}

// 获取储值金额情况
export function GetRechargeAmount() {
  return request({
    url: '/api/services/app/HomePageService/GetRechargeAmount',
    method: 'get'
  })
}

// 获取套餐金额情况
export function GetComboAmount() {
  return request({
    url: '/api/services/app/HomePageService/GetComboAmount',
    method: 'get'
  })
}

// 获取优惠券情况
export function GetCouponAmount() {
  return request({
    url: '/api/services/app/HomePageService/GetCouponAmount',
    method: 'get'
  })
}

// 会员注册数(折线图)
export function GetMemberRegNum(params) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMemberRegNum',
    method: 'get',
    params
  })
}

// 会员充值(柱状图)
export function GetMemberRecharge(params) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMemberRecharge',
    method: 'get',
    params
  })
}

// 储值消费(柱状图)
export function GetStorageValueConsumption(params) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetStorageValueConsumption',
    method: 'get',
    params
  })
}


// 执行营销次数(折线图)
export function GetMarketingTimes(params) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMarketingTimes',
    method: 'get',
    params
  })
}

// 会员销售额占比(柱状图)(同比)
export function GetMembershipSalesPercentageYear(params) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMembershipSalesPercentageYear',
    method: 'get',
    params
  })
}

// 会员销售额占比(柱状图)(环比)
export function GetMembershipSalesPercentageTwoYear(params) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMembershipSalesPercentageTwoYear',
    method: 'get',
    params
  })
}

// 会员客单价(柱状图)(同比)
export function GetMemberPassengerUnitPriceYear(params) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMemberPassengerUnitPriceYear',
    method: 'get',
    params
  })
}


// 会员客单价(柱状图)(环比)
export function GetMemberPassengerUnitPriceTwoYear(params) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMemberPassengerUnitPriceTwoYear',
    method: 'get',
    params
  })
}

// 会员性别占比
export function GetMemberSexPercentage() {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMemberSexPercentage',
    method: 'get'
  })
}

// 到店人数 相关报表
export function GetShoppingNumber(params) {
  return request({
    url: '/api/services/app/HomePageService/GetShoppingNumber',
    method: 'get',
    params: {
      StartDate: params.StartDate,
      EndDate: params.EndDate,
      CountType: 0
    }
  })
}
// 客单价 相关报表
export function GetShoppingNumber1(params) {
  return request({
    url: '/api/services/app/HomePageService/GetShoppingNumber',
    method: 'get',
    params: {
      StartDate: params.StartDate,
      EndDate: params.EndDate,
      CountType: 1
    }
  })
}


// 优惠券发送数量 相关报表
export function GetCouponNumber(params) {
  return request({
    url: '/api/services/app/HomePageService/GetCouponNumber',
    method: 'get',
    params: {
      StartDate: params.StartDate,
      EndDate: params.EndDate,
      IsUse: false
    }
  })
}
// 优惠券使用数量 相关报表
export function GetCouponNumber1(params) {
  return request({
    url: '/api/services/app/HomePageService/GetCouponNumber',
    method: 'get',
    params: {
      StartDate: params.StartDate,
      EndDate: params.EndDate,
      IsUse: true
    }
  })
}

// 营销带动销售额 相关报表
export function GetMarketAmount(params) {
  return request({
    url: '/api/services/app/HomePageService/GetMarketAmount',
    method: 'get',
    params
  })
}

// 新会员销售额 相关报表 同比
export function GetNewMemberShopping(params) {
  return request({
    url: '/api/services/app/HomePageService/GetNewMemberShopping',
    method: 'get',
    params: {
      Year: params.Year,
      IsRingRatio: false
    }
  })
}
// 新会员销售额 相关报表 环比
export function GetNewMemberShopping1(params) {
  return request({
    url: '/api/services/app/HomePageService/GetNewMemberShopping',
    method: 'get',
    params: {
      Year: params.Year,
      IsRingRatio: true
    }
  })
}

// 新会员客单价 相关报表同比
export function GetNewMemberUnitPrice(params) {
  return request({
    url: '/api/services/app/HomePageService/GetNewMemberUnitPrice',
    method: 'get',
    params: {
      Year: params.Year,
      IsRingRatio: false
    }
  })
}
// 新会员客单价 相关报表环比
export function GetNewMemberUnitPrice1(params) {
  return request({
    url: '/api/services/app/HomePageService/GetNewMemberUnitPrice',
    method: 'get',
    params: {
      Year: params.Year,
      IsRingRatio: true
    }
  })
}

// 会员性别销售额 相关报表
export function GetMemberSexAmount() {
  return request({
    url: '/api/services/app/HomePageService/GetMemberSexAmount',
    method: 'get'
  })
}
