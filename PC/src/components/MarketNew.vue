<template>
  <!-- 拉新营销 -->
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
                :min="0"
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
            <Label for="IsMsg" class="f-l">通知方式</Label>
            <div
              v-for="(fruit,index) in IsSuitPOSData"
              :key="index"
              style="width:150px;float:left"
              @click="CheckBoxAll"
            >
              <CheckBox
                :value="fruit.Name"
                :inputId="fruit.Name"
                :multiple="true"
                v-model="IsSuitPOS"
              ></CheckBox>
              <span :for="fruit.Name">{{fruit.Name}}</span>
              <!-- <LinkButton
                class="btnDelete"
                @click="$refs.IsMsgDialog.open()"
                v-model="MenberDialogForm.MarketingMsgTemplate.Content"
              >编辑短信</LinkButton>-->
            </div>
          </div>
        </TabPanel>
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
        <!-- 拉新奖励方案 -->
        <TabPanel :title="'拉新奖励方案'">
          <div class>
            <div class="formStyle_list">
              <Label for="RecommendAwardintegral">奖励积分</Label>
              <NumberBox
                inputId="RecommendAwardintegral"
                name="RecommendAwardintegral"
                v-model="MenberDialogForm.RecommendAwardintegral"
                :min="0"
              ></NumberBox>
            </div>
            <div class="formStyle_list">
              <Label for="RecommendAwardGrowth">奖励成长值</Label>
              <NumberBox
                inputId="RecommendAwardGrowth"
                name="RecommendAwardGrowth"
                v-model="MenberDialogForm.RecommendAwardGrowth"
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
        <!-- 消费奖励方案 -->
        <!-- <TabPanel :title="'消费奖励方案'">
          <div class>
            <div class="formStyle_list">
              <Label for="MinCostAmount">最低消费满</Label>
              <NumberBox
                inputId="MinCostAmount"
                name="MinCostAmount"
                v-model="MenberDialogForm.MinCostAmount "
                :min="0"
              ></NumberBox>元
            </div>
            <div class="formStyle_list">
              <Label for="Award">奖励提成</Label>
              <NumberBox v-model="MenberDialogForm.Award" inputId="Award" name="Award" :min="0"></NumberBox>%
            </div>
            <div class="formStyle_list">
              <Label for="ExpireMonth">消费奖励有效期</Label>自注册起后生效,有效期
              <NumberBox
                v-model="MenberDialogForm.ExpireMonth"
                inputId="ExpireMonth"
                name="ExpireMonth"
                :min="0"
              ></NumberBox>个月
            </div>

            <div class="formStyle_list" v-if="this.MenberDialogForm.AwardAmountType==1">
              <Label for="Name">奖励提示</Label>
              <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.RandomAmountHint"></TextBox>
            </div>
          </div>
        </TabPanel>-->
      </Tabs>
      <!-- <div class="f-r mt-20">
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
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
  AddMemberRecommendMarketing,
  GetMemberRecommendMarketing,
  UpdateMemberRecommendMarketing
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
        {
          Code: -1,
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
      IsSuitPOS: [],
      IsSuitPOSData: [
        { Name: "微信(慎用)" },
        { Name: "手机短信" },
        { Name: "会员通知" }
      ],
      OrganizationRangeTypeData: [
        {
          Code: 0,
          Name: "全部"
        },
        {
          Code: 1,
          Name: "线下机构"
        },
        {
          Code: 2,
          Name: "在线充值"
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
        RecommendAwardintegral: 0,
        RecommendAwardGrowth: 0,
        RecommendAwardAmountType: 0,
        RecommendAwardFixedAmount: 0,
        RecommendRandomMinAmount: 0,
        RecommendRandomMaxAmount: 0,
        RecommendRandomAmountHint: "",
        MinCostAmount: 0,
        Award: 0,
        ExpireMonth: 0,
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
        MarketingComboAwardList: [], //营销方案套餐奖励列表
        RecommendMarketingCouponAwardList: [],
        RecommendMarketingComboAwardList: []
      },
      MemberLevelList: []
    };
  },
  components: {
    IsMsgDialog,
    Vouchers,
    Package
  },
  methods: {
    CheckBoxAll(val, name) {
      if (this.IsSuitPOS.includes("微信(慎用)")) {
        this.MenberDialogForm.IsWeChat = true;
      } else {
        this.MenberDialogForm.IsWeChat = false;
      }
      if (this.IsSuitPOS.includes("手机短信")) {
        this.MenberDialogForm.IsMsg = true;
      } else {
        this.MenberDialogForm.IsMsg = false;
      }
      if (this.IsSuitPOS.includes("会员通知")) {
        this.MenberDialogForm.IsMessage = true;
      } else {
        this.MenberDialogForm.IsMessage = false;
      }
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
              //日期判断
              var ExpireBeginDate = null;
              var ExpireEndDate = null;
              if (this.MenberDialogForm.ExpireDateType == 0) {
                ExpireBeginDate = "";
                ExpireEndDate = "";
              } else {
                ExpireBeginDate = parseTime(
                  this.MenberDialogForm.ExpireBeginDate,
                  "{yyyy}-{mm}-{dd} 00:00:00"
                );
                ExpireEndDate = parseTime(
                  this.MenberDialogForm.ExpireEndDate,
                  "{yyyy}-{mm}-{dd} 23:59:59"
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
              if (this.MenberDialogForm.MarketingEveryoneNumbe != -1) {
                this.MenberDialogForm.MarketingEveryoneNumbe = this.MarketingEveryoneNumbe;
              }
              if (this.MenberDialogForm.MarketingTotalNumber != -1) {
                this.MenberDialogForm.MarketingTotalNumber = this.MarketingTotalNumber;
              }
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
              para.MarketingTotalNumber = MarketingTotalNumber;
              para.MarketingEveryoneNumbe = MarketingEveryoneNumbe;
              para.ExpireBeginDate = ExpireBeginDate;
              para.ExpireEndDate = ExpireEndDate;
              console.log(para);
              //return;
              AddMemberRecommendMarketing(para).then(res => {
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
      }else{
        this.saveForm()
      }
    },
    getList() {
      if (this.RegisteredEdit != "") {
        this.dialogStatus = "";
        const para = this.RegisteredEdit;
        console.log(para);
        GetMemberRecommendMarketing(para).then(res => {
          // debugger;
          this.MemberLevelTypeMode();
          console.log(res.Result);
          if (res.Result.Data.IsMsg) {
            this.IsMsg = "0";
          } else {
            this.IsMsg = "1";
          }
          this.IsSuitPOS = [];
          if (res.Result.Data.IsWeChat) {
            this.IsSuitPOS.push("微信(慎用)");
          }
          if (res.Result.Data.IsMsg) {
            this.IsSuitPOS.push("手机短信");
          }
          if (res.Result.Data.IsMessage) {
            this.IsSuitPOS.push("会员通知");
          }
          this.MarketingEveryoneNumbe = res.Result.Data.MarketingEveryoneNumbe;
          this.MarketingTotalNumber = res.Result.Data.MarketingTotalNumber;
          this.MenberDialogForm = {
            RecommendAwardintegral: res.Result.Data.RecommendAwardintegral,
            RecommendAwardGrowth: res.Result.Data.RecommendAwardGrowth,
            RecommendAwardAmountType: res.Result.Data.RecommendAwardAmountType,
            RecommendAwardFixedAmount:
              res.Result.Data.RecommendAwardFixedAmount,
            RecommendRandomMinAmount: res.Result.Data.RecommendRandomMinAmount,
            RecommendRandomMaxAmount: res.Result.Data.RecommendRandomMaxAmount,
            RecommendRandomAmountHint:
              res.Result.Data.RecommendRandomAmountHint,
            MinCostAmount: res.Result.Data.MinCostAmount,
            Award: res.Result.Data.Award,
            ExpireMonth: res.Result.Data.ExpireMonth,
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
            MarketingMsgTemplate: res.Result.Data.MarketingMsgTemplate,
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
            MarketingLevel: res.Result.Data.MarketingLevel,
            SharePeoples: res.Result.Data.SharePeoples
          };
          console.log();
          if (this.MenberDialogForm.MarketingMemberLevelList != null) {
            this.MenberDialogForm.MarketingMemberLevelList.forEach(element => {
              console.log(element.MemberLevelId);
              this.MenberDialogForm.MarketingMemberLevelList.push(
                element.MemberLevelId
              );
            });
            this.MenberDialogForm.MarketingMemberLevelList = null;
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
            UpdateMemberRecommendMarketing(para).then(res => {
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
    }
    //适用终端
    // TerminalMode() {
    //   const para = {
    //     EnumType: "TerminalSourceEnum"
    //   };
    //   GetEnumList(para).then(res => {
    //     console.log(res.Result);
    //     this.IsSuitPOSData = res.Result.Data;
    //   });
    // }
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
    // this.TerminalMode();
    this.PrerogativeTypeMode();
    this.MemberLevelTypeMode();
    this.MarketingEveryoneNumbeMode();
  }
};
</script>