<template>
  <div>
    <Form class="formStyle">
      <div class="form_box">
        <div class="formStyle_list" v-for="(item,index) in Menberlist" :key="index">
          <div class="f-l">
            <Label for="Code" class="f-l"><span class="br-box">{{item.MessageType}}<br>{{item.TemplateCode}}</span></Label>
            <TextBox inputId="Code" name="Code"  :placeholder="item.MessageType" v-model="item.TemplateId"></TextBox>
          </div>
        </div>
      </div>
      <!-- <div class="f-r mt-30 mb-50">
        <LinkButton @click="closeDialog()" class="btn btn-default btn">取消</LinkButton>
        <LinkButton @click="submitForm()" class="btnConfirm">确认</LinkButton>
      </div> -->
    </Form>
  </div>
</template>
<script>
import { GetNoteTemplateId,UpdateNoteTemplateId } from "@/api/Service";
export default {
  props: {
    RegisteredEdit: {},
    required: true
  },
  data() {
    return {
      Menberlist: [],
      pointZeroData: [{ Id: "0", Name: "启用" }, { Id: "1", Name: "停用" }],
      MenberDialogForm: {
        IntegralDefaultRatio: "",
        Code: "",
        IsIntegralResetRemind: "0",
        RechargeGrade: "",
      },
      
    };
  },
  components: {},
  methods: {
    closeDialog() {
      this.$emit("closeDialog", 1);
    },
    submitForm() {
      if(this.Menberlist && this.Menberlist.length>0){
        var newlist = [];
        this.Menberlist.map((item)=>{
            newlist.push({
              "Id": item.Id,
              "MessageTemplateId": item.TemplateId
            });
        });
      }
      const para = {
        "UpdateNoteTemplateIdList":newlist
      };
      console.log(para);
      console.log(JSON.stringify(para));
      //return false;
      UpdateNoteTemplateId(para).then(res => {
        console.log(res.Result);
        if(res && res.Result && res.Result.Code == 0){
            marg.$messager.alert({
              title: "提示",
              msg: res.Result.Message
            });
            this.closeDialog();
            this.$emit("sendMessageTemplateInit", 1);
        }
      });
    },
    // 查询模板Id
    getInit() {
      this.Menberlist = [];
      console.log(this.RegisteredEdit);
      if (this.RegisteredEdit && this.RegisteredEdit.Id) {
        console.log("add"); 
      } else {
          GetNoteTemplateId().then(res => {
            console.log(res.Result);
            if(res && res.Result && res.Result.Code == 0){
                this.Menberlist = res.Result.Data;
            }
          });
      }
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
.formStyle_list .textbox-label{
  height: 58px;
  line-height: 20px;
  width: 268px;
}
.br-box{
  margin-top: 10px;
  display: inline-block;
}
.f-field{
  width: 38em;
}
</style>
