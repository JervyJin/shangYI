<template>
  <!-- 充值营销 -->
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
            <Label for="MarketingLevel" class="f-l">充值档次</Label>
            <div class="f-l">
              <ComboBox
                v-model="MenberDialogForm.MarketingLevel"
                :data="MarketingLevelData"
                valueField="Amount"
                textField="Amount"
              ></ComboBox>
            </div>
          </div>
          <!-- <div class="formStyle_list">
            <Label for="MarketingRangeType" class="f-l">营销方案类型</Label>
            <div class="f-l">
              <ComboBox
                v-model="MenberDialogForm.MarketingRangeType"
                :data="MarketingRangeTypeData"
                valueField="Code"
                textField="Name"
              ></ComboBox>
            </div>
          </div>-->
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
            <Label for="OrganizationRangeType" class="f-l">机构适用范围</Label>
            <div class="f-l">
              <ComboBox
                v-model="MenberDialogForm.OrganizationRangeType"
                :data="OrganizationRangeTypeData"
                valueField="Code"
                textField="Name"
              ></ComboBox>
            </div>
            <div class="f-l ml-10" v-if="this.MenberDialogForm.OrganizationRangeType==1">
              <LinkButton
                class="btnDelete"
                @click="$refs.MoneyDialog.open()"
                v-model="MenberDialogForm.MarketingOrganizationRangeList"
              >选择机构</LinkButton>
              共选择{{OrganizationIdNum}}家机构
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
                style="width:80px;"
                v-model="MenberDialogForm.MarketingTotalNumber"
                :min="0"
              ></NumberBox>
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
                :min="0"
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
              v-model="MenberDialogForm.MarketingMsgTemplate.Content"
            >编辑短信</LinkButton>
          </div>
          <!-- <div class="formStyle_list">
            <Label for="Type" class="f-l">适用特权类型</Label>
            <div class="f-l">
              <ComboBox
                v-model="MenberDialogForm.Type"
                :data="PrivilegeTypeData"
                valueField="Code"
                textField="Name"
              ></ComboBox>
            </div>
          </div>-->
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
              <Label for="AwardRechargeAmoun">奖励金额</Label>
              <NumberBox
                v-model="MenberDialogForm.AwardRechargeAmoun"
                inputId="AwardRechargeAmoun"
                name="AwardRechargeAmoun"
                :min="0"
              ></NumberBox>
            </div>
            <div class="formStyle_list">
              <Label for="AwardGrowth">奖励成长值</Label>
              <NumberBox
                v-model="MenberDialogForm.AwardGrowth"
                inputId="AwardGrowth"
                name="AwardGrowth"
                :min="0"
              ></NumberBox>
            </div>
            <div class="formStyle_list">
              <Label for="AwardAmountType" class="f-l">奖励红包</Label>
              <div class="f-l">
                <ComboBox
                  v-model="MenberDialogForm.AwardAmountType"
                  :data="AwardAmountTypeData"
                  valueField="Code"
                  textField="Name"
                ></ComboBox>
              </div>
              <div class="f-l ml-10" v-if="this.MenberDialogForm.AwardAmountType==0">
                <NumberBox
                  inputId="AwardFixedAmount"
                  name="AwardFixedAmount"
                  v-model="MenberDialogForm.AwardFixedAmount"
                  style="width:80px"
                ></NumberBox>元
              </div>

              <div class="f-l ml-10" v-if="this.MenberDialogForm.AwardAmountType==1">
                <NumberBox
                  inputId="RandomMinAmount"
                  name="RandomMinAmount"
                  v-model="MenberDialogForm.RandomMinAmount"
                  style="width:80px"
                ></NumberBox>至
                <NumberBox
                  inputId="RandomMaxAmount"
                  name="RandomMaxAmount"
                  v-model="MenberDialogForm.RandomMaxAmount"
                  style="width:80px"
                ></NumberBox>元
              </div>
            </div>
            <div class="formStyle_list" v-if="this.MenberDialogForm.AwardAmountType==1">
              <Label for="Name">奖励提示</Label>
              <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.RandomAmountHint"></TextBox>
            </div>
            <Tabs class="Tabsstyle bordertop mt-20">
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
                  editMode="cell"
                  :clickToEdit="true"
                  class="minheight100"
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
                  editMode="cell"
                  :clickToEdit="true"
                  class="minheight100"
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

      <!-- <div class="f-r mt-20 mb-20">
        <LinkButton v-if="this.dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
      </div> -->
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
      <IsMsgDialog @IsMsgValue="getIsMsgData"></IsMsgDialog>
    </Dialog>
    <!-- 添加 券-->
    <Dialog
      ref="VouchersDialog"
      :dialogStyle="{width:'80%',height:'600px'}"
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
    <!-- 机构 -->
    <Dialog
      ref="MoneyDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="机构"
    >
      <institutionsData
        @childValue="getchildData"
        :choseCompanyList="MenberDialogForm.MarketingOrganizationRangeList"
      ></institutionsData>
    </Dialog>
  </div>
