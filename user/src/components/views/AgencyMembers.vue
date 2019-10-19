<template>
  <div class="content" id="agency_members">
    <!-- <van-nav-bar title="机构会员" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar> -->
    <van-tabs v-model="active" @click="getList" @change="changTabs">
      <van-tab v-for='(item, index) in types' :key="index" :name="item.value">
        <span slot="title" @click="changeOrder(item)" class="tab_nav">
          <span>{{item.name}}</span>
          <span class="icon_wrap">
            <i class="iconfont up">&#xe76d;</i>
            <i class="iconfont down">&#xe773;</i>
          </span>
          <!-- <i class="icon iconfont iconStyle" v-if="item.icon == '&#xe772;'">{{item.name}} &#xe772;</i>
          <i class="icon iconfont iconStyle" v-else>{{item.name}} &#xebd9;</i> -->
        </span>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list :offset="0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group>
              <van-cell to="/MyMember" :title="'共'+total+'个会员'" value="我的会员" value-class="c-333"
                        class="border-bottom starall_child">
                <!-- <van-icon name="arrow" class="f-r mt-5 ml-2 c-999 f-16 " slot="right-icon"/> -->
                <i class="icon iconfont iconStyle member"><span>我的会员</span> &#xe64c;</i>
              </van-cell>
            </van-cell-group>
            <div class="starall container">
              <div class="starall_child" v-for="item in list" :key="item.Id">
                <div @click="goToDetail(item.MemberId)" class="c-000">
                  <div class="starallchild_item">
                    <span class="f-14 f-l f-weight">{{item.MemberName}}</span>
                    <span
                      class="c-999 f-12 f-l ml-5">（尾号{{item.MemberPhone ? item.MemberPhone.substring(7): ''}}）</span>
                  </div>
                  <div class="starallchild_item">
                    <van-row class="user-links f-14">
                      <van-col span="8" class="text-l">
                        <span class="c-blue">{{item.CallPrice.toFixed(2)}}</span>元/次
                      </van-col>


                      <van-col span="7" class="text-c">
                        <span class="c-blue">{{item.TotalConsumption}}</span>元
                      </van-col>
                      <van-col span="9" class="text-r">
                        <span class="c-blue">{{item.ShopNumber}}</span>次
                      </van-col>
                    </van-row>
                    <van-row class="user-links f-12">
                      <van-col span="8" class="text-l bottom_text" v-if="item.WhoDay == -1 || item.WhoDay == 1">今天未消费</van-col>
                      <van-col span="8" class="text-l bottom_text" v-if="item.WhoDay == 0">今天已消费</van-col>
                      <van-col span="8" class="text-l bottom_text" v-if="item.WhoDay > 1">超过{{item.WhoDay}}天未消费</van-col>
                      <!--<van-col span="7" class="text-c">超过{{item}}天未回访</van-col>-->
                      <van-col span="9" class="text-r bottom_text">所属导购:{{item.PartUserInfo}}</van-col>
                    </van-row>
                  </div>
                  <div class="starallchild_item_right">
                    <van-icon name="arrow" class="f-20 c-999"/>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
    import {getMembers} from '../../api/hy'

    export default {
        data() {
            return {
                active: 'CallPrice',
                title: "共2个会员",
                types: [
                    {
                        name: '客单价',
                        value: 'CallPrice',
                        icon:"&#xe772;",
                        order:'desc'
                    },
                    {
                        name: '累计消费',
                        value: 'TotalConsumption',
                        icon:"&#xe772;",
                        order:'desc'
                    },
                    {
                        name: '到店次数',
                        value: 'ShopNumber',
                        icon:"&#xe772;",
                        order:'desc'
                    },
                ],
                page: 0,
                rows: 10,
                total: 0,
                list: [],
                loading: false,
                finished: false,
                isLoading: false,
                order: 'asc',
            };
        },
        methods: {
            goBack() {
                if (sessionStorage.getItem('path')) {
                    this.$router.push({
                        path: sessionStorage.getItem('path')
                    })
                } else {
                    this.$router.go(-1)
                }
            },
            getList() {
                let MemerTagGroup = '';
                let StartDate = '';
                let EndDate = '';
                let IsConsumption = null;
                let IsBindWechat = null;
                let that = this;
                if (this.$route.query) {
                    if (this.$route.query.tagList) {
                        MemerTagGroup = this.$route.query.tagList;
                    }
                }
                if (this.$route.query) {
                    if (this.$route.query.StartDate) {
                        StartDate = this.$route.query.StartDate;
                    }
                    if (this.$route.query.EndDate) {
                        EndDate = this.$route.query.EndDate;
                    }
                    if (this.$route.query.IsConsumption != null || this.$route.query.IsConsumption != 'undefined') {
                        IsConsumption = this.$route.query.IsConsumption;
                    }
                    if (this.$route.query.IsBindWechat) {
                        IsBindWechat = this.$route.query.IsBindWechat;
                    }
                }
                var param = {
                    page: this.page,
                    rows: this.rows,
                    sort: this.active,
                    order: that.getActiveOrder(),
                    MemerTagList: MemerTagGroup,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    IsConsumption: IsConsumption,
                    IsBindWechat: IsBindWechat
                };

                getMembers(param).then(res => {
                    this.isLoading = false;
                    this.loading = false;
                    if(res.Code == 0){
                      this.total = res.Total
                      if (this.page == 1) this.list = res.Rows
                      else this.list.push(...res.Rows)
                      if (this.list.length === 0 || Math.ceil(this.total / this.rows) === this.page) {
                          this.finished = true;
                      } else {
                          this.finished = false;
                      }
                    }else{
                      this.finished = true;
                    }
                    // if (this.order === 'asc') {
                    //     this.order = 'desc'
                    // } else {
                    //     this.order = 'asc';
                    // }
                })
            },
            getActiveOrder(){
              let that = this;
              for(let i=0;i<that.types.length;i++){
                if(that.active == that.types[i].value){
                  return that.types[i].order;
                }
              }
            },
            changeOrder(item){
              if(item.icon == '&#xe772;'){
                item.icon = "&#xebd9;"
                item.order = 'asc';
              }else{
                item.icon = "&#xe772;"
                item.order = 'desc';
              }
            },
            changTabs(){
              let that = this;
              for(let i=0;i<that.types.length;i++){
                if(that.active == that.types[i].value){
                  that.changeOrder(that.types[i]);
                }
              }
            },
            onLoad() {
                this.page++;
                this.getList()
            },
            onRefresh() {
                this.page = 1;
                this.getList()
            },
            goToDetail(id) {
                sessionStorage.setItem('memberPath', this.$route.fullPath)
                this.$router.push({
                    path: `/MemberDetails/${id}`
                })
            }
        }
    };
