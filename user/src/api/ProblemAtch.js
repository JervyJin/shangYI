import {
  default as request
} from '@/utils/api'

// 查询优惠券
export function GetCouponWriteOffInfo (data) {
  return request({
    url: '/api/services/app/StaffEndCouponWriteOffService/GetCouponWriteOffInfo',
    method: 'Get',
    params: data
    // transformRequest: [function () {
    //   return JSON.stringify(data)
    // }]
  })
}
// 查询优惠券
export function UpdateCouponWriteOff (data) {
  return request({
    url: '/api/services/app/StaffEndCouponWriteOffService/UpdateCouponWriteOff',
    method: 'Put',
    params: data,
    // transformRequest: [function () {
    //   return JSON.stringify(data)
    // }]
  })
}

// 查询优惠券详情
export function getCouponInfo (CardNo) {
  return request({
    url: '/api/services/app/StaffEndCouponWriteOffService/GetCouponInfo',
    method: 'GET',
    params: {
      CardNo
    }
  })
}
