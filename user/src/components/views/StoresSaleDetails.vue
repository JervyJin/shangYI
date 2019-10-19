<template>
  <div class="content">
    <van-nav-bar title="门店销售详情" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>

    <!--  -->
    <div class="starall">
      <div class="top_style">
        <p>门店销售明细</p>
        <p class="mt-40">
          <span>
            <i slot="right-icon" class="f-16 iconfont">&#xe616;</i>
            <b class=" f-18">{{$route.params.name}}</b>
          </span>
          <span class="ml-10">
            <i slot="right-icon" class="f-16 iconfont">&#xe697;</i>
            <b class=" f-18">{{$route.params.money}}元</b>
          </span>
        </p>
      </div>
      <div class="container">
        <!-- <van-row class="c-999 mt-10 f-14">
          <van-col span="6" class="text-l">订单</van-col>
          <van-col span="6" class="text-c">数量</van-col>
          <van-col span="6" class="text-c">会员</van-col>
          <van-col span="6" class="text-r">金额</van-col>
        </van-row> -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list :offset="0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row class="user-links" v-for="(item, index) in list" :key="index">
              <!-- <van-col span="6" class="t-o text-l">{{item.OrderNo}}</van-col>
              <van-col span="6" class="text-c">{{item.Num}}</van-col>
              <van-col span="6" class="text-c">{{item.MemberName}}</van-col>
              <van-col span="6" class="text-r">{{item.PayAmount}}元</van-col> -->
              <van-col span="12" class="text-l">{{item.MemberName}}</van-col>
              <van-col span="12" class="text-r">{{item.PayAmount}}元</van-col>
              <van-col span="14" class="t-o text-l t-b-m">{{item.OrderNo}}</van-col>
              <van-col span="10" class="text-r t-b-m">{{item.OrderTime}}</van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
  import { getStoreSaleInfo } from '../../api/hy'
export default {
  data() {
    return {
      page: 0,
      rows: 15,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  methods: {
    getList() {
      getStoreSaleInfo({
        page: this.page,
        rows: this.rows,
        OrganizationId: this.$route.params.id
      }).then(res => {
        this.isLoading = false;
        this.loading = false;
        if(res.Code == 0){
          this.total = res.Total
          if(this.page == 1) this.list = res.Rows
          else this.list.push(...res.Rows)
          if(this.list.length === 0 || Math.ceil(this.total / this.rows) === this.page) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        }else{
          this.finished = true;
        }
      })
    },
    onLoad() {
      this.page ++;
      this.getList()
    },
    onRefresh() {
      this.page = 1;
      this.getList()
    }
  }
};
</script>
<style scoped>
.starall {
  background-color: #fff;
  margin-top: 10px;
  padding-top: 1px;
}
.user-links {
  height: 50px;
  padding-top: 6px;
  line-height: 1;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
.user-links div{
  line-height: 20px;
}
</style>
<style>
.van-picker .van-picker__toolbar {
  border-bottom: 1px solid #dfdfdf;
}
.van-picker-column__item {
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}
.van-picker__cancel {
  color: #999;
}
  .t-o {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .t-b-m{
    font-size: 0.3rem;
    color: #888888;
  }
</style>
