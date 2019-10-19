<template>
  <div class="content">
    <van-nav-bar title="机构消费评价详情" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <!--  -->
    <div class="container">
      <div class="h4style">评价信息</div>
      <div class="infoCon_reply">
        <p class="mr-10 f-l">
          <span class="f-l f-14">商品质量：</span>
          <van-rate v-model="hyInfo.Quality" :size="20" color="#898DE7" class="f-l ml-10 mt-5" readonly/>
        </p>
        <p class="mr-10 f-l">
          <span class="f-l f-14">购物环境：</span>
          <van-rate v-model="hyInfo.Environment" :size="20" color="#898DE7" class="f-l ml-10 mt-5" readonly/>
        </p>
        <p class="f-l">
          <span class="f-l f-14">服务态度：</span>
          <van-rate v-model="hyInfo.Attitude" :size="20" color="#898DE7" class="f-l ml-10 mt-5" readonly/>
        </p>
      </div>
    </div>
    <!--  -->
    <div class="container">
      <van-row class="border-bottom pb-5 pt-5" v-for="(item, index) in hyInfo.listAppendEvaluate" :key="index">
        <van-col span="24" class="text-l">
          <p class="f-l">
            <span class="f-14">{{hyInfo.MemberName}}</span>
            <span class="c-999 f-12">（尾号{{hyInfo.MemberPhone?hyInfo.MemberPhone:hyInfo.OrderDetail?hyInfo.OrderDetail.MemberPhone.substring(7):''}}）</span>
          </p>
          <p class="f-r c-999 f-12">{{item.CreatorTime}}</p>
        </van-col>
        <van-col span="24" class="mt-10 mb-5">
          <p class="c-666 f-l f-12">{{item.Content}}</p>
        </van-col>
      </van-row>
    </div>
    <!--  -->
    <div class="container">
      <div class="h4style">消费信息</div>
      <van-cell-group class="group_list">
        <van-cell title="消费金额" :value="hyInfo.OrderDetail.PayAmount+'元'" title-class="c-999" value-class="c-000"/>
        <van-cell title="消费状态" :value="hyInfo.OrderDetail.TransactionState==0?'交易成功':'交易失败'" title-class="c-999"
                  value-class="c-success"/>
        <van-cell
          title="消费时间"
          :value="hyInfo.OrderDetail.CreatorTime"
          title-class="c-999"
          value-class="c-000"
        />
        <van-cell
          title="消费流水号"
          :value="hyInfo.OrderDetail.SerialNumber"
          title-class="c-999"
          value-class="c-000"
        />
        <van-cell title="订单号" :value="hyInfo.OrderDetail.OrderCode" title-class="c-999" value-class="c-000"/>
        <template v-for="item in hyInfo.OrderDetail.ListGoods">
          <van-cell title="商品名称" :value="item.GoodsName" title-class="c-999" value-class="c-000"/>
          <van-cell title="数量" :value="item.GoodsNum" title-class="c-999" value-class="c-000"/>
        </template>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
    import {getOrderEvaluateDefault} from '../../api/hy'

    export default {
        data() {
            return {
                value: 5,
                hyInfo: {
                    OrderDetail: '',
                    listAppendEvaluate: ''
                },
                id: this.$route.query.id,
                orderId: this.$route.query.orderId
            };
        },
        methods: {
            getMemberInfo() {
                getOrderEvaluateDefault(this.id, this.orderId).then(res => {
                  if(res.Code == 0){
                    this.hyInfo = res.Data
                  }
                })
            }
        },
        created() {
            this.getMemberInfo()
        }
    };
</script>
<style scoped>
  .infoCon_reply p {
    width: 100%;
    height: 35px;
    line-height: 35px;
  }

  .van-cell {
    padding: 0px 0px 10px 0;
  }
</style>
<style>
  .group_list .van-cell__value {
    overflow: initial;
  }
</style>
