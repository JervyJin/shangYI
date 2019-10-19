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
        <p class="f-r">保存筛选条件</p>
        <p class="f-r">使用历史条件</p>
      </div>
      <!-- 搜索 -->
      <div class="query query_top" v-if="ToggleStyle">
        <!-- 搜索 -->
        <div style="line-height:30px" class="f-l mr-10">
          <CheckBox inputId value="0" v-model="SeachType"></CheckBox>
          <span class="ml-5 mr-10">按月展示</span>
        </div>
        <div style="line-height:30px" class="f-l mr-10">
          <CheckBox inputId value="0" v-model="IsDetail"></CheckBox>
          <span class="ml-5 mr-10">显示明细</span>
        </div>
        <DateBox format="yyyy-MM-dd" placeholder v-model="StartDate">
          <span class="query_title">日期(起)</span>
        </DateBox>
        <DateBox format="yyyy-MM-dd" placeholder v-model="EndDate">
          <span class="query_title">日期(止)</span>
        </DateBox>
        <ComboBox
          v-model="Dimension"
          :data="DimensionData"
          valueField="Code"
          textField="Name"
          placeholder
        >
          <span class="query_title">分析维度</span>
        </ComboBox>
        <ComboBox
          v-if="this.Dimension==1"
          v-model="ListOrganize"
          :data="NameOrCodeData"
          :multiple="true"
          valueField="Id"
          textField="Name"
          placeholder
        >
          <span class="query_title">门店</span>
        </ComboBox>
        <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="MenberSearchTop()">搜索</LinkButton>
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
                <GridColumn :rowspan="2" field="DateTime" title="日期" align="center"></GridColumn>
                <GridColumn :rowspan="2" field="NewAllScore" title="产生总积分" align="center"></GridColumn>
                <template slot="body" slot-scope="scoped">
                  <div align="right">{{scoped.row.NewAllScore}}</div>
                </template>
                <GridColumn :rowspan="2" field="ConsumeAllScore" title="消耗总积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeAllScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="LaveScore" title="当前剩余积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.LaveScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="SourceType" title="种类" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.SourceType}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="TerminalType" title="来源" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.TerminalType}}</div>
                  </template>
                </GridColumn>
                <GridColumn :colspan="3" title="新增积分" align="center"></GridColumn>
                <GridColumn :colspan="3" title="消耗积分" align="center"></GridColumn>
              </GridHeaderRow>
              <GridHeaderRow>
                <GridColumn field="NewMemberNum" title="新增积分人数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewMemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="NewOrderNum" title="新增积分订单数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewOrderNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="NewScore" title="新增积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ConsumeMemberNum" title="消耗积分人数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeMemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ConsumeOrderNum" title="消耗积分订单数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeOrderNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ConsumeScore" title="消耗积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeScore}}</div>
                  </template>
                </GridColumn>
              </GridHeaderRow>
            </GridColumnGroup>
          </DataGrid>
        </TabPanel>
        <TabPanel :title="'注册门店分析'">
          <p class="pstyle">
            <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
            <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
            <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
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
                <GridColumn :rowspan="2" field="DateTime" title="日期" align="center"></GridColumn>
                <GridColumn :rowspan="2" field="NewAllScore" title="产生总积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewAllScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="OrganizeName" title="门店名称" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.OrganizeName}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="ConsumeAllScore" title="消耗总积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeAllScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="LaveScore" title="当前剩余积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.LaveScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="SourceType" title="种类" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.SourceType}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="TerminalType" title="来源" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.TerminalType}}</div>
                  </template>
                </GridColumn>
                <GridColumn :colspan="3" title="新增积分" align="center"></GridColumn>
                <GridColumn :colspan="3" title="消耗积分" align="center"></GridColumn>
              </GridHeaderRow>
              <GridHeaderRow>
                <GridColumn field="NewMemberNum" title="新增积分人数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewMemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="NewOrderNum" title="新增积分订单数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewOrderNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="NewScore" title="新增积分" align="center"></GridColumn>
                <GridColumn field="ConsumeMemberNum" title="消耗积分人数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ConsumeOrderNum" title="消耗积分订单数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeOrderNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ConsumeScore" title="消耗积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeScore}}</div>
                  </template>
                </GridColumn>
              </GridHeaderRow>
            </GridColumnGroup>
          </DataGrid>
        </TabPanel>
        <TabPanel :title="'来源分析'">
          <p class="pstyle">
            <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
            <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
            <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
          </p>
          <DataGrid
            :data="MenberlistSource"
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
                <GridColumn :rowspan="2" field="DateTime" title="日期" align="center"></GridColumn>
                <GridColumn :rowspan="2" field="NewAllScore" title="产生总积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewAllScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="LaveScore" title="当前剩余积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.LaveScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="SourceType" title="种类" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.SourceType}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="TerminalType" title="来源" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.TerminalType}}</div>
                  </template>
                </GridColumn>
                <GridColumn :colspan="3" title="新增积分" align="center"></GridColumn>
              </GridHeaderRow>
              <GridHeaderRow>
                <GridColumn field="NewMemberNum" title="新增积分人数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewMemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="NewOrderNum" title="新增积分订单数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewOrderNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="NewScore" title="新增积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.NewScore}}</div>
                  </template>
                </GridColumn>
              </GridHeaderRow>
            </GridColumnGroup>
          </DataGrid>
        </TabPanel>
        <TabPanel :title="'消耗方式分析'">
          <p class="pstyle">
            <LinkButton class="btn-outline iconfont iconshuaxin1 refreshBtn">刷新</LinkButton>
            <LinkButton class="btn-outline iconfont icondayinji-cuxiantiao printBtn">打印</LinkButton>
            <LinkButton class="btn-outline iconfont icondaochu exportBtn">导出</LinkButton>
          </p>
          <DataGrid
            :data="MenberlistExpend"
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
                <GridColumn :rowspan="2" field="DateTime" title="日期" align="center"></GridColumn>
                <GridColumn :rowspan="2" field="ConsumeAllScore" title="消耗总积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeAllScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="LaveScore" title="当前剩余积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.LaveScore}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="SourceType" title="种类" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.SourceType}}</div>
                  </template>
                </GridColumn>
                <GridColumn :rowspan="2" field="TerminalType" title="来源" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="left">{{scoped.row.TerminalType}}</div>
                  </template>
                </GridColumn>
                <GridColumn :colspan="3" title="消耗积分" align="center"></GridColumn>
              </GridHeaderRow>
              <GridHeaderRow>
                <GridColumn field="ConsumeMemberNum" title="消耗积分人数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeMemberNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ConsumeOrderNum" title="消耗积分订单数" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeOrderNum}}</div>
                  </template>
                </GridColumn>
                <GridColumn field="ConsumeScore" title="消耗积分" align="center">
                  <template slot="body" slot-scope="scoped">
                    <div align="right">{{scoped.row.ConsumeScore}}</div>
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
  </div>
