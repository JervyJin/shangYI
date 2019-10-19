<template>
  <div class="sidebar" :style="{width:width+'px'}" :collapsed="collapsed" router>
    <div class="logo">
      <img src="../../../assets/img/logo.png" v-if="imgshow==0" />
      <img src="../../../assets/img/logo200.png" v-if="imgshow==1" />
      <!-- <div class="mt-5">{{title}}</div> -->
    </div>
    <template class="sidebar-body f-animate">
      <div class="Itemtop" :style="{width:width+'px'}">
        <span :class="{active:nav==0}" @click="all(0)">全部</span>
        <span :class="{active:nav==1}" @click="all(1)">常用</span>  
      </div>
      <nav class="sidebar-nav" :class="{active:nav==0}">
        <ul class="nav">
          <li
            v-for="(item,index) in menuItems"
            :key="index"
            @mouseover="mouseover(index)"
            @mouseleave="mouseleave(index)"
          >
            <router-link :to="item.Url" class="Acolor">
              <div class="nav-link" :class="{'listyle':listyle[index]}" @click="menuBar(children1,index)">
                <i :class="item.Icon"></i>
                <span :class="{'spanShow':spanShow}">{{ item.DisplayName}}</span>
                <i :class="{ 'triangleIcon': triangle[index]}"></i>
              </div>
            </router-link>
            <div class="listAll" v-show="listS[index]" :class="{'listShow':listShow}">
              <ul class="itemUL">
                <ol v-for="subItem in children1" :key="subItem.DisplayName">
                  <p class="p">
                    <span class="iconA"></span>
                    {{ subItem.DisplayName}}
                  </p>
                  <router-link
                    :to="threeItem.Url"
                    v-for="threeItem in subItem.Items"
                    :key="threeItem.DisplayName"
                  >
                    <div class="div" @click="closelistS(index)">{{ threeItem.DisplayName}}</div>
                  </router-link>
                </ol>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <nav class="sidebar-nav" :class="{active:nav==1}">
        <ul class="nav start_nav">
          <li v-for="(item,index) in startlist"
            :key="index"  @click="list(index)">
            <router-link :to="item.Path" class="Acolor">
              <div class="nav-link" :class="{'listyle':sidebar[index]}">
                <!-- <i :class="item.Image"></i> -->
                <span>{{ item.Title}}</span>
                <i :class="{ 'triangleIcon': sidebar[index] == true}"></i>
                <!-- <i class="triangleIcon"></i> -->
              </div>
            </router-link>
          </li>
        </ul>
      </nav>
    </template>

    <div class="bottomImg" v-if="imgshow==0" style="width:130px;">
      <div>
        <img src="../../../assets/img/lALPDgQ9rBN4PWEOzIM_131_14.png" width="100%" />
        <!-- <span class="">会员运营系统</span> -->
      </div>
      <!-- <div>V1.2.3.44.788</div> -->
    </div>
  </div>
</template>
<script>
import { GetPCNavigation,GetOftenMenu } from "@/api/menu.js";
import bus from "./bus";
// const appData = require("../../../../menu.json"); // 加载本地json文件
// const user = appData.user; // 获取对应本地数据

export default {
  data() {
    return {
      title: "客易宝云收银",
      width: 170,
      collapsed: false,
      listS: [],
      children1: [],
      menuItems: [],
      triangle: [],
      title2: "客易宝云收银",
      listShow: false,
      listyle: [],
      spanShow: false,
      imgshow: 0,
      nav:0,
      startlist:[],
      sidebar:[]
    };
  },
  methods: {
    all(e){  //切换导航
      this.nav = e
      if(e == 1){
        this.Getstartlist()
      }
    },
    Getstartlist(){   //获取菜单列表
      const para ={}
      GetOftenMenu(para).then(res => {
        console.log(res);
        if(res.Success == true){
          this.startlist = res.Result.Data
        }else{
          
        }
      });
    },
    list(index){
      console.log(index)
      this.sidebar = []
      this.sidebar[index] = true;
      console.log(this.sidebar)
    },
    info() {
      var _self = this;
      // _self.menuItems = user;
      // return;
      GetPCNavigation().then(res => {
        // console.log(res.Result.Data);
        // data = data.data; // 获取到数据
        _self.menuItems = res.Result.Data;
        // console.log(_self.menuItems);
      });
    },
    mouseover(index) {
      var _self = this;
      this.listS[index] = true;
      this.listShow = false;
      this.listyle[index] = true;
      // console.log(this.menuItems[index].Items);
      this.children1 = this.menuItems[index].Items;
    },
    mouseleave(index) {
      this.listS[index] = false;
      this.triangle[index] = false;
      this.listShow = true;
      this.listyle[index] = false;
    },
    menuBar(children1,index){
      console.log(children1,'123')
      var startlist = this.startlist
      for(var i = 0;i<startlist.length;i++){
        startlist[i].Title
        for(var f=0;f<children1.length;f++){
          for(var g=0;g<children1[f].Items.length;g++){
              // menuItems[f].Items[g].Icon = "../../../static/"+ menuItems[f].Items[g].Icon + ".png"
            if(startlist[i].Title == children1[f].Items[g].DisplayName){
              children1[f].Items[g].IsEnabled = false
            }
          }
        }
      }








      this.listS[index] = false;
      this.triangle[index] = false;
      this.listShow = true;
      this.listyle[index] = false;
      // this.nav = 1
      // this.Getstartlist()
      bus.$emit('change',children1);
      localStorage.setItem("children1",JSON.stringify(children1))
      this.$router.push({ name: 'members', params: { menuList: children1 }})
    },
    closelistS(index) {
      this.listShow = true;
      this.triangle[index] = true;
    }
  },
  mounted() {
    this.info();
  },
  created() {
    var that = this
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapsed", msg => {
      this.collapsed = msg;
      // this.title = this.collapsed ? "客易宝":'客易宝云收银';
      this.imgshow = this.collapsed ? 1 : 0;
      this.imgStyle = !this.imgStyle;
      this.spanShow = !this.spanShow;
      this.width = this.collapsed ? 60 : 170;
    });
     bus.$on('nav', (msg) => { //Hub接收事件 this.msg = 'hehe'; 
          console.log(msg +'nav')
          if(msg == 1){
            this.Getstartlist()
          }
        
      });
  }
};
</script>

<style scoped>
.imgStyle {
  display: NONE;
}
.Acolor{
  color: #fff;
}
</style>