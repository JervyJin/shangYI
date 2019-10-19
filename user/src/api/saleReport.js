import {
  default as request
} from '@/utils/api'

// 筛选促销员人数
export function GetPromoterCountInfo (data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetPromoterCountInfo',
    method: 'Get',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
// 筛选促销员
export function GetPromoterInfo (data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetPromoterInfo',
    method: 'Get',
    params: data,
    // transformRequest: [function () {
    //   return JSON.stringify(data)
    // }]
  })
}
// 我的顾客数量
export function GetMyCustomersCount (data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyCustomersCount',
    method: 'Get',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
// 我的顾客
export function GetMyCustomers (data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyCustomers',
    method: 'Get',
    params: data,
  })
}
// 我的会员数量
export function GetMyMemberCount (data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyMemberCount',
    method: 'Get',
    params: data,
  })
}
// 我的会员
export function GetMyMember (data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyMember',
    method: 'Get',
    params: data,
  })
}
// 我的会员列表
export function GetMyMemberInfo (data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyMemberInfo',
    method: 'Get',
    params: data,
  })
}
