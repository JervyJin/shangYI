<template>
  <div>
    <Form :model="MenberDialogForm" class="formStyle">
      <Tabs class="Tabsstyle">
        <TabPanel :title="'基本参数'">
          <div class="formStyle_list">
            <Label for="Name">营销方案名称</Label>
            <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.Name">
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="MemberLevelType" class="f-l">会员等级</Label>
            <div class="f-l ml-5">
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
              <Label for="Name">券使用张数</Label>
              <TextBox inputId="CouponNum" name="CouponNum" v-model="MenberDialogForm.CouponNum">
                <span class="c-red starpos">*</span>
              </TextBox> 张
            </div>
          <div class="formStyle_list tixing">
            <Label for="Name">有效日期</Label>
            <span v-for="(item,index) in ExpireDateTypeData" :key="index" class="mr-10">
              <RadioButton
                name="useDate"
                :inputId="item.Code"
                :value="item.Code"
                v-model="MenberDialogForm.ExpireDateType"
              ></RadioButton>
              <span :for="item.Name">{{item.Name}}</span>
            </span>
          </div>
          <div class="formStyle_list" v-if="MenberDialogForm.ExpireDateType==1">
            <Label for="Birthday">自定义日期</Label>
            <DateBox
              v-model="MenberDialogForm.ExpireBeginDate"
              format="yyyy-MM-dd"
              placeholder="操作日期 （起）"
            ></DateBox>
            <span class="mr-10 ml-10">至</span>
            <DateBox
              v-model="MenberDialogForm.ExpireEndDate"
              format="yyyy-MM-dd"
              placeholder="操作日期 （止）"
            ></DateBox>
          </div>
          <div class="formStyle_list tixing">
            <Label for="Name">营销总次数</Label>
            <span v-for="(fruit,index) in marketTotal" :key="index" class="mr-10">
              <RadioButton
                name="group2"
                :inputId="fruit.Code"
                :value="fruit.Code"
                v-model="marketNumIndex"
              ></RadioButton>
              <span :for="fruit.Name">{{fruit.Name}}</span>
            </span>
            <span v-if="this.marketNumIndex == 1">
              <TextBox inputId="Name" v-model="MenberDialogForm.MarketingTotalNumber"></TextBox>次
            </span>
          </div>
          <div class="formStyle_list tixing">
            <Label for="Name">每人限营销次数</Label>
            <span v-for="(fruit,index) in marketTotalPeople" :key="index" class="mr-10">
              <RadioButton
                name="group2"
                :inputId="fruit.Code"
                :value="fruit.Code"
                v-model="marketPeopleIndex"
              ></RadioButton>
              <span :for="fruit">{{fruit.Name}}</span>
            </span>
            <span v-if="this.marketPeopleIndex == 1">
              <TextBox inputId="Name" v-model="MenberDialogForm.MarketingEveryoneNumbe"></TextBox>次
            </span>
          </div>
          <div class="formStyle_list notice">
            <Label for="Name"></Label>
            <span
              class="content-tips"
            >备注:每消费一笔订单算一次，当超过“营销总次数”，该判断不生效；比如营销总次数为1次，每人限营销次数为2次，会员第二笔消费时因超过营销总次数而不生效。</span>
          </div>
          <div class="formStyle_list tixing">
            <Label for="Name">机构适用范围</Label>
            <span v-for="(item,index) in OrganizationRangeTypeData" :key="index" class="mr-10">
              <RadioButton
                name="group2"
                :inputId="item.Code"
                :value="item.Code"
                v-model="MenberDialogForm.OrganizationRangeType"
              ></RadioButton>
              <span :for="item.Name">{{item.Name}}</span>
            </span>
            <span v-if="this.MenberDialogForm.OrganizationRangeType == 1">
              <LinkButton
                class="btnDelete"
                @click="$refs.MoneyDialog.open()"
                v-model="MenberDialogForm.MarketingOrganizationRangeList"
              >选择机构</LinkButton>
              共选择{{OrganizationIdNum}}家机构
            </span>
          </div>

          <div class="formStyle_list">
            <Label for="IsMsg" class="f-l">发送短信</Label>
            <ComboBox
              inputId="formats"
              v-model="MenberDialogForm.IsMsg"
              :data="IsMsgData"
              valueField="Code"
              textField="Name"
            ></ComboBox>
            <LinkButton class="btnDelete" @click="$refs.IsMsgDialog.open()">编辑短信</LinkButton>
          </div>
        </TabPanel>
        <!-- 例外商品 -->
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
                  :min="0"
                  v-model="MenberDialogForm.AwardFixedAmount"
                  style="width:80px"
                ></NumberBox>元
              </div>
              <LinkButton class="btnDelete ml-10" @click="$refs.MoneyEditDialog.open()">编辑红包</LinkButton>
              <div class="f-l ml-10" v-if="this.MenberDialogForm.AwardAmountType==1">
                <NumberBox
                  inputId="RandomMinAmount"
                  name="RandomMinAmount"
                  :min="0"
                  v-model="MenberDialogForm.RandomMinAmount"
                  style="width:80px"
                ></NumberBox>至
                <NumberBox
                  inputId="RandomMaxAmount"
                  name="RandomMaxAmount"
                  :min="0"
                  v-model="MenberDialogForm.RandomMaxAmount"
                  style="width:80px"
                ></NumberBox>元
              </div>
            </div>
            <div class="formStyle_list" v-if="this.MenberDialogForm.AwardAmountType==1">
              <Label for="Name">奖励提示</Label>
              <TextBox
                inputId="Name"
                name="RandomAmountHint"
                v-model="MenberDialogForm.RandomAmountHint"
              ></TextBox>
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
                    editMode="cell"
                    :clickToEdit="true"
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
                    field="ApplicableType"
                    title="券类型"
                    v-model="MenberDialogForm.MarketingCouponAwardList.ApplicableType"
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

        <TabPanel :title="'关联券信息'">
          <div class="bordertop">
            
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
              :data="MenberDialogForm.MarketingCouponList"
              :pagination="true"
              class="minheight200"
            >
              <GridColumn
                align="center"
                type="index"
                cellCss="datagrid-td-rownumber"
                width="50"
                title="序号"
                :columnResizing="true"
              >
                <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
              </GridColumn>
              <GridColumn align="center" title="操作" field="custome-adv">
                <template slot="body" slot-scope="scope">
                  <LinkButton class="btnDelete" @click="deleteException(scope.rowIndex)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                field="CouponCode"
                title="券编码"
                v-model="MenberDialogForm.MarketingCouponList.CouponCode"
              ></GridColumn>
              <GridColumn
                field="CouponName"
                title="券名称"
                v-model="MenberDialogForm.MarketingCouponList.CouponName"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
      </Tabs>

      <!-- <div class="f-r mt-30">
        <LinkButton
          this.MarketingTypeAll="Share"
          v-if="dialogStatus=='create'"
          @click="submitForm()"
          class="btnConfirm"
        >确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm btn">保存</LinkButton>
      </div> -->
    </Form>
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
        :newMsgCont="MarketingMsgContent"
        :newMessageCont="MarketingMessageContent"
      ></IsMsgDialog>
    </Dialog>
    <!-- 红包编辑 -->
    <Dialog
      ref="MoneyEditDialog"
      :dialogStyle="{width:'750px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="红包编辑"
    >
      <MoneyEdit @packageEdit="getchildMoneyEdit"></MoneyEdit>
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
    <!-- 关联券-->
    <Dialog
      ref="VouchersLinkDialog"
      :dialogStyle="{width:'80%',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="券"
    >
      <VouchersLink @vouchers="getchildVouchersLink"></VouchersLink>
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
  MemoriaMarketingEdit,
  AddCostSaelMarketing,
  GetCouponUserMarketing,
  UpdateCouponUserMarketing,
  AddCouponUserMarketing
} from "@/api/Market";
import { GetMemberLevel } from "@/api/members";
import Vouchers from "@/components/Vouchers";
import VouchersLink from "@/components/Vouchers";
import ComboBrand from "@/components/ComboBrand";
import ComboCatalog from "@/components/ComboCatalog";
import CouponGoods from "@/components/CouponGoods";
import ExceptionDialog from "@/components/ExceptionDialog";
import institutionsData from "@/components/institutionsData";
import IsMsgDialog from "@/components/IsMsgDialog";
import Package from "@/components/Package";
import MoneyEdit from "@/components/MoneyEdit";
import { parseTime } from "@/utils/index";
export default {
  props: {
    RegisteredEdit: {},
    required: true
  },
  data() {
    return {
      MarketingMsgContent: "",
      MarketingMessageContent: "",
      OrganizationIdNum: 0,
      Name: "",
      Menberlistfailure: "",
      dialogStatus: "create",
      DepositTypeData: [],
      MenberlistSus: [],
      MarketingTotalNumberData: [
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
          Code: "0",
          Name: "否"
        },
        {
          Code: "1",
          Name: "是"
        }
      ],
      IsMessageData: [
        //是否发送通知
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
      parentData: 1,
      IsTransmit: "否",
      IsTransmitData: ["否", "是"],
      IsShare: "不限",
      useDateIndex: 0,
      ExpireDateTypeData: [
        {
          Code: "0",
          Name: "不限"
        },
        {
          Code: "1",
          Name: "自定义日期"
        }
      ],
      OrganizationRangeTypeData: [
        {
          Code: "0",
          Name: "全部机构"
        },
        {
          Code: "1",
          Name: "自定义机构"
        }
      ],
      marketNumIndex: "0",
      marketTotal: [
        {
          Code: "0",
          Name: "不限"
        },
        {
          Code: "1",
          Name: "自定义"
        }
      ],
      marketPeopleIndex: "0",
      marketTotalPeople: [
        {
          Code: "0",
          Name: "不限"
        },
        {
          Code: "1",
          Name: "自定义"
        }
      ],
      singlePeople: "0",
      couponModel: "1",
      couponControl: [],
      OrganizationIdData: [],
      MemberLevelTypeData: [],
      MemberLevelId: [],
      MenberDialogForm: {
        Code: "",
        MarketingId: "", //主表标识
        MarketingSublistId: "",//子表标识
        Name: "", //营销方案名称
        rewardRedPacket: 0, //奖励红包
        DepositType: 0,
        DiscountAmount: 0,
        SalePrice: 0,
        Quota: 0,
        CouponNum: "0",
        ExpireDateType: "0",
        EffectExpireMonths: 0,
        IsTransmit: true,
        IsShare: true,
        IsWeChat: false,
        userDate: true, //选择有效日期
        IsCompany: true, //机构适用范围
        marketNum: true, //营销总次数
        marketPeople: true, //每人限营销次数
        MarketingEveryoneNumbe: "0",
        AwardType: 0, //奖励类型
        rewardType: "", //奖励类型
        privilegeType: 0, //特权类型
        IsMsg: 0,
        IsMessage: 0, //发送短信
        MarketingMsgTemplate: {
          Content: ""
        },
        MarketingMessageContent: {
          //发送通知
          Content: ""
        },
        OrganizationRangeType: "0",
        ERPType: 0,
        Amount: "",
        ERPRankType: "",
        State: 0,
        CouponType: "0",
        CouponTypeIndex: 0, //优惠卷控制类型
        ExpireBeginDate: new Date(),
        ExpireEndDate: new Date(),
        ComboApplicableCouponList: [],
        ComboExceptionGoodsList: [],
        MarketingOrganizationRangeList: [], //选择的机构
        ComboOrganizationRangeList: [],
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
        MarketingCouponList: [], //关联券信息
        MarketingMemberLevelList: [], //会员等级列表
        MarketingComboAwardList: []
      },
      MemberLevelData: [
        //会员等级
        //特权范围类型
        {
          Code: 0,
          Name: "全部"
        },
        {
          Code: 1,
          Name: "自定义"
        }
      ],
      rewardRedPacketList: [] //奖励红包
    };
  },
  components: {
    Vouchers,
    ComboBrand,
    ComboCatalog,
    CouponGoods,
    institutionsData,
    IsMsgDialog,
    Package,
    MoneyEdit,
    ExceptionDialog,
    VouchersLink
  },
  methods: {
    hideLayout() {
      console.log(333333333);
      this.MenberDialogForm.MemberLevelType = 0;
    },
    saveForm() {
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
          MarketingTotalNumber = this.MenberDialogForm.MarketingTotalNumber;
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
          MarketingEveryoneNumbe = this.MenberDialogForm.MarketingEveryoneNumbe;
        } else {
          this.$messager.alert({
            title: "提示",
            msg: "每人限营销总次数为1-100的值"
          });
          return;
        }
      }
      console.log(JSON.stringify(this.MemberLevelId));
      //会员
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
      }
      //红包模板
      var redPacket = this.MenberDialogForm.MarketingWeChatAmountTemplate;
      console.log(redPacket);
      if (redPacket && redPacket.ActivityName) {
        redPacket.Type = this.MenberDialogForm.AwardAmountType;
        if (this.MenberDialogForm.AwardAmountType == 0) {
          redPacket.Amount = this.MenberDialogForm.AwardFixedAmount;
        } else {
          redPacket.Amount = this.MenberDialogForm.RandomMinAmount;
        }
      } else {
        redPacket = {};
        redPacket.ActivityName = "";
        redPacket.ShopName = "";
        redPacket.Remark = "";
        redPacket.Greeting = "";
        redPacket.Type = this.MenberDialogForm.AwardAmountType;
        if (this.MenberDialogForm.AwardAmountType == 0) {
          redPacket.Amount = this.MenberDialogForm.AwardFixedAmount;
        } else {
          redPacket.Amount = this.MenberDialogForm.RandomMinAmount;
        }
      }
      if (!redPacket.Amount) {
        redPacket.Amount = 0;
      }
      //日期格式化处理ExpireDateType
      var ExpireBeginDate = null;
      var ExpireEndDate = null;
      if (this.MenberDialogForm.ExpireDateType == 1) {
        ExpireBeginDate = parseTime(
          this.MenberDialogForm.ExpireBeginDate,
          "{yyyy}-{mm}-{dd}"+" 00:00:00"
        );
        ExpireEndDate = parseTime(
          this.MenberDialogForm.ExpireEndDate,
          "{yyyy}-{mm}-{dd}"+" 23:59:59"
        );
      } else {
        ExpireBeginDate = null;
        ExpireEndDate = null;
      }  
      var IsMsg = this.MenberDialogForm.IsMsg > 0 ? true : false; //发送短信
      //券奖励
      if(this.MenberDialogForm.MarketingCouponAwardList && this.MenberDialogForm.MarketingCouponAwardList.length>0){
          this.MenberDialogForm.MarketingCouponAwardList.map((item)=>{
            if(!item.CouponId){
                item.CouponId = item.Id;
            }
          });
      }
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {    
            const para = Object.assign({}, this.MenberDialogForm);
            para.ExpireBeginDate = ExpireBeginDate;
            para.ExpireEndDate = ExpireEndDate;
            para.IsMsg = IsMsg;
            para.MarketingMsgTemplate = {
              Content:this.MarketingMsgContent
            };
            console.log(para);
            console.log(JSON.stringify(para));
            //return
            UpdateCouponUserMarketing(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              console.log(res.Result.Message);
              this.Message = res.Result.Message;
              if (this.Message == "更新成功" || this.Message == "添加成功") {
                this.$emit("sendCloseParentMarket", 1);
              }
            });
          }
        }
      });
    },
    getList() {
      if (this.RegisteredEdit != "") {
        this.dialogStatus = "";
        const para = this.RegisteredEdit;
        console.log(para);
        GetCouponUserMarketing(para).then(res => {
          console.log(res.Result);
          this.MenberDialogForm = res.Result.Data;
          this.MenberDialogForm.MarketingId = para.MarketingId;//主标识
          this.MenberDialogForm.MarketingSublistId = para.MarketingSublistId;//副标识
          //券使用张数
          this.MenberDialogForm.CouponNum = res.Result.Data.CouponNum.toString();
          //会员等级
          if (
            res.Result.Data.MarketingMemberLevelList &&
            res.Result.Data.MarketingMemberLevelList.length
          ) {
            res.Result.Data.MarketingMemberLevelList.map(item => {
              this.MemberLevelId.push(item.MemberLevelId);
            });
          } else {
            this.MemberLevelId = [];
          }
          this.MenberDialogForm.ExpireDateType = res.Result.Data.ExpireDateType.toString();
          this.MenberDialogForm.OrganizationRangeType = res.Result.Data.OrganizationRangeType.toString();
          this.MemberLevelTypeMode();
          var ExpireBeginDate = res.Result.Data.ExpireBeginDate;
          if (ExpireBeginDate) {
            this.MenberDialogForm.ExpireBeginDate = new Date(
              res.Result.Data.ExpireBeginDate
            );
          }
          var ExpireEndDate = res.Result.Data.ExpireEndDate;
          if (ExpireEndDate) {
            this.MenberDialogForm.ExpireEndDate = new Date(
              res.Result.Data.ExpireEndDate
            );
          }
          //营销总次数
          if(res.Result.Data.MarketingTotalNumber){
              this.marketNumIndex = "1";
              this.MenberDialogForm.MarketingTotalNumber = res.Result.Data.MarketingTotalNumber.toString();
          } else {
            this.marketNumIndex = "0";
            this.MenberDialogForm.MarketingTotalNumber = "";
          }
          //每人限营销次数
          if (res.Result.Data.MarketingEveryoneNumbe == -1) {
            this.marketPeopleIndex = "0";
            this.MenberDialogForm.MarketingEveryoneNumbe = "";
          } else {
            if (res.Result.Data.MarketingEveryoneNumbe) {
              this.marketPeopleIndex = "1";
              this.MenberDialogForm.MarketingEveryoneNumbe = res.Result.Data.MarketingEveryoneNumbe.toString();
            }
          }
          //机构范围
          if (
            res.Result.Data.MarketingOrganizationRangeList &&
            res.Result.Data.MarketingOrganizationRangeList.length
          ) {
            this.OrganizationIdNum =
              res.Result.Data.MarketingOrganizationRangeList.length;
          } else {
            this.OrganizationIdNum = 0;
          }
          this.MenberDialogForm.IsMsg = res.Result.Data.IsMsg ? "1" : "0";
          //发送短信newMsgData
          if (this.MenberDialogForm.IsMsg) {
            this.MarketingMsgContent = res.Result.Data.MarketingMsgTemplate
              ? res.Result.Data.MarketingMsgTemplate.Content
              : null;
          }
        });
      }
    },
    //添加
    submitForm: function() {
      if(this.dialogStatus=='create'){
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
            MarketingTotalNumber = this.MenberDialogForm.MarketingTotalNumber;
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
            MarketingEveryoneNumbe = this.MenberDialogForm.MarketingEveryoneNumbe;
          } else {
            this.$messager.alert({
              title: "提示",
              msg: "每人限营销总次数为1-100的值"
            });
            return;
          }
        }
        console.log(JSON.stringify(this.MemberLevelId));
        //会员
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
        }
        //红包模板
        var redPacket = this.MenberDialogForm.MarketingWeChatAmountTemplate;
        console.log(redPacket);
        if (redPacket && redPacket.ActivityName) {
          redPacket.Type = this.MenberDialogForm.AwardAmountType;
          if (this.MenberDialogForm.AwardAmountType == 0) {
            redPacket.Amount = this.MenberDialogForm.AwardFixedAmount;
          } else {
            redPacket.Amount = this.MenberDialogForm.RandomMinAmount;
          }
        } else {
          redPacket = {};
          redPacket.ActivityName = "";
          redPacket.ShopName = "";
          redPacket.Remark = "";
          redPacket.Greeting = "";
          redPacket.Type = this.MenberDialogForm.AwardAmountType;
          if (this.MenberDialogForm.AwardAmountType == 0) {
            redPacket.Amount = this.MenberDialogForm.AwardFixedAmount;
          } else {
            redPacket.Amount = this.MenberDialogForm.RandomMinAmount;
          }
        }
        if (!redPacket.Amount) {
          redPacket.Amount = 0;
        }
        //日期格式化处理ExpireDateType
        var ExpireBeginDate = null;
        var ExpireEndDate = null;
        if (this.MenberDialogForm.ExpireDateType == 1) {
          ExpireBeginDate = parseTime(
            this.MenberDialogForm.ExpireBeginDate,
            "{yyyy}-{mm}-{dd}" + " 00:00:00"
          );
          ExpireEndDate = parseTime(
            this.MenberDialogForm.ExpireEndDate,
            "{yyyy}-{mm}-{dd}" + " 23:59:59"
          );
        } else {
          ExpireBeginDate = null;
          ExpireEndDate = null;
        }
        var IsMsg = this.MenberDialogForm.IsMsg > 0 ? true : false; //发送短信
        //券奖励
        if(this.MenberDialogForm.MarketingCouponAwardList && this.MenberDialogForm.MarketingCouponAwardList.length>0){
            this.MenberDialogForm.MarketingCouponAwardList.map((item)=>{
              if(!item.CouponId){
                  item.CouponId = item.Id;
              }
            });
        }
        this.$messager.alert({
          title: "提示",
          msg: "确认提交吗？",
          result: r => {
            if (r) {
              const para = Object.assign({}, this.MenberDialogForm);
              para.ExpireBeginDate = ExpireBeginDate;
              para.ExpireEndDate = ExpireEndDate;
              para.IsMsg = IsMsg;
              para.MarketingMsgContent = {
                Content: this.MarketingMsgContent
              };
              console.log(para);
              console.log(JSON.stringify(para));
              //return;
              AddCouponUserMarketing(para).then(res => {
                this.$messager.alert({
                  title: "提示",
                  msg: res.Result.Message
                });
                console.log(res.Result.Message);
                this.Message = res.Result.Message;
                if (this.Message == "更新成功" || this.Message == "添加成功") {
                  this.$emit("sendCloseParentMarket", 1);
                }
              });
            }
          }
        });
      }else{
        this.saveForm()
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
    getIsShareVal(index) {
      //this.MenberDialogForm.CouponTypeIndex = index;
      this.MenberDialogForm.CouponType = index.toString();
    },
    //品牌传值
    getComboBrand(data) {
      console.log(data);
      if (data && data.length) {
        this.MenberDialogForm.CouponGoodsBrandList = data;
      }
      this.$refs.ComboBrandDialog.close();
    },
    //类别传值
    getCouponGoods(data) {
      console.log(data);
      this.$refs.CouponGoodsDialog.close();
      this.arrID = [];
      if (data && data == 1) {
        //选择为空
        this.MenberDialogForm.CouponGoodsCatalogList = [];
      }
      if (data && data == 2) {
        //选择为空
        this.MenberDialogForm.CouponGoodsCatalogList = [];
      }
      console.log(data);
      if (data && data.length > 0) {
        //选择的有数据
        this.MenberDialogForm.CouponGoodsCatalogList = [];
        data.forEach(data => {
          var arr = {};
          arr.GoodsCatalogCode = data.Code;
          arr.GoodsCatalogName = data.text;
          this.MenberDialogForm.CouponGoodsCatalogList.push(arr);
        });
        console.log(this.MenberDialogForm.CouponGoodsCatalogList);
      }
    },

    //会员等级类型 MemberLevelTypeEnum
    MemberLevelTypeMode() {
      GetMemberLevel().then(res => {
        console.log(res.Result);
        this.MemberLevelTypeData = res.Result.Data;
      });
    },
    //套餐传值
    getchildPackage(data) {
      console.log(data);
      this.$refs.PackageDialog.close();
      this.addObjectValueForList(data, "Num", "1");
      this.MenberDialogForm.MarketingComboAwardList = data;
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
    //删除例外
    deleteException(index) {
      this.MenberDialogForm.MarketingExceptionList.splice(index, 1);
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
    //券传值
    getchildVouchers(data) {
      console.log("child", data);
      this.addObjectValueForList(data, "Num", "1");
      this.$refs.VouchersDialog.close();
      this.MenberDialogForm.MarketingCouponAwardList = data;
    },
    //关联券传值
    getchildVouchersLink(data) {
      console.log(data);
      this.addObjectValueForList(data, "Num", "1");
      this.$refs.VouchersLinkDialog.close();
      this.MenberDialogForm.MarketingCouponList = data;
      if(this.MenberDialogForm.MarketingCouponList && this.MenberDialogForm.MarketingCouponList.length>0){
        this.MenberDialogForm.MarketingCouponList.map((item)=>{
          if(!item.CouponId){
            item.CouponId = item.Id;
          }
        });
      }
    },
    //红包编辑
    getchildMoneyEdit(data) {
      console.log(data);
      console.log(JSON.stringify(data));
      this.$refs.MoneyEditDialog.close();
      this.MenberDialogForm.MarketingWeChatAmountTemplate = data;
    },
    //编辑短信
    getIsMsgData(data) {
      console.log(data);
      this.$refs.IsMsgDialog.close();
      if (this.MenberDialogForm.IsMsg) {
        this.MarketingMsgContent = data;
      }
      if (this.MenberDialogForm.IsMessage) {
        this.MarketingMessageContent = data;
      }
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
    },

    //会员等级
    // memberRank() {
    //     GetMemberLevel().then(res => {
    //         console.log(res.Result);
    //         this.MemberLevelData = res.Result.Data;
    //     });
    // },
    //营销方案类型
    GetEnumListFn() {
      var data = {
        EnumType: "MarketingSchemeTypeEnum"
      };
      GetEnumList(data).then(res => {
        console.log(res.Result);
        this.PlanTypeList = res.Result.Data;
      });
    },
    //奖励
    GetEnumListRewardTypeFn() {
      var data = {
        EnumType: "AwardTypeEnum"
      };
      GetEnumList(data).then(res => {
        console.log(res.Result);
        this.rewardTypeList = res.Result.Data;
        this.rewardType = this.rewardTypeList[0].Name; //初始化数据
      });
    },
    //特权
    GetEnumListPrivilegeTypeFn() {
      var data = {
        EnumType: "PrerogativeTypeEnum"
      };
      GetEnumList(data).then(res => {
        console.log(res.Result);
        this.privilegeTypeList = res.Result.Data;
        this.privilegeType = this.privilegeTypeList[0].Name; //初始化数据
      });
    },
    //优惠券控制
    GetEnumListCouponControlFn() {
      var data = {
        EnumType: "MarketingCouponTypeEnum"
      };
      GetEnumList(data).then(res => {
        console.log(res.Result);
        this.couponControl = res.Result.Data;
        this.couponControl.map(item => {
          item.Code = item.Code.toString();
        });
        //this.couponModel = this.couponControl[0].Name;//初始化数据
        this.MenberDialogForm.CouponType = this.couponControl[0].Code.toString(); //初始化数据
      });
    },
    //奖励红包
    GetEnumListRewardRedPacketFn() {
      var data = {
        EnumType: "AwardAmountTypeEnum"
      };
      GetEnumList(data).then(res => {
        console.log(res.Result);
        this.rewardRedPacketList = res.Result.Data;
      });
    }
  },
  mounted() {
    this.MemberLevelTypeMode(); //会员等级
    this.getList();
  }
};
</script>
<style scoped>
.tixing {
  position: relative;
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
</style>
