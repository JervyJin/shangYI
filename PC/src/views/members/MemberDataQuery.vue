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
        <DateBox v-model="StartDate" format="yyyy-MM-dd" placeholder>
          <span class="query_title">注册日期(起)</span>
        </DateBox>
        <DateBox v-model="EndDate" format="yyyy-MM-dd">
          <span class="query_title">注册日期(止)</span>
        </DateBox>
        <TextBox v-model="GrowthCode" placeholder>
          <span class="query_title">会员编号</span>
          <Addon>
            <span
              v-if="GrowthCode"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="GrowthCode=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox v-model="GrowthPhone" placeholder>
          <span class="query_title">手机号</span>
          <Addon>
            <span
              v-if="GrowthPhone"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="GrowthPhone=null"
            ></span>
          </Addon>
        </TextBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <div id="grid">
      <div class="f-l">
        <MembershipGrade @childValue="getchildValue" :style="'height:' + gridHeight + 'px;'"></MembershipGrade>
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
            <GridColumn field="Code" title="会员编号" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="right">{{scope.row.Code}}</div>
              </template>
            </GridColumn>
            <GridColumn field="Phone" title="会员手机号" align="center" width="150">
              <template slot="body" slot-scope="scope">
                <div class="title" align="right">{{scope.row.Phone}}</div>
              </template>
            </GridColumn>
            <GridColumn field="RealName" title="会员姓名" align="center" width="100">
              <template slot="body" slot-scope="scope">
                <div class="title" align="left">{{scope.row.RealName}}</div>
              </template>
            </GridColumn>
          </GridHeaderRow>
        </GridColumnGroup>
        <GridColumnGroup>
          <GridHeaderRow>
            <GridColumn field="Sex" title="性别" width="80" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="left">{{scope.row.Sex}}</div>
              </template>
            </GridColumn>
            <GridColumn field="Refer" title="来源" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="left">{{scope.row.Refer}}</div>
              </template>
            </GridColumn>
            <GridColumn field="LevelName" title="等级" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="left">{{scope.row.LevelName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="MemberTagCount" title="会员标签" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div
                  class="TagBtnCla"
                  style="text-align:right"
                  @click="TagBtn(scope.$index, scope.row)"
                >{{scope.row.MemberTagCount}}</div>
              </template>
            </GridColumn>
            <GridColumn field="OriginUserName" title="所属导购" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="left">{{scope.row.OriginUserName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="State" title="会员状态" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="left">{{scope.row.State}}</div>
              </template>
            </GridColumn>
            <GridColumn field="WechatUnionId" title="绑定微信" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="left">{{scope.row.WechatUnionId}}</div>
              </template>
            </GridColumn>
            <GridColumn field="Score" title="积分" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div class="title" align="right">{{scope.row.Score}}</div>
              </template>
            </GridColumn>
            <GridColumn field="RegDate" title="注册时间" width="180" align="center">
               <template slot="body" slot-scope="scope">
                <div class="title" align="left">{{scope.row.RegDate}}</div>
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
    <!-- 标签 -->
    <Dialog
      ref="MenberAddDialog"
      title="会员标签"
      :dialogStyle="{width:'400px',height:'350px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <DataGrid :data="menuItems" class="pd-10">
        <GridColumn
          align="center"
          type="index"
          cellCss="datagrid-td-rownumber"
          width="50"
          title="序号"
        >
          <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
        </GridColumn>
        <GridColumn field="Name" title="标签名称" align="left"></GridColumn>
      </DataGrid>
    </Dialog>
  </div>
</template>
<script>
import MembershipGrade from "@/components/MembershipGrade";
// import { parseTime } from "@/utils/index";
import dayjs from "dayjs";
import {
  MemberList,
  MemberAdd,
  MemberRemove,
  MemberEdit,
  MemberEditSave,
  GetTagByMemberId
} from "@/api/members";
export default {
  components: { MembershipGrade },
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      Menberlist: [],
      StartDate: dayjs()
        .add(-1, "month")
        .toDate(),
      EndDate: dayjs().toDate(),
      GrowthCode: "",
      GrowthPhone: null,
      MemberGrade: "",
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
      ],
      //标签
      menuItems: []
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
    TagBtn(index, row) {
      const para = { Id: row.Id };
      console.log(para);
      GetTagByMemberId(para).then(res => {
        this.$refs.MenberAddDialog.open();
        this.menuItems = res.Result.Data;
        console.log(this.menuItems);
      });
    },
    //传值
    getchildValue(data) {
      console.log(data);
      this.MemberGrade = data.Id;
      this.getUsers();
      console.log(this.MemberGrade);
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getUsers();
    },
    // 获取用户列表
    getUsers() {
      // var StartDateType = parseTime(
      //   this.StartDate,
      //   "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
      // );
      // var EndDateType = parseTime(this.EndDate, "{yyyy}-{mm}-{dd} {h}:{i}:{s}");
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Code: this.GrowthCode,
        Phone: this.GrowthPhone,
        RegDateStart: dayjs(this.StartDate).format("YYYY-MM-DD"),
        RegDateEnd: dayjs(this.EndDate).format("YYYY-MM-DD"),
        LevelId: this.MemberGrade
        // LevelId: "08d716fc-23b1-cd1a-c026-69ac90473e00"
      };
      console.log(para);
      MemberList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    }
  },
  mounted() {
    this.getUsers();
    this.gridHeight = this.resizeTable();
  }
};
</script>


