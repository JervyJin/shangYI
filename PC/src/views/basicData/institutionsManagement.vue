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
        <ComboBox
          inputId
          v-model="formatsName"
          :data="formatsData"
          textField="Name"
          valueField="Id"
          placeholder
        >
          <span class="query_title">业态</span>
        </ComboBox>
        <TextBox inputId v-model="SearchBox" placeholder>
          <span class="query_title">编码/名称</span>
          <Addon>
            <span
              v-if="SearchBox"
              class="textbox-icon icon-clear"
              title="Clear value"
              @click="SearchBox=null"
            ></span>
          </Addon>
        </TextBox>
        <ComboBox
          v-model="State"
          :data="StateTypeData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">状态</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="onSearch()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <p class="pstyle">
      <LinkButton
        class="btnAdd btn-primary radius iconfont iconadd f-16"
        @click="$refs.BasicData.open();dialogStatus ='create';BasicDataForm={}"
      >添加</LinkButton>
      <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
      <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
      <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
    </p>
    <DataGrid
      :data="BasicDatalist"
      :pagination="true"
      id="grid"
      :style="'height:' + gridHeight + 'px;'"
      :columnResizing="true"
      :lazy="true"
      :pageNumber="pageNumber"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange($event)"
    >
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50" title="序号">
        <template slot="body" slot-scope="scope">{{scope.rowIndex + 1}}</template>
      </GridColumn>
      <GridColumn align="center" title="操作" field="custome-adv" width="100">
        <template slot="body" slot-scope="scope">
          <LinkButton
            class="btnEdit"
            @click="$refs.BasicData.open();handleEdit(scope.$index, scope.row)"
          >编辑</LinkButton>
          <LinkButton
            class="btnState"
            @click="disableBtn(scope.$index, scope.row)"
            v-if="scope.row.State=='停用'"
          >启用</LinkButton>
          <LinkButton
            class="btnState"
            @click="disableBtn(scope.$index, scope.row)"
            v-if="scope.row.State=='启用'"
          >停用</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="Code" title="机构编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Code}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Name" title="机构名称" align="center" width="150">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Name}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Type" title="机构类型" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Type}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Contacts" title="联系人" align="center" width="100">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Contacts}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Phone" title="电话" width="100" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.Phone}}</div>
        </template>
      </GridColumn>
      <GridColumn field="BusinessformatName" title="所属业态" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.BusinessformatName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="MaterialSchemeName" title="基础资料方案" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.MaterialSchemeName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="Address" title="地址" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.Address}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorName" title="最后修改人" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.LastUpdatorName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="LastUpdatorTime" title="最后修改时间" width="180px" align="center">
         <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.LastUpdatorTime}}</div>
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
      ref="BasicData"
      title="机构"
      :dialogStyle="{width:'460px',height:'560px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="BasicDataForm" class="formStyle formTop" ref="formvalidate" :rules="rules" @validate="errors=$event">
        <div class="form_box">
          <div class="formStyle_list">
            <Label for="AreaId">机构区域</Label>
            <ComboBox
              placeholder="机构区域"
              v-model="BasicDataForm.AreaId"
              :data="AreaIdData"
              valueField="Id"
              textField="Name"
              class="pr-20"
              name="AreaId"
              v-Tooltip="getTipOpts('AreaId')"
            >
              <span class="c-red starpos">*</span>
            </ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="Code">机构编码</Label>
            <TextBox inputId="Code" name="Code" v-model="BasicDataForm.Code" placeholder="机构编码" v-Tooltip="getTipOpts('Code')">
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Name">机构名称</Label>
            <TextBox inputId="Name" name="Name" v-model="BasicDataForm.Name" placeholder="机构名称" v-Tooltip="getTipOpts('Name')">
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="formats">业态</Label>
            <ComboBox
              placeholder="业态"
              v-model="BasicDataForm.BusinessformatId"
              :data="formatsData"
              valueField="Id"
              textField="Name"
              class="pr-20"
              @selectionChange="formatsChange"
              name="BusinessformatId"
              v-Tooltip="getTipOpts('BusinessformatId')"
            >
              <span class="c-red starpos">*</span>
            </ComboBox>
          </div>
          <div class="formStyle_list">
            <Label for="institutions">基础资料方案</Label>
            <ComboBox
              inputId="MaterialSchemeId"
              v-model="BasicDataForm.MaterialSchemeId"
              :data="MaterialSchemeIdData"
              valueField="Id"
              textField="Name"
              class="pr-20"
              name="MaterialSchemeId"
              v-Tooltip="getTipOpts('MaterialSchemeId')"
            >
              <span class="c-red starpos">*</span>
            </ComboBox>
          </div>

          <div class="formStyle_list">
            <Label for="Type">机构类型</Label>
            <ComboBox
              inputId="c1"
              v-model="BasicDataForm.Type"
              :data="TypeData"
              valueField="Code"
              textField="Name"
              placeholder="机构类型"
              class="pr-20"
              name="Type"
              v-Tooltip="getTipOpts('Type')"
            >
              <span class="c-red starpos">*</span>
            </ComboBox>
          </div>

          <div class="formStyle_list">
            <Label for="Contacts">联系人</Label>
            <TextBox inputId="Contacts" name="Contacts" v-model="BasicDataForm.Contacts" v-Tooltip="getTipOpts('Contacts')">
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Phone">电话</Label>
            <TextBox inputId="Phone" name="Phone" v-model="BasicDataForm.Phone" v-Tooltip="getTipOpts('Phone')">
              <span class="c-red starpos">*</span>
            </TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Address">地址</Label>
            <TextBox inputId="Address" name="Address" v-model="BasicDataForm.Address" v-Tooltip="getTipOpts('Address')"><span class="c-red starpos">*</span></TextBox>
          </div>
          <div class="formStyle_list">
            <Label for="Remark">备注</Label>
            <TextBox inputId="Remark" name="Remark" v-model="BasicDataForm.Remark"></TextBox>
          </div>
        </div>
          <!-- <div class="f-r mt-30">
            <LinkButton @click="$refs.BasicData.close()" class="btnCancel btn">取消</LinkButton>
            <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm btn">确认</LinkButton>
            <LinkButton v-else @click="saveForm()" class="btnConfirm btn">保存</LinkButton>
          </div> -->
      </Form>


      <template v-slot:footer>
        <LinkButton v-if="dialogStatus=='create'" @click="submitForm()" class="btnConfirm">确认</LinkButton>
        <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        <LinkButton @click="$refs.BasicData.close()" class="btnCancel">取消</LinkButton>
      </template>
    </Dialog>
    <!-- 上级分组 -->
    <Dialog
      ref="publicDialog"
      :dialogStyle="{width:'550px',height:'580px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
      title="机构"
    >
      <institutionsData @childValue="getchildValue"></institutionsData>
    </Dialog>
  </div>
