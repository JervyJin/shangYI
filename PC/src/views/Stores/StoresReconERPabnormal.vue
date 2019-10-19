<template>
  <div class="container">
    <div class="conTop">
      <div class="topTitle">
        <p class="f-l">
          <span></span>筛选条件
        </p>
        <p class="f-r c-blue" @click="queryToggle">
          <i class="iconfont  f-14" :class="{'icongengduo1-copy':iconxiangshang1,'icongengduo1-copy-copy':iconxiangxia1}" ></i>收起
        </p>
        <p class="f-r">保存筛选条件</p>
        <p class="f-r">使用历史条件</p>
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-if="ToggleStyle">
        <DateBox format="yyyy-MM-dd" placeholder v-model="StartDate">
          <span class="query_title">开始日期(起)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" placeholder v-model="EndDate">
          <span class="query_title">开始日期(止)</span>
        </DateBox>
        <TextBox placeholder=" " v-model="OrderCode">
          <span class="query_title">订单号</span>
          <Addon>
            <span
              v-if="OrderCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="OrderCode=''"
            ></span>
          </Addon>
        </TextBox>
        <TextBox placeholder=" " v-model="MemberCode">
          <span class="query_title">会员编号</span>
          <Addon>
            <span
              v-if="MemberCode"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="MemberCode=''"
            ></span>
          </Addon>
        </TextBox>

        <SearchBox
          placeholder
          v-model="CasherName"
          :value="CasherId"
          :editable="false"
          @search="$refs.CasherIdDialog.open()"
        >
          <span class="query_title">收银员</span>
          <Addon>
            <span
              v-if="CasherId"
              class="textbox-icon icon-clear f-12 f-r"
              title="Clear value"
              @click="CasherId='';CasherName=null"
            ></span>
          </Addon>
        </SearchBox>
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
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
    </p>
    <DataGrid
      :lazy="true"
      :data="Menberlist"
      :pagination="true"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
      :columnResizing="true"
      :pageNumber="pageNumber"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange($event)"
    >
      <GridColumnGroup :frozen="true" align="left" width="520">
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
          <GridColumn title="操作" field="custome-adv" align="center" width="100">
            <template slot="body" slot-scope="scope">
              <LinkButton class="btnEdit" @click="handleEdit(scope.$index, scope.row)">详情</LinkButton>
              <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">释放</LinkButton>
            </template>
          </GridColumn>
          <GridColumn field="OrderCode" title="订单号" width="125" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.OrderCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrderCode" title="erp订单号" width="125" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.ReceiptCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="PayAmount" title="付款金额" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.PayAmount}}</div>
            </template>
          </GridColumn>
        </GridHeaderRow>
      </GridColumnGroup>
      <GridColumnGroup>
        <GridHeaderRow>
          <GridColumn field="MemberName" title="会员姓名" width="120" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.MemberName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="MemberCode" title="会员编码" width="120" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.MemberCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CasherCode" title="收银员编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.CasherCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CasherName" title="收银员姓名" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CasherName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationCode" title="机构编码" width="100" align="center">
            <template slot="body" slot-scope="scope">
              <div align="right">{{scope.row.OrganizationCode}}</div>
            </template>
          </GridColumn>
          <GridColumn field="OrganizationName" title="机构名称" width="180" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.OrganizationName}}</div>
            </template>
          </GridColumn>
          <GridColumn field="CreateTime" title="创建时间" width="180" align="center">
            <template slot="body" slot-scope="scope">
              <div align="left">{{scope.row.CreateTime}}</div>
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
    <!-- 详情 -->
    <Dialog
      ref="MenberAddDialog"
      title="详情"
      :dialogStyle="{width:'800px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <DataGrid
        :data="Menberlevellist"
        :pagination="true"
        class="pd-10 minheight"
        :columnResizing="true"
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
        <GridColumn field="MemberPossessionLockOrderCode" title="锁定订单编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.MemberPossessionLockOrderCode}}</div>
          </template>
        </GridColumn>
        <GridColumn field="GoodCode" title="商品编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.GoodCode}}</div>
          </template>
        </GridColumn>
        <GridColumn field="GoodsCatalogCode" title="商品分类编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.GoodsCatalogCode}}</div>
          </template>
        </GridColumn>
        <GridColumn field="GoodsBrandCode" title="商品品牌编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.GoodsBrandCode}}</div>
          </template>
        </GridColumn>
        <GridColumn field="Num" title="数量" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.Num}}</div>
          </template>
        </GridColumn>
        <GridColumn field="RealityPrice" title="实际价" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.RealityPrice}}</div>
          </template>
        </GridColumn>
        <GridColumn field="GoodsAmount" title="商品金额" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.GoodsAmount}}</div>
          </template>
        </GridColumn>
        <GridColumn field="PayAmount" title="已付金额" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.PayAmount}}</div>
          </template>
        </GridColumn>
      </DataGrid>
    </Dialog>
  </div>
