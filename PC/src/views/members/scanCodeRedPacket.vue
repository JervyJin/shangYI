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
        <DateBox format="yyyy-MM-dd" placeholder v-model="StartDate">
          <span class="query_title">开始日期(起)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" placeholder v-model="EndDate">
          <span class="query_title">开始日期(止)</span>
        </DateBox>
        <TextBox placeholder=" " v-model="Name">
          <span class="query_title">活动名称</span>
        </TextBox>
        <ComboBox v-model="State" :data="StateType" valueField="Code" textField="Name" placeholder>
          <span class="query_title">状态</span>
        </ComboBox>
        <span class="out-date">
          <CheckBox inputId value="0" v-model="IsNotShowExpire"></CheckBox>
          <span class="ml-5 mr-10">不显示过期</span>
        </span>

        <!-- <SearchBox placeholder="" v-model="AgencySearch" @search="$refs.MoneyEditDialog.open()">
          <span class="query_title">机构</span>
          <Addon>
            <span class="iconguanbi iconfont f-12 f-r" title="Clear value" @click="AgencySearch=''"></span>
          </Addon>
        </SearchBox>-->

        <LinkButton class="iconfont iconsousuo btn-query btn" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <!-- btn-query btn btn-primary batch -->
      <LinkButton
          class="btnAdd btn-primary radius f-16"
          @click="batchDownLoadCodeFn()"
        >批量下载二维码</LinkButton>
      <LinkButton
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="handleRegisteredAdd"
      >添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
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
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.MenberAddDialog.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
          <LinkButton
            class="btnState"
            @click="disableBtn(scope.$index, scope.row)"
            v-if="scope.row.State=='停用'"
          >启用</LinkButton>
          <LinkButton
            class="btnState"
            @click="disableBtn(scope.$index, scope.row)"
            v-if="scope.row.State=='启用'"
          >停用</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="ActiveName" title="活动名称" align="center"></GridColumn>
      <GridColumn field="Times" title="每人每天限领" align="center"></GridColumn>
      <GridColumn field="ValidTime" title="活动有效期" align="center"></GridColumn>
      <GridColumn field="State" title="状态" align="center"></GridColumn>
      <GridColumn field="LastUpdatorName" title="操作人" align="center">
        <template slot="body" slot-scope="scope">
          <div align="center">{{scope.row.LastUpdatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorTime" title="操作日期" align="center"></GridColumn>
    </DataGrid>
    <!-- 分页 -->
    <template slot="footer">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNumber="pageNumber"
        :layout="pagelayout"
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>
    <!-- 弹框 -->
    <Dialog
      ref="MenberAddDialog"
      :title="title"
      :dialogStyle="{width:'925px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <ComboAddCom ref="boAddCom" @sendCloseParentMarket="closeParentMarket" :RegisteredEdit="RegisteredData"></ComboAddCom>


      <template v-slot:footer>
        <LinkButton @click="$refs.boAddCom.submitForm()" class="btnConfirm">确认</LinkButton>
      </template>
    </Dialog>
  </div>
</template>
<script>
import ComboAddCom from "@/components/scanCodeRedPacketSet";
import {
  GetHongBaoActive,
  HongBaoUpdateState,
  DeleteHongBaoActive,
  BatchDownLoadCode
} from "@/api/members";
import { parseTime } from "@/utils/index";
import { GetEnumList } from "@/api/Market";
import { default as request } from "@/utils/api";
import store from "@/store/store";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      //搜索
      StartDate: new Date(),
      EndDate: new Date(),
      IsNotShowExpire: false,
      RegisteredData: {},
      Name: "",
      State: 1,
      title: "添加",
      StateType: [],
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
  components: { ComboAddCom },
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
    //编辑
    handleEdit(index, row) {
      this.title = "编辑";
      this.dialogStatus = "update";
      const para = {
        Id: row.Id
      };
      this.RegisteredData = para;
      this.RowId = row.Id;
      console.log(para, this.RowId);
    },
    //添加
    handleRegisteredAdd() {
      this.title = "添加";
      this.RegisteredData = "";
      this.$refs.MenberAddDialog.open();
      this.dialogStatus = "create";
      this.MenberDialogForm = {
        MarketingLevel: 0,
        Type: 0,
        MarketingMemberLevelList: [],
        MarketingRangeType: 0,
        Code: "",
        Name: "",
        IsWeChat: true,
        IsMsg: true,
        MarketingMsgTemplate: {
          Content: ""
        },
        IsMessage: true,
        MarketingMessageTemplate: {
          Content: ""
        },
        ExpireDateType: 0,
        ExpireBeginDate: "",
        ExpireEndDate: "",
        MarketingTotalNumber: 0,
        MarketingEveryoneNumbe: 0,
        OrganizationRangeType: 0,
        MarketingOrganizationRangeList: [],
        Awardintegral: 0,
        AwardGrowth: 0,
        AwardAmountType: 0,
        AwardFixedAmount: 0,
        RandomMinAmount: 0,
        RandomMaxAmount: 0,
        RandomAmountHint: "",
        AwardRechargeAmoun: 0,
        AwardHongBaoAmount: 0,
        MarketingWeChatAmountTemplate: {},
        MemberLevelType: 0,
        MarketingCouponAwardList: [],
        MarketingComboAwardList: []
      };
    },
    closeParentMarket(data) {
      if (data) {
        this.$refs.MenberAddDialog.close();
        this.getCostSaelMarketingsFn(); //重新加载首页
      }
    },
    //删除
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.confirm({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: row.Id };
            console.log(para);
            DeleteHongBaoActive(para).then(res => {
              this.getCostSaelMarketingsFn();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //停用
    disableBtn(index, row) {
      if (row.State == "启用") {
        this.StateAll = 0;
      } else {
        this.StateAll = 1;
      }
      const para = {
        Id: row.Id,
        State: this.StateAll
      };
      console.log(para);
      HongBaoUpdateState(para).then(res => {
        console.log(res.Result);
        this.getCostSaelMarketingsFn();
      });
    },
    MenberSearchTop() {
      this.getCostSaelMarketingsFn();
    },
    //批量下载二维码
    batchDownLoadCodeFn() {
      var host = request.defaults.baseURL;
      let token = store.state.token;
      console.log(host);
      if (/^\//g.test(host)) {
        host =
          window.location.protocol +
          "//" +
          window.location.host +
          host +
          "/api/imagecode/redboxzipqrcode?token=" +
          token;
        console.log(host);
      } else {
        host = host + "/api/imagecode/redboxzipqrcode?token=" + token;
        console.log(host);
      }
      window.location.href = host;
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getCostSaelMarketingsFn();
    },
    // 查询单笔消费营销列表
    getCostSaelMarketingsFn() {
      const para = {
        ActiveName: this.Name,
        State: this.State,
        isDisplayExpired: this.IsNotShowExpire,
        StartDate: parseTime(this.StartDate, "{yyyy}-{mm}-{dd}") + " 00:00:00",
        EndDate: parseTime(this.EndDate, "{yyyy}-{mm}-{dd}") + " 23:59:59",
        page: this.pageNumber,
        rows: this.pageSize
      };
      console.log(para);
      GetHongBaoActive(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //状态
    TypeMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateType = res.Result.Data;
      });
    }
  },
  mounted() {
    this.TypeMode();
    this.getCostSaelMarketingsFn();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
.batch {
  width: 100px;
  right: 100px;
}
</style>
