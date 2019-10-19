<template>
  <div class="container">
    <div class="tips">
      点击卡片 ★  即可将其加入常用菜单
    </div>
    <!-- {{menuItems}} -->  
      <!-- <i class="iconfont iconziyuan43"></i> -->
 
    <!-- <div v-for="(item,ind) in menuItems"> -->
      <div class="nav-link" v-for="(subItem,index) in menuItems" :key='index'>
        <div class="clearfix header_tip" @click="queryToggle(index)">
          <p class="title fl">{{subItem.DisplayName}}</p>
          <p class="put fr">收起</p>
          <!-- <p class="put fr" @click="queryToggle(ind,index)" v-show="!item.IsVisible">收起2</p> -->
        </div>
        <ul class="itemUL" v-show="subItem.IsVisible">
          <li v-for="(threeItem,ind) in subItem.Items" :key="ind">
            <!-- <router-link :to="threeItem.url"> -->
              <div class="clearfix" @click="url(threeItem.Url)">
                <div class="icon fl">
                  <i class="col-FFA636 iconfont" :class="threeItem.Icon"></i>


                </div>
                <div class="fl center">
                  <p class="titles">{{threeItem.DisplayName}}</p>
                  <p class="description">{{threeItem.CustomData}}</p>
                </div>
              </div>
            <!-- </router-link> -->
            <div v-if="threeItem.IsEnabled" class="star" 
            @click="star(threeItem.Name,threeItem.DisplayName,threeItem.Icon,threeItem.Url,index,ind)">★</div>   
            <!-- 未收藏 -->
            <div v-else class="star open" 
            @click="offstar(threeItem.Name,threeItem.DisplayName,threeItem.Icon,threeItem.Url,index,ind)">★</div>
            <!-- 已收藏 -->
          </li>
        </ul>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
const appData = require('../../../menu.json') // 加载本地json文件
const user = appData.user  // 获取对应本地数据
import { GetPCNavigation, AddOftenMenu,RemoveOftenMenu ,GetOftenMenu} from "@/api/menu.js";
import bus from "../layout/components/bus";

export default {
  data() {
    return {
      title: "members",
      menuItems: [],
      startlist:[]
    };
  },
  methods: {
    info: function() {
      var _self = this;
      const children1 = this.$route.params.menuList;
      console.log(children1,'children1')
      if(children1 == undefined){
        const children1 = JSON.parse(localStorage.getItem('children1'));
        console.log(children1,'children1--localStorage')
        _self.menuItems=children1;
        _self.Getstartlist()
      }else{
        _self.menuItems=children1;
        _self.Getstartlist()
      }
    },
    icon(){   //拼接图片路径
      // var menuItems = this.menuItems
      // for(var f=0;f<menuItems.length;f++){
      //   if(menuItems[f].DisplayName == "会员业务"){
      //     for(var g=0;g<menuItems[f].Items.length;g++){
      //       menuItems[f].Items[g].Icon =  menuItems[f].Items[g].Icon + "col-FFA636"
      //     }
      //   }
      //   if(menuItems[f].DisplayName == "会员查询"){
      //     for(var g=0;g<menuItems[f].Items.length;g++){
      //       menuItems[f].Items[g].Icon =  menuItems[f].Items[g].Icon + "col-348EFE"
      //     }
      //   }
      // }
    },
    Getstartlist(){   //获取菜单列表
      const para ={}
      GetOftenMenu(para).then(res => {
        console.log(res);
        if(res.Success == true){
          this.startlist = res.Result.Data
          this.Contrast()
        }else{

        }
      });
    },
    Contrast(){   //对比数组过滤选中的收藏
    console.log('对比数组')
      var menuItems = this.menuItems
      var startlist = this.startlist
      for(var i = 0;i<startlist.length;i++){
        startlist[i].Title
        for(var f=0;f<menuItems.length;f++){
          for(var g=0;g<menuItems[f].Items.length;g++){
              // menuItems[f].Items[g].Icon = "../../../static/"+ menuItems[f].Items[g].Icon + ".png"
            if(startlist[i].Title == menuItems[f].Items[g].DisplayName){
              menuItems[f].Items[g].IsEnabled = false
            }
          }
        }
      }

    },
    url(url){
      console.log(url)
      this.$router.push({ path: "/"+url });
    },
    queryToggle(index){   //收起 展开
      console.log(index)
      var menuItems = this.menuItems
      if(menuItems[index].IsVisible == true){
        menuItems[index].IsVisible = false
      }else{
        menuItems[index].IsVisible = true
      }
    },
    star(Name,title,Image,Path,index,ind){   //点击收藏菜单
      var menuItems = this.menuItems
      const para = {
        Name: Name,
        Title: title,
        Image: Image,
        Path: Path
      };
      console.log(para)
      AddOftenMenu(para).then(res => {
        console.log(res.Result);
        if(res.Result.Message == "收藏成功"){
          // alert(res.Result.Message)
          menuItems[index].Items[ind].IsEnabled = false
          
          bus.$emit('nav',1);

        }else{
          alert(res.Result.Message)
        }
      });
    },
    offstar(Name,title,Image,Path,index,ind){  //取消收藏
      var menuItems = this.menuItems
      const para = {
        Name: Name
      };
      console.log(para)
      RemoveOftenMenu(para).then(res => {
        console.log(res.Result);
        if(res.Result.Message == "删除成功"){
          // alert(res.Result.Message)
          menuItems[index].Items[ind].IsEnabled = true
          bus.$emit('nav',1);

        }else{
          alert(res.Result.Message)
        }
      });
    }
  },
  created(){
      bus.$on('change', (msg) => { //Hub接收事件 this.msg = 'hehe'; 
          this.menuItems = msg;
      });

  },
  mounted() {
      this.info();
      this.icon()
      // console.log(JSON.parse(this.$route.params.userId))
      // this.menuItems = JSON.parse(this.$route.params.userId)
      //  this.Getstartlist()
       
  }
};
</script>

