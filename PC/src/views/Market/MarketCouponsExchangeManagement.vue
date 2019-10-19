<template>
  <div class="container">
    <div class="conTop">
      <p class="topTitle">积分兑换优惠券</p>
      <LinkButton class="btnAdd btn-primary" @click="handleAdd">添加</LinkButton>
      <!-- 搜索 -->
      <div class="query">
        <!-- <TextBox v-model="keyword" placeholder="关键字"></TextBox> -->
        <TextBox v-model="GrowthName" placeholder>
          <span class="query_title">券编码/名称</span>
        </TextBox>
        <ComboBox
          v-model="ApplicableType"
          :data="ApplicableTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">适用类型</span>
        </ComboBox>
        <ComboBox
          v-model="UseType"
          :data="UseTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">券类型</span>
        </ComboBox>
        <ComboBox
          v-model="State"
          :data="StateTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">状态</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <DataGrid
      :data="Menberlist"
      :pagination="true"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
      :lazy="true"
      :pageNumber="pageNumber"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange($event)"
    >
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv" width="180">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.CouponAddDialog.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
          <LinkButton
            class="btnState"
            @click="disableBtn(scope.$index, scope.row)"
            v-if="scope.row.State==0"
          >启用</LinkButton>
          <LinkButton
            class="btnState"
            @click="disableBtn(scope.$index, scope.row)"
            v-if="scope.row.State==1"
          >停用</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Code" title="券编码" width="180" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="券名称" width="180" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="UseType" title="券类型" width="100" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.UseType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="DiscountAmount" title="券金额/折扣" width="120" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.DiscountAmount}}</div>
        </template>
      </GridColumn>
      <GridColumn field="ApplicableType" title="适用类型" width="120" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.ApplicableType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Picture" title="上架库存" width="120" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.Picture}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CreatorName" title="剩余库存" width="120" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.CreatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="needScore" title="所需积分" width="120" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.needScore}}</div>
        </template>
      </GridColumn>
      <GridColumn field="ExpireDate" title="有效期" width="180" align="center"></GridColumn>
      <GridColumn field="State" title="状态" width="120" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.State}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CreatorTime" title="操作时间" width="180" align="center"></GridColumn>
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
    <!-- 弹框 -->
    <Dialog
      ref="CouponAddDialog"
      :dialogStyle="{width:'650px',height:'480px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="优惠券"
    >
      <!-- <CouponAddCon @childRadio="getchildValue"></CouponAddCon> -->
      <Form :model="MenberDialogForm" class="formStyle formTop">
        <div class="formStyle_list">
          <Label for="Name" class="f-l">选择劵</Label>
          <div class="f-l">
            <SearchBox @search="$refs.VouchersDialog.open()" v-model="selectCouponsItem.CouponName">
              <Addon v-if="selectCouponsItem.CouponName">
                <span
                  class="textbox-icon icon-clear f-12 f-r"
                  title="Clear value"
                  @click="selectCouponsItem={}"
                ></span>
              </Addon>
            </SearchBox>
          </div>
        </div>
        <div class="formStyle_list">
          <Label for="Name" class="f-l">所需积分</Label>
          <div class="f-l">
            <TextBox inputId="Name" name="Name" v-model="needScore"></TextBox>
          </div>
        </div>
        <div class="formStyle_list">
          <Label for="Name" class="f-l">库存</Label>
          <div class="f-l">
            <TextBox inputId="Name" name="Name" v-model="inventory"></TextBox>
          </div>
        </div>
        <div class="formStyle_list">
          <Label for="ExpireDateType" class="f-l">上架有效时间</Label>
          <ComboBox
            valueField="Code"
            textField="Name"
            :data="ExpireDateTypeData"
            v-model="ExpireDateType"
          ></ComboBox>
        </div>
        <div class="formStyle_list" v-if="ExpireDateType==1">
          <Label for="ExpireDateType" class="f-l">自定义</Label>
          <DateBox v-model="ExpireBeginDate" format="yyyy-MM-dd" style="margin-right:10px"></DateBox>至
          <DateBox v-model="ExpireEndDate" format="yyyy-MM-dd" style="margin-left:10px"></DateBox>
        </div>
        <div class="formStyle_list">
          <Label class="f-l" for="everyoneCanBuyNum">每人可购买数量</Label>
          <div class="f-l">
            <ComboBox
              valueField="Code"
              textField="Name"
              :data="everyoneCanBuyNumData"
              v-model="everyoneCanBuyNum"
            ></ComboBox>
          </div>
          <div class="f-l ml-10" v-if="everyoneCanBuyNum == 1">
            <NumberBox
              inputId="everyoneCanBuyNum"
              name="everyoneCanBuyNum"
              v-model="everyoneCanBuyNum"
              style="width:80px;"
            ></NumberBox>张
          </div>
        </div>
        <div class="formStyle_list">
          <Label class="f-l" for="couponsSort">排序</Label>
          <div class="f-l ml-10">
            <NumberBox
              inputId="couponsSort"
              name="couponsSort"
              v-model="couponsSort"
              style="width:80px;"
            ></NumberBox>数量越大，展示越靠前
          </div>
        </div>
        <div class="formStyle_list">
          <Label for="MemberLevelType" class="f-l">会员等级</Label>
          <div class="f-l">
            <ComboBox
              v-model="MemberLevelType"
              :data="MemberLevelData"
              valueField="Code"
              textField="Name"
            ></ComboBox>
          </div>
          <div class="f-l ml-10" v-if="MemberLevelType==1">
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
        <div class="f-r mt-20 text-r btnpos">
          <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm btn">确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm btn">保存</LinkButton>
        </div>
      </Form>
    </Dialog>
    <!-- 机构 -->
    <Dialog
      ref="MoneyEditDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="机构"
    >
      <InstitutionsRadio @childRadio="getchildValue"></InstitutionsRadio>
    </Dialog>
    <!-- 机构 IsMsgDialog-->
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
    <!-- 添加 商品类别-->
    <Dialog
      ref="CouponGoodsDialog"
      :dialogStyle="{width:'80%',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="商品类别"
    >
      <CouponGoods @CouponGoods="getCouponGoods"></CouponGoods>
    </Dialog>
    <!-- 添加 商品-->
    <Dialog
      ref="ComboCatalogDialog"
      :dialogStyle="{width:'1000px',height:'600px'}"
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
      :dialogStyle="{width:'80%',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="商品品牌"
    >
      <ComboBrand @ComboBrand="getComboBrand"></ComboBrand>
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
      <Vouchers @vouchers="getchildVouchers" :parentMultiselect="parentMultiselect"></Vouchers>
    </Dialog>
  </div>
