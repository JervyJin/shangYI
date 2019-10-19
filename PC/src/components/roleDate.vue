<template>
  <!-- 角色权限 -->
  <div class="container tree">
    <LinkButton class="btn" type="button" @click="search()">确定</LinkButton>
    <v-tree
      ref="tree"
      :expanded="true"
      :data="treeData"
      :multiple="true"
      :tpl="tpl"
      :halfcheck="true"
      node-select="getCheckedNodes"
    />

    <!-- <Tree :data="roleData" :checkbox="true" @checkChange="checkedNodes($event)" ref="c_tree">
      <template slot-scope="scope">
        <span>{{scope.node.text}}</span>
      </template>
    </Tree>-->
  </div>
</template>
<script>
import { RoleAllPermissions } from "@/api/Service";
export default {
  props: {
    RoleEdit: {},
    required: true
  },
  data() {
    return {
      searchword: "",
      treeData: []
    };
  },
  methods: {
    // 获取用户列表
    getUsers() {
      console.log(this.RoleEdit);
      RoleAllPermissions().then(res => {
        console.log(res.Result);
        this.treeData = res.Result.Items;
        console.log(this.treeData);
        // if (this.RoleEdit) {
        //   this.defaultSelect(this.roleData); //默认选中某个节点
        // }
      });
    },
    search() {
      this.$refs.tree.getCheckedNodes();
      console.log(this.$refs.tree.getCheckedNodes());
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
    defaultSelect(obj) {
      // console.log(obj);
      // console.log(this.RoleEdit);
      if (this.RoleEdit != "" || this.RoleEdit != null) {
        //默认选中某个节点
        // var obj = this.RoleEdit;
        for (let i = 0; i < obj.length; i++) {
          for (let y = 0; y < this.RoleEdit.length; y++) {
            if (this.RoleEdit[y] === obj[i].id) {
              console.log(obj[i].id);
              this.$refs.c_tree.checkNode(obj[i]); //选中树中某个节点
              break;
            }
            if (obj[i].children.length) {
              this.hasChildren(obj[i].children);
            }
          }
        }
      }
    },
    hasChildren(children) {
      this.defaultSelect(children);
    },
    // 编辑返回值
    getUsersEdit() {
      console.log(this.RoleEdit);
    },
    checkedNodes(data) {
      this.dataIf = data;
      this.$emit("childValue", this.dataIf);
      console.log(this.dataIf);
    }
  },
  mounted() {
    this.getUsers();
    this.getUsersEdit();
  }
};
</script>
<style scoped>
.container{
  height: 100%;
}
</style>

