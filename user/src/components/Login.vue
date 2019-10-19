<template>
  <div class="content">
    <Form ref="form" :model="ruleForm">
      <div class="container">
        <div class="login">
          <p>交易从服务客户开始</p>
          <img src="../assets/login.png" alt="">
        </div>
        <van-cell-group class="border-bottom" style="border-bottom: none !important;">
          <img src="../assets/phone.png" alt="">
          <!-- <van-field v-model="ruleForm.UserNameOrEmailAddress" label="账号" placeholder="请输入账号" /> -->
          <input type="text" v-model="ruleForm.UserNameOrEmailAddress" placeholder="请输入账号" />
        </van-cell-group>
        <van-cell-group class="border-bottom">
          <img src="../assets/pass.png" alt="">
          <!-- <van-field v-model="ruleForm.Password" label="密码" placeholder="请输入密码" type="password" /> -->
          <input type="password" v-model="ruleForm.Password" placeholder="请输入密码" />
        </van-cell-group>
      </div>
      <div class="mt-10 text-c mb-20">
        <van-button :disabled="false" native-type="button" @click="submitForm()" class="Submitbtn" type="info">登录</van-button>
      </div>
    </Form>
  </div>
</template>
<script>
import { getLogin } from "@/api/Login";
import {GetAppNavigation} from "@/api/index";
export default {
  data() {
    return {
      ruleForm: {
        UserNameOrEmailAddress: "",
        Password: "",
        WXTempKey: this.$store.state.WXTempKey ? this.$store.state.WXTempKey : ''
      }
    };
  },
  created(){
    this.$store.commit("setHomeData", "");
  },
  methods: {
    submitForm() {
      getLogin(this.ruleForm).then(res => {
        if(res.AccessToken){
          this.$store.commit("setToken", res.AccessToken);
          GetAppNavigation().then(res => {
            if(res.Code == 0){
              this.$router.push({ path: "/index" });
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.container {
  padding: 0;
  margin: 0;
}
.container .login{
  position: relative;
  width: 100%;
  height: 195px;
  line-height: 195px;
  text-align: center;
   background: rgba(91, 161, 231, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.container .login img{
  width: 260px;
  height: 130px;
   margin-top: 50px;
}
.container .login p{
  position: absolute;
  left: 25%;
  top: -36%;
  color: #FFFFFF;
  font-size: 23px;
  
/* font-family: FZZhiYi-M12 Regular; */

}
.Submitbtn{
  width: 90% !important;
  display: inline-block;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 5px;
  margin-top: 50px
}
.border-bottom{
  border-bottom: none;
  padding: 10px 18px;
  font-size: 14px;
  
}
.border-bottom input{
border: none;
text-indent: 1em;
}
.border-bottom img{
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.van-hairline--top-bottom::after {
    border-bottom: none !important;
  }
</style>
