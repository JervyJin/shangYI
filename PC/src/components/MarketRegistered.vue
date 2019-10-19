<template>
  <!-- 注册营销 -->
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
            <Label class="f-l" for="MarketingTotalNumber">营销总次数</Label>
            <div class="f-l">
              <ComboBox
                valueField="Code"
                textField="Name"
                v-model="MarketingNumType"
                :multiple="false"
                :data="MarketingTotalNumberData"
              ></ComboBox>
            </div>
            <div class="f-l ml-10" v-if="MarketingNumType == 1">
              <NumberBox
                inputId="MarketingTotalNumber"
                name="MarketingTotalNumber"
                v-model="MenberDialogForm.MarketingTotalNumber"
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
          <div class="formStyle_list">
            <Label for="IsSuitPOS" class="f-l">适用终端</Label>
            <div
              v-for="(fruit,index) in IsSuitPOSData"
              :key="index"
              style="width:100px;float:left"
              @click="CheckBoxAll"
            >
              <CheckBox
                :value="fruit.Name"
                :inputId="fruit.Name"
                :multiple="true"
                v-model="IsSuitPOS"
              ></CheckBox>
              <span :for="fruit.Name">{{fruit.Name}}</span>
            </div>
          </div>
          <div class="formStyle_list" v-if="this.IsSuitPOS.includes('POS')">
            <Label for="OrganizationRangeType" class="f-l">机构适用范围</Label>
            <div class="f-l">
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
          </div>

          <div class="formStyle_list">
            <Label for="Type" class="f-l">消费条件</Label>
            <div class="f-l">
              <ComboBox
                v-model="MenberDialogForm.Type"
                :data="MenberTypeData"
                valueField="Code"
                textField="Name"
              ></ComboBox>
            </div>
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
                  >
                    <template slot="body" slot-scope="scope">
                      <div align="right">{{scope.row.ComboCode}}</div>
                    </template>
                  </GridColumn>
                  <GridColumn
                    field="ComboName"
                    title="套餐名称"
                    v-model="MenberDialogForm.MarketingComboAwardList.ComboName"
                    width="180"
                  >
                    <template slot="body" slot-scope="scope">
                      <div align="left">{{scope.row.ComboName}}</div>
                    </template>
                  </GridColumn>
                  <GridColumn
                    field="ComboType"
                    title="套餐类型"
                    v-model="MenberDialogForm.MarketingComboAwardList.ComboType"
                  >
                    <template slot="body" slot-scope="scope">
                      <div align="left">{{scope.row.ComboType}}</div>
                    </template>
                  </GridColumn>
                  <GridColumn
                    field="Num"
                    title="数量"
                    :editable="true"
                    v-model="MenberDialogForm.MarketingComboAwardList.Num"
                  >
                    <template slot="body" slot-scope="scope">
                      <div align="right">{{scope.row.Num}}</div>
                    </template>
                  </GridColumn>
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
                  class="minheight100 DataGridEditBg"
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
                    field="ApplicableType"
                    title="适用类型"
                    v-model="MenberDialogForm.MarketingCouponAwardList.CouponType"
                  >
                   <template slot="body" slot-scope="scope">
                      <div align="right">{{scope.row.CouponType}}</div>
                    </template>
                  </GridColumn>
                  <GridColumn
                    field="CouponName"
                    title="券名称"
                    v-model="MenberDialogForm.MarketingCouponAwardList.CouponName"
                  >
                   <template slot="body" slot-scope="scope">
                      <div align="right">{{scope.row.CouponName}}</div>
                    </template>
                  </GridColumn>
                  <GridColumn
                    field="CouponCode"
                    title="券编码"
                    v-model="MenberDialogForm.MarketingCouponAwardList.CouponCode"
                  >
                   <template slot="body" slot-scope="scope">
                      <div align="right">{{scope.row.CouponCode}}</div>
                    </template>
                  </GridColumn>
                  <GridColumn
                    field="CouponNum"
                    title="数量"
                    :editable="true"
                    v-model="MenberDialogForm.MarketingCouponAwardList.CouponNum"
                  >
                   <template slot="body" slot-scope="scope">
                      <div align="right">{{scope.row.CouponNum}}</div>
                    </template>
                  </GridColumn>
                </DataGrid>
              </TabPanel>
            </Tabs>
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
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
      </div> -->
    </Form>

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
      <Vouchers @vouchers="getchildVouchers"
        :choseCouponList="MenberDialogForm.MarketingCouponAwardList"></Vouchers>
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
  GetMarketingsAdd,
  GetMarketingsEdit,
  GetMarketingsEditSave
} from "@/api/Market";
import Vouchers from "@/components/Vouchers";
import Package from "@/components/Package";
import { parseTime } from "@/utils/index";
import institutionsData from "@/components/institutionsData";
import IsMsgDialog from "@/components/IsMsgDialog";
export default {
  props: {
    RegisteredEdit: {},
    required: true
  },
  data() {
    return {
      IsSuitPOS: [],
      dialogStatus: "create",
      //搜索
      MarketingType: [],
      //弹框
      IsSuitPOSData: [{ Name: "微信" }, { Name: "POS" }],
      LevelListType: [],
      ComboAwardListId: "",
      CouponAwardListId: "",
      ComboAwardList: [],
      CouponAwardList: [],
      TypeData: [], //适用特权类型
      MarketingRangeTypeData: [], //营销方案类型
      MemberLevelTypeData: [
        //会员等级
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
          Code: 0,
          Name: "自定义"
        }
      ],
      MarketingNumType: 0,
      MarketingTotalNumberData: [
        {
          Code: 0,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "自定义营销总次数"
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

      OrganizationIdData: [],
      OrganizationIdNum: 0,
      OrganizationIdValue: "",
      MenberTypeData: [],
      IsMsg: 1,
      MenberDialogForm: {
        IsSuitPOS: false,
        IsBackstage: false,
        IsSuitWeChat: false,
        Type: 0,
        Name: "",
        IsMsg: false,
        MarketingMsgTemplate: {
          Content: ""
        },
        MarketingTotalNumber: 0,
        ExpireDateType: 0,
        ExpireBeginDate: new Date(),
        ExpireEndDate: new Date(),
        MarketingEveryoneNumbe: 0,
        OrganizationRangeType: 0,
        MarketingNumType: 0, //营销总次数
        MarketingOrganizationRangeList: [
          // {
          //   OrganizationId: ""
          // }
        ],
        Awardintegral: 0,
        AwardGrowth: 0,
        AwardAmountType: 0,
        AwardFixedAmount: 0,
        RandomMinAmount: 0,
        RandomMaxAmount: 0,
        RandomAmountHint: "",
        AwardRechargeAmoun: 0,
        AwardHongBaoAmount: 0,
        MarketingWeChatAmountTemplate: {
          // ActivityName: "",
          // ShopName: "",
          // Remark: "",
          // Greeting: "",
          // Type: 0,
          // Amount: 0
        },
        MemberLevelType: 0,
        //优惠券
        MarketingCouponAwardList: [],
        //套餐
        MarketingComboAwardList: []
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
      if (this.IsMsg == "0") {
        this.MenberDialogForm.IsMessage = false;
        this.MenberDialogForm.IsMsg = false;
      } else {
        this.MenberDialogForm.IsMessage = true;
        this.MenberDialogForm.IsMsg = true;
      }
      console.log(this.MenberDialogForm.IsMessage);
    },
    //券传值
    getchildVouchers(data) {
      // console.log("child", data);
      // this.addObjectValueForList(data, "Num", "1");
      // this.$refs.VouchersDialog.close();
      // this.MenberDialogForm.MarketingCouponAwardList = data;
      // this.MenberDialogForm.MarketingCouponAwardList.map(item => {
      //   if(!item.CouponId){
      //       item.CouponId = item.Id;
      //   }
      //   if(!item.ApplicableType){
      //       item.ApplicableType = item.ApplicableType;
      //   }
      // });
      console.log(data);
      if (data && data == 1) {
        //返回的数据为空，不操作
      }
      if (data && data.length > 0) {
        this.MenberDialogForm.MarketingCouponAwardList = data;
        this.MenberDialogForm.MarketingCouponAwardList.map(item => {
          if(!item.CouponId){
            item.CouponId = item.Id;
          }
          if(!item.CouponNum){
            item.CouponNum = 1;
          }
          //item.Num = item.CouponNum?item.CouponNum:1;
          if(!item.CouponType){
              item.CouponType = item.ApplicableType;
          }
        });
      }
      this.$refs.VouchersDialog.close();
    },
    //套餐传值
    getchildPackage(data) {
      console.log(data);
      this.addObjectValueForList(data, "Num", "1");
      this.$refs.PackageDialog.close();
      // this.ComboAwardList = data;
      this.MenberDialogForm.MarketingComboAwardList = data;
      // console.log(this.ComboAwardList);
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
    getIsMsgData(data) {
      console.log(data);
      this.$refs.IsMsgDialog.close();
      this.MenberDialogForm.MarketingMsgTemplate.Content = data;
    },
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
    //删除套餐/券
    deleteBtn(index) {
      // debugger;
      console.log(index);
      this.MenberDialogForm.MarketingComboAwardList.splice(index, 1);
    },
    deleteBtnCoupon(index) {
      this.MenberDialogForm.MarketingCouponAwardList.splice(index, 1);
    },
    //添加
    submitForm: function() {
      if(this.dialogStatus=='create'){
        if (this.MarketingNumType == 0) {
          this.MenberDialogForm.MarketingTotalNumber = -1;
        }
        if (this.MenberDialogForm.OrganizationRangeType == 1) {
          if (this.OrganizationIdNum == 0) {
            this.$messager.alert({
              title: "提示",
              msg: "机构适用范围为线下机构，机构数量不能为0"
            });
            return;
          }
        }
        if(this.MenberDialogForm.MarketingCouponAwardList && this.MenberDialogForm.MarketingCouponAwardList.length>0){
          this.MenberDialogForm.MarketingCouponAwardList.map((item)=>{
            if(!item.Num){
              item.Num = item.CouponNum;
            }
          });
        }
        this.$messager.alert({
          title: "提示",
          msg: "确认提交吗？",
          result: r => {
            if (r) {
              // this.MenberDialogForm.Code = parseInt(
              //   Math.random() * 100
              // ).toString();
              //日期判断
              var ExpireBeginDate = null;
              var ExpireEndDate = null;
              if (this.MenberDialogForm.ExpireDateType == 0) {
                ExpireBeginDate = null;
                ExpireEndDate = null;
              } else {
                ExpireBeginDate =
                  parseTime(
                    this.MenberDialogForm.ExpireBeginDate,
                    "{yyyy}-{mm}-{dd}"
                  ) + " 00:00:00";
                ExpireEndDate =
                  parseTime(
                    this.MenberDialogForm.ExpireEndDate,
                    "{yyyy}-{mm}-{dd}"
                  ) + " 23:59:59";
              }
              //console.log(ExpireBeginDate+'=='+ExpireEndDate);
              //MenberDialogForm.MarketingComboAwardList.ComboType 套餐类型
              const para = Object.assign(
                {
                  MarketingMsgTemplate: {
                    Content: ""
                  },
                  MarketingMessageTemplate: {
                    Content: ""
                  }
                },
                this.MenberDialogForm
              );
              para.ExpireBeginDate = ExpireBeginDate;
              para.ExpireEndDate = ExpireEndDate;
              console.log(JSON.stringify(para));
              console.log("添加", para);
              //return;
              GetMarketingsAdd(para).then(res => {
                this.$messager.alert({
                  title: "提示",
                  msg: res.Result.Message
                });
                console.log(res.Result.Message);
                this.$emit("childRadio", res.Result.Code);
              });
            }
          }
        });
      }else{
        this.saveForm()
      }
    },
    // 取消
    btnCancel() {},
    //营销类型
    MarketingMode() {
      const para = {
        EnumType: "MarketingTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.MarketingType = res.Result.Data;
        console.log(this.MarketingType);
      });
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
      const para = {
        EnumType: "MemberLevelTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.MemberLevelTypeData = res.Result.Data;
      });
    },
    CheckBoxAll(val, name) {
      // IsSuitPOS: null,
      // IsBackstage: null,
      // IsSuitWeChat: null,
      if (this.IsSuitPOS.includes("POS")) {
        this.MenberDialogForm.IsSuitPOS = true;
      } else {
        this.MenberDialogForm.IsSuitPOS = false;
      }
      if (this.IsSuitPOS.includes("微信")) {
        this.MenberDialogForm.IsSuitWeChat = true;
      } else {
        this.MenberDialogForm.IsSuitWeChat = false;
      }
      if (this.IsSuitPOS.includes("其他")) {
        this.MenberDialogForm.IsBackstage = true;
      } else {
        this.MenberDialogForm.IsBackstage = false;
      }
    },
    //营销总次数
    MarketingEveryoneNumbeMode() {
      const para = {
        EnumType: "MarketingTotalNumberTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.MarketingTotalNumberData = res.Result.Data;
      });
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
    },
    //消费条件
    MenberTypeMode() {
      const para = {
        EnumType: "ConsumptionConditionsTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.MenberTypeData = res.Result.Data;
      });
    },
    //
    getList() {
      if (this.RegisteredEdit != "") {
        const para = this.RegisteredEdit;
        this.dialogStatus = "";
        console.log(para);
        GetMarketingsEdit(para).then(res => {
          console.log(res.Result);
          this.IsSuitPOS = [];
          if (res.Result.Data.IsSuitPOS) {
            this.IsSuitPOS.push("POS");
          }
          if (res.Result.Data.IsBackstage) {
            this.IsSuitPOS.push("其他");
          }
          if (res.Result.Data.IsSuitWeChat) {
            this.IsSuitPOS.push("微信");
          }
          if (res.Result.Data.IsMsg) {
            this.IsMsg = "0";
          } else {
            this.IsMsg = "1";
          }
          this.OrganizationIdNum = res.Result.Data
            .MarketingOrganizationRangeList
            ? res.Result.Data.MarketingOrganizationRangeList.length
            : 0;
          this.MenberDialogForm = {
            IsSuitPOS: res.Result.Data.IsSuitPOS,
            IsBackstage: res.Result.Data.IsBackstage,
            IsSuitWeChat: res.Result.Data.IsSuitWeChat,
            Type: res.Result.Data.Type,
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
            MemberLevelType: res.Result.Data.MemberLevelType,
            Code: res.Result.Data.Code,
            IsMessage: res.Result.Data.IsMessage,
            MarketingMsgTemplate: {
              Content: ""
            },
            MarketingMessageTemplate: {
              Content: ""
            },
            MarketingOrganizationRangeList:
              res.Result.Data.MarketingOrganizationRangeList,
            MarketingComboAwardList: res.Result.Data.MarketingComboAwardList,
            MarketingCouponAwardList: res.Result.Data.MarketingCouponAwardList,
            MarketingWeChatAmountTemplate:
              res.Result.Data.MarketingWeChatAmountTemplate
          };
          if (res.Result.Data.MarketingTotalNumber == -1) {
            this.MarketingNumType = 0;
          } else {
            this.MarketingNumType = 1;
          }
          //把Num字段转化成CouponNum字段
          if(this.MenberDialogForm.MarketingCouponAwardList && this.MenberDialogForm.MarketingCouponAwardList.length>0){
            this.MenberDialogForm.MarketingCouponAwardList.map((item)=>{
              if(!item.CouponNum){
                item.CouponNum = item.Num;
              }
            });
          }
        });
      }
    },
    saveForm(index, row) {
      console.log(this.MarketingNumType);
      if (this.MarketingNumType == 0) {
        this.MenberDialogForm.MarketingTotalNumber = -1;
      }
      if (this.MenberDialogForm.OrganizationRangeType == 1) {
        if (this.OrganizationIdNum == 0) {
          this.$messager.alert({
            title: "提示",
            msg: "机构适用范围为线下机构，机构数量不能为0"
          });
          return;
        }
      }
      if(this.MenberDialogForm.MarketingCouponAwardList && this.MenberDialogForm.MarketingCouponAwardList.length>0){
        this.MenberDialogForm.MarketingCouponAwardList.map((item)=>{
          item.Num = item.CouponNum;
        });
      }
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            var ExpireBeginDate = null;
            var ExpireEndDate = null;
            if (this.MenberDialogForm.ExpireDateType == 0) {
              ExpireBeginDate = null;
              ExpireEndDate = null;
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
            // this.MenberDialogForm.ExpireBeginDate = ExpireBeginDate;
            // this.MenberDialogForm.ExpireEndDate = ExpireEndDate;
            this.MenberDialogForm.MarketingSublistId = this.RegisteredEdit.MarketingSublistId;
            this.MenberDialogForm.MarketingId = this.RegisteredEdit.MarketingId;
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(JSON.stringify(para));
            console.log("编辑", para);
            para.ExpireBeginDate = ExpireBeginDate;
            para.ExpireEndDate = ExpireEndDate;
            GetMarketingsEditSave(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              this.Message = res.Result.Message;
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
    MarketTypeChange() {
      //营销总次数类型判断
      console.log(this.MenberDialogForm.MarketingNumType);
      //  if(this.MenberDialogForm.MarketingNumType == 1){
      //    this.otherMarketType = 0;
      //  } else {
      //    this.otherMarketType = 1;
      //  }
      //  if(this.MenberDialogForm.MarketingNumType==0){
      //    this.MenberDialogForm.MarketingNumType = 1;
      //  }else{
      //    this.MenberDialogForm.MarketingNumType = 0;
      //  }
      //  console.log(this.MenberDialogForm.MarketingNumType)
    }
  },
  mounted() {
    // this.TerminalMode();
    this.PrerogativeTypeMode();
    this.MarketingMode();
    this.MenberTypeMode();
    this.MemberLevelTypeMode();
    //this.MarketingEveryoneNumbeMode();
    this.getList();
  }
};
</script>