</template>
<script>
import CouponSort from "@/components/Market/CouponSort";
import CouponAddCon from "@/components/Market/CouponAddCon";
import institutionsData from "@/components/institutionsData";
import InstitutionsRadio from "@/components/InstitutionsRadio";
import ComboBrand from "@/components/ComboBrand";
import ComboCatalog from "@/components/ComboCatalog";
import CouponGoods from "@/components/CouponGoods";
import { parseTime } from "@/utils/index";
import Vouchers from "@/components/Vouchers";
import Package from "@/components/Package";
import {
  CouponList,
  CouponAdd,
  CouponRemove,
  CouponEdit,
  CouponEditSave,
  CouponQuery,
  GetEnumList,
  UpdateCouponState,
  GetMemberLevel
} from "@/api/Market";
export default {
  data() {
    return {
      gridHeight: false,
      //搜索
      GrowthName: "",
      coding: "",
      State: 1,
      UseType: 0,
      Agencyvalue: "",
      AgencySearch: "",
      ApplicableType: 0,
      UseTypeData: [],
      StateTypeData: [],
      ApplicableTypeData: [],
      dialogStatus: "",
      EditFrom: [],
      //分页
      Menberlist: [],
      total: 0,
      pageSize: 20,
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
      //弹框
      TypeData: [],

      UseType: "",
      dialogStatus: "create",
      Agencyvalue: "",
      ApplicableTypeData: [],
      UseTypeData: [],
      MenberlistSus: [],
      MinimumConsumption: "",
      Menberlistfailure: [],
      privilegeImageSrc: "../../../static/privilegeImage.jpg",
      OrganizationRangeTypeData: [
        {
          Code: 0,
          Name: "全部机构"
        },
        {
          Code: 1,
          Name: "自定义机构"
        }
      ],
      MinimumConsumptionData: [
        {
          Code: 0,
          Name: "按整单消费金额"
        },
        {
          Code: 1,
          Name: "按指定消费金额"
        }
      ],
      IDCardNo: "",
      IDCardNoData: [
        {
          Code: 0,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "自定义张数"
        }
      ],
      DiscountAmountData: [
        {
          Code: 0,
          Name: "全额"
        },
        {
          Code: 1,
          Name: "自定义金额"
        }
      ],
      OtherRules: [],
      RowId: "",
      fruits: ["不能与其它券同时使用", "本券可转赠其它会员"],
      OrganizationIdNum: 0,
      MenberDialogForm: {
        AgencySearch: "",
        CouponCatalogId: 0,
        Name: "",
        ApplicableType: 0,
        UseType: 0,
        DiscountAmount: 0,
        DiscountRate: 0,
        ExpireDateType: 0,
        ExpireBeginDate: new Date(),
        ExpireEndDate: new Date(),
        EffectDays: 0,
        EffectExpireDays: 0,
        Picture: "string",
        OrganizationRangeType: 0,
        MinimumConsumption: 0,
        Remark: "string",
        CouponExceptionGoodsList: [],
        CouponOrganizationRangeList: [],
        CouponGoodsList: [],
        CouponGoodsBrandList: [], //优惠卷机构范围
        CouponGoodsCatalogList: []
      },
      parentMultiselect: true,
      selectCouponsItem: {},
      needScore: "",
      inventory: "",
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
      ExpireDateType: 0,
      ExpireBeginDate: new Date(),
      ExpireEndDate: new Date(),
      everyoneCanBuyNumData: [
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
      everyoneCanBuyNum: 0,
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
      MemberLevelType: 0,
      MemberLevelTypeData: [],
      MemberLevelId: [],
      couponsSort: 0
    };
  },
  components: {
    CouponSort,
    institutionsData,
    CouponAddCon,
    Package,
    InstitutionsRadio,
    ComboBrand,
    ComboCatalog,
    CouponGoods,
    Vouchers
  },
  methods: {
    //券传值
    getchildVouchers(data) {
      console.log("child", data);
      this.addObjectValueForList(data, "Num", "1");
      this.$refs.VouchersDialog.close();
      this.selectCouponsItem = data[0];
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
    //会员等级类型 MemberLevelTypeEnum
    MemberLevelTypeMode() {
      GetMemberLevel().then(res => {
        console.log(res.Result);
        this.MemberLevelTypeData = res.Result.Data;
      });
    },
    //品牌传值
    getComboBrand(data) {},
    //类别传值
    getCouponGoods(data) {},
    //商品传值
    getComboCatalog(data) {},
    //机构传值
    getchildData(data) {
      this.$refs.MoneyDialog.close();
      data.forEach(data => {
        var arrID = {};
        arrID.OrganizationId = data.Id;
        console.log(data);
        this.MenberDialogForm.CouponGoodsBrandList.push(arrID);
      });
      this.OrganizationIdNum = this.MenberDialogForm.CouponGoodsBrandList.length;

      console.log(this.MenberDialogForm.CouponGoodsBrandList);
    },
    //机构传值
    getchildValue(data) {
      console.log(data);
      this.$refs.MoneyEditDialog.close();
      this.AgencySearch = data.Id;
      this.Agencyvalue = data.Name;
    },
    // getchildVouchers(data) {
    //   // console.log(data.id);
    //   this.CouponCatalogId = data.Id;
    //   this.getUsers();
    // },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.getUsers();
    },
    // 获取用户列表
    getUsers() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Name: this.GrowthName,
        ApplicableType: this.ApplicableType,
        UseType: this.UseType,
        State: this.State,
        CouponCatalogId: this.CouponCatalogId,
        OrganizationId: this.AgencySearch
      };
      console.log(para);
      CouponList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //删除
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.confirm({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: row.Id };
            console.log(para);
            CouponRemove(para).then(res => {
              this.getUsers();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //编辑
    handleEdit(index, row) {
      this.dialogStatus = "update";
      const para = { Id: row.Id };
      this.RowId = row.Id;
      console.log(para, this.RowId);
      CouponEdit(para).then(res => {
        console.log(res.Result);
        this.MenberDialogForm = {
          ApplicableType: res.Result.Data.ApplicableType,
          AstrictNum: res.Result.Data.AstrictNum,
          CouponCatalogId: res.Result.Data.CouponCatalogId,
          CouponExceptionGoodsList: res.Result.Data.CouponExceptionGoodsList,
          CouponGoodsBrandList: res.Result.Data.CouponGoodsBrandList,
          CouponGoodsCatalogList: res.Result.Data.CouponGoodsCatalogList,
          CouponGoodsList: res.Result.Data.CouponGoodsList,
          CouponOrganizationRangeList:
            res.Result.Data.CouponOrganizationRangeList,
          DiscountAmount: res.Result.Data.DiscountAmount,
          DiscountRate: res.Result.Data.DiscountRate,
          EffectDays: res.Result.Data.EffectDays,
          EffectExpireDays: res.Result.Data.EffectExpireDays,
          ExpireEndDate: res.Result.Data.ExpireEndDate,
          IsIncrease: res.Result.Data.IsIncrease,
          IsMeanwhile: res.Result.Data.IsMeanwhile,
          MinimumConsumption: res.Result.Data.MinimumConsumption,
          Name: res.Result.Data.Name,
          OrganizationRangeType: res.Result.Data.OrganizationRangeType,
          Picture: res.Result.Data.Picture,
          Remark: res.Result.Data.Remark,
          State: res.Result.Data.State,
          UseType: res.Result.Data.UseType
        };
      });
    },
    saveForm(index, row) {
      console.log(row);
      this.$messager.confirm({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            // this.MenberDialogForm.Id = row.Id;
            const para = Object.assign(
              {
                Id: this.RowId
              },
              this.MenberDialogForm
            );
            console.log(para);
            CouponEditSave(para).then(res => {
              this.getUsers();
              this.$refs.CouponAddDialog.close();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    //添加
    handleAdd() {
      this.$refs.CouponAddDialog.open();
      this.dialogStatus = "create";
      this.MenberDialogForm = {
        CouponCatalogId: 0,
        Name: "",
        ApplicableType: 0,
        UseType: 0,
        DiscountAmount: 0,
        DiscountRate: 0,
        ExpireDateType: 0,
        ExpireBeginDate: "",
        ExpireEndDate: "",
        EffectDays: 0,
        EffectExpireDays: 0,
        Picture: "",
        OrganizationRangeType: 0,
        MinimumConsumption: 0,
        Remark: "",
        AstrictNum: 0,
        CouponExceptionGoodsList: [],
        CouponGoodsBrandList: [],
        CouponGoodsCatalogList: [],
        CouponGoodsList: [],
        CouponOrganizationRangeList: [],
        IsMeanwhile: true,
        IsIncrease: true
      };
    },
    submitForm: function() {
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            this.MenberDialogForm.Code = parseInt(
              Math.random() * 100
            ).toString();
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            CouponAdd(para).then(res => {
              this.getUsers();
              this.$refs.CouponAddDialog.close();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              console.log(res.Result.Message);
            });
          }
        }
      });
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    },
    //启用
    disableBtn(index, row) {
      if (row.State == 1) {
        row.State = 0;
      } else {
        row.State = 1;
      }
      const para = {
        Id: row.Id,
        State: row.State
      };
      console.log(para);
      UpdateCouponState(para).then(res => {
        console.log(res.Result);
        this.getUsers();
      });
    },

    //状态
    TypeMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateTypeData = res.Result.Data;
      });
    },
    //适用类型
    ApplicableTypeMode() {
      const para = {
        EnumType: "ApplicableTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.ApplicableTypeData = res.Result.Data;
      });
    },
    //抵扣类型
    FeatureTypeMode() {
      const para = {
        EnumType: "UseTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.UseTypeData = res.Result.Data;
      });
    }
  },
  mounted() {
    this.getUsers();
    this.ApplicableTypeMode();
    this.FeatureTypeMode();
    this.TypeMode();
    this.MemberLevelTypeMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
.formStyle_img {
  height: 150px;
}
.formStyle_img .textbox-label {
  background-color: #fff;
  line-height: 150px;
  height: 149px;
  float: left;
}
/* .formStyle_list {
  width: 50%;
  float: left;
  border-right: none;
} */
.formStyle_list .textbox-label {
  width: 110px;
  height: 44px;
  line-height: 44px;
}
.bortrl {
  height: 40px;
  line-height: 40px;
  border-left: 1px solid #e0e6ed;
  border-right: 1px solid #e0e6ed;
}
</style>

