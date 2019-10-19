<template>
  <div class="container pt-15">
    <!-- <div class="conTop">
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
    </div> -->

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
      <GridColumn field="Code" title="方案编号" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="方案名称" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="BusinessformatName" title="所属业态" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.BusinessformatName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorName" title="最后修改人" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.LastUpdatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorTime" title="最后修改时间" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.LastUpdatorTime}}</div>
        </template>
      </GridColumn>
    </DataGrid>
    <!-- 分页 -->
    <!-- <template slot="footer">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNumber="pageNumber"
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>-->
    <!-- 弹框 -->
    <Dialog
      ref="BasicData"
      title="基础资料方案"
      :dialogStyle="{width:'480px',height:'570px'}"
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
            inputId="formats"
            v-model="BasicDataForm.BusinessformatId"
            :data="dialogfor"
            valueField="Id"
            textField="Name"
            placeholder="请选择业态"
            @filterChange="dialogforVal"
            name="BusinessformatId"
            v-Tooltip="getTipOpts('BusinessformatId')"
          ><span class="c-red starpos">*</span></ComboBox>
        </div>
        <div class="formStyle_list">
          <Label for="formats">ERP版本</Label>
          <ComboBox
            inputId="formats"
            v-model="BasicDataForm.ERPType"
            :data="ERPTypeList"
            valueField="Id"
            textField="Name"
            placeholder="请选择ERP版本"
            name="ERPType"
            v-Tooltip="getTipOpts('ERPType')"
          ><span class="c-red starpos">*</span></ComboBox>
        </div>
        <div class="formStyle_list">
          <Label for="Name">方案</Label>
          <TextBox inputId="Name" name="Name" v-model="BasicDataForm.Name" placeholder="请输入方案" v-Tooltip="getTipOpts('Name')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="DBAddress">数据库地址</Label>
          <TextBox inputId="DBAddress" name="DBAddress" v-model="BasicDataForm.DBAddress" v-Tooltip="getTipOpts('DBAddress')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="DBPort">端口号</Label>
          <NumberBox
            inputId="DBPort"
            name="DBPort"
            :increment="1"
            :spinners="false"
            v-model="BasicDataForm.DBPort"
            :min="0"
            v-Tooltip="getTipOpts('DBPort')"
          >
            <span class="c-red starpos">*</span>
          </NumberBox>
        </div>
        <div class="formStyle_list">
          <Label for="DBName">数据库名称</Label>
          <TextBox inputId="DBName" name="DBName" v-model="BasicDataForm.DBName" v-Tooltip="getTipOpts('DBName')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="DBUserName">数据库用户名</Label>
          <TextBox inputId="DBUserName" name="DBUserName" v-model="BasicDataForm.DBUserName" v-Tooltip="getTipOpts('DBUserName')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="DBPassword">数据库密码</Label>
          <TextBox inputId="DBPassword" name="DBPassword" v-model="BasicDataForm.DBPassword" v-Tooltip="getTipOpts('DBPassword')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="Remark">备注</Label>
          <TextBox inputId="t2" :multiline="true" v-model="BasicDataForm.Remark"></TextBox>
        </div>
        <!-- <div class="f-r mt-30">
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
  ServiceList,
  ServiceRemove,
  ServiceEdit,
  ServiceAdd,
  FormatData,
  ServiceEditSave
} from "@/api/Service.js";
export default {
  data() {
    return {
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
      dialogfor: [],
      ERPTypeList: [
        {
          Id: "1",
          Name: "商翼"
        },
        {
          Id: "12",
          Name: "客易宝"
        }
      ],
      BasicDataForm: {
        BusinessformatId: "",
        BusinessformatName: "",
        BusinessformatCode: "",
        Name: "",
        ERPType: "",
        DBAddress: "",
        DBName: "",
        DBUserName: "",
        DBPort: "",
        DBPassword: "",
        Remark: ""
      },
      rules: {
        BusinessformatId: "required",
        ERPType: "required",
        Name: "required",
        DBAddress: "required",
        DBPort: "required",
        DBName: "required",
        DBUserName: "required",
        DBPassword: "required",
      },
      errors: {},
    };
  },
  methods: {
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
      ServiceList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.BasicDatalist = res.Result.Rows;
        console.log(this.total);
      });
    },
    //业态
    dialogforVal() {
      FormatData().then(res => {
        console.log(res.Result);
        this.dialogfor = res.Result.Data;
        console.log(this.dialogfor);
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
            ServiceRemove(para).then(res => {
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
      this.BasicDataForm = {};
      console.log(para);
      this.dialogforVal();
      ServiceEdit(para).then(res => {
        console.log(res.Result);
        this.BasicDataForm.Id = res.Result.Data.Id;
        this.BasicDataForm.BusinessformatId = res.Result.Data.BusinessformatId;
        this.BasicDataForm.BusinessformatName =
          res.Result.Data.BusinessformatName;
        this.BasicDataForm.BusinessformatCode =
          res.Result.Data.BusinessformatCode;
        this.BasicDataForm.Name = res.Result.Data.Name;
        this.BasicDataForm.DBAddress = res.Result.Data.DBAddress;
        this.BasicDataForm.DBName = res.Result.Data.DBName;
        this.BasicDataForm.DBUserName = res.Result.Data.DBUserName;
        this.BasicDataForm.DBPort = res.Result.Data.DBPort;
        this.BasicDataForm.DBPassword = res.Result.Data.DBPassword;
        this.BasicDataForm.Remark = res.Result.Data.Remark;
        this.BasicDataForm.Code = res.Result.Data.Code;
        this.BasicDataForm.ERPType = res.Result.Data.ERPType;
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
        this.dialogfor,
        "Id",
        this.BasicDataForm.BusinessformatId
      );
      console.log(obj);
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            const para1 = {
              BusinessformatCode: obj.Code,
              BusinessformatName: obj.Name
            };
            const para = Object.assign({}, this.BasicDataForm, para1);
            console.log(para);
            ServiceEditSave(para).then(res => {
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
      var obj = this.findObjectFromArray(
        this.dialogfor,
        "Id",
        this.BasicDataForm.BusinessformatId
      );
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            const para1 = {
              BusinessformatCode: obj.Code,
              BusinessformatName: obj.Name
            };
            this.BasicDataForm.Code = parseInt(Math.random() * 100).toString();
            const para = Object.assign({}, this.BasicDataForm, para1);
            console.log(para);
            ServiceAdd(para).then(res => {
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
    //在数组冲查询出来一个对象,这样可以了
    findObjectFromArray(arr, key, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) {
          return arr[i];
        }
      }
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
    this.gridHeight = this.resizeTable();
  }
};
</script>

