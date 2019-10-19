<template>
  <div class="container MemberOperationRecords">
    <div class="conTop">
      <p class="topTitle">券兑换历史</p>
      <!-- 搜索 -->
      <div class="query">
        <DateBox v-model="OperationTimeStart" format="yyyy-MM-dd" placeholder>
          <span class="query_title">领取日期(起)</span>
        </DateBox>
        <DateBox v-model="OperationTimeEnd" format="yyyy-MM-dd" placeholder>
          <span class="query_title">领取日期(止)</span>
        </DateBox>
        <TextBox v-model="MemberCode" placeholder>
          <span class="query_title">券编码/名称</span>
          <Addon>
            <span
              v-if="MemberCode"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="MemberCode=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="MemberState"
          :data="StateTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">适用类型</span>
        </ComboBox>
        <ComboBox
          v-model="MemberSource"
          :data="MemberSourceData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">券类型</span>
        </ComboBox>
        <ComboBox
          v-model="MemberLevel"
          :data="MemberLevelData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">使用状态</span>
        </ComboBox>
        <TextBox v-model="MemberPhone" placeholder>
          <span class="query_title">编号/手机号</span>
          <Addon>
            <span
              v-if="MemberPhone"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="MemberPhone=null"
            ></span>
          </Addon>
        </TextBox>
        <LinkButton class="iconfont iconsousuo btn-query btn">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <DataGrid
      :data="Menberlist"
      :pagination="true"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
      :lazy="true"
      :pageNumber="pageNumber"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange($event)"
    >
      <GridColumnGroup :frozen="true" align="left" width="351">
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
            title="券编码"
            width="100"
            align="center"
          >
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.OperationOrganization}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrderCode" :frozen="true" title="券名称" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.OrderCode}}</div>
            </template>
          </GridColumn>
          <GridColumn
            field="OperationCode"
            :frozen="true"
            title="券金额/折扣"
            width="100"
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
          <GridColumn field="MemberCode" title="适用类型" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.MemberCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberName" title="兑换人" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.MemberName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberPhone" title="消耗积分" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.MemberPhone}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberState" title="使用状态" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.MemberState}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OperationDimension" title="状态" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.OperationDimension}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OperationType" title="使用时间" width="100" align="center"></GridColumn>
          <GridColumn field="OperationState" title="订单号" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.OperationState}}</div>
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
  </div>
</template>
<script>
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      gridHeight: false,
      // 头部搜索
      OperationTimeStart: new Date(),
      OperationTimeEnd: new Date(),
      Menberlist:[],
      MemberPhone:"",
      MemberLevel:"",
      MemberLevelData:[],
      MemberSource:"",
      MemberSourceData:[],
      MemberState:"",
      StateTypeData:[],
      MemberCode:"",
      total: 0,
      pageSize: 20,
      pageNumber: 1
    };
  },
  methods: {
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.GetUserList();
    },

    GetUserList() {
      const para = {
        OperationTimeStart: parseTime(
          this.OperationTimeStart,
          "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
        ),
        OperationTimeEnd: parseTime(
          this.OperationTimeEnd,
          "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
        ),
        MemberPhone: this.MemberPhone,
        MemberCode: this.MemberCode,
        MemberState: this.MemberState,
        MemberSource: this.MemberSource,
        MemberLevel: this.MemberLevel,
        OperationOrganization: this.OperationOrganization,
        OperationDimension: this.OperationDimensionVal,
        OperationType: this.OperationType,
        OrderCode: this.OrderCode,
        OperationCode: this.OperationCode,
        page: this.pageNumber,
        rows: this.pageSize
      };
      console.log(para);
      GetMemberOperationRecord(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    }
  },
  mounted() {
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
</style>