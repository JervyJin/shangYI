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
          <!-- <div class="formStyle_list">
            <Label for="formats">会员等级</Label>
            <ComboBox
              inputId="formats"
              v-model="MenberDialogForm.ERPRankType"
              :data="MemberLevelData"
              valueField="Id"
              textField="Name"
              placeholder="请选择会员等级"
            ></ComboBox>
          </div>-->
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
          <div class="formStyle_list tixing">
            <Label for="Name">有效日期</Label>
            <span
              v-for="(fruit,index) in IsShareData"
              :key="index"
              class="mr-10"
              @click="getUseDate(index)"
            >
              <RadioButton name="useDate" :inputId="fruit" :value="fruit" v-model="useDateModel"></RadioButton>
              <span :for="fruit">{{fruit}}</span>
            </span>
          </div>
          <div class="formStyle_list" v-if="useDateIndex==1">
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
          <div class="formStyle_list">
            <Label for="formats">营销方案类型</Label>
            <ComboBox
              inputId="formats"
              v-model="MenberDialogForm.ERPType"
              :data="PlanTypeList"
              valueField="Code"
              textField="Name"
              placeholder="请选择方案类型"
            ></ComboBox>
            <TextBox inputId="Name" name="Num" v-model="MenberDialogForm.Num"></TextBox>
            <span
              v-if="MenberDialogForm.ERPType == 2 || MenberDialogForm.ERPType == 4 || MenberDialogForm.ERPType == 6"
            >个</span>
            <span v-else>元</span>
          </div>
          <div class="formStyle_list tixing">
            <Label for="Name">机构适用范围</Label>
            <span
              v-for="(fruit,index) in companyRange"
              :key="index"
              class="mr-10"
              @click="choseCompany(index)"
            >
              <RadioButton name="group2" :inputId="fruit" :value="fruit" v-model="allCompany"></RadioButton>
              <span :for="fruit">{{fruit}}</span>
            </span>
            <span v-if="this.companyRankIndex >0">
              <LinkButton
                class="btnDelete"
                @click="$refs.MoneyDialog.open()"
                v-model="MenberDialogForm.MarketingOrganizationRangeList"
              >选择机构</LinkButton>
              共选择{{OrganizationIdNum}}家机构
            </span>
          </div>
          <div class="formStyle_list tixing">
            <Label for="Name">营销总次数</Label>
            <span
              v-for="(fruit,index) in marketTotal"
              :key="fruit"
              class="mr-10"
              @click="choseMarket(index)"
            >
              <RadioButton name="group2" :inputId="fruit" :value="fruit" v-model="marketNum"></RadioButton>
              <span :for="fruit">{{fruit}}</span>
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
            <Label for="Name">奖励类型</Label>
            <span
              v-for="(fruit,index) in rewardTypeList"
              :key="fruit.Name"
              class="mr-10"
              @click="choseRewardType(index)"
            >
              <RadioButton
                name="group2"
                :inputId="fruit.Name"
                :value="fruit.Name"
                v-model="rewardType"
              ></RadioButton>
              <span :for="fruit.Name">{{fruit.Name}}</span>
            </span>
          </div>
          <!-- <div class="formStyle_list tixing">
            <Label for="Name">适用特权类型</Label>
            <span
              v-for="(fruit,index) in privilegeTypeList"
              :key="fruit.Name"
              class="mr-10"
              @click="chosePrivilegeType(index)"
            >
                <RadioButton name="group2" :inputId="fruit.Name" :value="fruit.Name" v-model="privilegeType"></RadioButton>
                <span :for="fruit.Name">{{fruit.Name}}</span>
              </span>
          </div>-->
          <!--<div class="formStyle_list tixing">
            <Label for="Name">适用特权类型</Label>
            <span>
                <CheckBox inputId value="0"></CheckBox>
                <span>会员等级特权</span>
              </span>
          </div>-->

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
          <!-- <div class="formStyle_list">
            <Label for="IsMsg" class="f-l">发送通知</Label>
            <ComboBox
              inputId="formats"
              v-model="MenberDialogForm.IsMessage"
              :data="IsMessageData"
              valueField="Code"
              textField="Name"
            ></ComboBox>
            <LinkButton
              class="btnDelete"
              @click="$refs.IsMsgDialog.open()"
            >编辑通知</LinkButton>
          </div>-->
          <div class="formStyle_list couponControl">
            <Label for="Name">优惠券控制</Label>
            <span
              v-for="(fruit,index) in couponControl"
              :key="fruit.Name"
              class="mr-10"
              @click="getIsShareVal(index)"
            >
              <RadioButton
                name="group2"
                :inputId="fruit.Code"
                :value="fruit.Code"
                v-model="MenberDialogForm.CouponType"
              ></RadioButton>
              <span :for="fruit.Name">{{fruit.Name}}</span>
            </span>
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
            <!-- <div class="formStyle_list">
              <Label for="AwardRechargeAmoun">奖励金额</Label>
              <NumberBox
                v-model="MenberDialogForm.AwardRechargeAmoun"
                inputId="AwardRechargeAmoun"
                name="AwardRechargeAmoun"
                :min="0"
              ></NumberBox>
            </div>-->
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
                    field="CouponNum"
                    title="数量"
                    :editable="true"
                    v-model="MenberDialogForm.MarketingCouponAwardList.CouponNum"
                  ></GridColumn>
                </DataGrid>
              </TabPanel>
            </Tabs>
          </div>
        </TabPanel>
        <!-- 商品品牌 -->
        <TabPanel :title="'关联信息'" v-if="MenberDialogForm.ERPType==3 || MenberDialogForm.ERPType==4">
          <!-- 品牌 -->
          <div class="bordertop">
            <!-- <div class="bortrl pt-5 pb-5" style="border-top:none">
              <LinkButton class="btnState mb-10" @click="$refs.ComboBrandDialog.open()">新增</LinkButton>
            </div>-->
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
                  <LinkButton class="btnDelete" @click="deleteBrandBtn(scope.$index, scope.row)">删除</LinkButton>
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
        <TabPanel :title="'关联信息'" v-if="MenberDialogForm.ERPType==5 || MenberDialogForm.ERPType==6">
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
                  <LinkButton class="btnDelete" @click="deleteGoodsBtn(scope.$index, scope.row)">删除</LinkButton>
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
        <TabPanel :title="'关联信息'" v-if="MenberDialogForm.ERPType==1 || MenberDialogForm.ERPType==2">
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
        <TabPanel :title="'例外商品'">
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
              :data="MenberDialogForm.MarketingExceptionList"
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
                v-model="MenberDialogForm.MarketingExceptionList.GoodCode"
              ></GridColumn>
              <GridColumn
                field="GoodName"
                title="商品名称"
                v-model="MenberDialogForm.MarketingExceptionList.GoodName"
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
      <Vouchers @vouchers="getchildVouchers" :choseCouponList="MenberDialogForm.MarketingCouponAwardList"></Vouchers>
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
  MemoriaMarketingEdit,
  AddCostSaelMarketing,
  GetCostSaelMarketing,
  UpdateCostSaelMarketing
} from "@/api/Market";
import { GetMemberLevel } from "@/api/members";
import Vouchers from "@/components/Vouchers";
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
      rewardType: "",
      rewardTypeList: [], //奖励类型
      privilegeType: "",
      privilegeTypeList: [], //适用特权类型
      Menberlistwin: [
        { Id: 1, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 2, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 3, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 4, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 5, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" },
        { Id: 6, "custome-adv": "10-23", Code: 345, Name: "2019-09-11" }
      ],
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
          Code: 0,
          Name: "否"
        },
        {
          Code: 1,
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
      ExpireDateTypeData: [],
      IsTransmit: "否",
      IsTransmitData: ["否", "是"],
      IsShare: "不限",
      useDateIndex: 0,
      useDateModel: "不限",
      IsShareData: ["不限", "自定义日期"],
      companyRankIndex: 0,
      allCompany: "全部机构",
      companyRange: ["全部机构", "自定义机构"],
      marketNumIndex: 0,
      marketNum: "不限",
      marketTotal: ["不限", "自定义"],
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
      OrganizationRangeTypeData: [],
      OrganizationIdData: [],
      MemberLevelTypeData: [],
      MemberLevelId: [],
      MenberDialogForm: {
        Code: "",
        Name: "", //营销方案名称
        StartTime: "",
        EndTime: "",
        rewardRedPacket: 0, //奖励红包
        DepositType: 0,
        DiscountAmount: 0,
        SalePrice: 0,
        Quota: 0,
        CouponNum: 0,
        ExpireDateType: 0,
        EffectExpireMonths: 0,
        IsTransmit: true,
        IsShare: true,
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
        MarketingMsgContent: {
          Content: ""
        },
        MarketingMessageContent: {
          //发送通知
          Content: ""
        },
        OrganizationRangeType: 0,
        Picture1: "",
        Picture2: "",
        Remark: "",
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
        ComboGoodsBrandList: [],
        ComboGoodsCatalogList: [],
        ComboGoodsList: [],
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
        CouponExceptionGoodsList: [
          {
            GoodCode: "",
            GoodName: ""
          }
        ],
        CouponGoodsBrandList: [], //品牌列表
        CouponGoodsList: [], //商品列表
        CouponGoodsCatalogList: [], //商品分类
        MarketingGoodsList: [], //商品分类
        MarketingGoodsBrandList: [], //商品分类
        MarketingExceptionList: [], //商品分类
        MarketingMemberLevelList: [], //会员等级列表
        MarketingComboAwardList: []
      },
      ERPTypeList: [
        { Id: 1, Name: "普通用户" },
        { Id: 2, Name: "高级用户" },
        { Id: 3, Name: "VIP用户" }
      ],
      PlanTypeList: [], //营销方案类型
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
    ExceptionDialog
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
        MarketingTotalNumber = 0;
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
        MarketingEveryoneNumbe = 0;
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
      this.MenberDialogForm.MarketingMemberLevelList = [];
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
      } else {
        this.MenberDialogForm.MarketingMemberLevelList = [];
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
      //日期格式化处理
      var ExpireBeginDate = null;
      var ExpireEndDate = null;
      if (this.useDateIndex == 1) {
        ExpireBeginDate = parseTime(
          this.MenberDialogForm.ExpireBeginDate,
          "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
        );
        ExpireEndDate = parseTime(
          this.MenberDialogForm.ExpireEndDate,
          "{yyyy}-{mm}-{dd} {h}:{i}:{s}"
        );
      } else {
        ExpireBeginDate = null;
        ExpireEndDate = null;
      }
      if (this.MenberDialogForm.Num <= 0) {
        this.$messager.alert({
          title: "提示",
          msg: "营销方案类型值不能为空"
        });
        return;
      }
      //关联商品信息
      if (
        this.MenberDialogForm.ERPType == 1 ||
        this.MenberDialogForm.ERPType == 2
      ) {
        //类别
        this.MenberDialogForm.CouponGoodsList = [];
        this.MenberDialogForm.CouponGoodsBrandList = [];
        if (
          this.MenberDialogForm.CouponGoodsCatalogList &&
          this.MenberDialogForm.CouponGoodsCatalogList.length
        ) {
        } else {
          this.$messager.alert({
            title: "提示",
            msg: "商品分类列表不能为空"
          });
          return;
        }
      } else if (
        this.MenberDialogForm.ERPType == 5 ||
        this.MenberDialogForm.ERPType == 6
      ) {
        //商品信息
        this.MenberDialogForm.CouponGoodsCatalogList = [];
        this.MenberDialogForm.CouponGoodsBrandList = [];
        if (
          this.MenberDialogForm.CouponGoodsList &&
          this.MenberDialogForm.CouponGoodsList.length
        ) {
        } else {
          this.$messager.alert({
            title: "提示",
            msg: "商品列表不能为空"
          });
          return;
        }
      } else if (
        this.MenberDialogForm.ERPType == 3 ||
        this.MenberDialogForm.ERPType == 4
      ) {
        //商品品牌
        this.MenberDialogForm.CouponGoodsCatalogList = [];
        this.MenberDialogForm.CouponGoodsList = [];
        if (
          this.MenberDialogForm.CouponGoodsBrandList &&
          this.MenberDialogForm.CouponGoodsBrandList.length
        ) {
        } else {
          this.$messager.alert({
            title: "提示",
            msg: "品牌列表不能为空"
          });
          return;
        }
      }
      //商品信息
      if (
        this.MenberDialogForm.CouponGoodsList &&
        this.MenberDialogForm.CouponGoodsList.length > 0
      ) {
        var CouponGoodsList = [];
        // this.MenberDialogForm.CouponGoodsList.map(item => {
        //   item.GoodCode = item.Code;
        //   item.GoodName = item.Name;
        //   CouponGoodsList.push(item);
        // });
        this.MenberDialogForm.CouponGoodsList.map(item => {
            CouponGoodsList.push(item);
        });
      }
      //分类
      if (
        this.MenberDialogForm.CouponGoodsCatalogList &&
        this.MenberDialogForm.CouponGoodsCatalogList.length > 0
      ) {
        var CouponGoodsCatalogList = [];
        this.MenberDialogForm.CouponGoodsCatalogList.map(item => {
          item.GoodsCatalogCode = item.Code;
          item.GoodsCatalogName = item.Name;
          CouponGoodsCatalogList.push(item);
        });
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
      var newAmount = 0;
      var newNum = 0;
      if (
        this.MenberDialogForm.ERPType == 0 ||
        this.MenberDialogForm.ERPType == 1 ||
        this.MenberDialogForm.ERPType == 3 ||
        this.MenberDialogForm.ERPType == 5
      ) {
        newAmount = this.MenberDialogForm.Num; //金额
      }
      if (
        this.MenberDialogForm.ERPType == 2 ||
        this.MenberDialogForm.ERPType == 4 ||
        this.MenberDialogForm.ERPType == 6
      ) {
        newNum = this.MenberDialogForm.Num; //金额
      }
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
            var para = {
              MarketingSublistId: this.RegisteredEdit.MarketingSublistId, //编码
              MarketingId: this.RegisteredEdit.MarketingId, //编码
              Code: this.MenberDialogForm.Code, //编码
              Name: this.MenberDialogForm.Name, //名称
              MemberLevelType: this.MenberDialogForm.MemberLevelType, //会员等级
              MarketingMemberLevelList: this.MenberDialogForm
                .MarketingMemberLevelList,
              ExpireDateType: this.useDateIndex, //有效日期类型
              ExpireBeginDate: ExpireBeginDate, //有效日期开始时间
              ExpireEndDate: ExpireEndDate, //有效日期结束时间
              CostSaelMarketingType: this.MenberDialogForm.ERPType, //营销方案类型
              Amount: newAmount ? newAmount : 0, //营销方案金额
              Num: newNum ? newNum : 0, //营销方案金额
              OrganizationRangeType: this.companyRankIndex, //机构适用范围
              MarketingOrganizationRangeList: this.MenberDialogForm
                .MarketingOrganizationRangeList
                ? this.MenberDialogForm.MarketingOrganizationRangeList
                : [], //机构使用范围列表
              MarketingTotalNumber: MarketingTotalNumber, //营销总次数
              MarketingEveryoneNumbe: MarketingEveryoneNumbe, //每人限营销次数
              AwardType: this.MenberDialogForm.AwardType, //奖励类型
              Type: 0, //适用特权类型
              AwardRechargeAmoun: this.MenberDialogForm.AwardType, //适用特权类型
              AwardHongBaoAmount: this.MenberDialogForm.AwardHongBaoAmount, //适用特权类型
              IsMsg: this.MenberDialogForm.IsMsg > 0 ? true : false, //发送短信
              MarketingMsgTemplate: { Content: this.MarketingMsgContent }, //模板内容,
              IsMessage: this.MenberDialogForm.IsMessage > 0 ? true : false, //是否通知会员
              MarketingMessageTemplate: {
                Content: this.MarketingMessageContent
              }, //模板内容,
              CouponType: this.MenberDialogForm.CouponType, //优惠券控制
              Awardintegral: this.MenberDialogForm.Awardintegral, //奖励积分
              AwardGrowth: this.MenberDialogForm.AwardGrowth, //奖励成长值
              AwardAmountType: this.MenberDialogForm.AwardAmountType, //奖励红包类型(固定红包,随机红包)
              AwardFixedAmount: this.MenberDialogForm.AwardFixedAmount, //奖励固定红包
              RandomMinAmount: this.MenberDialogForm.RandomMinAmount, //随机红包最低金额
              RandomMaxAmount: this.MenberDialogForm.RandomMaxAmount, //随机红包最高金额
              RandomAmountHint: this.MenberDialogForm.RandomAmountHint, //随机红包提示
              MarketingWeChatAmountTemplate: redPacket, //编辑红包模板
              MarketingCouponAwardList: this.MenberDialogForm
                .MarketingCouponAwardList, //套餐奖励
              MarketingComboAwardList: this.MenberDialogForm
                .MarketingComboAwardList, //券奖励
              MarketingGoodsList: CouponGoodsList, //商品列表
              MarketingGoodsBrandList: this.MenberDialogForm
                .CouponGoodsBrandList, //券奖励
              MarketingGoodsCatalogList: CouponGoodsCatalogList, //分类
              MarketingExceptionList: this.MenberDialogForm
                .MarketingExceptionList //例外商品
            };
            console.log(JSON.stringify(para));
            //return;
            const para = Object.assign({}, para);
            console.log(para);
            UpdateCostSaelMarketing(para).then(res => {
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
        GetCostSaelMarketing(para).then(res => {
          console.log(res.Result);
          this.MemberLevelTypeMode();
          this.useDateIndex = res.Result.Data.ExpireDateType;
          if (this.useDateIndex == 1) {
            this.useDateModel = "自定义日期";
          } else {
            this.useDateModel = "不限";
          }
          //this.MenberDialogForm.ExpireBeginDate = res.Result.Data.ExpireDateType;

          this.companyRankIndex = res.Result.Data.OrganizationRangeType;
          if (this.companyRankIndex > 0) {
            this.allCompany = "自定义机构";
          } else {
            this.allCompany = "全部机构";
          }
          var ExpireBeginDate = res.Result.Data.ExpireBeginDate;
          if (ExpireBeginDate) {
            ExpireBeginDate = new Date(res.Result.Data.ExpireBeginDate);
          }
          var ExpireEndDate = res.Result.Data.ExpireEndDate;
          if (ExpireEndDate) {
            ExpireEndDate = new Date(res.Result.Data.ExpireEndDate);
          }
          if (
            res.Result.Data.MarketingOrganizationRangeList &&
            res.Result.Data.MarketingOrganizationRangeList.length
          ) {
            this.OrganizationIdNum =
              res.Result.Data.MarketingOrganizationRangeList.length;
          } else {
            this.OrganizationIdNum = 0;
          }

          this.MenberDialogForm = {
            Code: this.MenberDialogForm.Code, //编码
            Name: res.Result.Data.Name, //名称
            MemberLevelType: res.Result.Data.MemberLevelType, //会员等级
            MarketingMemberLevelList: res.Result.Data.MarketingMemberLevelList,
            ExpireDateType: res.Result.Data.ExpireDateType, //有效日期类型
            ExpireBeginDate: ExpireBeginDate, //有效日期开始时间
            ExpireEndDate: ExpireEndDate, //有效日期结束时间
            ERPType: res.Result.Data.CostSaelMarketingType, //营销方案类型
            Amount: newAmount ? newAmount.toString() : null, //营销方案金额
            Num: res.Result.Data.Num ? res.Result.Data.Num.toString() : null, //营销方案金额
            OrganizationRangeType: res.Result.Data.OrganizationRangeType, //机构适用范围
            MarketingOrganizationRangeList:
              res.Result.Data.MarketingOrganizationRangeList, //机构使用范围列表
            MarketingTotalNumber: res.Result.Data.MarketingTotalNumber, //营销总次数
            MarketingEveryoneNumbe: res.Result.Data.MarketingEveryoneNumbe
              ? res.Result.Data.MarketingEveryoneNumbe.toString()
              : "", //每人限营销次数
            AwardType: res.Result.Data.AwardType, //奖励类型
            Type: res.Result.Data.Type, //适用特权类型
            IsMsg: res.Result.Data.IsMsg ? 1 : 0, //发送短信
            MarketingMsgTemplate: {
              Content: res.Result.Data.MarketingMsgContent
            }, //模板内容,
            IsMessage: res.Result.Data.IsMessage ? 1 : 0, //是否通知会员
            MarketingMessageTemplate: {
              Content: res.Result.Data.MarketingMessageContent
            }, //模板内容,
            CouponType: res.Result.Data.CouponType.toString(), //优惠券控制
            Awardintegral: res.Result.Data.Awardintegral, //奖励积分
            AwardGrowth: res.Result.Data.AwardGrowth, //奖励成长值
            AwardAmountType: res.Result.Data.AwardAmountType, //奖励红包类型(固定红包,随机红包)
            AwardFixedAmount: res.Result.Data.AwardFixedAmount, //奖励固定红包
            RandomMinAmount: res.Result.Data.RandomMinAmount, //随机红包最低金额
            RandomMaxAmount: res.Result.Data.RandomMaxAmount, //随机红包最高金额
            RandomAmountHint: res.Result.Data.RandomAmountHint, //随机红包提示
            MarketingWeChatAmountTemplate:
              res.Result.Data.MarketingWeChatAmountTemplate, //编辑红包模板
            MarketingCouponAwardList: res.Result.Data.MarketingCouponAwardList, //套餐奖励
            MarketingComboAwardList: res.Result.Data.MarketingComboAwardList, //券奖励
            MarketingExceptionList: res.Result.Data.MarketingExceptionList, //例外商品
            CouponGoodsList: res.Result.Data.MarketingGoodsList, //商品列表
            CouponGoodsBrandList: res.Result.Data.MarketingGoodsBrandList, //券奖励
            CouponGoodsCatalogList: res.Result.Data.MarketingGoodsCatalogList //分类
          };
          var newAmount = res.Result.Data.Amount;
          var newNum = res.Result.Data.Num;
          if (newAmount > 0) {
            this.MenberDialogForm.Num = newAmount.toString();
          }
          if (newNum > 0) {
            this.MenberDialogForm.Num = newNum.toString();
          }
          //把Num字段转化成CouponNum字段券奖励
          if(this.MenberDialogForm.MarketingCouponAwardList && this.MenberDialogForm.MarketingCouponAwardList.length>0){
            this.MenberDialogForm.MarketingCouponAwardList.map((item)=>{
              if(!item.CouponNum){
                item.CouponNum = item.Num;
              }
            });
          }
          //发送短信newMsgData
          if (this.MenberDialogForm.IsMsg) {
            this.MarketingMsgContent = res.Result.Data.MarketingMsgTemplate
              ? res.Result.Data.MarketingMsgTemplate.Content
              : null;
          }
          if (this.MenberDialogForm.IsMessage) {
            this.MarketingMessageContent = res.Result.Data
              .MarketingMessageContent
              ? res.Result.Data.MarketingMessageContent.Content
              : null;
          }
          //会员等级
          if (
            res.Result.Data.MarketingMemberLevelList &&
            res.Result.Data.MarketingMemberLevelList.length
          ) {
            res.Result.Data.MarketingMemberLevelList.map(item => {
              this.MemberLevelId.push(item.MemberLevelId);
            });
          }
          //商品信息
          if (
            this.MenberDialogForm.CouponGoodsList &&
            this.MenberDialogForm.CouponGoodsList.length > 0
          ) {
            this.MenberDialogForm.CouponGoodsList.map(item => {
              item.Code = item.GoodCode;
              item.Name = item.GoodName;
            });
          }
          //分类
          if (
            this.MenberDialogForm.CouponGoodsCatalogList &&
            this.MenberDialogForm.CouponGoodsCatalogList.length > 0
          ) {
            this.MenberDialogForm.CouponGoodsCatalogList.map(item => {
              item.Code = item.GoodsCatalogCode;
              item.Name = item.GoodsCatalogName;
            });
          }
          //营销总次数
          if (res.Result.Data.MarketingTotalNumber == -1) {
            this.marketNumIndex = 0;
            this.marketNum = "不限";
            this.MenberDialogForm.MarketingTotalNumber = "";
          } else {
            if (res.Result.Data.MarketingTotalNumber) {
              this.marketNumIndex = 1;
              this.marketNum = "自定义";
              this.MenberDialogForm.MarketingTotalNumber = res.Result.Data.MarketingTotalNumber.toString();
            }
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
          //每人限营销次数
          if (res.Result.Data.AwardType == 1) {
            this.rewardType = "仅奖励一次";
          } else {
            this.rewardType = "按倍数奖励";
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
        //日期格式化处理
        var ExpireBeginDate = null;
        var ExpireEndDate = null;
        if (this.useDateIndex == 1) {
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
        // if(this.IsMsg == 1){
        //   if(!this.MenberDialogForm.MarketingMsgTemplate.Content){
        //     this.$messager.alert({
        //         title: "提示",
        //         msg: "开启发送短信时，内容模板不能为空"
        //       });
        //       return;
        //   }
        // }
        if (this.MenberDialogForm.Num <= 0) {
          this.$messager.alert({
            title: "提示",
            msg: "营销方案类型值不能为空"
          });
          return;
        }
        //关联商品信息
        if (
          this.MenberDialogForm.ERPType == 1 ||
          this.MenberDialogForm.ERPType == 2
        ) {
          //类别
          this.MenberDialogForm.CouponGoodsList = [];
          this.MenberDialogForm.CouponGoodsBrandList = [];
        } else if (
          this.MenberDialogForm.ERPType == 5 ||
          this.MenberDialogForm.ERPType == 6
        ) {
          //商品信息
          this.MenberDialogForm.CouponGoodsCatalogList = [];
          this.MenberDialogForm.CouponGoodsBrandList = [];
        } else if (
          this.MenberDialogForm.ERPType == 3 ||
          this.MenberDialogForm.ERPType == 4
        ) {
          //商品品牌
          this.MenberDialogForm.CouponGoodsCatalogList = [];
          this.MenberDialogForm.CouponGoodsList = [];
        }
        var newAmount = 0;
        var newNum = 0;
        if (
          this.MenberDialogForm.ERPType == 0 ||
          this.MenberDialogForm.ERPType == 1 ||
          this.MenberDialogForm.ERPType == 3 ||
          this.MenberDialogForm.ERPType == 5
        ) {
          newAmount = this.MenberDialogForm.Num; //金额
        }
        if (
          this.MenberDialogForm.ERPType == 2 ||
          this.MenberDialogForm.ERPType == 4 ||
          this.MenberDialogForm.ERPType == 6
        ) {
          newNum = this.MenberDialogForm.Num; //金额
        }

        //商品信息
        if (
          this.MenberDialogForm.CouponGoodsList &&
          this.MenberDialogForm.CouponGoodsList.length > 0
        ) {
          var CouponGoodsList = [];
          // this.MenberDialogForm.CouponGoodsList.map(item => {
          //   item.GoodCode = item.Code;
          //   item.GoodName = item.Name;
          //   CouponGoodsList.push(item);
          // });
          this.MenberDialogForm.CouponGoodsList.map(item => {
            CouponGoodsList.push(item);
          });
        }
        console.log(this.MenberDialogForm.CouponGoodsCatalogList);
        //return;
        //分类
        // if(this.MenberDialogForm.CouponGoodsCatalogList && this.MenberDialogForm.CouponGoodsCatalogList.length>0){
        //   var CouponGoodsCatalogList = [];
        //   this.MenberDialogForm.CouponGoodsCatalogList.map((item)=>{
        //       item.GoodsCatalogCode = item.Code;
        //       item.GoodsCatalogName = item.Name;
        //       CouponGoodsCatalogList.push(item);
        //   });
        // }
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
        //品牌
        // if(this.MenberDialogForm.CouponGoodsBrandList && this.MenberDialogForm.CouponGoodsBrandList.length>0){
        //   var CouponGoodsBrandList = [];
        //   this.MenberDialogForm.CouponGoodsBrandList.map((item)=>{
        //       item.GoodsBrandCode = item.Code;
        //       item.GoodsBrandName = item.Name;
        //       CouponGoodsBrandList.push(item);
        //   });
        // }
        // console.log(666666);
        // console.log(this.MenberDialogForm.ERPType);
        // console.log(7777777);
        // return false;
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
              var para = {
                Name: this.MenberDialogForm.Name, //名称
                MemberLevelType: this.MenberDialogForm.MemberLevelType, //会员等级
                MarketingMemberLevelList: this.MenberDialogForm
                  .MarketingMemberLevelList,
                ExpireDateType: this.useDateIndex, //有效日期类型
                ExpireBeginDate: ExpireBeginDate, //有效日期开始时间
                ExpireEndDate: ExpireEndDate, //有效日期结束时间
                CostSaelMarketingType: this.MenberDialogForm.ERPType, //营销方案类型
                Amount: newAmount ? newAmount : 0, //营销方案金额
                Num: newNum ? newNum : 0, //营销方案金额
                OrganizationRangeType: this.companyRankIndex, //机构适用范围
                MarketingOrganizationRangeList: this.MenberDialogForm
                  .MarketingOrganizationRangeList, //机构使用范围列表
                MarketingTotalNumber: MarketingTotalNumber, //营销总次数
                MarketingEveryoneNumbe: MarketingEveryoneNumbe, //每人限营销次数
                AwardType: this.MenberDialogForm.AwardType, //奖励类型
                Type: 0, //适用特权类型
                IsMsg: this.MenberDialogForm.IsMsg, //发送短信
                MarketingMsgTemplate: { Content: this.MarketingMsgContent }, //模板内容,
                IsMessage: this.MenberDialogForm.IsMessage, //是否通知会员
                MarketingMessageTemplate: {
                  Content: this.MarketingMessageContent
                }, //模板内容,
                CouponType: this.MenberDialogForm.CouponType, //优惠券控制
                Awardintegral: this.MenberDialogForm.Awardintegral, //奖励积分
                AwardGrowth: this.MenberDialogForm.AwardGrowth, //奖励成长值
                AwardAmountType: this.MenberDialogForm.AwardAmountType, //奖励红包类型(固定红包,随机红包)
                AwardFixedAmount: this.MenberDialogForm.AwardFixedAmount, //奖励固定红包
                RandomMinAmount: this.MenberDialogForm.RandomMinAmount, //随机红包最低金额
                RandomMaxAmount: this.MenberDialogForm.RandomMaxAmount, //随机红包最高金额
                RandomAmountHint: this.MenberDialogForm.RandomAmountHint, //随机红包提示
                MarketingWeChatAmountTemplate: redPacket, //编辑红包模板
                MarketingCouponAwardList: this.MenberDialogForm
                  .MarketingCouponAwardList, //套餐奖励
                MarketingComboAwardList: this.MenberDialogForm
                  .MarketingComboAwardList, //券奖励
                MarketingExceptionList: this.MenberDialogForm
                  .MarketingExceptionList, //例外商品 //券奖励
                MarketingGoodsList: CouponGoodsList, //商品列表
                MarketingGoodsBrandList: this.MenberDialogForm
                  .CouponGoodsBrandList, //券奖励
                MarketingGoodsCatalogList: this.MenberDialogForm
                  .CouponGoodsCatalogList //分类
              };
              console.log(JSON.stringify(para));
              //return;
              const para = Object.assign({}, para);
              AddCostSaelMarketing(para).then(res => {
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
        // this.MenberDialogForm.MarketingOrganizationRangeList.OrganizationId = this.arrID;
        console.log(this.MenberDialogForm.CouponGoodsCatalogList);
      }
      // if(data && data.length){
      //   this.MenberDialogForm.CouponGoodsCatalogList = data;
      // }
      // this.$refs.CouponGoodsDialog.close();
    },
    //商品传值
    getComboCatalog(data) {
      console.log(data);
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
        this.MenberDialogForm.MarketingExceptionList.push(arr);
        this.MenberDialogForm.MarketingExceptionList = this.unique(
          this.MenberDialogForm.MarketingExceptionList
        );
      });
      this.$refs.ExceptionDialog.close();
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
      // console.log("child", data);
      // this.addObjectValueForList(data, "Num", "1");
      // this.$refs.VouchersDialog.close();
      // this.MenberDialogForm.MarketingCouponAwardList = data;
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
          item.CouponNum = 1;
          if(!item.CouponType){
              item.CouponType = item.ApplicableType;
          }
        });
      }
      this.$refs.VouchersDialog.close();
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

    //选择有效日期
    getUseDate(index) {
      this.useDateIndex = index;
      if (index) {
        this.MenberDialogForm.IsShare = true;
      } else {
        this.MenberDialogForm.IsShare = false;
      }
    },
    //机构适用范围
    choseCompany(index) {
      this.companyRankIndex = index;
      if (index) {
        this.MenberDialogForm.IsCompany = true;
      } else {
        this.MenberDialogForm.IsCompany = false;
      }
    },
    //营销总次数
    choseMarket(index) {
      this.marketNumIndex = index;
      if (index) {
        this.MenberDialogForm.marketNum = "1";
      } else {
        this.MenberDialogForm.marketNum = "0";
      }
    },
    //每人限营销次数
    choseMarketPeople(index) {
      // this.marketPeopleIndex = index;
      // if (index) {
      //     this.MenberDialogForm.singlePeople = "1";
      // } else {
      //     this.MenberDialogForm.singlePeople = "0";
      // }
    },
    //奖励类型
    choseRewardType(index) {
      this.MenberDialogForm.AwardType = index;
      // if (index) {
      //     this.MenberDialogForm.rewardType = true;
      // } else {
      //     this.MenberDialogForm.rewardType = false;
      // }
    },
    //特权类型
    chosePrivilegeType(index) {
      this.MenberDialogForm.privilegeType = index;
      // if (index) {
      //     this.MenberDialogForm.privilegeType = true;
      // } else {
      //     this.MenberDialogForm.privilegeType = false;
      // }
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
    this.GetEnumListFn(); //营销方案类型
    this.GetEnumListRewardTypeFn(); //奖励
    this.GetEnumListPrivilegeTypeFn(); //特权
    this.GetEnumListCouponControlFn(); //优惠券控制
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
