<template>
  <div class="container">
    <div class="conTop">
      <p class="topTitle">全渠道营销管理</p>
      <LinkButton class="btnAdd" @click="$refs.MenberAddDialog.open();dialogStatus ='create'">添加</LinkButton>
    </div>
    <!-- 搜索 -->
    <div class="query mb-20">
      <DateBox v-model="StartDate" format="yyyy-MM-dd" placeholder="操作日期 （起）"></DateBox>
      <DateBox v-model="EndDate" format="yyyy-MM-dd" placeholder="操作日期 （止）"></DateBox>
      <TextBox v-model="Name" placeholder="权益名称 "></TextBox>
      <ComboBox v-model="State" :data="StateType" valueField="Code" textField="Name"></ComboBox>
      <LinkButton
        style="width:120px"
        class="iconfont iconsousuo btn-query"
        @click="MenberSearchTop()"
      >搜索</LinkButton>
    </div>
    <!-- table -->
    <DataGrid :data="Menberlist" :pagination="true">
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.MenberAddDialog.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton class="btnDelete" @click="deleteBtn(scope.$index, scope.row)">删除</LinkButton>
          <LinkButton class="btnState" @click="StateText()" v-if="scope.row.State=='停用'">启用</LinkButton>
          <LinkButton class="btnState" @click="StateText()" v-if="scope.row.State=='启用'">停用</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Code" title="编码"></GridColumn>
      <GridColumn field="Name" title="名称"></GridColumn>
      <GridColumn field="Image" title="图标"></GridColumn>
      <GridColumn field="RichContent" title="介绍"></GridColumn>
      <GridColumn field="Type" title="特权类型"></GridColumn>
      <GridColumn field="State" title="状态"></GridColumn>
    </DataGrid>
    <!-- 分页 -->
    <template slot="footer">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        :pageNumber="pageNumber"
        :layout="pagelayout"
        @pageChange="onPageChange($event)"
      ></Pagination>
    </template>
    <!-- 弹框 -->
    <Dialog
      ref="MenberAddDialog"
      title="会员特权新增"
      :dialogStyle="{width:'550px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="MenberDialogForm" class="formStyle">
        <div class="formStyle_list">
          <Label for="Name">特权名称</Label>
          <TextBox inputId="Name" name="Name" v-model="MenberDialogForm.Name"></TextBox>
          <span class="c-red">*</span>
        </div>
        <div class="formStyle_list">
          <Label for="AbbrName">特权简称</Label>
          <TextBox inputId="AbbrName" name="AbbrName" v-model="MenberDialogForm.AbbrName"></TextBox>
          <span class="c-red">*</span>
        </div>
        <div class="formStyle_list">
          <Label for="Type">特权类型</Label>
          <ComboBox
            valueField="Code"
            textField="Name"
            :data="TypeData"
            v-model="MenberDialogForm.Type"
          ></ComboBox>
          <span class="c-red">*</span>
        </div>
        <div class="formStyle_list">
          <Label for="Type">特权等级</Label>
          <ComboBox
            v-model="MenberDialogForm.LevelList"
            :data="LevelListType"
            valueField="Id"
            textField="Name"
          ></ComboBox>
          <span class="c-red">*</span>
        </div>

        <div class="formStyle_list formStyle_img">
          <Label for="Image">特权图标</Label>
          <div for="privilegeIcon">
            <img :src="privilegeIconSrc" aspect-ratio="0.8" />
            <!-- 上传（这个按钮我设置了透明，美观一些） -->
            <!-- 切记事件触发用 @change，因为它才可以检测到文件选择是否成功了 -->
            <input
              type="file"
              id="privilegeIcon"
              class="photoFileIn my-0 py-0"
              @change="previewImg($event,1)"
              accept="image/*"
              v-show="false"
            />
          </div>
          <span class="f-r">建议图片大小为414*414像素</span>
          <!-- <TextBox inputId="Image" name="Image" v-model="MenberDialogForm.Image"></TextBox> -->
        </div>
        <div class="formStyle_list formStyle_img">
          <Label for="PublicityImg">特权宣传图</Label>
          <label for="privilegeImage">
            <img :src="privilegeImageSrc" aspect-ratio="0.8" />
            <!-- 上传（这个按钮我设置了透明，美观一些） -->
            <!-- 切记事件触发用 @change，因为它才可以检测到文件选择是否成功了 -->
            <input
              type="file"
              id="privilegeImage"
              class="photoFileIn my-0 py-0"
              @change="previewImg($event,2)"
              accept="image/*"
              v-show="false"
            />
          </label>
          <span class="f-r">建议图片大小为414*414像素</span>
          <!-- <TextBox
            inputId="PublicityImg"
            name="PublicityImg"
            v-model="MenberDialogForm.PublicityImg"
          ></TextBox>-->
        </div>
        <div class="formStyle_list formStyle_img" style="height:250px">
          <Label for="RichContent">特权说明</Label>
          <editor id="tinymce" v-model="MenberDialogForm.RichContent" :init="init"></editor>
          <!-- <TextBox inputId="RichContent" name="RichContent" v-model="MenberDialogForm.RichContent"></TextBox> -->
        </div>
        <div class="f-r mt-30">
          <LinkButton @click="$refs.MenberAddDialog.close()" class="btnCancel">取消</LinkButton>
          <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        </div>
      </Form>
    </Dialog>
    <!-- 添加 -->
    <Dialog
      ref="VouchersDialog"
      :dialogStyle="{width:'80%',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="券"
    >
      <!-- 添加券 -->
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
      <Package @package="getchildPackage"></Package>
    </Dialog>
    <!-- 红包编辑 -->
    <Dialog
      ref="MoneyEditDialog"
      :dialogStyle="{width:'550px',height:'550px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="红包编辑"
    >
      <MoneyEdit @package="getchildMoneyEdit"></MoneyEdit>
    </Dialog>
  </div>
