<template>
  <div>
    <Form :model="MenberDialogForm" class="formStyle">
      <Tabs class="Tabsstyle bordertop">
        <TabPanel :title="'基本参数'">
          <div class="formStyle_list">
            <Label for="Name">活动名称</Label>
            <TextBox inputId="Name" name="Name">
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Name">每人每天可领</Label>
            <TextBox inputId="Name" name="Name">
              <span class="c-red starpos">*</span>
            </TextBox>次
          </div>
          <div class="formStyle_list">
            <Label for="Birthday">有效日期</Label>
            <DateBox format="yyyy-MM-dd"></DateBox>
            <span class="mr-10 ml-10">至</span>
            <DateBox format="yyyy-MM-dd"></DateBox>
          </div>
          <div class="formStyle_list tixing">
            <Label for="Name">提醒方式</Label>
            <span
              v-for="fruit in IsShareData"
              :key="fruit"
              class="mr-10"
              @click="getIsShareVal(fruit)"
            >
              <RadioButton name="group2" :inputId="fruit" :value="fruit" v-model="IsShare"></RadioButton>
              <span :for="fruit">{{fruit}}</span>
            </span>
            <LinkButton class="btnDelete">编辑短信</LinkButton>
          </div>
        </TabPanel>
        <!-- 例外商品 -->
        <TabPanel :title="'设置会员奖励'">
          <div class>
            <p class="pstyle">
              <LinkButton
                class="btnAdd btn-primary radius iconfont iconadd f-16"
                @click="sendChildData"
              >添加</LinkButton>
              <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
              <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
              <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
            </p>
            <DataGrid
              :data="Menberlistwin"
              :pagination="true"
              class="minheight200"
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
                <template slot="body">
                  <LinkButton class="btnEdit">编辑</LinkButton>
                  <LinkButton class="btnDelete">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn align="center" title="红包区间" field="custome-adv"></GridColumn>
              <GridColumn field="Code" title="红包发放总额"></GridColumn>
              <GridColumn field="Name" title="发放时间"></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
        <!--  -->
        <TabPanel :title="'微信分享设置'">
          <!-- 品牌 -->
          <div class="bordertop">
            <div class="formStyle_list">
              <Label for="Name">分享主题</Label>
              <TextBox inputId="Name" name="Name">
                <span class="c-red starpos">*</span>
              </TextBox>
            </div>
            <div class="formStyle_list">
              <Label for="Name">分享描述</Label>
              <TextBox inputId="Name" name="Name">
                <span class="c-red starpos">*</span>
              </TextBox>
            </div>
          </div>
        </TabPanel>
      </Tabs>

      <div class="f-r mt-30">
        <LinkButton
          this.MarketingTypeAll="Share"
          v-if="dialogStatus=='create'"
          @click="submitForm()"
          class="btnConfirm"
        >确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm btn">保存</LinkButton>
      </div>
    </Form>
  </div>
</template>
<script>
import {
  GetEnumList,
  GetGoodsCatalogss,
  GetGoodsBrands,
  GetGoods,
  ComboAdd,
  ComboEdit,
  ComboEditSave
} from "@/api/Combo";
import { GetListOrganization } from "@/api/Service";
import { parseTime } from "@/utils/index";
import Vouchers from "@/components/Vouchers";
import ComboBrand from "@/components/ComboBrand";
import ComboCatalog from "@/components/ComboCatalog";
import CouponGoods from "@/components/CouponGoods";
export default {
  props: {
    RegisteredEdit: [],
    required: true
  },
  data() {
    return {
      Menberlistfailure: "",
      dialogStatus: "create",
      childData: 1,
      parentData: 1,
      DepositTypeData: [],
      Menberlistwin: [
        { Id: 1, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 2, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 3, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 4, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 5, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 6, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" }
      ],
      MarketingTotalNumber: "",
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
      ExpireDateTypeData: [],
      IsTransmit: "否",
      IsTransmitData: ["否", "是"],
      IsShare: "微信",
      IsShareData: ["微信", "短信"],
      OrganizationRangeTypeData: [],
      OrganizationIdData: [],
      MenberDialogForm: {
        Code: "",
        Name: "",
        StartTime: "",
        EndTime: "",
        DepositType: 0,
        DiscountAmount: 0,
        SalePrice: 0,
        Quota: 0,
        CouponNum: 0,
        ExpireDateType: 0,
        EffectExpireMonths: 0,
        IsTransmit: true,
        IsShare: true,
        OrganizationRangeType: 0,
        Picture1: "",
        Picture2: "",
        Remark: "",
        State: 0,
        ExpireBeginDate: new Date(),
        ExpireEndDate: new Date(),
        ComboApplicableCouponList: [],
        ComboExceptionGoodsList: [],
        ComboGoodsBrandList: [],
        ComboGoodsCatalogList: [],
        ComboGoodsList: [],
        ComboOrganizationRangeList: []
      }
    };
  },
  components: { Vouchers, ComboBrand, ComboCatalog, CouponGoods },
  methods: {
    sendChildData() {
      this.$emit("sendChildData", this.childData);
    },
    //新增
    btnNewAdd() {
      this.$refs.BasicData.open();
    },
    //红包发放总额
    getIsShareVal(data) {
      console.log(data);
    },
    //添加
    submitForm: function() {
      this.$emit("sendCloseParent", this.parentData);
    },
    //
    getList() {},
    saveForm(index, row) {}
  },
  mounted() {}
};
</script>
<style scoped>
.tixing {
  position: relative;
}
.appPacket {
  left: 284px;
  top: 6px;
}
</style>
