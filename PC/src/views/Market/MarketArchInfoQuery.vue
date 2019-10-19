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
        <TextBox placeholder=" " v-model="MemberCouponCardNo">
          <span class="query_title">券号</span>
          <Addon>
            <span
              v-if="MemberCouponCardNo"
              class="textbox-icon icon-clear"
              @click="MemberCouponCardNo=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="MemberName">
          <span class="query_title">会员名称</span>
          <Addon>
            <span v-if="MemberName" class="textbox-icon icon-clear" @click="MemberName=null"></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="MemberComboCardNo">
          <span class="query_title">套餐流水号</span>
          <Addon>
            <span
              v-if="MemberComboCardNo"
              class="textbox-icon icon-clear"
              @click="MemberComboCardNo=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="MemberCode">
          <span class="query_title">会员编码</span>
          <Addon>
            <span v-if="MemberCode" class="textbox-icon icon-clear" @click="MemberCode=null"></span>
          </Addon>
        </TextBox>
        <TextBox placeholder v-model="MemberPhone">
          <span class="query_title">会员手机号</span>
          <Addon>
            <span v-if="MemberPhone" class="textbox-icon icon-clear" @click="MemberPhone=null"></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="UseType"
          :data="UseTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">券类型</span>
        </ComboBox>
        <ComboBox
          v-model="MarketingType"
          :data="MarketingTypeData"
          textField="Name"
          valueField="Code"
          placeholder
          @selectionChange="getMarketingType"
        >
          <span class="query_title">方案类型</span>
        </ComboBox>
        <ComboBox
          v-model="SourceId"
          :data="SourceIdType"
          valueField="MarketingId"
          textField="MarketingName"
          placeholder
        >
          <span class="query_title">方案名称</span>
        </ComboBox>
        <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">机构</span>
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
        <Tree :data="CouponTypeData" @selectionChange="selection($event)">
          <template slot-scope="scope">
            <span>{{scope.node.Name}}</span>
          </template>
        </Tree>
      </div>
      <DataGrid
        :data="Menberlist"
        style="padding-left:210px"
        :style="'height:' + gridHeight + 'px;'"
        :columnResizing="true"
        :lazy="true"
        :pageNumber="pageNumber"
        :pagination="true"
        :total="total"
        :pageSize="pageSize"
        @pageChange="pageChange($event)"
      >
        <GridColumnGroup :frozen="true" align="left" width="630">
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
            <GridColumn field="MemberCouponCardNo" title="券号" width="180" align="center">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.MemberCouponCardNo}}</div>
              </template>
            </GridColumn>
            <GridColumn field="CouponName" title="券名称" width="180" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.CouponName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="UseType" title="券类型" width="100" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.UseType}}</div>
              </template>
            </GridColumn>
          </GridHeaderRow>
        </GridColumnGroup>
        <GridColumnGroup>
          <GridHeaderRow>
            <GridColumn field="DiscountAmount" title="折扣金额/折扣" width="100" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="right">{{parseFloat(scope.row.DiscountAmount).toFixed(2)}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MemberCode" title="会员编码" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.MemberCode}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MemberName" title="会员名称" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.MemberName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MemberPhone" title="会员手机号" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.MemberPhone}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MemberComboCardNo" title="套餐流水号" width="180" align="center">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.MemberComboCardNo}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MarketingName" title="营销方案名称" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.MarketingName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MarketingType" title="营销方案类型" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.MarketingType}}</div>
              </template>
            </GridColumn>
            <GridColumn field="ExpireDate" title="有效期" width="250" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.ExpireDate}}</div>
              </template>
            </GridColumn>
            <GridColumn field="CreatorTime" title="创建时间" width="200" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.CreatorTime}}</div>
              </template>
            </GridColumn>
            <GridColumn field="UseState" title="使用状态" width="100" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.UseState}}</div>
              </template>
            </GridColumn>
            <GridColumn field="UseState" title="来源类型" width="100" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.SourceType}}</div>
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
  </div>
</template>
<script>
import {
  GetMemberCouponInfo,
  GetCouponCatalogs,
  GetEnumList,
  GetOrgByUser,
  GetMarketingInfo
} from "@/api/Market";
import { parseTime } from "@/utils/index";
import Vouchers from "@/components/Vouchers";
import CouponSort from "@/components/Market/CouponSort";
import dayjs from "dayjs";
export default {
  data() {
    return {
      //搜索
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      CreatorStartTime: dayjs()
        .add(-1, "month")
        .toDate(),
      CreatorEndTime: dayjs().toDate(),
      MemberCouponCardNo: "",
      MemberCode: "",
      MemberName: "",
      MemberPhone: "",
      MemberComboCardNo: "",
      OrganizationId: "",
      IsUse: "",
      UseType: null,
      CouponName: "",
      CouponId: "",
      SourceId: "",
      CouponCatalogId: "",
      Menberlist: [],
      Menberlist: [],
      UseTypeData: [],
      SourceIdType: [],
      MarketingType: null,
      CouponTypeData: [],
      MarketingTypeData: [],
      OrganizationIdData: [],
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
  components: { Vouchers },
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
        MemberComboCardNo: this.MemberComboCardNo,
        MemberCode: this.MemberCode,
        MemberName: this.MemberName,
        MemberPhone: this.MemberPhone,
        OrganizationId: this.OrganizationId,
        CouponCatalogId: this.CouponCatalogId,
        IsUse: true,
        UseType: this.UseType,
        CouponId: this.CouponId,
        SourceId: this.SourceId,
        MarketingType: this.MarketingType
      };
      console.log(para);
      GetMemberCouponInfo(para).then(res => {
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
    //券传值
    getchildVouchers(data) {
      if (data != null || data != "") {
        console.log("券传值", data);
        this.arrName = [];
        this.arrId = [];
        data.forEach(item => {
          this.arrName.push(item.CouponName);
          this.arrId.push(item.CouponId);
        });
        this.CouponName = this.arrName.join(",");
        this.CouponId = this.arrId.join(",");
        console.log("商品回值", this.CouponId);
      } else {
        this.CouponId = "";
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
        this.UseTypeData = res.Result.Data;
      });
    },
    // 营销类型  UseTypeType
    getMarketingType() {
      this.SourceId = "";
      const para = {
        EnumType: "MarketingTypeEnum"
      };
      console.log(para);
      GetEnumList(para).then(res => {
        console.log(res.Result);
        if (res.Result && res.Result.Data && res.Result.Data.length) {
          this.MarketingTypeData = res.Result.Data;
        } else {
          this.MarketingTypeData = [];
        }
        console.log(this.MarketingType);
        if (
          this.MarketingType ||
          this.MarketingType != "" ||
          this.MarketingType != null
        )
          var para1 = {
            MarketingType: this.MarketingType
          };
        GetMarketingInfo(para1).then(res => {
          console.log(res.Result);
          this.SourceIdType = res.Result.Data;
        });
      });
    },
    //机构  UseTypeType
    getOrganization() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
      });
    },
    // MarketingType
    GetCRMCouponList() {
      GetCouponCatalogs().then(res => {
        console.log(res.Result);
        this.CouponTypeData = res.Result.Data;
        //优惠券分类添加全部分类
        this.CouponTypeData.unshift(
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
      });
    }
  },
  mounted() {
    this.getUsers();
    this.getUseType();
    this.getOrganization();
    this.getMarketingType();
    this.GetCRMCouponList();
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
<style  scoped>
</style>
