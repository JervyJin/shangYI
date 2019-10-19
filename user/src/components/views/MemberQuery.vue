<template>
  <div class="content">
    <van-nav-bar title="会员查询" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="container" v-if="hasData">
      <van-cell-group>
        <van-cell title="手机号码" v-model="Phone" />
        <van-cell title="姓名" v-model="Name" />
        <van-cell title="会员等级" v-model="MemberLevel" />
        <van-cell title="注册机构" v-model="OriginOrganizationName" />
        <van-cell title="所属促销员" v-model="OriginUserName" />
      </van-cell-group>
    </div>
    <div class="pd-20" v-if="hasData">
      <van-button type="info" size="small" class="Submitbtn" @click="Submitbtn()">查看会员详情</van-button>
    </div>
     <img src="../../assets/noData.png" class="noData" v-if="!hasData" alt />
  </div>
</template>
<script>
import { getMemberInfo } from "@/api/memberQuery";
export default {
  data() {
    return {
			Phone:"",
			Name:"",
			MemberLevel:"",
			OriginOrganizationName:"",
			OriginUserName:"",
      MemberId:"",
      hasData:false
		};
  },
  methods: {
		init(){
			let phone = localStorage.getItem("phone");//this.$route.params.phone;
			let getMemberParams={"memberPhone":phone};
			//console.log(getMemberParams);
			getMemberInfo(getMemberParams).then(res => {
				if(res.Data&&res.Code == 0) {
          localStorage.setItem("MemberId",res.Data.MemberId);
          this.MemberId = res.Data.MemberId;
          this.Phone = res.Data.Phone;
          this.Name = res.Data.Name;
          this.MemberLevel = res.Data.MemberLevel;
          this.OriginOrganizationName = res.Data.OriginOrganizationName;
          this.OriginUserName = res.Data.OriginUserName;
          this.hasData = true;
        }
			}).catch((err) =>{
        this.hasData = false;
      });
		},
    Submitbtn() {
		  if(!this.MemberId) return
      sessionStorage.setItem('memberPath', this.$route.fullPath)
      this.$router.push({
        path: `/MemberDetails/${this.MemberId}`
			});
    },
    goBack() {
		  this.$router.push({
        path: '/MemberBusiness'
      })
    }
  },
	mounted() {
		this.init();
	},
};
</script>
<style scoped>
.noData{
  width :100%;
}
</style>
