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
        <TextBox v-model="SearchBoxValue" placeholder>
          <span class="query_title">名称/编号</span>
          <Addon>
            <span
              v-if="SearchBoxValue"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="SearchBoxValue=null"
            ></span>
          </Addon>
        </TextBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="onSearch">搜索</LinkButton>
      </div>
    </div>
    <p class="pstyle">
      <LinkButton
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="$refs.BasicData.open();dialogStatus ='create';BasicDataForm={}"
      >添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>

    <DataGrid
      :data="BasicDatalist"
      :pagination="true"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
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
          <LinkButton
            class="btnEdit"
            @click="$refs.BasicData.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Code" title="区域编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="区域名称" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Name}}</div>
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
      title="机构区域"
      :dialogStyle="{width:'460px',height:'285px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="BasicDataForm" class="formStyle formTop" ref="formvalidate" :rules="rules" @validate="errors=$event">
        <div class="formStyle_list">
          <Label for="superiorGroup">上级区域</Label>
          <ComboBox
            :data="Parentdata"
            v-model="BasicDataForm.ParentId"
            placeholder="上级区域"
            valueField="Id"
            textField="Name"
            class="pr-20"
            name="ParentId"
            v-Tooltip="getTipOpts('ParentId')"
          >
            <span class="c-red starpos">*</span>
            <!-- <ComboTree v-model="BasicDataForm.ParentName" placeholder="上级区域" > -->
            <!-- <Tree slot="tree"></Tree> -->
          </ComboBox>
        </div>
        <!-- <div class="formStyle_list">
          <Label for="Code">区域编码</Label>
          <TextBox inputId="Code" name="Code" v-model="BasicDataForm.Code">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>-->
        <div class="formStyle_list">
          <Label for="Name">区域名称</Label>
          <TextBox inputId="Name" name="Name" v-model="BasicDataForm.Name" v-Tooltip="getTipOpts('Name')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
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
  </div>
</template>
<script>
import {
  OrganizaList,
  OrganizaRemove,
  OrganizaEdit,
  OrganizaAdd,
  OrganizaEditSave,
  Organization
} from "@/api/Service";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      //DataGrid
      BasicDatalist: [],
      dialogStatus: "",
      Parentdata: [],
      //分页
      SearchBoxValue: "",
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
      BasicDataForm: {
        Id: "",
        // Code: "", //业态标识
        Name: "", //机构标识
        ParentId: null, //分组说明
        ParentCode: "", //父级分组
        ParentName: "" //员工分组编码
      },
      rules: {
        Name: "required",
        ParentId: "required"
      },
      errors: {},
    };
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
        CodeOrName: this.SearchBoxValue
      };
      OrganizaList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.BasicDatalist = res.Result.Rows;
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
            OrganizaRemove(para).then(res => {
              this.getUsers();
              this.ParentList();
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
      OrganizaEdit(para).then(res => {
        console.log(res.Result);
        this.BasicDataForm = {
          Name: res.Result.Data.Name,
          Code: res.Result.Data.Code,
          Id: res.Result.Data.Id,
          ParentId: res.Result.Data.ParentId,
          ParentCode: res.Result.Data.ParentCode,
          ParentName: res.Result.Data.ParentName
        };
      });
    },
    saveForm: function(index, row) {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
        } else {
            this.saveFormFn(index, row);
        }   
      });  
    },
    saveFormFn(index, row) {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            const para = Object.assign({}, this.BasicDataForm);
            console.log(para);
            OrganizaEditSave(para).then(res => {
              this.getUsers();
              this.ParentList();
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
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            const para = Object.assign({}, this.BasicDataForm);
            console.log(para);
            OrganizaAdd(para).then(res => {
              this.getUsers();
              this.ParentList();
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
    // 头部搜索
    onSearch(index, row) {
      this.getUsers();
    },
    //上级区域
    ParentList() {
      Organization().then(res => {
        console.log(res.Result);
        this.Parentdata = res.Result.Data;
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
    }
  },
  mounted() {
    this.getUsers();
    this.ParentList();
    this.gridHeight = this.resizeTable();
  }
};
</script>


