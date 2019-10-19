<template>
  <!-- 优惠券添加 -->
  <div class>
    <Form :model="MenberDialogForm" class="formStyle">
      <Tabs>
        <TabPanel :title="'基本参数'">
          <div class="formStyle_list">
            <Label for="CouponCatalogId">券编码</Label>
            <NumberBox
              inputId="CouponCatalogId"
              name="CouponCatalogId"
              v-model="MenberDialogForm.CouponCatalogId"
              :min="0"
            ></NumberBox>
          </div>
          <div class="formStyle_list">
            <Label for="Name">券名称</Label>
            <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.Name"></TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="ApplicableType">适用类型</Label>
            <ComboBox
              v-model="MenberDialogForm.ApplicableType"
              :data="ApplicableTypeData"
              valueField="Code"
              textField="Name"
            ></ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="OrganizationRangeType" class="f-l">机构适用范围</Label>
            <div class="f-l ml-5">
              <ComboBox
                v-model="MenberDialogForm.OrganizationRangeType"
                :data="OrganizationRangeTypeData"
                valueField="Code"
                textField="Name"
              ></ComboBox>
            </div>
            <div class="f-l ml-5" v-if="this.MenberDialogForm.OrganizationRangeType==1">
              <LinkButton
                class="btnDelete"
                @click="$refs.MoneyDialog.open()"
                v-model="MenberDialogForm.CouponOrganizationRangeList.OrganizationId"
              >机构</LinkButton>
              共选择{{OrganizationIdNum}}家机构
            </div>
          </div>
          <div class="formStyle_list">
            <Label for="UseType">抵用类型</Label>
            <ComboBox
              v-model="MenberDialogForm.UseType"
              :data="UseTypeData"
              valueField="Code"
              textField="Name"
            ></ComboBox>
          </div>

          <div class="formStyle_list" v-if="this.MenberDialogForm.UseType==0">
            <Label for="DiscountAmount" class="f-l">抵扣金额</Label>
            <div class="f-l ml-5" v-if="this.MenberDialogForm.ApplicableType==2">
              <div class="f-l">
                <ComboBox
                  v-model="UseType"
                  :data="DiscountAmountData"
                  valueField="Code"
                  textField="Name"
                ></ComboBox>
              </div>
              <div class="f-l ml-10" v-if="this.UseType==1">
                <NumberBox
                  inputId="DiscountAmount"
                  name="DiscountAmount"
                  v-model="MenberDialogForm.DiscountAmount"
                  style="width:80px"
                ></NumberBox>元
              </div>
            </div>
            <div class="f-l ml-5" v-if="this.MenberDialogForm.ApplicableType!=2">
              <NumberBox
                inputId="DiscountAmount"
                name="DiscountAmount"
                v-model="MenberDialogForm.DiscountAmount"
              ></NumberBox>
            </div>
          </div>
          <div class="formStyle_list" v-if="this.MenberDialogForm.UseType==1">
            <Label for="DiscountRate">抵扣率</Label>
            <NumberBox
              inputId="DiscountRate"
              name="DiscountRate"
              v-model="MenberDialogForm.DiscountRate"
            ></NumberBox>
          </div>

          <div class="formStyle_list">
            <div class="f-l">
              <Label for="IDCardNo">每单限用张数</Label>
              <ComboBox v-model="IDCardNo" :data="IDCardNoData" valueField="Code" textField="Name"></ComboBox>
            </div>
            <div class="f-l ml-10" v-if="this.IDCardNo==1">
              <NumberBox v-model="MenberDialogForm.IDCardNo" style="width:80px"></NumberBox>张
            </div>
          </div>

          <div class="formStyle_list">
            <Label for="GrowthValue" class="f-l">最低消费额度</Label>
            <div v-if="this.MenberDialogForm.ApplicableType!=0" class="f-l">
              <ComboBox
                v-model="MinimumConsumption"
                :data="MinimumConsumptionData"
                valueField="Code"
                textField="Name"
              ></ComboBox>
              <NumberBox v-model="MenberDialogForm.MinimumConsumption" style="width:80px"></NumberBox>元
            </div>
            <div class="ml-5 f-l" v-if="this.MenberDialogForm.ApplicableType==0">
              <NumberBox v-model="MenberDialogForm.MinimumConsumption"></NumberBox>
              <span class="ml-5">元</span>
            </div>
          </div>
          <div class="formStyle_list">
            <Label for="ExpireDateType">有效期</Label>
            <ComboBox
              valueField="Code"
              textField="Name"
              :data="ExpireDateTypeData"
              v-model="MenberDialogForm.ExpireDateType"
            ></ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="Remark">备注</Label>
            <TextBox inputId="Remark" name="Remark" v-model="MenberDialogForm.Remark"></TextBox>
          </div>
          <div
            class="formStyle_list"
            v-if="this.MenberDialogForm.ExpireDateType==1"
            style="width:100%"
          >
            <Label for="ExpireDateType" class="f-l">固定时长</Label>
            <DateBox v-model="MenberDialogForm.ExpireBeginDate" format="yyyy-MM-dd"></DateBox>
            <span class="ml-5 mr-5">至</span>
            <DateBox v-model="MenberDialogForm.ExpireEndDate" format="yyyy-MM-dd"></DateBox>
          </div>

          <div
            class="formStyle_list"
            v-if="this.MenberDialogForm.ExpireDateType==2"
            style="width:100%"
          >
            <Label for="ExpireDateType" class="f-l">自定义</Label>自领取后
            <NumberBox v-model="MenberDialogForm.EffectDays" style="width:80px;"></NumberBox>天生效, 有效期
            <NumberBox v-model="MenberDialogForm.EffectExpireDays" style="width:80px;"></NumberBox>天
          </div>
          <div class="formStyle_list" style="width:100%">
            <Label for="Remark" class="f-l">其他规则</Label>
            <div v-for="fruit in fruits" :key="fruit" style="width:180px;float:left">
              <CheckBox :inputId="fruit" :value="fruit" :multiple="true" v-model="OtherRules"></CheckBox>
              <span :for="fruit">{{fruit}}</span>
            </div>
          </div>

          <!-- <div class="formStyle_list" style="height:100px">
            <Label style="height:99px;line-height:99px;float:left">封面图片</Label>
            <label for="privilegeImage">
                <img :src="privilegeImageSrc" aspect-ratio="0.8" />
                <input
                type="file"
                id="privilegeImage"
                class="photoFileIn my-0 py-0"
                @change="previewImg($event,2)"
                accept="image/*"
                v-show="false"
                />
                <span class="f-r c-666">(建议图片大小为414*414像素)</span>
            </Label>
          </div>-->
        </TabPanel>
        <!-- 奖励方案 -->
        <TabPanel :title="'例外商品'">
          <div class="pd-10">
            <Tabs>
              <TabPanel :title="'导入成功'">
                <div class="query mt-10 mb-10 ml-10">
                  <LinkButton style="width:120px" class="iconfont iconsousuo btn-query">导入</LinkButton>
                </div>
                <DataGrid :data="MenberlistSus" :pagination="true" :columnResizing="true">
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
                      <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
                    </template>
                  </GridColumn>
                  <GridColumn field="GoodCode" title="商品编码"></GridColumn>
                  <GridColumn field="GoodName" title="商品名称"></GridColumn>
                </DataGrid>
              </TabPanel>
              <TabPanel :title="'导入失败'">
                <div class="query mt-10 mb-10 ml-10">
                  <LinkButton style="width:120px" class="iconfont iconsousuo btn-query">导入</LinkButton>
                </div>
                <DataGrid :data="Menberlistfailure" :pagination="true" :columnResizing="true">
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
                      <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
                    </template>
                  </GridColumn>
                  <GridColumn field="GoodCode" title="商品编码"></GridColumn>
                  <GridColumn field="GoodName" title="商品名称"></GridColumn>
                </DataGrid>
              </TabPanel>
            </Tabs>
          </div>
        </TabPanel>
        <!--  -->
        <TabPanel :title="'套餐详情'" v-if="this.MenberDialogForm.ApplicableType==1">
          <!-- 品牌 -->
          <div class="pd-10">
            <div class="query pd-10">
              <LinkButton
                class="iconfont iconsousuo btn-query"
                @click="$refs.ComboBrandDialog.open()"
              >新增</LinkButton>
            </div>
            <DataGrid :data="MenberDialogForm.CouponGoodsBrandList" :pagination="true" :columnResizing="true" >
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
                  <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                field="GoodsBrandCode"
                title="品牌编码"
                v-model="MenberDialogForm.CouponGoodsBrandList.GoodsBrandCode"
              ></GridColumn>
              <GridColumn
                field="GoodsBrandName"
                title="品牌名称"
                v-model="MenberDialogForm.CouponGoodsBrandList.GoodsBrandName"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
        <TabPanel :title="'套餐详情'" v-if="this.MenberDialogForm.ApplicableType==2">
          <!-- 商品信息 -->
          <div class="pd-10">
            <div class="query pd-10">
              <LinkButton
                class="iconfont iconsousuo btn-query"
                @click="$refs.ComboCatalogDialog.open()"
              >新增</LinkButton>
            </div>
            <DataGrid :data="MenberDialogForm.CouponGoodsList" :pagination="true" :columnResizing="true">
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
                  <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                field="GoodCode"
                title="商品编码"
                v-model="MenberDialogForm.CouponGoodsList.GoodCode"
              ></GridColumn>
              <GridColumn
                field="GoodName"
                title="商品名称"
                v-model="MenberDialogForm.CouponGoodsList.GoodName"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
        <TabPanel :title="'套餐详情'" v-if="this.MenberDialogForm.ApplicableType==3">
          <!-- 分类 -->
          <div class="pd-10">
            <div class="query pd-10">
              <LinkButton
                class="iconfont iconsousuo btn-query"
                @click="$refs.CouponGoodsDialog.open()"
              >新增</LinkButton>
            </div>
            <DataGrid :data="MenberDialogForm.CouponGoodsCatalogList" :pagination="true" :columnResizing="true">
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
                  <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
                </template>
              </GridColumn>
              <GridColumn
                field="GoodsCatalogCode"
                title="商品编码"
                v-model="MenberDialogForm.CouponGoodsCatalogList.GoodsCatalogCode"
              ></GridColumn>
              <GridColumn
                field="GoodsCatalogName"
                title="商品名称"
                v-model="MenberDialogForm.CouponGoodsCatalogList.GoodsCatalogName"
              ></GridColumn>
            </DataGrid>
          </div>
        </TabPanel>
      </Tabs>
      <div class="f-r mt-30 text-r btnpos">
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
      </div>
    </Form>
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
  </div>
