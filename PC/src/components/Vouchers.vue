<template>
  <!-- 选择券 -->
  <div class="container pd-10">
    <!-- 搜索 -->
    <div class="query">
      <TextBox v-model="CouponName" placeholder>
        <span class="query_title">券名称</span>
        <Addon>
          <span
            v-if="CouponName"
            class="textbox-icon icon-clear"
            title="Clear value"
            @click="CouponName=null"
          ></span>
        </Addon>
      </TextBox>
      <TextBox v-model="CouponCode" placeholder>
        <span class="query_title">券编码</span>
        <Addon>
          <span
            v-if="CouponCode"
            class="textbox-icon icon-clear"
            title="Clear value"
            @click="CouponCode=null"
          ></span>
        </Addon>
      </TextBox>
      <ComboBox v-model="State" :data="StateType" valueField="Code" textField="Name">
        <span class="query_title">状态</span>
      </ComboBox>
      <LinkButton class="iconfont iconsousuo btn-query" @click="MenberSearchTop()">搜索</LinkButton>
    </div>
    <!-- table -->
    <DataGrid
      :data="Menberlist"
      :pagination="true"
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
      <GridColumn align="center" type="index" cellCss="datagrid-td-rownumber" width="50">
        <template slot="body" slot-scope="scope">
          <!-- <RadioButton
            :inputId="scope.row.Id"
            :value="scope.row.Id"
            v-model="MenberlistId"
            v-if="parentMultiselect"
          ></RadioButton>
          <CheckBox
            :inputId="scope.row.CouponId"
            :value="scope.row.CouponId"
            :multiple="true"
            v-model="MenberlistId"
            v-else
          ></CheckBox>-->
          <div @click="checkVoucher(scope.row)">
            <CheckBox
              :inputId="scope.row.CouponCode"
              :value="scope.row.CouponCode"
              :multiple="false"
              v-model="scope.row.checkState"
            ></CheckBox>
          </div>
        </template>
      </GridColumn>
      <GridColumn field="CouponCode" title="券编码" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.CouponCode}}</div>
        </template>
      </GridColumn>
      <GridColumn field="CouponName" title="券名称" width="250" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.CouponName}}</div>
        </template>
      </GridColumn>
      <GridColumn field="DiscountAmount" title="抵扣金额/折扣" width="100" align="center">
        <template slot="body" slot-scope="scope">
          <div align="right">{{scope.row.DiscountAmount}}</div>
        </template>
      </GridColumn>
      <GridColumn field="UseType" title="券类型" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.UseType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="ApplicableType" title="适用类型" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.ApplicableType}}</div>
        </template>
      </GridColumn>
      <GridColumn field="EffectExpireDays" title="有效期" align="center" width="180">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.EffectExpireDays}}</div>
        </template>
      </GridColumn>
      <GridColumn field="State" title="状态" align="center">
        <template slot="body" slot-scope="scope">
          <div align="left">{{scope.row.State}}</div>
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
    <div class="btnstyle">
      <LinkButton @click="showParentComp" class="btnConfirm btn radius">确定</LinkButton>
    </div>
  </div>
</template>
<script>
import { MemberGetCouponAward, GetEnumList } from "@/api/members";
export default {
  props: {
    parentMultiselect: "",
    choseCouponList: ""
  },
  data() {
    return {
      CouponName: "",
      CouponCode: "",
      State: 1,
      MenberlistId: [],
      MenberlistIdCopy: [],
      StateType: [],
      //DataGrid
      Menberlist: [],
      MenberlistCopy: [],
      datalist: [],
      chosedatalist: [],
      //分页
      total: 0,
      pageSize: 10,
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
      ]
    };
  },
  methods: {
    checkVoucher(vo) {
      console.log(vo);
      //console.log(JSON.stringify(this.Menberlist));
      if (this.MenberlistId.indexOf(vo.CouponCode) != -1) {
        console.log(3333);
        //this.MenberlistId 数组中已经存在该元素。
        //this.MenberlistId.$remove(vo.CouponCode);
        this.removefn(this.MenberlistId, vo.CouponCode);
      } else {
        this.MenberlistId.push(vo.CouponCode);
      }
      return !vo.check;
    },
    removefn(arr, user) {
      var index = arr.indexOf(user);
      if (index > -1) return arr.splice(index, 1);
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
    checkedNodes(event) {
      console.log(event);
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      console.log(this.MenberlistId);
      //this.MenberlistId = [];
      this.getUsers();
    },
    // 获取用户列表
    getUsers() {
      const para = {
        page: this.pageNumber,
        rows: this.pageSize,
        CouponName: this.CouponName,
        CouponCode: this.CouponCode,
        State: this.State
      };
      if (this.MenberlistCopy && this.MenberlistCopy.length > 0) {
        //目的只是为了MenberlistCopy数组内不存入重复数据
        this.MenberlistCopy.map(item => {
          this.MenberlistIdCopy.push(item.CouponCode);
        });
      }
      MemberGetCouponAward(para).then(res => {
        console.log(res.Result);
        this.total = res.Result.Total;
        this.Menberlist = res.Result.Rows;

        console.log(this.choseCouponList);
        if (this.Menberlist && this.Menberlist.length > 0) {
          this.Menberlist.map(item => {
            if (this.MenberlistIdCopy.indexOf(item.CouponCode) == -1) {
              //不存在
              this.MenberlistCopy.push(item);
            }
          });
          this.Menberlist.map(item => {
            if (this.MenberlistId.indexOf(item.CouponCode) != -1) {
              item.checkState = true;
            }
          });
          this.MenberlistCopy.map(item => {
            if (this.MenberlistId.indexOf(item.CouponCode) != -1) {
              item.checkState = true;
            }
          });
        }
      });
    },
    // 头部搜索
    MenberSearchTop(index, row) {
      this.getUsers();
    },
    showParentComp() {
      console.log(this.MenberlistId);
      console.log(JSON.stringify(this.MenberlistCopy));
      //return;
      if (this.MenberlistId && this.MenberlistId.length == 0) {
        this.$emit("vouchers", 1); //未选中数据
      }
      if (this.MenberlistId && this.MenberlistId.length > 0) {
        //已选中数据
        var choseDataList = [];
        if (this.MenberlistCopy && this.MenberlistCopy.length) {
          this.MenberlistCopy.map(item => {
            if (this.MenberlistId.indexOf(item.CouponCode) != -1) {
              choseDataList.push(item);
            }
          });
        }
        console.log(choseDataList);
        this.$emit("vouchers", choseDataList);
      }
      // this.$emit(
      //   "vouchers",
      //   this.getsubListFormList(this.Menberlist, this.MenberlistId, "CouponId")
      // );
    },
    getsubListFormList(srcList, valueList, field) {
      if (
        !srcList ||
        srcList.length == 0 ||
        !valueList ||
        valueList.length == 0
      ) {
        return [];
      }
      if (this.parentMultiselect) {
        valueList = valueList.split();
      }
      var result = [];
      for (var j = 0; j < valueList.length; j++) {
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
    }
  },
  created() {
    this.MenberlistId = [];
    if (this.choseCouponList && this.choseCouponList.length > 0) {
      //目的只是为了MenberlistCopy数组内不存入重复数据
      this.choseCouponList.map(item => {
        this.MenberlistId.push(item.CouponCode);
      });
    }
  },
  mounted() {
    this.getUsers();
    this.TypeMode();
  }
};
</script>
<style  scoped>
.btnstyle {
  margin-top: 10px;
  float: right;
  margin-right: 10px;
}
</style>

