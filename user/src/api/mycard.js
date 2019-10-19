import {
  default as request
} from '@/utils/api'

// 获取我的名片信息
export function MyCardInfo (data) {
  return request({
    url: '/api/services/app/StaffEndMyBusinessCardService/GetStaffEndMyBusinessCard',
    method: 'Get',
    params: data
  })
}

// 机构名称（离我最近的）
export function getOrganizationName () {
  return request({
    url: '/api/services/app/StaffEndMyBusinessCardService/GetOrganizationName',
    method: 'GET'
  })
}
