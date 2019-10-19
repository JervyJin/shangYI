<template>
  <div class="container">
    <div class="conTop">
      <div class="topTitle">
        <p class="f-l">
          <span></span>筛选条件
        </p>
        <p class="f-r c-blue" @click="queryToggle">
           <i class="iconfont  f-14" :class="{'icongengduo1-copy':iconxiangshang1,'icongengduo1-copy-copy':iconxiangxia1}" ></i>收起
        </p>
        <p class="f-r">保存筛选条件</p>
        <p class="f-r">使用历史条件</p>
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-if="ToggleStyle">
        <DateBox format="yyyy-MM-dd" placeholder v-model="StartTime">
          <span class="query_title">日期(起)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" placeholder v-model="EndTime">
          <span class="query_title">日期(止)</span>
        </DateBox>
        <ComboBox
          v-model="PayType"
          :data="PayTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">支付类型</span>
        </ComboBox>
        <ComboBox
          v-model="OrderSource"
          :data="OrderSourceData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">操作类型</span>
        </ComboBox>
        <!-- <ComboBox
          v-model="ExceptionType"
          :data="ExceptionTypeData"
          valueField="Code"
          textField="Name"
          placeholder="异常类型"
        ></ComboBox>-->
        <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">机构</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
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
      <GridColumnGroup :frozen="true" align="left" width="400">
        <GridHeaderRow>
          <GridColumn
            align="center"
            type="index"
            cellCss="datagrid-td-rownumber"
            width="50"
            title="序号"
          >
            <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
          </GridColumn>
          <GridColumn field="ReceiptCode" title="支付流水" align="center" width="150">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.ReceiptCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrderCode" title="主订单号" align="center" width="200">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.OrderCode}}</div>
            </template>
          </GridColumn>
          <!-- <GridColumn field="ThirdpartyOrderCode" title="第三方订单号" align="center" width="150">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.ThirdpartyOrderCode}}</div>
            </template>
          </GridColumn>-->
        </GridHeaderRow>
      </GridColumnGroup>
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="MemberCode" title="会员编码" align="center" width="120">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.MemberCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberName" title="会员名称" align="center" width="120">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.MemberName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CustomerPayAmount" title="CRM支付金额" width="120" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.CustomerPayAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="PayAmount" title="支付总金额" align="center" width="120">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.PayAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrderSource" title="操作类型" align="center" width="120">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrderSource}}</div>
            </template>
          </GridColumn>
          <!-- <GridColumn field="ExceptionType" title="异常类型"></GridColumn> -->
          <GridColumn field="OrganizationName" title="机构" align="center" width="120">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrganizationName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CreatorTime" title="支付时间" width="180" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CreatorTime}}</div>
            </template>
          </GridColumn>
          <!-- 可查看明细和详情 -->
          <GridColumn field title="支付明细" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div class="TagBtnCla" align="left" @click="TagBtn(scope.$index, scope.row)">明细</div>
            </template>
          </GridColumn>
          <GridColumn field title="订单详情" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div class="TagBtnCla" align="left" @click="MarketingPlan(scope.$index, scope.row)">详情</div>
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
    <!-- 明细 -->
    <Dialog
      ref="PrivilegeDialog"
      title="支付明细"
      :dialogStyle="{width:'550px',height:'350px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <DataGrid
        :data="MenberDetaillist"
        :pagination="true"
        class="pd-10 minheight200"
        :columnResizing="true"
      >
        <GridColumn
          align="center"
          type="index"
          cellCss="datagrid-td-rownumber"
          width="50"
          title="序号"
        >
          <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
        </GridColumn>
        <GridColumn field="PaySerialNumber" title="支付明细流水" width="220"></GridColumn>
        <GridColumn field="Amount" title="金额"></GridColumn>
        <GridColumn field="PayType" title="付款方式"></GridColumn>
        <GridColumn field="CardNo" title="券号/卡号"></GridColumn>
      </DataGrid>
    </Dialog>
    <!-- 详情 -->
    <Dialog
      ref="MarketingPlanDialog"
      title="订单详情"
      :dialogStyle="{width:'650px',height:'350px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      :columnResizing="true"
    >
      <DataGrid :data="MarketingPlanmenuItem" :pagination="true" class="pd-10 minheight200">
        <GridColumn
          align="center"
          type="index"
          cellCss="datagrid-td-rownumber"
          width="50"
          title="序号"
        >
          <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
        </GridColumn>
        <GridColumn field="OrderCode" title="子订单号" width="180"></GridColumn>
        <GridColumn field="TransactionState" title="状态"></GridColumn>
        <GridColumn field="GoodCode" title="商品编码"></GridColumn>
        <GridColumn field="GoodName" title="商品名称"></GridColumn>
        <GridColumn field="RetailPrice" title="单价"></GridColumn>
        <GridColumn field="Num" title="数量"></GridColumn>
        <GridColumn field="TotalAmount" title="总金额"></GridColumn>
      </DataGrid>
    </Dialog>
  </div>
