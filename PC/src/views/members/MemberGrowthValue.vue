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
        <DateBox v-model="OperationDateStart" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(起)</span>
        </DateBox>
        <DateBox v-model="OperationDateEnd" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(止)</span>
        </DateBox>
        <TextBox v-model="MemberCodeOrPhone" placeholder>
          <span class="query_title">会员编号/手机号</span>
          <Addon>
            <span
              v-if="MemberCodeOrPhone"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="MemberCodeOrPhone=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="RewardSource"
          :data="RewardSourceData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">奖励来源</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
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
      <!-- <GridColumn field="FlowNum" title="流水号" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.FlowNum}}</div>
        </template>
      </GridColumn>-->
      <GridColumn field="MemberCode" title="会员编号" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.MemberCode}}</div>
        </template>
      </GridColumn>
      <GridColumn field="MemberName" title="会员姓名" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.MemberName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="MemberPhone" title="会员手机号" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.MemberPhone}}</div>
        </template>
      </GridColumn>
      <GridColumn field="SourceType" title="奖励来源" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.SourceType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="GrowthValueName" title="成长值名称" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.GrowthValueName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="RewardGrowthValue" title="奖励成长值" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.RewardGrowthValue}}</div>
        </template>
      </GridColumn>
      <GridColumn field="OperationDate" title="操作日期" width="200" align="center">
         <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.OperationDate}}</div>
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
  </div>
</template>
<script>
// import { parseTime } from "@/utils/index";
import dayjs from "dayjs";
import { GetMemberGrowthList, GetEnumList } from "@/api/members";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      Menberlist: [],
      OperationDateStart: dayjs()
        .add(-1, "month")
        .toDate(),
      OperationDateEnd: dayjs().toDate(),
      MemberCodeOrPhone: "",
      RewardSource: null,
      RewardSourceData: [],
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
      ]
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
        OperationDateStart: dayjs(this.OperationDateStart).format("YYYY-MM-DD"),
        OperationDateEnd: dayjs(this.OperationDateEnd).format("YYYY-MM-DD"),
        MemberCodeOrPhone: this.MemberCodeOrPhone,
        SourceType: this.RewardSource
      };
      console.log(para);
      GetMemberGrowthList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //会员来源
    ReferMode() {
      const para = {
        EnumType: "MemberAwardSourceTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.RewardSourceData = res.Result.Data;
      });
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    }
  },
  mounted() {
    this.getUsers();
    this.ReferMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>

