<template>
  <div class="container MemberBusiness">
    <Tabs class="Tabsstyle bordertop mt-10">
      <TabPanel :title="'会员信息'">
      <!-- <TabPanel> -->

        <div class="query ml-5 mb-10">
          <TextBox placeholder="会员编号/手机号 " v-model="memberCodeOrPhone">
            <Addon>
              <span
                v-if="memberCodeOrPhone"
                class="textbox-icon icon-clear"
                title="Clear value"
                @click="memberCodeOrPhone=null"
              ></span>
            </Addon>
          </TextBox>
          <LinkButton
            class="iconfont iconsousuo btn-query btn mr-10 ml-10" @click="MenberSearchTop()">搜索</LinkButton>
          <LinkButton class="btnAdd btn-primary radius marginTop mr-10 iconfont iconadd f-16" @click="handleAdd">添加会员</LinkButton>
          <LinkButton class="btnAdd btn-primary radius marginTop" @click="handleEdit">编辑会员</LinkButton>
        </div>
        <div class="pd-5" style="padding-top:0">
          <h4>
            <span></span>基础信息
          </h4>
          <table class="tableStyle">
            <!-- <tr>
              <th>会员编号</th>
              <td>{{Code}}</td>
            </tr>-->
            <tr>
              <th>姓名</th>
              <td>{{RealName}}</td>
            </tr>
            <tr>
              <th>头像</th>
              <td class="text-overflow" v-if="HeadPortrait">
                <img :src="HeadPortrait" alt class="face" />
              </td>
            </tr>
            <tr>
              <th>性别</th>
              <td>{{Sex}}</td>
            </tr>
            <tr>
              <th>生日</th>
              <td>{{BirthdayEvery}}</td>
            </tr>
            <tr>
              <th>会员等级</th>
              <td class="cont-box" :title="LevelName"><div class="cont">{{LevelName}}</div></td>
            </tr>
            <tr>
              <th>注册来源</th>
              <td>{{Refer}}</td>
            </tr>
            <tr>
              <th>注册时间</th>
              <td>{{CreatorTime}}</td>
            </tr>
            <tr>
              <th>积分</th>
              <td>{{Score}}</td>
            </tr>
            <tr>
              <th>手机</th>
              <td>{{Phone}}</td>
            </tr>
            <tr>
              <th>注册机构</th>
              <td>{{OriginOrganizationName}}</td>
            </tr>
            <tr>
              <th>余额</th>
              <td>{{Amount}}</td>
            </tr>
            <tr>
              <th>微信绑定</th>
              <td>{{IsWx}}</td>
            </tr>
            <tr>
              <th>红包金额</th>
              <td>{{HongBaoAmount}}</td>
            </tr>
            <tr>
              <th>成长值</th>
              <td>{{GrowthValue }}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <!-- <tr>
              <th>绑定微信卡号</th>
              <td>{{WechatUnionId}}</td>
            </tr>
            <tr>
              <th>微信卡号</th>
              <td>{{WechatOpenId}}</td>
            </tr>-->
          </table>
          <h4 style="border-top:none">
            <span></span>纪念日
          </h4>
          <DataGrid :data="Menberlist" style="min-height:200px">
            <GridColumn field="Name" title="关系"></GridColumn>
            <GridColumn field="Target" title="纪念日"></GridColumn>
            <GridColumn field="Date" title="时间"></GridColumn>
            <GridColumn field="DateType" title="时间类型"></GridColumn>
          </DataGrid>
        </div>
      </TabPanel>
      <!-- 奖励方案 -->
      <TabPanel :title="'账户管理'" v-if="this.TabShow==true">
        <AccountManagement :MenberID="MenberInfo" @childValue="childValue"></AccountManagement>
      </TabPanel>
      <TabPanel :title="'操作查询'" v-if="this.TabShow==true">
        <h4 class="mt-20" style="border-bottom:1px solid #dfdfdf">
          <span></span>操作查询
        </h4>
        <div class="btnwidth pd-15">
          <LinkButton class="btn btn-primary radius">
            <div @click="StoresSalePhoto()">商品销售</div>
          </LinkButton>
          <LinkButton class="btn btn-primary radius">
           <div @click="MemberPhoto()">会员操作记录</div>
          </LinkButton>
          <LinkButton class="btn btn-primary radius">
           <div @click="MarketArchInfoPhoto()">券信息查询</div>
          </LinkButton>
        </div>
      </TabPanel>
    </Tabs>

    <!-- 添加会员信息 -->
    <Dialog
      ref="MenberAddDialog"
      title="会员"
      :dialogStyle="{width:'1000px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="MenberDialogForm" class="formStyle" style="margin-top:0" ref="form" :rules="rules" @validate="errors=$event">
        <Tabs class="Tabsstyle MemberBusiness">
          <TabPanel :title="'基本信息'">
            <!-- <div class="formStyle_list">
              <Label for="Code">会员编号</Label>
              <TextBox inputId="Code" name="Code" v-model="MenberDialogForm.Code"></TextBox>
            </div>-->
            <div class="formStyle_list">
              <Label for="RealName">会员姓名</Label>
              <TextBox inputId="RealName" name="RealName" v-model="MenberDialogForm.RealName" v-Tooltip="getTipOpts('RealName')"><span class="c-red starpos">*</span>