</template>
<script>
// import { parseTime } from "@/utils/index";
import {
  Organization,
  GetStoreSaleDetailed,
  GetEnumList,
  FormatData,
  GetCustomerAndERPOrderRecord,
  GetListOrganization,
  GetOrderDetails,
  GetPayDetails,
  GetOrgByUser
} from "@/api/Report";
import dayjs from "dayjs";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      MenberDetaillist: [],
      MarketingPlanmenuItem: [],
      AgencySearch: "",
      formatsData: [],
      StartTime: dayjs().toDate(),
      EndTime: dayjs().toDate(),
      OrganizationId: "",
      OrderSource: null,
      PayType: null,
      ExceptionType: "",
      PayTypeData: [],
      OrganizationIdData: [],
      OrderSourceData: [],
      ExceptionTypeData: [],
      //DataGrid
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
      ]
    };
  },
  components: {},
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
    //明细
    TagBtn(index, row) {
      console.log(row);
      const para = {
        OrderCode: row.OrderCode,
        page: this.pageNumber,
        rows: this.pageSize
      };
      console.log(para);
      GetPayDetails(para).then(res => {
        this.$refs.PrivilegeDialog.open();
        this.MenberDetaillist = res.Result.Rows;
        console.log(res.Result);
      });
    },
    //详情
    MarketingPlan(index, row) {
      const para = {
        OrderId: row.Id,
        page: this.pageNumber,
        rows: this.pageSize
      };
      console.log(para);
      GetOrderDetails(para).then(res => {
        this.$refs.MarketingPlanDialog.open();
        this.MarketingPlanmenuItem = res.Result.Rows;
        console.log(this.MarketingPlanmenuItem);
      });
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.GetList();
    },

    //
    GetList() {
      const para = {
        StartTime: dayjs(this.StartTime).format("YYYY-MM-DD") + " 00:00:00",
        EndTime: dayjs(this.EndTime).format("YYYY-MM-DD") + " 23:59:59",
        page: this.pageNumber,
        rows: this.pageSize,
        OrganizationId: this.OrganizationId,
        PayType: this.PayType,
        OrderSource: this.OrderSource,
        ExceptionType: this.ExceptionType
      };
      console.log(para);
      GetCustomerAndERPOrderRecord(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //搜索
    MenberSearchTop() {
      this.GetList();
    },
    //机构
    GetOrgByUserChange() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
      });
    },
    //状态
    TypeMode() {
      const para = {
        EnumType: "CasherStateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateData = res.Result.Data;
      });
    },
    //操作类型
    OrderSourceMode() {
      const para = {
        EnumType: "SourceEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.OrderSourceData = res.Result.Data;
      });
    },
    //支付类型
    PayTypeMode() {
      const para = {
        EnumType: "PayTypEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.PayTypeData = res.Result.Data;
      });
    }
  },
  //所属机构
  mounted() {
    this.GetList();
    this.TypeMode();
    this.OrderSourceMode();
    this.GetOrgByUserChange();
    this.PayTypeMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>

