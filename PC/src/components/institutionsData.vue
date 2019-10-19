<template>
  <!-- 机构权限 -->
  <div class="container">
    <Tree :data="data" :checkbox="true" @checkChange="checkedNodes=$event" ref="c_tree">
      <template slot-scope="scope">
        <span>{{scope.node.Name}}</span>
      </template>
    </Tree>
    <div class="btndivpos text-r">
      <div v-for="(node,index) in checkedNodes" :key="index"></div>
      <LinkButton @click="showParentComp" class="btnConfirm f-r mr-20">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { GetListOrganization } from "@/api/Service";
export default {
  props: {
    InstitutionFormatsVal: "",
    choseCompanyList:""
  },
  data() {
    return {
      checkedNodes: null,
      data: [],
      dataIf:[]
    };
  },
  methods: {
    getUsers() {
      console.log(this.choseCompanyList);
      var selectCompanyList = [];
      if(this.choseCompanyList && this.choseCompanyList.length>0){
            this.choseCompanyList.map((item)=>{
                  selectCompanyList.push(item.OrganizationId);
            });
      }
      // console.log(this.InstitutionFormatsVal)
      // const para = { OrganizationId: this.InstitutionFormatsVal };
      // console.log(para);
      GetListOrganization().then(res => {
        if (res.Result.Code == 0) {
          console.log(res.Result);
          this.data = res.Result.Data;
          console.log(this.data);
          if(this.data && this.data.length){
            this.data.map((item)=>{
              item.OrganizationId = item.Id;
            });
            this.data.map((item)=>{
              if(selectCompanyList.indexOf(item.Id) != -1){
                  this.$refs.c_tree.checkNode(item); //选中树中某个节点
                  this.dataIf.push(item);
              } 
            });
          }
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
      if(this.dataIf && this.dataIf.length>0){
        this.$emit("childValue", this.dataIf, this.dataType);
      } else if(this.dataIf == null){
        this.$emit("childValue", 1); //选择为空
      } else if(this.dataIf && this.dataIf.length == 0){
        var checkedList=[];//弹框中选中的数据，在无操作的情况下
        this.data.map((item)=>{
            if(item.checkState == "checked"){
              checkedList.push(item);
            }
        });
        if(checkedList && checkedList.length>0){//弹框中选中的数据，在无操作的情况下，但是默认选中的有数据
            this.$emit("childValue", checkedList);   
        } else {
            this.$emit("childValue", 2); //选择为空
        }
        
      }else {
        if(this.choseCompanyList && this.choseCompanyList.length>0){ //反显示上一步选择数据
            this.$emit("childValue", this.choseCompanyList);
        }
      }
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

