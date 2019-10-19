<template>
  <div class="content">
    <van-nav-bar title="商户销售详情" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>

    <!--  -->
    <div class="starall">
      <div class="top_style">
        <p>商户销售详情</p>
        <p class="mt-20">
          <span>
            <i slot="right-icon" class="f-16 iconfont">&#xe616;</i>
            <b class="ml-5 f-14">{{$route.query.name}}</b>
          </span>
          <span class="ml-10">
            <i slot="right-icon" class="f-16 iconfont">&#xe670;</i>
            <b class="ml-5 f-14">{{$route.query.money}}元</b>
          </span>
        </p>
      </div>
      <div class="container">
        <van-cell-group>
          <van-cell
            :title="shName"
            value="筛选"
            value-class="c-333"
            class="border-bottom"
            @click="screening"
          >
            <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
          </van-cell>
        </van-cell-group>
        <van-row class="c-999 mt-10 f-14">
          <van-col span="8" class="text-l">商品</van-col>
          <van-col span="8" class="text-c">数量</van-col>
          <van-col span="8" class="text-r">金额小计</van-col>
        </van-row>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list :offset="0" v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row class="user-links f-14" v-for="(item, index) in list" :key="index">
              <van-col span="8" class="text-l">{{item.GoodName}}</van-col>
              <van-col span="8" class="text-c">{{item.GoodNum}}</van-col>
              <van-col span="8" class="text-r">{{item.AmountTotal}}元</van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
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
  import { getMerchantByUser, getMerchantSaleInfo } from '../../api/hy'
export default {
  data() {
    return {
      active: 0,
      activeName: 0,
      value: 5,
      showPicker: false,
      columns: [],
      page: 1,
      rows: 15,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      id: '',
      shId: '',
      shList: [],
      shName: ''
    };
  },
  methods: {
    screening() {
      this.showPicker = true;
    },
    onConfirm(obj) {
      this.showPicker = false;
      this.shId = obj.value
      this.shName = obj.text
      this.getMerchantSaleInfo()
    },
    getMerchantByUser() {
      getMerchantByUser(this.$route.query.mId).then(res => {
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
    getMerchantSaleInfo() {
      getMerchantSaleInfo({
        MerchantId: this.$route.query.id,
        OrganizationId: this.shId,
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.isLoading = false;
        this.loading = false;
        if(res.Code == 0){
          this.total = res.Total
          if(this.page == 1) this.list = res.Rows
          else this.list.push(...res.Rows)
          if(this.list.length === 0 || Math.ceil(this.total / this.rows) == this.page) {
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
      this.getMerchantSaleInfo()
    },
    onRefresh() {
      this.page = 1;
      this.getMerchantSaleInfo()
    }
  },
  created() {
    this.getMerchantByUser()
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
  height: 35px;
  line-height: 35px;
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
.van-picker__cancel{
    color: #999;
}
</style>
