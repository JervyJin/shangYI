import {
  default as request
} from '@/utils/api'

/**
 * 获取注册营销
 * @param data
 */
export function getRegisterMarketingInfo() {
  return request({
    url: '/api/services/app/StaffEndMemberRegisterService/GetRegisterMarketingInfo',
    method: 'get'
  })
}

/**
 * 获取注册营销详情
 * @param id
 */
export function getRegisterAward(registerMarketingId) {
  return request({
    url: '/api/services/app/StaffEndMemberRegisterService/GetRegisterAward',
    method: 'get',
    params: {
      registerMarketingId
    }
  })
}

/**
 * 获取验证码
 * @param Phone
 */
export function sendMsg(Phone) {
  return request({
    url: '/api/services/app/SMS/Send',
    method: 'post',
    data: {
      Phone
    }
  })
}

/**
 * 保存会员信息
 * @param id
 */
export function saveMember(obj) {
  return request({
    url: '/api/services/app/StaffEndMemberRegisterService/AddMemberRegister',
    method: 'post',
    data: {
      Sex: obj.Sex,
      BirthdayType: obj.BirthdayType,
      Birthday: obj.Birthday,
      BirthdayEvery: obj.BirthdayEvery,
      Phone: obj.Phone,
      LevelId: obj.LevelId,
      ReferrerId: obj.ReferrerId,
      ReferrerName: obj.ReferrerName,
      TerminalSource: obj.TerminalSource,
      VerificationCode: obj.VerificationCode,
      MarketingId: obj.MarketingId,
      MarketingName: obj.MarketingName
    }
  })
}

/**
 * 获取会员评价
 * @param id
 */
export function getOrderEvaluate(obj) {
  return request({
    url: '/api/services/app/OrderEvaluateService/GetOrderEvaluate',
    method: 'get',
    params: {
      SearchName: obj.SearchName,
      Level: obj.Level,
      page: obj.page,
      rows: obj.rows
    }
  })
}

/**
 * 获取会员评价详情
 */
export function getOrderEvaluateDefault(OrderEvaluateId, ConsumptionOrderId) {
  return request({
    url: '/api/services/app/OrderEvaluateService/GetOrderEvaluateDefault',
    method: 'get',
    params: {
      OrderEvaluateId,
      ConsumptionOrderId
    }
  })
}

/**
 * 获取会员评价详情
 */
export function getUserComplaints(obj) {
  return request({
    url: '/api/services/app/UserComplaintService/GetUserComplaints',
    method: 'get',
    params: {
      State: obj.State,
      page: obj.page,
      rows: obj.rows,
      sort: obj.sort,
      order: obj.order
    }
  })
}

/**
 * 获取会员评价详情
 */
