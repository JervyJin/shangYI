<template>
  <div class="header">
    <div class="header-left ml-5" :class="{'transform':transform}" @click="collapseChage">
      <i class="iconfont iconshouqi c-666 f-24"></i>
    </div>
    <div class="header-right">
      <!-- 搜索 -->
      <div class="f-l mr-20">
        <SearchBox style="width:200px" placeholder="请输入" v-model="value" @search="onSearch($event)">
          <span class="query_title">功能</span>
          <Addon>
            <span
              v-if="value"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="value=null"
            ></span>
          </Addon>
        </SearchBox>
      </div>
      <!-- 客服 -->
      <div class="f-l mr-20">
        <i
          class="iconfont iconkefu f-24"
          v-Tooltip="{content:'服务热线：400-609-6980',position:'bottom'}"
        ></i>
      </div>
      <!-- 用户 -->
      <!-- <div class="f-l mt-15 ml-20" v-if="userinfo"> -->
      <div class="f-l userinfo">
        <i class="iconfont iconmorentouxiang f-28 mr-5 f-l"></i>
        <span v-html="userinfo.Name"></span>，
        <span v-html="userinfo.Phone"></span>
      </div>
      <!-- 设置 -->
      <MenuButton text :menuAlign="menuAlign" :plain="true">
        <Menu :noline="true"  @itemClick="onItemClick($event)">
          <MenuItem text="个人设置" iconCls="iconfont iconshezhi1"></MenuItem>
          <MenuItem text="更换皮肤" iconCls="iconfont iconpifu"></MenuItem>
          <MenuItem text="注销登录" iconCls="iconfont iconic_zhuxiao"></MenuItem>
        </Menu>
      </MenuButton>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import { GetMyInfo } from "@/api/members";
import baseSet from "@/components/baseSet";
export default {
  data() {
    return {
      title: "",
      dialogStatus: "",
      transform: true,
      menuAlign: "left",
      value: null,
      userinfo: {},
      MenberDialogForm: {
        Code: "",
        Name: ""
      }
    };
  },
  components: { baseSet },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.transform = !this.transform;
      this.collapsed = !this.collapsed;
      bus.$emit("collapsed", this.collapsed);
    },
    closeDialogFn(data) {
      if (data) {
        this.$refs.MenberAddDialog.close();
      }
    },
    //搜索
    onSearch(event) {
      this.value = event.value;
    },
    onItemClick(event){
      if(event == "注销登录"){
        this.LogoutLogin();
      }
    },
    LogoutLogin() {
      this.$messager.alert({
        title: "提示",
        msg: "确认退出登录吗？",
        result: r => {
          if (r) {
            this.$router.push({ path: "/" });
            this.$store.commit("setToken", null);
            // 清除token
          }
        }
      });
    },
    // 获取用户信息
    getUsers() {
      GetMyInfo().then(res => {
        console.log(res.Result);
        this.userinfo = res.Result.Data;
      });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
.transform {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg);
}

</style>
<style>
</style>