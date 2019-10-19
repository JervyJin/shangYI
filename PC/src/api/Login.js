import {default as request} from '@/utils/api'

export function getLogin(data) {
  return request({
    url: '/api/TokenAuth/Authenticate',
    method: 'POST',
    data,
  })
}
//重置密码
export function ResetPassword(data) {
  return request({
    url: '/api/services/app/UserInfoService/ResetPassword',
    method: 'POST',
    data,
  })
}
//发送短信
export function SendSms(data) {
  return request({
    url: '/api/services/app/SMS/Send',
    method: 'POST',
    data,
  })
}
//获取设置信息
export function GetSetting(data) {
  return request({
    url: '/api/services/app/Setting/GetSetting',
    method: 'get',
    params: data
  })
}
//获取二维码
export function QrCode(data) {
  return request({
    url: '/api/ImageCode/QrCode',
    method: 'get',
    params: data
  })
}
//获取二维码
export function GetPCQrCode(data) {
  return request({
    url: '/api/services/app/MP/GetPCQrCode',
    method: 'get',
    params: data
  })
}
