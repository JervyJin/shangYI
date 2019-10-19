<template>
  <div class="container">
    <div class="conTop">
      <div class="topTitle">
        <p class="f-l">
          <span></span>筛选条件
        </p>
        <p class="f-r c-blue" @click="queryToggle">
          <i
            class="iconfont f-14"
            :class="{'icongengduo1-copy':iconxiangshang1,'icongengduo1-copy-copy':iconxiangxia1}"
          ></i>收起
        </p>
        <p class="f-r screeningBtn">保存筛选条件</p>
        <p class="f-r historyBtn">使用历史条件</p>
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-if="ToggleStyle">
        <TextBox v-model="CodeOrName" placeholder style="width:200px">
          <span class="query_title">编码/名称</span>
          <Addon>
            <span
              v-if="CodeOrName"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="CodeOrName=null"
            ></span>
          </Addon>
        </TextBox>
        <!-- <ComboBox
          inputId
          v-model="formatsName"
          :data="formatsData"
          textField="Name"
          valueField="Id"
          placeholder
          
        >
          <span class="query_title">业态</span>
        </ComboBox>-->
        <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Id"
          textField="Name"
          placeholder
          @selectionChange="formatsChange"
        >
          <span class="query_title">销售机构</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="onSearch">搜索</LinkButton>
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
      :data="BasicDatalist"
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
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv">
        <template slot="body" slot-scope="scope">
          <LinkButton class="btnEdit" @click="handleEdit(scope.$index, scope.row)">编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Code" title="分组编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="分组名称" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="BusinessformatName" title="业态" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.BusinessformatName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="OrganizationName" title="机构" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.OrganizationName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorName" title="最后修改人" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.LastUpdatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorTime" title="最后修改时间" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.LastUpdatorTime}}</div>
        </template>
      </GridColumn>
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
      ref="BasicData"
      title="员工分组"
      :dialogStyle="{width:'470px',height:'375px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="BasicDataForm" class="formStyle formTop" ref="formvalidate" :rules="rules" @validate="errors=$event">
        <div class="formStyle_list">
          <Label for="formats">业态</Label>
          <ComboBox
            placeholder="业态"
            v-model="BasicDataForm.BusinessformatId"
            :data="FormformatsData"
            valueField="Id"
            textField="Name"
            class="pr-10"
            @selectionChange="formatsChangeVAL"
            name="BusinessformatId"
            v-Tooltip="getTipOpts('BusinessformatId')"
          >
            <span class="c-red starpos">*</span>
          </ComboBox>
        </div>
        <div class="formStyle_list">
          <Label for="OrganizationId">所属机构</Label>
          <ComboBox
            v-model="BasicDataForm.OrganizationId"
            :data="Organization"
            valueField="Id"
            textField="Name"
            class="pr-10"
            name="OrganizationId"
            v-Tooltip="getTipOpts('OrganizationId')"
          >
            <span class="c-red starpos">*</span>
          </ComboBox>
        </div>
        <div class="formStyle_list">
          <Label for="superiorGroup">上级分组</Label>
          <SearchBox
            placeholder="上级分组"
            v-model="BasicDataForm.ParentName"
            @search="GroupData()"
            class="pr-20"
            name="ParentName"
            v-Tooltip="getTipOpts('ParentName')"
          >
            <Addon>
              <span
                v-if="BasicDataForm.ParentName"
                class="iconmessage-close iconfont f-12 f-r"
                title="Clear value"
                @click="BasicDataForm.ParentName=null;BasicDataForm.ParentId=null"
              ></span>
            </Addon>
            <span class="c-red starpos">*</span>
          </SearchBox>
        </div>
        <div class="formStyle_list">
          <Label for="Name">分组名称</Label>
          <TextBox inputId="Name" name="Name" v-model="BasicDataForm.Name" v-Tooltip="getTipOpts('Name')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <!-- <div class="formStyle_list">
          <Label for="Code">分组编码</Label>
          <TextBox inputId="Code" name="Code" v-model="BasicDataForm.Code">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>-->

        <!-- <div class="f-r mt-20">
          <LinkButton @click="$refs.BasicData.close()" class="btnCancel btn radius">取消</LinkButton>
          <LinkButton
            v-if="dialogStatus=='create'"
            @click="submitForm()"
            class="btnConfirm btn radius"
          >确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm btn radius">保存</LinkButton>
        </div> -->
      </Form>
      <template v-slot:footer>
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        <LinkButton @click="$refs.BasicData.close()" class="btnCancel">取消</LinkButton>
      </template>
    </Dialog>
    <!-- 上级分组 -->
    <Dialog
      ref="publicDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="分组"
    >
      <institutionsData @childValue="getchildValue" :organizationId="organizationId"></institutionsData>
    </Dialog>
  </div>
