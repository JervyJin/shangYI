import {
  default as request
} from '../utils/api'
//获得枚举值和描述
export function GetEnumList(data) {
  return request({
    url: '/api/services/app/CommonService/GetEnumList',
    method: 'get',
    params: data
  })
}

//公用所属机构
export function GetListOrganization(data) {
  return request({
    url: '/api/services/app/OrganizationService/GetListOrganization',
    method: 'get',
    params: data
  })
}
//获取员工授权机构
export function GetOrgByUser(data) {
  return request({
    url: '/api/services/app/UserInfoService/GetOrgByUser',
    method: 'get',
    params: data
  })
}
//公用业态
export function FormatData(data) {
  return request({
    url: '/api/services/app/BusinessFormatService/GetListBusinessFormats',
    method: 'get',
    params: data
  })
}
//查询门店商品销售
export function GetStoreCommoditySale(data) {
  return request({
    url: '/api/services/app/StaffEndBackStoreSaleReportService/GetStoreCommoditySale',
    method: 'get',
    params: data
  })
}
//查询门店销售明细
export function GetStoreSaleDetailed(data) {
  return request({
    url: '/api/services/app/StaffEndBackStoreSaleReportService/GetStoreSaleDetailed',
    method: 'get',
    params: data
  })
}

//查询门店收银流水
export function GetStoreCashFlow(data) {
  return request({
    url: '/api/services/app/StaffEndBackStoreSaleReportService/GetStoreCashFlow',
    method: 'get',
    params: data
  })
}

//查询收银员信息
export function GetCashierInfo(data) {
  return request({
    url: '/api/services/app/StaffEndBackStoreSaleReportService/GetCashierInfo',
    method: 'get',
    params: data
  })
}


//查询客至销售收银流水（需显示明细）
export function GetSaleCashFlow(data) {
  return request({
    url: '/api/services/app/StaffEndBackStoreSaleReportService/GetSaleCashFlow',
    method: 'get',
    params: data
  })
}

//查询客至和ERP订单对账
export function GetCustomerAndERPOrderRecord(data) {
  return request({
    url: '/api/services/app/StaffEndBackStoreSaleReportService/GetCustomerAndERPOrderRecord',
    method: 'get',
    params: data
  })
}
//获取新客分析数据（全局）
export function GetNewMemberData(data) {
  return request({
    url: '/api/services/app/NewMemberService/GetNewMemberData',
    method: 'get',
    params: data
  })
}
//获取新客分析数据(导购)
export function GetNewMemberDataByUser(data) {
  return request({
    url: '/api/services/app/NewMemberService/GetNewMemberDataByUser',
    method: 'get',
    params: data
  })
}
//获取新客分析数据(门店)
export function GetNewMemberDataByOrg(data) {
  return request({
    url: '/api/services/app/NewMemberService/GetNewMemberDataByOrg',
    method: 'get',
    params: data
  })
}

//获取会员分析数据（全局）
export function GetMemberData(data) {
  return request({
    url: '/api/services/app/MemberReportService/GetMemberData',
    method: 'get',
    params: data
  })
}
//获取会员分析数据(导购)
export function MemberDataByUser(data) {
  return request({
    url: '/api/services/app/MemberReportService/GetMemberDataByUser',
    method: 'get',
    params: data
  })
}
//获取会员分析数据(门店)
export function MemberDataByOrg(data) {
  return request({
    url: '/api/services/app/MemberReportService/GetMemberDataByOrg',
    method: 'get',
    params: data
  })
}
//查询会员消费排名信息
export function GetMemberRanking(data) {
  return request({
    url: '/api/services/app/MemberRankingService/GetMemberRanking',
    method: 'get',
    params: data
  })
}
//获取会员积分分析数据（全局）
export function GetScoreData(data) {
  return request({
    url: '/api/services/app/MemberScoreReportService/GetScoreData',
    method: 'get',
    params: data
  })
}
//获取会员积分分析数据（门店）
export function GetScoreByOrgData(data) {
  return request({
    url: '/api/services/app/MemberScoreReportService/GetScoreByOrgData',
    method: 'get',
    params: data
  })
}
//获取会员积分分析数据（来源）
export function GetScoreSourceData(data) {
  return request({
    url: '/api/services/app/MemberScoreReportService/GetScoreSourceData',
    method: 'get',
    params: data
  })
}
//获取会员积分分析数据（消耗）
export function GetScoreConsumeData(data) {
  return request({
    url: '/api/services/app/MemberScoreReportService/GetScoreConsumeData',
    method: 'get',
    params: data
  })
}

//查询支付明细
export function GetPayDetails(data) {
  return request({
    url: '/api/services/app/StaffEndBackStoreSaleReportService/GetPayDetails',
    method: 'get',
    params: data
  })
}

//查询订单详情
export function GetOrderDetails(data) {
  return request({
    url: '/api/services/app/StaffEndBackStoreSaleReportService/GetOrderDetails',
    method: 'get',
    params: data
  })
}
//ERP异常流水
export function GetMemberPossessionLockOrder(data) {
  return request({
    url: '/api/services/app/MemberPossessionLockOrderService/GetMemberPossessionLockOrder',
    method: 'get',
    params: data
  })
}
export function GetMemberPossessionLockOrderGoods(data) {
  return request({
    url: '/api/services/app/MemberPossessionLockOrderService/GetMemberPossessionLockOrderGoods',
    method: 'get',
    params: data
  })
}
export function UpdateMemberPossessionLockOrder(data) {
  return request({
    url: '/api/services/app/MemberPossessionLockOrderService/UpdateMemberPossessionLockOrder',
    method: 'PUT',
    params: data,
  })
}
