import {
  default as request
} from '@/utils/api'

export function GetPCNavigation(data) {
  return request({
    url: '/api/services/app/Session/GetPCNavigation',
    method: 'get',
    params: data,
  })
}



//点星星收藏菜单
export function AddOftenMenu(data) {
  return request({
    url: '/api/services/app/OftenMenuService/AddOftenMenu',
    method: 'POST',
    data
  })
}
//点星星取消收藏
export function RemoveOftenMenu(data) {
  return request({
    url: '/api/services/app/OftenMenuService/RemoveOftenMenu',
    method: 'DELETE',
    params: data
  })
}
//获取收藏列表
export function GetOftenMenu(data) {
  return request({
    url: '/api/services/app/OftenMenuService/GetOftenMenu',
    method: 'get',
    data
  })
}