<template>
  <div class="container MemberOperationRecords">
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
        <DateBox v-model="OperationTimeStart" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(起)</span>
        </DateBox>
        <DateBox v-model="OperationTimeEnd" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(止)</span>
        </DateBox>
        <TextBox v-model="MemberCode" placeholder>
          <span class="query_title">会员编号</span>
          <Addon>
            <span
              v-if="MemberCode"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="MemberCode=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox v-model="MemberPhone" placeholder>
          <span class="query_title">会员手机号</span>
          <Addon>
            <span
              v-if="MemberPhone"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="MemberPhone=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox v-model="OrderCode" placeholder>
          <span class="query_title">请输入订单号</span>
          <Addon>
            <span
              v-if="OrderCode"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="OrderCode=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox v-model="OperationCode" placeholder>
          <span class="query_title">请输入ERP订单号</span>
          <Addon>
            <span
              v-if="OperationCode"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="OperationCode=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="RegisterOrganizationId"
          :data="OperationOrganizationData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">注册机构</span>
        </ComboBox>
        <ComboBox
          v-model="MemberState"
          :data="StateTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">会员状态</span>
        </ComboBox>
        <ComboBox
          v-model="MemberSource"
          :data="MemberSourceData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">会员来源</span>
        </ComboBox>
        <ComboBox
          v-model="MemberLevel"
          :data="MemberLevelData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">会员等级</span>
        </ComboBox>
        <ComboBox
          v-model="OperationOrganizationId"
          :data="OperationOrganizationData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">操作机构</span>
        </ComboBox>
        <ComboBox
          v-model="OperationDimensionVal"
          :data="OperationDimensionData"
          valueField="OperationDimensionCode"
          textField="OperationDimension"
          placeholder
          @selectionChange="GetOperation"
        >
          <span class="query_title">操作类型</span>
        </ComboBox>
        <ComboBox
          v-model="OperationType"
          :data="OperationTypeData"
          valueField="OperationTypeCode"
          textField="OperationType"
          placeholder
        >
          <span class="query_title">账户操作类型</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn mb-10" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <DataGrid
      ref="grid"
      :data="Menberlist"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
      :columnResizing="true"
      :pagination="true"
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
          <GridColumn
            field="OperationOrganization"
            :frozen="true"
            title="操作门店"
            width="100"
            align="center"
          >
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.OperationOrganization}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrderCode" :frozen="true" title="订单号" width="200" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.OrderCode}}</div>
            </template>
          </GridColumn>
          <GridColumn
            field="OperationCode"
            :frozen="true"
            title="ERP订单号"
            width="200"
            align="center"
          >
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.OperationCode}}</div>
            </template>
          </GridColumn>
        </GridHeaderRow>
      </GridColumnGroup>
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="MemberCode" title="会员编号" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.MemberCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberName" title="会员姓名" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.MemberName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberPhone" title="会员手机号" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.MemberPhone}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberState" title="会员状态" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.MemberState}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OperationDimension" title="操作类型" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.OperationDimension}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OperationType" title="账户操作类型" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.OperationType}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OperationState" title="操作状态" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.OperationState}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberLevel" title="会员等级" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.MemberLevel}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberSource" title="会员来源" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.MemberSource}}</div>
            </template>
          </GridColumn>
          <GridColumn field="RegisterOrganization" title="注册门店" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.RegisterOrganization}}</div>
            </template>
          </GridColumn>
          <GridColumn field="UesrName" title="操作人" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.UesrName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OperationTime" title="操作时间" width="200" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.OperationTime}}</div>
            </template>
          </GridColumn>

          <GridColumn field="OperationBefore" title="操作前" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.OperationBefore}}</div>
            </template>
          </GridColumn>

          <GridColumn field="OperationValue" title="操作值" width="100" align="center">
            <!-- v-if="OValue==true" -->
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.OperationValue}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OperationAfter" title="操作后" width="100" align="center">
            <!-- v-if="OperationStyle==true" -->
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.OperationAfter}}</div>
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
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>-->
  </div>
</template>
<script>
import institutionsData from "@/components/institutionsData";
// import { parseTime } from "@/utils/index";
import dayjs from "dayjs";
import {
  GetOperationDimension,
  GetOperationType,
  GetMemberOperationRecord,
  GetEnumList,
  GetMemberLevel,
  GetOrgByUser
} from "@/api/members";

