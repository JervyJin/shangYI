<template>
  <div>
    <Form :model="MenberDialogForm" class="formStyle">
      <Tabs class="Tabsstyle">
        <TabPanel :title="'基本参数'">
          <div class="formStyle_list">
            <Label for="Name">活动名称</Label>
            <TextBox inputId="ActiveName" name="ActiveName" v-model="MenberDialogForm.ActiveName">
              <span class="c-red starpos">*</span>
            </TextBox>
            <span>20个中文字符以内</span>
          </div>
          <div class="formStyle_list">
            <Label for="Birthday">活动有效期</Label>
            <DateBox
              v-model="MenberDialogForm.BeginTime"
              format="yyyy-MM-dd"
              placeholder="操作日期 （起）"
            ></DateBox>
            <span class="mr-10 ml-10">至</span>
            <DateBox v-model="MenberDialogForm.EndTime" format="yyyy-MM-dd" placeholder="操作日期 （止）"></DateBox>
          </div>
          <div class="formStyle_list">
            <Label for="Name">每人每天限领</Label>
            <NumberBox
              v-model="MenberDialogForm.Times"
              inputId="AwardRechargeAmoun"
              name="AwardRechargeAmoun"
              :min="1"
            ></NumberBox>
            <span>1次</span>
          </div>
          <div class="formStyle_list">
            <Label for="Name">会员红包有效期</Label>
            <NumberBox
              v-model="MenberDialogForm.QualityDay"
              inputId="AwardRechargeAmoun"
              name="AwardRechargeAmoun"
              :min="1"
            ></NumberBox>
            <span>当天有效</span>
          </div>

          <div class="formStyle_list">
            <Label for="IsMsg" class="f-l">发送短信</Label>
            <CheckBox inputId value="0" v-model="MenberDialogForm.IsMsg"></CheckBox>
            <span class="ml-5 mr-10">启用微信通知</span>
            <CheckBox inputId value="0" v-model="MenberDialogForm.IsWeChat"></CheckBox>
            <span class="ml-5 mr-10">启用短信通知</span>
            <LinkButton class="btnDelete" @click="$refs.IsMsgDialog.open()">编辑短信</LinkButton>
          </div>
        </TabPanel>
        <!-- 例外商品 -->
        <TabPanel :title="'设置会员奖励'">
          <div class>
            <!--  -->
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
              :data="MenberDialogForm.HongBaoRegionList"
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
              <GridColumn align="center" title="操作" field="custome-adv" width="100">
                <template slot="body" slot-scope="scope">
                  <LinkButton class="btnDelete" @click="deleteBtn(scope.rowIndex)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                align="center"
                field="HongBaoMinMax"
                title="红包区间"
                v-model="MenberDialogForm.HongBaoRegionList.HongBaoMinMax"
                width="150"
              ></GridColumn>
              <GridColumn
                align="center"
                field="TotalAmount"
                title="红包发放总额（元）"
                v-model="MenberDialogForm.HongBaoRegionList.TotalAmount"
                width="150"
              ></GridColumn>
              <GridColumn
                align="center"
                field="HongBaoAllDate"
                title="发放时间"
                v-model="MenberDialogForm.HongBaoRegionList.HongBaoAllDate"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>

        <TabPanel :title="'微信分享设置'">
          <div class="vx-share">
            <div class="formStyle_list">
              <Label for="Awardintegral">分享主题</Label>
              <TextBox inputId="Title" name="Title" v-model="MenberDialogForm.Title">
                <span class="c-red starpos">*</span>
              </TextBox>
              <span>24个中文字符以内</span>
            </div>
            <div class="formStyle_list">
              <Label for="AwardRechargeAmoun">分享描述</Label>
              <TextBox
                inputId="Description"
                name="Description"
                v-model="MenberDialogForm.Description"
              >
                <span class="c-red starpos">*</span>
              </TextBox>
              <span>32个中文字符以内</span>
            </div>
            <div class="formStyle_list share-img">
              <Label for="AwardGrowth">分享图标</Label>
              <div class="add_img_box">
                <img src="../assets/upload_img.jpg" alt />
              </div>
            </div>
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
    <!-- 新增红包 -->
    <Dialog
      ref="PackageDialog"
      :dialogStyle="{width:'750px',height:'450px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="新增红包"
    >
      <redPacketBetween @getRedPacketBetween="getchildPackage"></redPacketBetween>
    </Dialog>
  </div>
