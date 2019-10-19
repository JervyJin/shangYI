<template>
  <div class="content">
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <Form ref="form" :model="ruleForm">
      <div class="container mb-20">
        <van-cell-group>
          <van-field
            v-model="ruleForm.CurrentPassword"
            type="password"
            label="旧密码"
            placeholder="旧密码"
            input-align="right"
          />
          <van-field
            v-model="ruleForm.NewPassword"
            type="password"
            label="新密码"
            placeholder="新密码"
            input-align="right"
          />
          <van-field
            v-model="NewPassword"
            type="password"
            label="确认密码"
            placeholder="确认密码"
            input-align="right"
          />
        </van-cell-group>
      </div>
      <div class="pd-20">
        <div @click="Submitbtn()" class="Submitbtn">提交</div>
      </div>
    </Form>
  </div>
</template>
<script>
    import {ChangePassword} from "@/api/index";

    export default {
        data() {
            return {
                ruleForm: {
                    CurrentPassword: "",
                    NewPassword: ""
                },
                NewPassword: ""
            };
        },
        mounted: {},
        methods: {
            Submitbtn() {
                if (!this.ruleForm.CurrentPassword) {
                    this.$toast({
                        message: '请填写旧密码!!',
                        duration: 2000
                    });
                    return
                }
                if (!this.ruleForm.NewPassword) {
                    this.$toast({
                        message: '请填写新密码!!',
                        duration: 2000
                    });
                    return
                }
                if (!this.NewPassword) {
                    this.$toast({
                        message: '请确认密码!!',
                        duration: 2000
                    });
                    return
                }
                if (this.NewPassword !== this.ruleForm.NewPassword) {
                    this.$toast({
                        message: '两次密码不一致!!',
                        duration: 2000
                    });
                    return
                }
                let para = {
                    "Old": this.ruleForm.CurrentPassword,
                    "New": this.ruleForm.NewPassword,
                    "Verify": this.NewPassword
                };
                ChangePassword(para).then(res => {
                  if(res.Code == 0){
                    // this.$notify(res.Message);
                    this.$toast({
                        message: res.Message,
                        duration: 1500
                    });
                    setTimeout(this.$router.push({path: "/"}), 2000);
                  }
                });
            }
        },
        mounted() {
        }
    };
</script>
<style scoped>
  .van-cell {
    border-bottom: thin solid #e2e0e3;
  }

  .Submitbtn {
    display: inline-block;
    color: #fff;
    text-align: center
  }
</style>
