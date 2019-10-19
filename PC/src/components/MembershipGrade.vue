<template>
  <div class="container_tree" :style="'width:' + width + 'px;'">
    <!-- <h4>会员等级 <span class="iconfont icongengduo1 f-r mr-10" @click="toggle"></span></h4> -->
    <h4>会员等级 </h4>
    <Tree :data="Menberlist" @selectionChange="selection($event)">
      <template slot-scope="scope">
        <span>{{scope.node.Name}}</span>
      </template>
    </Tree>
  </div>
</template>
 
<script>
import { GetMemberLevel } from "@/api/members";
export default {
  data() {
    return {
      Menberlist: [],
      width:200
    };
  },
  methods: {
    getUsers() {
      GetMemberLevel().then(res => {
        console.log(res.Result);
        this.Menberlist = res.Result.Data;
      });
    },
    selection(data) {
      this.dataIf = data;
      this.$emit("childValue", this.dataIf);
      console.log(this.dataIf);
    },
    toggle(){
      //  this.width=20
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>
<style scoped>
.container_tree .tree{
  padding-left: -5px !important
}
</style>