</template>
<script>
import {
  GetEnumList,
  GetMemberLevel,
  MarketingAdd,
  GetMarketingMarketing,
  UpdateMarketingMarketing,
  GetRechargeLevels
} from "@/api/Market";
import Vouchers from "@/components/Vouchers";
import Package from "@/components/Package";
import { parseTime } from "@/utils/index";
import IsMsgDialog from "@/components/IsMsgDialog";
import institutionsData from "@/components/institutionsData";
export default {
  props: {
    RegisteredEdit: {},
    required: true
  },
  data() {
    return {
      OrganizationIdNum: 0,
      dialogStatus: "create",
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
      MarketingEveryoneNumbeData: [
        //每人限营销次数
        {
          Code: -1,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "自定义"
        }
      ],
      marketNumIndex: "-1",
      marketPeopleIndex: "-1",
      MarketingTotalNumberData: [
        //营销总次数
        {
          Code: -1,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "自定义"
        }
      ],
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
          Name: "否"
        },
        {
          Code: 1,
          Name: "是"
        }
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
      IsMsg: 0,
      MemberLevelId: [],
      SendHourData: [],
      MarketingPrivilegeList: [],
      MarketingRangeTypeData: [],
      MarketingLevelData: [],
      PrivilegeTypeData: [],
      MenberDialogForm: {
        Type: 0,
        MarketingLevel: 0,
        MarketingRangeType: 0,
        MarketingMemberLevelList: [],
        Name: "",
        IsWeChat: false,
        IsMsg: false,
        IsMessage: false,
        MarketingMsgTemplate: {
          Content: ""
        },
        MarketingTotalNumber: -1,
        ExpireDateType: 0,
        ExpireBeginDate: new Date(),
        ExpireEndDate: new Date(),
        MarketingEveryoneNumbe: -1,
        OrganizationRangeType: 0,
        MarketingOrganizationRangeList: [],
        Awardintegral: 0,
        AwardGrowth: 0,
        AwardAmountType: 0,
        AwardFixedAmount: 0,
        RandomMinAmount: 0,
        RandomMaxAmount: 0,
        RandomAmountHint: "",
        AwardRechargeAmoun: 0,
        AwardHongBaoAmount: 0,
        MarketingWeChatAmountTemplate: {},
        MemberLevelType: 0,
        MarketingCouponAwardList: [],
        MarketingComboAwardList: [],
        MarketingMessageTemplate: {
          Content: ""
        }
      }
    };
  },
  components: {
    institutionsData,
    IsMsgDialog,
    Vouchers,
    Package
  },
  methods: {
    IsMsgChange() {
      if (this.IsMsg == 0) {
        this.MenberDialogForm.IsMessage = false;
      } else {
        this.MenberDialogForm.IsMessage = true;
      }
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
    },
    //机构传值
    getchildData(data) {
      console.log(data);
      this.$refs.MoneyDialog.close();
      this.arrID = [];
      if (data && data == 1) {
        //选择为空
        this.OrganizationIdNum = 0;
        this.MenberDialogForm.MarketingOrganizationRangeList = [];
      }
      if (data && data == 2) {
        //选择为空
        this.OrganizationIdNum = 0;
        this.MenberDialogForm.MarketingOrganizationRangeList = [];
      }
      if (data && data.length > 0) {
        //选择的有数据
        this.MenberDialogForm.MarketingOrganizationRangeList = [];
        data.forEach(data => {
          var arr = {};
          arr.OrganizationId = data.OrganizationId;
          this.arrID.push(data.OrganizationId);
          this.MenberDialogForm.MarketingOrganizationRangeList.push(arr);
        });
        console.log(this.arrID.length);
        this.OrganizationIdNum = this.arrID.length;
        // this.MenberDialogForm.MarketingOrganizationRangeList.OrganizationId = this.arrID;
        console.log(this.MenberDialogForm.MarketingOrganizationRangeList);
      }
      // this.$refs.MoneyDialog.close();
      // this.arrID = [];
      // data.forEach(data => {
      //   var arr = {};
      //   console.log(data.id);
      //   arr.OrganizationId = data.Id;
      //   this.arrID.push(data.Id);
      //   this.MenberDialogForm.MarketingOrganizationRangeList.push(arr);
      // });
      // console.log(this.arrID.length);
      // this.OrganizationIdNum = this.arrID.length;
      // // this.MenberDialogForm.MarketingOrganizationRangeList.OrganizationId = this.arrID;
      // console.log(this.MenberDialogForm.MarketingOrganizationRangeList);
    },
    //消息传值
    getIsMsgData(data) {
      console.log(data);
      this.$refs.IsMsgDialog.close();
      this.MenberDialogForm.MarketingMsgTemplate.Content = data;
    },
    //添加
    submitForm: function() {
      if(this.dialogStatus=='create'){
        this.$messager.alert({
          title: "提示",
          msg: "确认提交吗？",
          result: r => {
            if (r) {
              var MarketingTotalNumber = 0;

              //营销总次数
              if (this.marketNumIndex == 0 || this.marketNumIndex == -1) {
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
              if (this.marketPeopleIndex == 0 || this.marketPeopleIndex == -1) {
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
              console.log(this.marketNumIndex);
              console.log(this.marketPeopleIndex);
              console.log(JSON.stringify(this.MemberLevelId));

              //日期判断
              var ExpireBeginDate = null;
              var ExpireEndDate = null;
              if (this.MenberDialogForm.ExpireDateType == 0) {
                ExpireBeginDate = "";
                ExpireEndDate = "";
              } else {
                ExpireBeginDate = parseTime(
                  this.MenberDialogForm.ExpireBeginDate,
                  "{yyyy}-{mm}-{dd}" + " 00:00:00"
                );
                ExpireEndDate = parseTime(
                  this.MenberDialogForm.ExpireEndDate,
                  "{yyyy}-{mm}-{dd}" + " 23:59:59"
                );
              }
              //会员
              console.log(this.MemberLevelId);
              if (
                this.MenberDialogForm.MemberLevelType == 1 &&
                this.MemberLevelId.length > 0
              ) {
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
              } else {
                this.MenberDialogForm.MarketingMemberLevelList = [];
              }
              const para = Object.assign(
                {
                  MarketingMsgTemplate: {
                    Content: ""
                  }
                },
                this.MenberDialogForm
              );
              if (this.IsMsg == 0) {
                para.IsMsg = false;
              }
              if (this.IsMsg == 1) {
                para.IsMsg = true;
              }
              para.MarketingTotalNumber = MarketingTotalNumber;
              para.MarketingEveryoneNumbe = MarketingEveryoneNumbe;
              para.ExpireBeginDate = ExpireBeginDate;
              para.ExpireEndDate = ExpireEndDate;
              console.log(para);
              //return;
              MarketingAdd(para).then(res => {
                this.$messager.alert({
                  title: "提示",
                  msg: res.Result.Message
                });
                console.log(res.Result.Message);
                this.Message = res.Result.Message;
                this.$emit("RechargeChild", res.Result.Code);
              });
            }
          }
        });
      }else{
        this.saveForm()
      }
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
    // 取消
    btnCancel() {},
    //
    getList() {
      if (this.RegisteredEdit != "") {
        this.dialogStatus = "";
        const para = this.RegisteredEdit;
        console.log(para);
        GetMarketingMarketing(para).then(res => {
          console.log(res.Result);
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
            MarketingMsgTemplate: {
              Content: ""
            },
            MarketingMessageTemplate: {
              Content: ""
            },
            MarketingComboAwardList: res.Result.Data.MarketingComboAwardList,
            MarketingCouponAwardList: res.Result.Data.MarketingCouponAwardList,
            MarketingOrganizationRangeList:
              res.Result.Data.MarketingOrganizationRangeList,
            MarketingWeChatAmountTemplate:
              res.Result.Data.MarketingWeChatAmountTemplate,
            MemberLevelType: res.Result.Data.MemberLevelType,
            Type: res.Result.Data.Type,
            MarketingMemberLevelList: res.Result.Data.MarketingMemberLevelList,
            MarketingRangeType: res.Result.Data.MarketingRangeType,
            MarketingLevel: res.Result.Data.MarketingLevel
          };
          if (this.MenberDialogForm.MarketingOrganizationRangeList != null) {
            this.OrganizationIdNum = this.MenberDialogForm.MarketingOrganizationRangeList.length;
          }
          //发送短信newMsgData
          if (this.MenberDialogForm.IsMsg) {
            this.IsMsg = 1;
          } else {
            this.IsMsg = 0;
          }
          //会员等级
          this.MemberLevelId = [];
          if (
            res.Result.Data.MarketingMemberLevelList &&
            res.Result.Data.MarketingMemberLevelList.length
          ) {
            res.Result.Data.MarketingMemberLevelList.map(item => {
              this.MemberLevelId.push(item.MemberLevelId);
            });
          }
          //机构
          if (
            res.Result.Data.MarketingOrganizationRangeList &&
            res.Result.Data.MarketingOrganizationRangeList.length
          ) {
            this.OrganizationIdNum =
              res.Result.Data.MarketingOrganizationRangeList.length;
          } else {
            this.OrganizationIdNum = 0;
          }
          //营销总次数
          if (res.Result.Data.MarketingTotalNumber == -1) {
            this.marketNumIndex = "0";
            this.MenberDialogForm.MarketingTotalNumber = "";
          } else {
            if (res.Result.Data.MarketingTotalNumber) {
              this.marketNumIndex = "1";
              this.MenberDialogForm.MarketingTotalNumber =
                res.Result.Data.MarketingTotalNumber;
            }
          }
          //每人限营销次数
          if (res.Result.Data.MarketingEveryoneNumbe == -1) {
            this.marketPeopleIndex = "0";
            this.MenberDialogForm.MarketingEveryoneNumbe = "";
          } else {
            if (res.Result.Data.MarketingEveryoneNumbe) {
              this.marketPeopleIndex = "1";
              this.MenberDialogForm.MarketingEveryoneNumbe =
                res.Result.Data.MarketingEveryoneNumbe;
            }
          }
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
            if (this.marketNumIndex == 0 || this.marketNumIndex == -1) {
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
            if (this.marketPeopleIndex == 0 || this.marketPeopleIndex == -1) {
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
            console.log(JSON.stringify(this.MemberLevelId));
            //日期判断
            var ExpireBeginDate = null;
            var ExpireEndDate = null;
            if (this.MenberDialogForm.ExpireDateType == 0) {
              ExpireBeginDate = "";
              ExpireEndDate = "";
            } else {
              ExpireBeginDate = parseTime(
                this.MenberDialogForm.ExpireBeginDate,
                "{yyyy}-{mm}-{dd}" + " 00:00:00"
              );
              ExpireEndDate = parseTime(
                this.MenberDialogForm.ExpireEndDate,
                "{yyyy}-{mm}-{dd}" + " 23:59:59"
              );
            }
            //会员
            console.log(this.MemberLevelId);
            this.MenberDialogForm.MarketingMemberLevelList = [];
            if (
              this.MenberDialogForm.MemberLevelType == 1 &&
              this.MemberLevelId.length > 0
            ) {
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
            } else {
              this.MenberDialogForm.MarketingMemberLevelList = [];
            }
            this.MenberDialogForm.MarketingSublistId = this.RegisteredEdit.MarketingSublistId;
            this.MenberDialogForm.MarketingId = this.RegisteredEdit.MarketingId;
            const para = Object.assign({}, this.MenberDialogForm);
            para.MarketingTotalNumber = MarketingTotalNumber;
            para.MarketingEveryoneNumbe = MarketingEveryoneNumbe;
            para.ExpireBeginDate = ExpireBeginDate;
            para.ExpireEndDate = ExpireEndDate;
            console.log(para);
            //return;
            UpdateMarketingMarketing(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              this.Message = res.Result.Message;
              this.$emit("RechargeChild", res.Result.Code);
            });
          }
        }
      });
    },
    //给数组中的对象都赋值一个给定的值
    addObjectValueForList(list, field, value) {
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          this.addObjectValue(list[i], field, value);
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
    //给对象赋值一个给定的值，两个方法，方便重用
    addObjectValue(obj, field, value) {
      //还是先做一个非空判断
      if (obj) {
        obj[field] = value;
        //这个返回也不需要，返回也不错
        return obj;
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
    //会员等级类型 MemberLevelTypeEnum
    MemberLevelTypeMode() {
      GetMemberLevel().then(res => {
        console.log(res.Result);
        this.MemberLevelTypeData = res.Result.Data;
      });
    },

    //充值档次
    getLevel() {
      GetRechargeLevels().then(res => {
        console.log(res.Result);
        this.MarketingLevelData = res.Result.Data;
      });
    },
    //营销方案类型
    MarketingRangeTypeMode() {
      const para = {
        EnumType: "MarketingTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.MarketingRangeTypeData = res.Result.Data;
      });
    },
    //会员等级
    MemberLevelTypeMode() {
      GetMemberLevel().then(res => {
        console.log(res.Result);
        this.MemberLevelTypeData = res.Result.Data;
      });
    },
    //特权类型
    PrerogativeTypeMode() {
      const para = {
        EnumType: "PrerogativeTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.PrivilegeTypeData = res.Result.Data;
      });
    }
  },

  mounted() {
    this.MemberLevelTypeMode();
    this.getList();
    this.getLevel();
    this.PrerogativeTypeMode();
    this.MarketingRangeTypeMode();
  },
  created() {
    let data = [];
    for (let i = 1; i < 25; i++) {
      data.push({
        id: i,
        Name: i + "小时"
      });
    }
    console.log(data);
    this.SendHourData = data;
  }
};
</script>