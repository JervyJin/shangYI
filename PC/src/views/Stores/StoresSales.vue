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
        <TextBox placeholder=" " v-model="MemberPhone">
          <span class="query_title">手机号码</span>
          <Addon>
            <span
              v-if="MemberPhone"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="MemberPhone=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="TransactionState"
          :data="TransactionStateData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">状态</span>
        </ComboBox>

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
              v-if="CasherId"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="CasherId=''"
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
        <LinkButton
          class="iconfont iconsousuo btn-query btn radius mb-10"
          @click="MenberSearchTop()"
        >搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
    </p>
    <DataGrid
      id="grid"
      :data="Menberlist"
      :pagination="true"
      :style="'height:' + gridHeight + 'px;'"
      :columnResizing="true"
      :lazy="true"
      :pageNumber="pageNumber"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange($event)"
    >
      <GridColumnGroup :frozen="true" align="left" width="550">
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
          <!-- <GridColumn field="SerialNumber" title="流水号" :frozen="true" width="100">
        <template slot="body" slot-scope="scope">
          <router-link to="/StoresInstitutionsCashier">
            <div class="c-blue">{{scope.row.SerialNumber}}</div>
          </router-link>
        </template>
          </GridColumn>-->
          <GridColumn field="OrderCode" title="订单号" width="180" align="center">
            <template slot="body" slot-scope="scope">
              <div class="c-blue" @click="CardDetail(scope.row.OrderCode)">{{scope.row.OrderCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="ThirdpartyOrderCode" title="ERP订单号" width="140" align="center">
            <template slot="body" slot-scope="scope">
              <div
                class="c-blue"
                align="right"
                @click="ERPCardDetail(scope.row.ThirdpartyOrderCode)"
              >{{scope.row.ThirdpartyOrderCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrderSource" title="订单来源" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrderSource}}</div>
            </template>
          </GridColumn>
        </GridHeaderRow>
      </GridColumnGroup>
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="MemberCode" title="会员编号" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.MemberCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberPhone" title="手机号" width="120" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.MemberPhone}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrderAmount" title="原单金额(元)" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.OrderAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="PayAmount" title="整单金额(元)" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.PayAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="DiscountsAmount" title="CRM支付金额(元)" width="120" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.DiscountsAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationName" title="销售机构" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrganizationName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationCode" title="机构编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.OrganizationCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="TransactionState" title="状态" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.TransactionState}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CreatorTime" title="操作日期" width="180" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CreatorTime}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CasherCode" title="收银员编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.CasherCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CasherName" title="收银员" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CasherName}}</div>
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
import dayjs from "dayjs";
import {
  GetEnumList,
  Organization,
  FormatData,
  GetOrgByUser,
  GetStoreCommoditySale,
  GetListOrganization
} from "@/api/Report";
import bus from "@/views/layout/components/bus";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      togflequery: false,
      AgencySearch: "",
      formatsData: [],
      StartTime: dayjs().toDate(),
      EndTime: dayjs().toDate(),
      TransactionState: 0,
      OrganizationId: "",
      OrderSource: null,
      OrderCode: "",
      MemberPhone: "",
      CasherId: "",
      CasherName: "",
      TransactionStateData: [],
      OrganizationIdData: [],
      OrderSourceData: [],
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
        TransactionState: this.TransactionState,
        OrganizationId: this.OrganizationId,
        OrderSource: this.OrderSource,
        OrderCode: this.OrderCode,
        MemberPhone: this.MemberPhone,
        CasherId: this.CasherId
      };
      console.log(para);
      GetStoreCommoditySale(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    CardDetail(index) {
      console.log(index);
      var para = {
        StartTime: dayjs(this.StartTime).format("YYYY-MM-DD"),
        EndTime: dayjs(this.EndTime).format("YYYY-MM-DD"),
        index: index
      };
      console.log(para);
      //bus.$emit("allNoAudit", para);
      //this.$router.push({ path: "/StoresSalesDetail" });
      this.$router.push({
        name: `StoresSalesDetail`,
        query: para
      });
    },
    ERPCardDetail(index) {
      console.log(index);
      var para = {
        StartTime: dayjs(this.StartTime).format("YYYY-MM-DD"),
        EndTime: dayjs(this.EndTime).format("YYYY-MM-DD"),
        index: index
      };
      this.$router.push({
        name: `StoresInstitutionsCashier`,
        query: para
      });
    },
    //搜索
    MenberSearchTop() {
      this.GetList();
    },
    //状态
    TypeMode() {
      const para = {
        EnumType: "TransactionState_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.TransactionStateData = res.Result.Data;
      });
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
    //订单来源
    OrderSourceMode() {
      const para = {
        EnumType: "SourceEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.OrderSourceData = res.Result.Data;
      });
    },
    resizeHeight() {
      //this.gridHeight = heightUtil();
      // var xdheight = 0;
      // var duheight = $(document).height();
      // var gridcount = $("#grid").length;
      // $("#grid")
      //   .siblings("div,p")
      //   .each(function() {
      //     var item = $(this).height();
      //     var html3 = $(this).html();
      //     xdheight += item;
      //   });
      // this.gridHeight = duheight - 121 - xdheight;
    }
  },
  //所属机构
  mounted() {
    this.GetList();
    this.TypeMode();
    // this.resizeHeight();
    this.OrderSourceMode();
    this.GetOrgByUserChange();
    this.gridHeight = this.resizeTable();
  },
  created() {
    if (this.$route.query.index != "" && this.$route.query.index) {
      this.MemberPhone = this.$route.query.index;
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
