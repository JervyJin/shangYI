<template>
  <div class="content">
    <van-nav-bar title="贴标签" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>

    <div class="container">
      <h4 class="h4style">已选标签</h4>
      <van-button class="plainBtn" @click="showPopup" icon="add-o">新增标签</van-button>
      <div>
        <van-tag type="primary" v-for="item in memberDefaultTags" :key="item.Id">
          <span>{{item.Name}}</span>
          <span class="close" @click="delTag(item.Id)">X</span>
        </van-tag>
      </div>
    </div>
    <div class="container">
      <h4 class="h4style">待选标签</h4>
      <div class="mt-15">
        <template v-for="item in tagList">
          <van-tag v-if="item.Name" plain :class="{'listShow':memberTags.includes(item.Id)}" @click="tagbtn(item)" :key="item.Id">{{item.Name}}</van-tag>
        </template>
      </div>
    </div>
    <div class="pd-20">
      <van-button type="info" class="Submitbtn" @click="Submitbtn()">保存</van-button>
    </div>
    <!--  -->
    <van-dialog
      v-model="isShow"
      show-cancel-button
      :beforeClose="beforeClose"
      style="width:70%"
      class="dialogStyle"
    >
      <div class="popupdiv">
        <h4>新增标签</h4>
        <van-cell-group>
          <van-field v-model="tagval" placeholder="请输入标签" />
        </van-cell-group>
        <!-- <div class="popupBtn">
          <van-button class="Cancelbtn" @click="this.show==false">取消</van-button>
          <van-button class="popupsubbtn">保存</van-button>
        </div>-->
      </div>
    </van-dialog>
  </div>
</template>
<script>
  import { getMemberTagById, getMemberTag, addMemberTag, addMemberTagMapping,GetTagByMemberId } from '../../api/hy'
export default {
  data() {
    return {
      isShow: false,
      tagval: "",
      tagList: [],
      memberDefaultTags: [],
      memberTags: []
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'MemberDetails',
        query: {
          id: this.$route.params.id
        }
      })
    },
    showPopup() {
      this.isShow = !this.isShow;
    },
    tagbtn(item) {
      if(this.memberTags.includes(item.Id)) {
        this.memberTags = this.memberTags.filter(it => { return it!=item.Id })
        this.memberDefaultTags = this.memberDefaultTags.filter(it => { return it.Id!=item.Id })
      }
      else {
        this.memberTags.push(item.Id)
        this.memberDefaultTags.push({
          Id: item.Id,
          Name: item.Name
        })
      }
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        if(this.tagval) {
          addMemberTag(this.tagval).then(res => {
            if(res.Code == 0){
              this.$toast({
                message: '添加成功!!',
                duration: 2000
              });
              setTimeout(() => {
                this.getMemberTag()
                done()
              }, 2000)
            }
          })
        }else {
          this.$toast({
            message: '请填写标签名!!',
            duration: 2000
          });
          done(false)
        }
      } else if (action === "cancel") {
        this.tagval = ''
        done(); //关闭
      }
    },
    Submitbtn() {
      addMemberTagMapping({
        MemberId: this.$route.params.id,
        TagIdList: this.memberTags
      }).then(res =>{
        if(res.Code == 0){
          this.$toast({
            message: '添加成功!!',
            duration: 2000
          });
          setTimeout(() => {
            this.$router.push({
              path: '/MemberDetails/'+this.$route.params.id
            })
          }, 2000)
        }
      })
    },
    getMemberTag() {
      getMemberTag({
        page: 1,
        rows: 100
      }).then(res => {
        if(res.Code == 0){
          this.tagList = res.Rows
        }
      })
    },
    getMemberTagById() {
      // getMemberTagById(this.$route.params.id).then(res => {
      //   if(res.Result.Code === 0) {
      //     this.memberDefaultTags = res.Result.Rows
      //     this.memberDefaultTags.map(item => {
      //       this.memberTags.push(item.Id)
      //     })
      //   }
      // })
      GetTagByMemberId(this.$route.params.id).then(res => {
        if(res.Code == 0){
          this.memberDefaultTags = res.Data
          this.memberDefaultTags.map(item => {
            this.memberTags.push(item.Id)
          })
        }
      })
    },

    delTag(id) {
      this.memberTags = this.memberTags.filter(it => { return it!=id })
      this.memberDefaultTags = this.memberDefaultTags.filter(it => { return it.Id!=id })
    }
  },
  created() {
    this.getMemberTag()
    this.getMemberTagById()
  }
};
</script>
<style scoped>
.plainBtn {
  width: auto;
  height: 31px;
  opacity: 1;
  border: 1px solid #5ba1e7;
  border-radius: 10px 10px 10px 10px;
  line-height: 30px;
  padding: 0 5px;
  margin: 10px 0;
  color: #5ba1e7;
}
.van-tag {
  min-width: 65px;
  padding: 8px 5px;
  margin-right: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;
  text-align: center;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 0;
  transform: translateY(50%);
  right: 5px;
}

.listShow {
  background: #5ba1e7;
  color: #fff;
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
