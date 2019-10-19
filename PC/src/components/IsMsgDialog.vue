<template>
<!-- 短信模板 -->
  <div class="container">
    <Form :model="MenberDialogForm" class="formStyle">
      <!-- <div class="formStyle_list">
        <Label for="MarketingRangeType">选择模板</Label>
        <ComboBox
          v-model="MenberDialogForm.Template"
          :data="TemplateData"
          valueField="Code"
          textField="Name"
          style="width:300px"
        ></ComboBox>
      </div> -->
      <div class="formStyle_list mt-20" style="height:130px;border-top:1px solid #e0e6ed">
        <Label for="Remark" style="line-heiht:128px;height:128px">模板内容</Label>
        <TextBox
          inputId="Remark"
          :multiline="true"
          name="Remark"
          v-model="MenberDialogForm.Content"
          style="height:110px;width:300px;padding:5px;margin-bottom: 8px;"
          placeholder="请输入"
        ></TextBox>
      </div>
      <div class="formStyle_list">
        <ul>
          <li>[会员编码]</li>
          <li>[会员姓名]</li>
          <li>[会员性别]</li>
          <li>[会员手机号码]</li>
          <li>[会员生日]</li>
          <li>[商户名称]</li>
          <li>[客服电话]</li>
        </ul>
      </div>
      <div class="f-r mt-30">
        <LinkButton @click="saveForm()" class="btnConfirm">保存</LinkButton>
      </div>
    </Form>
  </div>
</template>
<script>
export default {
  props: {
      newMsgCont: String,
      newMessageCont: String
  },
  data() {
    return {
      TemplateData: [],
      dataType:"",
      MenberDialogForm: {
        Template: "",
        Content: ""
      }
    };
  },
  methods: {
    saveForm() {
      this.dataType =this.MenberDialogForm.Content;
      this.$emit("IsMsgValue",this.dataType);
    },
  },
  mounted() {
    console.log(66666);
    console.log(this.newMsgCont);
    console.log(77777);
    
    if(this.newMsgCont){
      this.MenberDialogForm.Content = this.newMsgCont;
    }
    if(this.newMessageCont){
      this.MenberDialogForm.Content = this.newMessageCont;
    }
  }
};
</script>
<style scoped>
.formStyle_list li {
  width: auto;
  float: left;
  margin-left: 10px;
}
</style>