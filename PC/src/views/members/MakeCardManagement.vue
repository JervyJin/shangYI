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
          <span class="query_title">开始日期(起)</span>
        </DateBox>
        <DateBox v-model="EndDate" format="yyyy-MM-dd" placeholder>
          <span class="query_title">开始日期(止)</span>
        </DateBox>
        <TextBox v-model="BatchNo" placeholder=" ">
          <span class="query_title">制卡批次</span>
          <Addon>
            <span
              v-if="BatchNo"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="BatchNo=null"
            ></span>
          </Addon>
        </TextBox>
        <LinkButton class="iconfont iconsousuo btn-query btn bradius" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius iconfont iconadd f-16" @click="handledAdd">添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <DataGrid
      :data="Menberlist"
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
      <GridColumn field="BatchNo" title="批次号" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.BatchNo}}</div>
        </template>
      </GridColumn>
      <GridColumn field="SumCount" title="总卡数量" align="center">
        <template slot="body" slot-scope="scope">
          <router-link to="/MakeCardDetail">
            <div class="c-blue" align="right">{{scope.row.SumCount}}</div>
          </router-link>
        </template>
      </GridColumn>
      <GridColumn field="SumNoWriteCount" title="未写数量" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.SumNoWriteCount}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CreatorName" title="制卡人" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.CreatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="BeginNo" title="开始卡号" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.BeginNo}}</div>
        </template>
      </GridColumn>
      <GridColumn field="EndNo" title="结束卡号" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.EndNo}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CreatorTime" title="制卡时间" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.CreatorTime}}</div>
        </template>
      </GridColumn>
    </DataGrid>
    <!-- <template slot="footer">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNumber="pageNumber"
        :layout="pagelayout"
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>-->
    <!-- 添加 -->
    <Dialog
      ref="MenberAddDialog"
      title="制卡"
      :dialogStyle="{width:'780px',height:'345px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="MenberDialogForm" class="formStyle formTop" ref="formvalidate" :rules="rules" @validate="errors=$event">
        <div class="formStyle_list border-top">
          <div class="f-l">
            <Label for="BeginNumber">开始号</Label>
            <NumberBox
              inputId="BeginNumber"
              v-model="MenberDialogForm.BeginNumber"
              placeholder="开始号 "
              class="pr-10"
              name="BeginNumber"
              v-Tooltip="getTipOpts('BeginNumber')"
            >
              <span class="c-red starpos">*</span>
            </NumberBox>
          </div>
          <div class="f-l">
            <Label for="EndNumber">结束号</Label>
            <NumberBox
              inputId="EndNumber"
              v-model="MenberDialogForm.EndNumber"
              placeholder="结束号 "
              class="pr-10"
              name="EndNumber"
              v-Tooltip="getTipOpts('EndNumber')"
            >
              <span class="c-red starpos">*</span>
            </NumberBox>
          </div>
        </div>
        <div class="formStyle_list">
          <div class="f-l">
            <Label for="Step">步长</Label>
            <NumberBox
              inputId="Step"
              v-model="MenberDialogForm.Step"
              placeholder="步长 "
              class="pr-10"
              name="Step"
              v-Tooltip="getTipOpts('Step')"
            >
              <span class="c-red starpos">*</span>
            </NumberBox>
          </div>
          <div class="f-l">
            <Label for="Type">卡类型</Label>
            <ComboBox
              valueField="Code"
              textField="Name"
              :data="CardTypeData"
              v-model="MenberDialogForm.CardType"
              placeholder="卡类型 "
            ></ComboBox>
          </div>
        </div>
        <div class="formStyle_list">
          <div class="f-l">
            <Label for="Prefix">前缀</Label>
            <TextBox
              inputId="Prefix"
              name="Prefix"
              v-model="MenberDialogForm.Prefix"
              placeholder="前缀 "
            ></TextBox>
          </div>
          <div class="f-l">
            <Label for="Suffix">后缀</Label>
            <TextBox
              inputId="Suffix"
              name="Suffix"
              v-model="MenberDialogForm.Suffix"
              placeholder="后缀 "
            ></TextBox>
          </div>
        </div>
        <div class="formStyle_list">
          <Label for="FilterNums">过滤</Label>批量生成时过滤掉含有
          <TextBox
            inputId="FilterNums"
            name="FilterNums"
            v-model="MenberDialogForm.FilterNums"
            placeholder
          ></TextBox>的卡号(多个用逗号隔开如4,7)
        </div>
        <!-- <div class="f-r mt-30">
          <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel">取消</LinkButton>
          <LinkButton @click="submitForm()" class="btnConfirm">确认</LinkButton>
        </div> -->
      </Form>
      <template v-slot:footer>
        <LinkButton @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel">取消</LinkButton>
      </template>
    </Dialog>
    <!-- 卡片数量 -->
    <!-- <Dialog
      ref="MenberCardDialog"
      title="制卡明细"
      :dialogStyle="{width:'400px',height:'350px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <DataGrid :data="menuItems" class="pd-10">
        <GridColumn
          align="center"
          type="index"
          cellCss="datagrid-td-rownumber"
          width="50"
          title="序号"
        >
          <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
        </GridColumn>
        <GridColumn field="CardNo" title="卡批次" align="left"></GridColumn>
        <GridColumn field="CardBatch" title="卡批次" align="left"></GridColumn>
        <GridColumn field="MemberNo" title="绑定会员号" align="left"></GridColumn>
        <GridColumn field="ComboName" title="绑定套餐名称" align="left"></GridColumn>
        <GridColumn field="CardState" title="写卡状态" align="left"></GridColumn>
        <GridColumn field="UseState" title="领用状态" align="left"></GridColumn>
        <GridColumn field="BindTime" title="绑定时间" align="left"></GridColumn>
      </DataGrid>
    </Dialog>-->
  </div>
