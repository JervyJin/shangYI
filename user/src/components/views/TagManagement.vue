<template>
  <div class="content">
    <!-- <van-nav-bar title="标签管理" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar> -->

    <div class="container">
      <van-button class="listShow TagBtn mr-10" @click="addTagBtn" icon="add-o">新增标签</van-button>
      <van-button class="deleteTag TagBtn" @click="deleteTagBtn" icon="cross">删除标签</van-button>
      <div class="mt-10 mb-15">
        <van-tag plain v-for="(item,index) in tagList" :key="index" :class="{'listShow':item.isSelect}" @click="tagbtn(item)">{{item.Name}}</van-tag>
        <!-- <van-tag plain>标签</van-tag>
        <van-tag plain>标签</van-tag>
        <van-tag plain>标签</van-tag>
        <van-tag plain>标签</van-tag>
        <van-tag plain>标签</van-tag>
        <van-tag plain>标签</van-tag>
        <van-tag plain>标签</van-tag> -->
      </div>
    </div>
    <div class="pd-20">
      <van-button type="info"  class="Submitbtn" @click="Submitbtn()">编辑</van-button>
    </div>
    <!--添加  -->
    <van-dialog
      v-model="isShow"
      show-cancel-button
      :beforeClose="beforeClose"
      style="width:70%"
      class="dialogStyle"
    >
      <div class="popupdiv">
        <h4>{{TagName}}</h4>
        <van-cell-group>
          <van-field v-model="tagval" placeholder="请输入标签" />
        </van-cell-group>
        <!-- <div class="popupBtn">
          <van-button  class="Cancelbtn" @click="this.show==false">取消</van-button>
          <van-button  class="popupsubbtn">保存</van-button>
        </div>-->
      </div>
    </van-dialog>
  </div>
</template>
<script>
import {
  MemberTagChange,
  MemberTagAdd,
  MemberTagEditSave,
  MemberTagRemove
} from "@/api/index";
export default {
  data() {
    return {
      TagName: "",
      isShow: false,
      listShow: false,
      tagval: "",
      tagId:'',
      tagList:[],
      isAdd:true
    };
  },
  mounted(){
    this.getPageData();
  },
  methods: {
    getPageData(){
      let _this = this;
      let param = {
        page:1,
        rows:1000
      }
      MemberTagChange(param).then(res => {
        if(res.Code == 0){
          let arr = res.Rows;
          for (let index = 0; index < arr.length; index++) {
            arr[index].isSelect = false;
          }
          _this.tagList = arr;
        }
      })
    },
    tagbtn(tagItem) {
      var _this = this;
      for (let index = 0; index < _this.tagList.length; index++) {
        _this.tagList[index].isSelect = false;
      }
      tagItem.isSelect = true;
    },
    // 删除标签
    deleteTagBtn() {
      let _this = this;
      _this.tagId = '';
      for (let index = 0; index < _this.tagList.length; index++) {
        if(_this.tagList[index].isSelect){
          _this.tagId = _this.tagList[index].Id;
        }
      }
       if(!_this.tagId){
        _this.$toast("请选择要删除的标签");
        return;
      }
      MemberTagRemove({Id:_this.tagId}).then(res=>{
        if(res.Code == 0){
          _this.$toast(res.Message);
          _this.getPageData();
        }
      })
    },
    // 添加标签
    addTagBtn() {
      // console.log("1")
      this.isShow = !this.isShow;
      this.TagName = "添加标签";
      this.isAdd = true;
      this.tagval = '';
      this.tagId = '';
    },
    //编辑标签
    Submitbtn() {
      let _this = this;
      _this.tagval = '';
      _this.tagId = '';
      for (let index = 0; index < _this.tagList.length; index++) {
        if(_this.tagList[index].isSelect){
          _this.tagval = _this.tagList[index].Name;
          _this.tagId = _this.tagList[index].Id;
        }
      }
      if(!_this.tagId){
        _this.$toast("请选择要编辑的标签");
        return;
      }
      this.isShow = !this.isShow;
      this.TagName = "编辑标签";
      this.isAdd = false;

    },
   //保存 标签
    beforeClose(action, done) {
      var _this = this;
      if (action === "confirm") {
        if (!_this.tagval) {
          _this.$toast("请输入标签");
          done(false);
          return;
        }
        if(_this.isAdd){
          MemberTagAdd({Name:_this.tagval}).then(res => {
            if(res.Code == 0){
              _this.$toast(res.Message);
              _this.getPageData();
              setTimeout(done);
            }
          })
        }else{
          MemberTagEditSave({Id:_this.tagId,Name:_this.tagval}).then(res => {
            if(res.Code == 0){
              _this.$toast(res.Message);
              _this.getPageData();
              setTimeout(done);
            }
          })
        }

      } else if (action === "cancel") {
        done(); //关闭
      }
    },
  }
};
</script>
<style scoped>
.TagBtn {
  width: auto;
  height: 31px;
  opacity: 1;
  border-radius: 5px;
  line-height: 30px;
  padding: 0 5px;
  margin: 10px 0;
}
.deleteTag {
  border: 1px solid #fc997e;
  color: #fc997e;
  margin-left: 10px;
}
.van-tag {
  width: auto;
  padding: 8px 20px;
  margin-right: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid rgba(208, 208, 208, .6);
}
[class*=van-hairline]::after{
  border-color: transparent;
}
.listShow {
  color: #5ba1e7!important;
  border-color: #5BA1E7;
}
.popupdiv h4 {
  text-align: center;
  line-height: 45px;
}
.popupdiv .van-cell {
  width: 80%;
  margin-left: 10%;
  background: #f6f3f7;
  height: 33px;
  line-height: 33px;
  padding: 0 10px;
}
</style>
<style>
.dialogStyle .van-button--large {
  height: 35px;
  line-height: 33px;
  margin-top: 20px;
  font-size: 14px;
}
.dialogStyle .van-dialog__cancel {
  opacity: 1;
  background: rgba(246, 243, 247, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.dialogStyle .van-dialog__confirm {
  opacity: 1;
  border-left: none;
  color: #fff;
  background: rgba(91, 161, 231, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
</style>
