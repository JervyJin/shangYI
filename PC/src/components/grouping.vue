<template>
  <!-- 员工分组 -->
  <div class="container">
    <Tree :data="data" @selectionChange="selection=$event"></Tree>
    <div style="padding: 4px 16px">
      <LinkButton @click="showParentComp" class="btnConfirm f-r mr-20">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { GetTreeUserInfoGroup } from "@/api/Service";
export default {
  props:{
    organizationId:""
  },
  data() {
    return {
      selection: null,
      data: []
    };
  },
  methods: {
    getUser() {
      const para = {
        organizationId: this.organizationId
      };
      console.log(para)
      GetTreeUserInfoGroup(para).then(res => {
        this.data = res.Result.Data;
        console.log(this.data);
      });
    },
    showParentComp() {
      this.$emit("childValue", this.selection);
      console.log(this.selection);
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

