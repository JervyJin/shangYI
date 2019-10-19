<template>
  <div class="el-conment">
    <!-- <img src="../../assets/img/head.png" alt class="topImg" /> -->

    <div class="headers clearfix">
      <img src="../../assets/img/head.jpg" alt class="topImgleft" />
      <img src="../../assets/img/headright.png" alt class="topImgright" />
    </div>
    <div style="width:100%;height:83px;"></div>

    <div class="login" v-if="isReset">
      <div class="login-title" v-if="bindPhone">用户登录</div>
      <div class="login-title" v-else>绑定手机号</div>
      <img src="../../assets/img/ma.png" alt class="ma" @click="fn()" v-if="show" />
      <!-- 二维码 -->
      <img src="../../assets/img/comp.png" alt class="ma" @click="fn()" v-else />
      <!-- 电脑 -->

      <Form
        style="text-align: center;"
        :model="ruleForm"
        v-if="willShow"
        ref="loginformvalidate"
        :rules="rules"
        @validate="errors=$event"
      >
        <!-- <img src="../../assets/img/infor.png" alt /> -->
        <!-- <span style="text-align: center;color:#fff;">首次登陆输入账号和密码</span> -->
        <div class="username">
          <div class="inp">
            <TextBox
              type="text"
              placeholder="账号/手机号"
              v-model="ruleForm.UserNameOrEmailAddress"
              inputId="UserNameOrEmailAddress"
              name="UserNameOrEmailAddress"
              v-Tooltip="getTipOpts('UserNameOrEmailAddress')"
            ></TextBox>
            <span class="c-red starpos">*</span>
          </div>
          <!-- <TextBox
            inputId="UserNameOrEmailAddress"
            name="UserNameOrEmailAddress"
            v-model="ruleForm.UserNameOrEmailAddress"
            placeholder="账号/手机号"
            style="height: 40px;line-height: 40px;width: 85%;margin-top:28px;"
          ></TextBox>-->
        </div>
        <div class="password">
          <div class="inp">
            <PasswordBox
              type="password"
              inputId="Password"
              name="Password"
              v-model="ruleForm.Password"
              placeholder="密码"
              v-Tooltip="getTipOpts('Password')"
            ></PasswordBox>
            <span class="c-red starpos">*</span>
          </div>
          <!-- <PasswordBox
            inputId="Password"
            name="Password"
            v-model="ruleForm.Password"
            placeholder="密码"
            style="height: 40px;line-height: 40px;width: 85%;margin-top:15px;"
          ></PasswordBox>-->
        </div>
        <span
          style="color:#fff;margin-right: -190px;margin-top: 10px;display: block;cursor:pointer;"
          @click="forgetPwd()"
        >忘记密码</span>
        <!-- <div class="pd-20">
          <Label for="RememberClient">账号:</Label>
          <TextBox inputId="RememberClient" name="RememberClient" v-model="ruleForm.RememberClient"></TextBox>
        </div>-->
        <div class="mt-10 text-c mb-20">
          <div class="submit" :disabled="false" @click="submitForm()" v-if="bindPhone">登录</div>
          <div class="submit" :disabled="false" @click="submitForm()" v-else>确认绑定</div>
        </div>
      </Form>

      <Form
        ref="form"
        :model="ruleForm"
        v-else
        class="form"
        style="color:#fff;margin-bottom: 29px;font-size: 15px;"
      >
        <img :src="qrCodeImg" alt id="login_container"/>
        <p>请用手机扫码登陆</p>
      </Form>
    </div>
    <div class="login" v-else>
      <div class="login-title">忘记密码</div>
      <img src="../../assets/img/comp.png" alt class="ma" @click="forgetPwd(1)" />
      <!-- 电脑 -->

      <Form
        style="text-align: center;"
        :model="ruleForm"
        v-if="willShow"
        ref="formvalidate"
        :rules="rules"
        @validate="errors=$event"
      >
        <!-- <img src="../../assets/img/infor.png" alt /> -->
        <!-- <span style="text-align: center;color:#fff;">首次登陆输入账号和密码</span> -->
        <div class="username">
          <div class="inp">
            <TextBox
              type="text"
              placeholder="账号/手机号"
              v-model="ruleForm.Phone"
              inputId="Phone"
              name="Phone"
              v-Tooltip="getTipOpts('Phone')"
            ></TextBox>
            <span class="c-red starpos">*</span>
          </div>
          <div class="inp yzm-box">
            <TextBox
              type="text"
              placeholder="验证码"
              v-model="ruleForm.Code"
              inputId="Code"
              name="Code"
              v-Tooltip="getTipOpts('Code')"
            ></TextBox>
            <span class="c-red starpos">*</span>
            <div class="submit yzmBtn" :disabled="false" @click="getYzm()">
              <span v-if="count == 60" class>获取验证码</span>
              <span v-else class>{{ count }} s</span>
            </div>
          </div>
        </div>
        <div class="password">
          <div class="inp">
            <PasswordBox
              type="password"
              inputId="Password"
              name="Password"
              v-model="ruleForm.Password"
              placeholder="输入新密码"
              v-Tooltip="getTipOpts('Password')"
            ></PasswordBox>
            <span class="c-red starpos">*</span>
          </div>
          <div class="inp">
            <PasswordBox
              type="password"
              inputId="RePassword"
              name="RePassword"
              v-model="ruleForm.RePassword"
              placeholder="再次输入新密码"
              v-Tooltip="getTipOpts('RePassword')"
            ></PasswordBox>
            <span class="c-red starpos">*</span>
          </div>
        </div>
        <div class="mt-10 text-c mb-20">
          <div class="submit" :disabled="false" @click="confirmReset()">确认重置</div>
        </div>
      </Form>
    </div>
    <div style="width:100%;height:57px;"></div>
    <!-- <div class="bottom_img_box"> -->
    <!-- <img src="../../assets/img/foot.png" alt class="bottom_img" /> -->
    <!-- </div> -->

    <div class="login_bottom">
      <ul class="clearfix">
        <li @click="See('http://www.afarsoft.com')" style="cursor: pointer;">
          <img src="../../assets/img/tv.jpg" alt />产品官网
        </li>
        <li>
          <img src="../../assets/img/ai.jpg" alt />人工服务
        </li>
        <li>
          <img src="../../assets/img/tel.jpg" alt />服务热线：400-609-6980
        </li>
      </ul>
      <ul class="clearfix">
        <li>版权所有：河南新远方商翼电子科技有限公司</li>
        <li @click="See('http://www.beian.miit.gov.cn/')" style="cursor: pointer;">豫ICP备12006805号</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getLogin, ResetPassword, SendSms, GetSetting,QrCode,GetPCQrCode } from "@/api/Login";