</script>
<style scoped>
  .starall {
    width: 100%;
    height: auto;
    overflow: hidden;
    background: #fff;
    margin-top: 0;
  }

  .starall_child {
    padding: 10px 0px;
    width: auto;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #dfdfdf;
  }

  .starallchild_item {
    width: 100%;
    line-height: 30px;
    height: auto;
    overflow: hidden;
    padding-right: 30px;
  }

  .starallchild_item_right {
    position: absolute;
    right: -6px;
    top: 38%;
    text-align: right;
  }

  >>> .iconStyle {
    font-size: 10px;
  }
  .iconStyle.member{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #999;
    font-size: 18px;
  }
  .iconStyle.member span{
    color: #666;
    font-size: 12px;
  }

  >>> .van-tabs__nav {
    background-color: white !important;
  }

  >>> .van-tab--active span {
    color: #3c6efd !important;
  }

  >>> .van-cell-group.van-hairline--top-bottom {
    background: none;
    padding: 2px 3%;
  }

  >>> .van-cell-group.van-hairline--top-bottom .van-cell {
    background: none;
    border: none;
    padding: 0;
  }

  >>> .van-cell__title {
    font-size: 12px;
    color: #888;
  }
  >>> .van-tabs__wrap{
    height: 58px;
  }
  >>> .van-tabs__nav .van-ellipsis, >>> .van-tabs__nav .van-ellipsis div, >>> .van-tabs__nav .van-ellipsis .tab_nav{
    height: 100%;
  }
  >>> .van-tabs__line{
    display: none;
  }
  .tab_nav{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .van-tab{
    line-height: auto;
  }
  .icon_wrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 8px;
    margin-left: 4px;
  }
  .icon_wrap .iconfont{
    font-size: 1px;
    height: 4px;
  }
  .iconfont.up{
    margin-top: -36px;
  }
  .iconfont.down{
    margin-top: 4px;
  }
  .bottom_text{
    color: #999;
    font-size: 12px;
  }

</style>
