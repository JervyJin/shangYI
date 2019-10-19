<template>
  <div class="content-box">
    <van-row class="user-links mt-10">
      <van-col span="8" class="index-header">
        <img :src="Image" class="index-header-img" v-if="Image" />
        <img src="../assets/touxiang.png" class="index-header-img" v-else />
      </van-col>
      <van-col span="12" class="information">
        <div style="vertical-align:top;">
          <b class="f-16 display">{{Name}}</b>
          <!-- <p class="mb-10 mt-5">{{Phone}}</p> -->
          <p class="mt-5 mb-5">{{Phone}}</p>
          <span class="radiustyle">
            <i class="iconfont mr-5 f-12">&#xe61e;</i>
            <span>{{OrganizationName}}</span>
          </span>
        </div>
      </van-col>
      <van-col span="2" class="f-r">
        <i class="iconfont f-22 c-666" @click="show=true">&#xe74c;</i>
      </van-col>
    </van-row>
    <!---->
    <van-row class="row text-c mt-20 back_blue row">
      <van-col span="12" class="line">
        <b class="f-18">{{MemberNum}}</b>
        <p class="c-999">名下会员人数</p>
      </van-col>
      <van-col span="12">
        <div>
          <b class="f-18">{{Amount}}</b>
          <p class="c-999">本月销售金额</p>
        </div>
      </van-col>
    </van-row>
    <!-- -->
    <van-search
      v-model="Searchvalue"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      background="#fff"
      @search="onSearch"
      class="Searchbg"
    >
      <div slot="action" @click="onSearch" class="SearchBtn">会员查询</div>
    </van-search>
    <!--  -->
    <div v-for="(item,index) in homeData" :key="index">
      <h4 class="h4style">
        <span class="lineStyle"></span>
        {{item.DisplayName}}
      </h4>
      <van-grid class="gridClass">
        <van-grid-item v-for="(detail,index) in item.Items" @click="redirect(detail)" :key="index">
          <i class="iconfont">{{detail.Icon}}</i>
          <span>{{detail.DisplayName}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="opt-item" @click="ChangePassword">
        <span>修改密码</span>
        <van-icon name="arrow" size="0.36rem" />
      </div>
      <div class="opt-item" @click="logout">
        <span>退出登录</span>
        <van-icon name="arrow" size="0.36rem" />
      </div>
    </van-popup>
    <!--  -->
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../components/commom/NavBar";
import Footer from "../components/commom/footer";
import { MyInfo, GetAppNavigation } from "@/api/index";
import store from "../store/store";

export default {
  created() {
    this.getShowData();
  },
  data() {
    return {
      Searchvalue: "",
      Name: "",
      MemberNum: 0,
      Amount: 0,
      Image: "",
      Phone: "",
      OrganizationName: "",
      show: false,
      homeData: []
    };
  },
  components: {
    NavBar,
    Footer
  },
  methods: {
    getShowData() {
      let that = this;
      if (that.$store.state.homeData) {
        that.homeData = JSON.parse(that.$store.state.homeData);
      } else {
        GetAppNavigation().then(res => {
          that.homeData = res.Data;
          that.$store.commit("setHomeData", JSON.stringify(res.Data));
        });
      }
    },
    redirect(detail) {
      if (detail.Url == "/AgencyMembers") {
        sessionStorage.setItem("path", this.$route.fullPath);
        this.$router.push({
          path: "/AgencyMembers"
        });
      } else {
        this.$router.push({
          path: detail.Url
        });
      }
    },
    onSearch() {
      let phone = this.Searchvalue;
      if (!phone || phone.length == 0) {
        this.$toast({
          message: "请输入要查询的手机号",
          duration: 1000
        });
        return;
      }

      localStorage.setItem("phone", phone);
      this.$router.push({
        path: "/MemberQuery",
        query: {
          phone: phone
        }
      });
    },
    ChangePassword() {
      this.$router.push({ path: "/ChangePassword" });
    },
    // 获取用户列表
    getUsers() {
      MyInfo().then(res => {
        let userId = res.Data.Id;
        localStorage.setItem("UserId", userId);
        this.Name = res.Data.Name;
        this.MemberNum = res.Data.MemberNum;
        this.Amount = res.Data.Amount;
        this.Image = res.Data.Image;
        this.Phone = res.Data.Phone;
        this.OrganizationName = res.Data.OrganizationName;
      });
    },
    logout() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您确定退出登录吗?"
        })
        .then(() => {
          this.show = false;
          this.$store.commit("setToken", "");
          this.$toast({
            message: "退出成功!!",
            duration: 1000
          });
          setTimeout(() => {
            this.$router.push({
              path: "/login"
            });
          }, 1000);
        })
        .catch(() => {});
    }
  },
  mounted() {
    sessionStorage.clear();
    this.getUsers();
  }
};
</script>

<style scoped>
/* 样式修改 */
.index-header {
  width: 1.38rem;
  height: 1.39rem;
  margin-right: 0.54rem;
}
.information {
  margin-left: 0.54rem;
}
.mt-5 {
    margin-top: 0.1rem;
}
/* 默认 */
.user-links {
  width: auto;
  height: auto;
  overflow: hidden;
  padding: 10px 0;
}

.back_blue {
  padding: 15px 0;
  margin: 10px 0;
  border-radius: 10px;
  color: #000;
}

.Searchbg .van-cell {
  background-color: #f6f3f7;
  height: 35px;
  padding-left: 8px;
}

.Searchbg {
  padding: 10px 0px;
}

.gridClass {
  border-top: 1px solid #dcdcdc;
  border-left: 1px solid #dcdcdc;
  margin-bottom: 10px;
}

.gridClass .van-grid-item {
  border-right: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
}

.van-grid-item i {
  font-size: 28px;
  color: #fc997e;
  margin-bottom: 13px;
  margin-top: 13px;
}

.van-grid-item span {
  font-size: 12px;
}

.radiustyle {
  border: 1px solid #0579cb;
  padding: 5px 10px;
  border-radius: 21px;
  color: #3c6efd;
  font-size: 12px;
  white-space: nowrap;
}

.h4style {
  border-bottom-color: #fff;
}

.content-box {
  margin-bottom: 52px;
}

/*覆盖搜索框van的默认样式*/
>>> .van-cell.van-cell--borderless.van-field {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  background-color: white;
}

>>> .van-grid-item__content {
  padding: 0.21333rem !important;
}
</style>
<style>
.index-header-img {
  border-radius: 15px;
  width: 80px;
  height: 80px;
  background-size: 100%;
}

.index-header-img img {
  border-radius: 15px;
}

.opt-item {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.opt-item span {
  font-size: 14px;
}

.opt-item:not(:last-child) {
  border-bottom: 1px solid #ebedf0;
}
.Searchbg .van-search__content--round {
  /*background-color: #f5f5f5;*/
  border-radius: 5px;
  padding-left: 0;
}
</style>
