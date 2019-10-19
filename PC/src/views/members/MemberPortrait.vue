<template>
  <div class="container MemberBusiness">
    <!-- 搜索 -->
    <!-- table -->
    <div class="mt-10">
      <Tabs class="Tabsstyle bordertop" ref="tab">
        <TabPanel :title="'信息查询'">
          <div class="query ml-5 mb-10">
            <TextBox inputId v-model="MemberId" placeholder="会员号/卡号/手机号">
              <span class="query_title ml-5">筛选条件</span>
              <Addon>
                <span
                  v-if="MemberId"
                  class="textbox-icon icon-clear"
                  title="Clear value"
                  @click="MemberId=null"
                ></span>
              </Addon>
            </TextBox>
            <LinkButton class="iconfont iconsousuo btn-query btn radius" @click="searchBtn()">搜索</LinkButton>
          </div>
          <div class="pd-5" style="padding-top:0">
            <h4>
              <span></span>基础信息
            </h4>
            <!-- <div class="f-column panel-noscroll" id="grid">
            <div class="panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column">-->
            <table border="0" cellspacing="0" cellpadding="0" class="tableStyle">
              <tr>
                <th>会员编号</th>
                <td>{{MenberDialogForm.MemberCode}}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{MenberDialogForm.MemberName?MenberDialogForm.MemberName:"保密"}}</td>
              </tr>
              <tr>
                <th>消费年龄</th>
                <td>{{MenberDialogForm.ConsumptionAge}}</td>
              </tr>
              <tr>
                <th>性别</th>
                <td>{{MenberDialogForm.Sex}}</td>
              </tr>
              <tr>
                <th>生日</th>
                <td>{{MenberDialogForm.Birthday}}</td>
              </tr>
              <tr>
                <th>邮箱</th>
                <td>暂无</td>
              </tr>
              <tr>
                <th>会员等级</th>
                <td>{{MenberDialogForm.LevelName}}</td>
              </tr>
              <tr>
                <th>注册来源</th>
                <td>{{MenberDialogForm.Refer}}</td>
              </tr>
              <tr>
                <th>注册时间</th>
                <td>{{MenberDialogForm.CreatorTime}}</td>
              </tr>
              <tr>
                <th>成长值</th>
                <td>{{MenberDialogForm.MemberGrowthNum}}</td>
              </tr>
              <tr>
                <th>手机</th>
                <td>{{MenberDialogForm.Phone}}</td>
              </tr>
              <tr>
                <th>注册门店</th>
                <td>{{MenberDialogForm.OrganizationName?MenberDialogForm.OrganizationName:"暂无"}}</td>
              </tr>
              <tr>
                <th>会员排名</th>
                <td>{{MenberDialogForm.MemberRank}}</td>
              </tr>
              <tr>
                <th>排名区间</th>
                <td>{{MenberDialogForm.RankSection}}</td>
              </tr>
              <tr>
                <th>所属导购</th>
                <td>{{MenberDialogForm.OriginUserName?MenberDialogForm.OriginUserName:"暂无"}}</td>
              </tr>
              <tr>
                <th>用户标签</th>
                <td>{{MenberDialogForm.MemberTagCount}}</td>
              </tr>
            </table>
            <!-- 积分信息 -->
            <h4 style="border-top:none">
              <span></span>积分信息
            </h4>
            <!-- <div class="f-column panel-noscroll" id="grid">
            <div class="panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column">-->
            <table border="0" cellspacing="0" cellpadding="0" class="tableStyle">
              <tr>
                <th>总积分</th>
                <td>{{MenberDialogForm.TotalScore}}</td>
              </tr>
              <tr>
                <th>剩余积分</th>
                <td>{{MenberDialogForm.SurplusScore}}</td>
              </tr>
              <tr>
                <th>已用积分</th>
                <td>{{MenberDialogForm.UserScore}}</td>
              </tr>
              <tr>
                <th>兑换优惠券</th>
                <td>{{MenberDialogForm.ExchangeCouponCount}}</td>
              </tr>
              <!-- <tr>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th></th>
                <td></td>
              </tr> -->
            </table>

            <!-- 券信息 -->
            <h4 style="border-top:none">
              <span></span>券信息
            </h4>
            <!-- <div class="f-column panel-noscroll" id="grid">
            <div class="panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column">-->
            <table border="0" cellspacing="0" cellpadding="0" class="tableStyle">
              <tr>
                <th>总优惠券</th>
                <td>{{MenberDialogForm.CouponCount}}</td>
              </tr>
              <tr>
                <th>营销赠送占比</th>
                <td>{{MenberDialogForm.MarketingGiveMix}}</td>
              </tr>
              <tr>
                <th>兑换领取占比</th>
                <td>{{MenberDialogForm.ExchangeDraw}}</td>
              </tr>
              <tr>
                <th>已使用总数</th>
                <td>{{MenberDialogForm.TotalUsed}}</td>
              </tr>
              <tr>
                <th>平均每单使用数</th>
                <td>{{MenberDialogForm.AvgUsedCount}}</td>
              </tr>
              <tr>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th></th>
                <td></td>
              </tr>
            </table>
          </div>
        </TabPanel>
        <TabPanel :title="'消费概况'" v-if="this.showChar">
          <div class="pd-5">
            <h4>
              <span></span>消费概况
            </h4>
            <!-- <div class="f-column panel-noscroll" id="grid">
            <div class="panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column">-->
            <table border="0" cellspacing="0" cellpadding="0" class="tableStyle">
              <tr>
                <th>消费排名</th>
                <td>{{MenberFaceForm.Ranking}}</td>
              </tr>
              <tr>
                <th>月平均次数</th>
                <td>{{MenberFaceForm.MonthUnitTimes}}</td>
              </tr>
              <tr>
                <th>月平均消费</th>
                <td>{{MenberFaceForm.MonthUnitExpend}}</td>
              </tr>
              <tr>
                <th>线下消费总额</th>
                <td>{{MenberFaceForm.LocalShoppingAmount}}</td>
              </tr>
              <tr>
                <th>最近消费门店</th>
                <td>{{MenberFaceForm.OrgName?MenberFaceForm.OrgName:"保密"}}</td>
              </tr>
              <tr>
                <th>线下消费总次数</th>
                <td>{{MenberFaceForm.LocalShoppingTimes}}</td>
              </tr>
              <tr>
                <th>经常消费门店</th>
                <td>{{MenberFaceForm.ExpendOrgName?MenberFaceForm.ExpendOrgName:"保密"}}</td>
              </tr>
              <tr>
                <th>线下撤销总额</th>
                <td>{{MenberFaceForm.LocalReturnAmount}}</td>
              </tr>
              <tr>
                <th>客单价</th>
                <td>{{MenberFaceForm.UnitPrice}}</td>
              </tr>
              <tr>
                <th>线下撤销总次数</th>
                <td>{{MenberFaceForm.LocalReturnTimes}}</td>
              </tr>
              <tr>
                <th>排名区间</th>
                <td>{{MenberFaceForm.RankingRegion}}</td>
              </tr>
              <tr>
                <th></th>
                <td></td>
              </tr>
            </table>

            <div class="top-title mt-30">
              <span class="sub-title goShop">消费图表</span>
            </div>
            <!-- <p class="pstyle noborder">
              <img src="../../assets/line_bg_03.jpg" class="line-bg" />
              <span>消费图表</span>
            </p>-->
            <!-- 图表 start-->
            <div class="bottom-container">
              <div class="chart-item">
                <div class="top-title">
                  <span class="sub-title">消费品类TOP10</span>
                </div>
                <div id="hyxsezbNum" class="chart-body" v-if="cateTop10 == false"></div>
                <div  class="nofindBox" v-else>
                  <img src="../../assets/nofind.png" class="no-find"/>
                </div>
              </div>
              <div class="chart-item">
                <div class="top-title">
                  <span class="sub-title">消费品牌TOP10</span>
                </div>
                <div id="brandhyxsezbNum" class="chart-body" v-if="brandTop10 == false"></div>
                <div class="nofindBox" v-else>
                  <img src="../../assets/nofind.png" class="no-find"/>
                </div>
              </div>
            </div>
            <div class="bottom-container">
              <div class="chart-item goShop">
                <div class="top-title">
                  <span class="sub-title goShop">到店次数趋势图</span>
                </div>
                <div class="tb-hb">
                  <div
                    :class="['tb', hyxsezbActive==='tb'?'active':'']"
                    @click="selectionChange($event,1)"
                  >最近一个月</div>
                  <div
                    :class="['mb', hyxsezbActive==='mb'?'active':'']"
                    @click="selectionChange($event,3)"
                  >最近三个月</div>
                  <div
                    :class="['hb', hyxsezbActive==='hb'?'active':'']"
                    @click="selectionChange($event,12)"
                  >最近十二个月</div>
                </div>
                <div id="goShopNum" class="chart-body goShop"></div>
              </div>
            </div>
            <!-- 图表 end-->
          </div>
        </TabPanel>
      </Tabs>
    </div>
  </div>