export default {
  components: { institutionsData },
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      OperationStyle: true,
      OValue: 100,
      // 头部搜索
      OperationTimeStart: dayjs()
        .add(-1, "month")
        .toDate(),
      OperationTimeEnd: dayjs().toDate(),
      MemberPhone: "",
      MemberCode: "",
      MemberState: null,
      MemberSource: null,
      MemberLevel: "",
      OperationOrganization: "",
      OperationDimensionVal: null,
      OperationOrganizationId: "",
      RegisterOrganizationId: "",
      OperationType: "",
      OrderCode: "",
      OperationCode: "",
      OperationOrganization: "",
      OperationOrganizationData: [],
      OperationDimensionData: [],
      OperationTypeData: [],
      MemberLevelData: [],
      MemberSourceData: [],
      StateTypeData: [],
      Menberlist: [],
      //分页
      total: 0,
      pageNumber: 1,
      pageSize: 20
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
      this.GetUserList();
    },
    GetUserList() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        OperationTimeStart:
          dayjs(this.OperationTimeStart).format("YYYY-MM-DD") + " 00:00:00",
        OperationTimeEnd:
          dayjs(this.OperationTimeEnd).format("YYYY-MM-DD") + " 23:59:59",
        // OperationTimeEnd: parseTime(
        //   this.OperationTimeEnd,
        //   "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
        // ),
        MemberPhone: this.MemberPhone,
        MemberCode: this.MemberCode,
        MemberState: this.MemberState,
        MemberSource: this.MemberSource,
        MemberLevelId: this.MemberLevel,
        RegisterOrganizationId: this.RegisterOrganizationId,
        OperationOrganizationId: this.OperationOrganizationId,
        OperationDimensionCode: this.OperationDimensionVal,
        OperationTypeCode: this.OperationType,
        OrderCode: this.OrderCode,
        OperationCode: this.OperationCode
      };
      console.log(para);
      GetMemberOperationRecord(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    MenberSearchTop() {
      this.GetUserList();
      // if (this.OperationDimensionVal == "0008") {
      //   this.GetUserList();
      //   console.log("营销操作", this.OperationDimensionVal);
      //   this.OperationStyle = !this.OperationStyle;
      //   var grid = this.$refs.grid;
      //   console.log("total",grid);
      //   //这个参数好像不是索引
      //   var after = this.$refs.OperationAfter;
      //   grid.collapseGroup(after);
      //   this.OValue = 0;
      // }
      // if (this.OperationDimensionVal == "0002") {
      //   console.log("积分操作", this.OperationDimensionVal);
      // }
      // if (this.OperationDimensionVal == "0001") {
      //   console.log("账户操作", this.OperationDimensionVal);
      //   this.GetUserList();
      // }
      // if (this.OperationDimensionVal == "0007") {
      //   console.log("微信红包操作", this.OperationDimensionVal);
      // }
      // if (this.OperationDimensionVal == "0004") {
      //   console.log("卡操作", this.OperationDimensionVal);
      // }
      // if (this.OperationDimensionVal == "0006") {
      //   console.log("套餐操作", this.OperationDimensionVal);
      // }
    },

    //操作维度
    GetOperation() {
      this.OperationType = "";
      GetOperationDimension().then(res => {
        console.log(res.Result.Data);
        res.Result.Data.unshift({
          Id: null,
          Code: null,
          Name: "全部"
        });
        this.OperationDimensionData = res.Result.Data;
        console.log(this.OperationDimensionVal);
        const para = {
          operationDimensionCode: this.OperationDimensionVal
        };
        console.log("操作类型", para);
        GetOperationType(para).then(res => {
          console.log(res.Result.Data);
          this.OperationTypeData = res.Result.Data;
        });
      });
    },
    //会员来源
    ReferMode() {
      const para = {
        EnumType: "Refer_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        res.Result.Data.unshift({
          Id: null,
          Code: null,
          Name: "全部"
        });
        this.MemberSourceData = res.Result.Data;
      });
    },
    //会员等级
    MemberLevelDataMode() {
      GetMemberLevel().then(res => {
        console.log(res.Result);
        res.Result.Data.unshift({
          Id: null,
          Code: null,
          Name: "全部"
        });
        this.MemberLevelData = res.Result.Data;
      });
    },
    //机构
    OperationOrganizationMode() {
      GetOrgByUser().then(res => {
        console.log("机构", res.Result);
        res.Result.Data.unshift({
          Id: null,
          Code: null,
          Name: "全部"
        });
        this.OperationOrganizationData = res.Result.Data;
      });
    },
    // 会员状态
    StateTypeMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        res.Result.Data.unshift({
          Id: null,
          Code: null,
          Name: "全部"
        });
        this.StateTypeData = res.Result.Data;
      });
    }
  },
  mounted() {
    this.GetUserList();
    this.ReferMode();
    this.OperationOrganizationMode();
    this.MemberLevelDataMode();
    this.StateTypeMode();
    this.GetOperation();
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
<style>
</style>