</template>
<script>
import InstitutionsData from "@/components/grouping";
import {
  UserInfoGroupList,
  UserInfoGroupRemove,
  UserInfoGroupEdit,
  UserInfoGroupAdd,
  UserInfoGroupSearch,
  UserInfoGroupEditSave,
  FormatData,
  GetListOrganization,
  GetOrgByUser
} from "@/api/Service";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //
      formatsName: "",
      StateTypeData: [],
      FormatsVal: "",
      coding: "",
      formatsData: [],
      //table
      terminalList: [],
      OrganizationId: "",
      OrganizationIdData: [],
      gridHeight: false,
      ParentName: "",
      organizationId: "",
      BasicDatalist: [],
      dialogStatus: "",
      custome: "",
      number: "",
      Serial: "",
      CodeOrName: "",
      //分页
      SearchBox: "",
      total: 0,
      pageSize: 20,
      pageNumber: 1,
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
      FormformatsData: [],
      Organization: [],
      BasicDataForm: {
        BusinessformatId: "", //业态标识
        BusinessformatCode: "",
        BusinessformatName: "",
        OrganizationId: "",
        OrganizationCode: "",
        OrganizationName: "",
        NameRealation: "",
        ParentName: "",
        ParentId: null, //父级分组
        Name: "" //员工分组名称
      },
      rules: {
        Name: "required",
        BusinessformatId: "required",
        OrganizationId: "required",
        ParentName: "required"
      },
      errors: {},
    };
  },
  components: {
    InstitutionsData
  },
  methods: {
    queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1 = !this.iconxiangshang1;
      this.iconxiangxia1 = !this.iconxiangxia1;
      let that = this;
      setTimeout(function() {
        that.gridHeight = that.resizeTable();
      }, 0);
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
        OrganizationId: this.OrganizationId,
        CodeOrName: this.CodeOrName
      };
      console.log(para);
      UserInfoGroupList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.BasicDatalist = res.Result.Rows;
      });
    },
    //删除
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.confirm({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: row.Id };
            console.log(para);
            UserInfoGroupRemove(para).then(res => {
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
      this.formatsChangeVAL();
      this.$refs.BasicData.open();
      this.dialogStatus = "update";
      const para = { Id: row.Id };
      console.log(para);
      UserInfoGroupEdit(para).then(res => {
        console.log("编辑", res.Result);
        this.BasicDataForm = {
          Name: res.Result.Data.Name,
          Code: res.Result.Data.Code,
          // IdRealation: res.Result.Data.IdRealation,
          NameRealation: res.Result.Data.NameRealation,
          ParentId: res.Result.Data.ParentId,
          BusinessformatId: res.Result.Data.BusinessformatId,
          BusinessformatCode: res.Result.Data.BusinessformatCode,
          BusinessformatName: res.Result.Data.BusinessformatName,
          OrganizationId: res.Result.Data.OrganizationId,
          OrganizationCode: res.Result.Data.OrganizationCode,
          OrganizationName: res.Result.Data.OrganizationName,
          Id: res.Result.Data.Id,
          ParentName: res.Result.Data.ParentName
        };
        // this.ParentName = res.Result.Data.NameRealation;
      });
    },
    saveForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
        } else {
            this.submitFormFn();
        }   
      });  
    },
    saveFormFn(index, row) {
      var obj = this.findObjectFromArray(
        this.FormformatsData,
        "Id",
        this.BasicDataForm.BusinessformatId
      );
      var arr = this.findObjectFromArray(
        this.Organization,
        "Id",
        this.BasicDataForm.OrganizationId
      );

      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            const para1 = {
              BusinessformatName: obj.Name,
              BusinessformatCode: obj.Code,
              OrganizationCode: arr.Code,
              OrganizationName: arr.Name
            };
            const para = Object.assign({}, this.BasicDataForm, para1);
            console.log("编辑提交", para);
            UserInfoGroupEditSave(para).then(res => {
              this.getUsers();
              this.$refs.BasicData.close();
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
      this.$refs.BasicData.open();
      this.dialogStatus = "create";
      this.BasicDataForm = {
        Name: "",
        NameRealation: "",
        ParentId: null,
        BusinessformatId: "",
        BusinessformatCode: "",
        BusinessformatName: "",
        OrganizationId: "",
        OrganizationCode: "",
        OrganizationName: "",
        ParentName: ""
      };
    },
    submitForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
        } else {
            this.submitFormFn();
        }   
      });  
    },
    //添加
    submitFormFn: function() {
      var obj = this.findObjectFromArray(
        this.FormformatsData,
        "Id",
        this.BasicDataForm.BusinessformatId
      );
      var arr = this.findObjectFromArray(
        this.Organization,
        "Id",
        this.BasicDataForm.OrganizationId
      );
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            const para1 = {
              BusinessformatCode: obj.Code,
              BusinessformatName: obj.Name,
              OrganizationCode: arr.Code,
              OrganizationName: arr.Name
            };
            const para = Object.assign({}, this.BasicDataForm, para1);
            console.log(para);
            UserInfoGroupAdd(para).then(res => {
              this.getUsers();
              this.$refs.BasicData.close();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              console.log(res.Result.Message);
            });
          }
        }
      });
    },
    //业态
    formatsChangeVAL() {
      this.BasicDataForm.OrganizationId = "";
      FormatData().then(res => {
        this.FormformatsData = res.Result.Data;
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
        }
      });
    },
    GroupData() {
      this.BasicDataForm.ParentId = null;
      this.BasicDataForm.NameRealation = "";
      if (
        this.BasicDataForm.OrganizationId != "" &&
        this.BasicDataForm.OrganizationId != null
      ) {
        this.$refs.publicDialog.open();
        this.organizationId = this.BasicDataForm.OrganizationId;
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先选择机构"
        });
      }
    },
    //分组传值
    getchildValue(data) {
      console.log(data);
      if (data != "" && data != null) {
        this.BasicDataForm.ParentName = data.text;
        this.BasicDataForm.ParentId = data.id;
      } else {
        this.BasicDataForm.ParentId = null;
        this.BasicDataForm.ParentName = "";
      }
      this.$refs.publicDialog.close();
    },
    //机构
    formatsChange() {
      GetListOrganization().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
      });
    },

    //在数组冲查询出来一个对象,这样可以了
    findObjectFromArray(arr, key, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) {
          return arr[i];
        }
      }
    },
    // 头部搜索
    onSearch(index, row) {
      this.getUsers();
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
    }
  },
  mounted() {
    this.getUsers();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
</style>

