<template>
  <div class="content">
    <van-nav-bar title="基本情况" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    
    <div>
      
    </div>
  </div>
</template>

<script>
import {
  getStaffEndMemberDetails,
  updateStaffEndMemberDetails
} from "../../api/hy";
import dayjs from "dayjs";
export default {
  name: "MemberInfo",
  data() {
    return {
      photo: "",
      sexvalue: 0,
      sex: [{ text: "男", value: 0 }, { text: "女", value: 1 }],
      show: false,
      currentDate: new Date(),
      info: {},
      birthday: ""
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        path: `/MemberDetails/${this.$route.params.id}`
      });
    },
    showBirthday() {
      this.show = true;
    },
    handleConfirm(val) {
      this.birthday = val;
      this.info.Birthday = dayjs(val).format("YYYY-MM-DD");
      this.show = false;
    },
    handleCancel() {
      this.Birthday = "";
      this.show = false;
    },
    getStaffEndMemberDetails() {
      getStaffEndMemberDetails(this.$route.params.id).then(res => {
        if (res.Data) {
          this.birthday = new Date(res.Data.Birthday);
          res.Data.Birthday = res.Data.Birthday
            ? res.Data.Birthday.substring(0, 10)
            : "";
          res.Data.Sex = res.Data.Sex === "男" ? 0 : 1;
          this.info = res.Data;
        }
      });
    },
    save() {
      if (!this.info.RealName) {
        this.$toast({
          message: "请填写姓名!!",
          duration: 2000
        });
        return;
      }
      if (!this.info.NickName) {
        this.$toast({
          message: "请填写昵称!!",
          duration: 2000
        });
        return;
      }
      if (!this.info.Address) {
        this.$toast({
          message: "请填写地址!!",
          duration: 2000
        });
        return;
      }
      updateStaffEndMemberDetails({
        Id: this.info.Id,
        RealName: this.info.RealName,
        NickName: this.info.NickName,
        Birthday: this.birthday,
        Address: this.info.Address,
        Remark: this.info.Remark,
        Sex: 0
      }).then(res => {
        this.$toast({
          message: "修改成功!!",
          duration: 2000
        });
        setTimeout(() => {
          this.$router.push({
            path: "/MemberDetails/" + this.$route.params.id
          });
        }, 2000);
      });
    }
  },
  created() {
    this.getStaffEndMemberDetails();
  }
};
</script>

<style scoped>
.dropdown-menu,
.dropdown-menu .van-dropdown-menu {
  height: 45px;
  padding: 0 0.42667rem;
  border-bottom: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.van-dropdown-menu:after {
  border: none;
}
/* 修改 */
.van-cell-group::after {
  border-bottom: 1px solid red;
}
.container .van-cell-group:last-child .van-cell-group:after{ border-bottom: none}
</style>
