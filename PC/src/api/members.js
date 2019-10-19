import {default as request} from '../utils/api'
//账户冻结/解冻
export function UpdateState(data) {
  return request({
    url: '/api/services/app/MemberService/UpdateState',
    method: 'PUT',
     data,
  })
}

//调整积分 
export function AddMemberScoreChange(data) {
  return request({
    url: '/api/services/app/MemberScoreService/AddMemberScoreChange',
    method: 'POST',
     data,
  })
}

//调整会员等级
export function AddMemberLevelChange(data) {
  return request({
    url: '/api/services/app/MemberLevelService/AddMemberLevelChange',
    method: 'POST',
     data,
  })
}
//套餐解冻/冻结 
export function UpdateMemberComboFreeze(data) {
  return request({
    url: '/api/services/app/MemberService/UpdateMemberComboFreeze',
    method: 'PUT',
     data,
  })
}
//

//获得会员金额
export function GetMemberAmount(data) {
  return request({
    url: '/api/services/app/MemberService/GetMemberAmount',
    method: 'GET',
    params: data,
  })
}
export function GetMyInfo(data) {
  return request({
    url: '/api/services/app/UserInfoService/GetMyInfo',
    method: 'GET',
    params: data,
  })
}
//扣减会员余额 
export function UpdateMemberAmount(data) {
  return request({
    url: '/api/services/app/MemberService/UpdateMemberAmount',
    method: 'PUT',
    data,
  })
}
//挂失/解挂实体卡 
export function UpdateMemberReportLossState(data) {
  return request({
    url: '/api/services/app/MemberService/UpdateMemberReportLossState',
    method: 'PUT',
     data,
  })
}
//套餐作废
export function RemoveCombo(data) {
  return request({
    url: '/api/services/app/ComboService/RemoveCombo',
    method: 'DELETE',
    params: data
  })
}

