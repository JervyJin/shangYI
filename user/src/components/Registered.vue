<template>
  <div class="content">
    <!-- <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="$router.push({ path: '/index' })"
    ></van-nav-bar> -->
    <div class="container mb-20">
      <van-cell-group>
        <van-field v-model="photo" type="tel" label="手机号码" placeholder="手机号码" input-align="right" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码">
          <van-button
            :disabled="send"
            slot="button"
            plain
            type="info"
            size="small"
            @click="sendSms"
          >{{btnText}}</van-button>
        </van-field>
      </van-cell-group>
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>性别</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body drop-menu">
            <van-dropdown-menu>
              <van-dropdown-item v-model="sexvalue" :options="sex" />
            </van-dropdown-menu>
          </div>
        </div>
      </div>
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>生日类型</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body drop-menu">
            <van-dropdown-menu>
              <van-dropdown-item v-model="BirthdayTypeval" :options="BirthdayType" />
            </van-dropdown-menu>
          </div>
        </div>
      </div>
      <van-field v-model="Birthday" disabled clearable label="生日" is-link @click="showBirthday" />
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>注册营销</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body drop-menu">
            <van-dropdown-menu>
              <van-dropdown-item
                v-model="Preferentialval"
                :options="PreferentialType"
                @change="handleChange"
              />
            </van-dropdown-menu>
          </div>
        </div>
      </div>
      <div class="mt-15 mb-15 f-14 agree">
        <van-checkbox v-model="checked">
          我已查看并接受
          <span class="agreement" v-on:click.stop="agreementDetail">《会员注册协议》</span>
        </van-checkbox>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="new Date('1970/01/01')"
        :max-date="new Date()"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </van-popup>
    <!--  -->
    <!-- 注册奖励 -->
    <div class="list">
      <p class="zc-label">
        <img src="../assets/neirong.png" alt />
        <span class="title">注册奖励</span>
      </p>
      <div class="zc-item" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.Awardintegral">
        <van-col span="8" class="left-label">
          <img src="../assets/score.png" alt />
          <span>奖励积分：</span>
        </van-col>
        <van-col span="16" class="right-nr">{{jlInfo ? jlInfo.Awardintegral.Awardintegral:''}}</van-col>
        <!-- <div class="left-label">
          <img src="../assets/score.png" alt />
          <span>奖励积分：</span>
        </div>
        <div class="right-nr">{{jlInfo ? jlInfo.Awardintegral.Awardintegral:''}}</div>-->
      </div>
      <div class="zc-item" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.AwardGrowth">
        <van-col span="8" class="left-label">
          <img src="../assets/grop.png" alt />
          <span>奖励成长值：</span>
        </van-col>
        <van-col span="16" class="right-nr">{{jlInfo ?jlInfo.Awardintegral.AwardGrowth:''}}</van-col>
        <!-- <div class="left-label">
          <img src="../assets/grop.png" alt />
          <span>奖励成长值：</span>
        </div>
        <div class="right-nr">{{jlInfo ?jlInfo.Awardintegral.AwardGrowth:''}}</div>-->
      </div>
      <div class="zc-item" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.AwardRechargeAmoun">
        <van-col span="8" class="left-label">
          <img src="../assets/money.png" alt />
          <span>奖励金额：</span>
        </van-col>
        <van-col span="16" class="right-nr">{{jlInfo ?jlInfo.Awardintegral.AwardRechargeAmoun:''}}</van-col>
        <!-- <div class="left-label">
          <img src="../assets/money.png" alt />
          <span>奖励金额：</span>
        </div>
        <div class="right-nr">{{jlInfo ?jlInfo.Awardintegral.AwardRechargeAmoun:''}}</div>-->
      </div>
      <div class="zc-item" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.AwardHongBaoAmount">
        <van-col span="8" class="left-label">
          <img src="../assets/hongbao.png" alt />
          <span>奖励红包：</span>
        </van-col>
        <van-col span="16" class="right-nr">{{jlInfo ?jlInfo.Awardintegral.AwardHongBaoAmount:''}}</van-col>
        <!-- <div class="left-label">
          <img src="../assets/hongbao.png" alt />
          <span>奖励红包：</span>
        </div>
        <div class="right-nr">{{jlInfo ?jlInfo.Awardintegral.AwardHongBaoAmount:''}}</div>-->
      </div>
      <div
        class="zc-item span"
        v-if="jlInfo.MarketingCouponAwardList && jlInfo.MarketingCouponAwardList.length"
      >
        <van-col span="8" class="left-label">
          <img src="../assets/quan.png" alt />
          <span>奖励券：</span>
        </van-col>
        <van-col span="16" class="right-nr">
          <span
            v-for="(item, index) in jlInfo.MarketingCouponAwardList"
            :key="index"
          >{{item.CouponName}}*{{item.Num}}</span>
        </van-col>
        <!-- <div class="left-label">
          <img src="../assets/quan.png" alt />
          <span>奖励券：</span>
        </div>
        <div class="right-nr">
          <span v-for="(item, index) in jlInfo.MarketingCouponAwardList" :key="index">{{item.CouponName}}*{{item.Num}}</span>
        </div>-->
      </div>
      <div
        class="zc-item span"
        v-if="jlInfo.MarketingComboAwardList && jlInfo.MarketingComboAwardList.length"
      >
        <van-col span="8" class="left-label">
          <img src="../assets/taocan.png" alt />
          <span>奖励套餐：</span>
        </van-col>
        <van-col span="16" class="right-nr">
          <span
            v-for="(item, index) in jlInfo.MarketingComboAwardList"
            :key="index"
          >{{item.ComboName}}*{{item.Num}}</span>
        </van-col>
        <!-- <div class="left-label">
          <img src="../assets/taocan.png" alt />
          <span>奖励套餐：</span>
        </div>
        <div class="right-nr">
          <span v-for="(item, index) in jlInfo.MarketingComboAwardList" :key="index">{{item.ComboName}}*{{item.Num}}</span>
        </div>-->
      </div>
      <div class="tip">活动以实际到账为准</div>
    </div>
    <div class="pd-20">
      <van-button :disabled="!checked" type="info" class="Submitbtn" @click="save">提交</van-button>
    </div>
  </div>
