<template>
  <div class="container">
    <div class="conTop">
      <div class="topTitle">
        <p class="f-l">
          <span></span>筛选条件
        </p>
        <p class="f-r c-blue" @click="queryToggle()">
          <i
            class="iconfont f-14"
            :class="{'icongengduo1-copy':iconxiangshang1,'icongengduo1-copy-copy':iconxiangxia1}"
          ></i>收起
        </p>
        <p class="f-r screeningBtn">保存筛选条件</p>
        <p class="f-r historyBtn">使用历史条件</p>
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-show="ToggleStyle">
        <TextBox inputId v-model="coding" placeholder=" ">
          <span class="query_title">员工名称/编号</span>
          <Addon>
            <span
              v-if="coding"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="coding=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          inputId
          v-model="formatsName"
          :data="formatsData"
          textField="Name"
          valueField="Id"
          placeholder
          @selectionChange="formatsChange"
        >
          <span class="query_title">业态</span>
        </ComboBox>
        <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">销售机构</span>
        </ComboBox>
        <ComboBox
          v-model="State"
          :data="StateTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">状态</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="searchBtn()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius iconfont iconadd f-16" @click="handAdd">添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <DataGrid
      :data="terminalList"
      :pagination="true"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
      :columnResizing="true"
      :lazy="true"
      :pageNumber="pageNumber"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange($event)"
    >
      <GridColumnGroup :frozen="true" align="left" width="470">
        <GridHeaderRow>
          <GridColumn
            field="custome"
            type="index"
            cellCss="datagrid-td-rownumber"
            width="50"
            align="center"
            title="序号"
          >
            <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
          </GridColumn>
          <GridColumn title="操作" field="custome-adv" width="120" align="center">
            <template slot="body" slot-scope="scope">
              <LinkButton
                class="btnEdit"
                @click="$refs.terminal.open();handleEdit(scope.$index, scope.row)"
              >编辑</LinkButton>
              <LinkButton
                class="btnState"
                @click="disableBtn(scope.$index, scope.row)"
                v-if="scope.row.State=='停用'"
              >启用</LinkButton>
              <LinkButton
                class="btnState"
                @click="disableBtn(scope.$index, scope.row)"
                v-if="scope.row.State=='启用'"
              >停用</LinkButton>
            </template>
          </GridColumn>
          <GridColumn field="BusinessformatName" title="业态" align="center" width="120">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.BusinessformatName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationName" title="机构" align="center" width="180">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrganizationName}}</div>
            </template>
          </GridColumn>
        </GridHeaderRow>
      </GridColumnGroup>
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="Code" title="用户编码" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.Code}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Name" title="用户名称" width="120" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.Name}}</div>
            </template>
          </GridColumn>
          <GridColumn field="State" title="用户状态" width="80" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.State}}</div>
            </template>
          </GridColumn>
          <GridColumn field="GroupName" title="员工分组" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.GroupName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="RoleName" title="角色" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.RoleName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="AuthorizationMerchantCount" title="商户权限" align="center" width="80">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.AuthorizationMerchantCount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Level" title="等级" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.Level}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Phone" title="电话" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.Phone}}</div>
            </template>
          </GridColumn>
          <GridColumn field="WorkTimes" title="从业时间" width="80" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.WorkTimes}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Image" title="个人形象" align="center" width="80"></GridColumn>
          <GridColumn field="WechatUnionId" title="绑定微信" width="80px" align="center">
            <template slot="body" slot-scope="scope">
              <div align="center">{{scope.row.Image}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CreatorTime" title="添加时间" width="180" align="center">
             <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CreatorTime}}</div>
            </template>
          </GridColumn>
        </GridHeaderRow>
      </GridColumnGroup>
    </DataGrid>
    <!-- 分页 -->
    <!-- <template slot="footer">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNumber="pageNumber"
        :layout="pagelayout"
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>-->
    <!-- 弹框 -->
    <Dialog
      ref="terminal"
      :title="'员工'"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form ref="form" :model="BasicDataForm" class="formStyle formTop" :rules="rules" @validate="errors=$event">
        <div class="formStyle_list">
          <Label for="formats">业态</Label>
          <ComboBox
            placeholder="业态"
            v-model="BasicDataForm.BusinessformatId"
            :data="FormformatsData"
            valueField="Id"
            textField="Name"
            @selectionChange="formatsChangeVAL"
            name="BusinessformatId"
            v-Tooltip="getTipOpts('BusinessformatId')"
          ><span class="c-red starpos">*</span></ComboBox>
        </div>
        <div class="formStyle_list">
          <Label for="OrganizationId">所属机构</Label>
          <ComboBox
            v-model="BasicDataForm.OrganizationId"
            :data="Organization"
            valueField="Id"
            textField="Name"
            @selectionChange="OrganizationIdVAL"
            name="OrganizationId"
            v-Tooltip="getTipOpts('OrganizationId')"
          ><span class="c-red starpos">*</span></ComboBox>
        </div>
        <div class="formStyle_list">
          <Label for>机构权限</Label>
          <SearchBox placeholder="机构权限" v-model="AuthorizationOrg" @search="AuthorizationOrgVal">
            <Addon>
              <span
                v-if="AuthorizationOrg"
                class="iconmessage-close iconfont f-12 f-r"
                title="Clear value"
                @click="AuthorizationOrg=null,BasicDataForm.AuthorizationOrgCount=0,BasicDataForm.listAuthorizationOrg=[]"
              ></span>
            </Addon>
          </SearchBox>
          共{{BasicDataForm.AuthorizationOrgCount}}个机构权限
        </div>
        <div class="formStyle_list">
          <Label for="superiorGroup">商户权限</Label>
          <SearchBox placeholder="商户权限" v-model="AuthorizationMerchant" @search="superiorGroupVal">
            <Addon>
              <span
                v-if="AuthorizationMerchant"
                class="iconmessage-close iconfont f-12 f-r"
                title="Clear value"
                @click="AuthorizationMerchant=null,BasicDataForm.AuthorizationMerchantCount=0,BasicDataForm.listAuthorizationMerchant=[]"
              ></span>
            </Addon>
          </SearchBox>
          共{{BasicDataForm.AuthorizationMerchantCount}}个商户权限
        </div>
        <div class="formStyle_list" v-if="dialogStatus == 'update'">
          <Label for="Remark">员工编号</Label>
          <span v-html="BasicDataForm.Code"></span>
        </div>
        <div class="formStyle_list" v-else>
          <Label for="Code">员工编号</Label>
          <TextBox inputId="Code" name="Code" v-model="BasicDataForm.Code" v-Tooltip="getTipOpts('Code')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="Name">员工姓名</Label>
          <TextBox inputId="Name" name="Name" v-model="BasicDataForm.Name" v-Tooltip="getTipOpts('Name')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="superiorGroup">角色</Label>
          <SearchBox
            placeholder="角色"
            class="pr-10"
            v-model="BasicDataForm.RoleName"
            @search="$refs.RoleDialog.open()"
            v-Tooltip="getTipOpts('RoleName')"
          >
            <Addon>
              <span
                v-if="BasicDataForm.RoleName"
                class="iconmessage-close iconfont f-12 f-r"
                title="Clear value"
                @click="BasicDataForm.RoleName=''"
              ></span>
            </Addon>
            <span class="c-red starpos">*</span>
          </SearchBox>
        </div>
        <div class="formStyle_list">
          <Label for="superiorGroup">员工分组</Label>
          <SearchBox placeholder="员工分组" v-model="BasicDataForm.GroupName" @search="GroupData()">
            <Addon>
              <span
                v-if="BasicDataForm.GroupName"
                class="iconmessage-close iconfont f-12 f-r"
                title="Clear value"
                @click="BasicDataForm.GroupName=''"
              ></span>
            </Addon>
          </SearchBox>
        </div>

        <div class="formStyle_list">
          <Label for="WorkTimes">从业时间</Label>
          <NumberBox inputId="WorkTimes" :spinners="false" v-model="BasicDataForm.WorkTimes"><span class="c-red starpos">*</span></NumberBox>
        </div>
        <div class="formStyle_list" v-if="this.dialogStatus !='update'">
          <Label for="Password">登录密码</Label>
          <PasswordBox
            inputId="Password"
            name="Password"
            v-model="BasicDataForm.Password"
            class="pr-10"
            v-Tooltip="getTipOpts('Password')"
          >
            <span class="c-red starpos">*</span>
          </PasswordBox>
        </div>
        <div class="formStyle_list">
          <Label for="Phone">手机号码</Label>
          <NumberBox
            inputId="Phone"
            name="Phone"
            v-model="BasicDataForm.Phone"
            :min="1"
            v-Tooltip="getTipOpts('Phone')"
          ><span class="c-red starpos">*</span></NumberBox>
          <!-- <TextBox inputId="Phone" name="Phone" v-model="BasicDataForm.Phone" v-Tooltip="getTipOpts('Phone')">
            <span class="c-red starpos">*</span>
          </TextBox> -->
        </div>
        <div class="formStyle_list">
          <Label for="Sex">性别</Label>
          <ComboBox
            inputId
            v-model="BasicDataForm.Sex"
            :data="Sexdata"
            valueField="Code"
            textField="Name"
            name="Sex"
            v-Tooltip="getTipOpts('Sex')"
          ><span class="c-red starpos">*</span></ComboBox>
        </div>
        <div class="formStyle_list">
          <Label for="State">状态</Label>
          <ComboBox
            inputId
            v-model="BasicDataForm.State"
            :data="Statedata"
            valueField="Code"
            textField="Name"
          ></ComboBox>
        </div>
        <div class="formStyle_list">
          <Label for="Remark">备注</Label>
          <TextBox inputId="Remark" name="Remark" v-model="BasicDataForm.Remark"></TextBox>
        </div>
        <!-- <div class="f-r mt-30">
          <LinkButton @click="$refs.terminal.close()" class="btnCancel">取消</LinkButton>
          <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        </div> -->
      </Form>
      <template v-slot:footer>
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        <LinkButton @click="$refs.terminal.close()" class="btnCancel">取消</LinkButton>
      </template>
    </Dialog>

    <!-- 机构权限    -->
    <Dialog
      ref="publicDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="机构"
    >
      <InstitutionsData @childValue="getchild" :InstitutionFormatsVal="FormatsVal" :choseCompanyList="BasicDataForm.listAuthorizationOrg"></InstitutionsData>
    </Dialog>
    <!-- 商户权限 -->
    <Dialog
      ref="MerchantsDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="商户权限"
    >
      <merchantsData @MerchantValue="getchildValue" :InstitutionFormatsVal="FormatsVal"></merchantsData>
    </Dialog>
    <!-- 员工分组 -->
    <Dialog
      ref="EmployeeDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="员工分组"
    >
      <grouping @childValue="getEmployeechild" :organizationId="organizationIdVal"></grouping>
    </Dialog>
    <!-- 角色权限 -->
    <Dialog
      ref="RoleDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="角色权限"
    >
      <RoleInfo @childValue="getRolechildValue"></RoleInfo>
    </Dialog>
  </div>
