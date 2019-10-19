<template>
  <div class="container">
    <div class="conTop">
      <p class="topTitle">精准营销方案</p>
    
    <!-- 搜索 -->
    <div class="query">
      <DateBox format="yyyy-MM-dd" placeholder="营销日期（起）"></DateBox>
      <DateBox format="yyyy-MM-dd" placeholder="营销日期（止）"></DateBox>
      <TextBox placeholder="营销名称 "></TextBox>
      <DateBox format="yyyy-MM-dd" placeholder="操作日期 （起）"></DateBox>
      <DateBox format="yyyy-MM-dd" placeholder="操作日期 （止）"></DateBox>
      <ComboBox
        v-model="State"
        :data="StateType"
        valueField="Code"
        textField="Name"
        placeholder="营销状态"
      ></ComboBox>
      <ComboBox
        v-model="State"
        :data="StateType"
        valueField="Code"
        textField="Name"
        placeholder="营销类型"
      ></ComboBox>
      <SearchBox placeholder="营销条件" v-model="AgencySearch" @search="$refs.MoneyEditDialog.open()">
        <Addon>
          <span class="iconguanbi iconfont f-12 f-r" title="Clear value" @click="AgencySearch=''"></span>
        </Addon>
      </SearchBox>

      <LinkButton
        class="iconfont iconsousuo btn-query btn"
        @click="MenberSearchTop()"
      >搜索</LinkButton>
    </div>
    </div>
    <!-- table -->
    <DataGrid :data="Menberlist" :pagination="true" class="minheight mt-180">
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn field="Code" title="营销名称"></GridColumn>
      <GridColumn field="Name" title="营销类型"></GridColumn>
      <GridColumn field="Image" title="营销条件"></GridColumn>
      <GridColumn field="Type" title="方案状态"></GridColumn>
      <GridColumn field="Type" title="营销日期"></GridColumn>
      <GridColumn field="State" title="营销效果"></GridColumn>
      <GridColumn field="State" title="创建人"></GridColumn>
      <GridColumn field="State" title="创建日期"></GridColumn>
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
  methods: {
    MenberSearchTop(){}
  },
  mounted() {}
};
</script>
<style scoped>
.f-field {
  margin-bottom: 10px;
}
.btn-query {
  margin-top: -10px;
}
</style>