</template>
<script>
import {
  getRegisterMarketingInfo,
  getRegisterAward,
  sendMsg,
  saveMember
} from "../api/hy";
import dayjs from "dayjs";

export default {
  data() {
    return {
      photo: "",
      sms: "",
      sexvalue: 0,
      sex: [{ text: "男", value: 0 }, { text: "女", value: 1 }],
      BirthdayTypeval: 0,
      BirthdayType: [{ text: "农历", value: 0 }, { text: "公历", value: 1 }],
      Preferentialval: 0,
      PreferentialName: "",
      PreferentialType: [],
      Birthday: "",
      birthday: "",
      checked: false,
      show: false,
      jlInfo: {
        Awardintegral: {}
      },
      btnText: "发送验证码",
      send: false,
      currentDate: new Date()
    };
  },
  methods: {
    showBirthday() {
      this.show = true;
    },
    handleConfirm(val) {
      this.birthday = val;
      this.Birthday = dayjs(val).format("YYYY-MM-DD");
      this.show = false;
    },
    handleCancel() {
      this.Birthday = "";
      this.show = false;
    },
    getJl() {
      getRegisterMarketingInfo().then(res => {
        res.Data.map(item => {
          this.PreferentialType.push({
            text: item.Name,
            value: item.Id
          });
        });
        if (this.PreferentialType.length > 0) {
          this.Preferentialval = this.PreferentialType[0].value;
          this.PreferentialName = this.PreferentialType[0].text;
          this.getYxDetail(this.Preferentialval);
        }
      });
    },
    getYxDetail(id) {
      getRegisterAward(id).then(res => {
        this.jlInfo = res.Data;
      });
    },
    handleChange(val) {
      this.Preferentialval = val;
      this.PreferentialName = this.PreferentialType.filter(item => {
        return item.value === val;
      })[0].text;
      this.getYxDetail(this.Preferentialval);
    },
    sendSms() {
      if (!this.photo) {
        this.$toast({
          message: "请填写手机号!!",
          duration: 2000
        });
        return;
      }
      sendMsg(this.photo).then(res => {
        if (res.Code == 0) {
          this.$toast({
            message: res.Message,
            duration: 2000
          });
          this.send = true;
          let t = 60;
          let timer = setInterval(() => {
            t--;
            this.btnText = `${t}s`;
            if (t === 0) {
              clearInterval(timer);
              this.btnText = "发送验证码";
              this.send = false;
            }
          }, 1000);
        }
      });
    },
    save() {
      if (!this.photo) {
        this.$toast({
          message: "请填写手机号!!",
          duration: 2000
        });
        return;
      }
      if (!this.sms) {
        this.$toast({
          message: "请填写验证码!!",
          duration: 2000
        });
        return;
      }
      if (!this.birthday) {
        this.$toast({
          message: "请选择生日!!",
          duration: 2000
        });
        return;
      }
      saveMember({
        Sex: this.sexvalue,
        BirthdayType: this.BirthdayTypeval,
        Birthday: this.birthday,
        Phone: this.photo,
        VerificationCode: this.sms,
        MarketingId: this.Preferentialval || null,
        MarketingName: this.PreferentialName
      }).then(res => {
        if (res.Code == 0) {
          this.$toast({
            message: "注册成功!!",
            duration: 2000
          });
          setTimeout(() => {
            this.$router.push({
              name: "login"
            });
          }, 2000);
        }
      });
    },
    agreementDetail() {
      this.$router.push({ path: "/agreement" });
    }
  },
  created() {
    this.getJl();
  }
};
</script>
<style scoped>
.datestyle {
  width: 50%;
  float: right;
  background: #fff;
  border: none;
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  text-align: right;
  margin-right: -10px;
  border-bottom: 1px solid #e0e0e0;
}

