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
        <TextBox v-model="BeginRegion" placeholder=" ">
          <span class="query_title">开始卡号</span>
          <Addon>
            <span
              v-if="BeginRegion"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="BeginRegion=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox v-model="EndRegion" placeholder=" ">
          <span class="query_title">结束卡号</span>
          <Addon>
            <span
              v-if="EndRegion"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="EndRegion=null"
            ></span>
          </Addon>
        </TextBox>
        <TextBox v-model="BatchNo" placeholder=" ">
          <span class="query_title">制卡批次</span>
          <Addon>
            <span
              v-if="BatchNo"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="BatchNo=null"
            ></span>
          </Addon>
        </TextBox>
        <!-- <ComboBox
          valueField="Code"
          textField="Name"
          :data="CardTypeData"
          v-model="IsDisplayVAL"
          placeholder="卡类型 "
        ></ComboBox>-->
        <LinkButton class="iconfont iconsousuo btn-query btn bradius" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
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
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn field="No" title="卡号" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.No}}</div>
        </template>
      </GridColumn>
      <GridColumn field="DarkNo" title="暗卡号" align="center">
        <template slot="body" slot-scope="scope">
          <div
            class="c-blue"
            align="right"
            @click="DarkNoDetail(scope.row.DarkNo)"
          >{{scope.row.DarkNo}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Batch" title="批次" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Batch}}</div>
        </template>
      </GridColumn>
      <GridColumn field="WriteState" title="写卡状态" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.WriteState}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CreatorName" title="创建人姓名" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.CreatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CreatorTime" title="创建时间" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.CreatorTime}}</div>
        </template>
      </GridColumn>
    </DataGrid>
    <!-- <template slot="footer">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNumber="pageNumber"
        :layout="layout1"
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>-->
    <!-- 添加 -->
    <Dialog
      ref="DarkNoDialog"
      :dialogStyle="{width:'450px',height:'420px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="详情"
    >
      <Form :model="BasicDataForm" class="formStyle formTop">
        <div class="formStyle_list">
          <Label for="formats">卡号</Label>
          <TextBox inputId="CardNo" name="CardNo" v-model="BasicDataForm.CardNo" :readonly="true"></TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="CardBatch">卡批次</Label>
          <TextBox
            inputId="CardBatch"
            name="CardBatch"
            v-model="BasicDataForm.CardBatch"
            :readonly="true"
          ></TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="Name">绑定会员号</Label>
          <TextBox
            inputId="MemberNo"
            name="MemberNo"
            v-model="BasicDataForm.MemberNo"
            :readonly="true"
          ></TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="ComboName">绑定套餐名称</Label>
          <TextBox
            inputId="ComboName"
            name="ComboName"
            v-model="BasicDataForm.ComboName"
            :readonly="true"
          ></TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="CardState">写卡状态</Label>
          <TextBox
            inputId="CardState"
            name="CardState"
            v-model="BasicDataForm.CardState"
            :readonly="true"
          ></TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="UseState">领用状态</Label>
          <TextBox
            inputId="UseState"
            name="UseState"
            v-model="BasicDataForm.UseState"
            :readonly="true"
          ></TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="BindTime">绑定时间</Label>
          <TextBox
            inputId="BindTime"
            name="BindTime"
            v-model="BasicDataForm.BindTime"
            :readonly="true"
          ></TextBox>
        </div>
      </Form>
      <!-- <DataGrid :data="MenberdarkNolist"  class="DataGridstyle pd-10">
        <GridColumn
          align="center"
          type="index"
          cellCss="datagrid-td-rownumber"
          width="50"
          title="序号"
        >
          <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
        </GridColumn>
        <GridColumn field="CardNo" title="卡号"></GridColumn>
        <GridColumn field="CardBatch" title="卡批次"></GridColumn>
        <GridColumn field="MemberNo" title="会员号"></GridColumn>
        <GridColumn field="ComboName" title="套餐名称"></GridColumn>
        <GridColumn field="CardState" title="写卡状态"></GridColumn>
        <GridColumn field="UseState" title="领用状态"></GridColumn>
        <GridColumn field="BindTime" title="绑定时间" width="200"></GridColumn>
      </DataGrid>-->
    </Dialog>
  </div>
</template>
<script>
import {
  GetBatch,
  GetBatchNo,
  GetCardDetail,
  AddCard,
  GetEnumList
} from "@/api/members";
import { parseTime } from "@/utils/index";
import bus from "@/views/layout/components/bus";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      BatchNo: "",
      BeginRegion: null,
      EndRegion: null,
      Menberlist: [],
      BasicDataForm: {
        CardNo: "",
        CardBatch: "",
        MemberNo: "",
        ComboName: "",
        CardState: "",
        UseState: "",
        BindTime: ""
      },
      CardTypeData: [],
      IsDisplayVAL: 1,
      //分页
      total: 0,
      pageNumber: 1,
      pageSize: 20,
      layout1: [
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
      //添加
      CardTypeData: [],
      MenberDialogForm: {
        BeginNumber: null,
        EndNumber: null,
        Step: null,
        CardType: 0,
        Prefix: "",
        Suffix: "",
        FilterNums: ""
      }
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
        BatchNo: this.BatchNo,
        IsDisplay: true,
        BeginRegion: this.BeginRegion,
        EndRegion: this.EndRegion
      };
      console.log(para);
      GetBatchNo(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    MenberSearchTop() {
      this.getUsers();
    },
    DarkNoDetail(data) {
      console.log("暗卡号", data);
      const para = {
        darkNo: data
      };
      console.log(para);
      GetCardDetail(para).then(res => {
        this.$refs.DarkNoDialog.open();
        console.log(res.Result);
        this.BasicDataForm = res.Result.Data;
        console.log(this.MenberdarkNolist);
      });
    },
    // 卡类型GetEnumList
    CardTypeMode() {
      const para = {
        EnumType: "Card_CreateState"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.CardTypeData = res.Result.Data;
      });
    }
  },
  mounted() {
    this.getUsers();
    this.CardTypeMode();
    this.gridHeight = this.resizeTable();
  },
  created() {
    this.Menberlist = this.getUsers(this.total);
  }
  // created() {
  //   bus.$on("getisshow", data => {
  //     console.log(data); //{show:true}
  //     this.BeginRegion = data.BeginNumber.toString();
  //     this.EndRegion = data.EndNumber.toString();
  //   });
  // }
};
</script>

