<template>
  <!-- 收银员信息 -->
  <div class="container pd-10">
    <!-- 搜索 -->
    <div class="query">
      <TextBox v-model="UserName" placeholder>
        <span class="query_title">收银员名称</span>
        <Addon>
          <span
            v-if="UserName"
            class="textbox-icon icon-clear"
            title="Clear value"
            @click="UserName=null"
          ></span>
        </Addon>
      </TextBox>
      <ComboBox v-model="State" :data="StateType" valueField="Code" textField="Name" placeholder>
        <span class="query_title">员工状态</span>
      </ComboBox>
      <ComboBox
        v-model="OrganizationId"
        :data="OrganizationIdData"
        valueField="Id"
        textField="Name"
        placeholder
        @selectionChange="OrganizationChange"
      >
        <span class="query_title">所属机构</span>
      </ComboBox>
      <LinkButton class="iconfont iconsousuo btn-query" @click="MenberSearchTop()">搜索</LinkButton>
    </div>
    <!-- table -->
    <DataGrid
    class="minheight200"
      :data="Menberlist"
      :pagination="true"
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
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50">
        <template slot="body" slot-scope="scope">
          <RadioButton
            :inputId="scope.row.Id"
            :value="scope.row.Id"
            :multiple="true"
            v-model="MenberlistId"
          ></RadioButton>
        </template>
      </GridColumn>
      <GridColumn field="UserCode" title="收银员编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.UserCode}}</div>
        </template>
      </GridColumn>
      <GridColumn field="UserName" title="收银员姓名" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.UserName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="OrganizationName" title="所属机构" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.OrganizationName}}</div>
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
    </template>-->
    <div class="btnstyle">
      <LinkButton @click="showParentComp" class="btnConfirm">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { GetEnumList, GetOrgByUser, GetCashierInfo } from "@/api/Report";
export default {
  data() {
    return {
      UserName: "",
      OrganizationId: "",
      State: 1,
      MenberlistId: "",
      OrganizationIdData: [],
      StateType: [],
      //DataGrid
      Menberlist: [],
      //分页
      total: 0,
      pageSize: 10,
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
    //状态
    TypeMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateType = res.Result.Data;
      });
    },
    //所属机构
    OrganizationChange() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result.Data;
      });
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
        UserName: this.UserName,
        OrganizationId: this.OrganizationId,
        State: this.State
      };
      GetCashierInfo(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    },
    showParentComp() {
      this.$emit(
        "childCasher",
        this.getsubListFormList(this.Menberlist, this.MenberlistId, "Id")
      );
    },
    getsubListFormList(srcList, valueList, field) {
      if (
        !srcList ||
        srcList.length == 0 ||
        !valueList ||
        valueList.length == 0
      ) {
        return [];
      }
      var result = {};
      result = this.getObjectFormList(srcList, field, valueList);
      return result;
    },
    getObjectFormList(srcList, field, value) {
      for (var i = 0; i < srcList.length; i++) {
        if (srcList[i][field] == value) {
          return srcList[i];
        }
      }
    }
  },
  mounted() {
    this.getUsers();
    this.TypeMode();
    // this.GetListOrganizationMode();
  }
};
</script>
<style  scoped>
.btnstyle {
  margin-top: 10px;
  float: right;
  margin-right: 10px;
}
</style>

  