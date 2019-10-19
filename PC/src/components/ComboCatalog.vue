<template>
  <!-- 商品信息 -->
  <div class="container pd-10">
    <!-- 搜索 -->
    <div class="mb-10 mt-5">
      <TextBox v-model="CatalogCode" placeholder>
        <span class="query_title">分类编码</span>
        <Addon>
          <span
            v-if="CatalogCode"
            class="textbox-icon icon-clear"
            title="Clear value"
            @click="CatalogCode=null"
          ></span>
        </Addon>
      </TextBox>
      <TextBox v-model="BrandCode" placeholder>
        <span class="query_title">品牌编码</span>
        <Addon>
          <span
            v-if="BrandCode"
            class="textbox-icon icon-clear"
            title="Clear value"
            @click="BrandCode=null"
          ></span>
        </Addon>
      </TextBox>
      <TextBox v-model="Name" placeholder>
        <span class="query_title">商品名称</span>
        <Addon>
          <span v-if="Name" class="textbox-icon icon-clear" title="Clear value" @click="Name=null"></span>
        </Addon>
      </TextBox>
      <TextBox v-model="Code" placeholder>
        <span class="query_title">商品编码</span>
        <Addon>
          <span v-if="Code" class="textbox-icon icon-clear" title="Clear value" @click="Code=null"></span>
        </Addon>
      </TextBox>
      <LinkButton class="iconfont iconsousuo btn-query" @click="MenberSearchTop()">搜索</LinkButton>
    </div>
    <!-- table -->
    <div class="container_tree">
      <h4>品牌分类</h4>
      <Tree
        :data="Classdata"
        :selectLeafOnly="true"
        @selectionChange="checkedNodes($event)"
        ref="c_tree"
      >
        <!--  @selectionChange="checkedNodes($event)" -->
        <template slot-scope="scope">
          <span>{{scope.node.text}}</span>
        </template>
      </Tree>
    </div>
    <div style="margin-left:220px;">
      <DataGrid
        :data="Menberlist"
        :pagination="true"
        class="minheight"
        :columnResizing="true"
        selectionMode="multiple"
        @selectionChange="selection($event)"
        :lazy="true"
        :pageNumber="pageNumber"
        :total="total"
        :pageSize="pageSize"
        @pageChange="pageChange($event)"
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
        <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50">
          <template slot="body" slot-scope="scope">
            <CheckBox
              :inputId="scope.row.Id.toString()"
              :value="scope.row.Id.toString()"
              :multiple="true"
              v-model="MenberlistId"
            ></CheckBox>
          </template>
        </GridColumn>
        <GridColumn field="Code" title="编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.Code}}</div>
          </template>
        </GridColumn>
        <GridColumn field="Name" title="名称" width="100" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.Name}}</div>
          </template>
        </GridColumn>
        <GridColumn field="CatalogCode" title="分类编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.CatalogCode}}</div>
          </template>
        </GridColumn>
        <GridColumn field="BrandCode" title="品牌编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.BrandCode}}</div>
          </template>
        </GridColumn>
        <GridColumn field="RetailPrice" title="零售价" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.RetailPrice}}</div>
          </template>
        </GridColumn>
        <GridColumn field="MemberPrice" title="会员价" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.MemberPrice}}</div>
          </template>
        </GridColumn>
      </DataGrid>
    </div>
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
import { GetGoodsCatalogss, GetGoods, GetGoodsCatalogTree } from "@/api/Combo";
import CouponGoods from "@/components/CouponGoods";
export default {
  components: { CouponGoods },
  data() {
    return {
      CatalogCode: "",
      BrandCode: "",
      Code: "",
      Classdata: [],
      Name: "",
      MenberlistId: [],
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
    checkedNodes(data) {
      this.MenberlistId = [];
      console.log(data);
      console.log(data.Code);
      this.CatalogCode = data.Code;
      this.getUsers();
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getUsers();
    },
    // 获取列表
    getUsers() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        CatalogCode: this.CatalogCode,
        BrandCode: this.BrandCode,
        Name: this.Name,
        Code: this.Code
      };
      GetGoods(para).then(res => {
        console.log(res.Result);
        this.total=res.Result.Total
        this.Menberlist = res.Result.Rows;
      });
    },
    // 品牌分类列表
    getClassList() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize
      };
      // GetGoodsCatalogss(para).then(res => {
      //   console.log(res.Result);
      //   this.Classdata = res.Result.Data;
      // });
      GetGoodsCatalogTree(para).then(res => {
        console.log(res.Result);
        this.Classdata = res.Result.Data;
      });
    },

    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    },
    showParentComp() {
      // this.listId = this.getsubListFormList(
      //   this.Menberlist,
      //   this.MenberlistId,
      //   "Id"
      // );
      console.log(this.listId);
      for (var i = 0; i < this.listId.length; i++) {
        if (this.listId[i] == null || typeof this.listId[i] == undefined) {
          this.listId.splice(i, 1);
          i = i - 1;
        }
      }
      console.log(this.listId);
      this.$emit("ComboCatalog", this.listId);
    },
    // getsubListFormList(srcList, valueList, field) {
    //   if (
    //     !srcList ||
    //     srcList.length == 0 ||
    //     !valueList ||
    //     valueList.length == 0
    //   ) {
    //     return [];
    //   }
    //   var result = [];
    //   for (var j = 0; j < valueList.length; j++) {
    //     result.push(this.getObjectFormList(srcList, field, valueList[j]));
    //   }
    //   return result;
    // },

    // getObjectFormList(srcList, field, value) {
    //   for (var i = 0; i < srcList.length; i++) {
    //     if (srcList[i][field] == value) {
    //       return srcList[i];
    //     }
    //   }
    // },
    selection(even) {
      console.log(even);
      this.obj = [];
      even.map(item => {
        this.obj.push(item.Id.toString());
      });
      this.MenberlistId = this.obj;
      console.log(this.MenberlistId);
      this.listId = even;
    }
  },
  mounted() {
    this.getUsers();
    this.getClassList();
  }
};
</script>
<style  scoped>
.btnstyle {
  margin-top: 10px;
  float: right;
  margin-right: 10px;
}
.container_tree {
  width: 200px;
  border: 1px solid #e0e6ed;
  float: left;
  margin-right: 20px;
  overflow: auto;
  position: absolute;
  bottom: 50px;
  top: 62px;
  background: #fff;
  z-index: 1;
}
.container_tree h4 {
  height: 38px;
  line-height: 38px;
  opacity: 1;
  background: rgba(245, 248, 252, 1);
  border-bottom: 1px solid #e0e6ed;
  padding-left: 10px;
}
.container_tree .tree {
  padding: 10px;
}
</style>

