<template>
  <div class="container_tree">
    <h4>优惠券分类</h4>
    <div class="pl-10 c-blue pt-10">右键新建和编辑优惠券分类</div>
    <Tree
      :data="Menberlist"
      @selectionChange="selection($event)"
      @nodeContextMenu="addbtn($event);TREEId=$event"
    >
      <template slot-scope="scope">
        <span>{{scope.node.Name}}</span>
      </template>
    </Tree>
    <!-- 这里拼装定位的距离，在下面的js中控制 -->
    <Menu
      :inline="true"
      :noline="true"
      :menuWidth="120"
      v-if="this.handle==true"
      :style="'position:absolute;left:50px;top:' + top + 'px;'"
      id="mm"
      @itemClick="onItemClick($event)"
    >
      <MenuItem text="新增" iconCls="icon-add"></MenuItem>
      <MenuItem text="修改" iconCls="icon-edit"></MenuItem>
      <MenuItem text="删除" iconCls="icon-remove"></MenuItem>
    </Menu>
    <!-- 添加 -->
    <Dialog
      ref="MenberAddDialog"
      title="优惠券"
      :dialogStyle="{width:'420px',height:'210px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="MenberDialogForm" class="formStyle" v-if="dialogStatus=='create'">
        <div class="formStyle_list">
          <Label for="Name">名称</Label>
          <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.Name" placeholder="优惠券分类名称"></TextBox>
          <span class="c-red">*</span>
        </div>
        <div class="f-r mt-30">
          <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel btn radius">取消</LinkButton>
          <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm btn">确认</LinkButton>
          <LinkButton v-else @click="handleEdit()" class="btnConfirm btn">保存</LinkButton>
        </div>
      </Form>
      <Form :model="MenberDialogForm" class="formStyle" v-else>
        <div class="formStyle_list">
          <Label for="Name">名称</Label>
          <TextBox inputId="NameEdit" name="NameEdit" v-model="MenberDialogForm.NameEdit" placeholder="优惠券分类名称"></TextBox>
          <span class="c-red">*</span>
        </div>
        <div class="f-r mt-30">
          <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel btn radius">取消</LinkButton>
          <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm btn">确认</LinkButton>
          <LinkButton v-else @click="handleEdit()" class="btnConfirm btn">保存</LinkButton>
        </div>
      </Form>
    </Dialog>
  </div>
</template>
 
<script>
import {
  GetCouponCatalogs,
  AddCouponCatalog,
  DeleteCouponCatalog,
  UpdateCouponCatalog
} from "@/api/Market";
export default {
  data() {
    return {
      handle: false,
      Menberlist: [],
      top: 100,
      TREEId: "",
      dialogStatus: "",
      MenberDialogForm: {
        Name: "",
        NameEdit: "",
      }
    };
  },
  methods: {
    getUsers() {
      GetCouponCatalogs().then(res => {
        console.log(res.Result);
        this.Menberlist = res.Result.Data;
        if (this.Menberlist && this.Menberlist.length >= 0) {
          //优惠券分类添加全部分类
          this.Menberlist.unshift(
            { Id: null, Code: "null", Name: "全部", parent: "" },
            { Id: 0, Code: "0", Name: "未分类", parent: "" }
          );
        }
        this.$emit("sendCategoryList", this.Menberlist);
      });
    },
    selection(data) {
      console.log(data);
      // this.dataIf = data;
      this.MenberDialogForm.NameEdit = data.Name;
      this.$emit("childValue", data);
      // console.log(this.dataIf);
    },
    addbtn(data) {
      console.log(data);
      this.top = data.originalEvent.clientY - 210;
      this.handle = true;
    },
    onItemClick(text) {
      console.log(text);
      console.log(this.MenberDialogForm);
      if (text == "新增") {
        this.$refs.MenberAddDialog.open();
        this.dialogStatus = "create";
        this.MenberDialogForm.Name = "";
      }
      if (text == "修改") {
        this.dialogStatus = "update";
        this.$refs.MenberAddDialog.open();
        this.MenberDialogForm.Name = this.MenberDialogForm.NameEdit;
      }
      if (text == "删除") {
        this.deleteBtn();
      }
      console.log(text);
    },
    submitForm() {
      this.handle = false;
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            const para = {
              Code: parseInt(Math.random() * 100).toString(),
              Name: this.MenberDialogForm.Name
            };
            console.log(para);
            AddCouponCatalog(para).then(res => {
              this.getUsers();
              this.$refs.MenberAddDialog.close();
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
    handleEdit() {
      this.handle = false;
      this.Id = this.TREEId.node.Id;
      const para = {
        Name: this.MenberDialogForm.NameEdit,
        Id: this.Id
      };
      console.log(para);
      UpdateCouponCatalog(para).then(res => {
        console.log(res.Result);
        this.$refs.MenberAddDialog.close();
        this.getUsers();
        this.$messager.alert({
          title: "提示",
          msg: res.Result.Message
        });
      });
    },
    //删除
    deleteBtn() {
      this.handle = false;
      this.Id = this.TREEId.node.Id;
      this.$messager.alert({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: this.Id };
            console.log(para);
            DeleteCouponCatalog(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              this.getUsers();
            });
          }
        }
      });
    }
  },
  mounted() {
    this.getUsers();
  },
  created() {
    document.oncontextmenu = function() {
      return false;
    };
  },
  beforeMount() {
    let _this = this;
    this._close = e => {
      // 如果点击发生在当前组件内部，则不处理
      if (this.$el.contains(e.target)) {
        return;
      }
      _this.handle = false;
    };
    document.body.addEventListener("click", this._close);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this._close);
  }
};
</script>
<style scoped>
</style>
<style>
#mm .menu-container {
  min-width: 120px;
  position: absolute;
}
</style>
