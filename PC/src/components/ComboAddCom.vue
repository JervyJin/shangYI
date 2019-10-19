<template>
  <div>
    <Form :model="MenberDialogForm" class="formStyle">
      <Tabs class="Tabsstyle">
        <TabPanel :title="'基本参数'">
          <!--  -->
          <div class="formStyle_list">
            <!--<div class="f-l" style="width:50%">
              <Label for="Code" class="f-l">套餐编码</Label>
              <TextBox
                inputId="Code"
                name="Code"
                v-model="MenberDialogForm.Code"
                placeholder="套餐编码"
              ></TextBox>
            </div>-->
            <div class="f-l">
              <Label for="Name" class="f-l">套餐名称</Label>
              <TextBox
                inputId="Name"
                name="Name"
                v-model="MenberDialogForm.Name"
                placeholder="套餐名称"
              ></TextBox>
            </div>
          </div>
          <!--  -->
          <div class="formStyle_list">
            <div class="f-l" style="width:50%">
              <Label for="DepositType" class="f-l">预存类型</Label>
              <ComboBox
                valueField="Code"
                textField="Name"
                :data="DepositTypeData"
                v-model="MenberDialogForm.DepositType"
                placeholder="预存类型"
              ></ComboBox>
            </div>
            <div class="f-l" v-if="this.MenberDialogForm.DepositType == 0">
              <Label for="DiscountAmount" class="f-l">预存金额</Label>
              <NumberBox
                inputId="DiscountAmount"
                name="DiscountAmount"
                v-model="MenberDialogForm.DiscountAmount"
                :min="0"
              ></NumberBox>
            </div>
          </div>
          <!--  -->
          <div class="formStyle_list">
            <div class="f-l" style="width:50%">
              <Label for="IsTransmit" class="f-l">是否可转赠</Label>
              <div
                v-for="(fruit,index) in IsTransmitData"
                :key="index"
                class="f-l mr-10"
                @click="getIsTransmitVal(fruit)"
              >
                <RadioButton
                  name="group1"
                  :inputId="fruit.Id"
                  :value="fruit.Id"
                  v-model="IsTransmit"
                ></RadioButton>
                <span :for="fruit">{{fruit.Name}}</span>
              </div>
            </div>
            <div class="f-l">
              <Label for="IsShare" class="f-l">是否分享</Label>
              <div
                v-for="(fruit,index) in IsShareData"
                :key="index"
                class="f-l mr-10"
                @click="getIsShareVal(fruit)"
              >
                <RadioButton name="group2" :inputId="fruit.Id" :value="fruit.Id" v-model="IsShare"></RadioButton>
                <span :for="fruit">{{fruit.Name}}</span>
              </div>
            </div>
          </div>
          <div class="formStyle_list">
            <div class="f-l" style="width:50%">
              <Label class="f-l" for="SalePrice">零售价</Label>
              <NumberBox
                inputId="SalePrice"
                name="SalePrice"
                v-model="MenberDialogForm.SalePrice"
                :min="0"
              ></NumberBox>
            </div>
            <div class="f-l">
              <Label for="ExpireDateType" class="f-l">有效期</Label>
              <ComboBox
                valueField="Code"
                textField="Name"
                :data="ExpireDateTypeData"
                v-model="MenberDialogForm.ExpireDateType"
                placeholder="请选择"
              ></ComboBox>
            </div>
          </div>
          <div class="formStyle_list" v-if="this.MenberDialogForm.ExpireDateType==1">
            <Label for="ExpireBeginDate" class="f-l">自定义</Label>
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

          <div class="formStyle_list" v-if="this.MenberDialogForm.ExpireDateType==2">
            <Label for="EffectDays" class="f-l">固定时长</Label>自激活后生效，有效期
            <NumberBox v-model="MenberDialogForm.EffectExpireMonths" style="width:120px;" :min="0"></NumberBox>天
          </div>

          <div class="formStyle_list" v-if="this.MenberDialogForm.DepositType==0">
            <Label class="f-l" for="MarketingTotalNumber">支付限额</Label>
            <div class="f-l">
              <ComboBox
                valueField="Code"
                textField="Name"
                :data="MarketingTotalNumberData"
                v-model="MarketingTotalNumber"
              ></ComboBox>
            </div>
            <div class="f-l" v-if="this.MarketingTotalNumber==1">
              最高可支付订单金额的
              <NumberBox v-model="MenberDialogForm.Quota" :min="1" style="width:120px;"></NumberBox>%
            </div>
          </div>

          <div class="formStyle_list" style="height:200px">
            <Label for="OrganizationId" class="f-l" style="height:200px">销售机构</Label>
            <div class="f-l" style="height:200px;overflow: auto;width:410px">
              <Tree
                :data="OrganizationIdData"
                :checkbox="true"
                @checkChange="checkedNodes($event)"
                ref="c_tree"
              >
                <template slot-scope="scope">
                  <span>{{scope.node.Name}}</span>
                </template>
              </Tree>
            </div>
          </div>

          <div class="formStyle_list">
            <div class="f-l" style="width:50%">
              <Label for="OrganizationRangeType">使用机构</Label>
              <ComboBox
                v-model="MenberDialogForm.OrganizationRangeType"
                :data="OrganizationRangeTypeData"
                valueField="Code"
                textField="Name"
                placeholder="使用机构"
              ></ComboBox>
            </div>
            <div class="f-l">
              <Label for="Remark">备注</Label>
              <TextBox inputId="Remark" name="Remark" v-model="MenberDialogForm.Remark"></TextBox>
            </div>
          </div>
        </TabPanel>
        <!-- 例外商品 -->
        <TabPanel :title="'例外商品'" v-if="MenberDialogForm.DepositType!=4">
          <div class="bordertop">
            <p class="pstyle">
              <LinkButton
                class="btnAdd btn-primary radius iconfont iconadd f-16"
                @click="$refs.ExceptionDialog.open()"
              >添加</LinkButton>
              <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
              <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
              <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
            </p>
            <DataGrid
              :data="MenberDialogForm.ComboExceptionGoodsList"
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
                field="GoodCode"
                title="商品编码"
                v-model="MenberDialogForm.ComboExceptionGoodsList.GoodCode"
              ></GridColumn>
              <GridColumn
                field="GoodName"
                title="商品名称"
                v-model="MenberDialogForm.ComboExceptionGoodsList.GoodName"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
        <!--  -->
        <TabPanel :title="'套餐详情'" v-if="this.MenberDialogForm.DepositType==1">
          <!-- 品牌 -->
          <div class="bordertop">
            <p class="pstyle">
              <LinkButton
                class="btnAdd btn-primary radius iconfont iconadd f-16"
                @click="$refs.ComboBrandDialog.open()"
              >添加</LinkButton>
              <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
              <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
              <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
            </p>
            <DataGrid
              :data="MenberDialogForm.ComboGoodsBrandList"
              :pagination="true"
              class="minheight200"
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
                  <LinkButton class="btnDelete" @click="deleteBrandBtn(scope.rowIndex)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                field="GoodsBrandCode"
                title="品牌编码"
                v-model="MenberDialogForm.ComboGoodsBrandList.GoodsBrandCode"
              ></GridColumn>
              <GridColumn
                field="GoodsBrandName"
                title="品牌名称"
                v-model="MenberDialogForm.ComboGoodsBrandList.GoodsBrandName"
              ></GridColumn>
              <GridColumn
                field="GoodsBrandAmount"
                title="品牌金额"
                :editable="true"
                v-model="MenberDialogForm.ComboGoodsBrandList.GoodsBrandAmount"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
        <TabPanel :title="'套餐详情'" v-if="this.MenberDialogForm.DepositType==2">
          <!-- 商品信息 -->
          <div class="bordertop">
            <p class="pstyle">
              <LinkButton
                class="btnAdd btn-primary radius iconfont iconadd f-16"
                @click="$refs.ComboCatalogDialog.open()"
              >添加</LinkButton>
              <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
              <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
              <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
            </p>
            <DataGrid
              :data="MenberDialogForm.ComboGoodsList"
              :pagination="true"
              class="minheight200"
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
                  <LinkButton class="btnDelete" @click="deleteGoodsBtn(scope.rowIndex)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                field="GoodCode"
                title="商品编码"
                v-model="MenberDialogForm.ComboGoodsList.GoodCode"
              ></GridColumn>
              <GridColumn
                field="GoodName"
                title="商品名称"
                v-model="MenberDialogForm.ComboGoodsList.GoodName"
              ></GridColumn>
              <GridColumn
                field="GoodAmount"
                title="商品金额"
                :editable="true"
                v-model="MenberDialogForm.ComboGoodsList.GoodAmount"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
        <TabPanel :title="'套餐详情'" v-if="this.MenberDialogForm.DepositType==3">
          <!-- 分类 -->
          <div class="bordertop">
            <p class="pstyle">
              <LinkButton
                class="btnAdd btn-primary radius iconfont iconadd f-16"
                @click="$refs.CouponGoodsDialog.open()"
              >添加</LinkButton>
              <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
              <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
              <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
            </p>
            <DataGrid
              :data="MenberDialogForm.ComboGoodsCatalogList"
              :pagination="true"
              class="minheight200"
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
                  <LinkButton class="btnDelete" @click="deleteCatalogBtn(scope.rowIndex)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                field="GoodsCatalogCode"
                title="商品分类"
                v-model="MenberDialogForm.ComboGoodsCatalogList.GoodsCatalogCode"
              ></GridColumn>
              <GridColumn
                field="GoodsCatalogName"
                title="分类名称"
                v-model="MenberDialogForm.ComboGoodsCatalogList.GoodsCatalogName"
              ></GridColumn>
              <GridColumn
                field="GoodsCatalogAmount"
                title="分类金额"
                :editable="true"
                v-model="MenberDialogForm.ComboGoodsCatalogList.GoodsCatalogAmount"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
        <TabPanel :title="'套餐详情'" v-if="this.MenberDialogForm.DepositType==4">
          <!-- 券类别 -->
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
              class="minheight200"
              :data="MenberDialogForm.ComboApplicableCouponList"
              :pagination="true"
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
                  <LinkButton class="btnDelete" @click="deleteApplicableBtn(scope.rowIndex)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                field="ApplicableType"
                title="适用类型"
                v-model="MenberDialogForm.ComboApplicableCouponList.ApplicableType"
              ></GridColumn>
              <GridColumn
                field="CouponName"
                title="券名称"
                v-model="MenberDialogForm.ComboApplicableCouponList.CouponName"
              ></GridColumn>
              <GridColumn
                field="CouponCode"
                title="券ID"
                v-model="MenberDialogForm.ComboApplicableCouponList.CouponCode"
              ></GridColumn>
              <GridColumn
                field="CouponNum"
                title="数量"
                :editable="true"
                v-model="MenberDialogForm.ComboApplicableCouponList.CouponNum"
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
      <Vouchers
        @vouchers="getchildVouchers"
        :choseCouponList="MenberDialogForm.ComboApplicableCouponList"
      ></Vouchers>
    </Dialog>
    <!-- 添加 商品类别-->
    <Dialog
      ref="CouponGoodsDialog"
      :dialogStyle="{width:'500px',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="商品类别"
    >
      <CouponGoods
        @ComboGoodsCategory="getCouponGoods"
        :choseCategoryList="MenberDialogForm.ComboGoodsCatalogList"
      ></CouponGoods>
    </Dialog>
    <!-- 添加 商品-->
    <Dialog
      ref="ComboCatalogDialog"
      :dialogStyle="{width:'80%',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="商品"
    >
      <ComboCatalog @ComboCatalog="getComboCatalog"></ComboCatalog>
    </Dialog>
    <!-- 添加 品牌-->
    <Dialog
      ref="ComboBrandDialog"
      :dialogStyle="{width:'500px',height:'400px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="商品品牌"
    >
      <ComboBrand @ComboBrand="getComboBrand"></ComboBrand>
    </Dialog>
    <!-- 添加 例外-->
    <Dialog
      ref="ExceptionDialog"
      :dialogStyle="{width:'80%',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="商品"
    >
      <ExceptionDialog @ComboCatalog="getExceptionDialog"></ExceptionDialog>
    </Dialog>
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
import ExceptionDialog from "@/components/ExceptionDialog";
import CouponGoods from "@/components/CouponGoods";
export default {
  props: {
    RegisteredEdit: {},
    required: true
  },
  data() {
    return {
      Menberlistfailure: [],
      dialogStatus: "create",
      Menberlistwin: [],
      DepositTypeData: [],
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
      IsTransmit: "0",
      IsTransmitData: [{ Id: "0", Name: "否" }, { Id: "1", Name: "是" }],
      IsShare: "0",
      IsShareData: [{ Id: "0", Name: "否" }, { Id: "1", Name: "是" }],
      OrganizationRangeTypeData: [],
      OrganizationIdData: [],
      ComboOrganizationRangeList: [],
      MenberDialogForm: {
        Code: "",
        Name: "",
        DepositType: 0,
        DiscountAmount: 0,
        SalePrice: 0,
        Quota: null,
        CouponNum: 0,
        ExpireDateType: 0,
        EffectExpireMonths: 0,
        IsTransmit: "0",
        IsShare: "0",
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
  components: {
    Vouchers,
    ComboBrand,
    ComboCatalog,
    CouponGoods,
    ExceptionDialog
  },
  methods: {
    buttonTan(){  //判断确认/保存按钮
      if(this.dialogStatus=='create'){
        this.submitForm()
      }else{
        this.saveForm()
      }
    },
    //券传值
    getchildVouchers(data) {
      console.log(data);
      if (data && data == 1) {
        //返回的数据为空，不操作
      }
      if (data && data.length > 0) {
        this.MenberDialogForm.ComboApplicableCouponList = data;
        this.MenberDialogForm.ComboApplicableCouponList.map(item => {
          if(!item.CouponId){
            item.CouponId = item.Id;
          }
          item.CouponNum = 1;
        });
      }
      // console.log("child", data);
      // this.addObjectValueForList(data, "CouponNum", "1");
      // this.$refs.VouchersDialog.close();
      // this.MenberDialogForm.ComboApplicableCouponList = data;
      this.$refs.VouchersDialog.close();
    },
    //品牌传值
    getComboBrand(data) {
      console.log("品牌回值", data);
      this.addObjectValueForList(data, "GoodsBrandAmount", "1");
      this.$refs.ComboBrandDialog.close();
      this.MenberDialogForm.ComboGoodsBrandList = data;
    },
    //类别传值
    getCouponGoods(data) {
      console.log(data);
      this.$refs.CouponGoodsDialog.close();
      this.arrID = [];
      if (data && data == 1) {
        //选择为空
        this.MenberDialogForm.ComboGoodsCatalogList = [];
      }
      if (data && data == 2) {
        //选择为空
        this.MenberDialogForm.ComboGoodsCatalogList = [];
      }
      console.log(data);
      if (data && data.length > 0) {
        //选择的有数据
        this.MenberDialogForm.ComboGoodsCatalogList = [];
        data.forEach(data => {
          var arr = {};
          arr.GoodsCatalogCode = data.Code;
          arr.GoodsCatalogName = data.text;
          this.MenberDialogForm.ComboGoodsCatalogList.push(arr);
        });
        console.log(this.MenberDialogForm.ComboGoodsCatalogList);
      }
      // console.log("类别回值", data);
      // data.forEach(item => {
      //   var arr = {};
      //   arr.GoodsCatalogId = String(item.Id);
      //   arr.GoodsCatalogCode = item.Code;
      //   arr.GoodsCatalogName = item.Name;
      //   arr.GoodsCatalogAmount = String(1);
      //   this.MenberDialogForm.ComboGoodsCatalogList.push(arr);
      // });
      // this.$refs.CouponGoodsDialog.close();
    },
    //商品传值
    getComboCatalog(data) {
      console.log("商品回值", data);
      data.forEach(item => {
        var arr = {};
        arr.GoodId = String(item.Id);
        arr.GoodCode = item.Code;
        arr.GoodName = item.Name;
        arr.GoodAmount = String(1);
        this.MenberDialogForm.ComboGoodsList.push(arr);
        this.MenberDialogForm.ComboGoodsList = this.unique(
          this.MenberDialogForm.ComboGoodsList
        );
      });
      console.log(this.MenberDialogForm.ComboGoodsList);
      this.$refs.ComboCatalogDialog.close();
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(
        arr => !res.has(arr.GoodCode) && res.set(arr.GoodCode, 1)
      );
    },
    // 例外商品传值
    getExceptionDialog(data) {
      console.log("例外回值", data);
      data.forEach(item => {
        var arr = {};
        arr.GoodId = String(item.Id);
        arr.GoodCode = item.Code;
        arr.GoodName = item.Name;
        // arr.GoodAmount = String(1);
        this.MenberDialogForm.ComboExceptionGoodsList.push(arr);
        this.MenberDialogForm.ComboExceptionGoodsList = this.unique(
          this.MenberDialogForm.ComboExceptionGoodsList
        );
      });
      this.$refs.ExceptionDialog.close();
    },
    //添加
    submitForm: function() {
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            // if (this.MenberDialogForm.DepositType != 0) {
            //   this.MenberDialogForm.DiscountAmount = 0;
            // }
            if (this.MarketingTotalNumber == 0) {
              this.MenberDialogForm.Quota = 100;
            }
            //日期判断
            if (this.MenberDialogForm.ExpireDateType == 0) {
              this.MenberDialogForm.ExpireBeginDate = "";
              this.MenberDialogForm.ExpireEndDate = "";
            } else {
              this.MenberDialogForm.ExpireBeginDate = parseTime(
                this.MenberDialogForm.ExpireBeginDate,
                "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
              );
              this.MenberDialogForm.ExpireEndDate = parseTime(
                this.MenberDialogForm.ExpireEndDate,
                "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
              );
            }
            console.log(JSON.stringify(this.ComboOrganizationRangeList));
            var that = this;
            if (
              this.ComboOrganizationRangeList &&
              this.ComboOrganizationRangeList.length
            ) {
              this.ComboOrganizationRangeList.forEach(data => {
                console.log(data.Id);
                var temp = {
                  OrganizationId: data.Id
                };
                console.log(JSON.stringify(temp));
                //this.ComboOrganizationRangeList.push(temp);
                that.MenberDialogForm.ComboOrganizationRangeList.push(temp);
              });
            }
            if (this.IsTransmit == 1) {
              this.MenberDialogForm.IsTransmit = true;
            } else {
              this.MenberDialogForm.IsTransmit = false;
            }
            if (this.IsShare == 1) {
              this.MenberDialogForm.IsShare = true;
            } else {
              this.MenberDialogForm.IsShare = false;
            }
            console.log(
              JSON.stringify(this.MenberDialogForm.ComboOrganizationRangeList)
            );
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(JSON.stringify(para));
            //格式化栏目列表防止tree结构节点里面含有递归数组，这样的数据Object.assign无法支持
            if (
              this.MenberDialogForm.ComboGoodsCatalogList &&
              this.MenberDialogForm.ComboGoodsCatalogList.length > 0
            ) {
              this.MenberDialogForm.ComboGoodsCatalogList.map(item => {
                if (item.children) {
                  item.children = [];
                }
                item.parent = item.parent ? {} : null; //防止tree结构父节点里面含有递归数组
              });
            }
            console.log("添加", para);
            ComboAdd(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              console.log(res.Result.Message);
              this.Message = res.Result.Message;
              this.$emit("childMemoria", res.Result.Code);
            });
          }
        }
      });
    },
    //
    getList() {
      if (this.RegisteredEdit && this.RegisteredEdit.Id) {
        this.dialogStatus = "";
        const para = this.RegisteredEdit;
        this.MenberDialogForm.ComboOrganizationRangeList = [];
        console.log(para);
        ComboEdit(para)
          .then(res => {
            console.log(res.Result);
            this.MenberDialogForm = {
              Id: res.Result.Data.Id,
              Code: res.Result.Data.Code,
              Name: res.Result.Data.Name,
              DepositType: res.Result.Data.DepositType,
              DiscountAmount: res.Result.Data.DiscountAmount,
              SalePrice: res.Result.Data.SalePrice,
              CouponNum: res.Result.Data.CouponNum,
              ExpireDateType: res.Result.Data.ExpireDateType,
              EffectExpireMonths: res.Result.Data.EffectExpireMonths,
              ExpireBeginDate: new Date(res.Result.Data.ExpireBeginDate),
              ExpireEndDate: new Date(res.Result.Data.ExpireEndDate),
              IsTransmit: res.Result.Data.IsTransmit ? "1" : "0",
              IsShare: res.Result.Data.IsShare ? "1" : "0",
              OrganizationRangeType: res.Result.Data.OrganizationRangeType,
              Picture1: res.Result.Data.Picture1,
              Picture2: res.Result.Data.Picture2,
              Remark: res.Result.Data.Remark,
              State: res.Result.Data.State,
              ComboApplicableCouponList: res.Result.Data
                .ComboApplicableCouponList
                ? res.Result.Data.ComboApplicableCouponList
                : [],
              ComboExceptionGoodsList: res.Result.Data.ComboExceptionGoodsList
                ? res.Result.Data.ComboExceptionGoodsList
                : [],
              ComboGoodsBrandList: res.Result.Data.ComboGoodsBrandList
                ? res.Result.Data.ComboGoodsBrandList
                : [],
              ComboGoodsCatalogList: res.Result.Data.ComboGoodsCatalogList
                ? res.Result.Data.ComboGoodsCatalogList
                : [],
              ComboGoodsList: res.Result.Data.ComboGoodsList
                ? res.Result.Data.ComboGoodsList
                : [],
              ComboOrganizationRangeList:
                res.Result.Data.ComboOrganizationRangeList,
              Quota: res.Result.Data.Quota
            };
            // if (
            //   this.MenberDialogForm.ComboGoodsBrandList == "" ||
            //   this.MenberDialogForm.ComboGoodsBrandList == null
            // ) {
            //   this.MenberDialogForm.ComboGoodsBrandList = [];
            // }
            // if (
            //   this.MenberDialogForm.ComboGoodsList == "" ||
            //   this.MenberDialogForm.ComboGoodsList == null
            // ) {
            //   this.MenberDialogForm.ComboGoodsList = [];
            // }
            // if (
            //   this.MenberDialogForm.ComboGoodsCatalogList == "" ||
            //   this.MenberDialogForm.ComboGoodsCatalogList == null
            // ) {
            //   this.MenberDialogForm.ComboGoodsCatalogList = [];
            // }
            // if (
            //   this.MenberDialogForm.ComboGoodsBrandList == "" ||
            //   this.MenberDialogForm.ComboGoodsBrandList == null
            // ) {
            //   this.MenberDialogForm.ComboGoodsBrandList = [];
            // }
            // if (
            //   this.MenberDialogForm.ComboApplicableCouponList == "" ||
            //   this.MenberDialogForm.ComboApplicableCouponList == null
            // ) {
            //   this.MenberDialogForm.ComboApplicableCouponList = [];
            // }
            // if (
            //   this.MenberDialogForm.ComboExceptionGoodsList == "" ||
            //   this.MenberDialogForm.ComboExceptionGoodsList == null
            // ) {
            //   this.MenberDialogForm.ComboExceptionGoodsList = [];
            // }

            if (this.MenberDialogForm.Quota != 100) {
              this.MarketingTotalNumber = 1;
            } else {
              this.MarketingTotalNumber = 0;
            }
            this.IsTransmit = res.Result.Data.IsTransmit ? "1" : "0";
            this.IsShare = res.Result.Data.IsShare ? "1" : "0";
            // if (this.MenberDialogForm.IsTransmit == true) {
            //   this.IsTransmit = "是";
            // } else {
            //   this.IsTransmit = "否";
            // }
            // if (this.MenberDialogForm.IsShare == true) {
            //   this.IsShare = "是";
            // } else {
            //   this.IsShare = "否";
            // }
          })
          .then(res => {
            console.log(44444444444);
            this.OrganizationIdMode();
          });
      } else {
        this.OrganizationIdMode();
      }
    },
    saveForm(index, row) {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            // if (this.MenberDialogForm.DepositType != 0) {
            //   this.MenberDialogForm.DiscountAmount = 0;
            // }
            if (this.MenberDialogForm.DepositType == 1) {
              this.MenberDialogForm.ComboGoodsList = [];
              this.MenberDialogForm.ComboGoodsCatalogList = [];
              this.MenberDialogForm.ComboApplicableCouponList = [];
            } else if (this.MenberDialogForm.DepositType == 2) {
              this.MenberDialogForm.ComboGoodsBrandList = [];
              this.MenberDialogForm.ComboGoodsCatalogList = [];
              this.MenberDialogForm.ComboApplicableCouponList = [];
            } else if (this.MenberDialogForm.DepositType == 3) {
              this.MenberDialogForm.ComboGoodsBrandList = [];
              this.MenberDialogForm.ComboGoodsList = [];
              this.MenberDialogForm.ComboApplicableCouponList = [];
            } else if (this.MenberDialogForm.DepositType == 4) {
              this.MenberDialogForm.ComboGoodsBrandList = [];
              this.MenberDialogForm.ComboGoodsList = [];
              this.MenberDialogForm.ComboGoodsCatalogList = [];
            }

            if (this.MenberDialogForm.ExpireDateType == 0) {
              this.MenberDialogForm.ExpireBeginDate = "";
              this.MenberDialogForm.ExpireEndDate = "";
            } else {
              this.MenberDialogForm.ExpireBeginDate = parseTime(
                this.MenberDialogForm.ExpireBeginDate,
                "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
              );
              this.MenberDialogForm.ExpireEndDate = parseTime(
                this.MenberDialogForm.ExpireEndDate,
                "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
              );
            }
            console.log(JSON.stringify(this.ComboOrganizationRangeList));
            if (
              this.ComboOrganizationRangeList &&
              this.ComboOrganizationRangeList.length > 0
            ) {
              //打开编辑窗口无操作销售机构或者选择的销售机构为空
              this.MenberDialogForm.ComboOrganizationRangeList = [];
              if (
                this.ComboOrganizationRangeList &&
                this.ComboOrganizationRangeList.length > 0
              ) {
                this.ComboOrganizationRangeList.forEach(data => {
                  console.log(data.Id);
                  var temp = {
                    OrganizationId: data.Id
                  };
                  console.log(JSON.stringify(temp));
                  //this.ComboOrganizationRangeList.push(temp);
                  this.MenberDialogForm.ComboOrganizationRangeList.push(temp);
                });
              }
            } else {
              console.log(this.OrganizationIdData); //打开编辑窗口无操作销售机构或者选择的销售机构为空，但是此时没有选中的销售机构
              if (
                this.OrganizationIdData &&
                this.OrganizationIdData.length > 0
              ) {
                var newList = [];
                this.OrganizationIdData.map(item => {
                  if (item.checkState == "checked") {
                    newList.push(item);
                  }
                });
                if (newList && newList.length > 0) {
                  newList.map(item => {
                    item.OrganizationId = item.Id;
                  });
                  this.MenberDialogForm.ComboOrganizationRangeList = newList;
                } else {
                  this.MenberDialogForm.ComboOrganizationRangeList = [];
                }
              }
            }

            console.log(JSON.stringify(this.ComboOrganizationRangeList));
            console.log(
              JSON.stringify(this.MenberDialogForm.ComboOrganizationRangeList)
            );
            //return;
            if (this.IsTransmit == 1) {
              this.MenberDialogForm.IsTransmit = true;
            } else {
              this.MenberDialogForm.IsTransmit = false;
            }
            if (this.IsShare == 1) {
              this.MenberDialogForm.IsShare = true;
            } else {
              this.MenberDialogForm.IsShare = false;
            }
            //格式化栏目列表防止tree结构节点里面含有递归数组，这样的数据Object.assign无法支持
            if (
              this.MenberDialogForm.ComboGoodsCatalogList &&
              this.MenberDialogForm.ComboGoodsCatalogList.length > 0
            ) {
              this.MenberDialogForm.ComboGoodsCatalogList.map(item => {
                if (item.children) {
                  item.children = [];
                }
                item.parent = item.parent ? {} : null; //防止tree结构父节点里面含有递归数组
              });
            }
            console.log(
              JSON.stringify(this.MenberDialogForm.ComboOrganizationRangeList)
            );
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            console.log(JSON.stringify(para));
            return;
            ComboEditSave(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              this.Message = res.Result.Code;
              this.$emit("childMemoria", res.Result.Code);
            });
          }
        }
      });
    },
    // 删除
    deleteBrandBtn(index) {
      this.MenberDialogForm.ComboGoodsBrandList.splice(index, 1);
    },
    deleteGoodsBtn(index) {
      this.MenberDialogForm.ComboGoodsList.splice(index, 1);
    },
    deleteCatalogBtn(index) {
      this.MenberDialogForm.ComboGoodsCatalogList.splice(index, 1);
    },
    deleteApplicableBtn(index) {
      this.MenberDialogForm.ComboApplicableCouponList.splice(index, 1);
    },
    deleteException(index) {
      this.MenberDialogForm.ComboExceptionGoodsList.splice(index, 1);
    },
    //转增转化
    getIsTransmitVal(data) {
      console.log(data);
      // if (data == "是") {
      //   this.MenberDialogForm.IsTransmit = true;
      // } else {
      //   this.MenberDialogForm.IsTransmit = false;
      // }
      // console.log(this.MenberDialogForm.IsTransmit + "转增");
    },
    //分享转化
    getIsShareVal(data) {
      console.log(data);
      if (data == "是") {
        this.MenberDialogForm.IsShare = true;
      } else {
        this.MenberDialogForm.IsShare = false;
      }
      console.log(this.MenberDialogForm.IsShare + "分享");
    },
    //销售机构
    checkedNodes(data) {
      console.log(data);
      this.ComboOrganizationRangeList = data;
    },
    //机构类型
    OrganizationRangeMode() {
      const para = {
        EnumType: "ComboOrganizationRangeTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.OrganizationRangeTypeData = res.Result.Data;
      });
    },
    //删除
    deleteBtn(index, row) {
      console.log(row);
      this.MenberDialogForm.ComboApplicableCouponList.splice(index, 0);
    },
    //日期类型
    ExpireDateMode() {
      const para = {
        EnumType: "ExpireDateTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.ExpireDateTypeData = res.Result.Data;
      });
    },
    //适用机构
    OrganizationIdMode() {
      GetListOrganization().then(res => {
        console.log(JSON.stringify(res));
        this.OrganizationIdData = res.Result.Data;
        console.log(
          JSON.stringify(this.MenberDialogForm.ComboOrganizationRangeList)
        );
        console.log(JSON.stringify(this.OrganizationIdData));
        if (this.RegisteredEdit && this.RegisteredEdit.Id) {
          //判断是编辑的
          if (
            this.MenberDialogForm.ComboOrganizationRangeList &&
            this.MenberDialogForm.ComboOrganizationRangeList.length
          ) {
            var editOrganList = [];
            this.MenberDialogForm.ComboOrganizationRangeList.map(item => {
              editOrganList.push(item.OrganizationId);
            });
            this.OrganizationIdData.map(row => {
              if (editOrganList.indexOf(row.Id) != -1) {
                this.$refs.c_tree.checkNode(row); //选中树中某个节点
              }
            });
          }
        }
      });
    },
    //预存类型
    DepositMode() {
      const para = {
        EnumType: "ApplicableTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.DepositTypeData = res.Result.Data;
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
    //给对象赋值一个给定的值，两个方法，方便重用
    addObjectValue(obj, field, value) {
      //还是先做一个非空判断
      if (obj) {
        obj[field] = value;
        //这个返回也不需要，返回也不错
        return obj;
      }
    }
  },
  mounted() {
    this.getList();
    this.DepositMode();
    this.ExpireDateMode();
    //this.OrganizationIdMode();
    this.OrganizationRangeMode();
  }
};
</script>
<style scoped>
.formStyle .Tabsstyle{
  height: 545px;
}
</style>

