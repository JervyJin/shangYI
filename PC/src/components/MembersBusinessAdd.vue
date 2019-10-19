<template>
  <div>
    <Form :model="MenberDialogForm" class="formStyle">

      <Tabs>
        <TabPanel :title="'基本信息'">
          <div class="formStyle_list">
            <Label for="Code">会员编号</Label>
            <TextBox inputId="Code" name="Code" v-model="MenberDialogForm.Code"></TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="NickName">会员昵称</Label>
            <TextBox inputId="NickName" name="NickName" v-model="MenberDialogForm.NickName"></TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="RealName">会员姓名</Label>
            <TextBox inputId="RealName" name="RealName" v-model="MenberDialogForm.RealName"></TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Sex">性别</Label>
            <ComboBox
              v-model="MenberDialogForm.Sex"
              :data="SexData"
              valueField="Code"
              textField="Name"
            ></ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="BirthdayType">生日类型</Label>
            <ComboBox
              v-model="MenberDialogForm.BirthdayType"
              :data="BirthdayData"
              valueField="Code"
              textField="Name"
            ></ComboBox>
          </div>

          <div class="formStyle_list">
            <Label for="Birthday">生日日期</Label>
            <DateBox ></DateBox>
            <!-- <DateBox v-model="MenberDialogForm.Birthday" format="yyyy-MM-dd" currentText="确定" closeText="取消"></DateBox> -->
          </div>
          <div class="formStyle_list">
            <Label for="Phone">手机号</Label>
            <NumberBox inputId="Phone" name="Phone" v-model="MenberDialogForm.Phone"></NumberBox>
            <span class="c-red">*</span>
          </div>

          <div class="formStyle_list">
            <Label for="LevelId">会员等级</Label>
            <ComboBox
              v-model="MenberDialogForm.LevelId"
              :data="LevelIdData"
              valueField="Code"
              textField="Name"
              placeholder="会员等级"
            ></ComboBox>
          </div>

          <div class="formStyle_list">
            <Label for="IDCardType">证件类型</Label>
            <ComboBox
              v-model="MenberDialogForm.IDCardType"
              :data="IDCardTypeData"
              valueField="Code"
              textField="Name"
            ></ComboBox>
          </div>

          <div class="formStyle_list">
            <Label for="GrowthValue">会员来源</Label>
            <ComboBox
              v-model="MenberDialogForm.Refer"
              :data="RewardSource"
              valueField="Code"
              textField="Name"
            ></ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="IDCardNo">证件号</Label>
            <NumberBox inputId="IDCardNo" name="IDCardNo" v-model="MenberDialogForm.IDCardNo"></NumberBox>
          </div>

          <div class="formStyle_list">
            <Label for="ProvinceCode">省</Label>
            <ComboBox
              valueField="Code"
              textField="Name"
              :data="ProvinceCodeData"
              v-model="MenberDialogForm.ProvinceCode"
            ></ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="CityCode">市</Label>
            <ComboBox
              valueField="Code"
              textField="Name"
              :data="CityCodeData"
              v-model="MenberDialogForm.CityCode"
              @filterChange="cityList($event)"
            ></ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="RegionCode">区</Label>
            <ComboBox
              valueField="Code"
              textField="Name"
              :data="RegionCodeData"
              v-model="MenberDialogForm.RegionCode"
            ></ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="Address">地址</Label>
            <TextBox inputId="Address" name="Address" v-model="MenberDialogForm.Address"></TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Remark">备注</Label>
            <TextBox inputId="Remark" name="Remark" v-model="MenberDialogForm.Remark"></TextBox>
          </div>
        </TabPanel>

        <!-- 奖励方案 -->
        <TabPanel :title="'纪念日'">
          <div class="container MemorialDay">
            <div class="item_list">
              <div class="formStyle_list">
                <Label for="Name">关系</Label>
                <ComboBox
                  valueField="Code"
                  textField="Name"
                  :data="NameData"
                  v-model="MenberDialogForm.ImportantList.Name"
                ></ComboBox>
              </div>
              <div class="formStyle_list">
                <Label for="DateType">日期类型</Label>
                <ComboBox
                  valueField="Code"
                  textField="Name"
                  :data="DateTypeData"
                  v-model="MenberDialogForm.ImportantList.DateType"
                ></ComboBox>
              </div>
              <div class="formStyle_list">
                <Label for="Target">类型</Label>
                <ComboBox
                  valueField="Code"
                  textField="Name"
                  :data="TargetData"
                  v-model="MenberDialogForm.ImportantList.Target"
                ></ComboBox>
              </div>
              <div class="formStyle_list">
                <Label for="Date">生日日期</Label>
                <DateBox
                  v-model="MenberDialogForm.ImportantList.Date"
                  format="MM-dd"
                  placeholder="生日日期"
                ></DateBox>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>


      <div class="f-r mt-30">
        <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel">取消</LinkButton>
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
      </div>
    </Form>
  </div>
