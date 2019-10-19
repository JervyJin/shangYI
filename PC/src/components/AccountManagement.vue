<template>
  <div class="container">
    <h4 class="mt-10">
      <span></span>账户管理
    </h4>
    <div class="btnwidth">
      <!-- <LinkButton class="btn" @click="$refs.PortraitDialog.open()">会员画像</LinkButton> -->
      <LinkButton
        class="btn btn-primary radius"
        @click="MoneyEditBtn"
        :disabled="MenberID.State == 0"
      >调整积分</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="LevelDialog"
        :disabled="MenberID.State == 0"
      >调整会员等级</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="BalanceDialog"
        :disabled="MenberID.State == 0"
      >扣减账户余额</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="UnbundDialog"
        :disabled="MenberID.State == 0"
      >微信解绑</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="FreezeDialog"
        :disabled="MenberID.State == 0"
      >账户冻结</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="ThawDialog"
        :disabled="MenberID.State == 1"
      >账户解冻</LinkButton>
    </div>

    <h4 style="border-top:none">
      <span></span>业务方案管理
    </h4>
    <div class="btnwidth">
      <LinkButton
        class="btn btn-primary radius"
        @click="EntityCardLoss"
        :disabled="MenberID.State == 0"
      >实体卡挂失</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="EntityCarduntie"
        :disabled="MenberID.State == 0"
      >实体卡解绑</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="combothaw"
        :disabled="MenberID.State == 0"
      >套餐解冻</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="comboFreeze"
        :disabled="MenberID.State == 0"
      >套餐冻结</LinkButton>
      <LinkButton
        class="btn btn-primary radius"
        @click="comboinvalid"
        :disabled="MenberID.State == 0"
      >套餐作废</LinkButton>
      <!-- table -->
      <DataGrid
        :data="Menberlist"
        :pagination="true"
        class="mt-30 DataGridstyle"
        style="min-height:200px"
        :columnResizing="true"
        :lazy="true"
        :pageNumber="pageNumber"
        :total="total"
        :pageSize="pageSize"
        @pageChange="pageChange($event)"
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
        <GridColumn
          align="center"
          type="index"
          cellCss="datagrid-td-rownumber"
          width="50"
          title="选择"
        >
          <template slot="body" slot-scope="scope">
            <RadioButton
              :inputId="scope.row.Id.toString()"
              :value="scope.row.Id.toString()"
              v-model="CouponMenberlistId"
            ></RadioButton>
          </template>
        </GridColumn>
        <GridColumn field="CombCode" title="套餐编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.CombCode}}</div>
          </template>
        </GridColumn>
        <GridColumn field="ComboName" title="套餐名称" width="120" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.ComboName}}</div>
          </template>
        </GridColumn>
        <GridColumn field="CardNo" title="实体卡号" width="200" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.CardNo}}</div>
          </template>
        </GridColumn>
        <GridColumn field="ExpireDate" title="有效期至" width="240" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.ExpireDate}}</div>
          </template>
        </GridColumn>
        <GridColumn field="RemainAmout" title="套餐剩余金额" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.RemainAmout}}</div>
          </template>
        </GridColumn>
        <GridColumn field="Statue" title="套餐状态" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.Statue}}</div>
          </template>
        </GridColumn>
        <GridColumn field="SourceType" title="来源类型" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.SourceType}}</div>
          </template>
        </GridColumn>
        <GridColumn field="IsFreeze" title="是否冻结" align="center">
          <template slot="body" slot-scope="scope">
            <div v-if="scope.row.IsFreeze" align="left">冻结</div>
            <div v-else align="left">未冻结</div>
          </template>
        </GridColumn>
        <GridColumn field="ReportLossState" title="是否挂失" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.ReportLossState}}</div>
          </template>
        </GridColumn>
      </DataGrid>
      <!-- 分页 -->
      <!-- <template slot="footer">
        <Pagination
          :total="total"
          :pageSize="pageSize"
          :pageNumber="pageNumber"
          :layout="pagelayout"
          @pageChange="onPageChange($event)"
        ></Pagination>
      </template>-->
    </div>
    <Dialog
      ref="MoneyEditDialog"
      :dialogStyle="{width:'450px',height:'350px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="调整积分"
    >
      <Form :model="MenberDialogForm" class="formStyle">
        <div class="formStyle_list">
          <Label for="BeforeValue">当前积分</Label>
          <NumberBox
            inputId="BeforeValue"
            name="BeforeValue"
            v-model="MenberDialogForm.BeforeValue"
            :readonly="true"
          ></NumberBox>
        </div>
        <div class="formStyle_list">
          <Label for="Type" class="f-l">类型</Label>
          <div v-for="fruit in fruits" class="f-l mr-20" :key="fruit">
            <RadioButton name="Type" :inputId="fruit" :value="fruit" v-model="Typevalue"></RadioButton>
            <span :for="fruit">{{fruit}}</span>
          </div>
        </div>
        <div class="formStyle_list">
          <Label for="AfterValue">调整积分</Label>
          <NumberBox
            inputId="AfterValue"
            name="AfterValue"
            v-model="MenberDialogForm.Value"
            :min="0"
            class="pr-20"
          >
            <span class="c-red starpos">*</span>
          </NumberBox>
        </div>
        <div class="formStyle_list">
          <Label for="Remark">备注</Label>
          <TextBox inputId="Remark" name="Remark" v-model="MenberDialogForm.Remark"></TextBox>
        </div>
        <div class="f-r mt-30">
          <LinkButton @click="$refs.MoneyEditDialog.close()" class="btnCancel">取消</LinkButton>
          <LinkButton @click="submitForm()" class="btnConfirm">确认</LinkButton>
        </div>
      </Form>
    </Dialog>
    <Dialog
      ref="LevelDialog"
      :dialogStyle="{width:'440px',height:'300px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="调整会员等级"
    >
      <DataGrid
        :data="Menberlevellist"
        :pagination="true"
        class="DataGridstyle pd-10"
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
        <GridColumn
          align="center"
          type="index"
          cellCss="datagrid-td-rownumber"
          width="50"
          title="选择"
        >
          <template slot="body" slot-scope="scope">
            <RadioButton :inputId="scope.row.Id" :value="scope.row.Id" v-model="MenberlistId"></RadioButton>
          </template>
        </GridColumn>
        <GridColumn field="Code" title="等级编码" align="center">
          <template slot="body" slot-scope="scope">
            <div align="right">{{scope.row.Code}}</div>
          </template>
        </GridColumn>
        <GridColumn field="Name" title="等级名称" align="center">
          <template slot="body" slot-scope="scope">
            <div align="left">{{scope.row.Name}}</div>
          </template>
        </GridColumn>
        <!--  <GridColumn field title="享受待遇">
          <template slot="body" slot-scope="scope">
            <LinkButton class="TagBtnCla" @click="MarketingPlan(scope.$index, scope.row)">详情</LinkButton>
          </template>
        </GridColumn>-->
      </DataGrid>
      <div class="btnstyle pd-10">
        <LinkButton @click="showParentComp" class="btnConfirm">确定</LinkButton>
      </div>
    </Dialog>
    <!-- 已有享受待遇 -->
    <Dialog
      ref="MarketingPlanDialog"
      title="享受待遇"
      :dialogStyle="{width:'450px',height:'350px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <ul>
        <li
          v-for="(item,index) in MarketingPlanmenuItem"
          :key="index"
          class="menuItemclass"
        >{{item.MarketingName}}</li>
      </ul>
    </Dialog>
    <Dialog
      ref="BalanceDialog"
      :dialogStyle="{width:'440px',height:'300px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="扣减账户余额"
    >
      <Form :model="MenberBalanceForm" class="formStyle">
        <div class="formStyle_list">
          <Label for="BeforeValue">当前余额</Label>
          <TextBox name="BeforeValue" v-model="BeforeAmount" :readonly="true" class="pr-20">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="AfterValue">扣减余额</Label>
          <NumberBox
            inputId="AfterValue"
            name="AfterValue"
            v-model="MenberBalanceForm.Amount"
            :precision="2"
            :min="0"
            class="pr-20"
          >
            <span class="c-red starpos">*</span>
          </NumberBox>
        </div>
        <div class="formStyle_list">
          <Label for="Remark">备注</Label>
          <TextBox inputId="Remark" name="Remark" v-model="MenberBalanceForm.Remark"></TextBox>
        </div>
        <div class="f-r mt-30">
          <LinkButton @click="$refs.BalanceDialog.close()" class="btnCancel">取消</LinkButton>
          <LinkButton @click="submitBalanceForm()" class="btnConfirm">确认</LinkButton>
        </div>
      </Form>
    </Dialog>
    <Dialog
      ref="UnbundDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="微信解绑"
    ></Dialog>
    <Dialog
      ref="FreezeDialog"
      :dialogStyle="{width:'380px',height:'190px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      :title="Thawtitle"
    >
      <div class="container FormTop">
        <div class="formStyle_list" style="border-top:1px solid #e0e6ed">
          <Label for="Reason">理由</Label>
          <TextBox inputId="Reason" name="Reason" v-model="Reason"></TextBox>
        </div>
        <div class="f-r mt-20 mr-20">
          <LinkButton @click="$refs.FreezeDialog.close()" class="btnCancel">取消</LinkButton>
          <LinkButton @click="FreezesubmitForm" class="btnConfirm">确认</LinkButton>
        </div>
      </div>
    </Dialog>
    <!-- 套餐 -->
    <Dialog
      ref="comboDialog"
      :dialogStyle="{width:'380px',height:'175px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      :title="comboTitle"
    >
      <div class="container FormTop">
        <div class="formStyle_list" style="border-top:1px solid #e0e6ed">
          <Label for="Reason">理由</Label>
          <TextBox inputId="Reason" name="Reason" v-model="comboReason"></TextBox>
        </div>
        <div class="f-r mt-20 mr-20">
          <LinkButton @click="$refs.comboDialog.close()" class="btnCancel">取消</LinkButton>
          <LinkButton v-if="this.comboTitle!='套餐作废'" @click="combosubmitForm" class="btnConfirm">确认</LinkButton>
          <LinkButton v-else @click="ComboStateinvalid" class="btnConfirm">保存</LinkButton>
        </div>
      </div>
    </Dialog>

    <Dialog
      ref="EntityCardDialog"
      :dialogStyle="{width:'380px',height:'240px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      :title="EntityCardTitle"
    >
      <Form :model="MenberEntityCardForm" class="formStyle">
        <div class="container">
          <div class="formStyle_list">
            <Label for="DarkNo">卡号</Label>
            <TextBox
              inputId="DarkNo"
              name="DarkNo"
              v-model="MenberEntityCardForm.DarkNo"
              :readonly="true"
            >
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Reason">理由</Label>
            <TextBox inputId="Reason" name="Reason" v-model="MenberEntityCardForm.Reason"></TextBox>
          </div>
          <div class="f-r mt-20">
            <LinkButton @click="$refs.EntityCardDialog.close()" class="btnCancel">取消</LinkButton>
            <LinkButton @click="EntityCardFormBtn" class="btnConfirm">确认</LinkButton>
          </div>
        </div>
      </Form>
    </Dialog>
  </div>
