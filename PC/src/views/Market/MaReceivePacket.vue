  <template>
  <div class="container">
    <div style="position: relative;" class="conTop">
      <div class="TimeStyle">
        <ul class="TimeStyle_ul f-l">
          <li>昨日</li>
          <li>今日</li>
          <li>本周</li>
          <li>上周</li>
          <li>本月</li>
          <li>上月</li>
          <li>最近三月</li>
          <li>本季度</li>
          <li>本年</li>
        </ul>
        <div class="showqueryClas" @click="showquery">
          <i class="iconfont iconxiangxia2"></i>收起
        </div>
      </div>
      <p class="topTitle">扫码领红包</p>
      <LinkButton class="btnAdd radius btn-primary mr-10 appPacket" @click="btnAdd();dialogStatus ='create'">添加</LinkButton>
      <LinkButton class="btnAdd radius btn-primary mr-10 patchDownload" @click="btnNewAdd();dialogStatus ='create'">批量下载二维码</LinkButton>
      <LinkButton class="btnAdd radius btn-primary mr-10 refresh" @click="btnNewAdd();dialogStatus ='create'">刷新</LinkButton>

      <!-- 搜索 -->
      <div class="query">
        <div class="f-l">
          <DateBox format="yyyy-MM-dd" placeholder="操作日期（起）"></DateBox>
          <DateBox format="yyyy-MM-dd" placeholder="操作日期（止）"></DateBox>
          <SearchBox placeholder="活动名称" v-model="AgencySearch" @search="$refs.MoneyEditDialog.open()">
            <Addon>
              <span class="iconguanbi iconfont f-12 f-r" title="Clear value" @click="AgencySearch=''"></span>
            </Addon>
          </SearchBox>
          <ComboBox
            v-model="State"
            :data="StateType"
            valueField="Code"
            textField="Name"
            placeholder="状态"
          ></ComboBox>

        </div>
        <div style="line-height:30px" class="f-l mr-10 ml-20">
          <CheckBox inputId value="0" v-model="SeachType"></CheckBox>
          <span class="ml-5 mr-10">不显示过期</span>
        </div>
        <LinkButton class="iconfont iconsousuo btn-query btn mt-50" @click="MenberSearchTop()">查询</LinkButton>
      </div>
    </div>
    <!-- table -->
    <DataGrid :data="Menberlist" :pagination="true" class="minheight mt-50">
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
          <LinkButton class="btnState" v-if="scope.row.State=='停用'">启用</LinkButton>
          <LinkButton class="btnState" v-if="scope.row.State=='启用'">停用</LinkButton>
        </template>
      </GridColumn>
      <GridColumn field="ActivityName" title="活动名称"></GridColumn>
      <GridColumn field="ReceiveNum" title="每日限领次数"></GridColumn>
      <GridColumn field="ActivityDate" title="活动有效期"></GridColumn>
      <GridColumn field="Status" title="状态"></GridColumn>
      <GridColumn field="Operater" title="操作人"></GridColumn>
      <GridColumn field="OperateDate" title="操作日期"></GridColumn>
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
      ref="BasicData"
      title="新增红包"
      :dialogStyle="{width:'675px',height:'435px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <Form :model="MenberDialogForm" class="formStyle FormTop">
        <div class="formStyle_list">
          <Label for="Name">红包最小值</Label>
          <TextBox inputId="Name" name="Name">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="Name">红包最大值</Label>
          <TextBox inputId="Name" name="Name">
            <span class="c-red starpos">*</span>
          </TextBox>
        </div>
        <div class="formStyle_list">
          <Label for="Name">红包发放总额</Label>
          <span
            v-for="fruit in IsShareData"
            :key="fruit"
            class="mr-10"
            @click="getIsShareVal(fruit)"
          >
            <RadioButton name="group2" :inputId="fruit" :value="fruit" v-model="IsShare"></RadioButton>
            <span :for="fruit">{{fruit}}</span>
          </span>
          <TextBox inputId="Name" name="Name"></TextBox> 元
        </div>
        <div class="formStyle_list">
          <Label for="Birthday">发放日期</Label>
          <DateBox
            v-model="MenberDialogForm.StartTime"
            format="yyyy-MM-dd"
          ></DateBox><span class="mr-10 ml-10">至</span>
          <DateBox
            v-model="MenberDialogForm.EndTime"
            format="yyyy-MM-dd"
          ></DateBox>
        </div>
        <div class="f-r mt-120">
          <LinkButton @click="$refs.BasicData.close()" class="btnCancel">取消</LinkButton>
          <LinkButton v-if="dialogStatus=='create'" @click="saveForm()" class="btnConfirm">确认</LinkButton>
          <LinkButton v-else @click="saveForm()" class="btnConfirm">保存</LinkButton>
        </div>
      </Form>
    </Dialog>
    <!-- 弹框 -->
    <Dialog
      ref="MenberAddDialog"
      title="添加"
      :dialogStyle="{width:'825px',height:'500px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <ComboAddCom @sendChildData="getChildData" @sendCloseParent="closeParentModel"></ComboAddCom>
    </Dialog>
  </div>
