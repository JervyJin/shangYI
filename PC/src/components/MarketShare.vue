<template>
  <!-- 分享营销 -->
  <div>
    <Form :model="MenberDialogForm" class="formStyle">
      <Tabs class="Tabsstyle">
        <TabPanel :title="'基本参数'">
          <div class="formStyle_list">
            <Label for="Name" class="f-l">营销方案名称</Label>
            <div class="f-l">
              <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.Name"></TextBox>
            </div>
          </div>
          <div class="formStyle_list">
            <Label for="SharePeoples" class="f-l">分享人数</Label>
            <div class="f-l">
              <NumberBox
                inputId="SharePeoples"
                name="SharePeoples"
                v-model="MenberDialogForm.SharePeoples"
                :min="0"
              ></NumberBox>
            </div>
          </div>
          <div class="formStyle_list">
            <Label for="MemberLevelType" class="f-l">会员等级</Label>
            <div class="f-l">
              <ComboBox
                v-model="MenberDialogForm.MemberLevelType"
                :data="MemberLevelData"
                valueField="Code"
                textField="Name"
              ></ComboBox>
            </div>
            <div class="f-l ml-10" v-if="this.MenberDialogForm.MemberLevelType==1">
              <ComboBox
                v-model="MemberLevelId"
                textField="Name"
                valueField="Id"
                :multiple="true"
                :data="MemberLevelTypeData"
                placeholder="请选择"
              ></ComboBox>
            </div>
          </div>
          <div class="formStyle_list">
            <Label class="f-l" for="MarketingEveryoneNumbe">每人限营销次数</Label>
            <div class="f-l">
              <ComboBox
                valueField="Code"
                textField="Name"
                :data="MarketingEveryoneNumbeData"
                v-model="marketPeopleIndex"
              ></ComboBox>
            </div>
            <div class="f-l ml-10" v-if="this.marketPeopleIndex == 1">
              <NumberBox
                inputId="MarketingEveryoneNumbe"
                name="MarketingEveryoneNumbe"
                v-model="MenberDialogForm.MarketingEveryoneNumbe"
                style="width:80px;"
              ></NumberBox>
            </div>
          </div>
          <div class="formStyle_list">
            <Label class="f-l" for="MarketingTotalNumber">营销总次数</Label>
            <div class="f-l">
              <ComboBox
                valueField="Code"
                textField="Name"
                :data="MarketingTotalNumberData"
                v-model="marketNumIndex"
              ></ComboBox>
            </div>
            <div class="f-l ml-10" v-if="this.marketNumIndex == 1">
              <NumberBox
                inputId="MarketingTotalNumber"
                name="MarketingTotalNumber"
                v-model="MenberDialogForm.MarketingTotalNumber"
                style="width:80px;"
              ></NumberBox>
            </div>
          </div>
          <div class="formStyle_list">
            <Label for="ExpireDateType" class="f-l">有效日期类型</Label>
            <ComboBox
              valueField="Code"
              textField="Name"
              :data="ExpireDateTypeData"
              v-model="MenberDialogForm.ExpireDateType"
              @selectionChange="DataTypeChange"
            ></ComboBox>
          </div>

          <div class="formStyle_list" v-if="this.MenberDialogForm.ExpireDateType==1">
            <Label for="ExpireDateType" class="f-l">自定义</Label>
            <DateBox
              v-model="MenberDialogForm.ExpireBeginDate"
              format="yyyy-MM-dd"
              style="margin-right:10px"
            ></DateBox>至
            <DateBox
              v-model="MenberDialogForm.ExpireEndDate"
              format="yyyy-MM-dd"
              style="margin-left:10px"
            ></DateBox>
          </div>

          <div class="formStyle_list">
            <Label for="IsMsg" class="f-l">发送短信</Label>
            <ComboBox
              v-model="IsMsg"
              :data="IsMsgData"
              valueField="Code"
              textField="Name"
              @selectionChange="IsMsgChange"
            ></ComboBox>
            <LinkButton
              class="btnDelete"
              @click="$refs.IsMsgDialog.open()"
              :disabled="this.IsMsg==1"
              v-model="MenberDialogForm.MarketingMsgTemplate.Content"
            >编辑短信</LinkButton>
          </div>
        </TabPanel>
        <!-- 奖励方案 -->
        <!-- 奖励方案 -->
        <!-- 奖励方案 -->
        <TabPanel :title="'会员奖励方案'">
          <div class>
            <div class="formStyle_list">
              <Label for="Awardintegral">奖励积分</Label>
              <NumberBox
                inputId="Awardintegral"
                name="Awardintegral"
                v-model="MenberDialogForm.Awardintegral"
                :min="0"
              ></NumberBox>
            </div>
            <div class="formStyle_list">
              <Label for="AwardGrowth">奖励成长值</Label>
              <NumberBox
                inputId="AwardGrowth"
                name="AwardGrowth"
                v-model="MenberDialogForm.AwardGrowth"
                :min="0"
              ></NumberBox>
            </div>

            <Tabs class="Tabsstyle bordertop">
              <!--  -->
              <TabPanel :title="'套餐奖励'">
                <p class="pstyle">
                  <LinkButton
                    class="btnAdd btn-primary radius iconfont iconadd f-16"
                    @click="$refs.PackageDialog.open()"
                  >添加</LinkButton>
                  <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
                  <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
                  <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
                </p>
                <DataGrid
                  :data="MenberDialogForm.MarketingComboAwardList"
                  :pagination="true"
                  class="minheight100"
                  editMode="cell"
                  :clickToEdit="true"
                  :columnResizing="true"
                >
                  <GridColumn
                    align="center"
                    type="index"
                    cellCss="datagrid-td-rownumber"
                    width="50"
                    title="序号"
                  >
                    <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
                  </GridColumn>
                  <GridColumn align="center" title="操作" field="custome-adv">
                    <template slot="body" slot-scope="scope">
                      <LinkButton class="btnDelete" @click="deleteBtn(scope.rowIndex)">删除</LinkButton>
                    </template>
                  </GridColumn>
                  <GridColumn
                    field="ComboCode"
                    title="套餐编码"
                    v-model="MenberDialogForm.MarketingComboAwardList.ComboCode"
                  ></GridColumn>
                  <GridColumn
                    field="ComboName"
                    title="套餐名称"
                    v-model="MenberDialogForm.MarketingComboAwardList.ComboName"
                    width="180"
                  ></GridColumn>
                  <GridColumn
                    field="ComboType"
                    title="套餐类型"
                    v-model="MenberDialogForm.MarketingComboAwardList.ComboType"
                  ></GridColumn>
                  <GridColumn
                    field="Num"
                    title="数量"
                    :editable="true"
                    v-model="MenberDialogForm.MarketingComboAwardList.Num"
                  ></GridColumn>
                </DataGrid>
              </TabPanel>

              <TabPanel :title="'券奖励 '">
                <p class="pstyle">
                  <LinkButton
                    class="btnAdd btn-primary radius iconfont iconadd f-16"
                    @click="$refs.VouchersDialog.open()"
                  >添加</LinkButton>
                  <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
                  <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
                  <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
                </p>
                <DataGrid
                  :data="MenberDialogForm.MarketingCouponAwardList"
                  :pagination="true"
                  class="minheight100"
                  editMode="cell"
                  :clickToEdit="true"
                  :columnResizing="true"
                >
                  <GridColumn
                    align="center"
                    type="index"
                    cellCss="datagrid-td-rownumber"
                    width="50"
                    title="序号"
                  >
                    <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
                  </GridColumn>
                  <GridColumn align="center" title="操作" field="custome-adv">
                    <template slot="body" slot-scope="scope">
                      <LinkButton class="btnDelete" @click="deleteBtnCoupon(scope.rowIndex)">删除</LinkButton>
                    </template>
                  </GridColumn>
                  <GridColumn
                    field="CouponType"
                    title="券类型"
                    v-model="MenberDialogForm.MarketingCouponAwardList.CouponType"
                  ></GridColumn>
                  <GridColumn
                    field="CouponName"
                    title="券名称"
                    v-model="MenberDialogForm.MarketingCouponAwardList.CouponName"
                  ></GridColumn>
                  <GridColumn
                    field="CouponCode"
                    title="券编码"
                    v-model="MenberDialogForm.MarketingCouponAwardList.CouponCode"
                  ></GridColumn>
                  <GridColumn
                    field="Num"
                    title="数量"
                    :editable="true"
                    v-model="MenberDialogForm.MarketingCouponAwardList.Num"
                  ></GridColumn>
                </DataGrid>
              </TabPanel>
            </Tabs>
          </div>
        </TabPanel>
      </Tabs>
      <div class="f-r mt-20">
        <!-- <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel">取消</LinkButton> -->
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
      </div>
    </Form>
    <!-- 短信 IsMsgDialog-->
    <Dialog
      ref="IsMsgDialog"
      :dialogStyle="{width:'680px',height:'400px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="短信"
    >
      <IsMsgDialog
        @IsMsgValue="getIsMsgData"
        :newMsgCont="MenberDialogForm.MarketingMsgTemplate.Content"
      ></IsMsgDialog>
    </Dialog>
    <!-- 添加 券-->
    <Dialog
      ref="VouchersDialog"
      :dialogStyle="{width:'80%',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="券"
    >
      <Vouchers @vouchers="getchildVouchers"></Vouchers>
    </Dialog>
    <!-- 添加套餐 -->
    <Dialog
      ref="PackageDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="套餐"
    >
      <Package @packchild="getchildPackage"></Package>
    </Dialog>
  </div>