export function getUserInfo(id) {
  return request({
    url: '/api/services/app/UserComplaintService/GetUserComplaintDefault',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 提交处理意见
 */
export function addClyj(data) {
  return request({
    url: '/api/services/app/UserComplaintService/AddUserComplaint',
    method: 'post',
    data
  })
}

/**
 * 回复处理意见
 */
export function hyyj(data) {
  return request({
    url: '/api/services/app/UserComplaintService/UpdateUserComplaint',
    method: 'put',
    data

  })
}

/**
 * 获取会员列表
 */
export function getMembers(params) {
  return request({
    url: '/api/services/app/StaffEndMechanismMemberService/GetMechanismMember',
    method: 'get',
    params
  })
}

/**
 * 获取我的会员列表
 */
export function getMyMembers(params) {
  return request({
    url: '/api/services/app/StaffEndMechanismMemberService/GetMyMember',
    method: 'get',
    params
  })
}

/**
 * 获取会员详情
 */
export function getMemberInfo(memberId) {
  return request({
    url: '/api/services/app/StaffEndMechanismMemberService/GetMemberInfo',
    method: 'get',
    params: {
      memberId
    }
  })
}

/**
 * 获取会员基本情况
 */
export function getStaffEndMemberInfo(memberPhone) {
  return request({
    url: '/api/services/app/StaffEndMemberQueryService/GetStaffEndMemberInfo',
    method: 'get',
    params: {
      memberPhone
    }
  })
}

/**
 * 获取消费记录
 */
export function getExpendRecord(params) {
  return request({
    url: '/api/services/app/ExpendService/GetExpendRecordUser',
    method: 'get',
    params
  })
}

/**
 * 获取消费单详情
 */
export function getExpendDetailUser(id) {
  return request({
    url: '/api/services/app/ExpendService/GetExpendDetailUser',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 获取商户统计信息
 */
export function getMerchantSaleCount(params) {
  return request({
    url: '/api/services/app/StaffEndMerchantSaleReportService/GetMerchantSaleCount',
    method: 'get',
    params
  })
}

/**
 * 获取员工授权商户
 */
export function getMerchantByUser(id) {
  return request({
    url: '/api/services/app/UserInfoService/GetMerchantByUser',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 获取商户消费金额
 */
export function getMerchantSale(params) {
  return request({
    url: '/api/services/app/StaffEndMerchantSaleReportService/GetMerchantSale',
    method: 'get',
    params
  })
}

/**
 * 查询会员详情
 */
export function getStaffEndMemberDetails(memberId) {
  return request({
    url: '/api/services/app/StaffEndMemberQueryService/GetStaffEndMemberDetails',
    method: 'get',
    params: {
      memberId
    }
  })
}

/**
 * 修改会员信息
 */
export function updateStaffEndMemberDetails(data) {
  return request({
    url: '/api/services/app/StaffEndMemberQueryService/UpdateStaffEndMemberDetails',
    method: 'put',
    data
  })
}

/**
 * 查询会员标签
 */
export function getMemberTag(params) {
  return request({
    url: '/api/services/app/MemberTagService/GetMemberTag',
    method: 'get',
    params
  })
}

/**
 * 根据Id查询会员标签
 */
export function getMemberTagById(Id) {
  return request({
    url: '/api/services/app/MemberTagService/GetMemberTagById',
    method: 'get',
    params: {
      Id
    }
  })
}

export function GetTagByMemberId(Id) {
  return request({
    url: '/api/services/app/MemberService/GetTagByMemberId',
    method: 'get',
    params: {
      Id
    }
  })
}

/**
 * 添加会员标签
 */
export function addMemberTag(name) {
  return request({
    url: '/api/services/app/MemberTagService/AddMemberTag',
    method: 'post',
    data: {
      name
    }
  })
}



/**
 * 为会员添加标签
 */
export function addMemberTagMapping(data) {
  return request({
    url: '/api/services/app/StaffEndMemberQueryService/AddMemberTagMapping',
    method: 'post',
    data
  })
}

/**
 * 查询门店销售信息
 */
export function getMdCount(params) {
  return request({
    url: '/api/services/app/StaffEndStoreSaleReportService/GetStoreSaleCount',
    method: 'get',
    params
  })
}

/**
 * 获取员工授权机构
 */
export function getOrgByUser(id) {
  return request({
    url: '/api/services/app/UserInfoService/GetOrgByUser',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 查询门店销售报表
 */
export function getMdStoreSale(params) {
  return request({
    url: '/api/services/app/StaffEndStoreSaleReportService/GetStoreSale',
    method: 'get',
    params
  })
}

/**
 * 查询门店销售详情
 */
export function getStoreSaleInfo(params) {
  return request({
    url: '/api/services/app/StaffEndStoreSaleReportService/GetStoreSaleInfo',
    method: 'get',
    params
  })
}

/**
 * 获取商品信息
 */
export function getMerchantSaleInfo(params) {
  return request({
    url: '/api/services/app/StaffEndMerchantSaleReportService/GetMerchantSaleInfo',
    method: 'get',
    params
  })
}
/**
 * 获取投诉途径
 */
export function getEnumList(EnumType) {
  return request({
    url: '/api/services/app/CommonService/GetEnumList',
    method: 'get',
    params: {
      EnumType: EnumType
    }
  })
}