</TextBox>
            </div>
            <div class="formStyle_list">
              <Label for="NickName">会员昵称</Label>
              <TextBox inputId="NickName" name="NickName" v-model="MenberDialogForm.NickName"></TextBox>
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
              <DateBox
                v-model="MenberDialogForm.Birthday"
                format="yyyy-MM-dd"
                :disabled="this.dialogStatus !='create'"
                name="Birthday"
                v-Tooltip="getTipOpts('Birthday')"
              ><span class="c-red starpos">*</span></DateBox>
            </div>
            <div class="formStyle_list">
              <Label for="Phone">手机号</Label>
              <TextBox inputId="Phone" name="Phone" v-model="MenberDialogForm.Phone" v-Tooltip="getTipOpts('Phone')">
                <span class="c-red starpos">*</span>
              </TextBox>
            </div>

            <div class="formStyle_list">
              <Label for="LevelId">会员等级</Label>
              <ComboBox
                v-model="MenberDialogForm.LevelId"
                :data="LevelIdData"
                valueField="Id"
                textField="Name"
                class="pr-20"
                :disabled="this.dialogStatus !='create'"
                name="LevelId"
                v-Tooltip="getTipOpts('LevelId')"
              >
                <span class="c-red starpos">*</span>
              </ComboBox>
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
              <Label for="IDCardNo">证件号</Label>
              <TextBox inputId="IDCardNo" name="IDCardNo" v-model="MenberDialogForm.IDCardNo"></TextBox>
            </div>

            <!-- <div class="formStyle_list">
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
            </div>-->
            <div class="formStyle_list">
              <Label for="Address">地址</Label>
              <TextBox inputId="Address" name="Address" v-model="MenberDialogForm.Address"></TextBox>
            </div>
            <div class="formStyle_list" style="border-right:1px solid #e0e6ed">
              <Label for="Remark">备注</Label>
              <TextBox inputId="Remark" name="Remark" v-model="MenberDialogForm.Remark"></TextBox>
            </div>
          </TabPanel>
          <!-- 奖励方案 -->
          <TabPanel :title="'纪念日'">
            <LinkButton class="btnAdd btn-primary radius iconfont iconadd f-16 f-r mb-5 mt-5" @click="addRow()">添加</LinkButton>
            <div class="container MemorialDay border-left">
              <div class="item_list border-top">
                <table>
                  <tr>
                    <th>关系</th>
                    <th>纪念日类型</th>
                    <th>日期类型</th>
                    <th>日期</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item,index) in testList" :key="index">
                    <td>
                      <ComboBox
                        valueField="Name"
                        textField="Name"
                        :data="NameData"
                        v-model="item.Name"
                      ></ComboBox>
                    </td>
                    <td>
                      <ComboBox
                        valueField="Name"
                        textField="Name"
                        :data="TargetData"
                        v-model="item.Target"
                      ></ComboBox>
                    </td>
                    <td>
                      <ComboBox
                        valueField="Code"
                        textField="Name"
                        :data="DateTypeData"
                        v-model="item.DateType"
                      ></ComboBox>
                    </td>

                    <td>
                      <DateBox v-model="item.Date" format="yyyy-MM-dd" placeholder="日期"></DateBox>
                    </td>
                    <td style="white-space:nowrap;">
                      <LinkButton class="btnEdit" @click="delRow(index)">删除</LinkButton>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </TabPanel>
        </Tabs>
        <!-- <div class="f-r mt-30">
          <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel btn">取消</LinkButton>
          <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm btn">确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm btn">保存</LinkButton>
        </div> -->
      </Form>
      <template v-slot:footer>

        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel">取消</LinkButton>

      </template>
    </Dialog>
  </div>
