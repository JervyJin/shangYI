import {
  default as request
} from '@/utils/api'

// 根据会员手机号查询会员信息
export function getMemberInfo (data) {
  return request({
    url: '/api/services/app/StaffEndMemberQueryService/GetStaffEndMemberInfo',
    method: 'Get',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
// 查询会员基本信息
export function getMemberBaseInfo (data) {
  return request({
    url: '/api/services/app/StaffEndMemberQueryService/GetStaffEndMemberDetails',
    method: 'Get',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
// 查询会员详情信息
export function GetMemberInfo (data) {
  return request({
    url: '/api/services/app/StaffEndMechanismMemberService/GetMemberInfo',
    method: 'Get',
    params: data,
  })
}
