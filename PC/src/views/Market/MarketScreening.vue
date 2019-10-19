<template>
  <div class="container">
    <div class="conTop">
      <p class="topTitle">筛选条件管理</p>

      <!-- 搜索 -->
      <div class="query">
        <DateBox format="yyyy-MM-dd" placeholder="创建日期（起）"></DateBox>
        <DateBox format="yyyy-MM-dd" placeholder="创建日期（止）"></DateBox>
        <TextBox placeholder="名称/创建人编号 "></TextBox>
        <ComboBox
          v-model="State"
          :data="StateType"
          valueField="Code"
          textField="Name"
          placeholder="条件来源"
        ></ComboBox>
        <ComboBox
          v-model="State"
          :data="StateType"
          valueField="Code"
          textField="Name"
          placeholder="营销方案"
        ></ComboBox>
        <ComboBox
          v-model="State"
          :data="StateType"
          valueField="Code"
          textField="Name"
          placeholder="筛选类型"
        ></ComboBox>
        <SearchBox placeholder="机构" v-model="AgencySearch" @search="$refs.MoneyEditDialog.open()">
          <Addon>
            <span class="iconguanbi iconfont f-12 f-r" title="Clear value" @click="AgencySearch=''"></span>
          </Addon>
        </SearchBox>

        <LinkButton
          class="iconfont iconsousuo btn-query btn mb-10"
          @click="MenberSearchTop()"
        >搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <DataGrid :data="Menberlist" :pagination="true" class=" minheight mt-180">
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.MenberAddDialog.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
          <LinkButton class="btnState" @click="StateText()" v-if="scope.row.State=='停用'">启用</LinkButton>
          <LinkButton class="btnState" @click="StateText()" v-if="scope.row.State=='启用'">停用</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="条件名称"></GridColumn>
      <GridColumn field="Image" title="保存类型"></GridColumn>
      <GridColumn field="Type" title="条件来源"></GridColumn>
      <GridColumn field="Type" title="营销日期"></GridColumn>
      <GridColumn field="State" title="营销类型"></GridColumn>
      <GridColumn field="State" title="关联营销方案"></GridColumn>
      <GridColumn field="State" title="关联客群"></GridColumn>
      <GridColumn field="State" title="创建人"></GridColumn>
      <GridColumn field="State" title="创建时间"></GridColumn>
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
export default {
  data() {
    return {
      //搜索
      StartDate: new Date(),
      EndDate: new Date(),
      Name: "",
      State: "",
      StateType: [],
      //DataGrid
      Menberlist: [],
      dialogStatus: "",
      AgencySearch: "",
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
  components: {},
  methods: {},
  mounted() {}
};
</script>
<style  scoped>
.query .f-field{
  margin-bottom: 10px
}
</style>

