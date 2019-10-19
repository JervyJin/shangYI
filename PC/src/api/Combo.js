import {
  default as request
} from '../utils/api'
//公用所属机构   套餐
export function GetListOrganization(data) {
  return request({
    url: '/api/services/app/OrganizationService/GetListOrganization',
    method: 'get',
    params: data
  })
}
//获得枚举值和描述
export function GetEnumList(data) {
  return request({
    url: '/api/services/app/CommonService/GetEnumList',
    method: 'get',
    params: data
  })
}
//业务套餐管理
// 列表
export function ComboList(data) {
  return request({
    url: 'api/services/app/ComboService/GetCombos',
    method: 'get',
    params: data
  })

}
//添加
export function ComboAdd(data) {
  return request({
    url: '/api/services/app/ComboService/AddCombo',
    method: 'POST',
    data,
  })
}
//删除
export function ComboRemove(data) {
  return request({
    url: '/api/services/app/ComboService/DeleteCombo',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function ComboEdit(data) {
  return request({
    url: '/api/services/app/ComboService/getCombo',
    method: 'get',
    params: data
  })
}
//编辑保存
export function ComboEditSave(data) {
  return request({
    url: '/api/services/app/ComboService/UpdateCombo',
    method: 'PUT',
    data,
  })
}
//停用启用套餐
export function ComboState(data) {
  return request({
    url: '/api/services/app/ComboService/UpdateComboState',
    method: 'PUT',
    data,
  })
}

//获得产品分类
export function GetGoodsCatalogss(data) {
  return request({
    url: '/api/services/app/GoodsCatalogsServie/GetGoodsCatalogss',
    method: 'get',
    params: data
  })
}
//获得产品分类-树状结构
export function GetGoodsCatalogTree(data) {
  return request({
    url: '/api/services/app/GoodsCatalogsServie/GetGoodsCatalogTree',
    method: 'get',
    params: data
  })
}
//获得产品品牌
export function GetGoodsBrands(data) {
  return request({
    url: '/api/services/app/GoodsGoodsBrandsServie/GetGoodsBrands',
    method: 'get',
    params: data
  })
}
//获得产品
export function GetGoods(data) {
  return request({
    url: '/api/services/app/GoodsGoodsServie/GetGoods',
    method: 'get',
    params: data
  })
}
//查询套餐
export function GetCombos(data) {
  return request({
    url: '/api/services/app/ComboService/GetCombos',
    method: 'get',
    params: data
  })
}
//
//查询套餐信息
export function GetMemberComboInfo(data) {
  return request({
    url: '/api/services/app/MemberCouponService/GetMemberComboInfo',
    method: 'get',
    params: data
  })
}
