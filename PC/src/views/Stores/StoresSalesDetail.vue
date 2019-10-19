<template>
  <div class="container">
    <div class="conTop pos-r">
      <div class="topTitle">
        <p class="f-l">
          <span></span>筛选条件
        </p>
        <p class="f-r c-blue" @click="queryToggle">
          <i
            class="iconfont f-14"
            :class="{'icongengduo1-copy-copy':iconxiangshang1,'icongengduo1-copy':iconxiangxia1}"
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
        <!-- <TextBox placeholder=" " v-model="GoodName">
          <span class="query_title">商品名称</span>
          <Addon>
            <span
              v-if="GoodName"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="GoodName=''"
            ></span>
          </Addon>
        </TextBox>-->
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
        <!-- <TextBox placeholder=" " v-model="MemberPhone">
          <span class="query_title">手机号</span>
          <Addon>
            <span
              v-if="MemberPhone"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="MemberPhone=''"
            ></span>
          </Addon>
        </TextBox>-->
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
          <span class="query_title">营业员</span>
          <Addon>
            <span
              v-if="CasherId"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="CasherId=''"
            ></span>
          </Addon>
        </SearchBox>
        <SearchBox
          placeholder
          v-model="GoodsCatalogName"
          :editable="false"
          @search="$refs.CouponGoodsDialog.open()"
        >
          <span class="query_title">商品类型</span>
          <Addon>
            <span
              v-if="GoodsCatalogName"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="GoodsCatalogName=''"
            ></span>
          </Addon>
        </SearchBox>
        <SearchBox
          placeholder
          v-model="GoodsBrandName"
          :editable="false"
          @search="$refs.ComboBrandDialog.open()"
        >
          <span class="query_title">商品品牌</span>
          <Addon>
            <span
              v-if="GoodsBrandName"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="GoodsBrandName=''"
            ></span>
          </Addon>
        </SearchBox>
        <SearchBox
          placeholder
          v-model="GoodName"
          :editable="false"
          @search="$refs.ComboCatalogDialog.open()"
        >
          <span class="query_title">商品名称</span>
          <Addon>
            <span
              v-if="GoodName"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="GoodName=''"
            ></span>
          </Addon>
        </SearchBox>
        <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">机构</span>
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
          <GridColumn field="OrderCode" title="订单号" align="center" width="200">
            <template slot="body" slot-scope="scope">
              <!-- <router-link to="/StoresInstitutionsCashier"> -->
              <div class align="right">{{scope.row.OrderCode}}</div>
              <!-- </router-link> -->
            </template>
          </GridColumn>
          <GridColumn field="ThirdpartyOrderCode" title="第三方订单号" width="180" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.ThirdpartyOrderCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrderSource" title="订单来源" align="center">
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
          <GridColumn field="GoodsBrandCode" title="商品品牌编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.GoodsBrandCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="GoodsBrandName" title="商品品牌" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.GoodsBrandName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="GoodsCatalogCode" title="商品类型编号" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.GoodsCatalogCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="GoodsCatalogName" title="商品类型" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.GoodsCatalogName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="GoodCode" title="商品编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.GoodCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="GoodName" title="商品名称" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.GoodName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Num" title="购买数量" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.Num}}</div>
            </template>
          </GridColumn>
          <GridColumn field="SubtotalAmount" title="小计" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.SubtotalAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationName" title="机构名称" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrganizationName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationCode" title="机构编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.OrganizationCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CreatorTime" title="操作时间" width="180" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CreatorTime}}</div>
            </template>
          </GridColumn>
          <GridColumn field="SalerUserCode" title="营业员编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.SalerUserCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="SalerUserName" title="营业员名称" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.SalerUserName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="TransactionState" title="状态" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.TransactionState}}</div>
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
    <!-- 商品品牌ComboBrand -->
    <Dialog
      ref="ComboBrandDialog"
      title="商品品牌"
      :dialogStyle="{width:'650px',height:'450px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <ComboBrand @ComboBrand="childBrandVal"></ComboBrand>
    </Dialog>
    <!-- 商品类型-->
    <Dialog
      ref="CouponGoodsDialog"
      title="商品类型"
      :dialogStyle="{width:'650px',height:'450px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <CouponGoods @ComboGoodsCategory="childGoodsVal"></CouponGoods>
    </Dialog>
    <!-- 商品 -->
    <Dialog
      ref="ComboCatalogDialog"
      :dialogStyle="{width:'80%',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="商品类别"
    >
      <ComboCatalog @ComboCatalog="getComboCatalog"></ComboCatalog>
    </Dialog>
  </div>
