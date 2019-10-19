<template>
  <div class="content">
    <!-- <van-nav-bar title="券核销" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar> -->

    <div class="container">
      <van-icon name="scan" class="c-blue f-l f-24 mt-15" @click="wxScanner"></van-icon>
      <van-search
        v-model="Searchvalue"
        placeholder="请输入券号或扫描二维码"
        show-action
        shape="round"
        @search="onSearch"
        class="Searchbg"
      >
        <div slot="action" @click="onSearch" class="SearchBtn">查询</div>
      </van-search>
    </div>
    <!--  -->
    <div class="ActhStyle" v-if="hasdata">
      <div class="ActhStyle_Top">
        <p>
          <span>优惠券号：</span>
          <span class="c-333">{{CouponCode}}</span>
          <!--2019082209132945550-->
        </p>
        <p>
          <span class="letterspacing">券名称：</span>
          <span>{{CouponName}}</span>
        </p>
        <p>
          <span class="letterspacing">券类型：</span>
          <span>{{qtype}}</span>
        </p>
        <p>
          <span>会员姓名：</span>
          <span>{{MemberName}}</span>
        </p>
        <p>
          <span>手机号码：</span>
          <span>{{MemberPhone}}</span>
        </p>
      </div>
      <div class="ActhStyle_Btn text-c">
        <van-button type="info" size="small" plain @click="writeOff()">核销</van-button>
      </div>
    </div>
    <!--  -->
    <div class="container f-14 Contype" style="padding-bottom:30px">
      <h4 class="h4style">操作步骤</h4>
      <p>第一步 搜索优惠券：</p>
      <span>
        会员出示优惠券，到会员中心【首页】--点击【优惠券】到【我的券包【--
        选择优惠券点击【使用】
      </span>
      <p>第二步 验证券：</p>
      <span>
        营业员输入或扫描券码，验证券码是否有效，若有效会查询出券信息，如果
        无效会提示无效信息
      </span>
      <p>第三步 使用券：</p>
      <span>点击核销，然后查看使用结果，使用完成顾客将受到优惠券使用的通知</span>
    </div>
  </div>
</template>
<script>
import {
  GetCouponWriteOffInfo,
  UpdateCouponWriteOff,
  getCouponInfo
} from "@/api/ProblemAtch";
import wechatCommon from "@/utils/wechat";
export default {
  data() {
    return {
      hasdata: false,
      Searchvalue: "",
      CouponId: "",
      CouponCode: "",
      CouponName: "",
      qtype: null,
      MemberName: "",
      MemberPhone: ""
    };
  },
  created() {
    wechatCommon.config(this);
  },
  methods: {
    onSearch() {
      getCouponInfo(this.Searchvalue).then(res => {
        if (res.Data&&res.Code == 0) {
          this.hasdata = true;
          this.CouponId = res.Data.MemberCouponId;
          this.CouponCode = res.Data.CouponCode;
          this.CouponName = res.Data.CouponName;
          if (res.Data.Type == 0) {
            this.qtype = "普通券";
          } else {
            this.qtype = "套餐卷";
          }
          this.MemberName = res.Data.MemberName;
          this.MemberPhone = res.Data.MemberPhone;
        } else {
          // this.$notify("优惠券不存在");
          this.$toast({
              message: "优惠券不存在",
              duration: 2000
          });
        }
      });
    },
    writeOff() {
      let couponId = this.CouponId;
      let couponIdparams = { memberCouponId: couponId };
      UpdateCouponWriteOff(couponIdparams).then(res => {
        if(res.Code == 0){
          // this.$notify(res.Message);
          this.$toast({
              message: res.Message,
              duration: 2000
          });
        }
      });
    },
    wxScanner(){
      let that = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = (res.resultStr.split(","))[res.resultStr.split(",").length-1]; // 当needResult 为 1 时，扫码返回的结果
          that.Searchvalue = result;
          that.onSearch();
        }
      });
    }
  }
};
</script>
<style scoped>
.ActhStyle {
  width: auto;
  margin: 10px 20px;
  background: #fff;
  padding: 10px;
}

.ActhStyle_Top {
  border-bottom: 1px #dfdfdf dashed;
  height: auto;
  overflow: hidden;
  margin-bottom: 10px;
}

.ActhStyle_Top p {
  line-height: 30px;
}

.ActhStyle_Top p span:nth-of-type(1) {
  width: 80px;
  float: left;
  display: block;
}

.ActhStyle_Top p span:nth-of-type(2) {
  width: 60%;
  float: left;
  display: block;
}

.ActhStyle_Btn button {
  width: 70%;
  border-radius: 5px;
}

.Contype p {
  line-height: 30px;
  color: #333;
}

.Contype span {
  color: #999999;
  font-size: 12px;
  text-indent: 2em;
  display: inline-block;
}

>>> .van-search__action {
  padding: 0;
  margin-left: 6px;
}
</style>
<style>
.Searchbg .van-search__content--round {
  /*background-color: #f5f5f5;*/
  border-radius: 5px;
  padding-left: 0;
}
/* 修改 */
.h4style{
  border-bottom:none;
}
</style>