</template>
<script>
import Vouchers from "../../components/Vouchers";
import Package from "../../components/Package";
import MoneyEdit from "../../components/MoneyEdit";
import {
  MemberPrivilegeList,
  MemberPrivilegeAdd,
  MemberPrivilegeRemove,
  MemberPrivilegeEdit,
  MemberPrivilegeEditSave,
  MemberPrivilegeQuery,
  GetEnumList
} from "@/api/members";
//引入富文本相关的文件
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
//引入工具类处理日期格式
import { parseTime } from "../../utils/index";
export default {
  data() {
    return {
      //搜索
      StartDate: new Date(),
      EndDate: new Date(),
      Name: "",
      State: 0,
      StateType: [],
      //DataGrid
      Menberlist: [],
      dialogStatus: "",
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
      LevelListType: [],
      TypeData: [],
      MenberDialogForm: {
        Name: "",
        AbbrName: "",
        Image: "",
        PublicityImg: "",
        RichContent: "",
        EndTime: "",
        State: 1,
        Type: 0
      },
      //头像和图片的默认路径
      privilegeIconSrc: "../../../static/privilegeIcon.jpg",
      privilegeImageSrc: "../../../static/privilegeImage.jpg",
      Image: {},
      PublicityImg: {},
      //头像和图片的文件
      tinymceHTML: "",
      //文本编辑框的初始化值
      init: {
        language_url: "/static/tinymce/langs/zh_CN.js", // 语言包的路径
        language: "zh_CN", //语言
        skin_url: "/static/tinymce/skins/ui/oxide", // skin路径
        height: 250, //编辑器高度
        branding: false, //是否禁用“Powered by TinyMCE”
        menubar: false //顶部菜单栏显示
      }
    };
  },
  components: {
    Package,
    Vouchers,
    Editor
  },
  methods: {
    //传值
    getchildVouchers(data) {},
    getchildPackage(data) {},
    getchildMoneyEdit(data) {},
    // 获取用户列表
    getUsers() {
      var StartDateType = parseTime(this.StartDate, "{yyyy}-{mm}-{dd}");
      var EndDateType = parseTime(this.EndDate, "{yyyy}-{mm}-{dd}");
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        Name: this.GrowthName,
        OperationDateStart: StartDateType,
        OperationDateEnd: EndDateType,
        State: this.State
      };
      console.log(para);
      MemberPrivilegeList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;
      });
    },
    //状态
    TypeMode() {
      const para = {
        EnumType: "StateEnum"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.StateType = res.Result.Data;
      });
    },
    //证件类型
    FeatureTypeMode() {
      const para = {
        EnumType: "FeatureType_Mode"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.TypeData = res.Result.Data;
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
            MemberPrivilegeRemove(para).then(res => {
              this.getUsers();
              alert(res.Result.Message + "删除成功");
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
      MemberPrivilegeEdit(para).then(res => {
        console.log(res.Result);
        this.MenberDialogForm.Name = res.Result.Data.Name;
        this.MenberDialogForm.EndTime = res.Result.Data.EndTime;
        this.MenberDialogForm.StartTime = res.Result.Data.StartTime;
        this.MenberDialogForm.Type = res.Result.Data.Type;
        this.MenberDialogForm.HowMoney = res.Result.Data.HowMoney;
        this.MenberDialogForm.Remark = res.Result.Data.Remark;
        this.MenberDialogForm.State = res.Result.Data.State;
        this.id = res.Result.Data.Id;
        this.Code = res.Result.Data.Code;
      });
    },
    saveForm(index, row) {
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            this.MenberDialogForm.Id = row.Id;
            const para = Object.assign({}, this.MenberDialogForm);
            MemberPrivilegeEditSave(para).then(res => {
              this.getUsers();
              this.$refs.MenberAddDialog.close();
              alert(res.Result.Message);
            });
          }
        }
      });
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
            const para = Object.assign({}, this.MenberDialogForm);
            console.log(para);
            MemberPrivilegeAdd(para).then(res => {
              this.getUsers();
              this.$refs.MenberAddDialog.close();
              alert(res.Result.Message);
              console.log(res.Result.Message);
            });
          }
        }
      });
    },
    //特权等级
    MemberPrivilegeQuery() {
      MemberPrivilegeQuery().then(res => {
        this.LevelListType = res.Result.Data;
      });
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      //前面datebox设置的只是显示的格式，传递给后台时还需要通过工具类对日期对象进行处理
      console.log(parseTime(this.EndDate, "{yyyy}-{mm}-{dd}"));
      this.getUsers();
    },
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
    this.getUsers();
    this.MemberPrivilegeQuery();
    this.FeatureTypeMode();
    this.TypeMode();
  }
};
</script>
<style>
.formStyle_img {
  height: 150px;
}
.formStyle_img .textbox-label {
  background-color: #fff;
  line-height: 150px;
  height: 149px;
  float: left;
}
</style>

