<template>
  <!-- 角色权限 -->
  <div class="container">
    <Tree :data="roleData"  @selectionChange="checkedNodes=$event">
      <template slot-scope="scope">
        <span>{{scope.node.Name}}</span>
      </template>
    </Tree>
    <LinkButton @click="showParentComp" class="btnConfirm f-r mr-20">确定</LinkButton>
  </div>
</template>
<script>
import { GetRolesAsync } from "@/api/Service";
export default {
  data() {
    return {
      checkedNodes: [],
      roleData: []
    };
  },
  methods: {
    // 获取用户列表
    getUsers() {
      GetRolesAsync().then(res => {
        console.log(res.Result);
        this.roleData = res.Result.Items;
      });
    },
    showParentComp() {
      this.dataIf = this.checkedNodes;
      this.$emit("childValue", this.dataIf);
    //   console.log(this.dataIf);
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