import { default as request } from "@/utils/api";
import $ from "jquery";
export default {
  data() {
    return {
      ruleForm: {
        UserNameOrEmailAddress: "18866663331",
        Password: "123qwe",
        Phone: "",
        Code: "",
        Password: "",
        RePassword: ""

        // RememberClient: "true"
      },
      qrCodeImg:"",
      smsCode: "",
      count: 60,
      timer: null,
      willShow: true,
      show: true,
      isReset: true,
      bindPhone: true,//是否绑定手机号
      rules: {
        UserNameOrEmailAddress: "required",
        Password: "required",
        Name: "required",
        Phone: "required",
        Code: "required",
        RePassword: "required"
      },
      errors: {}
    };
  },
  methods: {
    forgetPwd(index) {
      if (index) {
        this.isReset = true;
      } else {
        this.isReset = false;
      }
    },
    getYzm() {
      if (this.timer) {
        return false;
      }
      this.timer = setInterval(() => {
        if (this.count <= 0) {
          clearInterval(this.timer);
          this.count = 60;
          this.timer = null;
        } else {
          this.count--;
        }
      }, 1000);
      const para = {
        Phone: this.ruleForm.Phone
      };
      console.log(para);
      SendSms(para).then(res => {
        console.log(res);
      });
    },
    fn() {
      if ((this.willShow == true) & (this.show == true)) {
        this.willShow = false;
        this.show = false;
      } else {
        this.willShow = true;
        this.show = true;
      }
      this.getQrCodeFn();//二维码登录
    },
    submitForm() {
      this.$refs.loginformvalidate.validate(valid => {
        console.log(valid);
        if (valid) {
          if (valid.UserNameOrEmailAddress) {
            this.$messager.alert({
              title: "提示",
              msg: "账号或手机号不能为空"
            });
            return;
          }
          if (valid.Password) {
            this.$messager.alert({
              title: "提示",
              msg: "密码不能为空"
            });
            return;
          }
        } else {
          this.submitFormFn();
        }
      });
    },
    submitFormFn() {
      let _this = this;
      const para = Object.assign({}, this.ruleForm);
      console.log(para);
      getLogin(para).then(res => {
        console.log(res);
        //console.log(res.Result.AccessToken);
        if (res.Result) {
          _this.$store.commit("setToken", res.Result.AccessToken);
          _this.$router.push({ path: "/home" });
        } else {
          this.$router.push({ path: "/login" });
        }
      });
    },
    See(e) {
      // window.location.href = e
      window.open(e, "_blank");
    },
    confirmReset: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if (valid) {
          if (valid.Phone) {
            this.$messager.alert({
              title: "提示",
              msg: "账号或手机号不能为空"
            });
            return;
          }
          if (valid.Code) {
            this.$messager.alert({
              title: "提示",
              msg: "验证码不能为空"
            });
            return;
          }
          if (valid.Password) {
            this.$messager.alert({
              title: "提示",
              msg: "新密码不能为空"
            });
            return;
          }
          if (valid.RePassword) {
            this.$messager.alert({
              title: "提示",
              msg: "再次输入新密码不能为空"
            });
            return;
          }
        } else {
          this.confirmResetFn();
        }
      });
    },
    //重置
    confirmResetFn() {
      if (this.ruleForm.Password != this.ruleForm.RePassword) {
        this.$messager.alert({
          title: "提示",
          msg: "两次密码不一样"
        });
        return;
      }
      let _this = this;
      const para = {
        Phone: this.ruleForm.Phone,
        Code: this.ruleForm.Code,
        Password: this.ruleForm.Password,
        RePassword: this.ruleForm.RePassword
      };
      console.log(para);
      ResetPassword(para).then(res => {
        console.log(res);
        if (res.Result.Code == 0) {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
          this.isReset = true;
        } else {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
          this.isReset = false;
        }
      });
    },
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : null;
    },
    hasError(name) {
      return this.getError(name) != null;
    },
    getTipOpts(name) {
      return {
        content: this.getError(name),
        closed: !this.hasError(name),
        position: "right"
      };
    },
    //获取登录二维码
    getQrCodeFn() {
      GetSetting().then(res => {
        console.log(res);
        if (res.Result.Code == 0) {
          var result = res.Result.Data;
          var random = Math.random(1,10)*10+1;
          console.log(random);
          if (result) {
            var url =
              'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + result.BindMpAppId +
              '&redirect_uri=' + encodeURIComponent(result.MicroOpenPlatformHost + "/mp/OAuthRedirectCallBack?return_url=" + encodeURIComponent(result.UserDomain + "/pclogin")) +
              '&response_type=code&scope=snsapi_userinfo&state=' + random + '&' +
              'component_appid=' + result.MicroOpenPlatformAppId +
              '#wechat_redirect';
            console.log(url);
            url = encodeURIComponent(url);
            //将得到的最终url传入/api/imagecode/QrCode?value=【url】
            var hostURL = request.defaults.baseURL;
            console.log(hostURL);
            var host = null;//显示二维码的时候用
            var newhost = null;//ajax轮询的时候用
            if (/^\//g.test(hostURL)) {
              host =
                window.location.protocol +
                "//" +
                window.location.host +
                hostURL +
                "/api/imagecode/QrCode?value=" +
                url;
              newhost =
                window.location.protocol +
                "//" +
                window.location.host +
                "/api/services/app/MP/GetPCQrCode";
              console.log(host);
            } else {
              host = hostURL + "/api/imagecode/QrCode?value=" + url;
              newhost = hostURL + "/api/services/app/MP/GetPCQrCode";
              console.log(host);
            }
            console.log(newhost);
            this.qrCodeImg = host;

            const para = {
              RandomCode: this.qrCodeImg
            };
            console.log(para);
            var timerCode = setInterval(()=>{
              console.log(999999999);
                $.get(newhost,para,function(res,status){
                    console.log(status);   //success    200状态码 ok的意思     
                    console.log(res);
                    if(res.Result.Code == 0){
                        if(res.Result.Data){
                          this.willShow = true;
                          this.show = true;
                          clearInterval(timerCode);
                        }
                    } else {
                          this.$messager.alert({
                          title: "提示",
                          msg: res.Result.Message
                        });
                    }         
                })
            },2000);
         }   
        } else {
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
        }
      });
    },
    qrCodeInit(){
      
    }
  },
  mounted() {
    //this.getQrCodeFn();
  }
};
</script>

