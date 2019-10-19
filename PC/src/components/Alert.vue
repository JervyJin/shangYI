<template>
<!-- 短信模板 -->
  <div class="container">
    <Form :model="MenberDialogForm" class="">
      <div class="mt-20 ml-50">
        <p v-html="MenberDialogForm.Content"></p>
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
    console.log(this.newMsgCont);
    
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