</template>
<script>
import CasherList from "@/components/CasherList";
import dayjs from "dayjs";
import {
  Organization,
  GetStoreSaleDetailed,
  GetEnumList,
  GetOrgByUser,
  GetMemberPossessionLockOrder,
  GetMemberPossessionLockOrderGoods,
  UpdateMemberPossessionLockOrder
} from "@/api/Report";

export default {
  data() {
    return {
      gridHeight: false,
      ToggleStyle: true,
      iconxiangshang1:false,
      iconxiangxia1:true,
      //搜索
      StartDate: dayjs().toDate(),
      EndDate: dayjs().toDate(),
      OrganizationId: "",
      OrderCode: "",
      PaySerialNumber: "",
      CasherId: "",
      CasherName: "",
      GoodsCatalogName: "",
      GoodsBrandName: "",
      ThirdpartyOrderCode: "",
      GoodName: "",
      PayType: 0,
      PayTypeData: [],
      MemberCode: "",
      MemberPhone: "",
      StateData: [],
      OrganizationIdData: [],
      OrderSourceData: [],
      //DataGrid
      Menberlist: [],
      Menberlevellist: [],
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
    queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1=!this.iconxiangshang1;
      this.iconxiangxia1=!this.iconxiangxia1;
      let that = this;
      setTimeout(function(){
        that.gridHeight = that.resizeTable();
      },0)
     
    },
    //员工传值
    childCasherVal(data) {
      console.log(data);
      this.$refs.CasherIdDialog.close();
      this.CasherName = data.UserName;
      this.CasherId = data.Id;
      console.log(data.Id);
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.GetList();
    },
    //
    GetList() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        StartDate: dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00",
        EndDate: dayjs(this.EndDate).format("YYYY-MM-DD") + " 23:59:59",
        OrganizationId: this.OrganizationId,
        OrderCode: this.OrderCode,
        CasherId: this.CasherId,
        MemberCode: this.MemberCode
      };
      console.log(para);
      GetMemberPossessionLockOrder(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //搜索
    MenberSearchTop() {
      this.GetList();
    },
    // 详情
    handleEdit(index, row) {
      console.log(row);
      this.$refs.MenberAddDialog.open();
      const para = {
        Id: row.Id
      };
      GetMemberPossessionLockOrderGoods(para).then(res => {
        console.log(res.Result);
        this.Menberlevellist = res.Result.Data;
      });
    },
    //释放
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.confirm({
        title: "提示",
        msg: "您确定释放此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: row.Id };
            console.log(para);
            UpdateMemberPossessionLockOrder(para).then(res => {
              this.GetList();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //机构
    GetOrgByUserChange() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
      });
    }
  },
  //所属机构
  mounted() {
    this.GetList();
    this.GetOrgByUserChange();
    this.gridHeight = this.resizeTable();
    
  }
};
</script>
<style scoped>
</style>
