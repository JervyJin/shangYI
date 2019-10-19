<template>
  <div class="content" id="my_member">
    <!-- <van-nav-bar title="我的会员" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar> -->
    <van-tabs v-model="active" @change="getList">
      <van-tab v-for='(item, index) in types' :key="index" :title="item.name" :name="item.value">
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
            <div class="starall container">
              <div class="starall_child" v-for="item in list" :key="item.Id">
                <router-link :to="'/MemberDetails/'+item.MemberId" class="c-000">
                  <div class="starallchild_item">
                    <span class="f-14 f-l f-weight">{{item.MemberName}}</span>
                    <span class="c-999 f-12 f-l ml-5">（尾号{{item.MemberPhone ? item.MemberPhone.substring(7): ''}}）</span>
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
                    <van-icon name="arrow" class="f-20" />
                  </div>
                </router-link>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { getMyMembers } from '../../api/hy'
  export default {
    data() {
      return {
        active: 'CallPrice',
        title: "共2个会员",
        types: [
          {
            name: '客单价',
            value: 'CallPrice'
          },
          {
            name: '累计消费',
            value: 'TotalConsumption'
          },
          {
            name: '到店次数',
            value: 'ShopNumber'
          },
        ],
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
        getMyMembers({
          Phone: '',
          OrderCode: '',
          SalerUserCode: '',
          StartDate: '',
          EndDate: '',
          page: this.page,
          rows: this.rows,
          sort: this.active
        }).then(res => {
          this.isLoading = false;
          this.loading = false;
          if(res.Code == 0){
            this.total = res.Total
            if (this.page === 1) this.list = res.Rows
            else this.list.push(...res.Rows)
            if (this.list.length === 0 || Math.ceil(this.total / this.rows) === this.page) {
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
  .starallchild_item_right .van-icon{
    color: #999;
  }
  .bottom_text{
    color: #999;
    font-size: 12px;
  }
  >>> .van-tab--active span {
    color: #3c6efd !important;
  }
  >>> .van-tabs__nav {
    background-color: white !important;
  }
  .tab_nav{
    display: flex;
    justify-content: center;
    align-items: center;
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
</style>