</template>
<script>
import InstitutionsData from "@/components/grouping";
import {
  OrganizationList,
  OrganizationRemove,
  OrganizationEdit,
  OrganizationAdd,
  OrganizationSearch,
  OrganizationEditSave,
  FormatData,
  GetEnumList,
  Organization,
  GetListMaterialScheme,
  UpdateStateOrg
} from "@/api/Service";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      gridHeight: false,
      State: 1,
      formatsName: "",
      //DataGrid
      StateTypeData: [],
      BasicDatalist: [],
      dialogStatus: "",
      custome: "",
      number: "",
      Serial: "",
      //分页
      SearchBox: "",
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
      formatsData: [],
      Organization: [],
      AreaIdData: [],
      MaterialSchemeIdData: [],
      TypeData: [],
      BasicDataForm: {
        Code: "",
        Name: "",
        AreaId: null,
        AreaIdRealation: "",
        AreaNameRealation: "",
        BusinessformatId: "",
        BusinessformatCode: "",
        BusinessformatName: "",
        MaterialSchemeId: "",
        MaterialSchemeCode: "",
        MaterialSchemeName: "",
        Type: "",
        Contacts: "",
        Phone: "",
        Lon: 0,
        Lat: 0,
        Geohash: "",
        ProvinceCode: "",
        CityCode: "",
        RegionCode: "",
        CityName: "",
        Address: "",
        Remark: "",
        State: 0,
        Image: ""
      },
      rules: {
        AreaId: "required",
        Code: "required",
        Name: "required",
        BusinessformatId: "required",
        MaterialSchemeId: "required",
        Type: "required",
        Contacts: "required",
        Phone: "required",
        Address: "required",
      },
      errors: {},
    };
  },
  components: {
    InstitutionsData
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
    //传值
    getchildValue(data) {
      console.log(data);
      this.$refs.publicDialog.close();
      this.BasicDataForm.ParentName = data.text;
      this.BasicDataForm.ParentId = data.id;
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
        CodeOrName: this.SearchBox,
        BusinessformatId: this.formatsName,
        State: this.State
      };
      console.log(para);
      OrganizationList(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.BasicDatalist = res.Result.Rows;
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
            OrganizationRemove(para).then(res => {
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
      this.formatsChange();
      this.dialogStatus = "update";
      const para = { Id: row.Id };
      console.log(para);
      OrganizationEdit(para).then(res => {
        console.log("编辑", res.Result);
        this.formatsChange();
        this.BasicDataForm = {
          Id: res.Result.Data.Id,
          Code: res.Result.Data.Code,
          Name: res.Result.Data.Name,
          AreaId: res.Result.Data.AreaId,
          AreaIdRealation: res.Result.Data.AreaIdRealation,
          AreaNameRealation: res.Result.Data.AreaNameRealation,
          BusinessformatId: res.Result.Data.BusinessformatId,
          BusinessformatCode: res.Result.Data.BusinessformatCode,
          BusinessformatName: res.Result.Data.BusinessformatName,
          MaterialSchemeId: res.Result.Data.MaterialSchemeId,
          MaterialSchemeCode: res.Result.Data.MaterialSchemeCode,
          MaterialSchemeName: res.Result.Data.MaterialSchemeName,
          Type: res.Result.Data.Type,
          Contacts: res.Result.Data.Contacts,
          Phone: res.Result.Data.Phone,
          Lon: res.Result.Data.Lon,
          Lat: res.Result.Data.Lat,
          Geohash: res.Result.Data.Geohash,
          ProvinceCode: res.Result.Data.ProvinceCode,
          CityCode: res.Result.Data.CityCode,
          RegionCode: res.Result.Data.RegionCode,
          CityName: res.Result.Data.CityName,
          Address: res.Result.Data.Address,
          Remark: res.Result.Data.Remark,
          State: res.Result.Data.State,
          Image: res.Result.Data.Image
        };
        if (this.BasicDataForm.State == "启用") {
          this.BasicDataForm.State = 1;
        } else {
          this.BasicDataForm.State = 0;
        }
        if (this.BasicDataForm.Type == "直营店") {
          this.BasicDataForm.Type = 0;
        } else {
          this.BasicDataForm.Type = 1;
        }
      });
    },
    saveForm: function(index, row) {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
        } else {
            this.saveFormFn();
        }   
      });  
    },
    saveFormFn(index, row) {
      var obj = this.findObjectFromArray(
        this.formatsData,
        "Id",
        this.BasicDataForm.BusinessformatId
      );
      var Arr = this.findObjectFromArray(
        this.AreaIdData,
        "Id",
        this.BasicDataForm.AreaId
      );
      this.$messager.alert({
        title: "提示",
        msg: "确认编辑保存吗？",
        result: r => {
          if (r) {
            const para1 = {
              BusinessformatCode: obj.Code,
              BusinessformatName: obj.Name,
              AreaIdRealation: Arr.Code,
              AreaNameRealation: Arr.Name
            };
            const para = Object.assign({}, this.BasicDataForm, para1);
            console.log(para);
            OrganizationEditSave(para).then(res => {
              this.getUsers();
              this.$refs.BasicData.close();
              this.$messager.alert({
                title: "提示",
                msg: res.Result.Message
              });
            });
          }
        }
      });
    },
    submitForm: function() {
      this.$refs.formvalidate.validate(valid => {
        console.log(valid);
        if(valid){
          this.$messager.alert({
            title: "提示",
            msg: "必输项不正确"
          });
        } else {
            this.submitFormFn();
        }   
      });  
    },
    //添加
    submitFormFn: function() {
      var obj = this.findObjectFromArray(
        this.formatsData,
        "Id",
        this.BasicDataForm.BusinessformatId
      );
      var Arr = this.findObjectFromArray(
        this.AreaIdData,
        "Id",
        this.BasicDataForm.AreaId
      );
      var Arr2 = this.findObjectFromArray(
        this.MaterialSchemeIdData,
        "Id",
        this.BasicDataForm.MaterialSchemeId
      );
      this.$messager.alert({
        title: "提示",
        msg: "确认提交吗？",
        result: r => {
          if (r) {
            const para1 = {
              BusinessformatCode: obj.Code,
              BusinessformatName: obj.Name,
              AreaIdRealation: Arr.Code,
              AreaNameRealation: Arr.Name,
              MaterialSchemeName: Arr2.Name,
              MaterialSchemeCode: Arr2.Code
            };
            const para = Object.assign({}, this.BasicDataForm, para1);
            console.log(para);
            OrganizationAdd(para).then(res => {
              this.getUsers();
              this.$refs.BasicData.close();
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
    //业态
    formatsList() {
      FormatData().then(res => {
        console.log(res.Result);
        this.formatsData = res.Result.Data;
        console.log(this.formatsData);
      });
    },
    //机构区域
    OrganizationList() {
      Organization().then(res => {
        console.log(res.Result);
        this.AreaIdData = res.Result.Data;
        console.log(this.AreaIdData);
      });
    },
    //TypeData
    TypeDataList() {
      const para = {
        EnumType: "Organization_Type"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.TypeData = res.Result.Data;
        console.log(this.TypeData);
      });
    },
    //在数组冲查询出来一个对象,这样可以了
    findObjectFromArray(arr, key, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) {
          return arr[i];
        }
      }
    },
    // 头部搜索
    onSearch(index, row) {
      this.getUsers();
    },
    //业态基础方案
    formatsChange() {
      this.BasicDataForm.MaterialSchemeId = "";
      FormatData().then(res => {
        console.log(res.Result);
        if (res.Result && res.Result.Data && res.Result.Data.length>0) {
          this.formatsData = res.Result.Data;
        } else {
          this.formatsData = [];
        }

        if (
          this.BasicDataForm.BusinessformatId != "" &&
          this.BasicDataForm.BusinessformatId != null
        ) {
          const para = {
            BusinessformatId: this.BasicDataForm.BusinessformatId
          };
          console.log("业态id", para);
          GetListMaterialScheme(para).then(res => {
            console.log(res.Result.Data);
            this.MaterialSchemeIdData = res.Result.Data;
          });
        } else {
          this.MaterialSchemeIdData = [];
        }
        console.log(this.MaterialSchemeIdData);
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
    //启用
    disableBtn(index, row) {
      console.log(row);
      if (row.State == "启用") {
        this.StateAll = 0;
      } else {
        this.StateAll = 1;
      }
      const para = {
        Id: row.Id,
        State: this.StateAll
      };
      console.log(para);
      UpdateStateOrg(para).then(res => {
        console.log(res.Result);
        this.getUsers();
      });
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
    }
  },
  mounted() {
    this.TypeMode();
    this.getUsers();
    this.TypeDataList();
    this.formatsList();
    this.OrganizationList();
    this.gridHeight = this.resizeTable();
  }
};
</script>
<style scoped>
</style>