</template>
<script>
import { parseTime } from "@/utils/index";
import {
  GetScoreData,
  GetScoreByOrgData,
  GetScoreSourceData,
  GetScoreConsumeData,
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
      ListOrganize: "",
      NameOrCodeData: [],
      SeachType: false,
      IsDetail: false,
      Storesval1: false,
      Storesval2: false,
      Storesval3: false,
      Storesvalqwe: 0,
      selectedIndex: 0,
      Dimension: "",
      DimensionData: [],
      MenberlistExpend: [],
      MenberlistSource: [],
      MenberlistStores: [],
      Menberlist: [],
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
  methods: {
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
    queryToggle() {
      this.ToggleStyle = !this.ToggleStyle;
      this.iconxiangshang1 = !this.iconxiangshang1;
      this.iconxiangxia1 = !this.iconxiangxia1;
      let that = this;
      setTimeout(function() {
        that.gridHeight = that.resizeTable() - 90;
      }, 0);
    },
    //
    MenberSearchTop() {
      this.$refs.tab.select(this.Dimension);
      const para = {
        StartDate: dayjs(this.StartDate).format("YYYY-MM-DD") + " 00:00:00",
        EndDate: dayjs(this.EndDate).format("YYYY-MM-DD") + " 23:59:59",
        page: this.pageNumber,
        rows: this.pageSize,
        SeachType: this.SeachType,
        IsDetail: this.IsDetail
      };
      //全局
      if (this.Dimension == 0) {
        this.$refs.tab.select(0);
        this.selectedIndex = 0;
        console.log(para);
        GetScoreData(para).then(res => {
          console.log(res.Result);
          this.total = res.Result.Total;
          this.Menberlist = res.Result.Rows;
        });
        console.log(this.selectedIndex);
      }
      //门店
      if (this.Dimension == 1) {
        this.$refs.tab.select(1);
        this.selectedIndex = 1;
        this.Storesval1 = true;
        console.log(this.selectedIndex);
        //门店
        if (this.ListOrganize == "" || this.ListOrganize == null) {
          var para1 = {
            ListOrganize: null
          };
        } else {
          var para1 = {
            ListOrganize: this.ListOrganize
          };
        }
        const paraALL = Object.assign({}, para, para1);
        console.log(paraALL);
        GetScoreByOrgData(paraALL).then(res => {
          console.log(res.Result);
          this.total = res.Result.Total;
          this.MenberlistStores = res.Result.Rows;
          console.log(this.MenberlistStores);
        });
      }
      //来源
      if (this.Dimension == 2) {
        this.$refs.tab.select(2);
        this.Storesval2 = true;
        this.selectedIndex = 2;
        GetScoreSourceData(para).then(res => {
          console.log(res.Result);
          this.total = res.Result.Total;
          this.MenberlistSource = res.Result.Rows;
        });
        console.log(this.MenberlistSource);
      }
      //消耗
      if (this.Dimension == 3) {
        this.$refs.tab.select(3);
        this.Storesval3 = true;
        this.selectedIndex = 3;
        GetScoreConsumeData(para).then(res => {
          console.log(res.Result);
          this.total = res.Result.Total;
          this.MenberlistExpend = res.Result.Rows;
        });
        console.log(this.selectedIndex);
      }
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
        EnumType: "Analysis_Type"
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
<style scoped>
</style>

