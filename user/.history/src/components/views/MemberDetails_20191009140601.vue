<template>
  <div class="content">
    <van-nav-bar title="会员中心" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="container">
      <van-row class="user-links">
        <van-col span="7" class="mt-20 pr-10">
          <img
            :src="userInfo.HeadPortrait"
            width="100%"
            class="imgradius"
            v-if="userInfo.HeadPortrait"
          />
          <img src="../../assets/touxiang.png" width="100%" class="imgradius" v-else />
        </van-col>
        <van-col span="17">
          <van-col span="24" class="mt-20">
            <van-col span="17">
              <p class="f-16">
                {{userInfo.RealName}}
                <i class="iconfont mr-5 f-16 c-yellow" slot="icon">&#xe635;</i>
                <span class="c-666 f-12 display">({{userInfo.NickName}})</span>
              </p>
              <p class="mt-10">
                {{userInfo.MemberPhone}}
                <span class="c-666 f-12 display ml-10">{{userInfo.IsWechat}}</span>
              </p>
            </van-col>
            <van-col span="7">
              <router-link :to="'/StickTag/'+id">
                <div class="Alabel f-12">
                  <span>+</span>
                  贴标签
                </div>
              </router-link>
            </van-col>
          </van-col>
          <van-col span="24" class="mt-10">
            <p class="c-blue f-12">
              <span
                class="display mr-5 f-l"
                v-for="(item, index) in userInfo.TagName"
                :key="index"
              >#{{item}}#</span>
              <span class="display f-r">
                <van-icon name="play" />
              </span>
            </p>
          </van-col>
        </van-col>
      </van-row>
      <van-row class="row text-c mt-20 backblue">
        <van-col span="12" class="line">
          <span class="f-18">
            <i class="iconfont mr-5 f-16" slot="icon">&#xe945;</i>
            {{userInfo.Score}}
          </span>
          <p>积分</p>
        </van-col>
        <van-col span="12">
          <div>
            <span class="f-18">
              <i class="iconfont mr-5 f-16" slot="icon">&#xe626;</i>
              {{userInfo.AccountBalance}}
            </span>
            <p>余额</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <!--  -->
    <!-- <div class="container mt-0">
      <van-cell-group class="user-group">
        <van-cell title="会员信息" is-link>
          <template>
            <i class="iconfont mr-5 f-16" slot="icon" style="color:#FC997E">&#xe60e;</i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>-->
    <!--  -->
    <div class="container mt-0">
      <van-cell-group class="user-group">
        <van-cell :value="userInfo.CouponNum" title="优惠券" is-link class="border-bottom">
          <template>
            <i class="iconfont mr-5 f-16" slot="icon" style="color:#FCC27E">&#xe621;</i>
          </template>
        </van-cell>
        <van-cell icon="records" title="套餐" is-link :value="userInfo.ComboNum">
          <template>
            <i class="iconfont mr-5 f-16" slot="icon" style="color:#DA6D97">&#xe653;</i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!--  -->
    <div class="container mt-0" v-if="xfInfo.CreatorTime">
      <van-cell-group class="user-group border-bottom">
        <van-cell :value="xfInfo.PayAmount+'元'">
          <template slot="title">
            <span class="van-cell-text">上笔消费</span>
            <span class="goods-tag f-12 c-666">({{xfInfo.CreatorTime}}天前)</span>
            <i class="iconfont mr-5 f-16 f-l" slot="icon" style="color:#4D97C3">&#xe626;</i>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="conall f-14">
        <div
          class="xf-item"
          v-for="(item, index) in xfInfo.ListGoods"
          :key="index"
        >{{item.GoodName}}*{{item.Num}}</div>
      </div>
    </div>
    <!-- <div class="container mt-0">
      <van-cell-group class="user-group border-bottom">
        <van-cell title="最爱购买商品">
          <template>
            <i class="iconfont mr-5 f-16" slot="icon" style="color:#FC7E7E">&#xe60c;</i>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="conall f-14">消费内容</div>
    </div>
    <div class="container mt-0">
      <van-collapse v-model="activeName1">
        <van-collapse-item title="最爱购买品牌" name="1">
          <i class="iconfont mr-5 f-16" slot="icon" style="color:#FCE97E">&#xe630;</i>
          <span>消费内容</span>
        </van-collapse-item>
        <van-collapse-item title="经常购买品类" name="2">
          <i class="iconfont mr-5 f-16" slot="icon" style="color:#C76DDA">&#xe771;</i>
          <span>消费内容</span>
        </van-collapse-item>
        <van-collapse-item title="机构统计" name="3">
          <i class="iconfont mr-5 f-16" slot="icon" style="color:#4DBFC3">&#xe6d5;</i>
          <span>消费内容</span>
        </van-collapse-item>
      </van-collapse>
    </div>-->
    <!--  -->
    <!-- <div class="container mt-0">
      <van-collapse v-model="activeName2">

      </van-collapse>
    </div>-->
    <!--  -->
    <div class="container mt-0">
      <van-cell-group class="goods-cell-group">
        <van-cell title="机构消费记录" is-link :to="'/StoresDetails/'+id">
          <i class="iconfont mr-5 f-16 f-l" slot="icon" style="color:#E75B5B">&#xe624;</i>
        </van-cell>
        <van-cell title="基本情况" is-link :to="'/memberInfo/'+id">
          <i class="iconfont mr-5 f-16 f-l" slot="icon" style="color:#05CB95">&#xe61f;</i>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import {
  getMemberInfo,
  getExpendRecord,
  getExpendDetailUser
} from "../../api/hy";
import dayjs from "dayjs";

