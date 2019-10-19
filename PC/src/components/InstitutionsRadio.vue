<template>
  <!-- 机构权限 -->
  <div class="container">
    <Tree :data="data" @selectionChange="selection=$event">
      <template slot-scope="scope">
        <span>{{scope.node.Name}}</span>
      </template>
    </Tree>
    <div style="padding: 4px 16px">
      <LinkButton @click="showParentComp" class="btnConfirm f-r mr-20">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { GetListOrganization } from "../api/Service";
export default {
  props: { inputName: String},
  data() {
    return {
      data: []
    };
  },
  methods: {
    getUsers() {
      const para = this.inputName;
      console.log(para);
      GetListOrganization().then(res => {
        console.log(res.Result);
        this.data = res.Result.Data;
      });
    },
    showParentComp() {
      this.TreeRadio = this.selection;
      this.$emit("childRadio", this.TreeRadio);
      console.log(this.TreeRadio);
    }
  },
  mounted() {
    this.getUsers();
    // console.log(this.$parent.student);
  }
};
</script>

