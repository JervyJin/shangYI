<template>
  <div class="content">
    <van-nav-bar
      title="我的名片"
      left-text="返回"
      left-arrow
      @click-left="$router.push({ path: '/index' })"
    ></van-nav-bar>
    <div class="myinfo">
      <van-row class="user-links">
        <van-col span="8">
          <img :src="Image" width="100%" class="imgradius" v-if="Image"/>
          <img src="../../assets/touxiang.png" class="imgradius" v-else/>
        </van-col>
        <van-col span="16">
          <div class>
            <b class="f-16 display mb-5 mt-5">{{UserName}}</b>
            <!--<p>-->
            <!--<span class="f-l">综合评分</span>-->
            <!--<van-rate v-model="star" :size="14" color="#898DE7" class="f-l ml-5" readonly />-->
            <!--</p>-->
            <p class="radiustyle card-data">
              <span>
                <b class="c-blue">{{WorkTimes}}</b>年从业经验
              </span>
              <span class="ml-10">
                已服务
                <b class="c-blue">{{WhoNum}}</b>位顾客
              </span>
            </p>
          </div>
        </van-col>
      </van-row>
      <!-- <div> -->
      <van-cell-group class="mt-10" style="border-bottom:1px #dfdfdf dashed">
        <van-cell :title="orgInfo.OrganizationName" :value="orgInfo.Distance?'距我'+ orgInfo.Distance +'km': ''"
                  value-class="c-666">
          <i slot="right-icon" class="ml-5 c-blue f-18 iconfont c-yellow">&#xe64f;</i>
        </van-cell>
      </van-cell-group>
      <!--  -->
      <div class="text-c">
        <img :src="UrlQrCode" class="erweima"/>
        <p class="c-999 f-12">扫描上方二维码</p>
        <p class="c-999 f-12">注册成为TA的会员</p>
      </div>
    </div>
  </div>
</template>
<script>
    import {MyCardInfo, getOrganizationName} from "@/api/mycard";

    export default {
        data() {
            return {
                UserName: "",
                UserCode: "",
                WorkTimes: "",
                WhoNum: "",
                UrlQrCode: "",
                star: 5,
                Image: "",
                orgInfo: {}
            };
        },
        components: {},
        methods: {
            // 获取用户信息
            getUsers() {
                let userId = this.$route.params.id;
                let userIdparams = {"userId": userId};
                //console.log(userId,userIdparams);
                MyCardInfo(userIdparams).then(res => {
                    //console.log(res.Result.Data);
                    //if(res.Result.Data.Image){
                    //};
                    this.Image = res.Data.Image;
                    this.UserName = res.Data.UserName;
                    this.UserCode = res.Data.UserCode;
                    this.WorkTimes = res.Data.WorkTimes;
                    this.WhoNum = res.Data.WhoNum;
                    this.UrlQrCode = res.Data.UrlQrCode;
                });
            },
            //获取机构
            getOrganizationName() {
                getOrganizationName().then(res => {
                    if (res.Data) {
                        this.orgInfo = res.Data
                    }
                })
            }
        },
        mounted() {
            this.getUsers();
            this.getOrganizationName()
        }
    };
</script>
<style scoped>
  .user-links p {
    width: 100%;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  .myinfo {
    width: auto;
    padding: 0 10px 22px;
    background: #fff;
    margin: 20px;
    margin-top: 40px;
    opacity: 1;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  }

  .erweima {
    width: 200px;
    height: 200px;
    background-size: 100%;
    margin-top: 20px;
    margin-bottom: 2px;
  }

  .card-data {
    background-color: #f6f3f7;
    padding-left: 6px;
    border-radius: 2px;
    font-size: 12px;
    margin-top: 12px;
  }

  .card-data b {
    margin-right: 2PX;
    font-size: 120%;
  }

  >>> .van-cell__title {
    font-weight: bold;
  }

  >>> .van-cell {
    display: flex;
    align-items: center;
  }

  >>> .imgradius, .van-image__img {
    margin-top: -24px;
  }
</style>
<style>
  .imgradius, .van-image__img {
    border-radius: 15px;
    width: 90px;
    height: 90px;
    background-size: 100%;
    margin-top: -8px;
  }
  /* 修改 */
.c-666 span{
  color: #999999;
  font-size: 12px;
}
.c-yellow{
  color: #FC997E;
}
</style>
