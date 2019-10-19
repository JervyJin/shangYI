<template>
  <div class="content">
    <van-nav-bar title="会员销售详情" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>

    <van-tabs class="tabsAll ">
      <van-tab class="my_member" title="我的会员">
        <div>
          <van-tabs v-model="active" class="tabschild">
            <van-tab title="今日">
              <div class="starall">
                <!-- 今日 -->
                <div class="starall_child">
                  <div class="top_style">
                    <p>我的会员</p>
                    <p class="mt-20">
                        <span>
                          <b class="mr-5 f-20">{{today.SaleTotal}}</b>销售金额
                        </span>
                      <span class="ml-10">
                          <b class="mr-5 f-20">{{today.PromoterCount}}</b>促销员
                        </span>
                    </p>
                  </div>
                  <div class="container">
                    <van-row class="border-bottom pb-5 pt-5" v-for="(item,index) in todayGetMyMemberList" :key="index">
                      <van-col span="9" class="text-l">
                        <p>{{item.MemberName}} {{item.MemberPhone}}</p>
                        <span class="c-999 f-12">消费次数：{{item.ConsumpNumber}}</span>
                      </van-col>
                      <van-col span="15" class="text-r">
                        <p>{{item.ConsumpAmount}}元</p>
                        <span class="c-999 f-12">最后消费时间：{{item.MaxConsumpTime}}</span>
                      </van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title="上周">
              <div class="starall">
                <!-- 上周 -->
                <div class="starall_child">
                  <div class="top_style">
                    <p>我的会员</p>
                    <p class="mt-20">
                        <span>
                          <b class="mr-5 f-20">{{lastweek.SaleTotal}}</b>销售金额
                        </span>
                      <span class="ml-10">
                          <b class="mr-5 f-20">{{lastweek.PromoterCount}}</b>促销员
                        </span>
                    </p>
                  </div>
                  <div class="container">
                    <van-row class="border-bottom pb-5 pt-5" v-for="(item,index) in lastweekGetMyMemberList"
                             :key="index">
                      <van-col span="9" class="text-l">
                        <p>{{item.MemberName}} {{item.MemberPhone}}</p>
                        <span class="c-999 f-12">消费次数：{{item.ConsumpNumber}}</span>
                      </van-col>
                      <van-col span="15" class="text-r">
                        <p>{{item.ConsumpAmount}}元</p>
                        <span class="c-999 f-12">最后消费时间：{{item.MaxConsumpTime}}</span>
                      </van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title="本月">
              <div class="starall">
                <!-- 本月 -->
                <div class="starall_child">
                  <div class="top_style">
                    <p>我的会员</p>
                    <p class="mt-20">
                        <span>
                          <b class="mr-5 f-20">{{lastmonth.SaleTotal}}</b>销售金额
                        </span>
                      <span class="ml-10">
                          <b class="mr-5 f-20">{{lastmonth.PromoterCount}}</b>促销员
                        </span>
                    </p>
                  </div>
                  <div class="container">
                    <van-row class="border-bottom pb-5 pt-5" v-for="(item,index) in lastmonthGetMyMemberList"
                             :key="index">
                      <van-col span="9" class="text-l">
                        <p>{{item.MemberName}} {{item.MemberPhone}}</p>
                        <span class="c-999 f-12">消费次数：{{item.ConsumpNumber}}</span>
                      </van-col>
                      <van-col span="15" class="text-r">
                        <p>{{item.ConsumpAmount}}元</p>
                        <span class="c-999 f-12">最后消费时间：{{item.MaxConsumpTime}}</span>
                      </van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title="三个月">
              <div class="starall">
                <!-- 三个月 -->
                <div class="starall_child">
                  <div class="top_style">
                    <p>我的会员</p>
                    <p class="mt-20">
                        <span>
                          <b class="mr-5 f-20">{{lastthreemonth.SaleTotal}}</b>销售金额
                        </span>
                      <span class="ml-10">
                          <b class="mr-5 f-20">{{lastthreemonth.PromoterCount}}</b>促销员
                        </span>
                    </p>
                  </div>
                  <div class="container">
                    <van-row class="border-bottom pb-5 pt-5" v-for="(item,index) in lastthreemonthGetMyMemberList"
                             :key="index">
                      <van-col span="9" class="text-l">
                        <p>{{item.MemberName}} {{item.MemberPhone}}</p>
                        <span class="c-999 f-12">消费次数：{{item.ConsumpNumber}}</span>
                      </van-col>
                      <van-col span="15" class="text-r">
                        <p>{{item.ConsumpAmount}}元</p>
                        <span class="c-999 f-12">最后消费时间：{{item.MaxConsumpTime}}</span>
                      </van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </van-tab>
      <van-tab title="我的顾客">
        <div>
          <van-tabs v-model="active" class="tabschild">
            <van-tab title="今日">
              <div class="starall">
                <!--今日-->
                <div class="starall_child">
                  <div class="top_style">
                    <p>促销员</p>
                    <p class="mt-20">
                      <span>
                        <b class="mr-5 f-20">{{gtoday.SaleAmount}}</b>销售金额
                      </span>
                      <span class="ml-10">
                        <b class="mr-5 f-20">{{gtoday.OrderCount}}</b>订单数
                      </span>
                    </p>
                  </div>
                  <div class="container">
                    <!-- <van-cell-group>
                      <van-cell
                        title="会员01"
                        value="筛选"
                        value-class="c-333"
                        class="border-bottom"
                        @click="screening"
                      >
                        <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
                      </van-cell>
                    </van-cell-group> -->
                    <!-- <van-row class="c-999 mt-10 f-14">
                      <van-col span="8" class="text-l">订单号</van-col>
                      <van-col span="8" class="text-c">会员</van-col>
                      <van-col span="8" class="text-r">消费金额</van-col>
                    </van-row> -->
                    <div>
                      <van-row class="user-links f-14" v-for="(item,index) in gtodayGetMyMemberList" :key="index">
                        <!-- <van-col span="8" class="text-l t-o">{{item.OrderCode}}</van-col>
                        <van-col span="8" class="text-c">{{item.MemberName}}</van-col>
                        <van-col span="8" class="text-r">{{item.PayAmount}}元</van-col> -->
                        <van-col span="12" class="text-l">{{item.MemberName}}</van-col>
                        <van-col span="12" class="text-r">{{item.PayAmount}}元</van-col>
                        <van-col span="14" class="t-o text-l t-b-m">{{item.OrderCode}}</van-col>
                        <van-col span="10" class="text-r t-b-m">{{item.OrderTime}}</van-col>
                      </van-row>
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
                    <p>促销员</p>
                    <p class="mt-20">
                      <span>
                        <b class="mr-5 f-20">{{glastweek.SaleAmount}}</b>销售金额
                      </span>
                      <span class="ml-10">
                        <b class="mr-5 f-20">{{glastweek.OrderCount}}</b>订单数
                      </span>
                    </p>
                  </div>
                  <div class="container">
                    <!-- <van-cell-group>
                      <van-cell
                        title="会员01"
                        value="筛选"
                        value-class="c-333"
                        class="border-bottom"
                        @click="screening"
                      >
                        <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
                      </van-cell>
                    </van-cell-group> -->
                    <!-- <van-row class="c-999 mt-10 f-14">
                      <van-col span="8" class="text-l">订单号</van-col>
                      <van-col span="8" class="text-c">会员</van-col>
                      <van-col span="8" class="text-r">消费金额</van-col>
                    </van-row> -->
                    <div>
                      <van-row class="user-links f-14" v-for="(item,index) in glastweekGetMyMemberList" :key="index">
                        <!-- <van-col span="8" class="text-l t-o">{{item.OrderCode}}</van-col>
                        <van-col span="8" class="text-c">{{item.MemberName}}</van-col>
                        <van-col span="8" class="text-r">{{item.PayAmount}}元</van-col> -->
                        <van-col span="12" class="text-l">{{item.MemberName}}</van-col>
                        <van-col span="12" class="text-r">{{item.PayAmount}}元</van-col>
                        <van-col span="14" class="t-o text-l t-b-m">{{item.OrderCode}}</van-col>
                        <van-col span="10" class="text-r t-b-m">{{item.OrderTime}}</van-col>
                      </van-row>
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
                    <p>促销员</p>
                    <p class="mt-20">
                      <span>
                        <b class="mr-5 f-20">{{glastmonth.SaleAmount}}</b>销售金额
                      </span>
                      <span class="ml-10">
                        <b class="mr-5 f-20">{{glastmonth.OrderCount}}</b>订单数
                      </span>
                    </p>
                  </div>
                  <div class="container">
                    <!-- <van-cell-group>
                      <van-cell
                        title="会员01"
                        value="筛选"
                        value-class="c-333"
                        class="border-bottom"
                        @click="screening"
                      >
                        <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
                      </van-cell>
                    </van-cell-group> -->
                    <!-- <van-row class="c-999 mt-10 f-14">
                      <van-col span="8" class="text-l">订单号</van-col>
                      <van-col span="8" class="text-c">会员</van-col>
                      <van-col span="8" class="text-r">消费金额</van-col>
                    </van-row> -->
                    <div>
                      <van-row class="user-links f-14" v-for="(item,index) in glastmonthGetMyMemberList" :key="index">
                        <!-- <van-col span="8" class="text-l t-o">{{item.OrderCode}}</van-col>
                        <van-col span="8" class="text-c">{{item.MemberName}}</van-col>
                        <van-col span="8" class="text-r">{{item.PayAmount}}元</van-col> -->
                        <van-col span="12" class="text-l">{{item.MemberName}}</van-col>
                        <van-col span="12" class="text-r">{{item.PayAmount}}元</van-col>
                        <van-col span="14" class="t-o text-l t-b-m">{{item.OrderCode}}</van-col>
                        <van-col span="10" class="text-r t-b-m">{{item.OrderTime}}</van-col>
                      </van-row>
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
                    <p>促销员</p>
                    <p class="mt-20">
                      <span>
                        <b class="mr-5 f-20">{{glastthreemonth.SaleAmount}}</b>销售金额
                      </span>
                      <span class="ml-10">
                        <b class="mr-5 f-20">{{glastthreemonth.OrderCount}}</b>订单数
                      </span>
                    </p>
                  </div>
                  <div class="container">
                    <!-- <van-cell-group>
                      <van-cell
                        title="会员01"
                        value="筛选"
                        value-class="c-333"
                        class="border-bottom"
                        @click="screening"
                      >
                        <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
                      </van-cell>
                    </van-cell-group> -->
                    <!-- <van-row class="c-999 mt-10 f-14">
                      <van-col span="8" class="text-l">订单号</van-col>
                      <van-col span="8" class="text-c">会员</van-col>
                      <van-col span="8" class="text-r">消费金额</van-col>
                    </van-row> -->
                    <div>
                      <van-row class="user-links f-14" v-for="(item,index) in glastthreemonthGetMyMemberList"
                               :key="index">
                        <!-- <van-col span="8" class="text-l t-o">{{item.OrderCode}}</van-col>
                        <van-col span="8" class="text-c">{{item.MemberName}}</van-col>
                        <van-col span="8" class="text-r">{{item.PayAmount}}元</van-col> -->
                        <van-col span="12" class="text-l">{{item.MemberName}}</van-col>
                        <van-col span="12" class="text-r">{{item.PayAmount}}元</van-col>
                        <van-col span="14" class="t-o text-l t-b-m">{{item.OrderCode}}</van-col>
                        <van-col span="10" class="text-r t-b-m">{{item.OrderTime}}</van-col>
                      </van-row>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 筛选 -->
    <div>
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
                currentPromoterId: "",
                today: {
                    PromoterCount: "",
                    SaleTotal: "",
                },
                todayGetMyMemberList: [],
                lastweek: {
                    PromoterCount: "",
                    SaleTotal: "",
                },
                lastweekGetMyMemberList: [],
                lastmonth: {
                    PromoterCount: "",
                    SaleTotal: "",
                },
                lastmonthGetMyMemberList: [],
                lastthreemonth: {
                    PromoterCount: "",
                    SaleTotal: "",
                },
                lastthreemonthGetMyMemberList: [],
                gtoday: {
                    OrderCount: "",
                    SaleAmount: "",
                },
                gtodayGetMyMemberList: [],
                glastweek: {
                    OrderCount: "",
                    SaleAmount: "",
                },
                glastweekGetMyMemberList: [],
                glastmonth: {
                    OrderCount: "",
                    SaleAmount: "",
                },
                glastmonthGetMyMemberList: [],
                glastthreemonth: {
                    OrderCount: "",
                    SaleAmount: "",
                },
                glastthreemonthGetMyMemberList: [],
            };
        },
        methods: {

            screening() {
                this.showPicker = true;
            },
            onConfirm(value, index) {
                this.showPicker = false;
            },
            init() {
                let PromoterId = localStorage.getItem("PromoterId");
                let obj = new Date();
                obj.setTime(obj.getTime());
                // 今日销售金额和促销员
                let todayDate = obj.getFullYear() + "-" + (obj.getMonth() + 1) + "-" + obj.getDate();
                let GetMyMemberCountParams = {"PromoterId": PromoterId, "StartDate": todayDate, "EndDate": todayDate};
                GetMyMemberCount(GetMyMemberCountParams).then(res => {
                  if(res.Code == 0){
                    this.today.PromoterCount = res.Data.PromoterCount;
                    this.today.SaleTotal = res.Data.SaleTotal;
                  }
                });
                // 今日我的会员信息
                let pageNum = 1;
                let GetMyMemberParams = {
                    "PromoterId": PromoterId,
                    "StartDate": todayDate,
                    "EndDate": todayDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetMyMember(GetMyMemberParams).then(res => {
                  if(res.Code == 0){
                    this.todayGetMyMemberList = res.Rows;
                  }
                });
            },
            getlastweek() {
                let PromoterId = localStorage.getItem("PromoterId");
                var endDate = dayjs().endOf("week").add(-6, 'day');
                var end = endDate.format("YYYY-MM-DD");
                var start = endDate.add(-6, 'day').format("YYYY-MM-DD");
                let StartDate = start;
                let EndDate = end;
                // 我的会员上个星期销售金额和促销员
                //let todayDate = obj.getFullYear()+"-" + (obj.getMonth()+1) + "-" + obj.getDate();
                let GetMyMemberCountParams = {"PromoterId": PromoterId, "StartDate": StartDate, "EndDate": EndDate};
                GetMyMemberCount(GetMyMemberCountParams).then(res => {
                  if(res.Code == 0){
                    this.lastweek.PromoterCount = res.Data.PromoterCount;
                    this.lastweek.SaleTotal = res.Data.SaleTotal;
                  }
                });
                // 上个星期我的会员信息
                let pageNum = 1;
                let GetMyMemberParams = {
                    "PromoterId": PromoterId,
                    "StartDate": StartDate,
                    "EndDate": EndDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetMyMember(GetMyMemberParams).then(res => {
                  if(res.Code == 0){
                    this.lastweekGetMyMemberList = res.Rows;
                  }
                });
            },
            month() {
                let PromoterId = localStorage.getItem("PromoterId");
                let obj = new Date();
                obj.setTime(obj.getTime());
                // 筛选促销员人数
                //let todayMonth = obj.getMonth()+1;
                let StartDate = dayjs().startOf('month').format("YYYY-MM-DD");
                let EndDate = dayjs().endOf('month').format("YYYY-MM-DD");
                let GetMyMemberCountParams = {"PromoterId": PromoterId, "StartDate": StartDate, "EndDate": EndDate};
                GetMyMemberCount(GetMyMemberCountParams).then(res => {
                  if(res.Code == 0){
                    this.lastmonth.PromoterCount = res.Data.PromoterCount;
                    this.lastmonth.SaleTotal = res.Data.SaleTotal;
                  }
                });
                let pageNum = 1;
                let GetMyMemberParams = {
                    "PromoterId": PromoterId,
                    "StartDate": StartDate,
                    "EndDate": EndDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetMyMember(GetMyMemberParams).then(res => {
                  if(res.Code == 0){
                    this.lastmonthGetMyMemberList = res.Rows;
                  }
                });
            },
            threemonth() {
                let PromoterId = localStorage.getItem("PromoterId");
                let obj = new Date();
                obj.setTime(obj.getTime());
                // 筛选促销员人数
                //let todayMonth = obj.getMonth()+1;
                let StartDate = dayjs().add(-2, 'month').startOf('month').format("YYYY-MM-DD");
                let EndDate = dayjs().endOf('month').format("YYYY-MM-DD");
                let GetMyMemberCountParams = {"PromoterId": PromoterId, "StartDate": StartDate, "EndDate": EndDate};
                GetMyMemberCount(GetMyMemberCountParams).then(res => {
                  if(res.Code == 0){
                    this.lastthreemonth.PromoterCount = res.Data.PromoterCount;
                    this.lastthreemonth.SaleTotal = res.Data.SaleTotal;
                  }
                });
                let pageNum = 1;
                let GetMyMemberParams = {
                    "PromoterId": PromoterId,
                    "StartDate": StartDate,
                    "EndDate": EndDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetMyMember(GetMyMemberParams).then(res => {
                  if(res.Code == 0){
                    this.lastthreemonthGetMyMemberList = res.Rows;
                  }
                });
            },
            ginit() {
                let PromoterId = localStorage.getItem("PromoterId");
                let obj = new Date();
                obj.setTime(obj.getTime());
                // 今日销售金额和促销员
                let todayDate = obj.getFullYear() + "-" + (obj.getMonth() + 1) + "-" + obj.getDate();
                let GetMyCustomersCountParams = {
                    "PromoterId": PromoterId,
                    "StartDate": todayDate,
                    "EndDate": todayDate
                };
                GetMyCustomersCount(GetMyCustomersCountParams).then(res => {
                  if(res.Code == 0){
                    this.gtoday.OrderCount = res.Data.OrderCount;
                    this.gtoday.SaleAmount = res.Data.SaleAmount;
                  }
                });
                // 今日我的会员信息
                let pageNum = 1;
                let GetMyCustomersParams = {
                    "PromoterId": PromoterId,
                    "StartDate": todayDate,
                    "EndDate": todayDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetMyCustomers(GetMyCustomersParams).then(res => {
                  if(res.Code == 0){
                    this.gtodayGetMyMemberList = res.Rows;
                  }
                });
            },
            ggetlastweek() {
                let PromoterId = localStorage.getItem("PromoterId");
                var endDate = dayjs().endOf("week").add(-6, 'day');
                var end = endDate.format("YYYY-MM-DD");
                var start = endDate.add(-6, 'day').format("YYYY-MM-DD");
                let StartDate = start;
                let EndDate = end;
                // 我的会员上个星期销售金额和促销员
                //let todayDate = obj.getFullYear()+"-" + (obj.getMonth()+1) + "-" + obj.getDate();
                let GetMyCustomersCountParams = {"PromoterId": PromoterId, "StartDate": StartDate, "EndDate": EndDate};
                GetMyCustomersCount(GetMyCustomersCountParams).then(res => {
                  if(res.Code == 0){
                    this.glastweek.OrderCount = res.Data.OrderCount;
                    this.glastweek.SaleAmount = res.Data.SaleAmount;
                  }
                });
                // 上个星期我的会员信息
                let pageNum = 1;
                let GetMyCustomersParams = {
                    "PromoterId": PromoterId,
                    "StartDate": StartDate,
                    "EndDate": EndDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetMyCustomers(GetMyCustomersParams).then(res => {
                  if(res.Code == 0){
                    this.glastweekGetMyMemberList = res.Rows;
                  }
                });
            },
            gmonth() {
                let PromoterId = localStorage.getItem("PromoterId");
                let obj = new Date();
                obj.setTime(obj.getTime());
                // 筛选促销员人数
                //let todayMonth = obj.getMonth()+1;
                let StartDate = dayjs().startOf('month').format("YYYY-MM-DD");
                let EndDate = dayjs().endOf('month').format("YYYY-MM-DD");
                let GetMyCustomersCountParams = {"PromoterId": PromoterId, "StartDate": StartDate, "EndDate": EndDate};
                GetMyCustomersCount(GetMyCustomersCountParams).then(res => {
                  if(res.Code == 0){
                    this.glastmonth.OrderCount = res.Data.OrderCount;
                    this.glastmonth.SaleAmount = res.Data.SaleAmount;
                  }
                });
                let pageNum = 1;
                let GetMyCustomersParams = {
                    "PromoterId": PromoterId,
                    "StartDate": StartDate,
                    "EndDate": EndDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetMyCustomers(GetMyCustomersParams).then(res => {
                  if(res.Code == 0){
                    this.glastmonthGetMyMemberList = res.Rows;
                  }
                });
            },
            gthreemonth() {
                let PromoterId = localStorage.getItem("PromoterId");
                let obj = new Date();
                obj.setTime(obj.getTime());
                // 筛选促销员人数
                //let todayMonth = obj.getMonth()+1;
                let StartDate = dayjs().add(-2, 'month').startOf('month').format("YYYY-MM-DD");
                let EndDate = dayjs().endOf('month').format("YYYY-MM-DD");
                let GetMyCustomersCountParams = {"PromoterId": PromoterId, "StartDate": StartDate, "EndDate": EndDate};
                GetMyCustomersCount(GetMyCustomersCountParams).then(res => {
                  if(res.Code == 0){
                    this.glastthreemonth.OrderCount = res.Data.OrderCount;
                    this.glastthreemonth.SaleAmount = res.Data.SaleAmount;
                  }
                });
                let pageNum = 1;
                let GetMyCustomersParams = {
                    "PromoterId": PromoterId,
                    "StartDate": StartDate,
                    "EndDate": EndDate,
                    "page": pageNum,
                    "rows": "20",
                    "sort": "",
                    "order": ""
                };
                GetMyCustomers(GetMyCustomersParams).then(res => {
                  if(res.Code == 0){
                    this.glastthreemonthGetMyMemberList = res.Rows;
                  }
                });
            },
        },
        mounted() {
            this.init();
            setTimeout(this.getlastweek(), 500);
            setTimeout(this.month(), 700);
            setTimeout(this.threemonth(), 1000);
            this.ginit();
            setTimeout(this.ggetlastweek(), 500);
            setTimeout(this.gmonth(), 700);
            setTimeout(this.gthreemonth(), 1000);
        },
    };
</script>
<style scoped>
  .starall {
    background-color: #fff;
    margin-top: 0px;
    padding-top: 1px;
  }

  .user-links {
    height: 50px;
    padding-top: 8px;
    line-height: 50px;
    border-bottom: 1px solid #f2f2f2;
  }

  .user-links:last-child {
    border-bottom: none;
  }

  .user-links div {
    line-height: 20px;
  }

  >>> .van-row {
    line-height: 1;
    padding-top: 10px;
  }

  >>> .van-tabs__wrap {
    background-color: white;
  }

  >>> .tabschild .van-tabs__wrap {
    background: none;
  }
</style>
<style>
  .tabsAll .van-tabs__nav {
    background-color: #fff;
  }

  .tabsAll .van-tabs__line {
    background-color: #fff;
  }

  .tabsAll .my_member .van-tab--active .van-ellipsis {
    color: #3c6efd;
  }

  .tabsAll .van-ellipsis {
    color: #333;
  }

  .tabschild .van-tabs__nav {
    opacity: 1;
    background: rgba(246, 243, 247, 1);
    box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  }

  .tabschild .van-tab--active {
    color: #000;
  }

  .tabschild .van-ellipsis {
    font-weight: 500;
  }

  .t-o {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t-b-m {
    font-size: 0.3rem;
    color: #888888;
  }
</style>
