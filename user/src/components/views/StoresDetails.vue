<template>
  <div class="content">
    <!-- <van-nav-bar title="门店消费记录" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list :offset="0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="container" v-for="(item,index) in list" :key="index">
          <van-cell-group class="goods-cell-group">
            <van-cell value="详情" title="门店消费" icon="shop-o" is-link :to="'/ConsumptionDetails/'+item.Id" />
          </van-cell-group>
          <van-cell-group class="goods-cell-group">
            <van-cell title="交易金额" :value="item.PayAmount+'元'" />
            <van-cell title="交易状态" :value="item.TransactionState==0?'交易成功':'交易失败'"
                      :value-class="item.TransactionState==0?'c-success':'c-red'" />
            <van-cell title="交易门店" :value="item.OrganizationName" />
            <van-cell title="交易时间" :value="item.CreatorTime" />
            <van-cell title="交易流水号" :value="item.ReceiptCode" />
            <van-cell title="POS单号" :value="item.OrderCode" />
          </van-cell-group>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
  import { getExpendRecord } from '../../api/hy'
export default {
  data() {
    return {
      page: 0,
      rows: 10,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  methods: {
    getList() {
      getExpendRecord({
        Id: this.$route.params.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.isLoading = false;
        this.loading = false;
        if(res.Code == 0){
          this.total = res.Total
          if(this.page === 1) this.list = res.Rows
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
<style>
.container .van-cell__value {
  overflow: initial;
}
</style>