</template>
<script>
import AccountManagement from "../../components/AccountManagement";
import {
  MemberAdd,
  MemberEdit,
  MemberEditSave,
  GetListAreaCity,
  GetEnumList,
  GetMemberPhone,
  GetMemberInfoById,
  GetMemberLevel,
  MemberImportantList
} from "@/api/members";
import { parseTime } from "@/utils/index";
export default {
  components: {
    AccountManagement
  },
  created() {},
  data() {
    return {
      testList: [],
      MemorialDaydata: [],
      memberCodeOrPhone: "",
      Id: "",
      MenberInfoALL: {},
      MenberInfo: {},
      Code: "",
      RealName: "",
      CreatorTime: "",
      HeadPortrait: "",
      Sex: null,
      BirthdayType: null,
      BirthdayEvery: "",
      LevelName: "",
      Refer: null,
      OriginOrganizationId: "",
      OriginOrganizationName: "",
      Phone: "",
      Score: null,
      Amount: null,
      GrowthValue: null,
      IsWx: null,
      WechatUnionId: "",
      WechatOpenId: "",
      HongBaoAmount: null,
      Menberlist: [],
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
      TargetData: [
        {
          Code: 0,
          Name: "百天"
        },
        {
          Code: 1,
          Name: "生日"
        },
        {
          Code: 2,
          Name: "过寿"
        },
        {
          Code: 3,
          Name: "求婚"
        },
        {
          Code: 4,
          Name: "订婚"
        },
        {
          Code: 5,
          Name: "结婚"
        }
      ],
      NameData: [
        {
          Code: 0,
          Name: "妻子"
        },
        {
          Code: 1,
          Name: "老公"
        },
        {
          Code: 2,
          Name: "儿子"
        },
        {
          Code: 3,
          Name: "女儿"
        },
        {
          Code: 4,
          Name: "父亲"
        },
        {
          Code: 5,
          Name: "母亲"
        },
        {
          Code: 6,
          Name: "岳母"
        },
        {
          Code: 7,
          Name: "岳父"
        },

        {
          Code: 8,
          Name: "婆婆"
        },

        {
          Code: 9,
          Name: "儿媳"
        },
        {
          Code: 10,
          Name: "女婿"
        },
        {
          Code: 11,
          Name: "孙子"
        },
        {
          Code: 12,
          Name: "孙女"
        },
        {
          Code: 13,
          Name: "哥哥"
        },
        {
          Code: 14,
          Name: "姐姐"
        },
        {
          Code: 15,
          Name: "弟弟"
        },

        {
          Code: 16,
          Name: "祖父"
        },
        {
          Code: 17,
          Name: "祖母"
        },
        {
          Code: 18,
          Name: "老师"
        },

        {
          Code: 19,
          Name: "同学"
        },
        {
          Code: 20,
          Name: "领导"
        }
      ],
      TabShow: false,
      MenberDialogForm: {
        Code: "",
        NickName: "",
        RealName: "",
        Sex: 0,
        BirthdayType: 0,
        Birthday: new Date(),
        // BirthdayStr: parseTime(new Date(), "{yyyy}-{mm}-{dd} {h}:{i}:{s}"),
        // BirthdayEvery: "",
        // Refer: 0,
        Phone: null,
        LevelId: null,
        LevelName: "",
        IDCardType: 0,
        IDCardNo: null,
        ProvinceCode: null,
        CityCode: null,
        RegionCode: null,
        CityName: "",
        Address: "",
        Remark: "",
        ImportantList: []
      },
      rules: {
        RealName: "required",
        Phone: ["required","length[11,11]"],
        Birthday: "required",
        LevelId: "required",
      },
      errors: {},
    };
  },
  methods: {
    childValue(data) {
      console.log("积分", data);
      if (data == 0) {
        this.MenberSearchTop();
      }
    },
    //头部搜索
    MenberSearchTop() {
      if (this.memberCodeOrPhone == "") {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息",
          ok: "确认"
        });
      } else {
        this.MenberInfo = null;
        const para = {
          memberCodeOrPhone: this.memberCodeOrPhone
        };
        GetMemberPhone(para).then(res => {
          console.log("会员信息", res.Result);
          if (res.Result.Code == 0) {
            this.MenberInfo = res.Result.Data;
            this.Id = res.Result.Data.Id;
            this.CreatorTime = res.Result.Data.CreatorTime;
            this.Code = res.Result.Data.Code;
            this.RealName = res.Result.Data.RealName;
            this.HeadPortrait = res.Result.Data.HeadPortrait;
            this.BirthdayType = res.Result.Data.BirthdayType;
            this.BirthdayEvery = res.Result.Data.BirthdayEvery;
            this.LevelName = res.Result.Data.LevelName;
            this.Refer = res.Result.Data.Refer;
            this.OriginOrganizationId = res.Result.Data.OriginOrganizationId;
            this.OriginOrganizationName =
              res.Result.Data.OriginOrganizationName;
            this.Phone = res.Result.Data.Phone;
            this.Score = res.Result.Data.Score;
            this.Amount = res.Result.Data.Amount;
            this.GrowthValue = res.Result.Data.GrowthValue;
            this.IsWx = res.Result.Data.IsWx;
            this.WechatUnionId = res.Result.Data.WechatUnionId;
            this.WechatOpenId = res.Result.Data.WechatOpenId;
            this.HongBaoAmount = res.Result.Data.HongBaoAmount;
            this.Sex = res.Result.Data.Sex;
            if (this.Sex == 0) {
              this.Sex = "男";
            } else {
              this.Sex = "女";
            }
            if (this.IsWx == false) {
              this.IsWx = "否";
            } else {
              this.IsWx = "是";
            }
            const para1 = {
              Id: res.Result.Data.Id
            };
            console.log(para1);
            MemberImportantList(para1).then(res => {
              console.log(res.Result.Data);
              this.Menberlist = res.Result.Data;
              console.log(this.Menberlist);
            });
            this.TabShow = true;
            console.log(this.MenberInfo);
          } else {
            this.$messager.alert({
              title: "提示",
              msg: res.Result.Message
            });
          }
        });
      }
    },
    //编辑
    handleEdit(index, row) {
      if (this.memberCodeOrPhone == "" || this.Id == "" || this.Id == null) {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      } else {
        this.$refs.MenberAddDialog.open();
        this.dialogStatus = "update";
        const para = { Id: this.Id };
        console.log(para);
        MemberEdit(para).then(res => {
          console.log("会员信息", res.Result);
          // debugger
          this.MenberDialogForm = {
            RealName: res.Result.Data.RealName,
            Id: res.Result.Data.Id,
            Code: res.Result.Data.Code,
            NickName: res.Result.Data.NickName,
            Sex: res.Result.Data.Sex,
            BirthdayType: res.Result.Data.BirthdayType,
            // BirthdayStr: res.Result.Data.Birthday,
            BirthdayEvery: res.Result.Data.BirthdayEvery,
            Phone: res.Result.Data.Phone,
            LevelId: res.Result.Data.LevelId,
            LevelName: res.Result.Data.LevelName,
            IDCardType: res.Result.Data.IDCardType,
            IDCardNo: res.Result.Data.IDCardNo,
            // Refer: res.Result.Data.Refer,
            ProvinceCode: res.Result.Data.ProvinceCode,
            CityCode: res.Result.Data.CityCode,
            RegionCode: res.Result.Data.RegionCode,
            CityName: res.Result.Data.CityName,
            Address: res.Result.Data.Address,
            WechatUnionId: res.Result.Data.WechatUnionId,
            WechatOpenId: res.Result.Data.WechatOpenId,
            OriginUserId: res.Result.Data.OriginUserId,
            OriginOrganizationId: res.Result.Data.OriginOrganizationId,
            OriginOrganizationName: res.Result.Data.OriginOrganizationName,
            OriginUserCode: res.Result.Data.OriginUserCode,
            Remark: res.Result.Data.Remark,
            MemberTagCount: res.Result.Data.MemberTagCount,
            Birthday: new Date(res.Result.Data.Birthday)
            // ImportantList: []
          };
        });
        MemberImportantList(para).then(res => {
          console.log(res.Result.Data);
          // this.MenberDialogForm.ImportantList = res.Result.Data;
          this.testList = res.Result.Data;
          this.testList.forEach(element => {
            if (element.DateType == "农历") {
              element.DateType = 0;
            } else {
              element.DateType = 1;
            }
          });
          this.testList.forEach(element => {
            element.Date = new Date(element.Date);
          });
          console.log("纪念日", this.testList);
        });
        console.log("表单数据", this.MenberDialogForm);
      }
    },
    saveForm(index, row) {
      this.$refs.form.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
          return false;
        }else {
          this.saveFormFn();
        }
      });  
    },
    saveFormFn(){
        this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            var obj = this.getObjectFormList(
              this.LevelIdData,
              "Id",
              this.MenberDialogForm.LevelId
            );
            console.log(obj);
            const para1 = {
              LevelName: obj.Name
            };
            //纪念日日期转化
            this.testList.forEach(element => {
              if (element.Date != null) {
                element.Date = parseTime(
                  element.Date,
                  "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
                );
              }
            });
            this.MenberDialogForm.ImportantList = this.testList;
            const para = Object.assign({}, this.MenberDialogForm, para1);
            console.log("编辑保存", para);
            MemberEditSave(para).then(res => {
              this.$refs.MenberAddDialog.close();
              this.MenberSearchTop();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //添加
    handleAdd() {
      this.$refs.MenberAddDialog.open();
      this.dialogStatus = "create";
      this.MenberDialogForm = {
        Code: "",
        NickName: "",
        RealName: "",
        Sex: 0,
        BirthdayType: 0,
        Birthday: new Date(),
        Phone: null,
        LevelId: null,
        LevelName: "",
        IDCardType: 0,
        IDCardNo: null,
        ProvinceCode: null,
        CityCode: null,
        RegionCode: null,
        CityName: "",
        Address: "",
        Remark: "",
        ImportantList: []
      };
      this.testList = [
        // {
        //   Target: "",
        //   DateType: null,
        //   Name: "",
        //   Date: null
        // }
      ];
    },
    submitForm: function() {
      this.$refs.form.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
          return false;
        }else {
          this.submitFormFn();
        }
      });  
    },
    submitFormFn(){
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          var _this = this;
          // debugger
          console.log(this.MenberDialogForm);
          if (r) {
            var obj = this.getObjectFormList(
              this.LevelIdData,
              "Id",
              this.MenberDialogForm.LevelId
            );
            console.log(obj);
            const para1 = {
              LevelName: obj?obj.Name:null
            };
            if (
              this.MenberDialogForm.Birthday != null ||
              this.MenberDialogForm.Birthday != ""
            ) {
              var Birthday = parseTime(
                this.MenberDialogForm.Birthday,
                "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
              );
            }
            //纪念日日期转化
            _this.testList.forEach(element => {
              if (element.Date != null && element.Date != "") {
                element.Date = parseTime(
                  element.Date,
                  "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
                );
              } else {
                element.Date = null;
              }
            });
            this.MenberDialogForm.ImportantList = _this.testList;
            const para = Object.assign({}, this.MenberDialogForm, para1);
            para.Birthday = Birthday;
            console.log(para);
            MemberAdd(para).then(res => {
              if (res.Result.Code == 0) {
                this.$refs.MenberAddDialog.close();
                this.$messager.alert({
                  title: "提示",
                  msg: res.Result.Message
                });
              } else {
                this.$messager.alert({
                  title: "提示",
                  msg: res.Result.Message
                });
              }

              console.log(res.Result.Message);
            });
          }
        }
      });
    },
    //添加一行
    addRow() {
      console.log(this.MenberDialogForm.ImportantList);
      this.testList.push({
        Target: "生日",
        DateType: 0,
        Name: "妻子",
        Date: new Date()
      });
    },
    delRow(index) {
      console.log(this.MenberDialogForm.ImportantList);
      // this.MenberDialogForm.ImportantList.splice(index, 1);
      this.testList.splice(index, 1);
    },
    getObjectFormList(srcList, field, value) {
      for (var i = 0; i < srcList.length; i++) {
        if (srcList[i][field] == value) {
          return srcList[i];
        }
      }
    },
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
    //会员等级类型 MemberLevelTypeEnum
    MemberLevelTypeMode() {
      GetMemberLevel().then(res => {
        console.log(res.Result);
        this.LevelIdData = res.Result.Data;
      });
    },
    // 商品销售跳转
    StoresSalePhoto() {
      var para = {
        index: this.memberCodeOrPhone
      };
      console.log("商品销售手机号", para);
      this.$router.push({
        name: `StoresSales`,
        query: para
      });
    },
    // 会员操作跳转
    MemberPhoto() {
      var para = {
        index: this.memberCodeOrPhone
      };
      console.log("会员操作手机号", para);
      this.$router.push({
        name: `MemberOperationRecords`,
        query: para
      });
    },
    // 券信息跳转
    MarketArchInfoPhoto() {
      var para = {
        index: this.memberCodeOrPhone
      };
      console.log("券信息手机号", para);
      this.$router.push({
        name: `MarketArchInfoQuery`,
        query: para
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
    },
  },
  mounted() {
    this.MemberLevelTypeMode();
    this.ProvinceList();
    // this.ReferMode();
    this.TypeMode();
    this.BirMode();
    this.SexMode();
    console.log(this.$route.params);
    console.log(this.active);
  },
  activated() {
    //根据key名获取传递回来的参数，data就是map
    if (/^\/index\b/g.test(this.$store.state.fromRoute)) {
      this.active = 0;
      this.MenberSearchTop(0);
    }
  }
};
</script>
<style scoped>

.marginTop{
  margin-top: -10px;
}
.iconadd{
  width: 90px;
}
.tableStyle tr td {
    padding: 0 4px;
}

</style>

