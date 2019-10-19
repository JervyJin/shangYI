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
        <TextBox v-model="GrowthName" placeholder=" ">
          <span class="query_title">等级名称</span>
          <Addon>
            <span
              v-if="GrowthName"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="GrowthName=null"
            ></span>
          </Addon>
        </TextBox>
        <LinkButton class="iconfont iconsousuo btn-query btn bradius" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton class="btnAdd btn-primary radius iconfont iconadd f-16" @click="handledAdd">添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <DataGrid
      :data="Menberlist"
      :pagination="true"
      id="grid"
      :columnResizing="true"
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
      <GridColumn align="center" title="操作" field="custome-adv" width="120px">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.MenberAddDialog.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="等级名称" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Code" title="等级编码" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="ThirdCode" title="第三方等级编码" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.ThirdCode}}</div>
        </template>
      </GridColumn>
      <GridColumn field="GrowthValue" title="升级条件" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="right">{{scope.row.GrowthValue}}</div>
        </template>
      </GridColumn>
      <GridColumn field title="关联特权" align="center">
        <template slot="body" slot-scope="scope">
          <div class="TagBtnCla" align="left" @click="TagBtn(scope.$index, scope.row)">详情</div>
        </template>
      </GridColumn>
      <GridColumn field title="已有营销方案" align="center">
        <template slot="body" slot-scope="scope">
          <div class="TagBtnCla" align="left" @click="MarketingPlan(scope.$index, scope.row)">详情</div>
        </template>                                                                                                                                                                                     
      </GridColumn>
      <GridColumn field="LastUpdatorName" title="操作人" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.LastUpdatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorTime" title="操作时间" width="200" align="center">
        <template slot="body" slot-scope="scope">
          <div class="title" align="left">{{scope.row.LastUpdatorTime}}</div>
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
    <!-- 弹框 -->
    <Dialog
      ref="MenberAddDialog"
      title="会员等级"
      :dialogStyle="{width:'800px',height:'520px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="MenberDialogForm" class="formStyle" refs="fromline" style="border-top：none" ref="formvalidate" :rules="rules" @validate="errors=$event">
        <Tabs class="Tabsstyle">
          <TabPanel :title="'基本信息'">
            <div class="formStyle_list">
              <Label for="Name">等级名称</Label>
              <TextBox
                inputId="Name"
                name="Name"
                v-model="MenberDialogForm.Name"
                placeholder="等级名称 "
                v-Tooltip="getTipOpts('Name')"
              >
                <span class="c-red starpos">*</span>
              </TextBox>
            </div>
            <div class="formStyle_list">
              <Label for="GrowthValue">所需成长值</Label>
              <NumberBox
                v-model="MenberDialogForm.GrowthValue"
                placeholder="所需成长值 "
                :spinners="false"
                :min="0"
                name="GrowthValue"
                v-Tooltip="getTipOpts('GrowthValue')"
              >
                <span class="c-red starpos">*</span>
              </NumberBox>
            </div>
            <div class="formStyle_list" style="display:none;">
              <!--  <div class="f-l" style="width:50%">
                <Label for="Code">等级编号</Label>
                <TextBox
                  inputId="Code"
                  name="Code"
                  v-model="MenberDialogForm.Code"
                  placeholder="等级编号 "
                >
                  <span class="c-red starpos">*</span>
                </TextBox>
              </div>-->
              <div class="f-l">
                <Label for="ThirdCode">第三方等级编号</Label>
                <TextBox
                  inputId="ThirdCode"
                  name="ThirdCode"
                  v-model="MenberDialogForm.ThirdCode"
                  placeholder="第三方等级编码 "
                >
                  <span class="c-red starpos">*</span>
                </TextBox>
              </div>
            </div>
            <!-- <div class="formStyle_list">
              <Label for="Image">等级图标</Label>
              <imgupload :defaultFileList="defaultInfo.pic" @img-url="getImgUrl"></imgupload>
              <TextBox inputId="Image" name="Image" v-model="MenberDialogForm.Image"></TextBox>
              <span class="c-red starpos">*</span>
            </div>-->
          </TabPanel>
          <!-- 奖励方案 -->
          <TabPanel :title="'奖励方案'">
            <div class="container">
              <div class="formStyle_list">
                <Label for="GiveScore">奖励积分</Label>
                <NumberBox
                  inputId="GiveScore"
                  name="GiveScore"
                  :spinners="false"
                  :min="0"
                  v-model="MenberDialogForm.GiveScore"
                ></NumberBox>
                <span>分</span>
              </div>
              <div class="formStyle_list">
                <div class="f-l mr-30">
                  <Label for="GiveRedpack">红包类型</Label>
                  <ComboBox
                    inputId="GiveRedpack"
                    v-model="MenberDialogForm.GiveRedpackType"
                    :data="MoneyType"
                    valueField="Code"
                    textField="Name"
                  ></ComboBox>
                </div>
                <div class="f-l">
                  <div class="f-l">
                    <span>奖励</span>
                    <NumberBox
                      inputId="GiveRedpackMax"
                      :precision="2"
                      :spinners="false"
                      :min="0"
                      style="width:80px"
                      v-model="MenberDialogForm.GiveRedpackMax"
                    ></NumberBox>
                    <span>元</span>
                  </div>
                  <div class="f-l" v-if="this.MenberDialogForm.GiveRedpackType==1">
                    <span>至</span>
                    <NumberBox
                      inputId="GiveRedpackMin"
                      :precision="2"
                      :min="0"
                      :spinners="false"
                      style="width:80px"
                      v-model="MenberDialogForm.GiveRedpackMin"
                    ></NumberBox>
                    <span>元</span>
                  </div>
                </div>
                <!-- <div class="f-l editorStyle" @click="$refs.MoneyEditDialog.open()">编辑红包</div> -->
              </div>
              <!-- table -->
              <Tabs class="Tabsstyle bordertop">
                <TabPanel :title="'券奖励'">
                  <div class="bortrl">
                    <p class="btnState" @click="$refs.VouchersDialog.open()">
                      <i class="iconfont iconjiahao"></i>添加
                    </p>
                  </div>
                  <DataGrid
                    :data="MenberDialogForm.AddMemberLevelCouponAward"
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
                        <LinkButton class="btnDelete" @click="CompodeleteBtn(scope.rowIndex)">删除</LinkButton>
                      </template>
                    </GridColumn>
                    <GridColumn
                      field="UseType"
                      title="券类型"
                      v-model="MenberDialogForm.AddMemberLevelCouponAward.UseType"
                    ></GridColumn>
                    <GridColumn field="CouponName" title="券名称"></GridColumn>
                    <GridColumn field="CouponCode" title="券编号"></GridColumn>
                    <GridColumn
                      field="Num"
                      title="数量"
                      :editable="true"
                      v-model="MenberDialogForm.AddMemberLevelCouponAward.Num"
                    ></GridColumn>
                  </DataGrid>
                </TabPanel>
                <TabPanel :title="'套餐奖励'">
                  <div class="bortrl">
                    <p class="btnState" @click="$refs.PackageDialog.open()">
                      <i class="iconfont iconjiahao"></i>添加
                    </p>
                  </div>

                  <DataGrid
                    :data="MenberDialogForm.AddMemberLevelComboAward"
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
                        <LinkButton class="btnDelete" @click="CombodeleteBtn(scope.rowIndex)">删除</LinkButton>
                      </template>
                    </GridColumn>
                    <GridColumn
                      field="ComboCode"
                      title="套餐编码"
                      v-model="MenberDialogForm.AddMemberLevelComboAward.ComboCode"
                    ></GridColumn>
                    <GridColumn
                      field="ComboName"
                      title="套餐名称"
                      v-model="MenberDialogForm.AddMemberLevelComboAward.ComboName"
                    ></GridColumn>
                    <GridColumn
                      field="ComboType"
                      title="套餐类型"
                      v-model="MenberDialogForm.AddMemberLevelComboAward.ComboType"
                    ></GridColumn>
                    <GridColumn
                      field="Num"
                      title="数量"
                      :editable="true"
                      v-model="MenberDialogForm.AddMemberLevelComboAward.Num"
                    ></GridColumn>
                  </DataGrid>
                </TabPanel>
              </Tabs>
            </div>
          </TabPanel>
          <TabPanel :title="'等级特权'" v-if="this.dialogStatus!='create'">
            <DataGrid :data="LevelPrivilegeList" :pagination="true" class="minheight200">
              <GridColumn field="Name" title="特权名称"></GridColumn>
              <GridColumn field="Type" title="特权类型"></GridColumn>
            </DataGrid>
          </TabPanel>
        </Tabs>
        <!-- <div class="f-r mt-30">
          <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel btn radius">取消</LinkButton>
          <LinkButton
            v-if="dialogStatus=='create'"
            @click="submitForm()"
            class="btnConfirm btn radius"
          >确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm btn radius">保存</LinkButton>
        </div> -->
      </Form>
      <template v-slot:footer>
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel">取消</LinkButton>
      </template>
    </Dialog>
    <!-- 添加券 -->
    <Dialog
      ref="VouchersDialog"
      :dialogStyle="{width:'1000px',height:'600px'}"
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
      :dialogStyle="{width:'550px',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="套餐"
    >
      <Package @packchild="getchildPackage"></Package>
    </Dialog>
    <!-- 红包编辑 -->
    <Dialog
      ref="MoneyEditDialog"
      :dialogStyle="{width:'550px',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="红包编辑"
    >
      <MoneyEdit @packageEdit="getchildMoneyEdit"></MoneyEdit>
    </Dialog>
    <!-- 关联特权 -->
    <Dialog
      ref="PrivilegeDialog"
      title="关联特权"
      :dialogStyle="{width:'450px',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <DataGrid :data="menuItems" :multiSort="true" class="pd-10 minheight200">
        <GridColumn field="itemid" title="序号" width="50" align="center">
          <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
        </GridColumn>
        <GridColumn field="Type" title="特权名称"></GridColumn>
      </DataGrid>
    </Dialog>
    <!-- 已有营销方案 -->
    <Dialog
      ref="MarketingPlanDialog"
      title="营销方案"
      :dialogStyle="{width:'350px',height:'600px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <DataGrid :data="MarketingPlanmenuItem" :multiSort="true" class="pd-10">
        <GridColumn field="itemid" title="序号" width="50" align="center">
          <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
        </GridColumn>
        <GridColumn field="MarketingName" title="方案名称"></GridColumn>
      </DataGrid>
    </Dialog>
  </div>
