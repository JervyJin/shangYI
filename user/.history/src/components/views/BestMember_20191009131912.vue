<template>
  <div class="content">
    <van-nav-bar title="最佳会员" left-text="返回" left-arrow @click-left="goToBack">
      <van-icon name="ellipsis" slot="right" class="f-20" />
    </van-nav-bar>
    <van-tabs v-model="active" @click="onClick">
      <van-tab title="储值金额">
        <div class="conall">
          <van-cell-group>
            <van-cell
              :title="showDate"
              value="筛选"
              value-class="c-333"
              class="border-bottom"
              @click="screening"
            >
              <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
            </van-cell>
          </van-cell-group>
          <div class="starallchild_item" v-for="(item,index) in memberReList" :key="index">
            <div @click="goToDetail(item.MemberId)" class="c-000">
              <div class="imgRadius">
                <img :src="item.HeadPortrait" v-if="item.HeadPortrait" />
                <img v-else src="../../assets/touxiang.png" width="50px" height="50px" />
              </div>
              <div class="starallchild_item_left">
                <p>
                  <span class="f-16 f-l">{{item.MemberName}}</span>
                  <span class="c-999 f-12 f-l ml-5">（尾号{{item.Phone|filterPhone}}）</span>
                </p>
                <p class="mt-5">
                  <i class="iconfont"></i>
                  <span>已储值：{{item.Amount}}元</span>
                </p>
              </div>
              <div class="starallchild_item_right">
                <van-icon name="arrow" class="f-20 c-999" />
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <!--  -->
      <!--  -->
      <van-tab title="消费金额">
        <div class="conall">
          <van-cell-group>
            <van-cell
              :title="showDate"
              value="筛选"
              value-class="c-333"
              class="border-bottom"
              @click="screening"
            >
              <i slot="right-icon" class="ml-5 c-blue f-16 iconfont">&#xe658;</i>
            </van-cell>
          </van-cell-group>
          <div class="starallchild_item" v-for="(item,index) in memberExList" :key="index">
            <div @click="goToDetail(item.MemberId)" class="c-000">
              <div class="imgRadius">
                <img :src="item.HeadPortrait" v-if="item.HeadPortrait" />
                <img src="../../assets/touxiang.png" width="50px" height="50px" v-else />
              </div>
              <div class="starallchild_item_left">
                <p>
                  <span class="f-16 f-l">{{item.MemberName}}</span>
                  <span class="c-999 f-12 f-l ml-5">（尾号{{item.Phone|filterPhone}}）</span>
                </p>
                <p class="mt-5">
                  <i class="iconfont"></i>
                  <span>已消费：{{item.Amount}}元</span>
                </p>
              </div>
              <div class="starallchild_item_right">
                <van-icon name="arrow" class="f-20" />
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!--  -->
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
import { MemberTotalRecharge, MemberTotalExpend } from "@/api/index";
import { parseTime, formatDate, getStandardOrEndDate } from "@/utils/index";

export default {
  data() {
    return {
      active: 0,
      showPicker: false,
      columns: [],
      showDate: "",
      memberReList: [],
      memberExList: []
    };
  },
  created() {
    let year = new Date().getFullYear();
    this.columns.push(year + "年");
    this.columns.push(year - 1 + "年");
    this.columns.push(year - 2 + "年");
    this.showDate = year;
  },
  mounted() {
    this.getListData();
  },
  methods: {
    screening() {
      this.showPicker = true;
    },
    onClick(name, title) {
      this.getListData();
    },
    onConfirm(value, index) {
      this.showPicker = false;
      this.showDate = value.replace("年", "");
      this.getListData();
    },
    getListData() {
      let _this = this;
      let paramStart = _this.showDate + "-1-1 00:00:00";
      let paramEnd = _this.showDate + "-12-31 23:59:59";

      let para = {
        StartDate: paramStart,
        EndDate: paramEnd
      };
      if (_this.active == 0) {
        MemberTotalRecharge(para).then(res => {
          _this.memberReList = res.Data;
        });
      } else {
        MemberTotalExpend(para).then(res => {
          _this.memberExList = res.Data;
        });
      }
    },
    goToDetail(id) {
      sessionStorage.setItem("memberPath", this.$route.fullPath);
      this.$router.push({
        path: `/MemberDetails/${id}`
      });
    },
    goToBack() {
      this.$router.push({
        path: "/index"
      });
    }
  },
  filters: {
    filterPhone(value) {
      return value.substring(value.length - 4);
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
  padding: 0 10px;
}

.imgRadius {
  border-radius: 25%;
  overflow: hidden;
  width: 50px;
  height: 50px;
  float: left;
}

.imgRadius img {
  width: 50px;
  height: 50px;
  border-radius: 25%;
}

.starallchild_item {
  border-bottom: 1px solid #eceaea;
  padding: 15px 0 10px;
  position: relative;
}

.starallchild_item_left {
  width: auto;
  margin-left: 60px;
  height: auto;
  overflow: hidden;
}

.starallchild_item_left p {
  width: 100%;
  display: block;
  float: left;
}

.starallchild_item_right {
  position: absolute;
  right: 0;
  top: 38%;
}

>>> .van-tabs__line {
  width: 1.8rem !important;
}
</style>
<style>
.van-tabs__line {
  background-color: #3c6efd;
}
/* 修改 */
.conall{
  border: red 1px solid;
}

</style>
