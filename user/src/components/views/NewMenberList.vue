<template>
  <div class="content" id="new_member">
    <!-- <van-nav-bar
      v-bind:title="dataItem.head"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar> -->
    <div class="top_style">
      <!-- 新注册并消费的客户 -->
      <!-- 会员所有的充值金额 -->
      <!-- 会员充值金额 -->
      <!-- 注册后第一次消费的客户 -->
      <!-- 所有消费的新老会员 -->
      <p>{{dataItem.headName}}</p>
      <p
        class="mt-20"
        v-if="dataItem.type == 'RechargeAmount'|| dataItem.type == 'ConsumptionAmount'"
      >
        <b class="mr-5 f-20">{{num}}</b>总金额
      </p>
      <p class="mt-20" v-else>
        <b class="mr-5 f-20">{{num}}</b>总计人数
      </p>
    </div>

    <div class="container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
          v-if="dataItem.type == 'RechargeAmount'|| dataItem.type == 'ConsumptionAmount'"
        >
          <van-cell-group>
            <!-- 新客人数 -->
            <!-- 会员充值金额 -->
            <!-- 会员充值金额 -->
            <!-- 会员人数 -->
            <!-- 会员人数 -->
            <van-cell
              title="促销员"
              v-bind:value="dataItem.contentTitle"
              value-class="c-333"
              class="border-bottom"
            />
            <van-cell
              v-for="(item,index) in list"
              :key="index"
              v-bind:title="item.Promoter"
              v-model="item.MemberAmount"
              v-bind:class="index+1<list.length?'border-bottom':''"
            />
          </van-cell-group>
        </van-list>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
          v-else
        >
          <van-cell-group>
            <van-cell
              title="促销员"
              v-bind:value="dataItem.contentTitle"
              value-class="c-333"
              class="border-bottom"
            />
            <van-cell
              v-for="(item,index) in list"
              :key="index"
              v-bind:title="item.Promoter"
              v-model="item.MemberShip"
              v-bind:class="index+1<list.length?'border-bottom':''"
            />
          </van-cell-group>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import {
  NewMemberRecruitInfo,
  NewMemberInfo,
  FirstConsume,
  RechargeAmount,
  Consume,
  ConsumptionAmount
} from "@/api/index";
export default {
  data() {
    return {
      num: 0,
      StartDate: "",
      EndDate: "",
      num: "",
      list: [],
      dataItem: "",
      loading: false,
      isLoading: false,
      finished: false,
      page: 1,
      rows: 10,
      total: 0,
      pageData:[
        {head:"新客招募",type:'NewMemberRecruit',headName:'新注册的客户',contentTitle:'新客人数'},
        {head:"新客转化",type:'NewMemberNum',headName:'新注册并消费的客户',contentTitle:'新客人数'},
        {head:"首次消费会员",type:'FirstConsume',headName:'注册后第一次消费的客户',contentTitle:'会员人数'},
        {head:"充值金额",type:'RechargeAmount',headName:'会员所有的充值金额',contentTitle:'会员充值金额'},
        {head:"消费会员",type:'Consume',headName:'所有消费的新老客户',contentTitle:'会员人数'},
        {head:"消费金额",type:'ConsumptionAmount',headName:'所有会员消费金额',contentTitle:'会员消费金额'},
      ],
      active:''
    };
  },
  created() {
    this.StartDate = this.$route.params.StartDate;
    this.EndDate = this.$route.params.EndDate;
    this.num = this.$route.params.num;
    // this.dataItem = JSON.parse(this.$route.params.pageData);
    this.dataItem = this.pageData[this.$route.params.pageData];
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      var _this = this;
      let params = {
        StartDate: _this.StartDate,
        EndDate: _this.EndDate,
        page: _this.page,
        rows: _this.rows
      };
      switch (_this.dataItem.type) {
        case "NewMemberRecruit":
          _this.NewMemberRecruitInfo(params);
          break;
        case "NewMemberNum":
          _this.NewMemberInfo(params);
          break;
        case "FirstConsume":
          _this.FirstConsume(params);
          break;
        case "RechargeAmount":
          _this.RechargeAmount(params);
          break;
        case "Consume":
          _this.Consume(params);
          break;
        case "ConsumptionAmount":
          _this.ConsumptionAmount(params);
          break;
      }
    },
    NewMemberRecruitInfo: function(params) {
      let _this = this;
      NewMemberRecruitInfo(params).then(res => {
        _this.callBackDeal(_this, res);
      });
    },
    NewMemberInfo: function(params) {
      let _this = this;
      NewMemberInfo(params).then(res => {
        _this.callBackDeal(_this, res);
      });
    },
    FirstConsume: function(params) {
      let _this = this;
      FirstConsume(params).then(res => {
        _this.callBackDeal(_this, res);
      });
    },
    RechargeAmount: function(params) {
      let _this = this;
      RechargeAmount(params).then(res => {
        _this.callBackDeal(_this, res);
      });
    },
    Consume: function(params) {
      let _this = this;
      Consume(params).then(res => {
        _this.callBackDeal(_this, res);
      });
    },
    ConsumptionAmount: function(params) {
      let _this = this;
      ConsumptionAmount(params).then(res => {
        _this.callBackDeal(_this, res);
      });
    },
    callBackDeal(that, res) {
      that.total = res.Total;
      if (Math.ceil(that.total / that.rows) == that.page) {
        that.finished = true;
      }
      res.Rows.forEach(element => {
        if (
          that.dataItem.type == "RechargeAmount" ||
          that.dataItem.type == "ConsumptionAmount"
        ) {
          element.MemberAmount += "元";
        } else {
          element.MemberShip += "人";
        }
      });
      if (that.page == 1) that.list = res.Rows;
      else that.list.push(...res.Rows);
      that.loading = false;
      that.isLoading = false;
      // for(let i=0;i<10;i++){
      //   res.Result.Rows.push(res.Result.Rows[0])
      // }
      // that.list.push(...res.Result.Rows);
      // that.list.forEach(element => {
      //   if(that.dataItem.type == 'RechargeAmount' || that.dataItem.type == 'ConsumptionAmount'){
      //     element.MemberAmount += '元';
      //   }else{
      //     element.MemberShip += '人';
      //   }
      // });
      // that.loading = false;
      // if(!res.Result.Rows.length){
      //   that.finished = true;
      // }
    },
    onLoad() {
      this.page++;
      this.getList();
    },
    onRefresh() {
      this.page = 1;
      // this.finished = false;
      this.getList();
    }
  }
};
</script>
<style scoped>
#new_member .top_style {
  padding: 30px 16px 22px;
}
#new_member .mt-20{
  margin-top: 36px;
}
#new_member .container{
  padding: 0;
}
.van-list .van-cell{
  padding: 0.26667rem 20px;
}
</style>