</template>
<script>
import {
  GetEnumList,
  GetMemberLevel,
  ShareMarketingAdd,
  ShareMarketingEdit,
  ShareMarketingEditSave
} from "@/api/Market";
import Vouchers from "@/components/Vouchers";
import Package from "@/components/Package";
import { parseTime } from "@/utils/index";
import IsMsgDialog from "@/components/IsMsgDialog";
export default {
  props: {
    RegisteredEdit: {},
    required: true
  },
  data() {
    return {
      dialogStatus: "create",
      //弹框
      IsMsg: 1,
      marketPeopleIndex: 0,
      marketNumIndex: 0,
      MemberLevel: [],
      MemberLevelTypeData: [],
      IsSuitPOSData: [],
      LevelListType: [],
      ComboAwardListId: "",
      CouponAwardListId: "",
      ComboAwardList: [],
      CouponAwardList: [],
      TypeData: [], //适用特权类型
      MarketingRangeTypeData: [], //营销方案类型
      MarketingEveryoneNumbeData: [
        //每人限营销次数
        {
          Code: 0,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "自定义"
        }
      ],
      MarketingTotalNumberData: [
        {
          Code: 0,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "自定义"
        }
      ], //营销总次数
      ExpireDateTypeData: [
        //有效日期
        {
          Code: 0,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "自定义"
        }
      ],
      IsMsgData: [
        //是否发送短信
        {
          Code: 0,
          Name: "是"
        },
        {
          Code: 1,
          Name: "否"
        }
      ],
      OrganizationRangeTypeData: [
        {
          Code: 0,
          Name: "全部"
        },
        {
          Code: 1,
          Name: "线下机构"
        }
        // {
        //   Code: 2,
        //   Name: "在线充值"
        // }
      ],
      AwardAmountTypeData: [
        {
          Code: 0,
          Name: "固定红包"
        },
        {
          Code: 1,
          Name: "随机红包"
        }
      ],
      MemberLevelData: [
        {
          Code: 0,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "自定义"
        }
      ],
      OrganizationIdData: [],
      OrganizationIdNum: "",
      OrganizationIdValue: "",
      MarketingTotalNumber: 0,
      MarketingEveryoneNumbe: 0,
      MemberLevelId: [],
      MenberDialogForm: {
        SharePeoples: 0,
        Code: "",
        Name: "",
        IsWeChat: false,
        IsMsg: false,
        //内容模板
        MarketingMsgTemplate: {
          Content: ""
        },
        IsMessage: false,
        MarketingMessageTemplate: {
          Content: ""
        },
        ExpireDateType: 0,
        ExpireBeginDate: new Date(),
        ExpireEndDate: new Date(),
        MarketingEveryoneNumbe: -1,
        MarketingTotalNumber: -1,
        OrganizationRangeType: 0,
        MarketingOrganizationRangeList: [], //机构使用范围列表
        Awardintegral: 0,
        AwardGrowth: 0,
        AwardAmountType: 0,
        AwardFixedAmount: 0,
        RandomMinAmount: 0,
        RandomMaxAmount: 0,
        RandomAmountHint: "",
        AwardRechargeAmoun: 0,
        AwardHongBaoAmount: 0,
        //	营销方案红包微信模板
        MarketingWeChatAmountTemplate: null,
        MemberLevelType: 0,
        MarketingMemberLevelList: [], //会员等级列表
        MarketingCouponAwardList: [], //营销方案优惠卷奖励列表
        MarketingComboAwardList: [] //营销方案套餐奖励列表
      }
    };
  },
  components: {
    IsMsgDialog,
    Vouchers,
    Package
  },
  methods: {
    IsMsgChange() {
      // debugger;
      if (this.IsMsg == "0") {
        this.MenberDialogForm.IsMessage = false;
        this.MenberDialogForm.IsMsg = false;
        this.MenberDialogForm.MarketingMsgTemplate.Content = "";
      } else {
        this.MenberDialogForm.IsMessage = true;
        this.MenberDialogForm.IsMsg = true;
      }

      // if (this.MenberDialogForm.IsMsg == 0) {
      //   this.MenberDialogForm.IsMsg = false;
      // } else {
      //   this.MenberDialogForm.IsMsg = true;
      // }
      console.log(this.MenberDialogForm.IsMessage);
    },
    //券传值
    getchildVouchers(data) {
      console.log("child", data);
      this.addObjectValueForList(data, "Num", "1");
      this.$refs.VouchersDialog.close();
      this.MenberDialogForm.MarketingCouponAwardList = data;
    },
    //套餐传值
    getchildPackage(data) {
      console.log(data);
      this.$refs.PackageDialog.close();
      this.addObjectValueForList(data, "Num", "1");
      this.MenberDialogForm.MarketingComboAwardList = data;
      console.log(this.MenberDialogForm.MarketingComboAwardList);
    },
    //给数组中的对象都赋值一个给定的值
    addObjectValueForList(list, field, value) {
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          this.addObjectValue(list[i], field, value);
        }
      }
    },
    //给对象赋值一个给定的值，两个方法，方便重用
    addObjectValue(obj, field, value) {
      //还是先做一个非空判断
      if (obj) {
        obj[field] = value;
        //这个返回也不需要，返回也不错
        return obj;
      }
    },
    //消息传值
    getIsMsgData(data) {
      console.log(data);
      this.$refs.IsMsgDialog.close();
      this.MenberDialogForm.MarketingMsgTemplate.Content = data;
      console.log(this.MenberDialogForm.MarketingMsgTemplate.Content);
    },
    //添加
    submitForm: function() {
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            var MarketingTotalNumber = 0;
            //营销总次数
            if (this.marketNumIndex == 0) {
              MarketingTotalNumber = -1;
            } else {
              console.log(this.MenberDialogForm.MarketingTotalNumber);
              if (
                this.MenberDialogForm.MarketingTotalNumber &&
                Number(this.MenberDialogForm.MarketingTotalNumber) >= 1 &&
                Number(this.MenberDialogForm.MarketingTotalNumber) <= 100
              ) {
                MarketingTotalNumber = this.MenberDialogForm
                  .MarketingTotalNumber;
              } else {
                this.$messager.alert({
                  title: "提示",
                  msg: "营销总次数为1-100的值"
                });
                return;
              }
            }
            //每人限营销次数
            var MarketingEveryoneNumbe = 0;
            if (Number(this.marketPeopleIndex) == 0) {
              MarketingEveryoneNumbe = -1;
            } else {
              console.log(this.MenberDialogForm.MarketingEveryoneNumbe);
              if (
                this.MenberDialogForm.MarketingEveryoneNumbe &&
                Number(this.MenberDialogForm.MarketingEveryoneNumbe) >= 1 &&
                Number(this.MenberDialogForm.MarketingEveryoneNumbe) <= 100
              ) {
                MarketingEveryoneNumbe = this.MenberDialogForm
                  .MarketingEveryoneNumbe;
              } else {
                this.$messager.alert({
                  title: "提示",
                  msg: "每人限营销总次数为1-100的值"
                });
                return;
              }
            }
            // this.MenberDialogForm.Code = parseInt(
            //   Math.random() * 100
            // ).toString();
            //日期判断
            if (this.MenberDialogForm.ExpireDateType == 0) {
              this.MenberDialogForm.ExpireBeginDate = "";
              this.MenberDialogForm.ExpireEndDate = "";
            } else {
              this.MenberDialogForm.ExpireBeginDate = parseTime(
                this.MenberDialogForm.ExpireBeginDate,
                "{yyyy}-{mm}-{dd}" + " 00:00:00"
              );
              this.MenberDialogForm.ExpireEndDate = parseTime(
                this.MenberDialogForm.ExpireEndDate,
                "{yyyy}-{mm}-{dd}" + " 23:59:59"
              );
            }
            //会员
            if (this.MenberDialogForm.MemberLevelType == 1) {
              var obj = this.getsubListFormList(
                this.MemberLevelTypeData,
                this.MemberLevelId,
                "Id"
              );
              obj.forEach(data => {
                var arr = {};
                arr.MemberLevelId = data.Id;
                arr.MemberLevelCode = data.Code;
                arr.MemberLevelName = data.Name;
                this.MenberDialogForm.MarketingMemberLevelList.push(arr);
              });
            }
            // if (this.MenberDialogForm.MarketingEveryoneNumbe != -1) {
            //   this.MenberDialogForm.MarketingEveryoneNumbe = this.MarketingEveryoneNumbe;
            // }
            // if (this.MenberDialogForm.MarketingTotalNumber != -1) {
            //   this.MenberDialogForm.MarketingTotalNumber = this.MarketingTotalNumber;
            // }
            //套餐类型
            console.log(this.MenberDialogForm.MarketingMemberLevelList);
            const para = Object.assign(
              {
                MarketingMessageTemplate: {
                  Content: ""
                }
              },
              this.MenberDialogForm
            );
            console.log(para);
            para.MarketingTotalNumber = MarketingTotalNumber;
            para.MarketingEveryoneNumbe = MarketingEveryoneNumbe;
            ShareMarketingAdd(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              this.$emit("childRadio", res.Result.Code);
            });

            console.log(this.Message);
          }
        }
      });
    },
    getList() {
      if (this.RegisteredEdit != "") {
        this.dialogStatus = "";
        const para = this.RegisteredEdit;
        console.log(para);
        ShareMarketingEdit(para).then(res => {
          // debugger;
          this.MemberLevelTypeMode();
          console.log(res.Result);
          if (res.Result.Data.IsMsg) {
            this.IsMsg = "0";
          } else {
            this.IsMsg = "1";
          }
          this.MarketingEveryoneNumbe = res.Result.Data.MarketingEveryoneNumbe;
          this.MarketingTotalNumber = res.Result.Data.MarketingTotalNumber;
          this.MenberDialogForm = {
            Code: res.Result.Data.Code,
            Name: res.Result.Data.Name,
            IsWeChat: res.Result.Data.IsWeChat,
            IsMsg: res.Result.Data.IsMsg,
            ExpireDateType: res.Result.Data.ExpireDateType,
            ExpireBeginDate: new Date(res.Result.Data.ExpireBeginDate),
            ExpireEndDate: new Date(res.Result.Data.ExpireEndDate),
            MarketingTotalNumber: res.Result.Data.MarketingTotalNumber,
            MarketingEveryoneNumbe: res.Result.Data.MarketingEveryoneNumbe,
            OrganizationRangeType: res.Result.Data.OrganizationRangeType,
            Awardintegral: res.Result.Data.Awardintegral,
            AwardGrowth: res.Result.Data.AwardGrowth,
            AwardAmountType: res.Result.Data.AwardAmountType,
            AwardFixedAmount: res.Result.Data.AwardFixedAmount,
            RandomMinAmount: res.Result.Data.RandomMinAmount,
            RandomMaxAmount: res.Result.Data.RandomMaxAmount,
            RandomAmountHint: res.Result.Data.RandomAmountHint,
            AwardRechargeAmoun: res.Result.Data.AwardRechargeAmoun,
            AwardHongBaoAmount: res.Result.Data.AwardHongBaoAmount,
            Code: res.Result.Data.Code,
            IsMessage: res.Result.Data.IsMessage,
            MarketingComboAwardList: res.Result.Data.MarketingComboAwardList,
            MarketingCouponAwardList: res.Result.Data.MarketingCouponAwardList,
            MarketingOrganizationRangeList:
              res.Result.Data.MarketingOrganizationRangeList,
            MarketingWeChatAmountTemplate:
              res.Result.Data.MarketingWeChatAmountTemplate,
            MemberLevelType: res.Result.Data.MemberLevelType,
            Type: res.Result.Data.Type,
            MarketingMsgTemplate: {
              Content: res.Result.Data.MarketingMsgTemplate.Content
            },
            MarketingMessageTemplate: {
              Content: res.Result.Data.MarketingMessageTemplate.Content
            },
            MarketingMemberLevelList: res.Result.Data.MarketingMemberLevelList,
            MarketingRangeType: res.Result.Data.MarketingRangeType,
            MarketingLevel: res.Result.Data.MarketingLevel,
            SharePeoples: res.Result.Data.SharePeoples
          };
          if (
            this.MenberDialogForm.MarketingMemberLevelList != "" &&
            this.MenberDialogForm.MarketingMemberLevelList != null
          ) {
            this.MenberDialogForm.MarketingMemberLevelList.forEach(element => {
              console.log(element.MemberLevelId);
              this.MemberLevelId.push(element.MemberLevelId);
            });
          }
          //营销总次数
          if (res.Result.Data.MarketingTotalNumber == -1) {
            this.marketNumIndex = 0;
            this.MenberDialogForm.MarketingTotalNumber = "";
          } else {
            if (res.Result.Data.MarketingTotalNumber) {
              this.marketNumIndex = 1;
              this.MenberDialogForm.MarketingTotalNumber =
                res.Result.Data.MarketingTotalNumber;
            }
          }
          //每人限营销次数
          if (res.Result.Data.MarketingEveryoneNumbe == -1) {
            this.marketPeopleIndex = 0;
            this.MenberDialogForm.MarketingEveryoneNumbe = "";
          } else {
            if (res.Result.Data.MarketingEveryoneNumbe) {
              this.marketPeopleIndex = 1;
              this.MenberDialogForm.MarketingEveryoneNumbe =
                res.Result.Data.MarketingEveryoneNumbe;
            }
          }
          this.MenberDialogForm.MarketingMemberLevelList = [];
          console.log("等级", this.MemberLevelId);
        });
      }
    },
    saveForm(index, row) {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            var MarketingTotalNumber = 0;
            //营销总次数
            if (this.marketNumIndex == 0) {
              MarketingTotalNumber = -1;
            } else {
              console.log(this.MenberDialogForm.MarketingTotalNumber);
              if (
                this.MenberDialogForm.MarketingTotalNumber &&
                Number(this.MenberDialogForm.MarketingTotalNumber) >= 1 &&
                Number(this.MenberDialogForm.MarketingTotalNumber) <= 100
              ) {
                MarketingTotalNumber = this.MenberDialogForm
                  .MarketingTotalNumber;
              } else {
                this.$messager.alert({
                  title: "提示",
                  msg: "营销总次数为1-100的值"
                });
                return;
              }
            }
            //每人限营销次数
            var MarketingEveryoneNumbe = 0;
            if (Number(this.marketPeopleIndex) == 0) {
              MarketingEveryoneNumbe = -1;
            } else {
              console.log(this.MenberDialogForm.MarketingEveryoneNumbe);
              if (
                this.MenberDialogForm.MarketingEveryoneNumbe &&
                Number(this.MenberDialogForm.MarketingEveryoneNumbe) >= 1 &&
                Number(this.MenberDialogForm.MarketingEveryoneNumbe) <= 100
              ) {
                MarketingEveryoneNumbe = this.MenberDialogForm
                  .MarketingEveryoneNumbe;
              } else {
                this.$messager.alert({
                  title: "提示",
                  msg: "每人限营销总次数为1-100的值"
                });
                return;
              }
            }
            //会员
            if (this.MenberDialogForm.MemberLevelType == 1) {
              var obj = this.getsubListFormList(
                this.MemberLevelTypeData,
                this.MemberLevelId,
                "Id"
              );
              obj.forEach(data => {
                var arr = {};
                arr.MemberLevelId = data.Id;
                arr.MemberLevelCode = data.Code;
                arr.MemberLevelName = data.Name;
                this.MenberDialogForm.MarketingMemberLevelList.push(arr);
              });
            }
            //日期判断
            if (this.MenberDialogForm.ExpireDateType == 0) {
              this.MenberDialogForm.ExpireBeginDate = "";
              this.MenberDialogForm.ExpireEndDate = "";
            } else {
              this.MenberDialogForm.ExpireBeginDate = parseTime(
                this.MenberDialogForm.ExpireBeginDate,
                "{yyyy}-{mm}-{dd}" + " 00:00:00"
              );
              this.MenberDialogForm.ExpireEndDate = parseTime(
                this.MenberDialogForm.ExpireEndDate,
                "{yyyy}-{mm}-{dd}" + " 23:59:59"
              );
            }
            this.MenberDialogForm.MarketingSublistId = this.RegisteredEdit.MarketingSublistId;
            this.MenberDialogForm.MarketingId = this.RegisteredEdit.MarketingId;
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            para.MarketingTotalNumber = MarketingTotalNumber;
            para.MarketingEveryoneNumbe = MarketingEveryoneNumbe;
            ShareMarketingEditSave(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              this.$emit("childRadio", res.Result.Code);
            });
          }
        }
      });
    },
    DataTypeChange() {
      console.log(this.MenberDialogForm.ExpireDateType);
      if (this.MenberDialogForm.ExpireDateType == 0) {
        this.MenberDialogForm.ExpireBeginDate = new Date();
        this.MenberDialogForm.ExpireEndDate = new Date();
      } else {
        this.MenberDialogForm.ExpireBeginDate = null;
        this.MenberDialogForm.ExpireEndDate = null;
      }
    },
    getsubListFormList(srcList, valueList, field) {
      //严谨一点，先做一个非空判断，
      if (
        !srcList ||
        srcList.length == 0 ||
        !valueList ||
        valueList.length == 0
      ) {
        //返回一个空数组
        return [];
      }
      var result = [];
      //变量属性使用中扩话写
      for (var j = 0; j < valueList.length; j++) {
        //这个应该再写一个方法，就是从数组中拿出一个对象，和之前写的那个方法比较相像，这样增加效率
        result.push(this.getObjectFormList(srcList, field, valueList[j]));
      }
      return result;
    },

    getObjectFormList(srcList, field, value) {
      for (var i = 0; i < srcList.length; i++) {
        if (srcList[i][field] == value) {
          return srcList[i];
        }
      }
    },
    //删除套餐/券
    deleteBtn(index) {
      // debugger;
      console.log(index);
      this.MenberDialogForm.MarketingComboAwardList.splice(index, 1);
    },
    deleteBtnCoupon(index) {
      this.MenberDialogForm.MarketingCouponAwardList.splice(index, 1);
    },
    //特权类型
    PrerogativeTypeMode() {
      const para = {
        EnumType: "PrerogativeTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.TypeData = res.Result.Data;
      });
    },
    //会员等级类型 MemberLevelTypeEnum
    MemberLevelTypeMode() {
      GetMemberLevel().then(res => {
        console.log(res.Result);
        this.MemberLevelTypeData = res.Result.Data;
      });
    },

    //营销总次数
    MarketingEveryoneNumbeMode() {
      // const para = {
      //   EnumType: "MarketingTotalNumberTypeEnum"
      // };
      // GetEnumList(para).then(res => {
      //   console.log(res.Result);
      //   this.MarketingTotalNumberData = res.Result.Data;
      // });
    },
    //适用终端
    TerminalMode() {
      const para = {
        EnumType: "TerminalSourceEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.IsSuitPOSData = res.Result.Data;
      });
    }
    // //会员等级列表
    // MemberLevelTypeMode() {
    //   GetMemberLevel().then(res => {
    //     console.log(res.Result);
    //     this.MemberLevelData = res.Result.Data;
    //   });
    // }
    //
  },
  mounted() {
    this.getList();
    this.TerminalMode();
    this.PrerogativeTypeMode();
    this.MemberLevelTypeMode();
    this.MarketingEveryoneNumbeMode();
  }
};
</script>