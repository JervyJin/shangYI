<template>
  <div class="container Analysis">
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
        <p class="f-r">保存筛选条件</p>
        <p class="f-r">使用历史条件</p>
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-if="ToggleStyle">
        <div style="line-height:30px" class="f-l mr-10">
          <CheckBox inputId value="0" v-model="SeachType"></CheckBox>
          <span class="ml-5 mr-10">按月展示</span>
        </div>
        <div class="f-l ml-10">
          <DateBox format="yyyy-MM-dd" placeholder v-model="StartDate">
            <span class="query_title">日期(起)</span>
          </DateBox>
        </div>
        <div class="f-l ml-10">
          <DateBox format="yyyy-MM-dd" placeholder v-model="EndDate">
            <span class="query_title">日期(止)</span>
          </DateBox>
        </div>
        <div class="f-l ml-10 mr-10">
          <ComboBox
            v-model="Dimension"
            :data="DimensionData"
            valueField="Code"
            textField="Name"
            placeholder
          >
            <span class="query_title">分析维度</span>
          </ComboBox>
        </div>
        <div class="f-l mr-10">
          <SearchBox
            placeholder
            v-if="this.Dimension==1"
            v-model="CasherName"
            :value="CasherId"
            @search="$refs.CasherIdDialog.open()"
          >
            <span class="query_title">导购</span>
            <Addon>
              <span
                v-if="CasherName"
                class="textbox-icon icon-clear f-12 f-r"
                title="Clear value"
                @click="CasherName=null;CasherId=null"
              ></span>
            </Addon>
          </SearchBox>
        </div>

        <div v-if="this.Dimension==2" class="f-l mr-10">
          <ComboBox
            v-model="NameOrCode"
            :data="NameOrCodeData"
            valueField="Id"
            textField="Name"
            placeholder
          >
            <span class="query_title">门店</span>
          </ComboBox>
          <!-- <ComboTree
          v-model="NameOrCode"
          :data="NameOrCodeData"
          placeholder="门店"
          valueField="Id"
          textField="Name"
        >
          <Tree slot="tree">
            <template slot-scope="scope">
              <span>{{scope.node.Name}}</span>
            </template>
          </Tree>
          </ComboTree>-->
        </div>
        <LinkButton class="iconfont iconsousuo btn-query" @click="MenberSearchTop()">搜索</LinkButton>
      </div>
    </div>
    <!-- table -->
    <div id="grid">
      <Tabs class="Tabsstyle bordertop" :selectedIndex="selectedIndex" ref="tab">
        <TabPanel :title="'全局分析'">
          <p class="pstyle">
            <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
            <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
            <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
            <span class="c-red">【此功能如果字段说明没有特别举例说明撤销的金额，统计的金额都只统计正常消费的金额，撤销金额不统计】</span>
          </p>
          <DataGrid
            :data="Menberlist"
            :pagination="true"
            :style="'height:' + gridHeight + 'px;'"
            :columnResizing="true"
            :lazy="true"
            :pageNumber="pageNumber"
            :total="total"
            :pageSize="pageSize"
            @pageChange="pageChange($event)"
          >
            <GridColumnGroup>
              <GridHeaderRow>
                <GridColumn
                  :rowspan="2"
                  field="CurrentMemberNum"
                  title="当前会员数"
                  align="center"
                  width="100"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.CurrentMemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="MemberNum" title="会员数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  align="center"
                  field="Member90WithNoShoppingNum"
                  title="90天未消费会员"
                  width="130"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.Member90WithNoShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  align="center"
                  field="Member180WithNoShoppingNum"
                  title="180天未消费会员"
                  width="130"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.Member180WithNoShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn :colspan="7" title="消费" align="center"></GridColumn>
                <GridColumn :colspan="6" title="复购" align="center"></GridColumn>
              </GridHeaderRow>
              <GridHeaderRow>
                <GridColumn field="ShoppingNum" title="到店消费人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="MemberAllAmount" title="到店消费金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberAllAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="MemberShoppingTimes" title="到店消费客次数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberShoppingTimes}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="UnitPrice" title="到店消费客单价" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.UnitPrice}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="AveragePrice" title="到店消费客均价" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.AveragePrice}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="Top20ShoppingNum" title="20%优质会员消费人数" width="150" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.Top20ShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  field="Top20ShoppingAmount"
                  title="20%优质会员消费金额"
                  width="150"
                  align="center"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.Top20ShoppingAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="OnceShoppingNum" title="一购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.OnceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="OnceShoppingAmount" title="一购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.OnceShoppingAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="TwiceShoppingNum" title="二购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.TwiceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="TwiceShoppingAmount" title="二购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.TwiceShoppingAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ThriceShoppingNum" title="三购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ThriceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ThriceShoppingAmount" title="三购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ThriceShoppingAmount}}</div>
                  </template>
                </GridColumn>
              </GridHeaderRow>
            </GridColumnGroup>
          </DataGrid>
        </TabPanel>

        <TabPanel :title="'注册所属导购分析'">
          <p class="pstyle">
            <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
            <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
            <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
            <span class="c-red">【此功能如果字段说明没有特别举例说明撤销的金额，统计的金额都只统计正常消费的金额，撤销金额不统计】</span>
          </p>
          <DataGrid
            :data="MenberlistShoppers"
            :pagination="true"
            :style="'height:' + gridHeight + 'px;'"
            :columnResizing="true"
            :lazy="true"
            :pageNumber="pageNumber"
            :total="total"
            :pageSize="pageSize"
            @pageChange="pageChange($event)"
          >
            <GridColumnGroup>
              <GridHeaderRow>
                <GridColumn :rowspan="2" field="YearMonth" title="月份" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.YearMonth}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="CurrentMemberNum"
                  title="当前会员数"
                  align="center"
                  width="100"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.CurrentMemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="MemberNum" title="会员数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="OriginUserCode"
                  title="所属导购编码"
                  align="center"
                  width="100"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.OriginUserCode}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="OriginUserName"
                  title="所属导购名称"
                  align="center"
                  width="100"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.OriginUserName}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="UserOrganizationCode"
                  title="导购所属门店编码"
                  align="center"
                  width="130"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.UserOrganizationCode}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="UserOrganizationName"
                  title="导购所属门店名称"
                  align="center"
                  width="130"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.UserOrganizationName}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="Member90WithNoShoppingNum"
                  title="90天未消费会员数"
                  width="130"
                  align="center"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.Member90WithNoShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="Member180WithNoShoppingNum"
                  title="180天未消费会员数"
                  width="130"
                  align="center"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.Member180WithNoShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn :colspan="5" title="消费" align="center"></GridColumn>
                <GridColumn :colspan="6" title="复购" align="center"></GridColumn>
              </GridHeaderRow>
              <GridHeaderRow>
                <GridColumn field="ShoppingNum" title="名下会员到店消费人数" width="150" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="MemberAllAmount" title="名下会员到店消费金额" width="150" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberAllAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  field="MemberShoppingTimes"
                  title="名下会员到店消费次数"
                  width="150"
                  align="center"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberShoppingTimes}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="UnitPrice" title="到店消费客单价" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.UnitPrice}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="AveragePrice" title="到店消费客均价" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.AveragePrice}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="OnceShoppingNum" title="一购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.OnceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="OnceShoppingAmount" title="一购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.OnceShoppingAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="TwiceShoppingNum" title="二购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.TwiceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="TwiceShoppingAmount" title="二购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.TwiceShoppingAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ThriceShoppingNum" title="三购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ThriceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ThriceShoppingAmount" title="三购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ThriceShoppingAmount}}</div>
                  </template>
                </GridColumn>
              </GridHeaderRow>
            </GridColumnGroup>>
          </DataGrid>
        </TabPanel>
        <TabPanel :title="'注册门店分析'">
          <p class="pstyle">
            <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
            <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
            <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
            <span class="c-red">【此功能如果字段说明没有特别举例说明撤销的金额，统计的金额都只统计正常消费的金额，撤销金额不统计】</span>
          </p>
          <DataGrid
            :data="MenberlistStores"
            :pagination="true"
            :style="'height:' + gridHeight + 'px;'"
            :columnResizing="true"
            :lazy="true"
            :pageNumber="pageNumber"
            :total="total"
            :pageSize="pageSize"
            @pageChange="pageChange($event)"
          >
            <GridColumnGroup>
              <GridHeaderRow>
                <GridColumn
                  :rowspan="2"
                  field="OrgOrganizationCode"
                  title="门店编码 "
                  align="center"
                  width="100"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.OrgOrganizationCode}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="OrgOrganizationName"
                  title="门店名称 "
                  align="center"
                  width="100"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.OrgOrganizationName}}</div>
                  </template>
                </GridColumn>
                <GridColumn
                  :rowspan="2"
                  field="CurrentMemberNum"
                  title="当前会员数"
                  align="center"
                  width="100"
                >
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.CurrentMemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="MemberNum" title="会员数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="YearMonth" title="年月" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.YearMonth}}</div>
                  </template>
                </GridColumn>
                <GridColumn :colspan="5" title="消费" align="center"></GridColumn>
                <GridColumn :colspan="6" title="复购" align="center"></GridColumn>
              </GridHeaderRow>
              <GridHeaderRow>
                <GridColumn field="ShoppingNum" title="到店消费人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="MemberAllAmount" title="到店消费金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberAllAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="MemberShoppingTimes" title="到店消费人次" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.MemberShoppingTimes}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="UnitPrice" title="到店消费客单价" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.UnitPrice}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="AveragePrice" title="到店消费客均价" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.AveragePrice}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="OnceShoppingNum" title="一购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.OnceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="OnceShoppingAmount" title="一购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.OnceShoppingAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="TwiceShoppingNum" title="二购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.TwiceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="TwiceShoppingAmount" title="二购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.TwiceShoppingAmount}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ThriceShoppingNum" title="三购人数" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ThriceShoppingNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ThriceShoppingAmount" title="三购金额" align="center" width="100">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ThriceShoppingAmount}}</div>
                  </template>
                </GridColumn>
              </GridHeaderRow>
            </GridColumnGroup>
          </DataGrid>
        </TabPanel>
      </Tabs>
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
    <!-- 收银员 CasherIdDialog-->
    <Dialog
      ref="CasherIdDialog"
      title="收银员"
      :dialogStyle="{width:'740px',height:'450px'}"
      bodyCls="f-column"
      :modal="true"
      :draggable="true"
      :resizable="true"
      :closed="true"
    >
      <CasherList @childCasher="childCasherVal"></CasherList>
    </Dialog>
  </div>
