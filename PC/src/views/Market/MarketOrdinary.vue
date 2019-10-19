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
          <span class="query_title">修改日期(起)</span>
        </DateBox>
        <DateBox v-model="EndDate" format="yyyy-MM-dd" placeholder>
          <span class="query_title">修改日期(止)</span>
        </DateBox>
        <TextBox v-model="Name" placeholder=" ">
          <span class="query_title">方案名称</span>
          <Addon>
            <span
              v-if="Name"
              class="iconmessage-close iconfont f-12 f-r mr-5"
              title="Clear value "
              @click="Name=''"
            ></span>
          </Addon>
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
        <LinkButton class="iconfont iconsousuo btn-query btn" @click="MenberSearchTop">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton
        v-if="MarketingTypeAll==''"
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="handleRegisteredAdd('Registered')"
      >添加</LinkButton>
      <!-- 纪念日添加 -->
      <LinkButton
        v-if="MarketingTypeAll=='Memoria'"
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="handleRegisteredAdd('Memoria')"
      >添加</LinkButton>
      <!-- 特权添加 -->
      <LinkButton
        v-if="MarketingTypeAll=='Privilege'"
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="handleRegisteredAdd('Privilege')"
      >添加</LinkButton>
      <!-- 分享添加 -->
      <LinkButton
        v-if="MarketingTypeAll=='Share'"
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="handleRegisteredAdd('Share')"
      >添加</LinkButton>
      <!-- 注册添加 -->
      <LinkButton
        v-if="MarketingTypeAll=='Registered'"
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="handleRegisteredAdd('Registered')"
      >添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <div id="grid">
      <div class="container_tree" :style="'height:' + gridHeight + 'px;'">
        <h4>营销类型</h4>
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
        <GridColumn
          align="center"
          type="index"
          cellCss="datagrid-td-rownumber"
          width="50"
          title="序号"
        >
          <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
        </GridColumn>
        <GridColumn align="center" title="操作" field="custome-adv" width="100">
          <template slot="body" slot-scope="scope">
            <LinkButton
              class="btnEdit"
              v-if="scope.row.MarketingType=='纪念日营销'"
              @click="$refs.MenberMemoriaDialog.open();handleEdit(scope.$index, scope.row)"
            >编辑</LinkButton>
            <LinkButton
              class="btnEdit"
              v-if="scope.row.MarketingType=='特权营销'"
              @click="$refs.MenberRPrivilegeDialog.open();handleEdit(scope.$index, scope.row)"
            >编辑</LinkButton>
            <LinkButton
              class="btnEdit"
              v-if="scope.row.MarketingType=='分享营销'"
              @click="$refs.MenbershareDialog.open();handleEdit(scope.$index, scope.row)"
            >编辑</LinkButton>
            <LinkButton
              class="btnEdit"
              v-if="scope.row.MarketingType=='注册营销'"
              @click="$refs.MenberRegisteredDialog.open();handleEdit(scope.$index, scope.row)"
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
        <GridColumn field="Name" title="营销方案名称" width="180" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.Name}}</div>
          </template>
        </GridColumn>
        <GridColumn field="MarketingType" title="营销方案类型" width="100" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.MarketingType}}</div>
          </template>
        </GridColumn>
        <GridColumn field="EffectDate" title="生效时间" width="200" align="center">
           <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.EffectDate}}</div>
          </template>
        </GridColumn>
        <GridColumn field="LastUpdatorTime" title="修改日期" width="120" align="center">
           <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.LastUpdatorTime}}</div>
          </template>
        </GridColumn>
        <GridColumn field="LastUpdatorName" title="修改人" align="center" width="50">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.LastUpdatorName}}</div>
          </template>
        </GridColumn>
        <GridColumn field="State" title="状态" align="center" width="50">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.State}}</div>
          </template>
        </GridColumn>
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
    <!-- 弹框 -->
    <Dialog
      ref="MenbershareDialog"
      title="分享营销"
      :dialogStyle="{width:'670px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <MarketShare @childRadio="sharechildRadio" :RegisteredEdit="RegisteredData"></MarketShare>
      <!-- <template v-slot:footer>
        <LinkButton @click="$refs.Template.submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton @click="$refs.Template.closeDialog()" class="btnCancel">取消</LinkButton>
      </template> -->
    </Dialog>
    <!-- 修改MenberRegisteredDialog -->
    <Dialog
      ref="MenberRegisteredDialog"
      title="注册营销"
      :dialogStyle="{width:'670px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <MarketRegistered ref="ketRegistered" @childRadio="childRadioC" :RegisteredEdit="RegisteredData"></MarketRegistered>
      <template v-slot:footer>
        <LinkButton @click="$refs.ketRegistered.submitForm()" class="btnConfirm">确认</LinkButton>
        <!-- <LinkButton @click="$refs.ketRegistered.saveForm()" class="btnCancel">取消</LinkButton> -->
      </template>
    </Dialog>
    <!-- 修改 -->
    <Dialog
      ref="MenberRPrivilegeDialog"
      title="特权营销"
      :dialogStyle="{width:'670px',height:'520px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <MarketPrivilege @childPrivilege="childPrivilegeC" :RegisteredEdit="RegisteredData"></MarketPrivilege>
    </Dialog>
    <!-- 修改 -->
    <Dialog
      ref="MenberMemoriaDialog"
      title="纪念日营销"
      :dialogStyle="{width:'670px',height:'650px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <MarketMemoria @childMemoria="childMemoriaC" :RegisteredEdit="RegisteredData"></MarketMemoria>
    </Dialog>
  </div>
