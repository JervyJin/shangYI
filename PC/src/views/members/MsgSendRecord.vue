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
        <p class="f-r screeningBtn"  @click="saveCondition()">保存筛选条件</p>
        <p class="f-r historyBtn" @click="employCondition()">使用历史条件</p>
        <!--  <p class="f-r screeningBtn"  @click="saveCondition()">保存筛选条件</p>
        <p class="f-r historyBtn" @click="employCondition()">使用历史条件</p> -->
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-if="ToggleStyle">
        <DateBox v-model="OperationTimeStart" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(起)</span>
        </DateBox>
        <DateBox v-model="OperationTimeEnd" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(止)</span>
        </DateBox>
        <TextBox v-model="MemberPhone" placeholder>
          <span class="query_title">手机号</span>
          <Addon>
            <span
              v-if="MemberPhone"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="MemberPhone=null"
            ></span>
          </Addon>
        </TextBox>
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
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="rowIndex" title="序号" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="center">{{scope.rowIndex + 1}}</div>
            </template>
          </GridColumn>
          <GridColumn field="SmsType" title="信息类型" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="center">{{scope.row.SmsType}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Phone" title="手机号码" width="150" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="center">{{scope.row.Phone}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Content" title="发送内容" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.Content}}</div>
            </template>
          </GridColumn>
          <GridColumn field="UpdateDate" title="操作日期" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.UpdateDate}}</div>
            </template>
          </GridColumn>
          <GridColumn field="State" title="发送状态" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="center">{{scope.row.State}}</div>
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
import dayjs from "dayjs";
import { GetSmsSendRecord } from "@/api/members";

export default {
  components: {},
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      // 头部搜索
      OperationTimeStart: dayjs()
        .add(-1, "month")
        .toDate(),
      OperationTimeEnd: dayjs().toDate(),
      MemberPhone: "",
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
        StartDate:
          dayjs(this.OperationTimeStart).format("YYYY-MM-DD") + " 00:00:00",
        EndDate:
          dayjs(this.OperationTimeEnd).format("YYYY-MM-DD") + " 23:59:59",
        Phone: this.MemberPhone,
        page: this.pageNumber,
        rows: this.pageSize
      };
      console.log(JSON.stringify(para));
      console.log(para);
      GetSmsSendRecord(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    saveCondition(){
      console.log('保存筛选条件')
      const para = {
        StartDate:
          dayjs(this.OperationTimeStart).format("YYYY-MM-DD") + " 00:00:00",
        EndDate:
          dayjs(this.OperationTimeEnd).format("YYYY-MM-DD") + " 23:59:59",
        Phone: this.MemberPhone,
      };
      console.log(para);
      localStorage.setItem("comboMsg",JSON.stringify(para)); //存入 
    },
    employCondition(){

    },
    formatterDate (date) {  //年月日转中国标准时间
      let result = new Date(date);
      return result;
    },
    MenberSearchTop() {
      this.GetUserList();
    }
  },
  mounted() {
    this.GetUserList();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
.query_top .f-field {
  margin-bottom: 10px;
}
</style>