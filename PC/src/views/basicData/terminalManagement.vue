<template>
  <div class="container">
    <div class="conTop">
      <p class="topTitle">终端管理</p>
      <LinkButton class="btnAdd btn-primary f-r" @click="$refs.terminal.open();dialogStatus ='create'">添加</LinkButton>

      <!-- 搜索 -->
      <div class="query mb-20">
        <TextBox inputId="c1" v-model="coding" placeholder="请输入编码、名称查询 " style="width:200px"></TextBox>
        <SearchBox
          placeholder="机构"
          v-model="AgencySearch"
          :value="Agencyvalue"
          @search="onSearch($event)"
          style="width:200px"
        >
          <Addon>
            <span class="iconguanbi iconfont f-12 f-r" title="Clear value" @click="AgencySearch=''"></span>
          </Addon>
        </SearchBox>
        <LinkButton
          class="iconfont iconsousuo btn-query"
          @click="searchBtn()"
        >搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <DataGrid :data="terminalList" :pagination="true" class="mt-120 minheight">
      <GridColumn
        align="center"
        field="custome"
        type="index"
        cellCss="datagrid-td-rownumber"
        width="50"
        title="序号"
      >
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.terminal.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="number" title="终端号"></GridColumn>
      <GridColumn field="Serial" title="状态"></GridColumn>
      <GridColumn field="name" title="机构名称" align="center"></GridColumn>
      <GridColumn field="formats" title="机构编码编码" align="center"></GridColumn>
      <GridColumn field="modifier" title="最后修改人" align="center"></GridColumn>
      <GridColumn field="modifyTime" title="最后修改时间" align="center"></GridColumn>
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
    <!-- 弹框 -->
    <Dialog
      ref="terminal"
      :title="'终端'"
      :dialogStyle="{width:'450px',height:'300px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="terminalForm" class="formStyle">
        <div class="formStyle_list">
          <Label for="institutions">机构</Label>
          <SearchBox
            placeholder="请选择机构"
            v-model="terminalForm.institutions"
            @search="onSearch($event)"
          >
            <Addon>
              <span
                class="iconguanbi iconfont f-12 f-r"
                title="Clear value"
                @click="terminalForm.institutions=''"
              ></span>
            </Addon>
          </SearchBox>
        </div>
        <div class="formStyle_list">
          <Label for="terminalNo">终端号</Label>
          <TextBox
            inputId="terminalNo"
            name="terminalNo"
            v-model="terminalForm.terminalNo"
            placeholder="请输入终端号"
          >
            <!-- <Addon>
              <span
                class="iconguanbi iconfont f-12 f-r mr-5"
                title="Clear value"
                @valueChange="terminalForm.terminalNo=null"
              ></span>
            </Addon>-->
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="state">状态</Label>
          <ComboBox
            inputId="state"
            v-model="terminalForm.state"
            :data="statedata"
            valueField="id"
            textField="name"
          ></ComboBox>
        </div>
        <div class="f-r mt-30">
          <LinkButton @click="$refs.terminal.close()" class="btnCancel">取消</LinkButton>
          <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        </div>
      </Form>
    </Dialog>

    <!-- 机构弹框 -->
    <Dialog
      ref="publicDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="机构"
    >
      <institutionsData @childValue="getchildValue"></institutionsData>
    </Dialog>
  </div>
</template>
<script>
import InstitutionsData from "../../components/institutionsData";
import {
  ServiceList,
  ServiceRemove,
  ServiceEdit,
  ServiceAdd,
  ServiceQuery
} from "../../api/Service.js";

export default {
  data() {
    return {
      total: 0,
      blound: false,
      pageNumber: 1,
      pageSize: 20,
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
      statedata: [
        {
          id: "1",
          name: "禁用"
        },
        {
          id: "2",
          name: "启用"
        }
      ],
      fromParentToChild: "",
      coding: "",
      AgencySearch: "",
      Agencyvalue: "",
      dialogStatus: "",
      terminalList: [],
      childBy: "",
      closedAll: true,
      terminalForm: {
        state: 1,
        terminalNo: "",
        name: ""
      }
    };
  },
  components: {
    InstitutionsData
  },
  methods: {
    //传值
    getchildValue(data) {
      console.log(data);
      this.list = data;
      this.$refs.publicDialog.close();
      this.arr = [];
      this.arrval = [];
      data.forEach(data => {
        console.log(data.Name);
        this.arr.push(data.Name);
        this.arrval.push(data.Id);
      });
      this.Agencyvalue = this.arrval.join(";");
      this.AgencySearch = this.arr.join(";");
      console.log(this.AgencySearch, this.Agencyvalue);
    },
    //机构
    onSearch(event) {
      this.$refs.publicDialog.open();
    },
    // 获取用户列表
    getUsers() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize
      };
      // ServiceList(para).then(res => {
      //   console.log(res.Result);
      //   this.total = res.Result.total;
      //   this.terminalList = res.Result.Rows;
      //   console.log(this.terminalList);
      // });
    },
    //删除
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.confirm({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { id: row.id };
            console.log(para);
            ServiceRemove(para).then(res => {
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
      this.dialogStatus = "update";
      const para = { Id: row.Id };
      ServiceEdit(para).then(res => {
        console.log(res.Result);
      });
    },
    //编辑保存
    saveForm(index, row) {
      this.$messager.confirm({
        title: "提示",
        msg: "确认编辑吗？",
        result: r => {
          if (r) {
            this.terminalForm.id = parseInt(Math.random() * 100).toString();
            const para = Object.assign({}, this.terminalForm);
            console.log(para);
            editUser(para).then(res => {
              this.$refs.terminal.close();
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

    //添加
    submitForm: function() {
      this.$messager.confirm({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            const para = Object.assign({}, this.terminalForm);
            console.log(para);
            ServiceAdd(para).then(res => {
              this.$refs.terminal.close();
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
    //查询
    searchBtn() {
      this.getUsers();
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>
.formStyle {
  margin: 25px;
  border-top: 1px solid #e0e6ed;
}
.formStyle_list {
  border: 1px solid #e0e6ed;
  border-top: none;
  height: 45px;
  line-height: 43px;
}
.formStyle_list .textbox-label {
  width: 150px;
  background-color: #f7f7f7;
  height: 44px;
  line-height: 44px;
  padding-left: 20px;
  margin-right: 20px;
  vertical-align: bottom;
}
</style>

