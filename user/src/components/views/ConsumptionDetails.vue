<template>
  <div class="content">
    <van-nav-bar title="交易详情" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="container ConDetails">
      <h4 class="h4style">交易信息</h4>
      <van-cell-group class="goods-cell-group">
        <van-cell title="交易金额" :value="info.PayAmount+'元'" />
        <van-cell title="交易状态" :value="info.TransactionState==0?'交易成功':'交易失败'"
                  :value-class="info.TransactionState==0?'c-success':'c-red'" />
        <van-cell title="交易门店" :value="info.OrganizationName" />
        <van-cell title="交易时间" :value="info.CreatorTime" />
        <van-cell title="交易流水号" :value="info.ThirdpartyOrderCode" />
        <van-cell title="POS单号" :value="info.OrderCode" />
      </van-cell-group>
    </div>
    <div class="container ConDetails">
      <h4 class="h4style">支付信息</h4>
      <van-cell-group class="goods-cell-group">
        <van-cell :title="item.PayType" :value="item.Amount+'元'" v-for="(item, index) in info.ListPay" :key="index"/>
      </van-cell-group>
    </div>
    <div class="container ConDetails">
      <h4 class="h4style">商品信息</h4>
      <van-row class="c-999 mt-15 f-14">
        <van-col span="8" class="text-l">商品名称</van-col>
        <van-col span="8" class="text-c">数量</van-col>
        <van-col span="8" class="text-r">金额</van-col>
      </van-row>
      <van-row class="user-links f-14" v-for="(item, index) in info.ListGoods" :key="index">
        <van-col span="8" class="text-l">{{item.GoodName}}</van-col>
        <van-col span="8" class="text-c">{{item.Num}}</van-col>
        <van-col span="8" class="text-r">{{item.RealityPrice}}元</van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
  import { getExpendDetailUser } from '../../api/hy'
export default {
  data() {
    return {
      info: {}
    };
  },
  methods: {
    getExpendDetailUser() {
      getExpendDetailUser(this.$route.params.id).then(res =>{
        if(res.Data&&res.Code == 0) {
          this.info = res.Data
        }
      })
    }
  },
  created() {
    this.getExpendDetailUser()
  }
};
</script>
<style scoped>
.user-links {
  height: 33px;
  line-height: 33px;
}
</style>
