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
        <DateBox format="yyyy-MM-dd" placeholder v-model="StartDate">
          <span class="query_title">日期(起)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" placeholder v-model="EndDate">
          <span class="query_title">日期(止)</span>
        </DateBox>
        <TextBox placeholder=" " v-model="MemberCode">
          <span class="query_title">会员编号</span>
          <Addon>
            <span
              v-if="MemberCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="MemberCode=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="Phone">
          <span class="query_title">手机号</span>
          <Addon>
            <span
              v-if="Phone"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="Phone=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="RegedistOrg"
          :data="RegedistOrgData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">注册门店</span>
        </ComboBox>
        <ComboBox
          v-model="ShoppingOrg"
          :data="ShoppingOrgData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">消费门店</span>
        </ComboBox>
        <SearchBox
          placeholder
          v-model="OrgUserId"
          :value="CasherId"
          :editable="false"
          @search="$refs.CasherIdDialog.open()"
        >
          <span class="query_title">导购</span>
          <Addon>
            <span
              v-if="OrgUserId"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="OrgUserId=null;CasherId=null"
            ></span>
          </Addon>
        </SearchBox>

        <LinkButton
          class="iconfont iconsousuo btn-query btn radius mb-10"
          @click="MenberSearchTop()"
        >搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <div class="pstyle">
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
      <span class="c-red">【此功能如果字段说明没有特别举例说明撤销的金额，统计的金额都只统计正常消费的金额，撤销金额不统计】</span>
    </div>
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
      <GridColumnGroup :frozen="true" align="left" width="450">
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
          <GridColumn field="Code" title="会员编号" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="right">{{scoped.row.Code}}</div>
            </template>
          </GridColumn>
          <GridColumn field="RealName" title="会员名称" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="left">{{scoped.row.RealName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Phone" title="会员手机号" width="150" align="center"></GridColumn>
          <template slot="body" slot-scope="scoped">
            <div align="right">{{scoped.row.Phone}}</div>
          </template>
        </GridHeaderRow>
      </GridColumnGroup>
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="Rank" title="排名" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="right">{{scoped.row.Rank}}</div>
            </template>
          </GridColumn>
          <GridColumn field="ShoppingAmount" title="到店消费金额" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="right">{{scoped.row.ShoppingAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="RefundAmount" title="退货金额" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="right">{{scoped.row.RefundAmount}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationName" title="注册门店" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="left">{{scoped.row.OrganizationName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Sex" title="会员性别" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="left">{{scoped.row.Sex}}</div>
            </template>
          </GridColumn>
          <GridColumn field="LevelName" title="会员等级" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="left">{{scoped.row.LevelName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OriginUserCode" title="所属导购编码" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="right">{{scoped.row.OriginUserCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OriginUserName" title="所属导购名称" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="left">{{scoped.row.OriginUserName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Refer" title="会员来源" align="center" width="120">
            <template slot="body" slot-scope="scoped">
              <div align="left">{{scoped.row.Refer}}</div>
            </template>
          </GridColumn>
          <GridColumn field="WechatOpenId" title="绑定微信" align="center" width="120"></GridColumn>
          <template slot="body" slot-scope="scoped">
            <div align="left">{{scoped.row.WechatOpenId}}</div>
          </template>
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
//
import { parseTime } from "@/utils/index";
import dayjs from "dayjs";
import CasherList from "@/components/CasherList";
import { GetMemberRanking, GetOrgByUser } from "@/api/Report";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      StartDate: dayjs().toDate(),
      EndDate: dayjs().toDate(),
      MemberCode: "",
      Phone: "",
      RegedistOrg: "",
      ShoppingOrg: "",
      RegedistOrgData: [],
      ShoppingOrgData: [],
      CasherId: "",
      OrgUserId: "",
      //DataGrid
      Menberlist: [],
      dialogStatus: "",
      AgencySearch: "",
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
    //员工传值
    childCasherVal(data) {
      console.log(data);
      this.$refs.CasherIdDialog.close();
      this.OrgUserId = data.UserName;
      this.CasherId = data.Id;
      console.log(data.Id);
    },
    GetOrganization() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.RegedistOrgData = res.Result.Data;
        this.ShoppingOrgData = res.Result.Data;
      });
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getUserList();
    },
    queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1 = !this.iconxiangshang1;
      this.iconxiangxia1 = !this.iconxiangxia1;
      let that = this;
      setTimeout(function() {
        that.gridHeight = that.resizeTable();
      }, 0);
    },
    getUserList() {
      const para = {
        StartDate: dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00",
        EndDate: dayjs(this.EndDate).format("YYYY-MM-DD") + " 23:59:59",
        page: this.pageNumber,
        rows: this.pageSize,
        MemberCode: this.MemberCode,
        Phone: this.Phone,
        RegedistOrg: this.RegedistOrg,
        ShoppingOrg: this.ShoppingOrg,
        OrgUserId: this.CasherId
      };
      console.log(para);
      GetMemberRanking(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    MenberSearchTop() {
      this.getUserList();
    }
  },
  mounted() {
    this.getUserList();
    this.GetOrganization();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
</style>
