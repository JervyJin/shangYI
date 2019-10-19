<template>
  <div class="content" id="ture_page">
    <!-- <van-nav-bar title="拉新转化" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar> -->
    <van-tabs v-model="active" @click="onClick">
      <van-tab title="今日">
        <div class="conall container">
          <ul>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.NewMemberRecruitNum,pageData:0,active:active}}">
              <li>
                <i class="iconfont" style="color:#0579CB">&#xe63e;</i>
                <p>新客招募</p>
                <span>新注册的客户</span>
                <b class="f-18">{{NewMemberRecruitNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.NewMemberNum,pageData:1,active:active}}">
              <li>
                <i class="iconfont" style="color:#5BA1E7">&#xe640;</i>
                <p>新客转化</p>
                <span>新注册并消费的客户</span>
                <b class="f-18">{{NewMemberNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.FirstConsumeCountNum,pageData:2,active:active}}">
              <li>
                <i class="iconfont" style="color:#3C6EFD">&#xe641;</i>
                <p>首次消费会员</p>
                <span>注册后第一次消费的客户</span>
                <b class="f-18">{{FirstConsumeCountNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.RechargeAmountTotalNum,pageData:3,active:active}}">
              <li>
                <i class="iconfont" style="color:#898DE7">&#xe642;</i>
                <p>充值金额</p>
                <span>会员所有的充值金额</span>
                <b class="f-18">{{RechargeAmountTotalNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.ConsumeCountNum,pageData:4,active:active}}">
              <li>
                <i class="iconfont" style="color:#4ACE8C">&#xe64b;</i>
                <p>消费会员</p>
                <span>所有消费的新老客户</span>
                <b class="f-18">{{ConsumeCountNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.ConsumptionAmountTotalNum,pageData:5,active:active}}">
              <li>
                <i class="iconfont" style="color:#FC997E">&#xe64a;</i>
                <p>消费金额</p>
                <span>所有会员消费金额</span>
                <b class="f-18">{{ConsumptionAmountTotalNum}}</b>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
      <van-tab title="昨日">
        <div class="conall container">
          <ul>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.NewMemberRecruitNum,pageData:0,active:active}}">
              <li>
                <i class="iconfont" style="color:#0579CB">&#xe63e;</i>
                <p>新客招募</p>
                <span>新注册的客户</span>
                <b class="f-18">{{NewMemberRecruitNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.NewMemberNum,pageData:1,active:active}}">
              <li>
                <i class="iconfont" style="color:#5BA1E7">&#xe640;</i>
                <p>新客转化</p>
                <span>新注册并消费的客户</span>
                <b class="f-18">{{NewMemberNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.FirstConsumeCountNum,pageData:2,active:active}}">
              <li>
                <i class="iconfont" style="color:#3C6EFD">&#xe641;</i>
                <p>首次消费会员</p>
                <span>注册后第一次消费的客户</span>
                <b class="f-18">{{FirstConsumeCountNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.RechargeAmountTotalNum,pageData:3,active:active}}">
              <li>
                <i class="iconfont" style="color:#898DE7">&#xe642;</i>
                <p>充值金额</p>
                <span>会员所有的充值金额</span>
                <b class="f-18">{{RechargeAmountTotalNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.ConsumeCountNum,pageData:4,active:active}}">
              <li>
                <i class="iconfont" style="color:#4ACE8C">&#xe64b;</i>
                <p>消费会员</p>
                <span>所有消费的新老客户</span>
                <b class="f-18">{{ConsumeCountNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.ConsumptionAmountTotalNum,pageData:5,active:active}}">
              <li>
                <i class="iconfont" style="color:#FC997E">&#xe64a;</i>
                <p>消费金额</p>
                <span>所有会员消费金额</span>
                <b class="f-18">{{ConsumptionAmountTotalNum}}</b>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
      <!--  -->
      <van-tab title="本周">
        <div class="conall container">
          <ul>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.NewMemberRecruitNum,pageData:0,active:active}}">
              <li>
                <i class="iconfont" style="color:#0579CB">&#xe63e;</i>
                <p>新客招募</p>
                <span>新注册的客户</span>
                <b class="f-18">{{NewMemberRecruitNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.NewMemberNum,pageData:1,active:active}}">
              <li>
                <i class="iconfont" style="color:#5BA1E7">&#xe640;</i>
                <p>新客转化</p>
                <span>新注册并消费的客户</span>
                <b class="f-18">{{NewMemberNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.FirstConsumeCountNum,pageData:2,active:active}}">
              <li>
                <i class="iconfont" style="color:#3C6EFD">&#xe641;</i>
                <p>首次消费会员</p>
                <span>注册后第一次消费的客户</span>
                <b class="f-18">{{FirstConsumeCountNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.RechargeAmountTotalNum,pageData:3,active:active}}">
              <li>
                <i class="iconfont" style="color:#898DE7">&#xe642;</i>
                <p>充值金额</p>
                <span>会员所有的充值金额</span>
                <b class="f-18">{{RechargeAmountTotalNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.ConsumeCountNum,pageData:4,active:active}}">
              <li>
                <i class="iconfont" style="color:#4ACE8C">&#xe64b;</i>
                <p>消费会员</p>
                <span>所有消费的新老客户</span>
                <b class="f-18">{{ConsumeCountNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.ConsumptionAmountTotalNum,pageData:5,active:active}}">
              <li>
                <i class="iconfont" style="color:#FC997E">&#xe64a;</i>
                <p>消费金额</p>
                <span>所有会员消费金额</span>
                <b class="f-18">{{ConsumptionAmountTotalNum}}</b>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
      <van-tab title="本月">
        <div class="conall container">
          <ul>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.NewMemberRecruitNum,pageData:0,active:active}}">
              <li>
                <i class="iconfont" style="color:#0579CB">&#xe63e;</i>
                <p>新客招募</p>
                <span>新注册的客户</span>
                <b class="f-18">{{NewMemberRecruitNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.NewMemberNum,pageData:1,active:active}}">
              <li>
                <i class="iconfont" style="color:#5BA1E7">&#xe640;</i>
                <p>新客转化</p>
                <span>新注册并消费的客户</span>
                <b class="f-18">{{NewMemberNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.FirstConsumeCountNum,pageData:2,active:active}}">
              <li>
                <i class="iconfont" style="color:#3C6EFD">&#xe641;</i>
                <p>首次消费会员</p>
                <span>注册后第一次消费的客户</span>
                <b class="f-18">{{FirstConsumeCountNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.RechargeAmountTotalNum,pageData:3,active:active}}">
              <li>
                <i class="iconfont" style="color:#898DE7">&#xe642;</i>
                <p>充值金额</p>
                <span>会员所有的充值金额</span>
                <b class="f-18">{{RechargeAmountTotalNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.ConsumeCountNum,pageData:4,active:active}}">
              <li>
                <i class="iconfont" style="color:#4ACE8C">&#xe64b;</i>
                <p>消费会员</p>
                <span>所有消费的新老客户</span>
                <b class="f-18">{{ConsumeCountNum}}</b>
              </li>
            </router-link>
            <router-link
              :to="{name:'NewMenberList',path:'/NewMenberList',params:{StartDate:this.StartDate,EndDate:this.EndDate,num:this.ConsumptionAmountTotalNum,pageData:5,active:active}}">
              <li>
                <i class="iconfont" style="color:#FC997E">&#xe64a;</i>
                <p>消费金额</p>
                <span>所有会员消费金额</span>
                <b class="f-18">{{ConsumptionAmountTotalNum}}</b>
              </li>
            </router-link>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
    import {
        NewMemberRecruit,
        NewMemberRecruitInfo,
        NewMember,
        NewMemberInfo,
        FirstConsumeCount,
        FirstConsume,
        RechargeAmountTotal,
        RechargeAmount,
        ConsumeCount,
        Consume,
        ConsumptionAmountTotal,
        ConsumptionAmount,
    } from "@/api/index";
    import {parseTime, formatDate, getMonday, getNMonth} from "@/utils/index";

    export default {
        data() {
            return {
                active: 0,
                StartDate: '',
                EndDate: '',
                NewMemberRecruitNum: '0',
                NewMemberNum: '0',
                FirstConsumeCountNum: '0',
                RechargeAmountTotalNum: '0',
                ConsumeCountNum: '0',
                ConsumptionAmountTotalNum: '0',
                // paramData:[
                //   {head:"新客招募",type:'NewMemberRecruit',headName:'新注册的客户',contentTitle:'新客人数'},
                //   {head:"新客转化",type:'NewMemberNum',headName:'新注册并消费的客户',contentTitle:'新客人数'},
                //   {head:"首次消费会员",type:'FirstConsume',headName:'注册后第一次消费的客户',contentTitle:'会员人数'},
                //   {head:"充值金额",type:'RechargeAmount',headName:'会员所有的充值金额',contentTitle:'会员充值金额'},
                //   {head:"消费会员",type:'Consume',headName:'所有消费的新老客户',contentTitle:'会员人数'},
                //   {head:"消费金额",type:'ConsumptionAmount',headName:'所有会员消费金额',contentTitle:'会员消费金额'},
                // ]
            };
        },
        mounted() {
            // this.onClick(0);
            console.log(this.$route.params)
            console.log(this.active)
        },
        activated() {
            //根据key名获取传递回来的参数，data就是map
            if (/^\/index\b/g.test(this.$store.state.fromRoute)) {
                this.active = 0;
                this.onClick(0);
            }
        },
        methods: {
            onClick(name, title) {
                let startDate = "";
                let endDate = "";
                switch (name) {
                    case 0:
                        startDate = formatDate(new Date());
                        endDate = formatDate(new Date());
                        break;
                    case 1:
                        startDate = parseTime(new Date().getTime() - 24 * 60 * 60 * 1000, "{yyyy}-{mm}-{dd}");
                        endDate = parseTime(new Date().getTime() - 24 * 60 * 60 * 1000, "{yyyy}-{mm}-{dd}");
                        break;
                    case 2:
                        startDate = getMonday('s')
                        endDate = getMonday('e')
                        break;
                    case 3:
                        startDate = getNMonth('s', 0)
                        endDate = getNMonth('e', 0)
                        break;
                }
                this.StartDate = startDate;
                this.EndDate = endDate;
                this.getData();
            },
            getData() {
                let _this = this;
                let para = {
                    StartDate: _this.StartDate,
                    EndDate: _this.EndDate
                };
                NewMemberRecruit(para).then(res => {
                  if(res.Code == 0){
                    _this.NewMemberRecruitNum = res.Data.TotalCount
                  }
                })
                NewMember(para).then(res => {
                  if(res.Code == 0){
                    _this.NewMemberNum = res.Data.TotalCount
                  }
                })
                FirstConsumeCount(para).then(res => {
                  if(res.Code == 0){
                    _this.FirstConsumeCountNum = res.Data.TotalCount
                  }
                })
                RechargeAmountTotal(para).then(res => {
                  if(res.Code == 0){
                    _this.RechargeAmountTotalNum = res.Data.TotalAmount
                  }
                })
                ConsumeCount(para).then(res => {
                  if(res.Code == 0){
                    _this.ConsumeCountNum = res.Data.TotalCount
                  }
                })
                ConsumptionAmountTotal(para).then(res => {
                  if(res.Code == 0){
                    _this.ConsumptionAmountTotalNum = res.Data.TotalAmount
                  }
                })
            }
        }
    };