</template>
<script>
import {
  AddHongBaoActive,
  GetSingleHongBao,
  UpdateHongBaoActive
} from "@/api/members";
import IsMsgDialog from "@/components/IsMsgDialog";
import redPacketBetween from "@/components/redPacketBetween";
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
      Menberlistfailure: "",
      dialogStatus: "create",
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
      MenberDialogForm: {
        ActiveName: "", //营销方案名称
        HongBaoMinMax: "", //红包区间
        BeginTime: new Date(),
        EndTime: new Date(),
        Quota: 0,
        Times: 1, //每人每天可领次数
        QualityDay: 1, //红包有效期
        IsMsg: false,
        IsMessage: 0, //发送短信
        IsWeChat: false,
        MsgTemplate: {
          Content: ""
        },
        MemberLevelType: 0,
        HongBaoRegionList: []
      }
    };
  },
  components: {
    IsMsgDialog,
    redPacketBetween
  },
  methods: {
    //删除套餐/券
    deleteBtn(index) {
      // debugger;
      console.log(index);
      this.MenberDialogForm.HongBaoRegionList.splice(index, 1);
    },
    saveForm() {
      //日期格式化处理
      var BeginTime = parseTime(
        this.MenberDialogForm.BeginTime,
        "{yyyy}-{mm}-{dd}" + " 00:00:00"
      );
      var EndTime = parseTime(
        this.MenberDialogForm.EndTime,
        "{yyyy}-{mm}-{dd}" + " 23:59:59"
      );
      if (this.IsMsg == true) {
        if (!this.MenberDialogForm.MarketingMsgTemplate.Content) {
          this.$messager.alert({
            title: "提示",
            msg: "开启发送短信时，内容模板不能为空"
          });
          return;
        }
      }
      if (
        this.MenberDialogForm.HongBaoRegionList &&
        this.MenberDialogForm.HongBaoRegionList.length > 0
      ) {
        this.MenberDialogForm.HongBaoRegionList.map(item => {
          if (item.TotalAmount == "不限") {
            item.TotalAmount = 0;
          }
        });
      }

      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            console.log(JSON.stringify(para));
            //return;
            const para = Object.assign({}, this.MenberDialogForm);
            para.BeginTime = BeginTime;
            para.EndTime = EndTime;
            console.log(JSON.stringify(para));
            UpdateHongBaoActive(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              console.log(res.Result);
              console.log(res.Result.Message);
              this.Message = res.Result.Message;
              if (this.Message == "修改成功") {
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
        GetSingleHongBao(para).then(res => {
          console.log(res.Result);
          this.MenberDialogForm = res.Result.Data;
          //日期处理
          this.MenberDialogForm.BeginTime = new Date(res.Result.Data.BeginTime);
          this.MenberDialogForm.EndTime = new Date(res.Result.Data.EndTime);
          //红包区间
          this.MenberDialogForm.HongBaoRegionList.map(item => {
            item.HongBaoMinMax =
              item.HongBaoMin + "元-" + item.HongBaoMax + "元";
            item.HongBaoAllDate = item.BeginTime + "～" + item.EndTime;
            if (item.TotalAmount == 0) {
              item.TotalAmount = "不限";
            }
          });
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
        //日期格式化处理
        var BeginTime = parseTime(
          this.MenberDialogForm.BeginTime,
          "{yyyy}-{mm}-{dd}" + " 00:00:00"
        );
        var EndTime = parseTime(
          this.MenberDialogForm.EndTime,
          "{yyyy}-{mm}-{dd}" + " 23:59:59"
        );
        if (this.IsMsg == true) {
          if (!this.MenberDialogForm.MarketingMsgTemplate.Content) {
            this.$messager.alert({
              title: "提示",
              msg: "开启发送短信时，内容模板不能为空"
            });
            return;
          }
        }
        if (
          this.MenberDialogForm.HongBaoRegionList &&
          this.MenberDialogForm.HongBaoRegionList.length > 0
        ) {
          this.MenberDialogForm.HongBaoRegionList.map(item => {
            if (item.TotalAmount == "不限") {
              item.TotalAmount = 0;
            }
          });
        }
        const para = Object.assign({}, this.MenberDialogForm);
        para.BeginTime = BeginTime;
        para.EndTime = EndTime;
        console.log(JSON.stringify(para));
        //return;
        this.$messager.alert({
          title: "提示",
          msg: "确认提交吗？",
          result: r => {
            if (r) {
              AddHongBaoActive(para).then(res => {
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

    //红包区间传值
    getchildPackage(data) {
      console.log(data);
      this.$refs.PackageDialog.close();
      this.MenberDialogForm.HongBaoRegionList.push(data);
      this.MenberDialogForm.HongBaoRegionList.map(item => {
        item.HongBaoMinMax = item.HongBaoMin + "元-" + item.HongBaoMax + "元";
        item.HongBaoAllDate = item.BeginTime + "～" + item.EndTime;
        // if(!item.IsCustomize){
        //   item.TotalAmount = "不限";
        // }
      });
      console.log(this.MenberDialogForm.HongBaoRegionList);
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
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style scoped>
.vx-share {
  height: 300px;
}
.share-img {
  height: 100px;
}
.formStyle_list.share-img .textbox-label {
  line-height: 99px;
  height: 99px;
}
.add_img_box {
  margin-bottom: 5px;
  vertical-align: top;
  width: 80px;
  height: 80px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  line-height: 20px;
  margin-top: 10px;
}
.bortrl {
  cursor: pointer;
}
</style>
