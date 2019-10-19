<template>
  <div class="conter">
    <router-view/>
    <van-tabbar router style="margin-bottom:0!important;padding-bottom:.2rem">
      <van-tabbar-item replace to="/index" class="text-c">
        <i class="iconfont iconshouye">&#xe62e;</i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/Registered" class="text-c">
        <i class="iconfont iconshouye">&#xe612;</i>
        <span>会员注册</span>
      </van-tabbar-item>
      <van-tabbar-item replace :to="'/MyCard/'+this.id" class="text-c">
        <i class="iconfont iconshouye">&#xe684;</i>
        <span>我的名片</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                id: "",
            };
        },
        methods: {
            init() {
                let id = localStorage.getItem("UserId");
                this.id = id;
                //console.log(this.id);
            },
        },
        mounted() {
            this.init();
        }
    };
</script>
<style scoped>
  .iconshouye {
    width: 100%;
    float: left;
    text-align: center;
    margin-bottom: 5px;
    font-size: 22px;
  }

  .iconshouye + span {
    font-size: 12px;
    display: inline-block;
    transform: scale(0.8);
    letter-spacing: 1PX;
  }

</style>