</script>
<style scoped>
  .conall {
    width: 100%;
    height: auto;
    overflow: hidden;
    background: #fff;
    padding: 0;
    margin-top: 0;
    float: none;
  }

  .conall li {
    display: block;
    width: 50%;
    height: auto;
    float: left;
    border-right: 1px solid #eae8e8;
    border-bottom: 1px solid #eae8e8;
    text-align: center;
    box-sizing: border-box;
    padding: 30px 0 20px 0;
    overflow: hidden;
  }

  .conall li .iconfont {
    font-size: 42px;
    /*font-weight: bold;*/
  }

  .conall li p {
    opacity: 1;
    font-size: 17px;
    margin-top: 12px;
    margin-bottom: -2px;
    color: #222222;
  }

  .conall li span {
    color: #999999;
    font-size: 12px;
    width: 100%;
  }

  .conall li b {
    display: block;
    width: 100%;
    margin-top: 8px;
    color: #3c6efd;
  }
  .conall::before{
    display: none;
  }
  #ture_page .van-tabs--line .van-tabs__wrap.van-hairline--top-bottom{
    height: 100px !important;
    margin-bottom: 0 !important;
  }
  .van-tabs--line .van-tabs__wrap .van-tabs__nav--line .van-tabs__line{
    position: absolute;
    bottom: 0.6rem !important;
  }
</style>
<style>

</style>