export default {
  data() {
    return {
      activeName1: [],
      id: this.$route.params.id,
      userInfo: {},
      xfInfo: {}
    };
  },
  methods: {
    goBack() {
      let path = "";
      if (sessionStorage.getItem("memberPath")) {
        path = sessionStorage.getItem("memberPath");
      } else if (sessionStorage.getItem("path")) {
        path = sessionStorage.getItem("path");
      } else {
        path = "/index";
      }
      this.$router.push({
        path: path
      });
    },
    getMemberInfo() {
      getMemberInfo(this.id).then(res => {
        this.userInfo = res.Data;
        this.getExpendRecord();
      });
    },
    getExpendRecord() {
      getExpendRecord({
        Id: this.id,
        page: 1,
        rows: 10,
        sort: "CreatorTime",
        order: "desc"
      }).then(res => {
        if (res.Rows.length > 0) {
          getExpendDetailUser(res.Rows[0].Id).then(res => {
            if (res.Data) {
              res.Data.CreatorTime = dayjs().diff(
                dayjs(res.Data.CreatorTime),
                "day"
              );
              this.xfInfo = res.Data;
            }
          });
        }
      });
    }
  },
  created() {
    this.getMemberInfo();
  }
};
</script>
<style scoped>
.Alabel {
  width: auto;
  font-size: 12px;
  float: left;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
  opacity: 1;
  border: 1px solid rgba(91, 161, 231, 1);
  border-radius: 10px 10px 10px 10px;
  color: rgba(91, 161, 231, 1);
}
.line {
  border-right: 1px #fff dotted;
}
.backblue {
  margin: 20px 0;
  border-radius: 15px;
}
.van-cell,
.van-collapse-item .van-cell {
  padding: 10px 0;
}
.conall {
  padding: 5px 10px 5px 20px;
  height: auto;
  line-height: 25px;
  color: #999;
}
.xf-item {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/* 修改 */
.van-cell__value span {
  color: #3c6efd;
}
.Alabel {
  /* width: 90px; */
  height: 26px;
  opacity: 1;
  border-radius: 10px 10px 10px 10px;
}
.Alabel span{
  display:inline-block;
  width: 11px;
  height: 11px;
  
  border: 1px solid #3C6EFD;
  border-radius:50%;
}
</style>
