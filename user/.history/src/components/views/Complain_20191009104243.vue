<template>
  <div class="content">
    <van-nav-bar title="客诉管理" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <van-tabs v-model="active" swipeable @change="onRefresh" class="tabsAll">
      <van-tab v-for="item in types" :title="item.name" :name="item.id" :key="item.id">
        <div class="starall">
          <div class="container">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list
                :offset="0"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <van-row class="pb-10 pt-10 border-bottom" v-for="item in list" :key="item.Id">
                  <van-col span="22" class="text-l">
                    <p>
                      <span class="c-000">{{item.MemberName}}</span>
                      <span class="c-999 ml-5 f-12">{{item.CreatorTime}}</span>
                    </p>
                    <p class="c-666 mt-10">{{item.Content}}</p>
                  </van-col>
                  <router-link :to="'/ComplainDetails/'+item.Id">
                    <van-col span="2" class="text-r" @click="detailsBtn">
                      <van-icon name="arrow" class="mt-15 f-20" />
                    </van-col>
                  </router-link>
                </van-row>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <div class="d-f">
      <van-button type="info" class="Submitbtn" to="/ComplainAdd">新增客诉</van-button>
    </div>
  </div>
</template>
<script>
import { getUserComplaints } from "../../api/hy";
export default {
  data() {
    return {
      types: [
        {
          name: "未处理",
          value: 0
        },
        {
          name: "已处理",
          value: 1
        }
      ],
      active: 0,
      activeName: 0,
      value: 5,
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
    detailsBtn() {
      this.$router.push({ path: "/ComplainDetails" });
    },
    getUserComplaints() {
      getUserComplaints({
        State: this.active === 1,
        page: this.page,
        rows: this.rows,
        sort: "CreatorTime",
        order: "desc"
      }).then(res => {
        this.isLoading = false;
        this.loading = false;
        this.total = res.Total;
        if (this.page == 1) this.list = res.Rows;
        else this.list.push(...res.Rows);
        if (
          this.list.length === 0 ||
          Math.ceil(this.total / this.rows) === this.page
        ) {
          this.finished = true;
        } else {
          this.finished = false;
        }
      });
    },
    onLoad() {
      this.page++;
      this.getUserComplaints();
    },
    onRefresh() {
      this.page = 1;
      this.getUserComplaints();
    },
    goBack() {
      this.$router.push({
        path: "/index"
      });
    }
  }
};
</script>
<style scoped>
.starall {
  background-color: #fff;
  margin-top: 0px;
  padding-top: 1px;
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.container{
  box-shadow:none;
}
.tabsAll {
  padding-bottom: 50px;
}
</style>
<style>
.tabsAll .van-tabs__line {
  background-color: #3c6efd;
}
.tabsAll .van-tab--active {
  color: #000;
}
.tabsAll .van-ellipsis {
  font-weight: bold;
}
.d-f {
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
/*  */
.van-list__finished-text{
  margin-top: -0.2rem;
}
..van-icon-arrow:before {
    content: "\F00A";
}
</style>
