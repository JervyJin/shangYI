<template>
  <div>
    <Form class="formStyle">
      <div class="form_box">
        <div class="formStyle_list text">
          <Label for="Remark">功能名称</Label>
          <span>{{MenberDialogForm.FunctionName}}</span>
        </div>
        <div class="formStyle_list text">
          <Label for="Remark">模板编号</Label>
          <span>{{MenberDialogForm.TemplateCode}}</span>
        </div>
        <div class="formStyle_list text">
          <Label for="Remark">模板标题</Label>
          <span>{{MenberDialogForm.MessageType}}</span>
        </div>
        <div class="formStyle_list">
          <div class="f-l">
            <Label for="Code" class="f-l"><span class="br-box">模板ID</span></Label>
            <TextBox inputId="Code" name="Code"  v-model="MenberDialogForm.TemplateId"></TextBox>
          </div>
        </div>
        <div class="formStyle_list example">
          <Label for="Remark">样例</Label>
          <span v-html="MenberDialogForm.Example" v-if="MenberDialogForm.Example"></span>
          <span v-else>暂无</span>
        </div>
      </div>
      <!-- <div class="f-r mt-30 mb-50">
        <LinkButton @click="closeDialog()" class="btn btn-default btn">取消</LinkButton>
        <LinkButton @click="submitForm()" class="btnConfirm">保存</LinkButton>
      </div> -->
    </Form>
  </div>
</template>
<script>
import { GetNoteTemplateById,UpdateNoteTemplate } from "@/api/Service";
export default {
  props: {
    RegisteredEdit: {},
    required: true
  },
  data() {
    return {
      Menberlist: [],
      MenberDialogForm: {
        ZId: 0,
        FunctionName: "",
        TemplateCode: "0",
        MessageType: "",
        TemplateId: "",
        Example: "",
        TopContent: "",
        BottomContent: "",
        Url: "",
      },
      
    };
  },
  components: {},
  methods: {
    closeDialog() {
      this.$emit("closeDialog", 1);
    },
    //编辑保存
    submitForm() {
      const para = this.MenberDialogForm;
      console.log(para);
      console.log(JSON.stringify(para));
      //return false;
      UpdateNoteTemplate(para).then(res => {
        console.log(res.Result);
        if(res && res.Result && res.Result.Code == 0){
            marg.$messager.alert({
              title: "提示",
              msg: res.Result.Message
            });
            this.closeDialog();
            this.$emit("sendEditMessageTemplateInit", 1);
        }
      });
    },
    getInit() {
      const para = this.RegisteredEdit;
      console.log(para);
      GetNoteTemplateById(para).then(res => {
          console.log(res.Result);   
          if(res && res.Result && res.Result.Code == 0){
              this.MenberDialogForm = res.Result.Data;
          }            
      });
    },
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
.formStyle_list{
  height: 59px;
  line-height: 55px;
}
.formStyle_list.example{
  height: 148px;
  line-height: 18px;
  display: flex;
}
.formStyle_list.example span{
  width: 300px;margin-left: 10px;
  margin-top: 10px;
}
.formStyle_list .textbox-label{
  height: 58px;
  line-height: 20px;
  width: 268px;
}
.formStyle_list.example .textbox-label{
  height: 147px;
  line-height: 147px;
  width: 268px;
}
.formStyle_list.text .textbox-label{
  height: 58px;
  line-height: 58px;
  width: 268px;
}
.br-box{
  margin-top: 18px;
  display: inline-block;
}
.f-field{
  width: 38em;
}
</style>