</template>
<script>
import Vouchers from "@/components/Vouchers";
import Package from "@/components/Package";
import MoneyEdit from "@/components/MoneyEdit";
import {
  MemberLeveList,
  MemberLeveAdd,
  MemberLeveRemove,
  MemberLeveEdit,
  MemberLeveEditSave,
  AddMemberLevelChange,
  GetMemberLevelCouponAward,
  GetMemberLevelComboAward,
  MemberGetCouponAward,
  MemberGetComboAward,
  GetEnumList,
  GetMemberLevelFeature,
  GetMarketingMemberLevel
} from "@/api/members";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      StartDate: new Date(),
      EndDate: new Date(),
      GrowthName: "",
      StateTypeId: 0,
      RewardTypeId: 0,
      MoneyType: [],

      //DataGrid
      MarketingPlandata: [],
      Menberlist: [],
      dialogStatus: "",
      StateText: "",
      //分页
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
      fruits: ["不限", "自定义"],
      validity: null,
      ComboAwardlist: [],
      Couponlist: [],
      CouponlistNum: 0,
      ComboAwardlistNum: 0,
      MenberDialogForm: {
        Code: "",
        ThirdCode: "",
        Name: "",
        GrowthValue: 0,
        Remark: "",
        Image: "",
        GiveScore: 0,
        GiveRedpackType: 0,
        GiveRedpackMax: 0,
        GiveRedpackMin: 0,
        GiveRedpackTemplateId: "",
        GiveRedpackData: "",
        AddMemberLevelCouponAward: [],
        AddMemberLevelComboAward: []
      },
      LevelPrivilegeList: "",
      //关联特权
      menuItems: [],
      MarketingPlanmenuItem: [],
      rules: {
        Name: "required"
      },
      errors: {},
    };
    
  },
  components: {
    Package,
    Vouchers
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
    //关联特权
    TagBtn(index, row) {
      const para = { Id: row.Id, page: this.pageNumber, rows: this.pageSize };
      console.log(para);
      GetMemberLevelFeature(para).then(res => {
        this.$refs.PrivilegeDialog.open();
        this.menuItems = res.Result.Rows;
        console.log(res.Result);
      });
    },
    //已有营销方案
    MarketingPlan(index, row) {
      const para = { Id: row.Id, page: this.pageNumber, rows: this.pageSize };
      console.log(para);
      GetMarketingMemberLevel(para).then(res => {
        this.$refs.MarketingPlanDialog.open();
        this.MarketingPlanmenuItem = res.Result.Rows;
        console.log(this.MarketingPlanmenuItem);
      });
    },
    //奖励红包类型
    MoneyTypeMode() {
      const para = {
        EnumType: "AwardAmountTypeEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.MoneyType = res.Result.Data;
      });
    },
    //传值(券)
    getchildVouchers(data) {
      console.log(data);
      this.$refs.VouchersDialog.close();
      this.MenberDialogForm.AddMemberLevelCouponAward = data;
      this.addObjectValueForList(data, "Num", "1");
      console.log(this.MenberDialogForm.AddMemberLevelCouponAward);
    },
    //套餐传值
    getchildPackage(data) {
      console.log(data);
      this.$refs.PackageDialog.close();
      this.addObjectValueForList(data, "Num", "1");
      this.MenberDialogForm.AddMemberLevelComboAward = data;
      console.log(this.MenberDialogForm.AddMemberLevelComboAward);
    },
    //红包编辑
    getchildMoneyEdit(data) {
      console.log(data);
      console.log(JSON.stringify(data));
      this.$refs.MoneyEditDialog.close();
      this.MenberDialogForm.MarketingWeChatAmountTemplate = data;
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
        Name: this.GrowthName
      };
      MemberLeveList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //删除
    deleteBtn(index, row) {
      var _this = this;
      this.$messager.alert({
        title: "提示",
        msg: "您确定删除此内容吗？",
        result: r => {
          if (r) {
            const para = { Id: row.Id };
            console.log(para);
            MemberLeveRemove(para).then(res => {
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
      console.log(para);
      MemberLeveEdit(para).then(res => {
        console.log(res.Result);
        this.MenberDialogForm = {
          Name: res.Result.Data.Name,
          ThirdCode: res.Result.Data.ThirdCode,
          Remark: res.Result.Data.Remark,
          Image: res.Result.Data.Image,
          GrowthValue: res.Result.Data.GrowthValue,
          GiveScore: res.Result.Data.GiveScore,
          GiveRedpackType: res.Result.Data.GiveRedpackType,
          GiveRedpackTemplateId: res.Result.Data.GiveRedpackTemplateId,
          GiveRedpackMin: res.Result.Data.GiveRedpackMin,
          GiveRedpackMax: res.Result.Data.GiveRedpackMax,
          GiveRedpackData: res.Result.Data.GiveRedpackData,
          Id: res.Result.Data.Id,
          Code: res.Result.Data.Code,
          AddMemberLevelCouponAward: [],
          AddMemberLevelComboAward: []
        };
        //券
        GetMemberLevelCouponAward(para).then(res => {
          console.log("编辑券", res.Result);
          this.MenberDialogForm.AddMemberLevelCouponAward = res.Result.Data;
        });
        //套餐
        GetMemberLevelComboAward(para).then(res => {
          console.log("编辑套餐", res.Result.Data);
          this.MenberDialogForm.AddMemberLevelComboAward = res.Result.Data;
          console.log(this.MenberDialogForm.AddMemberLevelComboAward);
        });
        const para1 = {
          Id: row.Id,
          page: this.pageNumber,
          rows: this.pageSize
        };
        console.log(para);
        GetMemberLevelFeature(para1).then(res => {
          console.log("编辑等级", res.Result.Data);
          this.LevelPrivilegeList = res.Result.Rows;
        });
      });
    },
    saveForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "请输入标签名称"
          });
        } else {
            this.submitFormFn();
        }   
      });  
    },
    saveFormFn(index, row) {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            // this.MenberDialogForm.Id = row.Id;
            if(this.MenberDialogForm.AddMemberLevelCouponAward && this.MenberDialogForm.AddMemberLevelCouponAward.length>0){
              this.MenberDialogForm.AddMemberLevelCouponAward.map((item)=>{
                if(!item.CouponId){
                  item.CouponId = item.Id;
                } 
              });
            }
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            MemberLeveEditSave(para).then(res => {
              this.getUsers();
              this.$refs.MenberAddDialog.close();
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
    handledAdd() {
      this.$refs.MenberAddDialog.open();
      this.dialogStatus = "create";
      this.MenberDialogForm = {
        Code: "",
        ThirdCode: "",
        Name: "",
        GrowthValue: 0,
        Remark: "",
        Image: "",
        GiveScore: 0,
        GiveRedpackType: 0,
        GiveRedpackMax: 0,
        GiveRedpackMin: 0,
        GiveRedpackTemplateId: "",
        GiveRedpackData: "",
        AddMemberLevelCouponAward: [],
        AddMemberLevelComboAward: []
      };
    },
    submitForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "请输入标签名称"
          });
        } else {
            this.submitFormFn();
        }   
      });  
    },
    //添加
    submitFormFn: function() {
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            console.log(this.MenberDialogForm.AddMemberLevelCouponAward);
            if(this.MenberDialogForm.AddMemberLevelCouponAward && this.MenberDialogForm.AddMemberLevelCouponAward.length>0){
              this.MenberDialogForm.AddMemberLevelCouponAward.map((item)=>{
                if(!item.CouponId){
                  item.CouponId = item.Id;
                } 
              });
            }
            this.MenberDialogForm.Code = parseInt(
              Math.random() * 100
            ).toString();
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            //return;
            MemberLeveAdd(para).then(res => {
              this.getUsers();
              this.$refs.MenberAddDialog.close();
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
    CombodeleteBtn(index) {
      this.MenberDialogForm.AddMemberLevelComboAward.splice(index, 1);
    },
    CompodeleteBtn(index) {
      this.MenberDialogForm.AddMemberLevelCouponAward.splice(index, 1);
    },

    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
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
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : null;
    },
    hasError(name) {
      return this.getError(name) != null;
    },
    getTipOpts(name) {
      return {
        content: this.getError(name),
        closed: !this.hasError(name),
        position: "right"
      };
    },
  },
  mounted() {
    this.getUsers();
    this.MoneyTypeMode();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
.editorStyle {
  width: auto;
  overflow: hidden;
  border: 1px solid #dfdfdf;
  height: 30px;
  line-height: 30px;
  margin-top: 8px;
  margin-left: 20px;
  padding: 0 5px;
  border-radius: 3px;
}
</style>

