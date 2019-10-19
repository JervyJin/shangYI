<template>
  <div class="content">
    <van-nav-bar title="客诉详情" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="container">
      <van-cell-group>
        <van-cell title="投诉人姓名" :value="ksInfo.MemberName" />
        <van-cell title="会员手机号" :value="ksInfo.MemberPhone" />
        <!-- <van-cell title="联系电话" :value="ksInfo.LinkTel" /> -->
        <van-cell title="投诉途径" :value="ksInfo.Way" />
        <van-cell title="处理状态" :value="ksInfo.State?'已处理':'未处理'" />
      </van-cell-group>
    </div>
    <!--  -->
    <div class="container">
      <div class="infoCon">
        <div class="lh35 mt-5">
          <span class="f-l f-14 ">
            {{ksInfo.MemberName}}
            <i class="iconfont c-yellow">&#xe635;</i>
          </span>
          <span class="f-l f-12">{{ksInfo.Content}}</span>
          <span class="f-r f-14">{{ksInfo.CreatorTime}}</span>
        </div>
        <div class="infoCon_reply" v-if="ksInfo.DisposeTime">
          <p class="f-14">
            {{ksInfo.UserName}}
            <i class="iconfont c-blue">&#xe628;</i>
            <span class="c-999">{{ksInfo.DisposeTime}}</span>
          </p>
          <p class="lh35 c-666 f-12">{{ksInfo.DisposeContent}}</p>
        </div>
      </div>
      <div class="infoCon" v-for="(item,index) in ksInfo.AppendList" :key="index">
        <div class="lh35 mt-5" v-if="item.AppendContent">
          <span class="f-l f-14 ">
            {{ksInfo.MemberName}}
            <i class="iconfont c-yellow">&#xe635;</i>
          </span>
          <span class="f-l f-12">{{item.AppendContent}}</span>
          <span class="f-r f-14">{{item.CreatorTime}}</span>
        </div>
        <div class="infoCon_reply" v-else>
          <p class="f-14">
            {{item.UserName}}
            <i class="iconfont c-blue">&#xe628;</i>
            <span class="c-999">{{item.DisposeTime}}</span>
          </p>
          <p class="lh35 c-666 f-12">{{item.DisposeContent}}</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="container">
      <div class="h4style">处理意见</div>
      <div class="infoCon_reply">
        <van-cell-group>
          <van-field v-model="opinion" placeholder="请输入处理意见" type="textarea" />
        </van-cell-group>
      </div>
    </div>
    <!--  -->
    <div class="pd-20">
      <van-button type="info" class="Submitbtn" @click="Submitbtn()">回复</van-button>
    </div>
  </div>
</template>
<script>
  import { getUserInfo, hyyj } from '../../api/hy'
export default {
  data() {
    return {
      opinion: "",
      ksInfo: {}
    };
  },
  methods: {
    Submitbtn() {
      if(!this.opinion) {
        this.$toast({
          message: '请填写处理意见!!',
          duration: 2000
        });
        return
      }
      hyyj({
        Id: parseInt(this.$route.params.id),
        DisposeContent: this.opinion
      }).then(res => {
        this.$toast({
          message: res.Message,
          duration: 2000
        });
        setTimeout(() => {
          this.$router.push({
            path: '/Complain'
          })
        }, 2000)
      })
    },
    getDetail() {
      getUserInfo(this.$route.params.id).then(res => {
        if(res.Data) {
          this.ksInfo = res.Data
        }
      })
    }
  },
  created() {
    this.getDetail()
  }
};
</script>
<style scoped>
.infoCon_reply {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  opacity: 1;
  background: rgba(246, 243, 247, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.infoCon_reply .van-cell {
  background: rgba(246, 243, 247, 1);
  padding: 0;
}
.infoCon{
  overflow: hidden;
}
</style>
