<template>
  <div class="content">
    <!-- <van-nav-bar title="新增客诉" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar> -->
    <div class="container">
      <van-cell-group>
        <van-field
          v-model="name"
          type="text"
          label="投诉人姓名"
          placeholder="请输入姓名"
          input-align="right"
        />
        <van-field
          v-model="MobilePhone"
          type="number"
          label="会员手机号"
          placeholder="请输入会员手机号"
          input-align="right"
        />
        <van-field
          v-model="phone"
          type="number"
          label="联系电话"
          placeholder="联系电话"
          input-align="right"
        />
        <div class="dropdown-menu">
          <div class="f-l f-14">投诉途径</div>
          <van-dropdown-menu class="f-r">
            <van-dropdown-item v-model="value" :options="option" />
          </van-dropdown-menu>
        </div>
      </van-cell-group>
    </div>
    <!--  -->
    <div class="container">
      <div class="h4style">投诉内容</div>
      <div class="infoCon_reply">
        <van-cell-group>
          <van-field v-model="opinion" placeholder="请输入投诉内容" type="textarea" />
        </van-cell-group>
      </div>
    </div>

    <div class="pd-20">
      <van-button type="info" class="Submitbtn" @click="addTS">提交</van-button>
    </div>
  </div>
</template>
<script>
import { addClyj, getEnumList } from "../../api/hy";
export default {
  data() {
    return {
      name: "",
      MobilePhone: "",
      phone: "",
      opinion: "",
      value: 0,
      // option: [
      //   { text: "网站", value: 0 },
      //   { text: "微信", value: 1 },
      //   ,
      //   { text: "电话", value: 2 },
      //   ,
      //   { text: "到店", value: 3 }
      // ],
      option: []
    };
  },
  methods: {
    addTS() {
      if (!this.name) {
        this.$toast({
          message: "请填写姓名!!",
          duration: 2000
        });
        return;
      }
      if (!this.MobilePhone) {
        this.$toast({
          message: "请填写手机号!!",
          duration: 2000
        });
        return;
      }
      if (!this.phone) {
        this.$toast({
          message: "请填写联系电话!!",
          duration: 2000
        });
        return;
      }
      if (!this.opinion) {
        this.$toast({
          message: "请填写处理意见 !!",
          duration: 2000
        });
        return;
      }
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您确定要提交处理意见吗?"
        })
        .then(() => {
          addClyj({
            MemberName: this.name,
            MemberPhone: this.MobilePhone,
            LinkTel: this.phone,
            Way: this.value,
            Content: this.opinion
          }).then(res => {
            if (res.Code == 0) {
              this.$toast({
                message: res.Message,
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/Complain"
                });
              }, 2000);
            }
          });
        })
        .catch(() => {});
    }
  },
  created() {
    getEnumList("Complaint_Way").then(res => {
      // console.log(res);
      res.Data.map(item => {
        this.option.push({
          text: item.Name,
          value: item.Code
        });
      });
      // console.log(this.option)
    });
  }
};
</script>
<style scoped>
.van-cell {
  border-bottom: 1px solid #eeeeee;
  color: #333333;
}

.infoCon_reply .van-cell {
  background: rgba(246, 243, 247, 1);
  padding: 0;
  width: 100%;
  height: auto;
  margin-top: 0;
  overflow: hidden;
  margin-bottom: 20px;
  border-bottom: none;
  padding: 10px;
}

.dropdown-menu,
.dropdown-menu .van-dropdown-menu {
  height: 45px;
  line-height: 45px;
  padding: 0 0.42667rem;
}

.h4style {
  border-bottom: none;
}
/* 修改 */
.van-hairline--top-bottom::after {
  border: none;
}
.infoCon_reply {
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
</style>
<style>
.dropdown-menu .van-dropdown-menu__title::after {
  top: 17px;
  margin-top: 2px;
  right: -10px;
  /* transform: rotate(-135deg); */
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  border-top: 1px solid #656565;
  border-right: 1px solid #656565;
  border-left: none;
  border-bottom: none;
  transform: rotate(45deg);
}

.dropdown-menu .van-popup {
  padding: 0 20px;
}
.van-dropdown-menu__title--down::after {
  margin-top: 2px;
}
</style>