</template>
<script>
import { parseTime } from "@/utils/index";
import CasherList from "@/components/CasherList";
import {
  GetMemberData,
  MemberDataByUser,
  MemberDataByOrg,
  GetEnumList,
  GetOrgByUser
} from "@/api/Report";
import dayjs from "dayjs";
export default {
  data() {
    return {
      ToggleStyle: true,
      iconxiangshang1: false,
      iconxiangxia1: true,
      //搜索
      gridHeight: false,
      StartDate: dayjs().toDate(),
      EndDate: dayjs().toDate(),
      Dimension: 0,
      CasherName: "",
      CasherId: "",
      NameOrCode: "",
      NameOrCodeData: null,
      ShoppersData: [],
      DimensionData: [],
      Menberlist: [],
      MenberlistStores: [],
      MenberlistShoppers: [],
      Storesvalasd: false,
      Storesvalqwe: false,
      selectedIndex: 0,
      SeachType: false,
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
      ]
    };
  },
  components: { CasherList },
  methods: {
    queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1 = !this.iconxiangshang1;
      this.iconxiangxia1 = !this.iconxiangxia1;
      let that = this;
      setTimeout(function() {
        that.gridHeight = that.resizeTable()-90;
      }, 0);
    },
    //员工传值
    childCasherVal(data) {
      console.log(data);
      this.$refs.CasherIdDialog.close();
      this.CasherName = data.UserName;
      this.CasherId = data.Id;
      console.log(data.Id);
    },
    pageChange(event) {
      this.pageNumber = event.pageNumber;
      this.pageSize = event.pageSize;
      this.MenberSearchTop();
    },
    //
    MenberSearchTop() {
      this.$refs.tab.select(this.Dimension);
      const para = {
        StartDate: dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00",
        EndDate: dayjs(this.EndDate).format("YYYY-MM-DD") + " 23:59:59",
        page: this.pageNumber,
        rows: this.pageSize,
        SeachType: this.SeachType
      };
      if (this.Dimension == 0) {
        this.$refs.tab.select(0);
        //全局
        console.log(para);
        GetMemberData(para).then(res => {
          console.log(res.Result);
          this.total = res.Result.Total;
          this.Menberlist = res.Result.Rows;
        });
        console.log(this.selectedIndex);
      }
      if (this.Dimension == 1) {
        this.$refs.tab.select(1);
        //导购
        if (this.CasherId == "" || this.CasherId == null) {
          var para1 = {
            listUser: null
          };
        } else {
          var para1 = {
            listUser: this.CasherId
          };
        }
        const paraALL = Object.assign({}, para, para1);
        console.log(paraALL);
        MemberDataByUser(paraALL).then(res => {
          console.log(res.Result);
          this.total = res.Result.Total;
          this.MenberlistShoppers = res.Result.Rows;
        });
      }
      if (this.Dimension == 2) {
        this.$refs.tab.select(2);
        //门店
        if (this.NameOrCode == "" || this.NameOrCode == null) {
          var para1 = {
            listOrg: null
          };
        } else {
          var para1 = {
            listOrg: this.NameOrCode
          };
        }

        const paraALL = Object.assign({}, para, para1);
        console.log(paraALL);
        MemberDataByOrg(paraALL).then(res => {
          console.log(res.Result);
          this.total = res.Result.Total;
          this.MenberlistStores = res.Result.Rows;
        });
        console.log(this.selectedIndex);
      }
    },
    formatText(NameOrCode) {
      if (this.NameOrCode && this.NameOrCode.length > 3) {
        return this.NameOrCode.length + "门店";
      }
      return NameOrCode;
    },
    //所有门店
    gitGetListOrganization() {
      GetOrgByUser().then(res => {
        console.log(res.Result);
        this.NameOrCodeData = res.Result.Data;
      });
      console.log(this.NameOrCodeData);
    },

    //分析维度
    PayTypeMode() {
      const para = {
        EnumType: "Analysis_Model"
      };
      GetEnumList(para).then(res => {
        console.log(res.Result);
        this.DimensionData = res.Result.Data;
        console.log(this.DimensionData);
      });
    }
    //门店
  },
  mounted() {
    this.PayTypeMode();
    this.gitGetListOrganization();
    this.gridHeight = this.resizeTable() - 90;
  }
};
</script>