</template>
<script>
import Echart from "echarts";
import {
  GetBaseInfoOutput,
  GetExpendInfo,
  GetConsumerGoodsTop,
  GetConsumerBrandTop,
  GetMemberShopTimesTrend
} from "@/api/Service";
import store from "@/store/store";
import $ from "jquery";
export default {
  data() {
    return {
      //搜索
      gridHeight: false,
      showChar: false,
      hyxsezbActive: "tb",
      Dimension: 0,
      cateTop10: false,
      brandTop10: false,
      Dimension: 0,
      MemberId: "",
      CasherName: "",
      StartDate: new Date().getFullYear() - 1,
      EndDate: "",
      MenberDialogForm: {
        MemberId: "",
        MemberCode: "",
        MemberName: "",
        ConsumptionAge: "",
        Sex: "",
        Birthday: "",
        LevelName: "",
        Refer: "",
        CreatorTime: "",
        MemberGrowthNum: "",
        Phone: "",
        OrganizationName: "",
        MemberRank: "",
        RankSection: "",
        OriginUserName: "",
        MemberTagCount: "",
        TotalScore: "",
        SurplusScore: "",
        UserScore: "",
        ExchangeCouponCount: "",
        CouponCount: "",
        MarketingGiveMix: "",
        ExchangeDraw: "",
        TotalUsed: "",
        AvgUsedCount: ""
      },
      MenberFaceForm: {
        //消费概况
        Ranking: "",
        OrgId: "",
        OrgCode: "",
        OrgName: "",
        UnitPrice: "",
        MonthUnitTimes: "",
        LocalShoppingTimes: "",
        LocalReturnTimes: "",
        MonthUnitExpend: "",
        ExpendOrgId: "",
        ExpendOrgCode: "",
        ExpendOrgName: "",
        RankingRegion: "",
        LocalShoppingAmount: "",
        LocalReturnAmount: ""
      },
      consumeCategory: {
        //消费品类
        ValueList: [], //X轴
        XDataList: [] //数据值
      },
      consumeBrand: {},
      consumeGoShop: {}
    };
  },
  components: {},
  methods: {
    getDay(day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();

      tMonth = this.doHandleMonth(tMonth + 1);

      tDate = this.doHandleMonth(tDate);

      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;

      if (month.toString().length == 1) {
        m = "0" + month;
      }

      return m;
    },
    selectionChange(e, index) {
      var para = null;
      if (index == 1) {
        this.hyxsezbActive = "tb";

        var StartDate = this.getDay(-30);
        var EndDate = this.getDay(0);
        console.log(StartDate);
        console.log(EndDate);
        para = {
          MemberId: this.MenberDialogForm.MemberId,
          StartDate: StartDate,
          EndDate: EndDate
        };
      } else if (index == 3) {
        this.hyxsezbActive = "mb";
        var StartDate = this.getDay(-90);
        var EndDate = this.getDay(0);
        console.log(StartDate);
        console.log(EndDate);
        para = {
          MemberId: this.MenberDialogForm.MemberId,
          StartDate: StartDate,
          EndDate: EndDate
        };
      } else if (index == 12) {
        this.hyxsezbActive = "hb";
        var StartDate = this.getDay(-360);
        var EndDate = this.getDay(0);
        console.log(StartDate);
        console.log(EndDate);
        para = {
          MemberId: this.MenberDialogForm.MemberId,
          StartDate: StartDate,
          EndDate: EndDate
        };
      } else {
        this.hyxsezbActive = "tb";
        var StartDate = this.getDay(-30);
        var EndDate = this.getDay(0);
        console.log(StartDate);
        console.log(EndDate);
        para = {
          MemberId: this.MenberDialogForm.MemberId,
          StartDate: StartDate,
          EndDate: EndDate
        };
      }

      GetMemberShopTimesTrend(para).then(res => {
        //到店次数趋势图
        console.log(res.Result);
        if (res && res.Result && res.Result.Code == 0) {
          //this.consumeGoShop = res.Result.Data;
          this.goShopNumFn(
            res.Result.Data.XDataList,
            res.Result.Data.YearValueList,
            res.Result.Data.LastYearValueList
          );
        }
      });
    },
    // 获取消费概况
    getInit() {
      this.showChar = false;
      if (
        this.MemberId == "" ||
        this.MemberId == " " ||
        this.MemberId == undefined
      ) {
        marg.$messager.alert({
          title: "提示",
          msg: "筛选条件不能为空"
        });
        return false;
      }
      const para = {
        Phone: this.MemberId
      };
      //console.log(para);
      //return false;
      GetBaseInfoOutput(para)
        .then(res => {
          console.log(res.Result);
          if (res && res.Result && res.Result.Code == 0) {
            this.MenberDialogForm = res.Result.Data;
          }
        })
        .then(res => {
          const para = {
            MemberId: this.MenberDialogForm.MemberId
          };
          GetExpendInfo(para).then(res => {
            this.showChar = true;
            //获取消费概况
            console.log(res.Result);
            if (res && res.Result && res.Result.Code == 0) {
              this.MenberFaceForm = res.Result.Data;
            }
          });
        })
        .then(res => {
          console.log(44444444);
          var para = {
            MemberId: this.MenberDialogForm.MemberId
          };
          GetConsumerGoodsTop(para).then(res => {
            //消费品类TOP10
            console.log(res.Result);
            if (res && res.Result && res.Result.Code == 0) {
              this.consumeCategory = res.Result.Data;
              this.showChartCategoryList(
                res.Result.Data.ValueList,
                res.Result.Data.XDataList
              );
            }
          });
          GetConsumerBrandTop(para).then(res => {
            //消费品牌TOP10
            console.log(res.Result);
            if (res && res.Result && res.Result.Code == 0) {
              this.consumeBrand = res.Result.Data;
              this.showChartBrandList(
                res.Result.Data.ValueList,
                res.Result.Data.XDataList
              );
            }
          });
          this.selectionChange();
        });
    },
    //消费品类TOP10
    showChartCategoryList(dataLeft, dataRight) {
      if(dataRight && dataRight.length > 0){
        this.cateTop10 = false;
      } else {
        this.cateTop10 = true;
      }
      var myChart = Echart.init(document.getElementById("hyxsezbNum"));
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: dataRight,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: dataLeft
          }
        ]
      };
      myChart.setOption(option);
    },
    showChartBrandList(dataLeft, dataRight) {
      if(dataRight && dataRight.length > 0){
        this.brandTop10 = false;
      } else {
        this.brandTop10 = true;
      }
      var myChartBrand = Echart.init(
        document.getElementById("brandhyxsezbNum")
      );
      let optionBrand = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: dataRight,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: dataLeft
          }
        ]
      };
      myChartBrand.setOption(optionBrand);
    },
    //到店次数
    goShopNumFn(XDataList, YearValueList, LastYearValueList) {
      var myChart = Echart.init(document.getElementById("goShopNum"));
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["最高销量", "最低销量"]
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: XDataList
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} "
          }
        },
        series: [
          {
            name: "最高销量",
            type: "line",
            data: LastYearValueList,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "最低销量",
            type: "line",
            data: YearValueList,
            markPoint: {
              data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
            },
            markLine: {
              data: [
                { type: "average", name: "平均值" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max"
                  },
                  {
                    symbol: "circle",
                    label: {
                      normal: {
                        position: "start",
                        formatter: "最大值"
                      }
                    },
                    type: "max",
                    name: "最高点"
                  }
                ]
              ]
            }
          }
        ]
      };

      myChart.setOption(option);
    },
    //查询
    searchBtn() {
      this.getInit();
    }
  },
  mounted() {
    //this.getInit();
    this.gridHeight = this.resizeTable() - 90;
    var duwidth = $(document).width();
    window.addEventListener('resize', () => {
        $("#hyxsezbNum").css("width",duwidth-180/2 +"px");
        $("#brandhyxsezbNum").css("width",duwidth-180/2 +"px");
        $("#brandhyxsezbNum").css("width",duwidth-200 +"px");
    })
    
  }
};
</script>
<style scoped>
.pstyle {
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #f5f8fd;
}
.pstyle .line-bg {
  width: 4px;
  height: 19px;
  margin-right: 10px;
}
.pstyle span {
  font-size: 16px;
}
.my-table tr {
  line-height: 50px;
  border-bottom: 1px solid #cfd6e3;
  text-align: center;
}
.my-table tr td {
  border-right: 1px solid #cfd6e3;
}
.my-table tr td:nth-of-type(8) {
  border: none;
}
.container {
  height: 100%;
}
.panel-body {
  overflow: hidden;
}
#grid {
  margin-bottom: 20px;
}
/* .noborder {
  border: none;
} */
/* 图表 */
.main-container {
  font-family: Source Han Sans CN Normal;
  padding: 15px 0;
}
.main-container .top-container {
  display: flex;
  align-items: flex-start;
}
.main-container .top-container .top-item {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.15);
  width: calc(95% / 6);
  padding: 20px 11px 0;
  min-height: 280px;
}
.main-container .top-container .top-item:not(:first-child) {
  margin-left: 1%;
}
.main-container .top-container .top-item .top01 {
  font-size: 16px;
  color: rgba(68, 68, 68, 1);
  line-height: 24px;
}
.top02 {
  margin-top: 15px;
  border-radius: 5px;
  min-height: 147px;
}
.top02 .bottom-num,
.top02 .top-num {
  padding: 8px 0 11px 17px;
  color: rgba(255, 255, 255, 1);
  position: relative;
}
.b-b {
  border-bottom: 1px dotted white;
}
.top02 .top-num:after {
  position: absolute;
  bottom: -3px;
  right: -3px;
  content: "";
  width: 5px;
  height: 5px;
  background-color: white;
  transform: rotateZ(45deg);
}
.top02 .top-num:before {
  position: absolute;
  bottom: -3px;
  left: -3px;
  content: "";
  width: 5px;
  height: 5px;
  background-color: white;
  transform: rotateZ(45deg);
}
.top02 .top-num .label,
.top02 .bottom-num .label {
  font-size: 12px;
  line-height: 18px;
}
.num-con {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
  margin-top: 10px;
}
.num-con .num {
  font-size: 30px;
}
.top02.hyzs {
  background: rgba(252, 153, 126, 1);
}
.top02.hyxsje {
  background: rgba(252, 126, 126, 1);
}
.top02.xsje {
  background: rgba(252, 194, 126, 1);
}
.top02.czje {
  background: rgba(218, 109, 151, 1);
}
.top02.tcje {
  background: rgba(77, 191, 195, 1);
}
.top02.qsyqk {
  background: rgba(77, 151, 195, 1);
}
.main-container .top-container .top-item .top03 {
  margin-top: 16px;
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
  line-height: 18px;
}
.top03.m-t-10 {
  margin-top: 5px !important;
}
.bottom-container {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
}
.chart-item {
  width: calc((100% - 20px) / 2);
  box-sizing: border-box;
  padding: 30px 15px 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.15);
}
.chart-item.goShop {
  width: calc(100% - 20px);
}
.chart-item:nth-child(2n) {
  margin-left: 20px;
}
.chart-item:nth-child(n + 3) {
  margin-top: 20px;
}
.chart-item .top-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sub-title.active {
  color: rgba(5, 121, 203, 1) !important;
}
.sub-title {
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: center;
}
.sub-title.goShop {
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: center;
}
.sub-title.m-l {
  margin-left: 38px;
}
.chart-item .f-field.textbox {
  width: 100px !important;
}
.chart-item .chart-body {
  margin-top: 20px;
  width: 500px;
  box-sizing: border-box;
  height: 370px;
}
.chart-item .nofindBox {
  padding: 20px;
      width: 100%;
    text-align: center;
}
.chart-item .chart-body.goShop {
  margin-top: 20px;
  height: 370px;
}

@media screen and (min-width:1800px) and (max-width:2920px) {
    .chart-item .chart-body {
        width: 780px;
    }
    .chart-item .chart-body.goShop {
      width: 1600px;
    }
}
@media screen and (min-width:1367px) and (max-width:1800px) {
    .chart-item .chart-body {
        width: 650px;
    }
    .chart-item .chart-body.goShop {
      width: 1300px;
    }
}
@media screen and (max-width: 1366px) {
    .chart-item .chart-body {
        width: 500px;
    }
    .chart-item .chart-body.goShop {
      width: 1000px;
    }
}
.tb-hb {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.hb,
.mb,
.tb {
  width: 90px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #222222;
  border-radius: 5px;
  border: 1px solid #5ba1e7;
  cursor: pointer;
}
.hb {
  border-radius: 0 5px 5px 0;
}
.mb {
  border-radius: 0;
}
.tb {
  border-radius: 5px 0 0 5px;
}
.tb-hb .active {
  background-color: #5ba1e7;
  color: rgba(255, 255, 255, 1) !important;
}
.chart-body{text-align: center;}
.no-find{
  width: 277px;
  height: 159px;
  text-align: center;
  margin-top: 104px;
}
</style>