<style scoped>
.login .yzm-box {
  position: relative;
  margin-top: 14px !important;
}
.login .yzmBtn {
  width: 42%;
  font-size: 13px;
  background: #60bae7;
  position: absolute;
  height: 30px;
  line-height: 30px;
  right: 16px;
  top: -25px;
}
.starpos {
  right: 28px;
}
.yzm-box .starpos {
  right: 7px;
}
.textbox {
  border-color: #ffffff;
  box-shadow: none;
}

.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}

.headers {
  width: 80%;
  margin: 0 auto;
}
.topImgleft {
  float: left;
  margin-top: 25px;
}
.topImgright {
  float: right;
}

.login_bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 57px;
  background: #fff;
}
.login_bottom ul:first-child {
  margin-top: 10px;
}
.login_bottom ul {
  width: 410px;
  margin: 0 auto;
}
.login_bottom ul li {
  float: left;
  color: #666666;
  margin-right: 50px;
}
.login_bottom ul li:last-child {
  margin-right: 0;
}
.login_bottom ul li img {
  vertical-align: -10%;
  width: 15px;
  height: 13px;
  margin-right: 6px;
}
.textbox .textbox-text {
  height: 40px !important;
  line-height: 40px !important;
  font-size: 12px;
  color: #666;
}
.username .inp,
.password .inp {
  background: #fff;
  width: 85%;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
}
.username input,
.password input {
  border: none;
  font-size: 14px;
  width: 90%;
}
.username .inp {
  margin-top: 28px;
}
.password .inp {
  margin-top: 15px;
}
.submit {
  cursor: pointer;
  background: #0093dd;
  color: #fff;
  border: none;
  width: 85%;
  font-size: 15px;
  margin: 30px auto 0 auto;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  letter-spacing: 4px;
}
.topImg {
  position: absolute;
}
.bottom_img {
  width: 445px;
  height: 57px;
  display: inline-block;
  margin: 0 auto;
}
.bottom_img_box {
  width: 100%;
  height: 57px;
  background-color: #ffffff;
  position: absolute;
  left: 0%;
  bottom: 0;
  display: flex;
}
.el-conment {
  position: absolute;
  background-color: #000;
  background: url(../../assets/img/bg.png) no-repeat center 83px;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 99%;
  opacity: 1;
  background-size: cover;
}

.login {
  position: absolute;
  left: 70%;
  top: 50%;
  width: 290px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: hsla(0, 0%, 0%, 0.3);
  /* overflow: hidden; */
}
.ma {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.login-title {
  width: 100%;
  text-align: center;
  font-size: 17px;
  color: #fff;
  margin-top: 20px;
  letter-spacing: 4px;

  font-family: Source Han Sans CN Regular;
}
.pd-20 {
  color: #000;
  font-size: 28px;
}
.ms-content {
  padding: 30px;
}

.form {
  text-align: center;
}
.form > img {
  width: 140px;
  padding: 20px 0;
}
.l-btn-text {
  font-size: 17px;
}
</style>
