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
        <ComboBox
          v-model="State"
          :data="StateTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">状态</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
      <!-- <div class="query mb-20">
        <DateBox v-model="StartDate" format="yyyy-MM-dd" placeholder="操作日期 （起）"></DateBox>
        <DateBox v-model="EndDate" format="yyyy-MM-dd" placeholder="操作日期 （止）"></DateBox>
        <TextBox v-model="Name" placeholder="方案名称 ">
          <Addon>
            <span
              v-if="Name"
              class="iconmessage-close iconfont f-12 f-r mr-10"
              title="Clear value"
              @click="Name=''"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="State"
          :data="StateTypeData"
          valueField="Code"
          textField="Name"
          placeholder="状态"
        ></ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn" @click="MenberSearchTop()">搜索</LinkButton>
      </div>-->
    </div>
    <!-- table -->
    <p class="pstyle">
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
      :columnResizing="true"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
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
      <GridColumn field="Name" title="营销方案名称" align="center">
         <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="MarketingType" title="营销方案类型" align="center">
         <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.MarketingType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="EffectDate" title="生效日期" width="180" align="center">
         <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.EffectDate}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorTime" title="修改日期" width="180" align="center">
         <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.LastUpdatorTime}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorName" title="修改人" align="center">
         <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.LastUpdatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="State" title="状态" align="center">
         <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.State}}</div>
        </template>
      </GridColumn>
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
    </template> -->
    <!-- 弹框 -->
    <Dialog
      ref="MenberAddDialog"
      title="拉新"
      :dialogStyle="{width:'680px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <MarketNew ref="ketNew" @childRadio="getchildRecharge" :RegisteredEdit="RegisteredData"></MarketNew>

      <template v-slot:footer>
        <LinkButton @click="$refs.ketNew.submitForm()" class="btnConfirm">确认</LinkButton>
      </template>
    </Dialog>

    <!-- 机构 -->
    <Dialog
      ref="MoneyEditDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="机构"
    >
      <institutionsData @childRadio="getchildValue"></institutionsData>
    </Dialog>
  </div>
</template>
<script>
import {
  GetMemberRecommendMarketings,
  AddMemberRecommendMarketing,
  GetMemberRecommendMarketing,
  UpdateMemberRecommendMarketing,
  UpdateMarketingState,
  GetEnumList,
  GetMemberLevel
} from "@/api/Market";
import { parseTime } from "@/utils/index";
import institutionsData from "@/components/InstitutionsRadio";
import MarketNew from "@/components/MarketNew";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      //搜索
      RegisteredData: "",
      IsNotShowExpire: "",
      StartDate: new Date(),
      EndDate: new Date(),
      Name: "",
      AgencySearch: "",
      Agencyvalue: "",
      State: 1,
      StateTypeData: [],
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
  components: { institutionsData, MarketNew },
  methods: {
      queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1=!this.iconxiangshang1;
      this.iconxiangxia1=!this.iconxiangxia1;
      let that = this;
      setTimeout(function(){
        that.gridHeight = that.resizeTable();
      },0)
    },
    //添加传值
    getchildRecharge(data) {
      console.log(data + "/拉新传值");
      if (data == 0) {
        this.$refs.MenberAddDialog.close();
        this.getUsers();
      }
    },
    //搜索机构传值
    getchildValue(data) {
      console.log(data);
      this.$refs.MoneyEditDialog.close();
      this.Agencyvalue = data.Id;
      this.AgencySearch = data.Name;
      console.log(this.AgencySearch, this.Agencyvalue);
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
        Name: this.Name,
        StartDate: parseTime(this.StartDate, "{yyyy}-{mm}-{dd} {h}:{i}:{s}"),
        EndDate: parseTime(this.EndDate, "{yyyy}-{mm}-{dd} {h}:{i}:{s}"),
        State: this.State
        // IsNotShowExpire:true
      };
      console.log(para);
      GetMemberRecommendMarketings(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },

    //添加
    handleRegisteredAdd() {
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
    //编辑
    handleEdit(index, row) {
      this.dialogStatus = "";
      const para = {
        MarketingId: row.MarketingId,
        MarketingSublistId: row.MarketingSublistId
      };
      console.log(para);
      this.RegisteredData = para;
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    },
    //状态
    TypeMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateTypeData = res.Result.Data;
      });
    },
    //启用
    disableBtn(index, row) {
      if (row.State == "启用") {
        row.State = 0;
      } else {
        row.State = 1;
      }
      const para = {
        Id: row.MarketingId,
        State: row.State
      };
      console.log(para);
      UpdateMarketingState(para).then(res => {
        console.log(res.Result);
        this.getUsers();
      });
    }
  },
  mounted() {
    this.getUsers();
    this.TypeMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>

