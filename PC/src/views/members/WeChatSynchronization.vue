<template>
  <div class="container">
    <div id="cc" class="easyui-layout">
      <div class="left">
        <p class="title">用户名</p>
        <p class="title">头像</p>
        <!-- <p>二维码</p> -->
      </div>
      <div class="right">
        <p style="font-weight: bold;">{{NickName}}</p>
        <div class="erweima">
          <img :src="img" alt class="gonghao" />
        </div>
        <ButtonGroup selectionMode="single" style="margin-top:80px;">
          <LinkButton  :toggle="true" :selected="true" @click="auth">微信授权</LinkButton>
        </ButtonGroup>
      </div>
    </div>
  </div>
</template>
<script>
import { GetWechatAuthMp, UpdateWechatAuthMp } from "@/api/members";
import { default as request } from "@/utils/api";
export default {
  data() {
    return {
      appId: "",
      img: "",
      NickName: "",
      UserName: "",
      qrCode: ""
    };
  },

  methods: {
    getInfo() {
      GetWechatAuthMp().then(res => {
        console.log(res.Result);
        if (res.Result.Data) {
          this.appId = res.Result.Data.MpAppId;
          this.img = res.Result.Data.MpHeadImg;
          this.NickName = res.Result.Data.MpNickName;
          this.UserName = res.Result.Data.UserName;
        }
      });
    },
    updateInfo(query) {
      this.appId = query.appid;
      this.img = query.headimg;
      this.NickName = query.nickname;
      this.UserName = query.username;
      this.qrCode = query.qrcode;
      UpdateWechatAuthMp({
        MpAppId: this.appId,
        MpNickName: this.NickName,
        MpHeadImg: this.img,
        UserName: this.UserName,
        MpQrcode: this.qrCode
      }).then(res => {
        console.log(res.Result);
      });
    },
    auth() {
      var host = request.defaults.baseURL;
      if(/^\//g.test(host))
      {
          host=window.location.protocol + "//" + window.location.host+host;
      }
      var notifyUrl = encodeURIComponent(
        host + "/api/mp/mpeventhandler"
      );
      var returnUrl = encodeURIComponent(
        window.location.protocol +
          "//" +
          window.location.host +
          this.$route.fullPath
      );
      window.location =
        this.globalVerb.openMpOpenPlatformHost +
        "/home/index?returnurl=" +
        returnUrl +
        "&notifyurl=" +
        notifyUrl +
        "&type=mp";
    }
  },
  created() {
    var query = this.$router.currentRoute.query;
    if (query.nickname) {
      this.updateInfo(query);
    } else {
      this.getInfo();
    }
  }
};
</script>
<style scoped>
#cc {
  text-align: left;
  margin: 20px auto;
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
.left {
  float: left;
  padding: 20px;
  height: 100%;
  border-right: 1px solid #ccc;
}

.right {
  float: left;
  width: 200px;
  padding: 20px;
  height: 100%;
  text-align: center;
}
#cc .title {
  margin-bottom: 50px;
}
.gonghao {
  width: 60px;
  height: 60px;
  margin-top: 30px;
}
</style>
