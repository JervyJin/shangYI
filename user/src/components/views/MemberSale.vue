<template>
  <div class="content">
    <!-- <van-nav-bar title="会员销售" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar> -->
    <van-tabs v-model="active">
      <van-tab title="今日">
        <div class="starall">
          <!--今日面板-->
          <div class="starall_child">
            <div class="top_style">
              <p>会员销售</p>
              <p class="mt-40">
                <span>
                  <b class="mr-5 f-20">{{today.SaleTotal}}</b>接待金额
                </span>
                <span class="ml-10">
                  <b class="mr-5 f-20">{{today.PromoterCount}}</b>促销员
                </span>
              </p>
            </div>
            <van-cell
              :title="selectValue"
              value="筛选"
              value-class="c-333"
              class="border-bottom"
              @click="screening"
            >
              <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
            </van-cell>
            <div class="container">
              <div>
                <div class="listflex" v-for="(item,index) in todayGetPromoterInfoList" :key="index"
                     :title="item.PromoterId" @click="detailPage($event)"><span>{{item.PromoterName||"无"}}</span><span
                  class="c-999">{{item.SaleAmount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="上周">
        <div class="starall">
          <!--上周-->
          <div class="starall_child">
            <div class="top_style">
              <p>会员销售</p>
              <p class="mt-40">
								<span>
									<b class="mr-5 f-20">{{lastweek.SaleTotal}}</b>接待金额
								</span>
                <span class="ml-10">
									<b class="mr-5 f-20">{{lastweek.PromoterCount}}</b>促销员
								</span>
              </p>
            </div>
            <van-cell
              :title="selectValue"
              value="筛选"
              value-class="c-333"
              class="border-bottom"
              @click="screening"
            >
              <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
            </van-cell>
            <div class="container">
              <div>
                <div class="listflex" v-for="(item,index) in lastweekGetPromoterInfoList" :key="index"
                     :title="item.PromoterId" @click="detailPage($event)"><span>{{item.PromoterName||"无"}}</span><span
                  class="c-999">{{item.SaleAmount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="本月">
        <div class="starall">
          <!--本月-->
          <div class="starall_child">
            <div class="top_style">
              <p>会员销售</p>
              <p class="mt-40">
          			<span>
          				<b class="mr-5 f-20">{{lastmonth.SaleTotal}}</b>接待金额
          			</span>
                <span class="ml-10">
          				<b class="mr-5 f-20">{{lastmonth.PromoterCount}}</b>促销员
          			</span>
              </p>
            </div>
            <van-cell
              :title="selectValue"
              value="筛选"
              value-class="c-333"
              class="border-bottom"
              @click="screening"
            >
              <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
            </van-cell>
            <div class="container">
              <div>
                <div class="listflex" v-for="(item,index) in lastmonthGetPromoterInfoList" :key="index"
                     :title="item.PromoterId" @click="detailPage($event)"><span>{{item.PromoterName||"无"}}</span><span
                  class="c-999">{{item.SaleAmount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="三个月">
        <div class="starall">
          <!--三个月-->
          <div class="starall_child">
            <div class="top_style">
              <p>会员销售</p>
              <p class="mt-40">
          			<span>
          				<b class="mr-5 f-20">{{lastthreemonth.SaleTotal}}</b>接待金额
          			</span>
                <span class="ml-10">
          				<b class="mr-5 f-20">{{lastthreemonth.PromoterCount}}</b>促销员
          			</span>
              </p>
            </div>
            <van-cell
              :title="selectValue"
              value="筛选"
              value-class="c-333"
              class="border-bottom"
              @click="screening"
            >
              <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
            </van-cell>
            <div class="container">
              <div>
                <div class="listflex" v-for="(item,index) in lastthreemonthGetPromoterInfoList" :key="index"
                     :title="item.PromoterId" @click="detailPage($event)"><span>{{item.PromoterName||"无"}}</span><span
                  class="c-999">{{item.SaleAmount}}</span>
                </div>
              </div>
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
          :columns="PromoterList"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
    import {parseTime, pickerOptions} from "@/utils/index";
    import dayjs from 'dayjs';
    import {
        GetPromoterCountInfo,
        GetPromoterInfo,
        GetMyCustomersCount,
        GetMyCustomers,
        GetMyMemberCount,
        GetMyMember,
        GetMyMemberInfo
    } from "@/api/saleReport";

    export default {
        data() {
            return {
                active: 0,
                activeName: 0,
                value: 5,
                showPicker: false,
                PromoterList: [],
                currentPromoterId: "",
                today: {
                    PromoterCount: "",
                    SaleTotal: "",
                },
                todayGetPromoterInfoList: [],
                lastweek: {
                    PromoterCount: "",
                    SaleTotal: "",
                },
                lastweekGetPromoterInfoList: [],
                lastmonth: {
                    PromoterCount: "",
                    SaleTotal: "",
                },
                lastmonthGetPromoterInfoList: [],
                lastthreemonth: {
                    PromoterCount: "",
                    SaleTotal: "",
                },
                lastthreemonthGetPromoterInfoList: [],
                cxyId: '',
                selectValue: '促销员'
            };
        },
        methods: {

            screening() {
                this.showPicker = true;
            },
            onConfirm(value, index) {
                this.showPicker = false;
                //获取会员信息
                GetMyMemberInfo().then(res => {
                  if(res.Code == 0){
                    this.currentPromoterId = res.Data[index].PromoterId;
                    this.cxyId = res.Data[index].PromoterId
                    this.selectValue = value;
                    if (this.cxyId) {
                        if (this.active === 0) this.init();
                        else if (this.active === 1) this.getlastweek();
                        else if (this.active === 2) this.month();
                        else if (this.active === 3) this.threemonth();
                    }
                  }
                });


            },
            init() {

                let obj = new Date();
                obj.setTime(obj.getTime());
                // 筛选促销员人数
                let todayDate = obj.getFullYear() + "-" + (obj.getMonth() + 1) + "-" + obj.getDate();
                let GetPromoterCountInfoParams = {"StartDate": todayDate, "EndDate": todayDate};
                GetPromoterCountInfo(GetPromoterCountInfoParams).then(res => {
                  if(res.Code == 0){
                    this.today.PromoterCount = res.Data.PromoterCount;
                    this.today.SaleTotal = res.Data.SaleTotal;
                  }
                });
                //获取会员信息
                GetMyMemberInfo().then(res => {
                  if(res.Code == 0){
                    let list = res.Data;
                    let newlist = list.map(function (num, index, arr) {
                        // console.log('arr',arr);
                        // console.log('index',index);
                        // console.log('num',num);
                        return list[index].PromoterName;
                    })
                    this.PromoterList = newlist;
                  }
                });
                // 筛选促销员人数
                let pageNum = 1;
                let GetPromoterInfoParams = {
                    "SalerUserId": this.cxyId,
                    "StartDate": todayDate,
                    "EndDate": todayDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetPromoterInfo(GetPromoterInfoParams).then(res => {
                  if(res.Code == 0){
                    this.todayGetPromoterInfoList = res.Rows;
                  }
                });
            },
            getlastweek: function () {
                var endDate = dayjs().endOf("week").add(-6, 'day');
                var end = endDate.format("YYYY-MM-DD");
                var start = endDate.add(-6, 'day').format("YYYY-MM-DD");
                //var start = endDate.startOf("week").format("YYYY-MM-DD");
                let GetPromoterCountInfoParams = {"StartDate": start, "EndDate": end};
                GetPromoterCountInfo(GetPromoterCountInfoParams).then(res => {
                    this.lastweek.PromoterCount = res.Data.PromoterCount;
                    this.lastweek.SaleTotal = res.Data.SaleTotal;
                });
                let pageNum = 1;
                let GetPromoterInfoParams = {
                    "SalerUserId": this.cxyId,
                    "StartDate": start,
                    "EndDate": end,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetPromoterInfo(GetPromoterInfoParams).then(res => {
                  if(res.Code == 0){
                    this.lastweekGetPromoterInfoList = res.Rows;
                  }
                });

            },
            month() {
                let obj = new Date();
                obj.setTime(obj.getTime());
                // 筛选促销员人数
                //let todayMonth = obj.getMonth()+1;
                let StartDate = dayjs().startOf('month').format("YYYY-MM-DD");
                let EndDate = dayjs().endOf('month').format("YYYY-MM-DD");
                let GetPromoterCountInfoParams = {"StartDate": StartDate, "EndDate": EndDate};
                GetPromoterCountInfo(GetPromoterCountInfoParams).then(res => {
                    this.lastmonth.PromoterCount = res.Data.PromoterCount;
                    this.lastmonth.SaleTotal = res.Data.SaleTotal;
                });
                let pageNum = 1;
                let GetPromoterInfoParams = {
                    "SalerUserId": this.cxyId,
                    "StartDate": StartDate,
                    "EndDate": EndDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetPromoterInfo(GetPromoterInfoParams).then(res => {
                  if(res.Code == 0){
                    this.lastmonthGetPromoterInfoList = res.Rows;
                  }
                });
            },
            threemonth() {
                let obj = new Date();
                obj.setTime(obj.getTime());
                // 筛选促销员人数
                //let todayMonth = obj.getMonth()+1;
                let StartDate = dayjs().add(-2, 'month').startOf('month').format("YYYY-MM-DD");
                let EndDate = dayjs().endOf('month').format("YYYY-MM-DD");
                let GetPromoterCountInfoParams = {"StartDate": StartDate, "EndDate": EndDate};
                GetPromoterCountInfo(GetPromoterCountInfoParams).then(res => {
                  if(res.Code == 0){
                    this.lastthreemonth.PromoterCount = res.Data.PromoterCount;
                    this.lastthreemonth.SaleTotal = res.Data.SaleTotal;
                  }
                });
                let pageNum = 1;
                let GetPromoterInfoParams = {
                    "SalerUserId": this.cxyId,
                    "StartDate": StartDate,
                    "EndDate": EndDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetPromoterInfo(GetPromoterInfoParams).then(res => {
                  if(res.Code == 0){
                    this.lastthreemonthGetPromoterInfoList = res.Rows;
                  }
                });
            },
            detailPage(e) {
                let PromoterId = e.currentTarget.getAttribute('title');
                if (PromoterId) {
                    localStorage.setItem("PromoterId", PromoterId);
                    this.$router.push({path: "/MemberSaleDetails"});
                }
            }
        },
        mounted() {
            this.init();
            this.getlastweek();
            this.month();
            this.threemonth();
        },
    };
</script>
<style scoped>
  .starall {
    background-color: #fff;
    margin-top: 0px;
    padding-top: 1px;
  }
  .van-tab .van-ellipsis{
    color: #999;
  }

  .listflex {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    height: 1.2rem;
    line-height: 1.2rem;
  }

  .listflex span {
    line-hight: 1.2rem;
    font-size: 14px;
  }

  .container {
    box-shadow: none;
  }

  .listflex:last-child {
    border-bottom: none;
  }
</style>
