<template>
  <div class="container pt-15">
   <!-- <div class="conTop">
     <div class="topTitle">
        <p class="f-l">
          <span></span>筛选条件
        </p>
        <p class="f-r c-blue" @click="queryToggle">
          <i class="iconfont  f-14" :class="{'icongengduo1-copy':iconxiangshang1,'icongengduo1-copy-copy':iconxiangxia1}" ></i>收起
        </p>
        <p class="f-r screeningBtn">保存筛选条件</p>
        <p class="f-r historyBtn">使用历史条件</p>
      </div>
   </div> -->
      <!-- 搜索 -->
    <!-- table -->
      <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius iconfont iconadd f-16"  @click="$refs.BasicData.open();dialogStatus ='create';BasicDataForm={}">添加</LinkButton>
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
      <GridColumn
        align="center"
        field="Id"
        type="index"
        cellCss="datagrid-td-rownumber"
        width="50"
        title="序号"
      >
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.BasicData.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Code" title="业态编码">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="业态名称" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Type" title="类型" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Type}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Structure" title="架构" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Structure}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorName" title="最后修改人" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.LastUpdatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorTime" title="最后修改时间" align="center" width="200">
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
      title="业态管理"
      :dialogStyle="{width:'480px',height:'580px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="BasicDataForm" class="formStyle formTop" ref="formvalidate" :rules="rules" @validate="errors=$event">
        <!-- <div class="formStyle_list">
          <Label for="Code">业态编码</Label>
          <TextBox inputId="Code" name="Code" v-model="BasicDataForm.Code" placeholder="请输入业态编码">
             <span class="c-red starpos">*</span>
          </TextBox>
        </div>-->
        <div class="form_box">
          <div class="formStyle_list">
            <Label for="Name">业态名称</Label>
            <TextBox inputId="Name" name="Name" v-model="BasicDataForm.Name" placeholder="请输入业态名称" v-Tooltip="getTipOpts('Name')">
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Type">业态类型</Label>
            <ComboBox
              inputId="Structure"
              v-model="BasicDataForm.Type"
              :data="TypeList"
              valueField="Code"
              textField="Name"
              placeholder="请选择业态类型"
              class="pr-20"
              name="Type"
              v-Tooltip="getTipOpts('Type')"
            >
              <span class="c-red starpos">*</span>
            </ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="Structure">架构</Label>
            <ComboBox
              inputId="Structure"
              v-model="BasicDataForm.Structure"
              :data="StructureList"
              valueField="Code"
              textField="Name"
              placeholder="请选择架构"
              class="pr-20"
              name="Structure"
              v-Tooltip="getTipOpts('Structure')"
            >
              <span class="c-red starpos">*</span>
            </ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="Contacts">联系人</Label>
            <TextBox
              inputId="Contacts"
              name="Contacts"
              v-model="BasicDataForm.Contacts"
              placeholder="请输入联系人姓名"
            ></TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Phone">电话</Label>
            <TextBox
              inputId="Phone"
              name="Phone"
              v-model="BasicDataForm.Phone"
              placeholder="请输入联系人电话"
            ></TextBox>
          </div>
        </div>
        <!-- <div class="f-r mt-25">
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
  </div>
</template>
<script>
import {
  FormatList,
  FormatRemove,
  FormatEdit,
  FormatAdd,
  FormatData,
  FormatEditSave,
  GetEnumList
} from "@/api/Service.js";
export default {
  data() {
    return {
       ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
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
      BasicDatalist: [],
      dialogStatus: "",
      TypeList: [],
      StructureList: [],
      BasicDataForm: {
        Type: "",
        Name: "",
        Code: "",
        Structure: "",
        Contacts: "",
        Phone: ""
      },
      rules: {
        Name: "required",
        Type: "required",
        Structure: "required"
      },
      errors: {},
    };
  },
  methods: {
     queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1=!this.iconxiangshang1;
      this.iconxiangxia1=!this.iconxiangxia1;
      let that = this;
      setTimeout(function(){
        that.gridHeight = that.resizeTable();
      },0)
    },

    //业态类型
    StructureMode() {
      const para = {
        EnumType: "Business_Structure"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StructureList = res.Result.Data;
      });
    },
    //业态架构
    BusinessMode() {
      const para = {
        EnumType: "Business_Type"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.TypeList = res.Result.Data;
      });
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
        rows: this.pageSize
      };
      FormatList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.BasicDatalist = res.Result.Rows;
        console.log(this.BasicDatalist);
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
            FormatRemove(para).then(res => {
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
      const para = { Id: row.Id };
      console.log(para);
      FormatEdit(para).then(res => {
        console.log(res.Result);
        this.BasicDataForm = {
          Id: res.Result.Data.Id,
          Code: res.Result.Data.Code,
          Name: res.Result.Data.Name,
          Contacts: res.Result.Data.Contacts,
          Phone: res.Result.Data.Phone,
          Type: res.Result.Data.Type,
          Structure: res.Result.Data.Structure
        };
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
      this.$messager.confirm({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            const para = Object.assign({}, this.BasicDataForm);
            console.log(para);
            FormatEditSave(para).then(res => {
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
      this.$messager.confirm({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            // this.BasicDataForm.Code = parseInt(Math.random() * 100).toString();
            const para = Object.assign({}, this.BasicDataForm);
            console.log(para);
            FormatAdd(para).then(res => {
              this.getUsers();
              this.$refs.BasicData.close();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              // console.log(res.Result.Message);
            });
          }
        }
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
    this.BusinessMode();
    this.StructureMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>