</template>
<script>
    import {
        RoleEdit,
    } from "@/api/Service";
import ComboAddCom from "@/components/redPacketSet";
export default {
  data() {
    return {
      //搜索
      StartDate: new Date(),
      EndDate: new Date(),
      Name: "",
      State: "",
      SeachType: "",
      showquery: "",
      StateType: [],
      //DataGrid
      Menberlist: [],
      dialogStatus: "create",
      AgencySearch: "",
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
        MenberDialogForm: {
            Name: "",
            Remark: "",
            HowMoney: 0,
            Type: 0,
            StartTime: new Date(),
            EndTime: new Date(),
            State: 1
        },
        IsShare: "不限",
        IsShareData: ["不限", "自定义金额数"],
    };
  },
  components: { ComboAddCom },
  methods: {
      //添加
      btnAdd() {
          this.$refs.MenberAddDialog.open();
      },
      getChildData(data){
          if(data){
              this.$refs.BasicData.open();
          }
      },
      closeParentModel(data){
          if(data){
              this.$refs.MenberAddDialog.close();
          }
      },
      //新增
      btnNewAdd() {
          this.$refs.BasicData.open();
      },
      //红包发放总额
      getIsShareVal(data) {
          console.log(data);
      },
      saveForm(index, row) {
          this.$refs.BasicData.close();
      },
      onPageChange(event) {
          this.pageNumber = event.pageNumber;
          this.pageSize = event.pageSize;
      },
      // 获取红包记录
      redPcketList() {
          this.Menberlist=[
              {"Id":2,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
              {"Id":3,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
              {"Id":4,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
              {"Id":5,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
              {"Id":6,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
              {"Id":7,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
              {"Id":8,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
              {"Id":9,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
              {"Id":10,"ActivityName":"北京天安门5日行","ReceiveNum":"2","ActivityDate":"2020-12-12","Status":"启用","Operater":"李光辉","OperateDate":"2020-10-12"},
          ];
      },
      //编辑
      handleEdit(index, row) {
          this.dialogStatus = "update";
          const para = { Id: row.Id };
          console.log(para);
          RoleEdit(para).then(res => {
              console.log(res.Result);
              this.Name = res.Result.Role.DisplayName;
              this.Code = res.Result.Role.Code;
              this.Description = res.Result.Role.Description;
              this.RoleEditVal = res.Result.GrantedPermissionNames;
              this.id = res.Result.Role.Id;
              console.log(this.RoleEditVal)
          });
      },
  },
  mounted() {
      this.redPcketList();
  }
};
</script>
<style scoped>
.f-field {
  margin-bottom: 10px;
}
.btn-query {
  margin-top: -10px;
}
  .mt-50{margin-top: 2px;}
.TimeStyle {
  width: auto;
  overflow: hidden;
  float: left;
  width: 48%;
  line-height: 44px;
}

.TimeStyle_ul li {
  width: auto;
  padding: 0 10px;
  float: left;
  font-size: 14px;
}
.TimeStyle_ul li:hover {
  color: #0579c9;
}
.TimeStyle_ul li:active {
  color: #0579c9;
}
.showqueryClas {
  width: 58px;
  line-height: 26px;
  margin-top: 10px;
  text-align: center;
  background: rgba(91, 161, 231, 1);
  float: left;
  border-radius: 3px;
  color: #fff;
}
.topTitle {
  text-align: left;
  font-size: 18px;
  line-height: 43px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e2e2e2;
}
.btnAdd{right: 82px;}
  .appPacket{right:312px;}
  .patchDownload{right: 152px;width: 150px;}
  .refresh{right:80px;}
</style>
