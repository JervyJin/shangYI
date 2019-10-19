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
        <DateBox format="yyyy-MM-dd" placeholder v-model="CreatorStartTime">
          <span class="query_title">生成日期(起)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" placeholder v-model="CreatorEndTime">
          <span class="query_title">生成日期(止)</span>
        </DateBox>
        <TextBox placeholder="券号 " v-model="MemberCouponCardNo">
          <span class="query_title">券号</span>
          <Addon>
            <span
              v-if="MemberCouponCardNo"
              class="textbox-icon icon-clear"
              @click="MemberCouponCardNo=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder v-model="MemberName">
          <span class="query_title">会员名称</span>
          <Addon>
            <span v-if="MemberName" class="textbox-icon icon-clear" @click="MemberName=null"></span>
          </Addon>
        </TextBox>
        <TextBox placeholder v-model="MemberCode">
          <span class="query_title">会员编码</span>
          <Addon>
            <span v-if="MemberCode" class="textbox-icon icon-clear" @click="MemberCode=null"></span>
          </Addon>
        </TextBox>
        <TextBox placeholder v-model="MemberComboCardNo">
          <span class="query_title">套餐流水号</span>
          <Addon>
            <span
              v-if="MemberComboCardNo"
              class="textbox-icon icon-clear"
              @click="MemberComboCardNo=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder v-model="MemberPhone">
          <span class="query_title">会员手机号</span>
          <Addon>
            <span v-if="MemberPhone" class="textbox-icon icon-clear" @click="MemberPhone=null"></span>
          </Addon>
        </TextBox>
        <TextBox placeholder v-model="OrderCode">
          <span class="query_title">订单号</span>
          <Addon>
            <span v-if="OrderCode" class="textbox-icon icon-clear" @click="OrderCode=null"></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="UseType"
          :data="UseTypeType"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">券类型</span>
        </ComboBox>
        <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdType"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">机构</span>
        </ComboBox>
        <ComboBox
          v-model="SourceId"
          :data="SourceIdType"
          valueField="MarketingId"
          textField="MarketingName"
          placeholder
        >
          <span class="query_title">营销来源</span>
        </ComboBox>
        <SearchBox placeholder v-model="CouponName" @search="$refs.VouchersDialog.open()">
          <span class="query_title">券选择</span>
          <Addon>
            <span
              v-if="CouponName"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="CouponName=null;CouponId=null"
            ></span>
          </Addon>
        </SearchBox>
        <SearchBox placeholder v-model="GoodsCatalogCode" @search="$refs.CouponGoodsDialog.open()">
          <span class="query_title">商品类型</span>
          <Addon>
            <span
              v-if="GoodsCatalogCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="GoodsCatalogCode=''"
            ></span>
          </Addon>
        </SearchBox>
        <SearchBox placeholder v-model="GoodsBrandCode" @search="$refs.ComboBrandDialog.open()">
          <span class="query_title">商品品牌</span>
          <Addon>
            <span
              v-if="GoodsBrandCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="GoodsBrandCode=''"
            ></span>
          </Addon>
        </SearchBox>
        <SearchBox placeholder v-model="GoodCode" @search="$refs.ComboCatalogDialog.open()">
          <span class="query_title">商品名称</span>
          <Addon>
            <span
              v-if="GoodCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="GoodCode=''"
            ></span>
          </Addon>
        </SearchBox>
        <LinkButton class="iconfont iconsousuo btn-query btn mb-10" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <div id="grid">
      <div class="container_tree" :style="'height:' + gridHeight + 'px;'">
        <h4>优惠券分类</h4>
        <Tree :data="MarketingType" @selectionChange="selection($event)">
          <template slot-scope="scope">
            <span>{{scope.node.Name}}</span>
          </template>
        </Tree>
      </div>
      <DataGrid
        :data="Menberlist"
        :pagination="true"
        style="padding-left:210px"
        :style="'height:' + gridHeight + 'px;'"
        :columnResizing="true"
        :lazy="true"
        :pageNumber="pageNumber"
        :total="total"
        :pageSize="pageSize"
        @pageChange="pageChange($event)"
      >
        <GridColumnGroup :frozen="true" align="left" width="610">
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
            <GridColumn field="MemberCouponCardNo" title="券号" align="center" width="180">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.MemberCouponCardNo}}</div>
              </template>
            </GridColumn>
            <GridColumn field="CouponName" title="券名称" align="center" width="180">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.CouponName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="OrderCode" title="订单号" align="center" width="200">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.OrderCode}}</div>
              </template>
            </GridColumn>
          </GridHeaderRow>
        </GridColumnGroup>
        <GridColumnGroup>
          <GridHeaderRow>
            <GridColumn field="MemberCode" title="会员编码" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.MemberCode}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MemberName" title="会员名称" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.MemberName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MemberPhone" title="会员手机号" align="center" width="120">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.MemberPhone}}</div>
              </template>
            </GridColumn>

            <GridColumn field="GoodCode" title="商品编码" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.GoodCode}}</div>
              </template>
            </GridColumn>
            <GridColumn field="GoodName" title="商品名称" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.GoodName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="GoodsCatalogCode" title="商品分类编码" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.GoodsCatalogCode}}</div>
              </template>
            </GridColumn>
            <GridColumn field="GoodsCatalogName" title="商品分类名称" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.GoodsCatalogName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="GoodsBrandCode" title="商品品牌编码" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.GoodsBrandCode}}</div>
              </template>
            </GridColumn>
            <GridColumn field="GoodsBrandName" title="商品品牌名称" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.GoodsBrandName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="Num" title="数量" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.Num}}</div>
              </template>
            </GridColumn>
            <GridColumn field="TotalAmount" title="小计" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.TotalAmount}}</div>
              </template>
            </GridColumn>
            <GridColumn field="TransactionState" title="交易状态" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.TransactionState}}</div>
              </template>
            </GridColumn>
            <GridColumn field="SalerUserCode" title="销售员编码" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.SalerUserCode}}</div>
              </template>
            </GridColumn>
            <GridColumn field="SalerUserName" title="销售员姓名" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.SalerUserName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MemberComboCardNo" title="套餐流水号" align="center" width="180">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.MemberComboCardNo}}</div>
              </template>
            </GridColumn>
            <GridColumn field="UseType" title="券类型" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.UseType}}</div>
              </template>
            </GridColumn>
            <GridColumn field="ExpireDate" title="有效期" width="180" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.ExpireDate}}</div>
              </template>
            </GridColumn>
            <GridColumn field="CreatorTime" title="创建时间" align="center" width="180">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.CreatorTime}}</div>
              </template>
            </GridColumn>
            <GridColumn field="DiscountsAmount" title="优惠金额" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.DiscountsAmount}}</div>
              </template>
            </GridColumn>
            <GridColumn field="OrganizationName" title="交易机构名称" align="center" width="150">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.OrganizationName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="UserTime" title="使用时间" align="center" width="180">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.UserTime}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MarketingName" title="营销方案名称" align="center" width="150">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.MarketingName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="UserType" title="使用来源" align="center" width="120">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.UserType}}</div>
              </template>
            </GridColumn>
          </GridHeaderRow>
        </GridColumnGroup>
      </DataGrid>
    </div>
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
    <!-- 添加 券-->
    <Dialog
      ref="VouchersDialog"
      :dialogStyle="{width:'80%',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="券"
    >
      <Vouchers @vouchers="getchildVouchers"></Vouchers>
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
import ComboBrand from "@/components/ComboBrand";
import CouponGoods from "@/components/CouponGoods";
import ComboCatalog from "@/components/ComboCatalog";
import Vouchers from "@/components/Vouchers";
import { parseTime } from "@/utils/index";
import {
  GetMemberCouponUserRecord,
  GetCouponCatalogs,
  GetEnumList,
  GetOrgByUser,
  GetMarketingInfo
} from "@/api/Market";
import dayjs from "dayjs";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      //搜索
      CreatorStartTime: dayjs()
        .add(-1, "month")
        .toDate(),
      CreatorEndTime: dayjs().toDate(),
      MemberCouponCardNo: "",
      MemberCode: "",
      MemberName: "",
      MemberPhone: "",
      MemberComboCardNo: "",
      OrderCode: "",
      OrganizationId: "",
      UseType: null,
      CouponName: "",
      CouponId: "",
      SourceId: "",
      GoodsCatalogCode: "",
      GoodsBrandCode: "",
      GoodCode: "",
      SourceIdType: [],
      Menberlist: [],
      UseTypeType: [],
      MarketingType: [],
      OrganizationIdType: [],
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
  components: { ComboBrand, CouponGoods, ComboCatalog, Vouchers },
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
        CreatorStartTime:
          dayjs(this.CreatorStartTime).format("YYYY-MM-DD") + " 00:00:00",
        CreatorEndTime:
          dayjs(this.CreatorEndTime).format("YYYY-MM-DD") + " 23:59:59",
        MemberCouponCardNo: this.MemberCouponCardNo,
        MemberCode: this.MemberCode,
        MemberName: this.MemberName,
        MemberPhone: this.MemberPhone,
        OrderCode: this.OrderCode,
        OrganizationId: this.OrganizationId,
        CouponCatalogId: this.CouponCatalogId,
        UseType: this.UseType,
        CouponId: this.CouponId,
        SourceId: this.SourceId,
        GoodsCatalogCode: this.GoodsCatalogCode,
        GoodsBrandCode: this.GoodsBrandCode,
        GoodCode: this.GoodCode
      };
      console.log(para);
      GetMemberCouponUserRecord(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    // 头部搜索
    MenberSearchTop() {
      this.getUsers();
    },
    //优惠券
    selection(even) {
      this.CouponCatalogId = even.Id;
      console.log(even.Id);
      this.getUsers();
    },
    //商品品牌
    childBrandVal(data) {
      console.log("商品品牌返值", data);
      if (data != null || data != "") {
        this.arrName = [];
        data.forEach(data => {
          this.arrName.push(data.GoodsBrandName);
        });
        this.GoodsBrandCode = this.arrName.join(",");
        console.log("商品品牌返值", this.GoodsBrandCode);
      } else {
        this.GoodsBrandCode = "";
      }
      this.$refs.ComboBrandDialog.close();
    },
    //商品类型
    childGoodsVal(data) {
      if (data != null || data != "") {
        this.arrName = [];
        data.forEach(data => {
          this.arrName.push(data.Name);
        });
        this.GoodsCatalogCode = this.arrName.join(",");
        console.log("商品分类返值", this.GoodsCatalogCode);
      } else {
        this.GoodsCatalogCode = "";
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
        this.GoodCode = this.arrName.join(",");
        console.log("商品回值", this.GoodCode);
      } else {
        this.GoodCode = "";
      }
      this.$refs.ComboCatalogDialog.close();
    },
    //券传值
    getchildVouchers(data) {
      if (data != null || data != "") {
        console.log("券传值", data);
        this.arrName = [];
        this.arrId = [];
        data.forEach(item => {
          this.arrName.push(item.CouponName);
          this.arrId.push(item.Id);
        });
        this.CouponName = this.arrName.join(",");
        this.CouponId = this.arrId.join(",");
        console.log("商品回值", this.CouponId);
      } else {
        this.CouponId = "";
        this.CouponName = "";
      }
      this.$refs.VouchersDialog.close();
    },
    // 券类型  UseTypeType
    getUseType() {
      const para = {
        EnumType: "UseTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.UseTypeType = res.Result.Data;
      });
    },
    //机构  UseTypeType
    getOrganization() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.OrganizationIdType = res.Result.Data;
      });
    },
    //营销来源
    getSourceIdTyp() {
      GetMarketingInfo().then(res => {
        console.log(res.Result);
        this.SourceIdType = res.Result.Data;
      });
    },
    // MarketingType
    GetCRMCouponList() {
      GetCouponCatalogs().then(res => {
        console.log(res.Result);
        this.MarketingType = res.Result.Data;
        if (this.MarketingType) {
          //优惠券分类添加全部分类
          this.MarketingType.unshift(
            {
              Id: null,
              Code: "",
              Name: "全部",
              parent: ""
            },
            {
              Id: 0,
              Code: "",
              Name: "未分类",
              parent: ""
            }
          );
        }
      });
    }
  },
  mounted() {
    this.getUsers();
    this.getUseType();
    this.getSourceIdTyp();
    this.getOrganization();
    this.GetCRMCouponList();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style  scoped>
</style>
