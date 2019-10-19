<template>
  <!-- 选择套餐 -->
  <div class="container pd-10">
    <!-- 搜索 -->
    <div class="mb-10">
      <TextBox v-model="ComboName" placeholder>
        <span class="query_title">套餐名称</span>
        <Addon>
          <span
            v-if="ComboName"
            class="textbox-icon icon-clear"
            title="Clear value"
            @click="ComboName=null"
          ></span>
        </Addon>
      </TextBox>
      <LinkButton class="iconfont iconsousuo btn-query" @click="MenberSearchTop">搜索</LinkButton>
    </div>
    <!-- table -->
    <DataGrid
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
          <CheckBox
            :inputId="scope.row.ComboId"
            :value="scope.row.ComboId"
            :multiple="true"
            v-model="MenberlistId"
          ></CheckBox>
        </template>
      </GridColumn>
      <GridColumn field="ComboCode" title="套餐编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.ComboCode}}</div>
        </template>
      </GridColumn>
      <GridColumn field="ComboName" title="套餐名称" width="240" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.ComboName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="ComboType" title="套餐类型" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.ComboType}}</div>
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
    <div class="mt-20 mr-10 f-r">
      <LinkButton @click="showParentComp" class="btnConfirm btn radius">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { MemberGetComboAward } from "@/api/members";
export default {
  data() {
    return {
      MenberlistId: [],
      ComboName: "",
      //DataGrid
      MenberlistAll: [],
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
        ComboName: this.ComboName
      };
      MemberGetComboAward(para).then(res => {
        console.log(res.Result.Rows);
        this.total = res.Result.Total;
        this.Menberlist = [];
        res.Result.Rows.forEach(data => {
          var arr = {};
          arr.ComboId = data.Id;
          arr.ComboName = data.ComboName;
          arr.ComboType = data.ComboType;
          arr.ComboCode = data.ComboCode;
          this.Menberlist.push(arr);
        });

        console.log(this.Menberlist);
      });
    },
    // 头部搜索
    MenberSearchTop() {
      this.getUsers();
    },
    showParentComp() {
      this.$emit(
        "packchild",
        this.getsubListFormList(this.Menberlist, this.MenberlistId, "ComboId")
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
      var result = [];
      for (var j = 0; j < valueList.length; j++) {
        result.push(this.getObjectFormList(srcList, field, valueList[j]));
      }
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
  }
};
</script>
<style>
</style>

