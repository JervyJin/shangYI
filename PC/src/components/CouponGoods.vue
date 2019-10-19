<template>
  <!-- 商品品类-->
  <div class="container">
    <Tree :data="datalist" :checkbox="true" @checkChange="checkedNodes=$event"  ref="c_tree">
      <template slot-scope="scope">
        <span>{{scope.node.text}}</span>
      </template>
    </Tree>
    <div style="padding: 4px 16px">
      <!-- <div v-for="(node,index) in checkedNodes" :key="index"></div> -->
      <LinkButton @click="showParentComp" class="btnConfirm f-r mr-20">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { GetGoodsCatalogTree } from "@/api/Combo";
export default {
  props: {
    RoleEdit: {},
    choseCategoryList:"",
    required: true
  },
  data() {
    return {
      dataIf: [],
      selection: null,
      datalist: [],
      chosedatalist: [],
    };
  },
  methods: {
    getUsers() {
      const para = {
        page: 1,
        rows: 20
      };
      console.log(this.choseCategoryList);
      var selectCompanyList = [];
      if(this.choseCategoryList && this.choseCategoryList.length>0){
            this.choseCategoryList.map((item)=>{
                  selectCompanyList.push(Number(item.GoodsCatalogCode));
            });
      }
      console.log(selectCompanyList);
      GetGoodsCatalogTree(para).then(res => {
        console.log(res.Result);
        this.datalist = res.Result.Data;
        if(this.datalist && this.datalist.length){
            this.datalist.map((item)=>{
              if(selectCompanyList.indexOf(Number(item.Code)) != -1){
                  this.$refs.c_tree.checkNode(item); //选中树中某个节点
                  this.dataIf.push(item);
                  item.checkState = "checked";
              } 
              if(item.children && item.children.length>0){
                item.children.map((row)=>{
                    if(selectCompanyList.indexOf(Number(row.Code)) != -1){
                      this.$refs.c_tree.checkNode(row); //选中树中某个节点
                      this.dataIf.push(row);
                      row.checkState = "checked";
                    } 
                });
              }
            });
            console.log(this.datalist);
          }
      });
    },
    selectionFn(event){
      console.log(event);
      this.chosedatalist = event;
    },
    checkedNodes(data) {
      console.log();
      // debugger
      this.dataIf = data;
      console.log(data);
      //this.$emit("childValue", this.dataIf);
      console.log(this.dataIf);
    },
    //确定提交
    showParentComp() {
      this.dataIf = this.checkedNodes;
      this.dataType = this.checkedNodes;
      if(this.dataIf && this.dataIf.length>0){
        this.$emit("ComboGoodsCategory", this.dataIf, this.dataType);
      } else if(this.dataIf == null){
        this.$emit("ComboGoodsCategory", 1); //选择为空
      } else if(this.dataIf && this.dataIf.length == 0){
        var checkedList=[];//弹框中选中的数据，在无操作的情况下
        this.datalist.map((item)=>{
            if(item.checkState == "checked"){
              checkedList.push(item);
            }
            if(item.children && item.children.length>0){
              item.children.map((row)=>{
                  if(row.checkState == "checked"){
                    checkedList.push(row);
                  }
              });
            }
        });
        if(checkedList && checkedList.length>0){//弹框中选中的数据，在无操作的情况下，但是默认选中的有数据
            this.$emit("ComboGoodsCategory", checkedList);   
        } else {
            this.$emit("ComboGoodsCategory", 2); //选择为空
        }
        
      }else {
        if(this.choseCategoryList && this.choseCategoryList.length>0){ //反显示上一步选择数据
            this.$emit("ComboGoodsCategory", this.choseCategoryList);
        }
      }
        //console.log(this.chosedatalist);
        //return;
        //this.$emit("ComboGoodsCategory",this.chosedatalist);
    },
    getsubListFormList(srcList, valueList, field) {
      //严谨一点，先做一个非空判断，
      if (
        !srcList ||
        srcList.length == 0 ||
        !valueList ||
        valueList.length == 0
      ) {
        //返回一个空数组
        return [];
      }
      var result = [];
      //变量属性使用中扩话写
      for (var j = 0; j < valueList.length; j++) {
        //这个应该再写一个方法，就是从数组中拿出一个对象，和之前写的那个方法比较相像，这样增加效率
        result.push(this.getObjectFormList(srcList, field, valueList[j]));
      }
      return result;
    },
    getObjectFormList(srcList, field, value) {
      for (var i = 0; i < srcList.length; i++) {
        if (srcList[i][field] == value) {
          return srcList[i];
        }
      }
    },
  },
  mounted() {
    this.getUsers();
  }
};
</script>