</template>
<script>
import {
  MemberUpdateState,
  GetMemberScore,
  AddMemberScoreChange,
  UpdateState,
  AddMemberLevelChange,
  UpdateMemberComboFreeze,
  GetMemberAmount,
  UpdateMemberAmount,
  UpdateMemberReportLossState,
  RemoveCombo,
  GetMemberComboInfoById,
  weChatUnBound,
  GetMemberLevelChg,
  MemberGetCouponAward
} from "@/api/members";
export default {
  props: {
    MenberID: {},
    required: true
  },
  data() {
    return {
      MenberlistId: "",
      disabled: true,
      CouponMenberlistId: "",
      MarketingPlanmenuItem: [],
      Menberlevellist: [],
      Menberlist: [],
      Thawtitle: "",
      Typevalue: "增加",
      ComboState: 2,
      //账户冻结、解冻
      Reason: "",
      //调整积分
      fruits: ["增加", "减少"],
      MenberDialogForm: {
        MemberId: "",
        MemberCode: "",
        MemberName: "",
        MemberPhone: "",
        BeforeValue: 0,
        SourceType: 1,
        TerminalType: 0,
        AfterValue: 0,
        Value: 0,
        SourceId: "",
        Remark: ""
      },
      //扣减余额
      BeforeAmount: "",
      MenberBalanceForm: {
        Amount: "",
        Remark: "",
        MemberId: ""
      },
      //实体卡
      EntityCardTitle: "",
      MenberEntityCardForm: {
        DarkNo: "",
        Reason: ""
      },
      comboTitle: "",
      comboReason: "",
      //分页
      total: 0,
      pageSize: 10,
      pageNumber: 1,
      pagelayout: [
        "list",
        "sep",
        "first",
        "prev",
        "next",
        "last",
        "sep",
        "refresh",
        "info"
      ],
      defaultStatus: false
    };
  },
  methods: {
    //查询当前积分
    MoneyEditBtn() {
      this.MenberDialogForm = {
        BeforeValue: 0,
        Value: 0,
        Remark: ""
      };
      console.log(this.MenberID);
      if (this.MenberID != "" || this.MenberID != null) {
        const para = {
          MemberId: this.MenberID.Id
        };
        console.log(para);
        GetMemberScore(para).then(res => {
          if (res.Result.Code == 0) {
            console.log(res.Result);
            this.$refs.MoneyEditDialog.open();
            this.MenberDialogForm.BeforeValue = res.Result.Data.Score;
            this.MenberDialogForm.MemberId = res.Result.Data.MemberId;
          }
        });
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },
    //调整积分
    submitForm() {
      if (this.MenberID != "" || this.MenberID != null) {
        console.log(this.MenberID);
        if (this.Typevalue == "增加") {
          this.MenberDialogForm.AfterValue =
            Number(this.MenberDialogForm.BeforeValue) +
            Number(this.MenberDialogForm.Value);
        } else if (this.Typevalue == "减少") {
          this.MenberDialogForm.AfterValue =
            Number(this.MenberDialogForm.BeforeValue) -
            Number(this.MenberDialogForm.Value);
        }
        console.log(this.AfterValue);
        const para1 = {
          MemberId: this.MenberID.Id,
          MemberCode: this.MenberID.Code,
          MemberName: this.MenberID.RealName,
          MemberPhone: this.MenberID.Phone
        };
        const para = Object.assign({}, this.MenberDialogForm, para1);
        console.log("调整积分", para);
        AddMemberScoreChange(para).then(res => {
          console.log(this.dataIf);
          if (res.Result.Code == 0) {
            console.log(res.Result);
            this.$refs.MoneyEditDialog.close();
            this.$messager.alert({
              title: "提示",
              msg: res.Result.Message
            });
            this.Message = res.Result.Code;
            this.$emit("childValue", this.Message);
          }
        });
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },

    //账户冻结、解冻
    FreezesubmitForm() {
      let _this = this;
      if (this.MenberID != "" || this.MenberID != null) {
        this.Reason = "";
        if (this.MenberID != "" || this.MenberID != null) {
          if (this.Thawtitle == "账户冻结") {
            this.State = 0;
          } else if (this.Thawtitle == "账户解冻") {
            this.State = 1;
          }
          const para = {
            Id: this.MenberID.Id,
            State: this.State,
            Remark: this.Reason
          };
          console.log(para);
          MemberUpdateState(para).then(res => {
            if (_this.State == 0) {
              _this.MenberID.State = 0;
            } else {
              _this.MenberID.State = 1;
            }
            this.$messager.alert({
              title: "提示",
              msg: res.Result.Message
            });
            this.$refs.FreezeDialog.close();
          });
        } else {
          this.$messager.alert({
            title: "提示",
            msg: "请先查询会员信息"
          });
        }
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },
    FreezeDialog() {
      if (this.MenberID != "" || this.MenberID != null) {
        this.$refs.FreezeDialog.open();
        this.Thawtitle = "账户冻结";
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },
    ThawDialog() {
      if (this.MenberID != "" || this.MenberID != null) {
        this.$refs.FreezeDialog.open();
        this.Thawtitle = "账户解冻";
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },
    //weChatUnBound 微信解绑
    UnbundDialog() {
      if (this.MenberID != "" || this.MenberID != null) {
        console.log(this.MenberID, this.MenberID.IsWx);
        if (this.MenberID.IsWx == true) {
          this.$messager.ok = "确定";
          this.$messager.confirm({
            title: "微信解绑",
            msg: "是否解绑微信？",
            result: r => {
              if (r) {
                const para = {
                  Id: this.MenberID.Id
                };
                console.log(para);
                weChatUnBound(para).then(res => {
                  this.$messager.alert({
                    title: "提示",
                    msg: res.Result.Message
                  });
                });
              }
            }
          });
        } else {
          this.$messager.alert({
            title: "提示",
            msg: "该会员暂无绑定微信"
          });
        }
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },
    //扣减余额
    //查询当前余额
    BalanceDialog() {
      this.MenberBalanceForm.Amount = "";
      this.MenberBalanceForm.Remark = "";
      if (this.MenberID != "" || this.MenberID != null) {
        const para = {
          MemberId: this.MenberID.Id
        };
        GetMemberAmount(para).then(res => {
          console.log(res.Result);
          this.$refs.BalanceDialog.open();
          this.BeforeAmount = res.Result.Message;
        });
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },
    //调整余额
    submitBalanceForm() {
      if (this.MenberID != "" || this.MenberID != null) {
        const para1 = {
          MemberId: this.MenberID.Id
        };
        const para = Object.assign({}, this.MenberBalanceForm, para1);
        console.log(para);
        UpdateMemberAmount(para).then(res => {
          console.log(res.Result);
          this.$refs.BalanceDialog.close();
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
          this.Message = res.Result.Code;
          this.$emit("childValue", this.Message);
        });
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },
    //会员等级变动
    LevelDialog() {
      GetMemberLevelChg().then(res => {
        console.log(res.Result.Data);
        this.Menberlevellist = res.Result.Data;
        console.log(this.Menberlevellist);
        this.$refs.LevelDialog.open();
      });
    },
    //确定变更
    showParentComp() {
      if (this.MenberID != "" || this.MenberID != null) {
        console.log(this.MenberlistId);
        console.log(this.MenberID);
        const para = {
          MemberId: this.MenberID.Id,
          BeforeLevelId: this.MenberID.Id,
          AfterLevelId: this.MenberlistId
        };
        console.log(para);
        AddMemberLevelChange(para).then(res => {
          console.log(res.Result);
          this.$refs.LevelDialog.close();
          this.$messager.alert({
            title: "提示",
            msg: res.Result.Message
          });
          this.Message = res.Result.Code;
          this.$emit("childValue", this.Message);
        });
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "请先查询会员信息"
        });
      }
    },
    //享受待遇
    // MarketingPlan(index, row) {
    //   const para = { Id: row.Id, page: this.pageNumber, rows: this.pageSize };
    //   console.log(para);
    //   GetMarketingMemberLevel(para).then(res => {
    //     this.$refs.MarketingPlanDialog.open();
    //     this.MarketingPlanmenuItem = res.Result.Rows;
    //     console.log(this.MarketingPlanmenuItem);
    //   });
    // },
    //业务方案办理

    //实体卡
    EntityCardLoss() {
      var obj = this.getsubListFormList(
        this.Menberlist,
        this.CouponMenberlistId,
        "Id"
      );
      console.log("实体卡状态", obj.ReportLossState);
      if (obj.CardNo) {
        if (obj.ReportLossState == "已挂失") {
          this.$messager.alert({
            title: "提示",
            msg: "实体卡未挂失"
          });
        } else {
          this.GetEntityCard();
          this.MenberEntityCardForm = {};
          this.MenberEntityCardForm.DarkNo = obj.CardNo;
          this.EntityCardTitle = "实体卡挂失";
        }
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "未绑定实体卡"
        });
      }
    },
    EntityCarduntie() {
      var obj = this.getsubListFormList(
        this.Menberlist,
        this.CouponMenberlistId,
        "Id"
      );
      console.log(obj.ReportLossState);
      if (obj.CardNo) {
        if (obj.ReportLossState == "未挂失") {
          this.$messager.alert({
            title: "提示",
            msg: "实体卡未挂失"
          });
        } else {
          this.GetEntityCard();
          this.MenberEntityCardForm = {};
          this.MenberEntityCardForm.DarkNo = obj.CardNo;
          this.EntityCardTitle = "实体卡解绑";
        }
      } else {
        this.$messager.alert({
          title: "提示",
          msg: "未绑定实体卡"
        });
      }
    },
    // 实体卡提交
    EntityCardFormBtn() {
      if (this.EntityCardTitle == "实体卡解绑") {
        this.ReportLossState = 0;
      }
      if (this.EntityCardTitle == "实体卡挂失") {
        this.ReportLossState = 1;
      }
      const para1 = {
        ReportLossState: this.ReportLossState,
        MemberId: this.MenberID.Id,
        DarkNo: this.MenberEntityCardForm.DarkNo
      };
      const para = Object.assign({}, this.MenberEntityCardForm, para1);
      console.log("实体卡提交", para);
      UpdateMemberReportLossState(para).then(res => {
        this.getList();
        this.$messager.alert({
          title: "提示",
          msg: res.Result.Message
        });
        this.$refs.EntityCardDialog.close();
      });
    },

    // 实体卡
    GetEntityCard() {
      if (this.CouponMenberlistId == "") {
        this.$messager.alert({
          title: "提示",
          msg: "请先选择套餐"
        });
      } else {
        this.$refs.EntityCardDialog.open();
        this.EntityCardTitle = "";
      }
    },
    //套餐解冻UpdateComboState
    combothaw() {
      var obj = this.getsubListFormList(
        this.Menberlist,
        this.CouponMenberlistId,
        "Id"
      );
      console.log("套餐状态", obj.IsFreeze);
      if (obj.IsFreeze == false) {
        this.$messager.alert({
          title: "提示",
          msg: "套餐未冻结"
        });
      } else {
        this.ComboStateId();
        this.comboTitle = "套餐解冻";
      }
    },
    //套餐冻结UpdateComboState
    comboFreeze() {
      var obj = this.getsubListFormList(
        this.Menberlist,
        this.CouponMenberlistId,
        "Id"
      );
      console.log(obj.IsFreeze);
      if (obj.IsFreeze == true) {
        this.$messager.alert({
          title: "提示",
          msg: "套餐已冻结"
        });
      } else {
        this.ComboStateId();
        this.comboTitle = "套餐冻结";
      }
    },
    combosubmitForm() {
      if (this.comboTitle == "套餐冻结") {
        this.State = true;
      } else if (this.comboTitle == "套餐解冻") {
        this.State = false;
      }
      const para = {
        MemberComboId: this.CouponMenberlistId,
        state: this.State
      };
      console.log(para);
      UpdateMemberComboFreeze(para).then(res => {
        this.getList();
        this.$messager.alert({
          title: "提示",
          msg: res.Result.Message
        });
        this.$refs.comboDialog.close();
        console.log(this.MenberID);
      });
    },
    //套餐作废 RemoveCombo
    comboinvalid() {
      this.ComboStateId();
      this.comboTitle = "套餐作废";
    },

    ComboStateId() {
      console.log(this.CouponMenberlistId);
      if (this.CouponMenberlistId == "") {
        this.$messager.alert({
          title: "提示",
          msg: "请先选择套餐"
        });
      } else {
        this.$refs.comboDialog.open();
        this.comboReason = "";
      }
    },
    ComboStateinvalid() {
      const para = {
        Id: this.CouponMenberlistId
        // state: this.State
      };
      console.log("套餐作废", para);
      RemoveCombo(para).then(res => {
        this.$messager.alert({
          title: "提示",
          msg: res.Result.Message
        });
        this.getList();
        this.CouponMenberlistId = "";
        this.$refs.comboDialog.close();
        console.log(this.MenberID);
      });
    },
    getsubListFormList(srcList, valueList, field) {
      if (
        !srcList ||
        srcList.length == 0 ||
        !valueList ||
        valueList.length == 0
      ) {
        return [];
      }
      var result = {};
      result = this.getObjectFormList(srcList, field, valueList);
      return result;
    },
    getObjectFormList(srcList, field, value) {
      for (var i = 0; i < srcList.length; i++) {
        if (srcList[i][field] == value) {
          return srcList[i];
        }
      }
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getList();
    },
    getList() {
      console.log("跳转", this.MenberID);
      const para = {
        Id: this.MenberID.Id,
        page: this.pageNumber,
        rows: this.pageSize
      };
      console.log("办理", para);
      GetMemberComboInfoById(para).then(res => {
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
        console.log(this.Menberlist);
      });
    }
  },
  mounted() {
    this.getList();
    // console.log("跳转", this.MenberID);
  },
  watch: {
    MenberID(newValue, oldValue) {
      // debugger;
      this.MenberID = newValue;
      this.getList();
      this.getsubListFormList();
      this.CouponMenberlistId = "";
      console.log("子组件获取的值", this.MenberID);
    }
  }
};
</script>
<style scoped>
.FormTop {
  padding: 0 15px;
  border-top: none;
}
.formStyle {
  margin-top: 25px;
  border-top: 1px solid #e0e6ed;
}
.btn-primary {
  width: auto;
  padding: 0 5px;
  margin-left: 10px;
}
.btnwidth {
  border: 1px solid #e0e6ed;
  padding: 0;
  border-top: none;
  padding: 30px 20px;
}

h4 {
  width: 100%;
  background: #f5f8fc;
  border: 1px solid #e0e6ed;
  height: 40px;
  line-height: 40px;
  font-weight: 500;
  padding-left: 15px;
}
h4 span {
  display: inline-block;
  width: 3px;
  height: 20px;
  background: #5ba1e7;
  margin-right: 10px;
  margin-top: 10px;
  float: left;
}
.formStyle_list .textbox-label {
  width: 90px;
}
</style>