</template>
<script>
import CasherList from "@/components/CasherList";
import ComboBrand from "@/components/ComboBrand";
import CouponGoods from "@/components/CouponGoods";
import ComboCatalog from "@/components/ComboCatalog";
import { parseTime } from "@/utils/index";
import dayjs from "dayjs";
import {
  Organization,
  GetStoreSaleDetailed,
  GetEnumList,
  FormatData,
  GetOrgByUser
} from "@/api/Report";
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
      TransactionState: 1,
      OrganizationId: "",
      OrganizationIdData: [],
      OrderSource: null,
      OrderCode: "",
      MemberPhone: "",
      CasherId: "",
      CasherName: "",
      GoodsCatalogName: "",
      GoodsBrandName: "",
      ThirdpartyOrderCode: "",
      GoodName: "",
      TransactionStateData: [],

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
  components: { CasherList, CouponGoods, ComboBrand, ComboCatalog },
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
    //商品品牌
    childBrandVal(data) {
      console.log("商品品牌返值", data);
      if (data != null || data != "") {
        this.arrName = [];
        data.forEach(data => {
          this.arrName.push(data.GoodsBrandName);
        });
        this.GoodsBrandName = this.arrName.join(",");
        console.log("商品品牌返值", this.GoodsBrandName);
      } else {
        this.GoodsCatalogName = "";
      }
      this.$refs.ComboBrandDialog.close();
    },
    //商品分类
    childGoodsVal(data) {
      if (data != null || data != "") {
        this.arrName = [];
        data.forEach(data => {
          this.arrName.push(data.text);
        });
        this.GoodsCatalogName = this.arrName.join(",");
        console.log("商品分类返值", this.GoodsCatalogName);
      } else {
        this.GoodsCatalogName = "";
      }
      this.$refs.CouponGoodsDialog.close();
    },
    // 商品
    getComboCatalog(data) {
      if (data != null || data != "") {
        console.log("商品回值", data);
        this.arrName = [];
        data.forEach(item => {
          this.arrName.push(item.Name);
        });
        this.GoodName = this.arrName.join(",");
        console.log("商品回值", this.GoodName);
      } else {
        this.GoodName = "";
      }
      this.$refs.ComboCatalogDialog.close();
    },
    //
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.GetList();
    },

    GetList() {
      const para = {
        StartTime: dayjs(this.StartTime).format("YYYY-MM-DD") + " 00:00:00",
        EndTime: dayjs(this.EndTime).format("YYYY-MM-DD") + " 23:59:59",
        page: this.pageNumber,
        rows: this.pageSize,
        GoodName: this.GoodName,
        OrganizationId: this.OrganizationId,
        OrderSource: this.OrderSource,
        OrderCode: this.OrderCode,
        ThirdpartyOrderCode: this.ThirdpartyOrderCode,
        MemberPhone: this.MemberPhone,
        CasherId: this.CasherId,
        GoodsCatalogName: this.GoodsCatalogName,
        GoodsBrandName: this.GoodsBrandName
      };
      console.log(para);
      GetStoreSaleDetailed(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    CardDetail(index) {
      console.log(index);
      var para = {
        StartTime: parseTime(this.StartTime, "{yyyy}-{mm}-{dd}"),
        EndTime: parseTime(this.EndTime, "{yyyy}-{mm}-{dd}"),
        index: index
      };
      console.log(para);
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
    //机构
    GetOrgByUserChange() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
      });
    }
  },
  //所属机构
  mounted() {
    this.GetList();
    this.TypeMode();
    this.OrderSourceMode();
    this.GetOrgByUserChange();
    this.gridHeight = this.resizeTable();
  },
  created() {
    if (this.$route.query.index != "" && this.$route.query.index) {
      this.StartTime = new Date(this.$route.query.StartTime);
      this.EndTime = new Date(this.$route.query.EndTime);
      this.OrderCode = this.$route.query.index;
    }
    console.log(this.$route.query);
  }
};
</script>
<style scoped>
.c-blue {
  cursor: pointer;
}
</style>
