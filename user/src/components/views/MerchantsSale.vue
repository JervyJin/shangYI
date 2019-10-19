<template>
  <div class="content">
    <van-nav-bar title="商户销售" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs v-model="active" @click="Today">
      <van-tab v-for="(item, index) in types" :key="index" :title="item" :name="item">
        <div class="starall">
          <div class="starall_child">
            <div class="top_style">
              <p>商户销售</p>
              <p class="mt-20">
                <span>
                  <b class="mr-5 f-20">{{saleInfo.SaleAmount}}</b>销售金额
                </span>
                <span class="ml-10">
                  <b class="mr-5 f-20">{{saleInfo.OrderCount}}</b>订单数
                </span>
                <span class="ml-10">
                  <b class="mr-5 f-20">{{saleInfo.ConsumpNum}}</b>消费人数
                </span>
              </p>
            </div>
            <div class="container">
              <van-cell-group class="xs-sx">
                <van-cell
                  :title="shName"
                  value="筛选"
                  value-class="c-333"
                  class="border-bottom"
                  @click="screening"
                >
                  <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
                </van-cell>
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                  <van-list :offset="0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <van-cell v-for="(item, index) in list" :key="index"
                      :title="item.MerchantName"
                      :value="item.SaleAmount+'元'"
                      class="border-bottom" @click="goToDetail(item)"
                    />
                  </van-list>
                </van-pull-refresh>
              </van-cell-group>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 筛选 -->
    <div>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import { parseTime, pickerOptions } from "@/utils/index";
import { getMerchantSaleCount, getMerchantByUser, getMerchantSale } from '../../api/hy'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      active: '今日',
      activeName: 0,
      value: 5,
      showPicker: false,
      columns: [],
      types: ['今日', '上周', '本月', '三个月'],
      saleInfo: {},
      page: 0,
      rows: 10,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      id: '',
      shId: '',
      shList: [],
      shName: '',
      start: dayjs().format("YYYY-MM-DD"),
      end:dayjs().format("YYYY-MM-DD")
    };
  },
  methods: {
    Today(name, title) {
      if (title == "今日") {
        this.start = dayjs().format("YYYY-MM-DD")
        this.end =  dayjs().format("YYYY-MM-DD")
        this.getMerchantSaleCount()
        this.getMerchantSale()
      } else if (title == "上周") {
        var endDate=dayjs().endOf("week").add(-6, 'day');
        var end=endDate.format("YYYY-MM-DD");
        var start = endDate.add(-6, 'day').format("YYYY-MM-DD");
        this.start = start;
        this.end = end;
        this.getMerchantSaleCount()
        this.getMerchantSale()
      } else if (title == "本月") {
        this.start =  dayjs().startOf('month').format("YYYY-MM-DD")
        this.end =  dayjs().endOf('month').format("YYYY-MM-DD")
        this.getMerchantSaleCount()
        this.getMerchantSale()
      } else if (title == "三个月") {
        this.start =  dayjs().add(-2, 'month').startOf('month').format("YYYY-MM-DD")
        this.end =  dayjs().endOf('month').format("YYYY-MM-DD")
        this.getMerchantSaleCount()
        this.getMerchantSale()
      }
    },
    screening() {
      this.showPicker = true;
    },
    onConfirm(obj) {
      this.showPicker = false;
      this.shId = obj.value
      this.shName = obj.text
      this.getMerchantSale()
    },
    getMerchantSaleCount() {
      getMerchantSaleCount({
        StartTime: this.start,
        EndTime: this.end
      }).then(res => {
        if(res.Data&&res.Code == 0) this.saleInfo = res.Data
      })
    },
    getMerchantByUser() {
      getMerchantByUser(localStorage.getItem("UserId")).then(res => {
        if(res.Data.length>0 && res.Code == 0) {
          res.Data.map(item => {
            this.columns.push({
              text: item.Name,
              value: item.Id
            })
          })
        }
      })
    },
    getMerchantSale() {
      getMerchantSale({
        MerchantId: this.shId,
        StartDate: this.start,
        EndDate: this.end,
        page: this.page,
        rows: this.rows
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
      this.getMerchantSale()
    },
    onRefresh() {
      this.page = 1;
      this.getMerchantSale()
    },
    goToDetail(item) {
      this.$router.push({
        path: '/MerchantsSaleDetails',
        query: {
          id: this.id,
          name: item.MerchantName,
          money: item.SaleAmount,
          mId: item.MerchantId
        }
      })
    }
  },
  created() {
    this.getMerchantSaleCount()
    this.getMerchantByUser()
  }
};
</script>
<style scoped>
.starall {
  background-color: #fff;
  margin-top: 0px;
  padding-top: 1px;
}
</style>
