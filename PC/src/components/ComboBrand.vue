<template>
  <!-- 品牌 -->
  <div class="container pd-10">
    <!-- 搜索 -->
    <div class="mb-10">
      <TextBox v-model="Name" placeholder>
        <span class="query_title">品牌</span>
        <Addon>
          <span v-if="Name" class="textbox-icon icon-clear" title="Clear value" @click="Name=null"></span>
        </Addon>
      </TextBox>
      <LinkButton class="iconfont iconsousuo btn-query" @click="MenberSearchTop()">搜索</LinkButton>
    </div>
    <!-- table -->
    <DataGrid
      :data="Menberlist"
      :pagination="true"
      class="minheight200"
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
            :inputId="scope.row.GoodsBrandId"
            :value="scope.row.GoodsBrandId"
            :multiple="true"
            v-model="MenberlistId"
          ></CheckBox>
        </template>
      </GridColumn>
      <GridColumn field="GoodsBrandCode" title="品牌编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.GoodsBrandCode}}</div>
        </template>
      </GridColumn>
      <GridColumn field="GoodsBrandName" title="品牌名称" width="200" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.GoodsBrandName}}</div>
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
    </template> -->
    <div class="btnstyle">
      <LinkButton @click="showParentComp" class="btnConfirm">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { GetGoodsBrands } from "@/api/Combo";
export default {
  data() {
    return {
      Name: "",
      //分页
      total: 0,
      MenberlistId: [],
      Menberlist: [],
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
        rows: this.pageSize
        // Name: this.Name
      };
      GetGoodsBrands(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        // this.Menberlist = res.Result.Rows;
        // if(this.Menberlist && this.Menberlist.length){
        //     this.Menberlist.forEach((item)=>{
        //         item.Id = String(item.Id);//数字转字符串如不转CheckBox value属性报错
        //     });
        // }
        this.Menberlist = [];
        res.Result.Rows.forEach(item => {
          var arr = {};
          arr.GoodsBrandId = String(item.Id);
          arr.GoodsBrandCode = item.Code;
          arr.GoodsBrandName = item.Name;
          this.Menberlist.push(arr);
        });
        console.log(this.Menberlist);
      });
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    },
    showParentComp() {
      this.$emit(
        "ComboBrand",
        this.getsubListFormList(
          this.Menberlist,
          this.MenberlistId,
          "GoodsBrandId"
        )
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
      if (this.parentMultiselect) {
        valueList = valueList.split();
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
<style  scoped>
.btnstyle {
  margin-top: 10px;
  float: right;
  margin-right: 10px;
}
</style>

