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
        <TextBox v-model="MenberSearchTop" placeholder>
          <span class="query_title">标签名称</span>
          <Addon>
            <span
              v-if="MenberSearchTop"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="MenberSearchTop=null"
            ></span>
          </Addon>
        </TextBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="SearchTop">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="$refs.MenberAddDialog.open();dialogStatus ='create';MenberDialogForm={}"
      >添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <DataGrid
      :data="Menberlist"
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
      <GridColumn align="center" title="操作" field="custome-adv" width="120px">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.MenberAddDialog.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="标签名称" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="MemberCount" title="会员人数" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.MemberCount}}</div>
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
        :layout="pagelayout"
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>-->
    <!-- 弹框 -->
    <Dialog
      ref="MenberAddDialog"
      title="会员标签"
      :dialogStyle="{width:'450px',height:'210px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="MenberDialogForm" class="formStyle FormTop" ref="formvalidate" :rules="rules" @validate="errors=$event">
        <div class="formStyle_list">
          <Label for="Name">名称</Label>
          <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.Name" placeholder="请输入标签名称"  v-Tooltip="getTipOpts('Name')">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <!-- <div class="f-r mt-30">
          <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel btn radius">取消</LinkButton>
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
        <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel">取消</LinkButton>
      </template>
    </Dialog>
  </div>
</template>
<script>
import {
  MemberTagList,
  MemberTagRemove,
  MemberTagEdit,
  MemberTagAdd,
  MemberTagEditSave
} from "@/api/members";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      MenberSearchTop: "",
      //DataGrid
      Menberlist: [],
      dialogStatus: "",
      //分页
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
      MenberDialogForm: {
        Name: "",
        Id: ""
      },
      rules: {
        Name: "required"
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
        Name: this.MenberSearchTop
      };
      console.log(para);
      MemberTagList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
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
            MemberTagRemove(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              this.getUsers();
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
      MemberTagEdit(para).then(res => {
        console.log(res.Result);
        this.MenberDialogForm.Name = res.Result.Data.Name;
        this.MenberDialogForm.Id = res.Result.Data.Id;
      });
    },
    saveForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "请输入标签名称"
          });
        } else {
            this.saveFormFn();
        }   
      });  
    },
    saveFormFn() {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            const para = {
              Name: this.MenberDialogForm.Name,
              Id: this.MenberDialogForm.Id
            };
            MemberTagEditSave(para).then(res => {
              this.getUsers();
              this.$refs.MenberAddDialog.close();
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
            msg: "请输入标签名称"
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
            const para = {
              Code: parseInt(Math.random() * 100).toString(),
              Name: this.MenberDialogForm.Name
            };
            console.log(para);
            MemberTagAdd(para).then(res => {
              this.getUsers();
              this.$refs.MenberAddDialog.close();
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
    SearchTop() {
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
    },
  },
  mounted() {
    this.getUsers();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style>
</style>