</template>
<script>
import {
  GetBatch,
  GetBatchNo,
  GetCardDetail,
  AddCard,
  GetEnumList
} from "@/api/members";
import { parseTime } from "@/utils/index";
import bus from "@/views/layout/components/bus";
import dayjs from "dayjs";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      BatchNo: "",
      StartDate: dayjs()
        .add(-1, "month")
        .toDate(),
      EndDate: dayjs().toDate(),
      Menberlist: [],
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
      //添加
      CardTypeData: [],
      MenberDialogForm: {
        BeginNumber: null,
        EndNumber: null,
        Step: null,
        CardType: 0,
        Prefix: "",
        Suffix: "",
        FilterNums: ""
      },
      // 明细
      menuItems: [],
      rules: {
        BeginNumber: "required",
        EndNumber: "required",
        Step: "required"
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
        BatchNo: this.BatchNo,
        IsDisplay: true,
        StartDate: dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00",
        EndDate: dayjs(this.EndDate).format("YYYY-MM-DD") + " 23:59:59"
      };
      console.log(para);
      GetBatch(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    MenberSearchTop() {
      this.getUsers();
    },
    handledAdd() {
      this.$refs.MenberAddDialog.open();
      this.MenberDialogForm = {
        BeginNumber: null,
        EndNumber: null,
        Step: null,
        CardType: 0,
        Prefix: "",
        Suffix: "",
        FilterNums: ""
      };
    },
    submitForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必填项不正确"
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
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            AddCard(para).then(res => {
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
    // MenberCardDetail(index) {
    //   const para = {
    //     darkNo: this.
    //   };
    //   GetCardDetail(para).then(res => {
    //     console.log(res.Result);
    //     this.menuItems = res.Result.Data;
    //   });
    // },
    // // 传值
    // CardDetail(index) {
    //   console.log(index.BeginNo, index.EndNo);
    //   const para = {
    //     BeginNumber: index.BeginNo,
    //     EndNumber: index.EndNo
    //   };

    //   bus.$emit("getisshow", para);
    //   console.log(para);
    //   this.$router.push({ path: "/MakeCardDetail" });
    // },
    // 卡类型GetEnumList
    CardTypeMode() {
      const para = {
        EnumType: "Card_Type"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.CardTypeData = res.Result.Data;
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
    this.CardTypeMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>

