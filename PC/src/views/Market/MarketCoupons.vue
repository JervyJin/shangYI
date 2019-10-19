<template>
  <div class="container">
    <div class="conTop">
      <div class="topTitle">
        <p class="f-l">
          <span></span>筛选条件
        </p>
        <p class="f-r c-blue" @click="queryToggle">
          <i
            class="iconfont f-14"
            :class="{'icongengduo1-copy':iconxiangshang1,'icongengduo1-copy-copy':iconxiangxia1}"
          ></i>收起
        </p>
        <p class="f-r screeningBtn">保存筛选条件</p>
        <p class="f-r historyBtn">使用历史条件</p>
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-if="ToggleStyle">
        <TextBox v-model="GrowthName" placeholder>
          <span class="query_title">券编码/券名称</span>
          <Addon>
            <span
              v-if="GrowthName"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="GrowthName=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="ApplicableType"
          :data="ApplicableTypeData"
          valueField="Code"
          textField="Name"
          :editable="false"
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
        <ComboBox
          v-model="OrganizationId"
          :data="OrganizationIdData"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">机构</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius iconfont iconadd f-16" @click="handleAdd">添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <div id="grid">
      <!-- 优惠券分类 -->
      <CouponSort
        @childValue="getchildVouchers"
        @sendCategoryList="getCategoryList"
        :style="'height:' + gridHeight + 'px;'"
      ></CouponSort>
      <DataGrid
        :data="Menberlist"
        :pagination="true"
        style="padding-left:210px"
        :style="'height:' + gridHeight + 'px;'"
        :columnResizing="true"
        :lazy="true"
        :pageNumber="pageNumber"
        :total="total"
        :pageSize="pageSize"
        @pageChange="pageChange($event)"
      >
        <GridColumnGroup :frozen="true" align="left" width="500">
          <GridHeaderRow>
            <GridColumn
              align="center"
              type="index"
              cellCss="datagrid-td-rownumber"
              width="50"
              title="序号"
            >
              <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
            </GridColumn>
            <GridColumn align="center" title="操作" field="custome-adv" width="150">
              <template slot="body" slot-scope="scope">
                <LinkButton
                  class="btnEdit"
                  @click="$refs.CouponAddDialog.open();handleEdit(scope.$index, scope.row)"
                >编辑</LinkButton>
                <LinkButton
                  class="btnDelete"
                  @click="deleteCouponListBtn(scope.$index, scope.row)"
                >删除</LinkButton>
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
            <GridColumn field="Code" title="券编码" width="100" align="center">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.Code}}</div>
              </template>
            </GridColumn>
            <GridColumn field="Name" title="券名称" width="200" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.Name}}</div>
              </template>
            </GridColumn>
          </GridHeaderRow>
        </GridColumnGroup>
        <GridColumnGroup>
          <GridHeaderRow>
            <GridColumn field="UseType" title="券类型" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.UseType}}</div>
              </template>
            </GridColumn>
            <GridColumn field="DiscountAmount" title="券金额/折扣" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="right">{{scope.row.DiscountAmount}}</div>
              </template>
            </GridColumn>
            <GridColumn field="ApplicableType" title="适用类型" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.ApplicableType}}</div>
              </template>
            </GridColumn>
            <GridColumn field="Picture" title="图片" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.Picture}}</div>
              </template>
            </GridColumn>
            <GridColumn field="CreatorName" title="创建人" width="120" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.CreatorName}}</div>
              </template>
            </GridColumn>
            <GridColumn field="ExpireDate" title="有效期" width="180" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.ExpireDate}}</div>
              </template>
            </GridColumn>
            <GridColumn field="CreatorTime" title="操作时间" width="180" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.CreatorTime}}</div>
              </template>
            </GridColumn>
            <GridColumn field="State" title="状态" width="100" align="center">
              <template slot="body" slot-scope="scope">
                <div align="left">{{scope.row.State}}</div>
              </template>
            </GridColumn>
          </GridHeaderRow>
        </GridColumnGroup>
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
    <!-- 弹框 -->
    <Dialog
      ref="CouponAddDialog"
      :dialogStyle="{width:'1000px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="优惠券"
    >
      <!-- <CouponAddCon @childRadio="getchildValue"></CouponAddCon> -->
      <Form :model="MenberDialogForm" class="formStyle">
        <Tabs class="Tabsstyle">
          <TabPanel :title="'基本参数'">
            <!-- <div class="formStyle_list">
              <Label for="CouponCatalogId">券编码</Label>
              <NumberBox
                inputId="CouponCatalogId"
                name="CouponCatalogId"
                v-model="MenberDialogForm.CouponCatalogId"
                :min="0"
              ></NumberBox>
            </div>-->
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
                  v-model="MenberDialogForm.MarketingOrganizationRangeList"
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
              <div class="f-l ml-10">
                  <NumberBox
                    inputId="DiscountAmount"
                    name="DiscountAmount"
                    :min="0"
                    v-model="MenberDialogForm.DiscountAmount"
                  ></NumberBox>
                </div>
              <!-- <div class="f-l ml-5" v-if="this.MenberDialogForm.ApplicableType==2">
                <div class="f-l">
                  <ComboBox
                    v-model="UseType"
                    :data="DiscountAmountData"
                    valueField="Code"
                    textField="Name"
                  ></ComboBox>
                </div>
                <div class="f-l ml-10" v-if="this.UseType==0">
                  <NumberBox
                    inputId="DiscountAmount"
                    name="DiscountAmount"
                    :min="0"
                    v-model="MenberDialogForm.DiscountAmount"
                    style="width:80px"
                  ></NumberBox>
                </div>
              </div>
              <div class="f-l ml-5" v-if="this.MenberDialogForm.ApplicableType!=2">
                <NumberBox
                  inputId="DiscountAmount"
                  name="DiscountAmount"
                  :min="0"
                  v-model="MenberDialogForm.DiscountAmount"
                ></NumberBox>
              </div> -->
            </div>
            <div class="formStyle_list" v-if="this.MenberDialogForm.UseType==1">
              <Label for="DiscountRate">抵扣率</Label>
              <NumberBox
                inputId="DiscountRate"
                name="DiscountRate"
                :min="0"
                v-model="MenberDialogForm.DiscountRate"
              ></NumberBox>
            </div>

            <div class="formStyle_list">
              <div class="f-l">
                <Label for="IDCardNo">每单限用张数</Label>
                <ComboBox
                  v-model="IDCardNo"
                  :data="IDCardNoData"
                  valueField="Code"
                  textField="Name"
                ></ComboBox>
              </div>
              <div class="f-l ml-10" v-if="this.IDCardNo==1">
                <NumberBox v-model="MenberDialogForm.AstrictNum" style="width:80px" :min="0"></NumberBox>张
              </div>
            </div>

            <div class="formStyle_list" v-if="this.MenberDialogForm.ApplicableType != 0">
              <Label for="GrowthValue" class="f-l">最低消费额度</Label>
              <div  class="f-l ml-5">
                <ComboBox
                  v-model="MenberDialogForm.MinimumConsumptionType"
                  :data="MinimumConsumptionData"
                  valueField="Code"
                  textField="Name"
                ></ComboBox>
                <NumberBox
                  v-model="MenberDialogForm.MinimumConsumption"
                  style="width:80px"
                  :min="0"
                ></NumberBox>元
              </div>
              <!-- <div class="ml-5 f-l" v-if="this.MinimumConsumption=='1'">
                <NumberBox v-model="MenberDialogForm.MinimumConsumption" :min="0"></NumberBox>
                <span class="ml-5">元{{MinimumConsumption}}</span>
              </div> -->
            </div>
            <div class="formStyle_list">
              <Label for="ExpireDateType">有效期</Label>
              <ComboBox
                valueField="Code"
                textField="Name"
                :data="ExpireDateTypeData"
                v-model="MenberDialogForm.ExpireDateType"
                @selectionChange="DataTypeChange"
              ></ComboBox>
            </div>
            <div
              class="formStyle_list"
              v-if="this.MenberDialogForm.ExpireDateType==1"
              style="width:100%"
            >
              <Label for="ExpireDateType" class="f-l">自定义</Label>
              <DateBox
                v-model="MenberDialogForm.ExpireBeginDate"
                format="yyyy-MM-dd"
                placeholder="操作日期 （起）"
              ></DateBox>
              <span class="ml-5 mr-5">至</span>
              <DateBox
                v-model="MenberDialogForm.ExpireEndDate"
                format="yyyy-MM-dd"
                placeholder="操作日期 （止）"
              ></DateBox>
            </div>

            <div
              class="formStyle_list"
              v-if="this.MenberDialogForm.ExpireDateType==2"
              style="width:100%"
            >
              <Label for="ExpireDateType" class="f-l">固定时长</Label>自领取后
              <NumberBox v-model="MenberDialogForm.EffectDays" style="width:80px;" :min="0"></NumberBox>天生效, 有效期
              <NumberBox v-model="MenberDialogForm.EffectExpireDays" style="width:80px;" :min="0"></NumberBox>天
            </div>
            <div class="formStyle_list">
              <Label for="Remark">备注</Label>
              <TextBox inputId="Remark" name="Remark" v-model="MenberDialogForm.Remark"></TextBox>
            </div>
            <div class="formStyle_list">
              <Label for="Remark">优惠券分类</Label>
              <span>{{choseCateName}}</span>
            </div>
            <div class="formStyle_list" style="width:100%">
              <Label for="Remark" class="f-l">其他规则</Label>
              <div style="width:180px;float:left">
                <CheckBox inputId="nowIsMeanwhile" value="nowIsMeanwhile" v-model="nowIsMeanwhile"></CheckBox>
                <span for="fruit">能与其它券同时使用</span>
              </div>
              <div style="width:180px;float:left">
                <CheckBox inputId="nowIsIncrease" value="nowIsIncrease" v-model="nowIsIncrease"></CheckBox>
                <span for="fruit">本券可转赠其它会员</span>
              </div>
            </div>
          </TabPanel>
          <TabPanel :title="'例外商品'" v-if="MenberDialogForm.ApplicableType!=4">
            <div class="bordertop">
              <!-- <div class="bortrl" style="border-top:none">
                <LinkButton class="btnState mb-10" @click="$refs.ExceptionDialog.open()">新增</LinkButton>
              </div> -->
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
                :data="MenberDialogForm.CouponExceptionGoodsList"
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
                  v-model="MenberDialogForm.CouponExceptionGoodsList.GoodCode"
                ></GridColumn>
                <GridColumn
                  field="GoodName"
                  title="商品名称"
                  v-model="MenberDialogForm.CouponExceptionGoodsList.GoodName"
                ></GridColumn>
              </DataGrid>
            </div>
          </TabPanel>

          <TabPanel :title="'关联信息'" v-if="MenberDialogForm.ApplicableType==1">
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
                :data="MenberDialogForm.CouponGoodsBrandList"
                :pagination="true"
                class="minheight200"
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
                    <LinkButton
                      class="btnDelete"
                      @click="deleteBrandBtn(scope.$index, scope.row)"
                    >删除</LinkButton>
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
          <!-- 商品信息 -->
          <TabPanel :title="'关联信息'" v-if="MenberDialogForm.ApplicableType==2">
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
                :data="MenberDialogForm.CouponGoodsList"
                :pagination="true"
                class="minheight200"
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
                    <LinkButton
                      class="btnDelete"
                      @click="deleteGoodsBtn(scope.$index, scope.row)"
                    >删除</LinkButton>
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
          <!-- 类别 -->
          <TabPanel :title="'关联信息'" v-if="MenberDialogForm.ApplicableType==3">
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
                :data="MenberDialogForm.CouponGoodsCatalogList"
                :pagination="true"
                class="minheight200"
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
                    <LinkButton class="btnDelete" @click="deleteCateBtn(scope.$index, scope.row)">删除</LinkButton>
                  </template>
                </GridColumn>
                <GridColumn
                  field="GoodsCatalogCode"
                  title="商品类别"
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
        <div class="f-r mt-20 text-r btnpos">
          <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm btn">确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm btn">保存</LinkButton>
        </div>
      </Form>
    </Dialog>
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
      <institutionsData
        @childValue="getchildData"
        :choseCompanyList="MenberDialogForm.MarketingOrganizationRangeList"
      ></institutionsData>
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
      <CouponGoods
        @ComboGoodsCategory="getCouponGoods"
        :choseCategoryList="MenberDialogForm.CouponGoodsCatalogList"
      ></CouponGoods>
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
      :dialogStyle="{width:'500px',height:'600px'}"
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
import CouponSort from "@/components/Market/CouponSort";
import CouponAddCon from "@/components/Market/CouponAddCon";
import institutionsData from "@/components/institutionsData";
import InstitutionsRadio from "@/components/InstitutionsRadio";
import ComboBrand from "@/components/ComboBrand";
import ComboCatalog from "@/components/ComboCatalog";
import CouponGoods from "@/components/CouponGoods";
import ExceptionDialog from "@/components/ExceptionDialog";
import { parseTime } from "@/utils/index";
import Package from "@/components/Package";
import dayjs from "dayjs";
import {
  CouponList,
  CouponAdd,
  CouponRemove,
  CouponEdit,
  CouponEditSave,
  CouponQuery,
  GetEnumList,
  UpdateCouponState,
  GetOrgByUser
} from "@/api/Market";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      //搜索
      GrowthName: "",
      coding: "",
      State: null,
      UseType: null,
      Agencyvalue: "",
      AgencySearch: "",
      ApplicableType: null,
      UseTypeData: [],
      StateTypeData: [],
      ApplicableTypeData: [],
      OrganizationId: "",
      OrganizationIdData: [],
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

      UseType: null,
      dialogStatus: "create",
      Agencyvalue: "",
      ApplicableTypeData: [],
      UseTypeData: [],
      MenberlistSus: [],
      parentCategoryList: [], //左侧分类数据
      MinimumConsumption: "0",
      Menberlistfailure: [],
      privilegeImageSrc: "../../../static/privilegeImage.jpg",
      OrganizationRangeTypeData: [],
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
      ExpireDateTypeData: [],
      IDCardNo: "0",
      AstrictNum: "",
      IDCardNoData: [
        {
          Code: "0",
          Name: "不限"
        },
        {
          Code: "1",
          Name: "自定义张数"
        }
      ],
      DiscountAmountData: [
        // {
        //   Code: 0,
        //   Name: "全额"
        // },
        {
          Code: 0,
          Name: "自定义金额"
        }
      ],
      choseCateName: "", //左侧选中的分类名称
      RowId: "",
      fruits: ["不能与其它券同时使用", "本券可转赠其它会员"],
      OrganizationIdNum: 0,
      nowIsMeanwhile: true,
      nowIsIncrease: true,
      MenberDialogForm: {
        AgencySearch: "",
        CouponCatalogId: 0, //左侧选中的分类id
        Name: "",
        ApplicableType: 0,
        UseType: 0,
        DiscountAmount: 0,
        DiscountRate: 0,
        ExpireDateType: 0,
        ExpireBeginDate: dayjs()
          .add(-1, "month")
          .toDate(),
        ExpireEndDate: dayjs().toDate(),
        EffectDays: 0,
        EffectExpireDays: 0,
        Picture: "string",
        OrganizationRangeType: 0,
        MinimumConsumption: "0",
        IsMeanwhile: true, //是否能与其他卷同时使用
        IsIncrease: true, //可转增其他会员
        Remark: "string",
        CouponExceptionGoodsList: [],
        CouponOrganizationRangeList: [],
        CouponGoodsList: [],
        CouponGoodsBrandList: [], //优惠卷机构范围
        MarketingOrganizationRangeList: [], //选择机构列表
        CouponGoodsCatalogList: []
      }
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
    ExceptionDialog
  },
  methods: {
    queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1 = !this.iconxiangshang1;
      this.iconxiangxia1 = !this.iconxiangxia1;
      let that = this;
      setTimeout(function() {
        that.gridHeight = that.resizeTable();
      }, 0);
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
        // this.MenberDialogForm.MarketingOrganizationRangeList.OrganizationId = this.arrID;
        console.log(this.MenberDialogForm.CouponGoodsCatalogList);
      }
      // if(data && data.length){
      //   this.MenberDialogForm.CouponGoodsCatalogList = data;
      //   if(this.MenberDialogForm.CouponGoodsCatalogList && this.MenberDialogForm.CouponGoodsCatalogList.length){
      //     this.MenberDialogForm.CouponGoodsCatalogList.map((item)=>{
      //         item.GoodsCatalogCode = item.Code;
      //         item.GoodsCatalogName = item.text;
      //     });
      //   }
      // }
      // this.$refs.CouponGoodsDialog.close();
    },
    //商品传值
    getComboCatalog(data) {
      console.log("商品回值", data);
      if (data && data.length) {
        // this.MenberDialogForm.CouponGoodsList = data;
        data.forEach(item => {
          var arr = {};
          arr.GoodId = String(item.Id);
          arr.GoodCode = item.Code;
          arr.GoodName = item.Name;
          arr.GoodAmount = String(1);
          this.MenberDialogForm.CouponGoodsList.push(arr);
          this.MenberDialogForm.CouponGoodsList = this.unique(
            this.MenberDialogForm.CouponGoodsList
          );
        });
      }
      console.log(this.MenberDialogForm.CouponGoodsList);
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
        this.MenberDialogForm.CouponExceptionGoodsList.push(arr);
        this.MenberDialogForm.CouponExceptionGoodsList = this.unique(
          this.MenberDialogForm.CouponExceptionGoodsList
        );
      });
      this.$refs.ExceptionDialog.close();
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
    //子组件传递父级数据
    getCategoryList(data) {
      this.parentCategoryList = data;
      console.log(this.parentCategoryList);
    },
    //机构传值
    getchildValue(data) {
      console.log(data);
      this.$refs.MoneyEditDialog.close();
      this.AgencySearch = data.Id;
      this.Agencyvalue = data.Name;
    },
    getchildVouchers(data) {
      // console.log(data.id);
      this.CouponCatalogId = data.Id;
      this.getUsers();
    },
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
        OrganizationId: this.OrganizationId
      };
      console.log(para);
      CouponList(para).then(res => {
        console.log(res.Result);
        if (res && res.Result) {
          this.total = res.Result.Total;
          this.Menberlist = res.Result.Rows;
        }
      });
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
    //删除分类
    deleteCateBtn(index) {
      this.MenberDialogForm.CouponGoodsCatalogList.splice(index, 1);
    },
    //删除品牌
    deleteBrandBtn(index) {
      this.MenberDialogForm.CouponGoodsBrandList.splice(index, 1);
    },
    ////删除商品
    deleteGoodsBtn(index) {
      this.MenberDialogForm.CouponGoodsList.splice(index, 1);
    },
    //删除
    deleteCouponListBtn(index, row) {
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
        if(res.Result.Data.AstrictNum > 0){
          this.IDCardNo = "1";
        } else {
          this.IDCardNo = "0";
        }
        this.MenberDialogForm = {
          ApplicableType: res.Result.Data.ApplicableType,
          AstrictNum: res.Result.Data.AstrictNum,
          CouponCatalogId: res.Result.Data.CouponCatalogId,
          CouponExceptionGoodsList: res.Result.Data.CouponExceptionGoodsList
            ? res.Result.Data.CouponExceptionGoodsList
            : [],
          CouponOrganizationRangeList:
            res.Result.Data.CouponOrganizationRangeList,
          MarketingOrganizationRangeList:
            res.Result.Data.CouponOrganizationRangeList,
          DiscountAmount: res.Result.Data.DiscountAmount,
          DiscountRate: res.Result.Data.DiscountRate,
          EffectDays: res.Result.Data.EffectDays,
          EffectExpireDays: res.Result.Data.EffectExpireDays,
          IsIncrease: res.Result.Data.IsIncrease,
          IsMeanwhile: res.Result.Data.IsMeanwhile,
          MinimumConsumptionType: res.Result.Data.MinimumConsumptionType.toString(),
          MinimumConsumption: res.Result.Data.MinimumConsumption,
          Name: res.Result.Data.Name,
          OrganizationRangeType: res.Result.Data.OrganizationRangeType,
          Picture: res.Result.Data.Picture,
          Remark: res.Result.Data.Remark,
          State: res.Result.Data.State,
          UseType: res.Result.Data.UseType,
          ExpireDateType: res.Result.Data.ExpireDateType,
          ExpireBeginDate: new Date(res.Result.Data.ExpireBeginDate),
          ExpireEndDate: new Date(res.Result.Data.ExpireEndDate),
          CouponGoodsBrandList: res.Result.Data.CouponGoodsBrandList
            ? res.Result.Data.CouponGoodsBrandList
            : [],
          CouponGoodsCatalogList: res.Result.Data.CouponGoodsCatalogList
            ? res.Result.Data.CouponGoodsCatalogList
            : [],
          CouponGoodsList: res.Result.Data.CouponGoodsList
            ? res.Result.Data.CouponGoodsList
            : []
        };
        this.nowIsMeanwhile = res.Result.Data.IsMeanwhile;
        this.IsIncrease = res.Result.Data.IsIncrease;
        if (
          res.Result.Data.CouponOrganizationRangeList &&
          res.Result.Data.CouponOrganizationRangeList.length > 0
        ) {
          this.OrganizationIdNum =
            res.Result.Data.CouponOrganizationRangeList.length;
        } else {
          this.OrganizationIdNum = 0;
        }
        
      });
    },
    saveForm(index, row) {
      console.log(row);
      console.log(this.MenberDialogForm);

      this.$messager.confirm({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            // this.MenberDialogForm.Id = row.Id;
            var ExpireBeginDate = null;
            var ExpireEndDate = null;
            if (this.MenberDialogForm.ExpireDateType == 1) {
              // ExpireBeginDate = parseTime(
              //   this.MenberDialogForm.ExpireBeginDate,
              //   "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
              // );
              // ExpireEndDate = parseTime(
              //   this.MenberDialogForm.ExpireEndDate,
              //   "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
              // );
              ExpireBeginDate = dayjs(
                this.MenberDialogForm.ExpireBeginDate
              ).format("YYYY-MM-DD" + " 00:00:00");
              ExpireEndDate = dayjs(this.MenberDialogForm.ExpireEndDate).format(
                "YYYY-MM-DD" + " 23:59:59"
              );
            } else {
              ExpireBeginDate = null;
              ExpireEndDate = null;
            }
            console.log(
              "ExpireBeginDate:" +
                ExpireBeginDate +
                "===" +
                "ExpireEndDate:" +
                ExpireEndDate
            );
            this.MenberDialogForm.CouponOrganizationRangeList = this.MenberDialogForm.MarketingOrganizationRangeList;

              if(this.IDCardNo == "0"){
                this.MenberDialogForm.AstrictNum = 0;
              } 
            //格式化栏目列表防止tree结构节点里面含有递归数组，这样的数据Object.assign无法支持
            if (
              this.MenberDialogForm.CouponGoodsCatalogList &&
              this.MenberDialogForm.CouponGoodsCatalogList.length > 0
            ) {
              this.MenberDialogForm.CouponGoodsCatalogList.map(item => {
                if (item.children) {
                  item.children = [];
                }
                item.parent = item.parent ? {} : null; //防止tree结构父节点里面含有递归数组
              });
            }
            this.MenberDialogForm.IsMeanwhile = this.nowIsMeanwhile;
            this.MenberDialogForm.IsIncrease = this.nowIsIncrease;
            const para = Object.assign(
              {
                Id: this.RowId
              },
              this.MenberDialogForm
            );
            if (this.MenberDialogForm.ApplicableType == 1) {
              this.MenberDialogForm.CouponGoodsList = [];
              this.MenberDialogForm.CouponGoodsCatalogList = [];
            } else if (this.MenberDialogForm.ApplicableType == 2) {
              this.MenberDialogForm.CouponGoodsBrandList = [];
              this.MenberDialogForm.CouponGoodsCatalogList = [];
            } else if (this.MenberDialogForm.ApplicableType == 3) {
              this.MenberDialogForm.CouponGoodsBrandList = [];
              this.MenberDialogForm.CouponGoodsList = [];
            }
            para.ExpireBeginDate = ExpireBeginDate;
            para.ExpireEndDate = ExpireEndDate;
            para.MinimumConsumptionType = Number(this.MenberDialogForm.MinimumConsumptionType);//最低消费额度
            console.log(JSON.stringify(para));
            console.log(para);
            //return;
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
    //添加
    handleAdd() {
      this.$refs.CouponAddDialog.open();
      this.dialogStatus = "create";
      this.OrganizationIdNum = 0;
      this.IDCardNo = 0;
      this.MenberDialogForm = {
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
        MinimumConsumptionType: "0",
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
      this.nowIsMeanwhile = true;
      this.IsIncrease = true;
      if (this.CouponCatalogId == null) {
        this.choseCateName = "";
        this.MenberDialogForm.CouponCatalogId = null;
      } else if (this.CouponCatalogId == 0) {
        this.choseCateName = "";
        this.MenberDialogForm.CouponCatalogId = 0;
      } else {
        console.log(this.parentCategoryList);
        if (this.parentCategoryList && this.parentCategoryList.length > 0) {
          this.parentCategoryList.map(item => {
            if (this.CouponCatalogId == item.Id) {
              this.choseCateName = item.Name; //选中的左侧分类名称
            }
          });
        }
        this.MenberDialogForm.CouponCatalogId = this.CouponCatalogId; //选中的左侧分类Id
      }
    },
    //确认添加
    submitForm: function() {
      console.log(this.MenberDialogForm);
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            var ExpireBeginDate = null;
            var ExpireEndDate = null;
            if (this.MenberDialogForm.ExpireDateType == 1) {
              ExpireBeginDate = dayjs(
                this.MenberDialogForm.ExpireBeginDate
              ).format("YYYY-MM-DD" + " 00:00:00");
              ExpireEndDate = dayjs(this.MenberDialogForm.ExpireEndDate).format(
                "YYYY-MM-DD" + " 23:59:59"
              );
            } else {
              ExpireBeginDate = null;
              ExpireEndDate = null;
            }
            if(this.IDCardNo == "0"){
                this.MenberDialogForm.AstrictNum = 0;
              }
            // //商品列表
            // if (
            //   this.MenberDialogForm.CouponGoodsList &&
            //   this.MenberDialogForm.CouponGoodsList.length
            // ) {
            //   this.MenberDialogForm.CouponGoodsList.map(item => {
            //     item.GoodCode = item.Code;
            //     item.GoodName = item.Name;
            //   });
            // }
            //关联商品信息
            if (this.MenberDialogForm.ApplicableType == 1) {
              //品牌
              this.MenberDialogForm.CouponGoodsList = [];
              this.MenberDialogForm.CouponGoodsCatalogList = [];
            } else if (this.MenberDialogForm.ApplicableType == 2) {
              //商品信息
              this.MenberDialogForm.CouponGoodsCatalogList = [];
              this.MenberDialogForm.CouponGoodsBrandList = [];
            } else if (this.MenberDialogForm.ApplicableType == 3) {
              //类别
              this.MenberDialogForm.CouponGoodsList = [];
              this.MenberDialogForm.CouponGoodsBrandList = [];
            }
            if (
              this.MenberDialogForm.CouponGoodsCatalogList &&
              this.MenberDialogForm.CouponGoodsCatalogList.length > 0
            ) {
              this.MenberDialogForm.CouponGoodsCatalogList.map(item => {
                if (item.children) {
                  item.children = [];
                }
              });
            }
            console.log(this.MenberDialogForm.CouponGoodsCatalogList);
            this.MenberDialogForm.IsMeanwhile = this.nowIsMeanwhile;
            this.MenberDialogForm.IsIncrease = this.nowIsIncrease;
            this.CouponOrganizationRangeList = [];
            if (
              this.MenberDialogForm.MarketingOrganizationRangeList &&
              this.MenberDialogForm.MarketingOrganizationRangeList.length
            ) {
              this.MenberDialogForm.MarketingOrganizationRangeList.map(item => {
                this.MenberDialogForm.CouponOrganizationRangeList.push({
                  OrganizationId: item.OrganizationId
                });
              });
            }
            
            //return;
            console.log(this.MenberDialogForm);
            const para = Object.assign({}, this.MenberDialogForm);
            para.ExpireBeginDate = ExpireBeginDate;
            para.ExpireEndDate = ExpireEndDate;
            para.MinimumConsumptionType = Number(this.MenberDialogForm.MinimumConsumptionType);//最低消费额度
             console.log(JSON.stringify(para));
             //return;
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
      if (row.State == "停用") {
        this.StateAll = 1;
      } else {
        this.StateAll = 0;
      }
      const para = {
        Id: row.Id,
        State: this.StateAll
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
        EnumType: "CouponApplicableTypeEnum"
      };
      GetEnumList(para).then(res => {
        // res.Result.Data.unshift({ Code: null, Name: "全部" });
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
    },
    //适用机构类型
    OrganizationRangeMode() {
      const para = {
        EnumType: "OrganizationRangeTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.OrganizationRangeTypeData = res.Result.Data;
      });
    },
    //自定义日期
    ExpireDateTypeMode() {
      const para = {
        EnumType: "ExpireDateTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.ExpireDateTypeData = res.Result.Data;
      });
    },
    //机构
    GetOrgByUserChange() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.OrganizationIdData = res.Result ? res.Result.Data : [];
      });
    }
  },
  mounted() {
    this.getUsers();
    this.ApplicableTypeMode();
    this.FeatureTypeMode();
    this.TypeMode();
    this.OrganizationRangeMode();
    this.GetOrgByUserChange();
    this.ExpireDateTypeMode();
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
.bortrl {
  height: 40px;
  line-height: 40px;
  border-left: 1px solid #e0e6ed;
  border-right: 1px solid #e0e6ed;
}
</style>

