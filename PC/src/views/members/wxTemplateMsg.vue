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
        <TextBox placeholder=" " v-model="wxId">
          <Addon>
            <span
              v-if="wxId"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="wxId=null"
            ></span>
          </Addon>
          <span class="query_title">客易宝功能ID</span>
        </TextBox>
        <TextBox placeholder=" " v-model="functionName">
          <Addon>
            <span
              v-if="functionName"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="functionName=null"
            ></span>
          </Addon>
          <span class="query_title">客易宝功能名称</span>
        </TextBox>
        <LinkButton class="iconfont iconsousuo btn-query btn" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius" @click="handleRegisteredAdd">设置模板ID</LinkButton>
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
      <GridColumn align="center" title="操作" field="custome-adv" width="100">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.MenberEditDialog.open();handleEdit(scope.$index, scope.row)"
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
      <GridColumn field="Id" title="客易宝功能ID" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Id}}</div>
        </template>
      </GridColumn>
      <GridColumn field="FunctionName" title="客易宝功能名称" align="center" width="120">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.FunctionName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="TemplateCode" title="微信模板编号" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.TemplateCode}}</div>
        </template>
      </GridColumn>
      <GridColumn field="MessageType" title="微信模板标题" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.MessageType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="TemplateId" title="微信模板ID" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.TemplateId}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Example" title="样例" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Example}}</div>
        </template>
      </GridColumn>
      <GridColumn field="TopContent" title="first" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.TopContent}}</div>
        </template>
      </GridColumn>
      <GridColumn field="BottomContent" title="remark" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.BottomContent}}</div>
        </template>
      </GridColumn>
      <GridColumn field="UpdateName" title="修改人" align="center" width="50">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.UpdateName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="UpdateTime" title="修改时间" align="center" width="140">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.UpdateTime}}</div>
        </template>
      </GridColumn>
      <GridColumn field="State" title="状态" align="center" width="50">
        <template slot="body" slot-scope="scope">
          <div align="center">{{scope.row.State}}</div>
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
      :dialogStyle="{width:'825px',height:'580px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <wxTemplate
        ref="Template"
        @closeDialog="closeDialogFn"
        :RegisteredEdit="RegisteredData"
        @sendMessageTemplateInit="InitData"
      ></wxTemplate>

      <template v-slot:footer>
        <LinkButton @click="$refs.Template.submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton @click="$refs.Template.closeDialog()" class="btnCancel">取消</LinkButton>
      </template>
    </Dialog>
    <!-- 编辑弹框 -->
    <Dialog
      ref="MenberEditDialog"
      :title="title"
      :dialogStyle="{width:'825px',height:'580px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <wxEditTemplate
        ref="submit"
        @closeDialog="closeDialogFn"
        :RegisteredEdit="RegisteredData"
        @sendEditMessageTemplateInit="InitEditData"
      >
      </wxEditTemplate>

      <template v-slot:footer>
        <LinkButton @click="$refs.submit.submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton @click="$refs.MenberEditDialog.close()" class="btnCancel">取消</LinkButton>
      </template>

    </Dialog>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { GetMessageTemplate, UpdateMessageTemplateState } from "@/api/Service";
import { parseTime } from "@/utils/index";
import wxTemplate from "@/components/wxTemplate";
import wxEditTemplate from "@/components/wxEditTemplate";
import {
  DeleteMarketing,
  UpdateMarketingState,
  GetEnumList
} from "@/api/Market";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      //搜索
      StartDate: new Date(),
      IsNotShowExpire: false,
      RegisteredData: {},
      Name: "",
      State: 1,
      wxId: "",
      functionName: "",
      title: "添加",
      StateType: [],
      //DataGrid
      Menberlist: [],
      dialogStatus: "",
      AgencySearch: "",
      StateAll: 0,
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
    };
  },
  components: { wxTemplate, wxEditTemplate },
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
      console.log(index);
      console.log(row);
      this.title = "编辑";
      this.dialogStatus = "update";
      const para = {
        Id: row.ZId
      };
      this.RegisteredData = para;
    },
    closeDialogFn(data) {
      if (data) {
        this.$refs.MenberAddDialog.close();
      }
    },
    //添加
    handleRegisteredAdd() {
      this.title = "设置模板ID";
      this.RegisteredData = "";
      this.$refs.MenberAddDialog.open();
      this.dialogStatus = "create";
      this.MenberDialogForm = {
        MarketingLevel: 0
      };
    },
    closeParentMarket(data) {
      if (data) {
        this.$refs.MenberAddDialog.close();
        this.getCostSaelMarketingsFn(); //重新加载首页
      }
    },
    InitData(data) {
      if (data) {
        this.getInit();
      }
      this.$refs.MenberAddDialog.close();
    },
    InitEditData(data) {
      if (data) {
        this.getInit();
      }
      this.$refs.MenberEditDialog.close();
    },
    //删除
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.confirm({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: row.MarketingId };
            console.log(para);
            DeleteMarketing(para).then(res => {
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
        Id: row.ZId,
        State: this.StateAll
      };
      console.log(para);
      UpdateMessageTemplateState(JSON.stringify(para)).then(res => {
        console.log(res.Result);
        if (res.Result.Code == 0) {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
        }
        this.getInit();
      });
    },
    MenberSearchTop() {
      this.getInit();
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getInit();
    },
    // 查询系统设置
    getInit() {
      var para = {
        Id: this.wxId ? this.wxId : 0,
        FunctionName: this.functionName,
        page: this.pageNumber,
        rows: this.pageSize
      };
      console.log(para);
      //return false;
      GetMessageTemplate(para).then(res => {
        console.log(res.Result);
        if (res && res.Result && res.Result.Code == 0) {
          this.total = res.Result.Total;
          this.Menberlist = res.Result.Rows;
        }
      });
    }
  },
  mounted() {
    this.getInit();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
.btn-primary {
  width: 80px !important;
}
</style>
