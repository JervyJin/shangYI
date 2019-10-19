import {
  default as request
} from '../utils/api'
//公共
//获得枚举值和描述
export function GetEnumList(data) {
  return request({
    url: '/api/services/app/CommonService/GetEnumList',
    method: 'get',
    params: data
  })
}
// 获取所有机构区域名称，编码，标识
export function GetListOrganizationArea(data) {
  return request({
    url: '/api/services/app/OrganizationAreaService/GetListOrganizationArea',
    method: 'get',
    params: data
  })
}
//获取对应机构的数据
export function GetListOrganization(data) {
  return request({
    url: '/api/services/app/OrganizationService/GetListOrganization',
    method: 'get',
    params: data
  })
}
//员工授权机构
export function GetOrgByUser(data) {
  return request({
    url: '/api/services/app/UserInfoService/GetOrgByUser',
    method: 'get',
    params: data
  })
}
//查询可供选择的优惠券
export function GetCRMCoupon(data) {
  return request({
    url: '/api/services/app/CRMIntegralConversionService/GetCRMCoupon',
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


// 优惠券分类
export function GetCouponCatalogs(data) {
  return request({
    url: '/api/services/app/CouponCatalogService/GetCouponCatalogs',
    method: 'get',
    params: data
  })
}
//添加优惠卷分类
export function AddCouponCatalog(data) {
  return request({
    url: '/api/services/app/CouponCatalogService/AddCouponCatalog',
    method: 'POST',
    data,
  })
}
//删除优惠卷分类
export function DeleteCouponCatalog(data) {
  return request({
    url: '/api/services/app/CouponCatalogService/DeleteCouponCatalog',
    method: 'DELETE',
    params: data
  })
}
//更新优惠卷分类
export function UpdateCouponCatalog(data) {
  return request({
    url: '/api/services/app/CouponCatalogService/UpdateCouponCatalog',
    method: 'PUT',
    data,
  })
}
// 优惠券列表
export function CouponList(data) {
  return request({
    url: '/api/services/app/CouponService/GetCoupons',
    method: 'get',
    params: data
  })
}
//添加
export function CouponAdd(data) {
  return request({
    url: '/api/services/app/CouponService/AddCoupon',
    method: 'POST',
    data,
  })
}
//删除
export function CouponRemove(data) {
  return request({
    url: '/api/services/app/CouponService/DeleteCoupon',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function CouponEdit(data) {
  return request({
    url: '/api/services/app/CouponService/getCoupon',
    method: 'get',
    params: data
  })
}
//编辑保存
export function CouponEditSave(data) {
  return request({
    url: '/api/services/app/CouponService/UpdateCoupon',
    method: 'PUT',
    data,
  })
}

//停用启用优惠卷
export function UpdateCouponState(data) {
  return request({
    url: '/api/services/app/CouponService/UpdateCouponState',
    method: 'PUT',
    data,
  })
}



//优惠卷分类 

export function CatalogList(data) {
  return request({
    url: '/api/services/app/CouponCatalogService/GetCouponCatalogs',
    method: 'get',
    params: data
  })

}
//添加
export function CouponCatalogAdd(data) {
  return request({
    url: '/api/services/app/CouponCatalogService/AddCouponCatalog',
    method: 'POST',
    data,
  })
}
//删除
export function CouponCatalogRemove(data) {
  return request({
    url: '/api/services/app/CouponCatalogService/DeleteCouponCatalog',
    method: 'DELETE',
    params: data
  })
}

//更新
export function CouponCatalogEdit(data) {
  return request({
    url: '/api/services/app/CouponCatalogService/UpdateCouponCatalog',
    method: 'get',
    params: data
  })
}



// 优惠券兑换管理
export function ConversionList(data) {
  return request({
    url: '/api/services/app/IntegralConversionService/GetIntegralConversion',
    method: 'get',
    params: data
  })

}
//添加
export function ConversionAdd(data) {
  return request({
    url: '/api/services/app/IntegralConversionService/AddIntegralConversion',
    method: 'POST',
    data,
  })
}
//删除
export function ConversionRemove(data) {
  return request({
    url: '/api/services/app/IntegralConversionService/DeleteIntegralConversion',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function ConversionEdit(data) {
  return request({
    url: '/api/services/app/IntegralConversionService/GetIntegralConversionById',
    method: 'get',
    params: data
  })
}
//编辑保存
export function ConversionEditSave(data) {
  return request({
    url: '/api/services/app/IntegralConversionService/UpdateIntegralConversion',
    method: 'PUT',
    data,
  })
}

// 优惠券兑换历史
export function ConversionHisList(data) {
  return request({
    url: '/api/services/app/IntegralConversionService/GetIntegralConversionHis',
    method: 'get',
    params: data
  })

}


// 充值奖励营销
export function MarketingList(data) {
  return request({
    url: '/api/services/app/MarketingMarketingService/GetMarketingMarketings',
    method: 'get',
    params: data
  })

}
//添加
export function MarketingAdd(data) {
  return request({
    url: '/api/services/app/MarketingMarketingService/AddMarketingMarketing',
    method: 'POST',
    data,
  })
}

//获得充值奖励营销详情
export function GetMarketingMarketing(data) {
  return request({
    url: '/api/services/app/MarketingMarketingService/GetMarketingMarketing',
    method: 'get',
    params: data
  })
}
//更新充值奖励营销
export function UpdateMarketingMarketing(data) {
  return request({
    url: '/api/services/app/MarketingMarketingService/UpdateMarketingMarketing',
    method: 'PUT',
    data,
  })
}

//充值档次列表
export function GetRechargeLevels(data) {
  return request({
    url: '/api/services/app/RechargeLevelService/GetRechargeLevels',
    method: 'get',
    params: data
  })
}
//
//充值档次
export function GetRechargeGrade(data) {
  return request({
    url: '/api/services/app/MemberAmountService/GetRechargeGrade',
    method: 'get',
    params: data
  })
}
//查询可供选择的会员等级
export function GetMemberLevel(data) {
  return request({
    url: '/api/services/app/IntegralConversionService/GetMemberLevel',
    method: 'get',
    params: data
  })

}
//停用启用营销方案
export function UpdateMarketingState(data) {
  return request({
    url: '/api/services/app/MarketingService/UpdateMarketingState',
    method: 'PUT',
    data,
  })
}

//注册普通营销

//列表 
export function GetMarketingsList(data) {
  return request({
    url: '/api/services/app/RegisterMarketingService/GetRegisterMarketings',
    method: 'get',
    params: data
  })

}
//添加
export function GetMarketingsAdd(data) {
  return request({
    url: '/api/services/app/RegisterMarketingService/AddRegisterMarketing',
    method: 'POST',
    data,
  })
}

//编辑
export function GetMarketingsEdit(data) {
  return request({
    url: '/api/services/app/RegisterMarketingService/GetRegisterMarketing',
    method: 'get',
    params: data,
  })
}
//编辑保存
export function GetMarketingsEditSave(data) {
  return request({
    url: '/api/services/app/RegisterMarketingService/UpdateRegisterMarketing',
    method: 'PUT',
    data,
  })
}

//分享营销
//列表 
export function ShareMarketingList(data) {
  return request({
    url: '/api/services/app/ShareMarketingService/GetShareMarketings',
    method: 'get',
    params: data
  })

}
//添加
export function ShareMarketingAdd(data) {
  return request({
    url: '/api/services/app/ShareMarketingService/AddShareMarketing',
    method: 'POST',
    data,
  })
}

//编辑
export function ShareMarketingEdit(data) {
  return request({
    url: '/api/services/app/ShareMarketingService/GetShareMarketing',
    method: 'get',
    params: data,
  })
}
//编辑保存
export function ShareMarketingEditSave(data) {
  return request({
    url: '/api/services/app/ShareMarketingService/UpdateShareMarketing',
    method: 'PUT',
    data,
  })
}

//特权营销
//列表 
export function PrivilegeMarketingList(data) {
  return request({
    url: '/api/services/app/PrivilegeMarketingService/GetPrivilegeMarketings',
    method: 'get',
    params: data
  })

}
//添加
export function PrivilegeMarketingAdd(data) {
  return request({
    url: '/api/services/app/PrivilegeMarketingService/AddPrivilegeMarketing',
    method: 'POST',
    data,
  })
}

//编辑
export function PrivilegeMarketingEdit(data) {
  return request({
    url: '/api/services/app/PrivilegeMarketingService/GetPrivilegeMarketing',
    method: 'get',
    params: data,
  })
}
//编辑保存
export function PrivilegeMarketingEditSave(data) {
  return request({
    url: '/api/services/app/PrivilegeMarketingService/UpdatePrivilegeMarketing',
    method: 'PUT',
    data,
    
  })
}
//获取会员特权
export function GetMemberFeatureMarketing(data) {
  return request({
    url: '/api/services/app/PrivilegeMarketingService/GetMemberFeatureMarketing',
    method: 'get',
    params: data,
  })
}
//纪念日营销
//列表 
export function MemoriaMarketingList(data) {
  return request({
    url: '/api/services/app/MemorialService/GetMemorialMarketings',
    method: 'get',
    params: data
  })

}
//添加
export function MemoriaMarketingAdd(data) {
  return request({
    url: '/api/services/app/MemorialService/AddMemorialMarketing',
    method: 'POST',
    data,
  })
}

//编辑
export function MemoriaMarketingEdit(data) {
  return request({
    url: '/api/services/app/MemorialService/GetMemorialMarketing',
    method: 'get',
    params: data,
    
  })
}
//编辑保存
export function MemoriaMarketingEditSave(data) {
  return request({
    url: '/api/services/app/MemorialService/UpdateMemorialMarketing',
    method: 'PUT',
    data,
    
  })
}
//拉新列表
export function GetMemberRecommendMarketings(data) {
  return request({
    url: '/api/services/app/MemberRecommendMarketingService/GetMemberRecommendMarketings',
    method: 'get',
    params: data,
  })
}
//拉新添加
export function AddMemberRecommendMarketing(data) {
  return request({
    url: '/api/services/app/MemberRecommendMarketingService/AddMemberRecommendMarketing',
    method: 'POST',
    data,
    
  })
}
//拉新详情
export function GetMemberRecommendMarketing(data) {
  return request({
    url: '/api/services/app/MemberRecommendMarketingService/GetMemberRecommendMarketing',
    method: 'get',
    params: data,
  })
}
//编辑保存
export function UpdateMemberRecommendMarketing(data) {
  return request({
    url: '/api/services/app/MemberRecommendMarketingService/UpdateMemberRecommendMarketing',
    method: 'PUT',
    data,
  })
}
//查询会员优惠券
export function GetMemberCouponInfo(data) {
  return request({
    url: '/api/services/app/MemberCouponService/GetMemberCouponInfo',
    method: 'get',
    params: data,
  })
}
//查询会员优惠券使用记录
export function GetMemberCouponUserRecord(data) {
  return request({
    url: '/api/services/app/MemberCouponService/GetMemberCouponUserRecord',
    method: 'get',
    params: data,
  })
}
//添加单笔消费营销
export function AddCostSaelMarketing(data) {
  return request({
    url: '/api/services/app/CostSaelMarketingService/AddCostSaelMarketing',
    method: 'POST',
    data,   
  })
}
//更新单笔消费营销
export function UpdateCostSaelMarketing(data) {
  return request({
    url: '/api/services/app/CostSaelMarketingService/UpdateCostSaelMarketing',
    method: 'PUT',
    data,   
  })
}
//删除会员筛选条件
export function DeleteMarketing(data) {
  return request({
    url: '/api/services/app/MarketingService/DeleteMarketing',
    method: 'DELETE',
    params: data
  })
}
//获得单笔消费营销详情
export function GetCostSaelMarketing(data) {
  return request({
    url: '/api/services/app/CostSaelMarketingService/GetCostSaelMarketing',
    method: 'get',
    params: data,
  })
}
//查询营销方案
export function GetMarketingInfo(data) {
  return request({
    url: '/api/services/app/MemberCouponService/GetMarketingInfo',
    method: 'get',
    params: data,
  })
}
//新增券使用营销
export function AddCouponUserMarketing(data) {
  return request({
    url: '/api/services/app/CouponUserMarketingService/AddCouponUserMarketing',
    method: 'POST',
    data,   
  })
}
//获取券使用营销详情
export function GetCouponUserMarketing(data) {
  return request({
    url: '/api/services/app/CouponUserMarketingService/GetCouponUserMarketing',
    method: 'get',
    params: data,
  })
}
//查询券使用营销列表
export function GetCouponUserMarketings(data) {
  return request({
    url: '/api/services/app/CouponUserMarketingService/GetCouponUserMarketings',
    method: 'get',
    params: data,
  })
}
//更新券使用营销
export function UpdateCouponUserMarketing(data) {
  return request({
    url: '/api/services/app/CouponUserMarketingService/UpdateCouponUserMarketing',
    method: 'PUT',
    data,   
  })
}