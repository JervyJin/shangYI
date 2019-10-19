<template>
  <div class="content" id="tag_search">
    <!-- <van-nav-bar title="会员标签查询" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar> -->

    <div class="content_wrap">
      <div class="container">
        <van-cell title="选择标签"
          to="/TagManagement"
          value="标签管理"
          title-style="font-weight: bold;    font-size: 16px;padding:0">
          <i class="icon iconfont member"><span>标签管理</span> &#xe64c;</i>
        </van-cell>
        <div class="mt-10 mb-15">
          <template v-for="(item,index) in tagList">
            <van-tag plain v-if="item.Name" :key="index" @click="tagbtn(item)" :class="{'listShow':item.isSelect}">
              {{item.Name}}
            </van-tag>
          </template>
          <!-- <van-tag plain>标签</van-tag>
          <van-tag plain>标签</van-tag> -->
        </div>
      </div>
      <div class="pd-20">
        <van-button type="info" class="Submitbtn" @click="Submitbtn()">查询</van-button>
      </div>
    </div>
  </div>
</template>
<script>
    import {
        MemberTagChange
    } from "@/api/index";

    export default {
        data() {
            return {
                listShow: false,
                tagList: []
            };
        },
        mounted() {
            this.getTag();
        },
        methods: {
            goBack() {
                this.$router.push({
                    path: '/index'
                })
            },
            tagbtn(tagItem) {
                tagItem.isSelect = !tagItem.isSelect;
            },
            Submitbtn() {
                var _this = this;
                // 选中标签后跳转机构会员
                let arr = [];
                _this.tagList.forEach(element => {
                    if (element.isSelect) arr.push(element.Id)
                });
                if (!arr.length) {
                    _this.$toast("请选择标签后查询");
                    return;
                }
                sessionStorage.setItem('path', this.$route.fullPath)
                this.$router.push({
                    path: "/AgencyMembers",
                    name: 'AgencyMembers',
                    query: {
                        tagList: arr.join(",")
                    }
                })
            },
            getTag() {
                let _this = this;
                let param = {
                    page: 1,
                    rows: 1000
                }
                MemberTagChange(param).then(res => {
                  if(res.Code == 0){
                    let arr = res.Rows;
                    for (let index = 0; index < arr.length; index++) {
                        arr[index].isSelect = false;
                    }
                    _this.tagList = arr;
                  }
                })
            }
        }
    };
</script>
<style scoped>
#tag_search{
  height: 100%;
  padding-bottom: 36px;
}
.content_wrap{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container{
  height: auto;
}
 [class*=van-hairline]::after{
  border-color: transparent;
}
.van-tag.listShow {
  color: #5ba1e7!important;
  border-color: #5BA1E7;
}

  .van-tag {
    width: auto;
    padding: 8px 20px;
    margin-right: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 1px solid rgba(208, 208, 208, .6);
  }

  >>> .van-cell {
    padding: .2rem 0;
  }
  >>> .container .van-cell .van-cell__title {
    font-size: 14px !important;
    color: #333;
    font-weight: normal !important;
  }
  .van-tag--plain{
    color: #333;
    border: 1px solid rgba(208, 208, 208, .6);
  }
  [class*=van-hairline]::after{
    border-color: transparent;
  }
  .member{
    font-size: 20px;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .member span{
    font-size: 12px;
    color: #666;
  }
</style>
