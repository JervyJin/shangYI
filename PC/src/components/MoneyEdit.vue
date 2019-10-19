<template>
  <!-- 红包编辑 -->
  <div class="container">
    <table width="100%" cellspacing="0" cellpadding="0" class="formTable">
      <tbody>
        <tr>
          <th width="45%">
            <div class="tipsBox">
              <RedPacketNotice />
            </div>
            <div class="tipsBox">
              <RedPacketNotice />
            </div>
          </th>
          <td width="55%">
            <table cellpadding="0" cellspacing="0" class="formTable" width="100%">
              <tbody>
                <tr>
                  <th width="28%">
                    <label>活动名称：</label>
                  </th>
                  <td width="72%" colspan="3">
                    <TextBox
                      inputId="ActivityName"
                      :multiline="true"
                      name="ActivityName"
                      v-model="ActivityName"
                    >
                      <span class="c-red starpos">*</span>
                    </TextBox>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label>商户名称：</label>
                  </th>
                  <td width="82%" colspan="3">
                    <TextBox
                      inputId="ShopName"
                      :multiline="true"
                      name="ShopName"
                      v-model="ShopName"
                    >
                      <span class="c-red starpos">*</span>
                    </TextBox>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label>备注：</label>
                  </th>
                  <td width="82%" colspan="3">
                    <TextBox inputId="Remark" :multiline="true" name="Remark" v-model="Remark"></TextBox>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label>祝福语：</label>
                  </th>
                  <td width="82%" colspan="3">
                    <TextBox inputId="Greeting" name="Greeting" v-model="Greeting"></TextBox>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btnstyle">
      <LinkButton @click="saveForm()" class="btnConfirm btn radius">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import RedPacketNotice from "@/components/RedPacketNotice";
export default {
  data() {
    return {
      ActivityName: "",
      ShopName: "",
      Remark: "",
      Greeting: ""
    };
  },
  components: { RedPacketNotice },
  methods: {
    saveForm() {
      var para = {
        ActivityName: this.ActivityName,
        ShopName: this.ShopName,
        Remark: this.Remark,
        Greeting: this.Greeting
      };
      console.log(para);
      this.$emit("packageEdit", para);
    }
  },
  mounted() {}
};
</script>
<style scoped>
table {
  border-collapse: collapse;
}
.formTable {
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  color: #666;
}
.formTable th,
.formTable td {
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  padding: 10px;
  font-size: 13px;
}
.formTable th {
  text-align: left;
  padding-top: 15px;
  /* width: 70px; */
  min-width: 80px;
  padding-left: 20px;
  vertical-align: top;
  background-color: #f8f8f8;
}
.tipsBox {
  border: 1px solid #ddd;
  min-width: 250px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  font-weight: normal;
  line-height: 20px;
}
.formTable div {
  margin-bottom: 6px;
  margin-right: 10px;
}
.tipsBox h1 {
  font-size: 18px;
  line-height: 28px;
  font-family: Microsoft YaHei;
}
.tipsMore {
  width: 100%;
  border-top: 1px solid #ddd;
  display: block;
  margin-top: 5px;
  padding-top: 5px;
}
.formTable th,
.formTable td {
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  padding: 10px;
  font-size: 13px;
}
.btnstyle {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
