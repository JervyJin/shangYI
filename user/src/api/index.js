import {
  default as request
} from '@/utils/api'
// 获取会员中心我的信息
export function MyInfo (data) {
  return request({
    url: '/api/services/app/UserInfoService/GetMyInfo',
    method: 'GET',
    params: data
  })
}

// 获取最佳会员（消费金额）
export function MemberTotalExpend (data) {
  return request({
    url: '/api/services/app/UserInfoService/GetMemberTotalExpend',
    method: 'GET',
    params: data
  })
}
// 获取最佳会员（充值金额）
export function MemberTotalRecharge (data) {
  return request({
    url: '/api/services/app/UserInfoService/GetMemberTotalRecharge',
    method: 'GET',
    params: data
  })
}
// 客诉
export function Complaint (data) {
  return request({
    url: '/api/services/app/UserComplaintService/GetUserComplaints',
    method: 'GET',
    params: data
  })
}
// 新增客诉  
export function ComplaintAdd (data) {
  return request({
    url: '/api/services/app/UserComplaintService/AddUserComplaint',
    method: 'POST',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
// 会员评价
export function MemberEvaluation (data) {
  return request({
    url: '/api/services/app/OrderEvaluateService/GetOrderEvaluate',
    method: 'GET',
    params: data
  })
}
export function GetTagByMemberId (data){
  return request({
    url: '/api/services/app/MemberService/GetTagByMemberId',
    method: 'GET',
    params: data
  })
}
// 贴标签  （已选/编辑）
export function MemberTagEdit (data) {
  return request({
    url: '/api/services/app/MemberTagService/GetMemberTagById',
    method: 'GET',
    params: data
  })
}
// 贴标签  （未选）
export function MemberTagChange (data) {
  return request({
    url: '/api/services/app/MemberTagService/GetMemberTag',
    method: 'GET',
    params: data
  })
}
// 贴标签  （添加）
export function MemberTagAdd (data) {
  return request({
    url: '/api/services/app/MemberTagService/AddMemberTag',
    method: 'POST',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
// 贴标签  （删除）
export function MemberTagRemove (data) {
  return request({
    url: '/api/services/app/MemberTagService/DeleteMemberTag',
    method: 'DELETE',
    params: data
  })
}
// 贴标签  （编辑保存）
export function MemberTagEditSave (data) {
  return request({
    url: '/api/services/app/MemberTagService/UpdateMemberTag',
    method: 'PUT',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
// 门店销售（信息）
export function StoreSaleCount(data) {
  return request({
    url: '/api/services/app/StaffEndStoreSaleReportService/GetStoreSaleCount',
    method: 'GET',
    params: data
  })
}
// 门店销售（列表）
export function StoreSale(data) {
  return request({
    url: '/api/services/app/StaffEndStoreSaleReportService/GetStoreSale',
    method: 'GET',
    params: data
  })
}
// 门店销售（列表详情）
export function StoreSaleInfo(data) {
  return request({
    url: '/api/services/app/StaffEndStoreSaleReportService/GetStoreSaleInfo',
    method: 'GET',
    params: data
  })
}
// 会员销售（信息）
export function PromoterCountInfo(data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetPromoterCountInfo',
    method: 'GET',
    params: data
  })
}
// 会员销售（列表）
export function PromoterInfo(data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetPromoterInfo',
    method: 'GET',
    params: data
  })
}
// 会员销售（列表详情-我的会员）
export function MyMemberCount(data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyMemberCount',
    method: 'GET',
    params: data
  })
}
// 会员销售（列表详情-我的会员列表）
export function MyMemberList(data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyMember',
    method: 'GET',
    params: data
  })
}
// 会员销售（列表详情-我的顾客）
export function MyCustomersCount(data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyCustomersCount',
    method: 'GET',
    params: data
  })
}
// 会员销售（列表详情-我的顾客列表）
export function MyCustomers(data) {
  return request({
    url: '/api/services/app/StaffEndMemberSaleReportService/GetMyCustomers',
    method: 'GET',
    params: data
  })
}
//商户销售（信息）
export function MerchantSaleCount(data) {
  return request({
    url: '/api/services/app/StaffEndMerchantSaleReportService/GetMerchantSaleCount',
    method: 'GET',
    params: data
  })
}
//商户销售（列表）
export function MerchantSale(data) {
  return request({
    url: '/api/services/app/StaffEndMerchantSaleReportService/GetMerchantSale',
    method: 'GET',
    params: data
  })
}
//商户销售（列表详情-列表）
export function MerchantSaleInfo(data) {
  return request({
    url: '/api/services/app/StaffEndMerchantSaleReportService/GetMerchantSaleInfo',
    method: 'GET',
    params: data
  })
}
//筛选客群（消费）
export function MemberNum(data) {
  return request({
    url: '/api/services/app/StaffEndScreenCustomerGroupService/GetMemberNum',
    method: 'GET',
    params: data
  })
}
//筛选客群（其他）
export function MemberNumOther(data) {
  return request({
    url: '/api/services/app/StaffEndScreenCustomerGroupService/GetMemberNumOther',
    method: 'GET',
    params: data
  })
}
//机构会员（列表）
export function MechanismMember(data) {
  return request({
    url: '/api/services/app/MechanismMemberService/GetMechanismMember',
    method: 'GET',
    params: data
  })
}
//机构会员（我的）
export function MyMember(data) {
  return request({
    url: '/api/services/app/MechanismMemberService/GetMyMember',
    method: 'GET',
    params: data
  })
}
//机构会员（会员详情）
export function MemberInfo(data) {
  return request({
    url: '/api/services/app/MechanismMemberService/GetMemberInfo',
    method: 'GET',
    params: data
  })
}
//新客转化（新注册客户）
export function NewMemberRecruit(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetNewCustomerRecruitCount',
    method: 'GET',
    params: data
  })
}
//新客转化（详情）
export function NewMemberRecruitInfo(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetNewCustomerRecruit',
    method: 'GET',
    params: data
  })
}
//新客转化（新注册并消费的客户）
export function NewMember(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetNewCustomerRecruitAndConsumeCount',
    method: 'GET',
    params: data
  })
}
//新客转化（详情）
export function NewMemberInfo(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetNewCustomerRecruitAndConsume',
    method: 'GET',
    params: data
  })
}
//新客转化（首次消费会员总会员数）
export function FirstConsumeCount(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetFirstConsumeCount',
    method: 'GET',
    params: data
  })
}
//新客转化（详情）
export function FirstConsume(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetFirstConsume',
    method: 'GET',
    params: data
  })
}
//新客转化（查询充值金额总金额）
export function RechargeAmountTotal(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetRechargeAmountTotal',
    method: 'GET',
    params: data
  })
}
//新客转化（详情）
export function RechargeAmount(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetRechargeAmount',
    method: 'GET',
    params: data
  })
}
//新客转化（消费会员总会员数）
export function ConsumeCount(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetConsumeCount',
    method: 'GET',
    params: data
  })
}
//新客转化（详情）
export function Consume(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetConsume',
    method: 'GET',
    params: data
  })
}
//新客转化（查询销售金额总金额）
export function ConsumptionAmountTotal(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetConsumptionAmountTotal',
    method: 'GET',
    params: data
  })
}
//新客转化（详情）
export function ConsumptionAmount(data) {
  return request({
    url: '/api/services/app/StaffEndLXConversion/GetConsumptionAmount',
    method: 'GET',
    params: data
  })
}
//消费记录
export function ExpendRecord(data) {
  return request({
    url: '/api/services/app/MemberExpendService/GetExpendRecord',
    method: 'GET',
    params: data
  })
}
// 消费记录（详情）
export function ExpendRecordInfo(data) {
  return request({
    url: '/api/services/app/MemberExpendService/GetExpendDetail',
    method: 'GET',
    params: data
  })
}
// 券核销（查询）
export function CouponWriteOffInfo(data) {
  return request({
    url: '/api/services/app/StaffEndCouponWriteOffService/GetCouponWriteOffInfo',
    method: 'GET',
    params: data
  })
}
// 核销优惠券
export function CouponWrite(data) {
  return request({
    url: '/api/services/app/StaffEndCouponWriteOffService/UpdateCouponWriteOff',
    method: 'PUT',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
// 我的名片
export function MyBusinessCard(data) {
  return request({
    url: '/api/services/app/StaffEndMyBusinessCardService/GetStaffEndMyBusinessCard',
    method: 'GET',
    params: data
  })
}
//机构名称（离我最近的）
export function OrganizationName(data) {
  return request({
    url: '/api/services/app/StaffEndMyBusinessCardService/GetOrganizationName',
    method: 'GET',
    params: data
  })
}
//修改密码
export function ChangePassword(data) {
  return request({
    url: '/api/services/app/UserInfoService/ChangePassword',
    method: 'POST',
    data
  })
}
//会员查询
export function MemberQuery(data) {
  return request({
    url: '/api/services/app/MemberGradeService/GetMemberGradeFeature',
    method: 'GET',
    params: data
  })
}
//主页权限
export function GetAppNavigation(data){
  return request({
    url: '/api/services/app/Session/GetAppNavigation',
    method: 'GET',
    params: data
  })
}

// pc端登录
export function pcLogin (data) {
  return request({
    url: '/api/services/app/MP/UpdatePCQrCode',
    method: 'PUT',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }]
  })
}
