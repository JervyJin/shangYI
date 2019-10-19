<template>
  <div class="container pt-15">
    <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius marginTop l-btn f-inline-row f-content-center l-btn-small " @click="getGoodsSyncList">同步商品</LinkButton>
      <LinkButton class="btnAdd btn-primary radius marginTop l-btn f-inline-row f-content-center l-btn-small" @click="syncBrand">同步品牌</LinkButton>
      <LinkButton class="btnAdd btn-primary radius marginTop l-btn f-inline-row f-content-center l-btn-small" @click="syncCategory">同步分类</LinkButton>
      <LinkButton class="btnAdd btn-primary radius marginTop l-btn f-inline-row f-content-center l-btn-small" @click="syncBusiness">同步商户</LinkButton>
    </p>
    <!-- table -->
    <DataGrid
      :columnResizing="true"
      :data="BasicDatalist"
      :pagination="true"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
      :lazy="true"
      :pageNumber="pageNumber"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange($event)"
    >
      <GridColumn
        align="center"
        field="Id"
        type="index"
        cellCss="datagrid-td-rownumber"
        width="50"
        title="序号"
      >
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="名称" field="SyncType">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.SyncType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="StartSyncTime" title="开始时间" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.StartSyncTime}}</div>
        </template>
      </GridColumn>
      <GridColumn field="EndSyncTime" title="结束时间" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.EndSyncTime}}</div>
        </template>
      </GridColumn>
      <GridColumn field="SyncResult" title="同步结果" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.SyncResult}}</div>
        </template>
      </GridColumn>
      <GridColumn field="SyncCount" title="同步数量" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.SyncCount}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Message" title="同步原因" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Message}}</div>
        </template>
      </GridColumn>
    </DataGrid>
    <!-- 分页 -->
    <!-- <template slot="footer">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNumber="pageNumber"
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>-->
    <!-- 弹框 -->
    <Dialog
      ref="AlertDialog"
      :dialogStyle="{width:'480px',height:'200px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="提示信息"
    >
      <AlertDialog :newMsgCont="msgContent"></AlertDialog>
    </Dialog>
  </div>
</template>
<script>
import {
  GoodsSync,
  BrandSync,
  CatalogSync,
  MerchantSync,
  GetSyncHistory
} from "@/api/members";
import AlertDialog from "@/components/Alert";
export default {
  data() {
    return {
      gridHeight: false,
      total: 0,
      goodNoticeMsg: "正在同步商品中，时间比较长，待加载完毕再操作。",
      brandNoticeMsg: "正在同步品牌中，时间比较长，待加载完毕再操作。",
      cateNoticeMsg: "正在同步分类中，时间比较长，待加载完毕再操作。",
      MerchantNoticeMsg: "正在同步商户中，时间比较长，待加载完毕再操作。",
      pageNumber: 1,
      msgContent: "",
      pageSize: 20,
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
      BasicDatalist: []
    };
  },
  components: { AlertDialog },
  methods: {
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getSyncHistoryFn();
    },

    // 获取同步历史
    getSyncHistoryFn() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize
      };
      GetSyncHistory(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.BasicDatalist = res.Result.Rows;
        console.log(this.total);
      });
    },
    // 同步商品
    getGoodsSyncList() {
      this.msgContent = this.goodNoticeMsg;
      this.$refs.AlertDialog.open();
      GoodsSync().then(res => {
        console.log(JSON.stringify(res));
        console.log(res.Result);
        if (res.Result.Code == 0) {
          //同步成功后
          setTimeout(() => {
            this.$refs.AlertDialog.close();
            this.getSyncHistoryFn();
          }, 1000);
          //this.total = res.Result.Total;
          //this.BasicDatalist = res.Result.Rows;
        } else {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
        }
      });
    },
    // 同步品牌
    syncBrand() {
      this.msgContent = this.brandNoticeMsg;
      this.$refs.AlertDialog.open();
      BrandSync().then(res => {
        console.log(JSON.stringify(res));
        console.log(res.Result);
        if (res.Result.Code == 0) {
          setTimeout(() => {
            this.$refs.AlertDialog.close();
            this.getSyncHistoryFn();
          }, 1000);
          // this.total = res.Result.Total;
          // this.BasicDatalist = res.Result.Rows;
        } else {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
        }
      });
    },
    // 同步分类
    syncCategory() {
      this.msgContent = this.cateNoticeMsg;
      this.$refs.AlertDialog.open();
      CatalogSync().then(res => {
        console.log(JSON.stringify(res));
        console.log(res.Result);
        if (res.Result.Code == 0) {
          setTimeout(() => {
            this.$refs.AlertDialog.close();
            this.getSyncHistoryFn();
          }, 1000);
          // this.total = res.Result.Total;
          // this.BasicDatalist = res.Result.Rows;
        } else {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
        }
      });
    },
    // 同步商户
    syncBusiness() {
      this.msgContent = this.MerchantNoticeMsg;
      this.$refs.AlertDialog.open();
      MerchantSync().then(res => {
        console.log(JSON.stringify(res));
        console.log(res.Result);
        if (res.Result.Code == 0) {
          // this.total = res.Result.Total;
          // this.BasicDatalist = res.Result.Rows;
          setTimeout(() => {
            this.$refs.AlertDialog.close();
            this.getSyncHistoryFn();
          }, 1000);
        } else {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
        }
      });
    }
  },
  mounted() {
    this.getSyncHistoryFn();
    this.gridHeight = this.resizeTable();
  }
};
</script>

