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
        <TextBox placeholder=" " v-model="CardNo">
          <span class="query_title">券号/卡号</span>
          <Addon>
            <span
              v-if="CardNo"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="CardNo=''"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="OrderCode">
          <span class="query_title">订单号</span>
          <Addon>
            <span
              v-if="OrderCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="OrderCode=''"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="PayType"
          :data="PayTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">支付类型</span>
        </ComboBox>
        <ComboBox v-model="State" :data="StateData" valueField="Code" textField="Name" placeholder>
          <span class="query_title">状态</span>
        </ComboBox>
        <TextBox placeholder=" " v-model="ThirdpartyOrderCode">
          <span class="query_title">第三方订单号</span>
          <Addon>
            <span
              v-if="ThirdpartyOrderCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="ThirdpartyOrderCode=''"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="PaySerialNumber">
          <span class="query_title">支付子流水号</span>
          <Addon>
            <span
              v-if="PaySerialNumber"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="PaySerialNumber=''"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="OrderSource"
          :data="OrderSourceData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">订单来源</span>
        </ComboBox>
        <SearchBox
          placeholder
          v-model="CasherName"
          :value="CasherId"
          :editable="false"
          @search="$refs.CasherIdDialog.open()"
        >
          <span class="query_title">收银员</span>
          <Addon>
            <span
              v-if="CasherName"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="CasherName=null;CasherId=null"
            ></span>
          </Addon>
        </SearchBox>
        <!-- <ComboBox
          placeholder="业态"
          v-model="AgencySearch"
          :data="formatsData"
          valueField="Id"
          textField="Name"
          @selectionChange="formatsChange"
        ></ComboBox>-->
        <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">销售机构</span>
        </ComboBox>

        <LinkButton class="iconfont iconsousuo btn-query btn mb-10" @click="MenberSearchTop()">搜索</LinkButton>
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
      <GridColumnGroup :frozen="true" align="left" width="600">
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
          <GridColumn field="MemberConsumptionOrderCode" title="订单号" width="200" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.MemberConsumptionOrderCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="PaySerialNumber" title="支付子流水" width="200" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.PaySerialNumber}}</div>
            </template>
          </GridColumn>
          <GridColumn field="ThirdpartyOrderCode" title="第三方订单号" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.ThirdpartyOrderCode}}</div>
            </template>
          </GridColumn>
        </GridHeaderRow>
      </GridColumnGroup>
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="OrderSource" title="订单来源" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrderSource}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationName" title="交易机构名称" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrganizationName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationCode" title="交易机构编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.OrganizationCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberCode" title="会员编号" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.MemberCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberName" title="会员姓名" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.MemberName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberPhone" title="手机号" width="120" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.MemberPhone}}</div>
            </template>
          </GridColumn>
          <GridColumn field="PayType" title="支付类型" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.PayType}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Amount" title="支付/抵扣金额" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.Amount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CardNo" title="卷号/卡号" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.CardNo}}</div>
            </template>
          </GridColumn>
          <GridColumn field="PayName" title="套餐/卷名称" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.PayName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CreatorTime" title="支付时间" width="180" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CreatorTime}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CasherCode" title="收银员编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.CasherCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CasherName" title="收银员姓名" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CasherName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="State" title="状态" width="80" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.State}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CurrentAmount" title="操作前账户余额" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.CurrentAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CirremtScore" title="操作前账户积分" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.CirremtScore}}</div>
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
    <!-- 收银员 CasherIdDialog-->
    <Dialog
      ref="CasherIdDialog"
      title="收银员"
      :dialogStyle="{width:'740px',height:'450px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <CasherList @childCasher="childCasherVal"></CasherList>
    </Dialog>
  </div>
</template>
<script>
import CasherList from "@/components/CasherList";
// import { parseTime } from "@/utils/index";
import {
  Organization,
  GetStoreSaleDetailed,
  GetEnumList,
  FormatData,
  GetOrgByUser,
  GetStoreCashFlow,
  GetListOrganization
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
      AgencySearch: "",
      formatsData: [],
      StartTime: dayjs().toDate(),
      EndTime: dayjs().toDate(),
      State: 0,
      CardNo: "",
      OrganizationId: "",
      OrderSource: null,
      OrderCode: "",
      PaySerialNumber: "",
      CasherId: "",
      CasherName: "",
      GoodsCatalogName: "",
      GoodsBrandName: "",
      ThirdpartyOrderCode: "",
      GoodName: "",
      PayType: null,
      PayTypeData: [],
      StateData: [],
      OrganizationIdData: [],
      OrderSourceData: [],
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
  components: { CasherList },
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
    //员工传值
    childCasherVal(data) {
      console.log(data);
      this.$refs.CasherIdDialog.close();
      this.CasherName = data.UserName;
      this.CasherId = data.Id;
      console.log(data.Id);
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
        OrderSource: this.OrderSource,
        OrderCode: this.OrderCode,
        PaySerialNumber: this.PaySerialNumber,
        CasherId: this.CasherId,
        CardNo: this.CardNo,
        PayType: this.PayType,
        State: this.State,
        ThirdpartyOrderCode: this.ThirdpartyOrderCode
      };
      console.log(para);
      GetStoreCashFlow(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //搜索
    MenberSearchTop() {
      this.GetList();
    },
    //GetOrgByUser
    //机构
    GetOrgByUserChange() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
      });
    },
    //业态
    formatsChange() {
      this.OrganizationId = "";
      FormatData().then(res => {
        this.formatsData = res.Result.Data;
        console.log(this.AgencySearch);

        if (this.AgencySearch != "") {
          const para = {
            BusinessformatId: this.AgencySearch
          };
          console.log(para);
          GetListOrganization(para).then(res => {
            console.log(res.Result);
            this.OrganizationIdData = res.Result.Data;
          });
        }
      });
      console.log(this.OrganizationIdData);
    },
    //状态
    TypeMode() {
      const para = {
        EnumType: "TransactionState_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateData = res.Result.Data;
      });
    },
    //订单来源
    OrderSourceMode() {
      const para = {
        EnumType: "OrderSourceEnum"
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
    this.PayTypeMode();
    this.GetOrgByUserChange();
    this.gridHeight = this.resizeTable();
  },
  created() {
    if (this.$route.query.index != "" && this.$route.query.index) {
      this.StartTime = new Date(this.$route.query.StartTime);
      this.EndTime = new Date(this.$route.query.EndTime);
      this.ThirdpartyOrderCode = this.$route.query.index;
    }
    console.log(this.$route.query);
  }
};
</script>
<style scoped>
.query_top .f-field {
  margin-bottom: 10px;
}
.c-blue {
  cursor: pointer;
}
</style>
