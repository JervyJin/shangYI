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
        <DateBox v-model="StartDate" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(起)</span>
        </DateBox>
        <DateBox v-model="EndDate" format="yyyy-MM-dd" placeholder>
          <span class="query_title">操作日期(止)</span>
        </DateBox>
        <TextBox v-model="Code" placeholder=" ">
          <span class="query_title">套餐编码</span>
          <Addon v-if="Code">
            <span
              class="iconmessage-close iconfont f-12 f-r mr-10"
              title="Clear value"
              @click="Code=''"
            ></span>
          </Addon>
        </TextBox>
        <TextBox v-model="Name" placeholder=" ">
          <span class="query_title">套餐名称</span>
          <Addon v-if="Name">
            <span
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
          placeholder
        >
          <span class="query_title">状态</span>
        </ComboBox>
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
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">机构</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn mb-10" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius iconfont iconadd f-16" @click="handAdd">添加</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
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
      <GridColumn align="center" title="操作" field="custome-adv" width="150">
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
      <GridColumn field="Code" title="套餐编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="套餐名称" width="200" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="DepositType" title="预存类型" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.DepositType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="SalePrice" title="零售价" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.SalePrice}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Picture" title="图片" align="center"></GridColumn>
      <GridColumn field="State" title="状态" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.State}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CreatorName" title="操作人" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.CreatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CreatorTime" title="操作日期" width="200" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.CreatorTime}}</div>
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
    </template>-->
    <!-- 弹框 -->
    <Dialog
      ref="MenberAddDialog"
      :title="title"
      :dialogStyle="{width:'825px',height:'700px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <ComboAddCom ref="AddCom" @childMemoria="childMemoriaC" :RegisteredEdit="RegisteredData"></ComboAddCom>
      <template v-slot:footer>
        <LinkButton @click="$refs.AddCom.buttonTan()" class="btnConfirm">确认</LinkButton>
      </template>
    </Dialog>
  </div>
</template>
<script>
import {
  ComboList,
  ComboAdd,
  ComboRemove,
  ComboEdit,
  ComboEditSave,
  GetMemberLevel,
  GetEnumList,
  ComboState,
  GetListOrganization
} from "@/api/Combo";
import dayjs from "dayjs";
import { parseTime } from "@/utils/index";
import ComboAddCom from "@/components/ComboAddCom";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      StartDate: dayjs().add(-1, "month").toDate(),                    //开始时间
      // StartDate: 2019-06-11,
      EndDate: dayjs().toDate(),      //结束时间
      title: "新增",
      Code: "",                    //套餐编号
      Name: "",                   //套餐名称
      AgencySearch: "",
      Agencyvalue: "",
      State: 1,                   //1启用 0停用
      StateTypeData: [],
      DepositType: null,      //机构类型0 1 2 3
      DepositTypeData: [],
      Menberlist: [],
      dialogStatus: "",
      RegisteredData: "",
      OrganizationId: "",
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
    childMemoriaC(data) {
      console.log(data + "/套餐传值");
      if (data == 0) {
        this.$refs.MenberAddDialog.close();
        this.getUsers();
      }
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getUsers();
    },
    // 获取用户列表
    getUsers() {
      // var StartDateType =

      // parseTime(
      //   this.StartDate,
      //   "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
      // );
      // var EndDateType = parseTime(this.EndDate, "{yyyy}-{mm}-{dd} {h}:{i}:{s}");

      console.log(this.StartDate)
      console.log(dayjs().toDate())
      console.log(dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00")


      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Name: this.Name,
        Code: this.Code,
        StartDate: dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00",
        EndDate: dayjs(this.EndDate).format("YYYY-MM-DD") + " 23:59:59",
        State: this.State,
        DepositType: this.DepositType,
        OrganizationId: this.OrganizationId
      };
      console.log(para);
      ComboList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //添加
    handAdd() {
      this.title = "新增";
      this.$refs.MenberAddDialog.open();
      this.RegisteredData = null;
      this.dialogStatus = "create";
      this.MenberDialogForm = {
        Code: "",
        Name: "",
        DepositType: 0,
        DiscountAmount: 0,
        SalePrice: 0,
        Quota: 0,
        CouponNum: 0,
        ExpireDateType: 0,
        EffectExpireMonths: 0,
        IsTransmit: true,
        IsShare: true,
        OrganizationRangeType: 0,
        Picture1: "",
        Picture2: "",
        Remark: "",
        State: 0,
        ComboApplicableCouponList: [],
        ComboExceptionGoodsList: [],
        ComboGoodsBrandList: [],
        ComboGoodsCatalogList: [],
        ComboGoodsList: [],
        ComboOrganizationRangeList: []
      };
    },
    handleEdit(index, row) {
      this.title = "编辑";
      this.dialogStatus = "";
      const para = {
        Id: row.Id
      };
      console.log(para);
      this.RegisteredData = para;
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
            ComboRemove(para).then(res => {
              this.getUsers();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },

    saveCondition(){     //保存筛选条件
      console.log('保存筛选条件')
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Name: this.Name,
        Code: this.Code,
        StartDate: dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00",
        EndDate: dayjs(this.EndDate).format("YYYY-MM-DD") + " 23:59:59",
        State: this.State,
        DepositType: this.DepositType,
        OrganizationId: this.OrganizationId
      };
      console.log(para);
      localStorage.setItem("combo",JSON.stringify(para)); //存入 
    },
    employCondition(){     //适用缓存筛选条件
　　  console.log(localStorage.getItem("combo"));//输出
      const para = JSON.parse(localStorage.getItem("combo"));
      console.log(para)
      this.Code = para.Code
      this.Name = para.Name
      this.State = para.State
      this.DepositType = para.DepositType
      this.Name = para.Name
      this.StartDate = this.formatterDate(para.StartDate)
      this.EndDate = this.formatterDate(para.EndDate)
      this.getUsers()
    },
    formatterDate (date) {
      let result = new Date(date);
      return result;
    },
    // 头部搜索
    MenberSearchTop(index, row) {   //筛选条件搜索按钮
      this.getUsers();
    },
    //启用
    disableBtn(index, row) {
      if (row.State == "停用") {
        this.StateID = 1;
      } else {
        this.StateID = 0;
      }
      const para = {
        Id: row.Id,
        State: this.StateID
      };
      console.log(para);
      ComboState(para).then(res => {
        console.log(res.Result);
        this.getUsers();
      });
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
    //预存类型
    DepositMode() {
      const para = {
        EnumType: "ApplicableTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.DepositTypeData = res.Result.Data;
      });
    },
    //
    OrganizationMode() {
      GetListOrganization().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
      });
    }
  },
  mounted() {
    this.getUsers();
    this.TypeMode();
    this.DepositMode();
    this.OrganizationMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
</style>

