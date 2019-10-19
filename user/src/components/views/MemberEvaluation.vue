<template>
  <div class="content">
    <!-- <van-nav-bar title="会员评价" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar> -->
    <van-tabs v-model="active" swipeable @change="getOrderEvaluate">
      <van-tab v-for="item in types" :title="item.name" :name="item.id" :key="item.id">
        <div class="starall">
          <van-tabs v-model="activeName" type="card" swipeable @change="getOrderEvaluate">
            <van-tab v-for="item in typesXX" :title="item.name" :name="item.id" :key="item.id">
              <div class="starall_child">
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                  <van-list :offset="0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <div class="starallchild_item" v-for="item in list" :key="item.id">
                      <div class="imgRadius">
                        <img :src="item.HeadPortrait||'https://img.yzcdn.cn/vant/cat.jpeg'" width="60px"
                                   height="60px"/>
                      </div>
                      <div class="c-000" @click="goToDetail(item.OrderEvaluateId, item.ConsumptionOrderId)">
                        <div class="starallchild_item_right">
                          <div class="f-l">
                            <span class="f-16 f-l">{{item.MemberName}}</span>
                            <span class="c-666 f-12 f-l ml-5">(尾号{{item.MemberPhone}})</span>
                          </div>
                          <div class="f-r">
                            <p class="f-12 f-r c-999">{{item.CreatorTime}}</p>
                          </div>
                        </div>
                        <div class="starallchild_item_right">
                          <p class="mr-10 f-l">
                            <span class="f-l f-12">商品质量：</span>
                            <van-rate v-model="item.Quality" :size="14" color="#898DE7" class="f-l" readonly/>
                          </p>
                          <p class="mr-10 f-l">
                            <span class="f-l f-12">购物环境：</span>
                            <van-rate v-model="item.Environment" :size="14" color="#898DE7" class="f-l" readonly/>
                          </p>
                          <p class="f-l">
                            <span class="f-l f-12">服务态度：</span>
                            <van-rate v-model="item.Attitude" :size="14" color="#898DE7" class="f-l" readonly/>
                          </p>
                        </div>
                        <div class="starallchild_item_right f-14">
                          {{item.Content}}
                        </div>
                      </div>
                    </div>
                  </van-list>
                </van-pull-refresh>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
    import {getOrderEvaluate} from '../../api/hy'

    export default {
        data() {
            return {
                types: [{
                    name: '全部',
                    value: 0
                }, {
                    name: '服务态度',
                    value: 1
                }, {
                    name: '商品质量',
                    value: 2
                }, {
                    name: '购物环境',
                    value: 3
                }],
                typesXX: [{
                    name: '全部',
                    value: 0
                }, {
                    name: '一颗',
                    value: 5
                }, {
                    name: '二颗',
                    value: 4
                }, {
                    name: '三颗',
                    value: 3
                }, {
                    name: '四颗',
                    value: 2
                }, {
                    name: '五颗',
                    value: 1
                }],
                active: 0,
                activeName: 0,
                value: 5,
                SearchName: '',
                Level: '',
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
            onClick(name, title) {
                this.$toast(title);
            },
            getOrderEvaluate() {
                getOrderEvaluate({
                    SearchName: this.active,
                    Level: this.activeName,
                    page: 1,
                    rows: 10
                }).then(res => {
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
                })
            },
            goToDetail(id, orderId) {
                this.$router.push({
                    path: '/MemberEvaluaDetails',
                    query: {
                        id: id,
                        orderId: orderId
                    }
                })
            },
            onLoad() {
                this.page++;
                this.getOrderEvaluate()
            },
            onRefresh() {
                this.page = 1;
                this.getOrderEvaluate()
            },
            goBack() {
                this.$router.push({
                    path: '/index'
                })
            }
        }
    };
</script>
<style scoped>
  .conall,
  .starall {
    width: 100%;
    height: auto;
    overflow: hidden;
    background: #fff;
  }

  .imgRadius {
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    float: left;
  }

  .starall_child {
    padding: 0 15px;
  }

  .starallchild_item {
    border-bottom: 1px solid #eceaea;
    padding: 10px 0;
  }

  .starallchild_item_right {
    width: auto;
    margin-left: 60px;
    height: auto;
    overflow: hidden;
  }

  .starallchild_item_right p {
    width: 100%;
  }

</style>
<style>
  .starall .van-tab {
    flex-basis: 14% !important;
    background-color: #fff;
    border: none;
    margin: 0 1.5%;
    color: #000;
  }

  .starall .van-tabs__nav--card {
    border: none;
  }

  .starall .van-tabs__nav--card .van-tab.van-tab--active {
    background-color: #fff;
    /*border: 1px solid #5ba1e7;*/
    /*color: #5ba1e7;*/
  }

  .starall .van-tabs__nav--card .van-tab.van-tab--active span {
    color: #5ba1e7 !important;
    border: 1px solid #5ba1e7;
    border-radius: 20px;
    font-weight: normal !important;
  }

  .starall .van-tabs__nav--card {
    margin: 0;
  }

  .starall .van-tabs--card {
    padding-top: 10px;
  }

  .starall .van-rate__icon {
    width: 15px;
    margin-top: 4px;
  }

  .starall .van-tabs--card > .van-tabs__wrap {
    height: 40px;
    border-bottom: 1px solid #eceaea;
  }
</style>