</template>
<script>
import {
  ShareMarketingList,
  GetMarketingsList,
  MemoriaMarketingList,
  PrivilegeMarketingList,
  GetEnumList,
  GetMemberLevel,
  UpdateMarketingState
} from "@/api/Market";
import {
  GetMemberLevelComboAward,
  GetMemberLevelCouponAward
} from "@/api/members";
import { parseTime } from "@/utils/index";
import MarketShare from "@/components/MarketShare";
import MarketRegistered from "@/components/MarketRegistered";
import MarketPrivilege from "@/components/MarketPrivilege";
import MarketMemoria from "@/components/MarketMemoria";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      MarketingTypeAll: "",
      //搜索
      StartDate: new Date(),
      EndDate: new Date(),
      Name: "",
      State: 1,
      StateTypeData: [],
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
      ],
      MarketingType: [
        {
          Code: "0",
          Name: "注册营销"
        },
        {
          Code: "1",
          Name: "分享营销"
        }

        //, {
        //   Code: "2",
        //   Name: "特权营销"
        // },
        // {
        //   Code: "3",
        //   Name: "纪念日营销"
        // }
      ],
      RegisteredData: "",
      ShareData: ""
      //弹框
    };
  },
  components: {
    MarketShare,
    MarketRegistered,
    MarketPrivilege,
    MarketMemoria
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

    selection(data) {
      console.log(data.Name);
      if (data.Name == "注册营销") {
        this.getRegistered();
        this.MarketingTypeAll = "Registered";
      } else if (data.Name == "分享营销") {
        this.getShare();
        this.MarketingTypeAll = "Share";
      } else if (data.Name == "特权营销") {
        this.getPrivilege();
        this.MarketingTypeAll = "Privilege";
      } else if (data.Name == "纪念日营销") {
        this.getMemoria();
        this.MarketingTypeAll = "Memoria";
      }
    },
    //注册营销传值
    childRadioC(data) {
      console.log(data);
      console.log(data + "/注册传值");
      if (data == 0) {
        this.$refs.MenberRegisteredDialog.close();
        this.getRegistered();
      }
    },
    //分享传值
    sharechildRadio(data) {
      console.log(data + "/分享传值");
      if (data == 0) {
        this.$refs.MenbershareDialog.close();
        this.getShare();
      }
    },
    //特权传值
    childPrivilegeC(data) {
      console.log(data + "/特权传值");
      if (data == 0) {
        this.$refs.MenberRPrivilegeDialog.close();
        this.getPrivilege();
      }
    },
    //纪念日传值
    childMemoriaC(data) {
      console.log(data + "/纪念日传值");
      if (data == 0) {
        this.$refs.MenberMemoriaDialog.close();
        this.getMemoria();
      }
    },
    // 获取注册列表
    getRegistered() {
      var StartDateType =
        parseTime(this.StartDate, "{yyyy}-{mm}-{dd}") + " 00:00:00";
      var EndDateType =
        parseTime(this.EndDate, "{yyyy}-{mm}-{dd}") + " 23:59:59";
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Name: this.GrowthName,
        StartDate: StartDateType,
        EndDate: EndDateType,
        State: this.State
      };
      console.log(para, "注册营销");
      GetMarketingsList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    // 获取分享列表
    getShare() {
      var StartDateType =
        parseTime(this.StartDate, "{yyyy}-{mm}-{dd}") + " 00:00:00";
      var EndDateType =
        parseTime(this.EndDate, "{yyyy}-{mm}-{dd}") + " 23:59:59";
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Name: this.GrowthName,
        StartDate: StartDateType,
        EndDate: EndDateType,
        State: this.State
      };
      console.log(para, "分享营销");
      ShareMarketingList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    // 获取特权列表
    getPrivilege() {
      var StartDateType =
        parseTime(this.StartDate, "{yyyy}-{mm}-{dd}") + " 00:00:00";
      var EndDateType =
        parseTime(this.EndDate, "{yyyy}-{mm}-{dd}") + " 23:59:59";
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Name: this.GrowthName,
        StartDate: StartDateType,
        EndDate: EndDateType,
        State: this.State
      };
      console.log(para, "特权营销");
      PrivilegeMarketingList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    // 获取纪念日列表
    getMemoria() {
      var StartDateType =
        parseTime(this.StartDate, "{yyyy}-{mm}-{dd}") + " 00:00:00";
      var EndDateType =
        parseTime(this.EndDate, "{yyyy}-{mm}-{dd}") + " 23:59:59";
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Name: this.GrowthName,
        StartDate: StartDateType,
        EndDate: EndDateType,
        State: this.State
      };
      console.log(para, "特权营销");
      MemoriaMarketingList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //添加
    handleRegisteredAdd(addType) {
      this.dialogStatus == "create";
      this.RegisteredData = "";
      this.MenberDialogForm = {
        Type: 0,
        BeginTime: new Date(),
        EndTime: new Date(),
        BeforeDays: 0,
        SendHour: 1,
        DateType: 0,
        Name: "",
        ExpireDateType: 0,
        MarketingTotalNumber: 0,
        MarketingEveryoneNumbe: 0,
        OrganizationRangeType: 0,
        Awardintegral: 0,
        AwardGrowth: 0,
        MemberLevelType: 0,
        Awardintegral: 0,
        AwardGrowth: 0,
        AwardAmountType: 0,
        AwardFixedAmount: 0,
        RandomMinAmount: 0,
        RandomMaxAmount: 0,
        AwardRechargeAmoun: 0,
        AwardHongBaoAmount: 0,
        SharePeoples: 0,
        MarketingMemberLevelList: [],
        MarketingOrganizationRangeList: [],
        MarketingWeChatAmountTemplate: {},
        MemberLevelType: 0,
        MarketingCouponAwardList: [],
        MarketingComboAwardList: [],
        MarketingMsgTemplate: {
          Content: ""
        },
        MarketingMessageTemplate: {
          Content: ""
        },
        PrivilegeType: 0,
        MarketingMemberPrivilegeList: []
      };
      switch (addType) {
        case "Registered":
          this.$refs.MenberRegisteredDialog.open();
          break;
        case "Share":
          this.$refs.MenbershareDialog.open();
          break;
        case "Privilege":
          this.$refs.MenberRPrivilegeDialog.open();
          break;
        case "Memoria":
          this.$refs.MenberMemoriaDialog.open();
          break;
      }
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
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      if (this.MarketingTypeAll == "Registered") {
        this.getRegistered();
      } else if (this.MarketingTypeAll == "Privilege") {
        this.getPrivilege();
      } else if (this.MarketingTypeAll == "Share") {
        this.getShare();
      } else if (this.MarketingTypeAll == "Memoria") {
        this.getMemoria();
      } else {
        this.getRegistered();
      }
    },

    // 头部搜索
    MenberSearchTop() {
      if (this.MarketingTypeAll == "Registered") {
        this.getRegistered();
      } else if (this.MarketingTypeAll == "Privilege") {
        this.getPrivilege();
      } else if (this.MarketingTypeAll == "Share") {
        this.getShare();
      } else if (this.MarketingTypeAll == "Memoria") {
        this.getMemoria();
      } else {
        this.getRegistered();
      }
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
        this.StateAll = 0;
      } else {
        this.StateAll = 1;
      }
      const para = {
        Id: row.MarketingId,
        State: this.StateAll
      };
      console.log(para);
      UpdateMarketingState(para).then(res => {
        console.log(res.Result);
        if (this.MarketingTypeAll == "Registered") {
          this.getRegistered();
        } else if (this.MarketingTypeAll == "Share") {
          this.getShare();
        } else if (this.MarketingTypeAll == "Privilege") {
          this.getPrivilege();
        } else if (this.MarketingTypeAll == "Memoria") {
          this.getMemoria();
        }
      });
    }
  },
  mounted() {
    this.TypeMode();
    this.gridHeight = this.resizeTable();
    this.getRegistered();
    // this.MarketingMode();
  }
};
</script>
<style scoped>
.formStyle_img {
  height: 150px;
}
.formStyle_img .textbox-label {
  background-color: #fff;
  line-height: 150px;
  height: 149px;
  float: left;
}
</style>

