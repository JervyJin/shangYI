import {default as request} from '../utils/api'
//公用业态
export function FormatData(data) {
  return request({
    url: '/api/services/app/BusinessFormatService/GetListBusinessFormats',
    method: 'get',
    params: data
  })
}
//公用所属机构
export function Organization(data) {
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
//机构权限
export function GetAuthOrganization(data) {
  return request({
    url: '/api/services/app/OrganizationService/GetAuthOrganization',
    method: 'get',
    params: data
  })
}
//获取对应商户的数据
export function GetListMerchants(data) {
  return request({
    url: '/api/services/app/MerchantService/GetListMerchants',
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
//获取员工授权商户
export function MerchantUser(data) {
  return request({
    url: '/api/services/app/UserInfoService/GetMerchantByUser',
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
//基础全部接口
//基础资料

// 列表
export function ServiceList(data) {
  return request({
    url: '/api/services/app/MaterialSchemeService/GetMaterialScheme',
    method: 'get',
    params: data
  })
  
}
//添加
export function ServiceAdd(data) {
  return request({
    url: '/api/services/app/MaterialSchemeService/AddMaterialScheme',
    method: 'POST',
    data,
  })
}
//删除
export function ServiceRemove(data) {
  return request({
    url: '/api/services/app/MaterialSchemeService/DeleteMaterialScheme',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function ServiceEdit(data) {
  return request({
    url: '/api/services/app/MaterialSchemeService/GetSingleMaterialScheme',
    method: 'get',
    params: data
  })
}
//编辑保存
export function ServiceEditSave(data) {
  return request({
    url: '/api/services/app/MaterialSchemeService/UpdateMaterialScheme',
    method: 'PUT',
     data,
  })
}


//业态管理
// 列表
export function FormatList(data) {
  return request({
    url: '/api/services/app/BusinessFormatService/GetBusinessFormats',
    method: 'get',
    params: data
  })
  
}

//删除
export function FormatRemove(data) {
  return request({
    url: '/api/services/app/BusinessFormatService/DeleteBusinessFormat',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function FormatEdit(data) {
  return request({
    url: '/api/services/app/BusinessFormatService/GetSingleBusinessFormat',
    method: 'get',
    params: data,
    headers:{
      'accept':"text/plain"
    }
  })
}
//编辑保存
export function FormatEditSave(data) {
  return request({
    url: '/api/services/app/BusinessFormatService/UpdateBusinessFormat',
    method: 'PUT',
     data,
  })
}
//添加
export function FormatAdd(data) {
  return request({
    url: '/api/services/app/BusinessFormatService/AddBusinessFormat',
    method: 'POST',
    data,
  })
}


//  角色
// 列表
export function RoleList(data) {
  return request({
    url: '/api/services/app/Role/GetAllRole',
    method: 'get',
    params: data
  })
  
}
//添加
export function RoleAdd(data) {
  return request({
    url: '/api/services/app/Role/Create',
    method: 'POST',
    data,
  })
}
//删除
export function RoleRemove(data) {
  return request({
    url: '/api/services/app/Role/Delete',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function RoleEdit(data) {
  return request({
    url: '/api/services/app/Role/GetRoleForEdit',
    method: 'get',
    params: data,
    headers:{
      'accept':"text/plain"
    }
  })
}
//编辑保存
export function RoleEditSave(data) {
  return request({
    url: '/api/services/app/Role/Update',
    method: 'PUT',
     data,
  })
}
//角色权限
export function RoleAllPermissions(data) {
  return request({
    url: '/api/services/app/Role/GetAllPermissions',
    method: 'get',
    params: data,
  })
}
//获取所有基本资料名称，编码，标识
export function GetListMaterialScheme(data) {
  return request({
    url: '/api/services/app/MaterialSchemeService/GetListMaterialScheme',
    method: 'get',
    params: data,
  })
}
//根据权限获取角色信息
export function GetRolesAsync(data) {
  return request({
    url: '/api/services/app/Role/GetRolesAsync',
    method: 'get',
    params: data,
  })
}

//员工管理(UserInfoService)
//列表 
export function UserInfoList(data) {
  return request({
    url: '/api/services/app/UserInfoService/GetUserInfo',
    method: 'get',
    params: data
  })
  
}
//添加
export function UserInfoAdd(data) {
  return request({
    url: '/api/services/app/UserInfoService/AddUserInfo',
    method: 'POST',
    data,
  })
}
//删除
export function UserInfoRemove(data) {
  return request({
    url: '/api/services/app/UserInfoService/DeleteUserInfo',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function UserInfoEdit(data) {
  return request({
    url: '/api/services/app/UserInfoService/GetSingleUserInfo',
    method: 'get',
    params: data,
    headers:{
      'accept':"text/plain"
    }
  })
}
//编辑保存
export function UserInfoEditSave(data) {
  return request({
    url: '/api/services/app/UserInfoService/UpdateUserInfo',
    method: 'PUT',
     data,
  })
}

//员工分组管理UserInfoGroupService)
//列表 
export function UserInfoGroupList(data) {
  return request({
    url: '/api/services/app/UserInfoGroupService/GetUserInfoGroup',
    method: 'get',
    params: data
  })
  
}
//添加
export function UserInfoGroupAdd(data) {
  return request({
    url: '/api/services/app/UserInfoGroupService/AddUserInfoGroup',
    method: 'POST',
    data,
  })
}
//删除
export function UserInfoGroupRemove(data) {
  return request({
    url: '/api/services/app/UserInfoGroupService/DeleteUserInfoGroup',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function UserInfoGroupEdit(data) {
  return request({
    url: '/api/services/app/UserInfoGroupService/GetSingleUserInfoGroup',
    method: 'get',
    params: data,
    headers:{
      'accept':"text/plain"
    }
  })
}
//编辑保存
export function UserInfoGroupEditSave(data) {
  return request({
    url: '/api/services/app/UserInfoGroupService/UpdateUserInfoGroup',
    method: 'PUT',
     data,
  })
}
//账户停用/启用
export function UpdateStateUser(data) {
  return request({
    url: '/api/services/app/UserInfoService/UpdateStateUser',
    method: 'PUT',
     data,
  })
}
//获取对应员工分组的数据
export function GetTreeUserInfoGroup(data) {
  return request({
    url: '/api/services/app/UserInfoGroupService/GetTreeUserInfoGroup',
    method: 'get',
    params: data
  })
}
//获取单个员工分组
export function GetSingleUserInfoGroup(data) {
  return request({
    url: '/api/services/app/UserInfoGroupService/GetSingleUserInfoGroup',
    method: 'get',
    params: data
  })
  
}
//机构区域(OrganizationAreaService)
//列表 
export function OrganizaList(data) {
  return request({
    url: '/api/services/app/OrganizationAreaService/GetOrganizationArea',
    method: 'get',
    params: data
  })
  
}
//添加
export function OrganizaAdd(data) {
  return request({
    url: '/api/services/app/OrganizationAreaService/AddOrganizationArea',
    method: 'POST',
    data,
  })
}
//删除
export function OrganizaRemove(data) {
  return request({
    url: '/api/services/app/OrganizationAreaService/DeleteOrganizationArea',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function OrganizaEdit(data) {
  return request({
    url: '/api/services/app/OrganizationAreaService/GetSingleOrganizationArea',
    method: 'get',
    params: data,
    headers:{
      'accept':"text/plain"
    }
  })
}
//编辑保存
export function OrganizaEditSave(data) {
  return request({
    url: '/api/services/app/OrganizationAreaService/UpdateOrganizationArea',
    method: 'PUT',
     data,
  })
}
//所有机构(OrganizationService)
//列表 
export function OrganizationList(data) {
  return request({
    url: '/api/services/app/OrganizationService/GetOrganization',
    method: 'get',
    params: data
  })
  
}
//添加
export function OrganizationAdd(data) {
  return request({
    url: '/api/services/app/OrganizationService/AddOrganization',
    method: 'POST',
    data,
  })
}
//删除
export function OrganizationRemove(data) {
  return request({
    url: '/api/services/app/OrganizationService/DeleteOrganization',
    method: 'DELETE',
    params: data
  })
}

//编辑
export function OrganizationEdit(data) {
  return request({
    url: '/api/services/app/OrganizationService/GetSingleOrganization',
    method: 'get',
    params: data,
    headers:{
      'accept':"text/plain"
    }
  })
}
//编辑保存
export function OrganizationEditSave(data) {
  return request({
    url: '/api/services/app/OrganizationService/UpdateOrganization',
    method: 'PUT',
     data,
  })
}
//停用启用
export function UpdateStateOrg(data) {
  return request({
    url: '/api/services/app/OrganizationService/UpdateStateOrg',
    method: 'PUT',
     data,
  })
}
//查询系统设置 
export function GetSystemSetting(data) {
  return request({
    url: '/api/services/app/SystemSettingService/GetSystemSetting',
    method: 'get',
    params: data
  }) 
}
//更新系统设置
export function UpdateSystemSetting(data) {
  return request({
    url: '/api/services/app/SystemSettingService/UpdateSystemSetting',
    method: 'PUT',
     data,
  })
}
//查询微信模板
export function GetMessageTemplate(data) {
  return request({
    url: '/api/services/app/MemberMessageTemplateService/GetMessageTemplate',
    method: 'get',
    params: data
  })
}
//微信模板启用/停用
export function UpdateMessageTemplateState(data) {
  return request({
    url: '/api/services/app/MemberMessageTemplateService/UpdateMessageTemplateState',
    method: 'PUT',
    data
  })
}
//查询模板Id
export function GetMessageTemplateId(data) {
  return request({
    url: '/api/services/app/MemberMessageTemplateService/GetMessageTemplateId',
    method: 'get',
    params: data
  })
}
//更新微信模板Id
export function UpdateMessageTemplateId(data) {
  return request({
    url: '/api/services/app/MemberMessageTemplateService/UpdateMessageTemplateId',
    method: 'PUT',
    data
  })
}
//根据Id查询微信模板
export function GetMessageTemplateById(data) {
  return request({
    url: '/api/services/app/MemberMessageTemplateService/GetMessageTemplateById',
    method: 'get',
    params: data
  })
}
//更新微信模板
export function UpdateMessageTemplate(data) {
  return request({
    url: '/api/services/app/MemberMessageTemplateService/UpdateMessageTemplate',
    method: 'PUT',
    data
  })
}
//查询短信模板
export function GetNoteTemplate(data) {
  return request({
    url: '/api/services/app/MemberNoteTemplateService/GetNoteTemplate',
    method: 'get',
    params: data
  })
}
//微信模板启用/停用
export function UpdateNoteTemplateState(data) {
  return request({
    url: '/api/services/app/MemberNoteTemplateService/UpdateNoteTemplateState',
    method: 'PUT',
    data
  })
}
//查询模板Id
export function GetNoteTemplateId(data) {
  return request({
    url: '/api/services/app/MemberNoteTemplateService/GetNoteTemplateId',
    method: 'get',
    params: data
  })
}
//更新短信模板Id
export function UpdateNoteTemplateId(data) {
  return request({
    url: '/api/services/app/MemberNoteTemplateService/UpdateNoteTemplateId',
    method: 'PUT',
    data
  })
}
//根据Id查询短信模板
export function GetNoteTemplateById(data) {
  return request({
    url: '/api/services/app/MemberNoteTemplateService/GetNoteTemplateById',
    method: 'get',
    params: data
  })
}
//更新短信模板
export function UpdateNoteTemplate(data) {
  return request({
    url: '/api/services/app/MemberNoteTemplateService/UpdateNoteTemplate',
    method: 'PUT',
    data
  })
}
//获取基础消息
export function GetBaseInfoOutput(data) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetBaseInfoOutput',
    method: 'get',
    params: data
  })
}
//获取消费概况
export function GetExpendInfo(data) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetExpendInfo',
    method: 'get',
    params: data
  })
}
//消费品类TOP10(柱状图)
export function GetConsumerGoodsTop(data) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetConsumerGoodsTop',
    method: 'get',
    params: data
  })
}
//消费品牌TOP10(柱状图)
export function GetConsumerBrandTop(data) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetConsumerBrandTop',
    method: 'get',
    params: data
  })
}
//到店次数趋势图
export function GetMemberShopTimesTrend(data) {
  return request({
    url: '/api/services/app/MemberHomeReportService/GetMemberShopTimesTrend',
    method: 'get',
    params: data
  })
}