</template>
<script>
import InstitutionsData from "@/components/institutionsstaff";
import merchantsData from "@/components/merchantsData";
import grouping from "@/components/grouping";
import RoleInfo from "@/components/RoleInfo";
import { parseTime } from "@/utils/index";

import {
  UserInfoList,
  FormatData,
  UserInfoAdd,
  UserInfoRemove,
  UserInfoEdit,
  UserInfoEditSave,
  GetEnumList,
  Organization,
  GetListOrganization,
  MerchantUser,
  GetOrgByUser,
  UpdateStateUser
} from "@/api/Service";

export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      State: 1,
      StateTypeData: [],
      FormatsVal: "",
      formatsName: "",
      coding: "",
      //table
      terminalList: [],
      OrganizationId: "",
      OrganizationIdData: [],
      dialogStatus: "",
      //分页
      total: 0,
      pageNumber: 1,
      pageSize: 20,
      pagelayout: [
        "list",
        "sep",
        "first",
        "prev",
        "next",
        "last",
        "sep",
        "refresh",
        "info"
      ],

      //弹框
      formatsData: [],
      FormformatsData: [],
      Organization: [],
      organizationIdVal: "",
      Statedata: [],
      Sexdata: [],
      AuthorizationOrg: "",
      AuthorizationMerchant: "",
      MerchantsName: "",
      ParentName: "",
      BasicDataForm: {
        Code: "",
        Name: "",
        RoleId: "",
        RoleCode: "",
        RoleName: "",
        OrganizationId: "",
        OrganizationCode: "string",
        OrganizationName: "string",
        BusinessformatId: "",
        BusinessformatCode: "string",
        BusinessformatName: "string",
        GroupId: 0,
        GroupCode: "",
        GroupName: "",
        AuthorizationOrgCount: 0,
        AuthorizationMerchantCount: 0,
        Password: "",
        Phone: "",
        Sex: 0,
        WorkTimes: "",
        Remark: "",
        Image: "",
        listAuthorizationMerchant: [],
        listAuthorizationOrg: []
      },
      rules: {
        Name: "required",
        Phone: ["required","length[11,11]"],
        Password: "required",
        Code: "required",
        Sex: "required",
        BusinessformatId: "required",
        OrganizationId: "required",
        RoleName: "required"
      },
      errors: {},
    };
  },
  components: {
    InstitutionsData,
    grouping,
    RoleInfo,
    merchantsData
  },
  methods: {
    queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1 = !this.iconxiangshang1;
      this.iconxiangxia1 = !this.iconxiangxia1;
      let that = this;
      setTimeout(function() {
        that.gridHeight = that.resizeTable();
      }, 10);
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getUsers();
    },
    // 获取用户列表
    getUsers() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        BusinessformatId: this.formatsName,
        OrganizationId: this.OrganizationId,
        CodeOrName: this.coding,
        State: this.State
      };
      console.log(para);
      UserInfoList(para).then(res => {
        console.log(res);
        this.total = res.Result.Total;
        this.terminalList = res.Result.Rows;
        console.log(this.terminalList);
      });
    },
    //删除
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.alert({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: row.Id };
            console.log(para);
            UserInfoRemove(para).then(res => {
              this.getUsers();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //编辑
    handleEdit(index, row) {
      this.dialogStatus = "update";
      const para = { id: row.Id };
      console.log(para);
      this.formatsChangeVAL();
      UserInfoEdit(para).then(res => {
        console.log(res.Result.Data);
        console.log("编辑", res.Result.Data);
        this.formatsChangeVAL();
        this.organizationIdVal = res.Result.Data.OrganizationId;
        this.BasicDataForm = {
          Id: res.Result.Data.Id,
          Code: res.Result.Data.Code,
          Name: res.Result.Data.Name,
          RoleId: res.Result.Data.RoleId,
          RoleCode: res.Result.Data.RoleCode,
          RoleName: res.Result.Data.RoleName,
          OrganizationId: res.Result.Data.OrganizationId,
          OrganizationCode: res.Result.Data.OrganizationCode,
          OrganizationName: res.Result.Data.OrganizationName,
          BusinessformatId: res.Result.Data.BusinessformatId,
          BusinessformatCode: res.Result.Data.BusinessformatCode,
          BusinessformatName: res.Result.Data.BusinessformatName,
          GroupId: res.Result.Data.GroupId,
          GroupCode: res.Result.Data.GroupCode,
          GroupName: res.Result.Data.GroupName,
          AuthorizationOrgCount: res.Result.Data.AuthorizationOrgCount,
          AuthorizationMerchantCount:
            res.Result.Data.AuthorizationMerchantCount,
          Password: res.Result.Data.Password,
          Phone: res.Result.Data.Phone?Number(res.Result.Data.Phone):'',
          Sex: res.Result.Data.Sex,
          WorkTimes: res.Result.Data.WorkTimes,
          Remark: res.Result.Data.Remark,
          Image: res.Result.Data.Image,
          // listAuthorizationMerchant: res.Result.Data.listAuthorizationMerchant,
          listAuthorizationOrg: res.Result.Data.listAuthorizationOrg
        };
        if (
          this.BasicDataForm.listAuthorizationMerchant == "" ||
          this.BasicDataForm.listAuthorizationMerchant == undefined ||
          this.BasicDataForm.listAuthorizationMerchant == null
        ) {
          this.BasicDataForm.listAuthorizationMerchant = [];
        }
        if (
          this.BasicDataForm.listAuthorizationOrg == "" ||
          this.BasicDataForm.listAuthorizationOrg == undefined ||
          this.BasicDataForm.listAuthorizationOrg == null
        ) {
          this.BasicDataForm.listAuthorizationOrg = [];
        }
        MerchantUser(para).then(res => {
          console.log("编辑商户权限", res.Result.Data);
          this.arrName = [];
          if (res.Result.Data != null && res.Result.Data != "") {
            res.Result.Data.forEach(data => {
              this.arrName.push(data.Name);
              console.log(this.arrName.join(","));
            });
          }
          this.AuthorizationMerchant = this.arrName.join(",");
          console.log("编辑商户", this.AuthorizationMerchant);
        });
        const para1 = {
          Id: row.Id,
          IsUserManage: true
        };
        console.log(para1);
        GetOrgByUser(para1).then(res => {
          console.log(res.Result);
          console.log("编辑机构", res.Result);
          this.arrName = [];
          if (
            res.Result.Data != null &&
            res.Result.Data != "" &&
            res.Result.Data
          ) {
            res.Result.Data.forEach(data => {
              this.arrName.push(data.Name);
              console.log(this.arrName.join(","));
            });
          }
          this.BasicDataForm.listAuthorizationOrg = res.Result.Data;
          this.AuthorizationOrg = this.arrName.join(";");
          console.log("编辑机构", this.AuthorizationOrg);
        });
      });
      console.log(this.Organization);
    },
    //编辑保存
    saveForm(index, row) {
      this.$refs.form.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
          return false;
        }else {
          this.editFn(index, row);
        }
      });    
    },
    editFn(index, row){
      console.log(JSON.stringify(this.BasicDataForm.listAuthorizationOrg));
      if(this.BasicDataForm.listAuthorizationOrg && this.BasicDataForm.listAuthorizationOrg.length>0){
        this.BasicDataForm.listAuthorizationOrg.map((item)=>{
          if(!item.OrganizationId){
            item.OrganizationId = item.Id;
          }
        });
      }
      //return;
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑吗？",
        result: r => {
          if (r) {
            const para = Object.assign({}, this.BasicDataForm);
            console.log("编辑保存", para);
            //debugger;
            UserInfoEditSave(para).then(res => {
              this.$refs.terminal.close();
              this.getUsers();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //添加
    handAdd() {
      this.$refs.terminal.open();
      this.dialogStatus = "create";
      this.MerchantsName = "";
      this.ParentName = "";
      this.organizationIdVal = "";
      this.BasicDataForm = {
        Code: "",
        Name: "",
        RoleId: 0,
        RoleCode: "",
        RoleName: "",
        OrganizationId: "",
        OrganizationCode: "",
        OrganizationName: "",
        BusinessformatId: "",
        BusinessformatCode: "",
        BusinessformatName: "",
        GroupId: null,
        GroupCode: "",
        GroupName: "",
        AuthorizationOrgCount: 0,
        AuthorizationMerchantCount: 0,
        Password: "",
        Phone: "",
        Sex: 0,
        WorkTimes: "",
        Remark: "",
        Image: "",
        listAuthorizationMerchant: [],
        listAuthorizationOrg: []
      };
    },
    submitForm: function() {
      this.$refs.form.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
          return false;
        }else {
          this.submitFn();
        }
      });      
    },
    submitFn(){
      var obj = this.findObjectFromArray(
        this.FormformatsData,
        "Id",
        this.BasicDataForm.BusinessformatId
      );
      console.log(obj);
      var arr = this.findObjectFromArray(
        this.Organization,
        "Id",
        this.BasicDataForm.OrganizationId
      );
      if (
        this.BasicDataForm.BusinessformatId != "" &&
        this.BasicDataForm.BusinessformatId != null
      ) {
        var para1 = {
          BusinessformatCode: obj.Code,
          BusinessformatName: obj.Name
        };
      }
      if (
        this.BasicDataForm.OrganizationId != "" &&
        this.BasicDataForm.OrganizationId != null
      ) {
        var para2 = {
          OrganizationCode: arr.Code,
          OrganizationName: arr.Name
        };
      }
     var WorkTimesTime = parseTime(
        this.BasicDataForm.WorkTimes,
        "{yyyy}"
      );
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            const para = Object.assign({}, this.BasicDataForm, para1, para2);
            para.WorkTimes = Number(WorkTimesTime);
            console.log("添加参数", para);
            UserInfoAdd(para).then(res => {
              if (res.Result.Code == 0) {
                this.$refs.terminal.close();
                this.getUsers();
                this.$messager.alert({
                  title: "提示",
                  msg: res.Result.Message
                });
              } else {
                this.$messager.alert({
                  title: "提示",
                  msg: res.Result.Message
                });
              }
            });
          }
        }
      });
    },
    //查询
    searchBtn() {
      this.getUsers();
    },
    //类型
    StateMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.Statedata = res.Result.Data;
      });
    },
    //性别
    SexMode() {
      const para = {
        EnumType: "Sex_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.Sexdata = res.Result.Data;
      });
    },
    //业态
    formatsChange() {
      this.OrganizationId = "";
      FormatData().then(res => {
        console.log(res);
        this.formatsData = res.Result.Data;
        console.log(this.formatsName);
        console.log(this.BasicDataForm.BusinessformatId);
        if (this.formatsName != "" && this.formatsName != null) {
          console.log(888);
          const para = {
            BusinessformatId: this.formatsName
          };
          console.log(para);
          GetListOrganization(para).then(res => {
            console.log(res.Result);
            this.OrganizationIdData = res.Result.Data;
          });
        } else {
          this.OrganizationIdData = [];
        }
      });
      console.log(this.OrganizationIdData);
    },
    //业态
    formatsChangeVAL() {
      this.BasicDataForm.OrganizationId = "";
      this.FormatsVal = null;
      this.AuthorizationOrg = "";
      this.BasicDataForm.AuthorizationOrgCount = 0;
      this.AuthorizationMerchant = "";
      this.BasicDataForm.AuthorizationMerchantCount = 0;
      FormatData().then(res => {
        if (res.Result && res.Result.Data && res.Result.Data.length) {
          this.FormformatsData = res.Result.Data;
        } else {
          this.FormformatsData = [];
        }
        console.log(this.FormformatsData);
        console.log(this.BasicDataForm.BusinessformatId);
        if (
          this.BasicDataForm.BusinessformatId != "" &&
          this.BasicDataForm.BusinessformatId != null
        ) {
          const para = {
            BusinessformatId: this.BasicDataForm.BusinessformatId
          };
          console.log(para);
          GetListOrganization(para).then(res => {
            console.log(res.Result);
            this.Organization = res.Result.Data;
          });
        } else {
          this.Organization = [];
          this.organizationIdVal = "";
          this.BasicDataForm.GroupName = "";
          this.BasicDataForm.GroupId = "";
          this.BasicDataForm.GroupCode = "";
        }
      });
    },
    OrganizationIdVAL() {
      this.AuthorizationOrg = null;
      this.BasicDataForm.AuthorizationOrgCount = 0;
      this.BasicDataForm.listAuthorizationOrg = [];
      this.AuthorizationMerchant = null;
      this.BasicDataForm.AuthorizationMerchantCount = 0;
      this.BasicDataForm.listAuthorizationMerchant = [];
    },
    //机构权限传值
    AuthorizationOrgVal() {
      //console.log(this.BasicDataForm.OrganizationId);
      if (
        this.BasicDataForm.OrganizationId != "" &&
        this.BasicDataForm.OrganizationId != null
      ) {
        this.FormatsVal = this.BasicDataForm.OrganizationId;
        console.log("所属机构id", this.FormatsVal);
        this.$refs.publicDialog.open();
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先选择所属机构"
        });
      }
    },
    //授权机构回值
    getchild(data) {
      console.log(data);
      this.$refs.publicDialog.close();
      this.arrID = [];
      if (data && data == 1) {
        //选择为空
        this.BasicDataForm.AuthorizationOrgCount = 0;
        this.BasicDataForm.listAuthorizationOrg = [];
        this.AuthorizationOrg = [];
      }
      if (data && data == 2) {
        //选择为空
        this.BasicDataForm.AuthorizationOrgCount = 0;
        this.BasicDataForm.listAuthorizationOrg = [];
        this.AuthorizationOrg = [];
      }
      if (data && data.length > 0) {
        //选择的有数据
        this.BasicDataForm.listAuthorizationOrg = [];
        this.arrName = [];
        data.forEach(data => {
          var arr = {};
          arr.OrganizationId = data.Id;
          this.arrID.push(data.OrganizationId);
          this.arrName.push(data.Name);
          this.BasicDataForm.listAuthorizationOrg.push(arr);
        });
        console.log(this.arrID.length);
        this.BasicDataForm.AuthorizationOrgCount = this.arrID.length;
        this.AuthorizationOrg = this.arrName.join(";");
        // this.MenberDialogForm.MarketingOrganizationRangeList.OrganizationId = this.arrID;
        // console.log(this.MenberDialogForm.MarketingOrganizationRangeList);
      }
      // console.log(data);
      // if (data == null || data == "") {
      //   this.BasicDataForm.AuthorizationOrgCount = 0;
      //   this.AuthorizationOrg = "";
      //   this.$refs.publicDialog.close();
      // } else {
      //   this.$refs.publicDialog.close();
      //   this.BasicDataForm.listAuthorizationOrg = [];
      //   this.arrName = [];
      //   data.forEach(data => {
      //     var arr = {};
      //     arr.OrganizationId = data.Id;
      //     this.arrName.push(data.Name);
      //     this.BasicDataForm.listAuthorizationOrg.push(arr);
      //   });
      //   this.BasicDataForm.AuthorizationOrgCount = this.arrName.length;
      //   this.AuthorizationOrg = this.arrName.join(";");
      // }
    },
    //门店传值
    superiorGroupVal() {
      console.log();
      if (
        this.BasicDataForm.OrganizationId != "" &&
        this.BasicDataForm.OrganizationId != null
      ) {
        this.FormatsVal = this.BasicDataForm.OrganizationId;
        console.log("所属机构id", this.FormatsVal);
        this.$refs.MerchantsDialog.open();
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先选择所属机构"
        });
      }
    },
    //门店回值
    getchildValue(data) {
      console.log(data);
      if (data == null || data == "") {
        this.BasicDataForm.AuthorizationMerchantCount = 0;
        this.$refs.MerchantsDialog.close();
        this.AuthorizationMerchant = "";
      } else {
        this.$refs.MerchantsDialog.close();
        this.BasicDataForm.listAuthorizationMerchant = [];
        this.arrName = [];
        data.forEach(data => {
          var arr = {};
          arr.MerchantCode = data.Code;
          arr.MaterialSchemeId = data.MaterialSchemeId;
          this.arrName.push(data.Name);
          this.BasicDataForm.listAuthorizationMerchant.push(arr);
        });
        this.AuthorizationMerchant = this.arrName.join(",");
        this.BasicDataForm.AuthorizationMerchantCount = data.length;
      }
    },
    //角色权限传值
    getRolechildValue(data) {
      console.log(data);
      if (data != "" && data != null) {
        this.$refs.RoleDialog.close();
        this.BasicDataForm.RoleName = data.Name;
        this.BasicDataForm.RoleCode = data.DisplayName;
        this.BasicDataForm.RoleId = data.Id;
      }

      console.log(this.BasicDataForm.RoleName);
    },
    GroupData() {
      if (
        this.BasicDataForm.OrganizationId != "" &&
        this.BasicDataForm.OrganizationId != null
      ) {
        console.log("机构id", this.BasicDataForm.OrganizationId);
        this.$refs.EmployeeDialog.open();
        this.organizationIdVal = this.BasicDataForm.OrganizationId;
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先选择机构"
        });
      }
    },
    //员工分组传值
    getEmployeechild(data) {
      console.log(data);
      if (data != "" && data != null) {
        this.$refs.EmployeeDialog.close();
        this.BasicDataForm.GroupName = data.text;
        this.BasicDataForm.GroupId = data.id;
        this.BasicDataForm.GroupCode = data.Code;
      }
    },
    //在数组冲查询出来一个对象,这样可以了
    findObjectFromArray(arr, key, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) {
          return arr[i];
        }
      }
    },
    //状态
    TypeMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateTypeData = res.Result.Data;
      });
    },
    //启用
    disableBtn(index, row) {
      console.log(row);
      if (row.State == "启用") {
        this.StateAll = 0;
      } else {
        this.StateAll = 1;
      }
      const para = {
        Id: row.Id,
        State: this.StateAll
      };
      console.log(para);
      UpdateStateUser(para).then(res => {
        console.log(res.Result);
        this.getUsers();
      });
    },
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : null;
    },
    hasError(name) {
      return this.getError(name) != null;
    },
    getTipOpts(name) {
      return {
        content: this.getError(name),
        closed: !this.hasError(name),
        position: "right"
      };
    },
  },
  mounted() {
    this.getUsers();
    this.StateMode();
    this.SexMode();
    this.TypeMode();
    this.gridHeight = this.resizeTable();
    
  }
};
</script>
<style scoped>
.error {
  color: red;
  font-size: 12px;
  margin: 4px 0;
}
.textbox-addon{
  right: 10px!important;
}
</style>
