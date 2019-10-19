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
        <DateBox v-model="StartDate" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(起)</span>
        </DateBox>
        <DateBox v-model="EndDate" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(止)</span>
        </DateBox>
        <TextBox v-model="GrowthName" placeholder>
          <span class="query_title">成长值名称</span>
          <Addon>
            <span
              v-if="GrowthName"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="GrowthName=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="RewardTypeId"
          :data="RewardwayType"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">奖励方式</span>
        </ComboBox>
        <ComboBox
          v-model="StateTypeId"
          :data="StateType"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">状态</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius iconfont iconadd f-16" @click="handleAdd">添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <DataGrid
      :data="Menberlist"
      :pagination="true"
      class
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
        <template slot="body" slot-scope="scope" style="width:200px">
          <LinkButton
            class="btnEdit"
            @click="$refs.MenberAddDialog.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
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
      <GridColumn field="Name" title="成长值名称" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Type" title="类型" width="100" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.Type}}</div>
        </template>
      </GridColumn>
      <GridColumn field="HowGrowthValue" title="奖励" width="100" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.HowGrowthValue}}</div>
        </template>
      </GridColumn>
      <GridColumn field="ValidTime" title="有效期" width="220" align="center"></GridColumn>
      <GridColumn field="State" title="状态" width="100" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.State}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorName" title="操作人" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.LastUpdatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorTime" title="操作时间" width="180" align="center">
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
      title="会员成长值"
      :dialogStyle="{width:'640px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="MenberDialogForm" class="formStyle FormTop box" ref="formvalidate" :rules="rules" @validate="errors=$event">
        <div class="form_box">
          <div class="formStyle_list">
            <Label for="Name">名称</Label>
            <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.Name" v-Tooltip="getTipOpts('Name')">
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Type">类型</Label>
            <ComboBox
              inputId="Type"
              v-model="MenberDialogForm.Type"
              :data="RewardType"
              valueField="Code"
              textField="Name"
              placeholder="奖励类型"
            ></ComboBox>
          </div>
          <div class="formStyle_list" v-if="this.MenberDialogForm.Type==0">
            <Label for="HowMoney">成长值</Label>
            <span>整单销售额每</span>
            <NumberBox
              inputId="HowMoney"
              :precision="2"
              :spinners="false"
              style="width:80px"
              :min="1"
              v-model="MenberDialogForm.HowMoney"
              name="HowMoney"
              v-Tooltip="getTipOpts('HowMoney')"
            ><span class="c-red starpos">*</span></NumberBox>
            <span>元奖励1个成长值</span>
          </div>

          <div class="formStyle_list" v-if="this.MenberDialogForm.Type==1">
            <Label for="HowGrowthValue">成长值</Label>
            <span>到店一次奖励</span>
            <NumberBox
              inputId="HowGrowthValue"
              :spinners="false"
              style="width:80px"
              v-model="MenberDialogForm.HowGrowthValue"
              name="HowGrowthValue"
              v-Tooltip="getTipOpts('HowGrowthValue')"
            ><span class="c-red starpos">*</span></NumberBox>
            <span>个成长值（一天最多奖励一次）</span>
          </div>

          <div class="formStyle_list" v-if="this.MenberDialogForm.Type==3">
            <Label for="HowGrowthValue">成长值</Label>
            <span>评价一次奖励</span>
            <NumberBox
              inputId="HowGrowthValue"
              :spinners="false"
              style="width:80px"
              v-model="MenberDialogForm.HowGrowthValue"
              name="HowGrowthValue"
              v-Tooltip="getTipOpts('HowGrowthValue')"
            ><span class="c-red starpos">*</span></NumberBox>
            <span>个成长值</span>
          </div>

          <div class="formStyle_list" v-if="this.MenberDialogForm.Type==2">
            <Label for="HowGrowthValue">成长值</Label>
            <span>参加一次营销活动奖励</span>
            <NumberBox
              inputId="HowGrowthValue"
              :spinners="false"
              style="width:80px"
              v-model="MenberDialogForm.HowGrowthValue"
              name="HowGrowthValue"
              v-Tooltip="getTipOpts('HowGrowthValue')"
            ><span class="c-red starpos">*</span></NumberBox>
            <span>个成长值</span>
          </div>

          <div class="formStyle_list">
            <Label for="validity">有效期</Label>
            <ComboBox
              v-model="MenberDialogForm.GrowthValueDateType"
              :data="fruits"
              valueField="Code"
              textField="Name"
              name="GrowthValueDateType"
              v-Tooltip="getTipOpts('GrowthValueDateType')"
            ><span class="c-red starpos">*</span></ComboBox>
          </div>

          <div v-if="this.MenberDialogForm.GrowthValueDateType==1" class="formStyle_list">
            <Label for="validity">日期</Label>
            <DateBox v-model="StartTime" format="yyyy-MM-dd" name="StartTime"
              v-Tooltip="getTipOpts('StartTime')"><span class="c-red starpos">*</span></DateBox>至
            <DateBox v-model="EndTime" format="yyyy-MM-dd" name="EndTime"
              v-Tooltip="getTipOpts('EndTime')"><span class="c-red starpos">*</span></DateBox>
          </div>

          <div class="formStyle_list formStyle_list2">
            <Label for="Remark">备注</Label>
            <TextBox
              inputId="Remark"
              :multiline="true"
              name="Remark"
              v-model="MenberDialogForm.Remark"
            ></TextBox>
          </div>
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
  MemberthManagementList,
  MemberthManagementRemove,
  MemberthManagementEdit,
  MemberthManagementAdd,
  MemberthManagementEditSave,
  MemberthManagementType,
  GetEnumList
} from "@/api/members";
// import { parseTime } from "@/utils/index";
import dayjs from "dayjs";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      StartDate: dayjs()
        .add(-1, "month")
        .toDate(),
      EndDate: dayjs().toDate(),
      GrowthName: "",
      StateTypeId: null,
      RewardTypeId: null,
      RewardwayType: [],
      StateType: [],
      //DataGrid
      Menberlist: [],
      dialogStatus: "",
      StateText: "",
      State: [],
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
      fruits: [],
      validity: 0,
      RewardType: [],
      EndTime: dayjs().toDate(),
      StartTime: dayjs().toDate(),
      MenberDialogForm: {
        Name: "",
        Remark: "",
        HowMoney: 1,
        Type: 0,
        GrowthValueDateType: 0,
        StartTime: dayjs().toDate(),
        EndTime: dayjs().toDate(),
        State: 1,
        HowGrowthValue: 1
      },
      rules: {
        Name: "required",
        HowMoney: "required",
        HowGrowthValue: "required",
        StartTime: "required",
        EndTime: "required",
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
        Name: this.GrowthName,
        Type: this.RewardTypeId,
        State: this.StateTypeId,
        OperationDateStart:
          dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00",
        OperationDateEnd: dayjs(this.EndDate).format("YYYY-MM-DD") + " 23:59:59"
      };
      console.log(para);
      MemberthManagementList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
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
            MemberthManagementRemove(para).then(res => {
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
      MemberthManagementEdit(para).then(res => {
        console.log(res.Result);
        // debugger
        this.MenberDialogForm = {
          Name: res.Result.Data.Name,
          GrowthValueDateType: res.Result.Data.GrowthValueDateType,
          Type: res.Result.Data.Type,
          HowMoney: res.Result.Data.HowMoney,
          Remark: res.Result.Data.Remark,
          Id: res.Result.Data.Id,
          Code: res.Result.Data.Code,
          HowGrowthValue: res.Result.Data.HowGrowthValue
        };
        this.EndTime = new Date(res.Result.Data.EndTime);
        this.StartTime = new Date(res.Result.Data.StartTime);
      });
    },
    saveForm(index, row) {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            if (this.MenberDialogForm.GrowthValueDateType == 1) {
              this.MenberDialogForm.StartTime = dayjs(this.StartTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              this.MenberDialogForm.EndTime = dayjs(this.EndTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            } else {
              this.MenberDialogForm.StartTime = null;
              this.MenberDialogForm.EndTime = null;
            }
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            MemberthManagementEditSave(para).then(res => {
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
    saveFormFn(){
      this.$refs.form.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
          return false;
        }else {
          this.saveForm();
        }
      });  
    },
    //添加
    // 显示新增界面
    handleAdd() {
      this.dialogStatus = "create";
      this.$refs.MenberAddDialog.open();
      this.MenberDialogForm = {
        Name: "",
        Remark: "",
        HowMoney: 1,
        Type: 0,
        StartTime: dayjs().toDate(),
        EndTime: dayjs().toDate(),
        GrowthValueDateType: 0,
        HowGrowthValue: 1
      };
      this.StartTime = dayjs().toDate();
      this.EndTime = dayjs().toDate();
      this.validity = 0;
    },
    submitForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        console.log(this.MenberDialogForm);
        console.log(this.MenberDialogForm.Type);
        if(this.MenberDialogForm.Type==0){ //HowMoney
                console.log(11111);
            if(valid){
              console.log(222);
                this.$messager.alert({
                  title: "提示",
                  msg: "必输项不正确"
                });
            } else {
              console.log(3333);
                this.submitFormFn();
            }
        } else { //HowGrowthValue
        console.log(44444);
          if(valid){
                this.$messager.alert({
                  title: "提示",
                  msg: "必输项不正确"
                });
                return false;
            } else {
                this.submitFormFn();
            }
        }
      });  
    },
    submitFormFn(){
        this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            if (this.MenberDialogForm.GrowthValueDateType == 1) {
              this.MenberDialogForm.StartTime = dayjs(this.StartTime).format(
                "YYYY-MM-DD" + " 00:00:00"
              );
              this.MenberDialogForm.EndTime = dayjs(this.EndTime).format(
                "YYYY-MM-DD" + " 23:59:59"
              );
            } else {
              this.MenberDialogForm.StartTime = null;
              this.MenberDialogForm.EndTime = null;
            }

            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            MemberthManagementAdd(para).then(res => {
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
    MenberSearchTop(index, row) {
      
      this.getUsers();
    },
    //启用
    disableBtn(index, row) {
      var state = 0;
      if (row.State == "停用") {
        state = 1;
      } else {
        state = 0;
      }
      const para = {
        Id: row.Id,
        State: state
      };
      console.log(para);
      MemberthManagementType(para).then(res => {
        console.log(res.Result);
        this.getUsers();
      });
    },
    //状态
    StateMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateType = res.Result.Data;
      });
    },
    //成长值状态,奖励方式
    TypeMode() {
      const para = {
        EnumType: "Type_Mode"
      };
      GetEnumList(para).then(res => {
        res.Result.Data.unshift({ Code: null, Name: "全部" });
        console.log(res.Result);
        this.RewardType = res.Result.Data;
        this.RewardwayType = res.Result.Data;
        // this.RewardwayType.unshift({
        //   Id: null,
        //   Code: null,
        //   Name: "全部"
        // });
      });
    },
    //有效期MarketingExpireDateTypeEnum
    DateMode() {
      const para = {
        EnumType: "MarketingExpireDateTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.fruits = res.Result.Data;
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
    this.TypeMode();
    this.StateMode();
    this.DateMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style>
.error {
  color: red;
  font-size: 12px;
  margin: 4px 0;
}
.box{
  position: relative;
}
.button_bottom{
  position: fixed;
  margin-left: 10%;
}
</style>


