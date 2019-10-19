<template>
  <div class="content">
    <van-nav-bar title="基本情况" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="container">
      <van-cell-group>
        <van-field v-model="info.RealName" label="姓名" placeholder="请输入姓名" input-align="right" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="info.NickName" label="昵称" placeholder="请输入昵称" input-align="right" />
      </van-cell-group>
      <div class="dropdown-menu border-bottom">
        <div class="f-l f-14">性别</div>
        <van-dropdown-menu class="f-r">
          <van-dropdown-item v-model="info.Sex" :options="sex" />
        </van-dropdown-menu>
      </div>
      <van-cell-group>
        <van-field
          v-model="info.Birthday"
          input-align="right"
          disabled
          clearable
          label="生日"
          is-link
          @click="showBirthday"
        />
      </van-cell-group>
      <van-popup v-model="show" position="bottom" :style="{ height: '40%'}">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="new Date('1970/01/01')"
          :max-date="new Date()"
          @confirm="handleConfirm"
          @cancel="handleCancel"
          class="tets"
        />
      </van-popup>
      <van-cell-group>
        <van-field
          v-model="info.Address"
          label="详细地址"
          input-align="right"
          type="textarea"
          placeholder="请输入详细地址"
          rows="1"
          autosize
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="info.Remark"
          label="备注"
          input-align="right"
          type="textarea"
          placeholder="请输入备注"
          rows="1"
          autosize
        />
      </van-cell-group>
      <div class="pd-20">
        <van-button type="info" class="Submitbtn" @click="save">提交</van-button>
      </div>
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
.content .container:last-child .van-cell-group:after{ border-bottom: none}
</style>
