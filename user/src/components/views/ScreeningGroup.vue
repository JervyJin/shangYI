<template>
  <div class="content">
    <!-- <van-nav-bar title="筛选客群" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar> -->

    <div class="container">
      <h4 class="h4style">消费</h4>
      <ul class="item_ul">
        <li v-for="(item,index) in isSelectList" :key="index" @click="activeThis(item)"
            :class="{'activeItem':item.isSelect}">
          <p>{{item.title}}</p>
          <b class="c-blue">{{item.data}}</b>
        </li>
        <!-- <li>
          <p>本周有消费</p>
          <b class="c-blue">{{nowWeekTrue}}</b>
        </li>
        <li>
          <p>本周未消费</p>
          <b class="c-blue">{{nowWeekFalse}}</b>
        </li>
        <li>
          <p>本月有消费</p>
          <b class="c-blue">{{nowMonthTrue}}</b>
        </li>
        <li>
          <p>本月未消费</p>
          <b class="c-blue">{{nowMonthFalse}}</b>
        </li>
        <li>
          <p>三个月有消费</p>
          <b class="c-blue">{{threeMonthTrue}}</b>
        </li>
        <li>
          <p>三个月未消费</p>
          <b class="c-blue">{{threeMonthFalse}}</b>
        </li> -->
      </ul>
    </div>
    <div class="container">
      <h4 class="h4style">其他</h4>
      <ul class="item_ul">
        <li @click="hasWechatActive" :class="{'activeItem':isHasWechatActive}">
          <p>已绑定微信</p>
          <b class="c-blue">{{hasWechatCout}}</b>
        </li>
        <li @click="noWechatActive" :class="{'activeItem':isNoWechatActive}">
          <p>未绑定微信</p>
          <b class="c-blue">{{noWechatCout}}</b>
        </li>
      </ul>
    </div>
    <div class="pd-20">
      <van-button type="info" class="Submitbtn" @click="Submitbtn()">筛选</van-button>
    </div>
  </div>