</template>

<script>
import { GetEnumList,GetListAreaCity ,GetMemberLevel} from "@/api/members";
export default {
  data() {
    return {
      dialogStatus: "",
      RewardSource: [],
      IDCardTypeData: [],
      ProvinceCodeData: [],
      CityCodeData: [],
      RegionCodeData: [],
      BirthdayData: [],
      SexData: [],
      LevelIdData: [],
      DateTypeData: [],
      TargetData: [],
      NameData: [],
      MenberDialogForm: {
        NickName: "",
        NickName: "",
        RealName: "",
        Sex: 0,
        BirthdayType: 0,
        Birthday: null,
        BirthdayEvery: "",
        Phone: null,
        LevelId:"",
        IDCardType: 0,
        IDCardNo: null,
        Refer: 0,
        ProvinceCode: null,
        CityCode: null,
        RegionCode: null,
        CityName: "",
        Address: "",
        State: 0,
        Remark: "",
        ImportantList: [
          {
            Target: "",
            DateType: 0,
            Name: "",
            Date: new Date()
          }
        ]
      }
    };
  },
  methods: {
    //性别
    SexMode() {
      const para = {
        EnumType: "Sex_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.SexData = res.Result.Data;
      });
    },
    //生日类型、日期类型
    BirMode() {
      const para = {
        EnumType: "BirthdayType_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.BirthdayData = res.Result.Data;
        this.DateTypeData = res.Result.Data;
      });
    },
    //证件类型
    TypeMode() {
      const para = {
        EnumType: "CertificatesType_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.IDCardTypeData = res.Result.Data;
      });
    },
    //会员来源
    ReferMode() {
      const para = {
        EnumType: "Refer_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.RewardSource = res.Result.Data;
      });
    },
    //会员等级(暂无)
    LevelIdMode() {
      const para = {
        EnumType: "Refer_Mode"
      };
      GetMemberLevel(para).then(res => {
        console.log(res.Result);
        this.LevelIdData = res.Result.Data;
      });
    },
    //省
    ProvinceList(event) {
      const para = {
        Code: this.MenberDialogForm.ProvinceCode
      };
      GetListAreaCity(para).then(res => {
        console.log(res.Result);
        this.ProvinceCodeData = res.Result.Data;
      });
    },
    //市
    cityList() {
      console.log("1");
      const para = {
        Code: this.MenberDialogForm.ProvinceCode
      };
      console.log(para);
      GetListAreaCity(para).then(res => {
        console.log(res.Result);
        this.CityCodeData = res.Result.Data;
      });
    },
    //区
    AreaList() {
      console.log(obj);
      const para = {
        Code: this.MenberDialogForm.CityCode
      };
      console.log(para);
      GetListAreaCity(para).then(res => {
        console.log(res.Result);
        this.RegionCodeData = res.Result.Data;
      });
    }
  },
  mounted() {
    this.ProvinceList();
    this.LevelIdMode();
    this.ReferMode();
    this.TypeMode();
    this.BirMode();
    this.SexMode();
  }
};
</script>

<style scoped>
.formStyle_list {
  width: 50%;
  float: left;
  border-right: none;
}
</style>