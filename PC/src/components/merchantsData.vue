<template>
  <!-- 授权商户 -->
  <div class="container">
    <Tree :data="data" :checkbox="true" @checkChange="checkedNodes=$event">
      <template slot-scope="scope">
        <span>{{scope.node.Name}}</span>
      </template>
    </Tree>
    <div class="btndivpos text-r">
      <div v-for="(node,index) in checkedNodes" :key="index"></div>
      <LinkButton @click="showParentComp" class="btnConfirm mr-20 f-r">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { GetListMerchants } from "@/api/Service";
export default {
  props: {
    InstitutionFormatsVal: ""
  },
  data() {
    return {
      checkedNodes: null,
      data: []
    };
  },
  methods: {
    getUsers() {
      const para = { OrganizeId: this.InstitutionFormatsVal };
      console.log(para);
      GetListMerchants(para).then(res => {
        if (res.Result.Code == 0) {
          console.log(res.Result);
          this.data = res.Result.Data;
        } else {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
        }
      });
    },
    showParentComp() {
      this.dataIf = this.checkedNodes;
      this.dataType = this.checkedNodes;
      this.$emit("MerchantValue", this.dataIf, this.dataType);
      console.log(this.dataIf);
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
.btndivpos {
  position: absolute;
  bottom: 0;
  height: auto;
  background: #fff;
  width: 60px;
  margin-bottom: 20px;
  float: right;
  right: 24px;
}
</style>