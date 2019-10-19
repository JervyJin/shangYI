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
        <TextBox v-model="SearchBox" placeholder>
          <span class="query_title">角色编码/名称</span>
          <Addon>
            <span
              v-if="SearchBox"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="SearchBox=null"
            ></span>
          </Addon>
        </TextBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="onSearch ">搜索</LinkButton>
      </div>
    </div>
    <p class="pstyle">
      <LinkButton
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="btnAdd();dialogStatus ='create'"
      >添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <DataGrid
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
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv">
        <template slot="body" slot-scope="scope">
          <LinkButton class="btnEdit" @click="handleEdit(scope.$index, scope.row)">编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Code" title="角色编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="角色名称" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Name}}</div>
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
      ref="BasicData"
      :title="'角色'"
      :dialogStyle="{width:'450px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
    <Form :model="BasicDataForm" ref="formvalidate" :rules="rules" @validate="errors=$event">
      <Tabs class="Tabsstyle bordertop pd-20">
        <TabPanel :title="'基本信息'">
          <div class="border-top mt-10">
            <!-- <div class="formStyle_list">
              <Label for="Code">角色编码</Label>
              <TextBox inputId="Code" name="Code" v-model="Code" placeholder="请输入角色编码">
                <span class="c-red starpos">*</span>
              </TextBox>
              
            </div>-->
            <div class="formStyle_list">
              <Label for="Name">角色名称</Label>
              <TextBox inputId="Name" name="Name" v-model="BasicDataForm.Name" placeholder="请输入角色名称"  v-Tooltip="getTipOpts('Name')"><span class="c-red starpos">*</span></TextBox>
            </div>
            <div class="formStyle_list">
              <Label for="Description">备注</Label>
              <TextBox inputId="t2" :multiline="true" v-model="Description"></TextBox>
            </div>
          </div>
        </TabPanel>
        <TabPanel :title="'角色权限'" class="tree mb-50">
          <v-tree ref="tree" :data="treeData" :multiple="true" :tpl="tpl" :halfcheck="true" />
          <!-- <RoleDate @childValue="getchildValue" :RoleEdit="RoleEditVal"></RoleDate> -->
        </TabPanel>
      </Tabs>
      <!-- <div class="f-r mb-10 text-r btndivpos">
        <LinkButton @click="$refs.BasicData.close()" class="btnCancel btn radius">取消</LinkButton>
        <LinkButton
          v-if="dialogStatus=='create'"
          @click="submitForm()"
          class="btnConfirm btn radius"
        >确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm btn radius">保存</LinkButton>
      </div> -->
      <template v-slot:footer>
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        <LinkButton @click="$refs.BasicData.close()" class="btnCancel">取消</LinkButton>
      </template>
      </Form>
</Dialog>

  </div>
