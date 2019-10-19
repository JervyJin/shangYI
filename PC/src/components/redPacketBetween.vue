<template>
  <!-- 选择套餐 -->
  <div class="container pd-10">
    <!-- 搜索 -->
    <div class="formStyle_list">
      <Label for="Name">红包最小值</Label>
      <NumberBox
        v-model="MenberDialogForm.HongBaoMin"
        inputId="MenberDialogForm.HongBaoMin"
        name="MenberDialogForm.HongBaoMin"
        :min="0"
      ></NumberBox>
    </div>  
    <div class="formStyle_list">
      <Label for="Name">红包最大值</Label>
      <NumberBox
        v-model="MenberDialogForm.HongBaoMax"
        inputId="MenberDialogForm.HongBaoMax"
        name="MenberDialogForm.HongBaoMax"
        :min="0"
      ></NumberBox>
    </div>  
    <div class="formStyle_list">
        <Label for="IsTransmit" class="f-l">红包发放总额</Label>
          <div
            v-for="(item,index) in allMoneyAccount"
            :key="index"
            class="f-l mr-10"
          >
            <RadioButton
              name="group1"
              :inputId="item.Id"
              :value="item.Id"
              v-model="IsCustomize"
            ></RadioButton>
            <span :for="item">{{item.Name}}</span>
          </div>
          <NumberBox
            v-model="MenberDialogForm.TotalAmount"
            inputId="MenberDialogForm.TotalAmount"
            name="MenberDialogForm.TotalAmount"
            :min="0"
            v-if="this.IsCustomize == 1"
          ></NumberBox>
    </div>       
    <div class="formStyle_list">
      <Label for="Birthday">发放日期</Label>
      <DateBox
        v-model="MenberDialogForm.BeginTime"
        format="yyyy-MM-dd"
        placeholder="操作日期 （起）"
      ></DateBox>
      <span class="mr-10 ml-10">至</span>
      <DateBox
        v-model="MenberDialogForm.EndTime"
        format="yyyy-MM-dd"
        placeholder="操作日期 （止）"
      ></DateBox>
    </div>  
    <div class="mt-20 mr-10 f-r">
      <LinkButton @click="showParentComp" class="btnConfirm btn radius">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { MemberGetComboAward } from "@/api/members";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      IsCustomize:"0",
       allMoneyAccount: [
        {
          Id: "0",
          Name: "不限"
        },
        {
          Id: "1",
          Name: "自定义金额数"
        }
      ],
      MenberDialogForm:{
        HongBaoMin:0, //红包最小值
        HongBaoMax:0,//红包最大值
        IsCustomize:false,//是否自定义总额
        TotalAmount:0,//自定义总额
        BeginTime:new Date(),//红包区间开始日期
        EndTime:new Date(),//红包区间结束日期
      }

    };
  },
  methods: {
    // 获取用户列表
    getUsers() {
       this.IsCustomize = "0";
       this.allMoneyAccount = [
        {
          Id: "0",
          Name: "不限"
        },
        {
          Id: "1",
          Name: "自定义金额数"
        }
      ];
      this.MenberDialogForm = {
        HongBaoMin:0, //红包最小值
        HongBaoMax:0,//红包最大值
        IsCustomize:false,//是否自定义总额
        TotalAmount:0,//自定义总额
        BeginTime:new Date(),//红包区间开始日期
        EndTime:new Date(),//红包区间结束日期
      }
    },
    //确认提交
    showParentComp() {
      var BeginTime = parseTime(
          this.MenberDialogForm.BeginTime,
          "{yyyy}-{mm}-{dd}"+" 00:00:00"
        );
      var EndTime = parseTime(
          this.MenberDialogForm.EndTime,
          "{yyyy}-{mm}-{dd}"+" 23:59:59"
        );
        this.MenberDialogForm.BeginTime = BeginTime;
        this.MenberDialogForm.EndTime = EndTime;
        if(this.IsCustomize == 1){

        } else {
          this.MenberDialogForm.TotalAmount = "不限";
        }
      this.$emit("getRedPacketBetween",this.MenberDialogForm)
    },
  },
  mounted() {
    this.getUsers();
  }
};
</script>
<style scoped>
.btnConfirm{
  margin-top: 50px;
}
</style>

