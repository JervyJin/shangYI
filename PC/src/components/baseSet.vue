<template>
  <div>
    <Form :model="MenberDialogForm" class="formStyle" ref="formvalidate" :rules="rules" @validate="errors=$event">
      <div class="formStyle_list">
        <div class="f-l">
          <Label for="Code" class="f-l">积分默认比例</Label>
          <NumberBox inputId="IntegralDefaultRatio" :spinners="false" v-model="MenberDialogForm.IntegralDefaultRatio" name="IntegralDefaultRatio" v-Tooltip="getTipOpts('IntegralDefaultRatio')" :min="1"><span class="c-red starpos">*</span></NumberBox>
          <!-- <TextBox inputId="Code" name="IntegralDefaultRatio" v-model="MenberDialogForm.IntegralDefaultRatio" placeholder="积分默认比例" v-Tooltip="getTipOpts('IntegralDefaultRatio')"></TextBox> -->
          <span>元，等于1积分（积分只能为整数，不够1积分的不积分）</span>
        </div>
      </div>
      <div class="formStyle_list">
        <div class="f-l evey-month">
          <Label for="Code" class="f-l">积分清零</Label>
          <span>启用时，将于每年的</span>
          <DateBox v-model="StartDate" format="MM-dd" name="StartDate" v-Tooltip="getTipOpts('StartDate')" ><span class="c-red starpos">*</span></DateBox>
          <span>23:00进行积分清零，首先备份所有会员积分，然后统一进行清零。</span>
        </div>
      </div>
      <div class="formStyle_list">
        <div class="f-l evey-month">
          <Label for="Code" class="f-l"></Label>
          <div
            v-for="(item,index) in pointZeroData"
            :key="index"
            class="f-l mr-10"
          >
            <RadioButton name="group2" :inputId="item.Id" :value="item.Id" v-model="MenberDialogForm.IsIntegralResetRemind"></RadioButton>
            <span :for="item">{{item.Name}}</span>
          </div>
        </div>
      </div>
      <div class="formStyle_list recharge">
        <div class="f-l">
          <Label for="Code" class="f-l">充值档次</Label>
          <TextBox
            inputId="Code"
            name="RechargeGrade"
            v-model="MenberDialogForm.RechargeGrade"
            placeholder="2,10,12,23,45"
            v-Tooltip="getTipOpts('RechargeGrade')" 
          ><span class="c-red starpos">*</span></TextBox>
        </div>
      </div>
      <div class="formStyle_list notice">
        <div class="f-l">
          <Label for="Code" class="f-l"></Label>
          <span
            class="content-tips"
          >多个金额之间以英文“,”分割（结尾请不要添加“,”）充值金额不超过20个；因微信等第三方支付最高限额问题，建议充值档次不要超过50000;</span>
        </div>
      </div>
      <div class="formStyle_list">
        <Label class="f-l" for="MarketingTotalNumber">平台名称</Label>
        <div class="f-l">
          <ComboBox
            valueField="Id"
            textField="Name"
            :data="platformNameData"
            v-model="platformNameIndex"
            name="platformNameIndex"
            v-Tooltip="getTipOpts('platformNameIndex')" 
          ><span class="c-red starpos">*</span></ComboBox>
        </div>
      </div>
      <div class="formStyle_list">
        <div class="f-l">
          <Label for="Code" class="f-l">APPID</Label>
          <TextBox inputId="Code" name="APPID" v-model="MenberDialogForm.SMSAPPID" placeholder="APPID" v-Tooltip="getTipOpts('APPID')"><span class="c-red starpos">*</span></TextBox>
        </div>
      </div>
      <div class="formStyle_list">
        <div class="f-l">
          <Label for="Code" class="f-l">短信签名</Label>
          <TextBox inputId="Code" name="SMSSignature" v-model="MenberDialogForm.SMSSignature" placeholder="短信签名" v-Tooltip="getTipOpts('SMSSignature')"><span class="c-red starpos">*</span></TextBox>
        </div>
      </div>
      <div class="formStyle_list">
        <div class="f-l">
          <Label for="Code" class="f-l">短信AccessKeySecret</Label>
          <TextBox inputId="Code" name="SMSAccessKeySecret" v-model="MenberDialogForm.SMSAccessKeySecret" placeholder="短信签名" v-Tooltip="getTipOpts('SMSAccessKeySecret')"><span class="c-red starpos">*</span></TextBox>
        </div>
      </div>
      <div class="f-r mt-30">
        <LinkButton @click="closeDialog()" class="btn btn-default btn">关闭</LinkButton>
        <LinkButton @click="submitForm()" class="btnConfirm">确认</LinkButton>
      </div>
    </Form>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import { GetSystemSetting,UpdateSystemSetting } from "@/api/Service";