</template>
<script>
import RoleDate from "@/components/roleDate";
import {
  RoleList,
  RoleRemove,
  RoleEdit,
  RoleAdd,
  RoleSearch,
  RoleEditSave,
  RoleAllPermissions
} from "@/api/Service";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //DataGrid
      gridHeight: false,
      BasicDatalist: [],
      custome: "",
      number: "",
      Serial: "",
      //分页
      SearchBox: "",
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
      //弹框
      BasicDataForm: {
        Name: "",
      },
      Name: "",
      Code: "",
      searchword: "",
      treeData: [],
      Description: "",
      dialogStatus: "",
      Permissions: [],
      RoleEditVal: "",
      rules: {
        Name: "required"
      },
      errors: {},
    };
  },
  components: {
    RoleDate
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
    //传值
    getchildValue(data) {
      console.log("child selecteValue", data);
      //这里没有清空数组
      this.Permissions = [];
      data.forEach(data => {
        this.Permissions.push(data.id);
      });
      console.log("parent selectedValue", this.Permissions);
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
        CodeOrName: this.SearchBox
      };
      console.log(para);
      RoleList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.BasicDatalist = res.Result.Rows;
      });
    },
    //删除
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.confirm({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: row.Id };
            console.log(para);
            RoleRemove(para).then(res => {
              this.getUsers();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //编辑
    handleEdit(index, row) {
      this.$refs.BasicData.open();
      this.dialogStatus = "update";
      const para = { Id: row.Id };
      console.log(para);

      this.$nextTick(() => {
        var checked = this.$refs.tree.getCheckedNodes(true);
        for (let index = 0; index < checked.length; index++) {
          const element = checked[index];
          element.checked = false;
        }
      });
      let that = this;
      RoleEdit(para).then(res => {
        console.log(res.Result);
        this.Name = res.Result.Role.DisplayName;
        this.Code = res.Result.Role.Code;
        this.Description = res.Result.Role.Description;
        this.RoleEditVal = res.Result.GrantedPermissionNames;
        this.id = res.Result.Role.Id;
        //console.log("编辑权限回值",this.$refs.tree.getCheckedNodes(this.RoleListAll));
        for (let index = 0; index < this.RoleEditVal.length; index++) {
          var node = this.$refs.tree.getNodes(
            { id: this.RoleEditVal[index] },
            this.treeData,
            true
          )[0];
          this.$refs.tree.setNodeAttr(node, "checked", true);
        }
        console.log(this.treeData);
      });
    },
    saveForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "请输入角色名称"
          });
        } else {
            this.saveFormFn();
        }   
      });  
    },
    saveFormFn(index, row) {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            this.Permissions = [];
            this.$refs.tree.getCheckedNodes().forEach(data => {
              this.Permissions.push(data.id);
            });
            const para = {
              Name: this.BasicDataForm.Name,
              Code: this.Code,
              Description: this.Description,
              Permissions: this.Permissions,
              Id: this.id
            };
            console.log("编辑提交", para);
            RoleEditSave(para).then(res => {
              this.getUsers();
              this.$refs.BasicData.close();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //添加
    btnAdd() {
      var _this = this;
      this.$refs.BasicData.open();
      this.Name = "";
      this.Description = "";
      this.Permissions = [];
      this.RoleEditVal = "";
      this.RoleListAll = [];
      //this.getRoleList();
      this.$nextTick(() => {
        var checked = this.$refs.tree.getCheckedNodes(true);
        for (let index = 0; index < checked.length; index++) {
          const element = checked[index];
          element.checked = false;
        }
      });
    },
    submitForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "请输入角色名称"
          });
        } else {
            this.submitFormFn();
        }   
      });  
    },
    //添加
    submitFormFn: function() {
      console.log("save", this.Permissions);
      // 获取角色id
      var RoleListAll = this.$refs.tree.getCheckedNodes();
      console.log(this.RoleListAll);
      this.Permissions = [];
      RoleListAll.forEach(data => {
        this.Permissions.push(data.id);
      });
      console.log("角色id", this.Permissions);
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            const para = {
              Name: this.BasicDataForm.Name,
              Description: this.Description,
              Permissions: this.Permissions
            };
            console.log(para);
            RoleAdd(para).then(res => {
              this.getUsers();
              this.$refs.BasicData.close();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              console.log(res.Result.Message);
            });
          }
        }
      });
    },
    // 搜索
    onSearch() {
      this.getUsers();
    },
    // 角色权限列表
    getRoleList() {
      console.log(this.RoleEdit);
      RoleAllPermissions().then(res => {
        console.log(res.Result);
        this.treeData = res.Result.Items;
        console.log(this.treeData);
        this.treeData.map(item => {
          //item.expanded = true;
          item.children.map(row => {
            //row.expanded = true;
          });
        });
      });
    },
    tpl(...args) {
      let { 0: node, 2: parent, 3: index } = args;
      let titleClass = node.selected
        ? "node-title node-selected"
        : "node-title";
      if (node.searched) titleClass += " node-searched";
      return (
        <span>
          <span
            class={titleClass}
            domPropsInnerHTML={node.text}
            onClick={() => {
              this.$refs.tree.nodeSelected(node);
            }}
          ></span>
        </span>
      );
    },
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : null;
    },
    hasError(name) {
      return this.getError(name) != null;
    },
    getTipOpts(name) {
      return {
        content: this.getError(name),
        closed: !this.hasError(name),
        position: "right"
      };
    },
  },
  mounted() {
    this.getUsers();
    this.getRoleList();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
.tabs-container {
  width: auto;
  height: 100%;
  overflow: hidden;
}
</style>