</template>
<script>
    import {
        MemberNum,
        MemberNumOther
    } from "@/api/index";
    import {parseTime, formatDate, getMonday, getNMonth} from "@/utils/index";

    export default {
        data() {
            return {
                getDataCacheList: [],
                // nowWeekTrue:'',
                // nowWeekFalse:'',
                // nowMonthTrue:'',
                // nowMonthFalse:'',
                // threeMonthTrue:'',
                // threeMonthFalse:'',
                hasWechatCout: '',
                noWechatCout: '',
                isSelectList: [
                    {title: '本周有消费', isSelect: false, data: ''},
                    {title: '本周未消费', isSelect: false, data: ''},
                    {title: '本月有消费', isSelect: false, data: ''},
                    {title: '本月未消费', isSelect: false, data: ''},
                    {title: '三个月有消费', isSelect: false, data: ''},
                    {title: '三个月未消费', isSelect: false, data: ''},
                ],
                isHasWechatActive: false,
                isNoWechatActive: false,
                requestList: []
            };
        },
        created() {
            this.getGroup();
        },
        methods: {
            goBack() {
                this.$router.push({
                    path: '/index'
                })
            },
            getGroup() {
                let _this = this;
                let requestList = [
                    {StartDate: getMonday('s', 0), EndDate: getMonday('e', 0), IsConsume: true},
                    {StartDate: getMonday('s', 0), EndDate: getMonday('e', 0), IsConsume: false},
                    {StartDate: getNMonth('s', 0), EndDate: getNMonth('e', 0), IsConsume: true},
                    {StartDate: getNMonth('s', 0), EndDate: getNMonth('e', 0), IsConsume: false},
                    {StartDate: getNMonth('s', -2), EndDate: getNMonth('e', 0), IsConsume: true},
                    {StartDate: getNMonth('s', -2), EndDate: getNMonth('e', 0), IsConsume: false},
                ];
                _this.requestList = requestList;
                for (let i = 0; i < requestList.length; i++) {
                    MemberNum(requestList[i]).then(res => {
                        if(res.Code == 0){
                          _this.getDataCacheList[i] = res.Data.TotalCount;
                          switch (i) {
                              case 0:
                                  _this.isSelectList[0].data = _this.getDataCacheList[0];
                                  break;
                              case 1:
                                  _this.isSelectList[1].data = _this.getDataCacheList[1];
                                  break;
                              case 2:
                                  _this.isSelectList[2].data = _this.getDataCacheList[2];
                                  break;
                              case 3:
                                  _this.isSelectList[3].data = _this.getDataCacheList[3];
                                  break;
                              case 4:
                                  _this.isSelectList[4].data = _this.getDataCacheList[4];
                                  break;
                              case 5:
                                  _this.isSelectList[5].data = _this.getDataCacheList[5];
                                  break;
                          }
                        }
                    })
                }

                MemberNumOther({IsWeChat: true}).then(res => {
                  if(res.Code == 0){
                    _this.hasWechatCout = res.Data.TotalCount;
                  }
                })
                MemberNumOther({IsWeChat: false}).then(res => {
                  if(res.Code == 0){
                    _this.noWechatCout = res.Data.TotalCount;
                  }
                })
            },
            Submitbtn() {
                // 选中标签后跳转机构会员
                let _this = this;
                let StartDate = '';
                let EndDate = '';
                let IsConsume = null;
                let IsBindWechat = null;
                for (let index = 0; index < _this.isSelectList.length; index++) {
                    if (_this.isSelectList[index].isSelect) {
                        StartDate = _this.requestList[index].StartDate;
                        EndDate = _this.requestList[index].EndDate;
                        IsConsume = _this.requestList[index].IsConsume;
                    } else if (_this.isHasWechatActive) {
                        IsBindWechat = 'true';
                    } else if (_this.isNoWechatActive) {
                        IsBindWechat = 'false'
                    }
                }
                if (!StartDate && !EndDate && IsConsume == '' && IsBindWechat == '') {
                    this.$toast("请选择筛选客群后查询");
                    return;
                }
                sessionStorage.setItem('path', this.$route.fullPath)
                this.$router.push({
                    path: "/AgencyMembers",
                    query: {
                        StartDate: StartDate,
                        EndDate: EndDate,
                        IsConsumption: IsConsume,
                        IsBindWechat: IsBindWechat
                    }
                });
            },
            activeThis(item) {
                this.isSelectList.forEach(element => {
                    element.isSelect = false;
                });
                this.isHasWechatActive = false;
                this.isNoWechatActive = false;
                item.isSelect = true;
            },
            hasWechatActive() {
                this.isSelectList.forEach(element => {
                    element.isSelect = false;
                });
                this.isHasWechatActive = true;
                this.isNoWechatActive = false;
            },
            noWechatActive() {
                this.isSelectList.forEach(element => {
                    element.isSelect = false;
                });
                this.isHasWechatActive = false;
                this.isNoWechatActive = true;
            }
        }
    };
</script>
<style scoped>
  .item_ul li {
    width: 42.5%;
    float: left;
    margin-right: 5%;
    margin-bottom: 15px;
    border: 1px solid #e2e2e2;
    text-align: center;
    padding: 15px 0;
    border-radius: 5px;
  }

  .item_ul li p {
    margin-bottom: 5px;
    color: #666;
  }

  .item_ul li p {
    margin: 5px 0;
  }

  .item_ul li b {
    font-size: 18px;
  }

  .item_ul li:nth-child(even) {
    float: right;
    margin-right: 0;
    margin-left: 5%;
  }

  .activeItem {
    background: #5BA1E7;
  }

  .activeItem * {
    color: white !important;
  }

  .h4style {
    border-bottom: none;
    font-size: 16px;
    color: #333;
  }
</style>