export default {
  props: {
    required: true
  },
  data() {
    return {
      StartDate: dayjs().toDate(),
      Menberlistfailure: [],
      dialogStatus: "create",
      IntegralResetReminderDay: "",
      IntegralResetReminderTime: "",
      pointZeroData: [{ Id: "0", Name: "启用" }, { Id: "1", Name: "停用" }],
      platformNameIndex: "0",
      platformNameData: [{ Id: "0", Name: "阿里云" }],
      MenberDialogForm: {
        IntegralDefaultRatio: 1,
        Code: "",
        IsIntegralResetRemind: "0",
        RechargeGrade: "",
        SMSPlatformName: "",
        SMSAPPID: "",
        SMSSignature: "",
        SMSAccessKeySecret: "",
      },
      rules: {
        Name: "required"
      },
      errors: {},
    };
  },
  components: {},
  methods: {
    closeDialog() {
      this.$messager.alert({
        title: "提示",
        msg: "确认关闭吗？",
        result: r => {
          if (r) {
            this.$router.push({path:'/home'});
          }
        }
      });
    },
    submitForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "请输入标签名称"
          });
        } else {
            this.submitFormFn();
        }   
      });  
    },
    //添加
    submitFormFn: function() {
      var datetime = dayjs(this.StartDate).format("MM-DD");
      var para = {
        "UpdSystemSettingList": {
          "IntegralReset": datetime,
          "IsIntegralReset": this.MenberDialogForm.IsIntegralResetRemind == "1"?"true":"false",
          "RechargeGrade": this.MenberDialogForm.RechargeGrade,
          "IntegralDefaultRatio": this.MenberDialogForm.IntegralDefaultRatio,
          "SMSPlatformName": this.MenberDialogForm.SMSPlatformName,
          "SMSAPPID": this.MenberDialogForm.SMSAPPID,
          "SMSSignature": this.MenberDialogForm.SMSSignature,
          "SMSAccessKeySecret": this.MenberDialogForm.SMSAccessKeySecret,
        }
      };
      console.log(para);
      console.log(JSON.stringify(para));
      //return false;
      UpdateSystemSetting(para).then(res => {
        console.log(res.Result);
        if(res && res.Result && res.Result.Code == 0){
            //this.MenberDialogForm = res.Result.Data;
            marg.$messager.alert({
              title: "提示",
              msg: res.Result.Message
            });
            //this.closeDialog();
        }
      });
    },
    // 查询系统设置
    getInit() {
      var para = {
        "GetSystemSettingList":"RechargeGrade,IntegralDefaultRatio,IsIntegralResetRemind,IntegralReset,SMSPlatformName,SMSAPPID,SMSSignature,SMSAccessKeySecret"
      };
      console.log(para);
      console.log(JSON.stringify(para));
      GetSystemSetting(para).then(res => {
        console.log(res.Result);
        if(res && res.Result && res.Result.Code == 0){
            this.MenberDialogForm = res.Result.Data;
            if(res.Result.Data.IsIntegralResetRemind == "true"){
              this.MenberDialogForm.IsIntegralResetRemind = "1";
            } else {
              this.MenberDialogForm.IsIntegralResetRemind = "0";
            }
            this.MenberDialogForm.IntegralDefaultRatio = this.MenberDialogForm.IntegralDefaultRatio?Number(this.MenberDialogForm.IntegralDefaultRatio):1;
            this.StartDate = new Date(res.Result.Data.IntegralReset);
        }
      });
    },
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : null;
    },
    hasError(name) {
      return this.getError(name) != null;
    },
    getTipOpts(name) {
      return {
        content: this.getError(name),
        closed: !this.hasError(name),
        position: "right"
      };
    }
  },
  mounted() {
    this.getInit();
  }
};
</script>
<style scoped>
.formStyle {
  margin-top: 20px;
  border-top: 1px solid #e0e6ed;
}
.btn {
  width: 86px;
  height: 40px;
}
.evey-month .f-field {
  width: 12.5em;
}
.recharge .f-field {
  width: 50rem;
}
.notice {
  line-height: 24px;
  height: 74px;
  position: relative;
}
.content-tips {
  line-height: 20px;
  background-color: #ffffcc;
  border: 1px dashed #cc9933;
  color: #cc9933;
  margin: 10px auto;
  display: inline-block;
  padding: 5px 10px;
  position: absolute;
  margin-right: 10px;
}
.notice .textbox-label {
  height: 73px;
}
</style>