<style scoped>
.col-FFA636{
  color: #FFA636;
}
.col-34CCFE{
  color: #34CCFE;
}
.col-64BE67{
  color: #64BE67;
}
.col-3CBFB1{
  color: #3CBFB1;
}
.col-348EFE{
  color: #348EFE;
}





.tips{
  background: #F5F5F5;
  height: 33px;
  line-height: 33px;
  color: #444444;
  font-size: 12px;
  padding: 0 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.header_tip{
  cursor: pointer;
}
.title{
  color: #4F90DB;
  font-size: 16px;
  margin: 20px 0 0px 0;
}
.put{
  margin: 20px 0 0px 0;
  color: #999999;
}

.nav-link {
  height: auto;
  width: auto;
  overflow: hidden;
  padding-bottom: 20px;
  border-bottom: 1px dashed  #D6E2DE;
}
/* .nav-link p {
  font-size: 18px;
  line-height: 40px;
} */
.itemUL{
  width: 100%;
}
.itemUL li{
  width: 18%;
  margin-top: 20px;
  margin-right: 20px;
  float: left;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  padding: 10px;
  position: relative;
  cursor: pointer;
}
.itemUL li .icon{
  margin-top: 10px;
  margin-left: 5px;
  font-size: 60px;
}
.itemUL li .iconfont{
  font-size: 40px;
  /* color: #fff; */
  /* background: #FFA636; */
  /* padding: 10px; */
  border-radius: 5px;
}
.itemUL li .center{
  margin-left: 10px;
  width: 65%;
  overflow: hidden;

}
.itemUL li .center .description{
  line-height: 20px;
  height: 20px;
  font-size: 14px;
  color: #999999;
  overflow:hidden;
  text-overflow:ellipsis; 
  white-space:nowrap; 
}
.itemUL li .center .titles{
  font-size: 16px;
  line-height: 36px;
  overflow:hidden;
  text-overflow:ellipsis; 
  white-space:nowrap; 
}
.star{
  position: absolute;
  top: 2px;
  right: 6px;
  font-size: 18px;
  color: #D1D1D1;
}
.star.open{
  color: #18A7E1;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
   .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
      zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
</style>
