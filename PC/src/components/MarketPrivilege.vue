<template>
  <!-- 特权营销 -->
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
            <Label for="MemberLevelType" class="f-l">特权</Label>
            <div class="f-l">
              <ComboBox
                v-model="MenberDialogForm.PrivilegeType"
                :data="MemberLevelData"
                valueField="Code"
                textField="Name"
              ></ComboBox>
            </div>
            <div class="f-l ml-10" v-if="this.MenberDialogForm.PrivilegeType==1">
              <ComboBox
                v-model="MarketingPrivilegeList"
                textField="PrivilegeName"
                valueField="PrivilegeId"
                :multiple="true"
                :data="MemberLevelTypeData"
                placeholder="请选择"
              ></ComboBox>
            </div>
          </div>
          <div class="formStyle_list">
            <Label class="f-l" for="MarketingTotalNumber">营销总次数</Label>
            <div class="f-l">
              <ComboBox
                valueField="Code"
                textField="Name"
                :data="MarketingTotalNumberData"
                v-model="MenberDialogForm.MarketingTotalNumber"
              ></ComboBox>
            </div>
            <div class="f-l ml-10" v-if="this.MenberDialogForm.MarketingTotalNumber == 1">
              <NumberBox
                inputId="MarketingTotalNumber"
                name="MarketingTotalNumber"
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

      <div class="f-r mt-10">
        <!-- <LinkButton @click="btnCancel" class="btnCancel">取消</LinkButton> -->
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
      </div>
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
      <institutionsData @childValue="getchildData"></institutionsData>
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
  PrivilegeMarketingAdd,
  PrivilegeMarketingEdit,
  PrivilegeMarketingEditSave,
  GetMemberFeatureMarketing
} from "@/api/Market";
import Vouchers from "@/components/Vouchers";
import Package from "@/components/Package";
import { parseTime } from "@/utils/index";
import institutionsData from "@/components/institutionsData";
import IsMsgDialog from "@/components/IsMsgDialog";
export default {
  props: {
    RegisteredEdit: "",
    required: true
  },
  data() {
    return {
      dialogStatus: "create",
      MemberLevelData: [
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
      MarketingTotalNumberData: [
        //营销总次数
        {
          Code: -1,
          Name: "不限"
        },
        {
          Code: 0,
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

      IsMsg: 0,

      MemberLevelTypeData: [],
      MarketingPrivilegeList: [],
      MenberDialogForm: {
        Name: "",
        IsWeChat: false,
        IsMsg: false,
        IsMessage: false,
        MarketingMsgTemplate: {
          Content: ""
        },
        MarketingTotalNumber: 0,
        ExpireDateType: 0,
        ExpireBeginDate: new Date(),
        ExpireEndDate: new Date(),
        MarketingEveryoneNumbe: 0,
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
        MarketingMemberPrivilegeList: [],
        PrivilegeType: 0
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
    getIsMsgData(data) {
      console.log(data);
      this.$refs.IsMsgDialog.close();
      this.MenberDialogForm.MarketingMsgTemplate.Content = data;
    },
    getchildData(data) {
      this.$refs.MoneyDialog.close();
      this.arrID = [];
      data.forEach(data => {
        console.log(data.id);
        this.arrID.push(data.id);
      });
      console.log(this.arrID.length);
      this.OrganizationIdNum = this.arrID.length;
      this.MenberDialogForm.MarketingOrganizationRangeList.OrganizationId = this.arrID;
      console.log(
        this.MenberDialogForm.MarketingOrganizationRangeList.OrganizationId
      );
    },
    //添加
    submitForm: function() {
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            this.MenberDialogForm.Code = parseInt(
              Math.random() * 100
            ).toString();
            //日期判断
            if (this.MenberDialogForm.ExpireDateType == 0) {
              this.MenberDialogForm.ExpireBeginDate = null;
              this.MenberDialogForm.ExpireEndDate = null;
            } else {
              this.MenberDialogForm.ExpireBeginDate = parseTime(
                this.MenberDialogForm.ExpireBeginDate,
                "{yyyy}-{mm}-{dd} " + "00:00:00"
              );
              this.MenberDialogForm.ExpireEndDate = parseTime(
                this.MenberDialogForm.ExpireEndDate,
                "{yyyy}-{mm}-{dd} " + "23:59:59"
              );
            }
            //特权
            if (this.MenberDialogForm.PrivilegeType == 1) {
              this.Data = this.MarketingPrivilegeList;
              this.Data.forEach(data => {
                var arr = {};
                arr.PrivilegeId = data;
                this.MenberDialogForm.MarketingMemberPrivilegeList.push(arr);
                console.log(this.MenberDialogForm.MarketingMemberPrivilegeList);
              });
            }
            console.log();
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
            console.log(para);
            PrivilegeMarketingAdd(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              console.log(res.Result.Message);
              this.Message = res.Result.Code;
              this.$emit("childPrivilege", res.Result.Code);
            });
          }
        }
      });
    },

    // 取消
    btnCancel() {},
    //
    getList() {
      if (this.RegisteredEdit != "") {
        this.dialogStatus = "";
        const para = this.RegisteredEdit;
        console.log(para);
        PrivilegeMarketingEdit(para).then(res => {
          console.log(res.Result);
          this.PrerogativeTypeMode();
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
            MarketingWeChatAmountTemplate:
              res.Result.Data.MarketingWeChatAmountTemplate,
            MarketingMemberPrivilegeList:
              res.Result.Data.MarketingMemberPrivilegeList,
            MemberLevelType: res.Result.Data.MemberLevelType,
            PrivilegeType: res.Result.Data.PrivilegeType
          };
          // debugger
          this.MenberDialogForm.MarketingMemberPrivilegeList.forEach(
            element => {
              this.MarketingPrivilegeList.push(element.PrivilegeId);
            }
          );
          // this.MarketingPrivilegeList = res.Result.Data.MarketingMemberPrivilegeList;
          this.MenberDialogForm.MarketingMemberPrivilegeList = [];
          console.log(this.MarketingPrivilegeList);
        });
      }
    },
    saveForm(index, row) {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            if (this.MenberDialogForm.ExpireDateType == 0) {
              this.MenberDialogForm.ExpireBeginDate = null;
              this.MenberDialogForm.ExpireEndDate = null;
            } else {
              this.MenberDialogForm.ExpireBeginDate = parseTime(
                this.MenberDialogForm.ExpireBeginDate,
                "{yyyy}-{mm}-{dd} " + "00:00:00"
              );
              this.MenberDialogForm.ExpireEndDate = parseTime(
                this.MenberDialogForm.ExpireEndDate,
                "{yyyy}-{mm}-{dd}" + " 23:59:59"
              );
            }
            //特权
            if (this.MenberDialogForm.PrivilegeType == 1) {
              this.MenberDialogForm.MarketingMemberPrivilegeList = [];
              this.Data = this.MarketingPrivilegeList;
              this.Data.forEach(data => {
                var arr = {};
                arr.PrivilegeId = data;
                this.MenberDialogForm.MarketingMemberPrivilegeList.push(arr);
                console.log(this.MenberDialogForm.MarketingMemberPrivilegeList);
              });
            }
            this.MenberDialogForm.MarketingSublistId = this.RegisteredEdit.MarketingSublistId;
            this.MenberDialogForm.MarketingId = this.RegisteredEdit.MarketingId;
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            PrivilegeMarketingEditSave(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              this.Message = res.Result.Message;
              this.$emit("childPrivilege", res.Result.Code);
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
    //删除套餐/券
    deleteBtn(index) {
      // debugger;
      console.log(index);
      this.MenberDialogForm.MarketingComboAwardList.splice(index, 1);
    },
    deleteBtnCoupon(index) {
      this.MenberDialogForm.MarketingCouponAwardList.splice(index, 1);
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
    //特权
    PrerogativeTypeMode() {
      GetMemberFeatureMarketing().then(res => {
        console.log(res.Result);
        this.MemberLevelTypeData = res.Result.Data;
      });
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
    }
  },
  mounted() {
    this.PrerogativeTypeMode();
    this.MarketingEveryoneNumbeMode();
    this.getList();
  }
};
</script>