input::-webkit-input-placeholder {
  text-align: right;
}

.van-cell {
  border-bottom: 1px solid #eeeeee;
}

.list {
  margin-top: 0.12rem;
  padding: 0.3rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.25rem;
  color: #000000;
  font-weight: bold;
}

.tip {
  text-align: center;
  margin-top: 0.43rem;
  color: #c0bfbf;
  font-family: Microsoft YaHei Light;
  font-weight: bold;
}

.drop-menu {
  justify-content: flex-end;
  padding-right: 6px;
}

.drop-menu .van-dropdown-menu {
  height: auto;
}

.agree {
  padding-left: 10px;
}

.zc-item {
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-weight: initial;
}

.zc-item .left-label {
  display: flex;
  align-items: center;
  margin-left: 0.4rem;
  line-height: 0.6rem;
  font-size: 14px;
  /* width: 110px; */
}

.zc-item .left-label img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.15rem;
}

.zc-item .right-nr {
  font-size: 14px;
  display: inline-block;
  flex: 1;
  color: #3c6efd;
  word-break: break-all;
  font-weight: initial;
}

.zc-item.span {
  align-items: flex-start !important;
}

.zc-item .right-nr span {
  /*white-space: nowrap;*/
  font-weight: normal;
  margin-right: 10px;
}

.zc-label img {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.11rem;
}

.agreement {
  /* color: #5ba1e7;
  text-decoration: underline; */
}

>>> .van-checkbox {
  font-size: 12px;
  margin-left: -10px;
}

>>> .van-checkbox__icon {
  font-size: 12px;
}

>>> .van-field__control {
  text-align: right;
}

.Submitbtn {
  border: none;
}
</style>
<style>
.van-button--plain {
  border-radius: 4px;
}

.drop-menu .van-cell__title {
  text-align: left;
}
.title {
  font-family: "Microsoft YaHei Regular";
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
/* 修改 */
.van-button--plain.van-button--info {
  color: #5ba1e7;
}
.van-checkbox__icon {
  background: rgba(246, 243, 247, 1);
}
.van-col--8 {
  font-family: "Microsoft YaHei Light";
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.van-col--16 {
  font-family: "Microsoft YaHei Light";
  color: rgba(60, 110, 253, 1);
}
.van-ellipsis{
  color: #333333;
}
</style>