</template>
<script>
import { GetEnumList, ComboAdd, ComboEdit, ComboEditSave } from "@/api/Combo";
import { parseTime } from "@/utils/index";
import Package from "../../components/Package";
import institutionsData from "@/components/institutionsData";
import ComboBrand from "@/components/ComboBrand";
import ComboCatalog from "@/components/ComboCatalog";
import CouponGoods from "@/components/CouponGoods";
export default {
  props: { RegisteredEdit: [], required: true },
  data() {
    return {
      fruits: ["不能与其它券同时使用", "本券可转赠其它会员"],
      OtherRules: [],
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
      ExpireDateTypeData: [
        {
          Code: 0,
          Name: "不限"
        },
        {
          Code: 1,
          Name: "固定时长"
        },
        {
          Code: 2,
          Name: "自定义日期（自建券起）"
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
        Picture: "",
        OrganizationRangeType: 0,
        MinimumConsumption: 0,
        Remark: "",
        CouponExceptionGoodsList: [],
        CouponOrganizationRangeList: [],
        CouponGoodsList: [],
        CouponGoodsBrandList: [], //优惠卷机构范围
        CouponGoodsCatalogList: []
      }
    };
  },
  components: { institutionsData, ComboBrand, ComboCatalog, CouponGoods },
  methods: {
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
      // console.log(this.arrID.length);
      this.OrganizationIdNum = this.MenberDialogForm.CouponGoodsBrandList.length;

      console.log(this.MenberDialogForm.CouponGoodsBrandList);
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
    //券类型
    FeatureTypeMode() {
      const para = {
        EnumType: "UseTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.UseTypeData = res.Result.Data;
      });
    },
    //添加
    submitForm: function() {
      // console.log(parseTime(this.EndDate, "{yyyy}-{mm}-{dd}"));
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
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
            this.MenberDialogForm.Code = parseInt(
              Math.random() * 100
            ).toString();
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            ComboAdd(para).then(res => {
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
              console.log(res.Result.Message);
              this.Message = res.Result.Message;
            });
          }
        }
      });
    },
    EditList() {
      console.log(this.EditFrom);
      this.MenberDialogForm = {
        // ApplicableType: res.Result.Data.ApplicableType,
        // AstrictNum: res.Result.Data.AstrictNum,
        // CouponCatalogId: res.Result.Data.CouponCatalogId,
        // CouponExceptionGoodsList: res.Result.Data.CouponExceptionGoodsList,
        // CouponGoodsBrandList: res.Result.Data.CouponGoodsBrandList,
        // CouponGoodsCatalogList: res.Result.Data.CouponGoodsCatalogList,
        // CouponGoodsList: res.Result.Data.CouponGoodsList,
        // CouponOrganizationRangeList:
        //   res.Result.Data.CouponOrganizationRangeList,
        // DiscountAmount: res.Result.Data.DiscountAmount
        // DiscountRate:res.Result.Data.
        // EffectDays:res.Result.Data.
        // EffectExpireDays:res.Result.Data.
        // ExpireBeginDate:res.Result.Data.
        // ExpireDateType:res.Result.Data.
        // ExpireEndDate:res.Result.Data.
        // IsIncrease:res.Result.Data.
        // IsMeanwhile:res.Result.Data.
        // MinimumConsumption:res.Result.Data.
        // Name:res.Result.Data.
        // OrganizationRangeType:res.Result.Data.
        // Picture:res.Result.Data.
        // Remark:res.Result.Data.
        // State:res.Result.Data.
        // UseType:res.Result.Data.
      };
    },
    // 图片
    previewImg(e, type) {
      var files = e.target.files[0];
      var that = this;

      // 判断浏览器是否支持 FileReader
      if (!e || !window.FileReader) {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
        return;
      }
      let reader = new FileReader();

      // 这里是最关键的一步，转换就在这里
      if (files) {
        reader.readAsDataURL(files);
      }

      reader.onload = function() {
        console.log(files);
        if (1 == type) {
          that.privilegeIconSrc = this.result;
          that.Image = files;
        } else {
          that.privilegeImageSrc = this.result;
          that.PublicityImg = files;
        }
      };
    }
  },
  mounted() {
    this.ApplicableTypeMode();
    this.FeatureTypeMode();
    this.EditList();
  }
};
</script>
<style scoped>
.formStyle_list {
  width: 50%;
  float: left;
  border-right: none;
}
.formStyle_list .textbox-label {
  width: 110px;
  height: 44px;
  line-height: 44px;
}
</style>