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
        <p class="f-r" @click="saveCondition()">保存筛选条件</p>
        <p class="f-r" @click="employCondition()">使用历史条件</p>
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-if="ToggleStyle">
        <DateBox format="yyyy-MM-dd" v-model="CreatorStartTime" class>
          <span class="query_title">生成日期(起)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" v-model="CreatorEndTime">
          <span class="query_title">生成日期(止)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" v-model="ExpireStartTime">
          <span class="query_title">失效日期(起)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" v-model="ExpireEndTime">
          <span class="query_title">失效日期(止)</span>
        </DateBox>
        <TextBox v-model="MemberComboCardNo">
          <span class="query_title">套餐流水号</span>
          <Addon>
            <span
              v-if="MemberComboCardNo"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="MemberComboCardNo=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="ComboName">
          <span class="query_title">套餐名称</span>
          <Addon>
            <span
              v-if="ComboName"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="ComboName=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="DarkCardNumber">
          <span class="query_title">实体卡号</span>
          <Addon>
            <span
              v-if="DarkCardNumber"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="DarkCardNumber=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder v-model="Phone">
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
        <TextBox placeholder v-model="MemberCode">
          <span class="query_title">会员编码</span>
          <Addon>
            <span
              v-if="MemberCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="MemberCode=null"
            ></span>
          </Addon>
        </TextBox>
        <!-- <TextBox placeholder="" v-model="OrderCode">
          <span class="query_title">订单编码</span>
          <Addon>
            <span
              v-if="OrderCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="OrderCode=null"
            ></span>
          </Addon>
        </TextBox>-->
        <ComboBox
          v-model="IsUseVal"
          :data="IsUseData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">状态</span>
        </ComboBox>
        <ComboBox
          v-model="SourceType"
          :data="SourceTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">来源类型</span>
        </ComboBox>
        <!-- <ComboBox
          v-model="OrganizationRangeType"
          :data="OrganizationRangeTypeData"
          valueField="Code"
          textField="Name"
          placeholder="机构类型"
        ></ComboBox>-->
        <ComboBox
          v-model="DepositType"
          :data="DepositTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">预存类型</span>
        </ComboBox>
        <ComboBox
          v-model="IsFreeze"
          :data="IsFreezeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">是否绑卡</span>
        </ComboBox>
        <!-- <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Code"
          textField="Name"
          placeholder="机构"
        ></ComboBox>-->
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
      :columnResizing="true"
      :lazy="true"
      :pageNumber="pageNumber"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange($event)"
    >
      <GridColumnGroup :frozen="true" align="left" width="600">
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
          <GridColumn field="MemberComboCardNo" title="套餐流水号" align="center" width="200">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.MemberComboCardNo}}</div>
            </template>
          </GridColumn>
          <GridColumn field="ComboName" title="套餐名称" align="center" width="200">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.ComboName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="DepositType" title="预存类型" align="center">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.DepositType}}</div>
            </template>
          </GridColumn>
        </GridHeaderRow>
      </GridColumnGroup>
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="IsFreeze" title="状态" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.IsFreeze}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Quota" title="支付限额" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.Quota}}</div>
            </template>
          </GridColumn>
          <GridColumn field="DarkCardNumber" title="实体卡号" align="center" width="180">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.DarkCardNumber}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberCode" title="会员编码" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.MemberCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="Phone" title="会员手机" align="center" width="180">
            <template slot="body" slot-scope="scope">
              <div class="title" align="right">{{scope.row.Phone}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CreatorTime" title="生成日期" align="center" width="200">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.CreatorTime}}</div>
            </template>
          </GridColumn>
          <GridColumn field="ExpireDate" title="失效日期" align="center" width="200">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.ExpireDate}}</div>
            </template>
          </GridColumn>
          <GridColumn field="SourceType" title="来源类型" align="center" width="120">
            <template slot="body" slot-scope="scope">
              <div class="title" align="left">{{scope.row.SourceType}}</div>
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
import {
  GetEnumList,
  GetMemberCombos,
  GetListOrganization,
  GetMemberComboInfo
} from "@/api/Combo";
import dayjs from "dayjs";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      CreatorStartTime: dayjs()
        .add(-1, "month")
        .toDate(),
      CreatorEndTime: dayjs().toDate(),
      ExpireStartTime: null,
      ExpireEndTime: null,
      MemberComboCardNo: "",
      ComboName: "",
      Phone: "",
      MemberCode: "",
      OrderCode: "",
      // OrganizationId:"",
      IsUseVal: 0,
      IsFreeze: 1,
      SourceType: null,
      DepositType: null,
      DarkCardNumber: null,
      SourceTypeData: [],
      DepositTypeData: [],
      IsFreezeData: [
        {
          Code: 0,
          Name: "是"
        },
        {
          Code: 1,
          Name: "否"
        }
      ],

      IsUseData: [
        {
          Code: 0,
          Name: "正常"
        },
        {
          Code: 1,
          Name: "冻结"
        }
      ],
      MarketingType: [],
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
  components: {},
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
      if (this.IsUseVal == 0) {
        this.IsUseValStyle = true;
      } else {
        this.IsUseValStyle = false;
      }
      if (this.IsFreeze == 0) {
        this.IsFreezeStyle = true;
      } else {
        this.IsFreezeStyle = false;
      }
      console.log(this.ExpireStartTime);
      if (this.ExpireStartTime) {
        this.ExpireStartTimeALL =
          dayjs(this.ExpireStartTime).format("YYYY-MM-DD") + " 00:00:00";
      }
      if (this.ExpireEndTime) {
        this.ExpireEndTimeALL =
          dayjs(this.ExpireEndTime).format("YYYY-MM-DD") + " 23:59:59";
      }
      const para = {
        CreatorStartTime:
          dayjs(this.CreatorStartTime).format("YYYY-MM-DD") + " 00:00:00",
        CreatorEndTime:
          dayjs(this.CreatorEndTime).format("YYYY-MM-DD") + " 23:59:59",
        ExpireStartTime: this.ExpireStartTimeALL,
        ExpireEndTime: this.ExpireEndTimeALL,
        page: this.pageNumber,
        rows: this.pageSize,
        MemberComboCardNo: this.MemberComboCardNo,
        ComboName: this.ComboName,
        Phone: this.Phone,
        MemberCode: this.MemberCode,
        IsFreeze: this.IsFreezeStyle,
        SourceType: this.SourceType,
        DarkCardNumber: this.DarkCardNumber,
        // OrderCode: this.OrderCode,
        DepositType: this.DepositType,
        IsUseVal: this.IsUseValStyle
      };
      console.log("参数", para);
      GetMemberComboInfo(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    saveCondition(){     //保存筛选条件
      console.log('保存筛选条件')
      const para = {
        CreatorStartTime:
          dayjs(this.CreatorStartTime).format("YYYY-MM-DD") + " 00:00:00",
        CreatorEndTime:
          dayjs(this.CreatorEndTime).format("YYYY-MM-DD") + " 23:59:59",
        ExpireStartTime: this.ExpireStartTimeALL,
        ExpireEndTime: this.ExpireEndTimeALL,
        MemberComboCardNo: this.MemberComboCardNo,
        ComboName: this.ComboName,
        Phone: this.Phone,
        MemberCode: this.MemberCode,
        IsFreeze: this.IsFreezeStyle,
        SourceType: this.SourceType,
        DarkCardNumber: this.DarkCardNumber,
        DepositType: this.DepositType,
        IsUseVal: this.IsUseValStyle
      };
      console.log(para);
      localStorage.setItem("comboMsg",JSON.stringify(para)); //存入 
    },
    employCondition(){     //使用缓存筛选条件
　　  console.log(localStorage.getItem("comboMsg"));//输出
      const para = JSON.parse(localStorage.getItem("comboMsg"));
      console.log(para)
      this.CreatorStartTime = this.formatterDate(para.CreatorStartTime)
      this.CreatorEndTime = this.formatterDate(para.CreatorEndTime)
      this.ExpireStartTimeALL = this.formatterDate(para.ExpireStartTime)
      this.ExpireEndTimeALL = this.formatterDate(para.ExpireEndTime)
      this.MemberComboCardNo = para.MemberComboCardNo
      this.ComboName = para.ComboName
      this.Phone = para.Phone
      this.MemberCode = para.MemberCode
      this.IsFreezeStyle = para.IsFreeze
      this.SourceType = para.SourceType
      this.DarkCardNumber = para.DarkCardNumber
      this.DepositType = para.DepositType
      this.IsUseValStyle = para.IsUseVal

      this.getUsers()
    },
    formatterDate (date) {  //年月日转中国标准时间
      let result = new Date(date);
      return result;
    },
    MenberSearchTop() {
      this.getUsers();
    },
    //来源类型
    SourceTypeMode() {
      const para = {
        EnumType: "MemberAwardSourceTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.SourceTypeData = res.Result.Data;
        console.log(this.SourceTypeData);
      });
    },
    //预存类型
    DepositTypeMode() {
      const para = {
        EnumType: "ApplicableTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.DepositTypeData = res.Result.Data;
        console.log("预存类型", this.DepositTypeData);
      });
    },
    //  机构类型
    OrganizationMode() {
      const para = {
        EnumType: "ComboOrganizationRangeTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.OrganizationRangeTypeData = res.Result.Data;
        console.log(this.OrganizationRangeTypeData);
      });
    },
    //  机构类型
    GetOrganizationMode() {
      GetListOrganization().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
        console.log(this.OrganizationIdData);
      });
    }
  },
  mounted() {
    this.getUsers();
    this.SourceTypeMode();
    this.DepositTypeMode();
    this.OrganizationMode();
    this.GetOrganizationMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style  scoped>
</style>
