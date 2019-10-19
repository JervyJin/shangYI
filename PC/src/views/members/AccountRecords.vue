<template>
  <div class="container">
    <div class="conTop">
      <p class="topTitle">会员账户操作记录</p>
      <!-- <LinkButton class="btnAdd" @click="$refs.MenberAddDialog.open();dialogStatus ='create'">添加</LinkButton> -->
    </div>
    <!-- 搜索 -->
    <div class="query">
      <DateBox v-model="StartDate" format="yyyy-MM-dd" placeholder="操作日期 （起）"></DateBox>
      <DateBox v-model="EndDate" format="yyyy-MM-dd" placeholder="操作日期 （起）"></DateBox>
      <TextBox v-model="GrowthCode" placeholder="请输入会员信息"></TextBox>
      <NumberBox v-model="GrowthPhone" placeholder="请输入会员手机号"></NumberBox>
      <TextBox v-model="GrowthNumber" placeholder="请输入订单号"></TextBox>
      <ComboBox
        v-model="OperationType"
        :data="OperationTypeData"
        valueField="Code"
        textField="Name"
        placeholder="操作类型"
      ></ComboBox>
      <ComboBox
        v-model="OperationOrgin"
        :data="OperationOrginData"
        valueField="Code"
        textField="Name"
        placeholder="操作机构"
      ></ComboBox>
      <LinkButton
        class="iconfont iconsousuo btn-query"
        @click="MenberSearchTop()"
      >搜索</LinkButton>
    </div>

    <!-- table -->
    <DataGrid :data="Menberlist">
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <!-- <GridColumn align="center" title="操作" field="custome-adv">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.MenberAddDialog.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
        </template>
      </GridColumn>-->

      <GridColumn field="Code" title="会员编号"></GridColumn>
      <GridColumn field="Phone" title="会员手机号"></GridColumn>
      <GridColumn field="RealName" title="会员姓名"></GridColumn>
      <GridColumn field="Sex" title="订单号"></GridColumn>
      <GridColumn field="Refer" title="操作类型"></GridColumn>
      <GridColumn field="LevelId" title="操作值"></GridColumn>
      <GridColumn field="MemberTagCount" title="操作机构"></GridColumn>
      <GridColumn field="OriginUserCode" title="操作时间"></GridColumn>
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
  </div>
</template>
<script>
import { MemberList,GetEnumList } from "@/api/members";
import { parseTime } from "../../utils/index";
export default {
  data() {
    return {
      Menberlist: [],
      StartDate: new Date(),
      EndDate: new Date(),
      GrowthCode: "",
      GrowthPhone: null,
      GrowthNumber: "",
      OperationOrgin:"",
      OperationOrginData:[],
      OperationType:"",
      OperationTypeData:[],//操作类型
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
  methods: {
    // 获取用户列表
    getUsers() {
       var StartDateType = parseTime(this.StartDate,"{yyyy}-{mm}-{dd}T{h}:{i}:{s}");
      var EndDateType = parseTime(this.EndDate, "{yyyy}-{mm}-{dd}T{h}:{i}:{s}");
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Code: this.GrowthCode,
        Phone: this.GrowthPhone,
        RegDateStart: StartDateType,
        RegDateEnd:EndDateType,
        LevelId: this.MemberGrade
      };
      MemberList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    },
    //机构类型
    OperationOrginMode() {
      const para = {
        EnumType: "Organization_Type"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.OperationOrginData = res.Result.Data;
      });
    },
  },
  mounted() {
    this.getUsers();
    this.OperationOrginMode();
  }
};
</script>
<style>
.query .f-field{
  margin-bottom: 10px
}
.query .btn-query{
  margin-bottom: 10px
}
</style>