//套餐业务办理
export function GetMemberComboInfoById(data) {
  return request({
    url: '/api/services/app/MemberService/GetMemberComboInfoById',
    method: 'GET',
    params: data,
  })
}
//公用业态
//获得省市县列表
export function GetListAreaCity(data) {
  return request({
    url: '/api/services/app/CommonService/GetListAreaCity',
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
//获取对应机构的数据
export function GetOrgByUser(data) {
  return request({
    url: '/api/services/app/UserInfoService/GetOrgByUser',
    method: 'GET',
    params: data,
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
//会员特权（MemberFeatureService）
// 列表
export function MemberPrivilegeList(data) {
  return request({
    url: '/api/services/app/MemberFeatureService/GetMemberFeature',
    method: 'get',
    params: data
  })
  
}
//添加
export function MemberPrivilegeAdd(data) {
  return request({
    url: '/api/services/app/MemberFeatureService/AddMemberFeature',
    method: 'POST',
    data,
  })
}
//删除
export function MemberPrivilegeRemove(data) {
  return request({
    url: '/api/services/app/MemberFeatureService/DeleteMemberFeature',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function MemberPrivilegeEdit(data) {
  return request({
    url: '/api/services/app/MemberFeatureService/GetMemberFeatureById',
    method: 'get',
    params: data
  })
}
//编辑保存
export function MemberPrivilegeEditSave(data) {
  return request({
    url: '/api/services/app/MemberFeatureService/UpdateMemberFeature',
    method: 'PUT',
     data,
  })
}

//添加/编辑特权页面查询会员等级
export function MemberPrivilegeQuery(data) {
    return request({
      url: '/api/services/app/MemberFeatureService/GetLevel',
      method: 'GET',
      params: data,
    })
  }
//启用/禁用特权
export function PrivilegeUpdateState(data) {
  return request({
    url: '/api/services/app/MemberFeatureService/UpdateState',
    method: 'PUT',
    data,
  })
}

//会员成长值流水（MemberGrowthValueService）
// 列表
export function GetMemberGrowthList(data) {
  return request({
    url: '/api/services/app/MemberGrowthValueService/GetMemberGrowthValueFlow',
    method: 'get',
    params: data
  })
  
}
//会员成长值（MemberthValueService）
// 列表
export function MemberthManagementList(data) {
    return request({
      url: '/api/services/app/MemberGrowthValueService/GetMemberGrowthValue',
      method: 'get',
      params: data
    })
  }
  
//删除
export function MemberthManagementRemove(data) {
  return request({
    url: '/api/services/app/MemberGrowthValueService/DeleteMemberGrowthValue',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function MemberthManagementEdit(data) {
  return request({
    url: '/api/services/app/MemberGrowthValueService/GetMembeGrowthValueById',
    method: 'get',
    params: data,
  })
}
//编辑保存
export function MemberthManagementEditSave(data) {
  return request({
    url: '/api/services/app/MemberGrowthValueService/UpdateMemberGrowthValue',
    method: 'PUT',
     data,
  })
}
//添加
export function MemberthManagementAdd(data) {
  return request({
    url: '/api/services/app/MemberGrowthValueService/AddMemberGrowthValue',
    method: 'POST',
    data,
  })
}
//禁用/启用成长值
export function MemberthManagementType(data) {
    return request({
      url: '/api/services/app/MemberGrowthValueService/UpdateState',
      method: 'PUT',
      data,
    })
  }
//成长值变动
export function MemberthManagementChange(data) {
    return request({
      url: '/api/services/app/MemberGrowthValueService/AddMemberGrowthValueChange',
      method: 'POST',
      data,
    })
  }
//  会员标签（MemberTagService）
// 列表
export function MemberTagList(data) {
  return request({
    url: '/api/services/app/MemberTagService/GetMemberTag',
    method: 'get',
    params: data
  })
  
}
//添加
export function MemberTagAdd(data) {
  return request({
    url: '/api/services/app/MemberTagService/AddMemberTag',
    method: 'POST',
    data,
  })
}
//删除
export function MemberTagRemove(data) {
  return request({
    url: '/api/services/app/MemberTagService/DeleteMemberTag',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function MemberTagEdit(data) {
  return request({
    url: '/api/services/app/MemberTagService/GetMemberTagById',
    method: 'get',
    params: data,
  })
}
//编辑保存
export function MemberTagEditSave(data) {
  return request({
    url: '/api/services/app/MemberTagService/UpdateMemberTag',
    method: 'PUT',
     data,
  })
}


//会员信息(MemberService)
//列表 
export function MemberList(data) {
  return request({
    url: '/api/services/app/MemberService/GetMember',
    method: 'get',
    params: data
  })
  
}
//添加
export function MemberAdd(data) {
  return request({
    url: '/api/services/app/MemberService/AddMember',
    method: 'POST',
    data,
  })
}
//删除
export function MemberRemove(data) {
  return request({
    url: '/api/services/app/MemberService/DeleteMember',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function MemberEdit(data) {
  return request({
    url: '/api/services/app/MemberService/GetMemberById',
    method: 'get',
    params: data,
  })
}
//编辑保存
export function MemberEditSave(data) {
  return request({
    url: '/api/services/app/MemberService/UpdateMember',
    method: 'PUT',
     data,
  })
}
//根据会员标识查询会员纪念日
export function MemberImportantList(data) {
    return request({
      url: '/api/services/app/MemberService/GetMemberImportant',
      method: 'get',
      params: data
    })
    
  }
//根据会员标识查询会员标签
export function GetTagByMemberId(data) {
  return request({
    url: '/api/services/app/MemberService/GetTagByMemberId',
    method: 'get',
    params: data
  })
  
}
//会员等级MemberLeveMember)
//列表 
export function MemberLeveList(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetMemberLevel',
    method: 'get',
    params: data
  })
  
}
//添加
export function MemberLeveAdd(data) {
  return request({
    url: '/api/services/app/MemberLevelService/AddMemberLevel',
    method: 'POST',
    data,
  })
}
//删除
export function MemberLeveRemove(data) {
  return request({
    url: '/api/services/app/MemberLevelService/DeleteMemberLevel',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function MemberLeveEdit(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetMemberLevelById',
    method: 'get',
    params: data,
  })
}
//编辑保存
export function MemberLeveEditSave(data) {
  return request({
    url: '/api/services/app/MemberLevelService/UpdateMemberLevel',
    method: 'PUT',
     data,
  })
}
//根据会员等级标识查询券奖励
export function GetMemberLevelCouponAward(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetMemberLevelCouponAward',
    method: 'GET',
    params: data,
  })
}
//根据会员等级标识查询套餐奖励
export function GetMemberLevelComboAward(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetMemberLevelComboAward',
    method: 'GET',
    params: data,
  })
}
//添加等级时获取供选择的优惠券信息
export function MemberGetCouponAward(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetCouponAward',
    method: 'GET',
    params: data,
  })
}
//添加等级时获取供选择的套餐信息
export function MemberGetComboAward(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetComboAward',
    method: 'GET',
    params: data,
  })
}
//根据等级标识查询等级特权
export function GetMemberLevelFeature(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetMemberLevelFeature',
    method: 'GET',
    params: data,
  })
}
//根据等级标识查询关联的已有营销方案
export function GetMarketingMemberLevel(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetMarketingMemberLevel',
    method: 'GET',
    params: data,
  })
}


// 会员业务办理、

//根据会员编号/手机号查询会员信息
export function GetMemberPhone(data) {
  return request({
    url: '/api/services/app/MemberService/GetMemberInfoByCodeOrPhone',
    method: 'GET',
    params: data,
  })
}

//根据会员标识查询业务方案办理
export function GetMemberInfoById(data) {
  return request({
    url: '/api/services/app/MemberService/GetMemberComboInfoById',
    method: 'GET',
    params: data,
  })
}

//根据会员标识查询当前积分
export function GetMemberScore(data) {
  return request({
    url: '/api/services/app/MemberScoreService/GetMemberScore',
    method: 'GET',
    params: data,
  })
}

//账户冻结/解冻
export function MemberUpdateState(data) {
  return request({
    url: '/api/services/app/MemberService/UpdateState',
    method: 'PUT',
     data,
  })
}
//微信解绑
export function weChatUnBound(data) {
  return request({
    url: '/api/services/app/MemberService/WeChatUnBound',
    method: 'POST',
     data,
  })
}
//等级变更时查询会员等级

export function GetMemberLevelChg(data) {
  return request({
    url: '/api/services/app/MemberLevelService/GetMemberLevelChg',
    method: 'GET',
    params: data,
  })
}

//操作唯独
export function GetOperationDimension(data) {
  return request({
    url: '/api/services/app/MemberOperationalRecordService/GetOperationDimension',
    method: 'GET',
    params: data,
  })
}
//查询操作类型
export function GetOperationType(data) {
  return request({
    url: '/api/services/app/MemberOperationalRecordService/GetOperationType',
    method: 'GET',
    params: data,
  })
}
//查询操作记录
export function GetMemberOperationRecord(data) {
  return request({
    url: '/api/services/app/MemberOperationalRecordService/GetMemberOperationRecord',
    method: 'GET',
    params: data,
  })
}
//同步商品
export function GoodsSync(data) {
  return request({
    url: '/api/services/app/Sync/GoodsSync',
    method: 'POST',
     data,
  })
}
//同步品牌
export function BrandSync(data) {
  return request({
    url: '/api/services/app/Sync/BrandSync',
    method: 'POST',
     data,
  })
}
//同步分类
export function CatalogSync(data) {
  return request({
    url: '/api/services/app/Sync/CatalogSync',
    method: 'POST',
     data,
  })
}
//同步商户
export function MerchantSync(data) {
  return request({
    url: '/api/services/app/Sync/MerchantSync',
    method: 'POST',
     data,
  })
}
//获取同步历史
export function GetSyncHistory(data) {
  return request({
    url: '/api/services/app/Sync/GetSyncHistory',
    method: 'GET',
    params: data,
  })
}
//查询单笔消费营销列表
export function GetCostSaelMarketings(data) {
  return request({
    url: '/api/services/app/CostSaelMarketingService/GetCostSaelMarketings',
    method: 'GET',
    params: data,
  })
}
//制卡 查询卡号批次
export function GetBatch(data) {
  return request({
    url: '/api/services/app/CardInfoService/GetBatch',
    method: 'GET',
    params: data,
  })
}
//制卡 查询卡号批次详情
export function GetBatchNo(data) {
  return request({
    url: '/api/services/app/CardInfoService/GetBatchNo',
    method: 'GET',
    params: data,
  })
}
//制卡 获取卡片详情
export function GetCardDetail(data) {
  return request({
    url: '/api/services/app/CardInfoService/GetCardDetail',
    method: 'GET',
    params: data,
  })
}
//制卡 添加卡片
export function AddCard(data) {
  return request({
    url: '/api/services/app/CardInfoService/AddCard',
    method: 'POST',
    params: data,
    transformRequest:[function(){
      return JSON.stringify(data)
    }],
  })
}
//获取微信授权
export function GetWechatAuthMp() {
  return request({
    url: '/api/services/app/MP/GetAuthorizedMP',
    method: 'GET'
  })
}
//更新微信授权
export function UpdateWechatAuthMp(data) {
  return request({
    url: '/api/services/app/MP/Authorize',
    method: 'POST',
    data
  })
}
//获取短信查询列表
export function GetSmsSendRecord(data) {
  return request({
    url: '/api/services/app/SMS/GetSmsSendRecord',
    method: 'GET',
    params: data,
  })
}
//查询扫码领红包活动
export function GetHongBaoActive(data) {
  return request({
    url: '/api/services/app/HongBaoService/GetHongBaoActive',
    method: 'GET',
    params: data,
  })
}
//删除扫码领红包活动
export function DeleteHongBaoActive(data) {
  return request({
    url: '/api/services/app/HongBaoService/DeleteHongBaoActive',
    method: 'DELETE',
    params: data
  })
}
//更新扫码领红包活动
export function UpdateHongBaoActive(data) {
  return request({
    url: '/api/services/app/HongBaoService/UpdateHongBaoActive',
    method: 'PUT',
     data,
  })
}
//更新扫码领红包状态
export function HongBaoUpdateState(data) {
  return request({
    url: '/api/services/app/HongBaoService/UpdateState',
    method: 'PUT',
     data,
  })
}
//查询单个扫码领红包活动
export function GetSingleHongBao(data) {
  return request({
    url: '/api/services/app/HongBaoService/GetSingleHongBao',
    method: 'GET',
    params: data,
  })
}
//添加扫码领红包活动
export function AddHongBaoActive(data) {
  return request({
    url: '/api/services/app/HongBaoService/AddHongBaoActive',
    method: 'POST',
    data
  })
}
