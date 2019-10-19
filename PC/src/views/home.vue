<template>
  <div class="main-container">
    <div class="top-container">
      <div class="top-item">
        <div class="top01">会员总数</div>
        <div class="top02 hyzs">
          <div class="top-num b-b">
            <div class="label">本周新增：</div>
            <div class="num-con"><span class="num">{{MemberTotalNum.WeekAddNum}}</span>人</div>
          </div>
          <div class="bottom-num">
            <div class="label">本月新增：</div>
            <div class="num-con"><span class="num">{{MemberTotalNum.MonthAddNum}}</span>人</div>
          </div>
        </div>
        <div class="top03">会员总数：{{MemberTotalNum.MemberTotalNum}}人</div>
      </div>
      <div class="top-item">
        <div class="top01">会员销售(2019年)</div>
        <div class="top02 hyxsje">
          <div class="top-num b-b">
            <div class="label">本周新增：</div>
            <div class="num-con"><span class="num">{{MemberSaleAmount.WeekAddSaleAmount}}</span>元</div>
          </div>
          <div class="bottom-num">
            <div class="label">本月新增：</div>
            <div class="num-con"><span class="num">{{MemberSaleAmount.MonthAddSaleAmount}}</span>元</div>
          </div>
        </div>
        <div class="top03">截止昨日：{{MemberSaleAmount.YearAddSaleAmount}}元</div>
      </div>
      <div class="top-item">
        <div class="top01">销售金额(2019年)</div>
        <div class="top02 xsje">
          <div class="top-num b-b">
            <div class="label">本周新增：</div>
            <div class="num-con"><span class="num">{{SaleAmount.WeekAddSaleAmount}}</span>元</div>
          </div>
          <div class="bottom-num">
            <div class="label">本月新增：</div>
            <div class="num-con"><span class="num">{{SaleAmount.MonthAddSaleAmount}}</span>元</div>
          </div>
        </div>
        <div class="top03">截止昨日：{{SaleAmount.YearAddSaleAmount}}元</div>
      </div>
      <div class="top-item">
        <div class="top01">储值金额(2019年)</div>
        <div class="top02 czje">
          <div class="top-num b-b">
            <div class="label">本周新增：</div>
            <div class="num-con"><span class="num">{{RechargeAmount.WeekendAmount}}</span>元</div>
          </div>
          <div class="bottom-num">
            <div class="label">本月新增：</div>
            <div class="num-con"><span class="num">{{RechargeAmount.MonthAmount}}</span>元</div>
          </div>
        </div>
        <div class="top03">截止今日储值：{{RechargeAmount.TotalAmount}}元</div>
        <div class="top03 m-t-10">截止今日剩余：{{RechargeAmount.LaveAmount}}元</div>
      </div>
      <div class="top-item">
        <div class="top01">套餐金额(2019年)</div>
        <div class="top02 tcje">
          <div class="top-num b-b">
            <div class="label">本周新增：</div>
            <div class="num-con"><span class="num">{{ComboAmount.WeekendAmount}}</span>元</div>
          </div>
          <div class="bottom-num">
            <div class="label">本月新增：</div>
            <div class="num-con"><span class="num">{{ComboAmount.MonthAmount}}</span>元</div>
          </div>
        </div>
        <div class="top03">截止今日套餐：{{ComboAmount.TotalAmount}}元</div>
        <div class="top03 m-t-10">截止今日剩余：{{ComboAmount.LaveAmount}}元</div>
      </div>
      <div class="top-item">
        <div class="top01">券使用情况(2019年)</div>
        <div class="top02 qsyqk">
          <div class="top-num">
            <div class="label">累计发送券数量：</div>
            <div class="num-con"><span class="num">{{CouponAmount.TotalCount}}</span>张</div>
          </div>
          <div class="bottom-num"></div>
        </div>
        <div class="top03">截止昨日使用：{{CouponAmount.UseCount}}张</div>
        <div class="top03 m-t-10">截止昨日带动：{{CouponAmount.UseAmount}}元</div>
      </div>
    </div>
    <div class="bottom-container">
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">会员注册数</span>
          </div>
          <ComboBox v-model="memberMonth" :data="monthArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'memberRegisterNum')"/>
        </div>
        <div id="memberRegisterNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span :class="['sub-title', arriveStoreFlag===0?'active':'']" @click="selectionChange({value: arriveStoreMonth}, 'arriveStoreNum', 'interFace', 'arriveStoreFlag', 0)">到店人数</span>
            <span :class="['sub-title m-l', arriveStoreFlag===1?'active':'']" @click="selectionChange({value: arriveStoreMonth}, 'arriveStoreNum', 'interFace1', 'arriveStoreFlag', 1)">客单价</span>
          </div>
          <ComboBox v-model="arriveStoreMonth" :data="monthArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'arriveStoreNum', arriveStoreFlag===0?'interFace':'interFace1')"/>
        </div>
        <div id="arriveStoreNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span :class="['sub-title', memberCzFlag===0?'active':'']" @click="selectionChange({value: memberCzMonth}, 'memberCzNum', 'interFace', 'memberCzFlag', 0)">会员充值</span>
            <span :class="['sub-title m-l', memberCzFlag===1?'active':'']" @click="selectionChange({value: memberCzMonth}, 'memberCzNum', 'interFace1', 'memberCzFlag', 1)">储值消费</span>
          </div>
          <ComboBox v-model="memberCzMonth" :data="monthArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'memberCzNum', memberCzFlag===0?'interFace':'interFace1')"/>
        </div>
        <div id="memberCzNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span :class="['sub-title',qSlFlag===0?'active':'']" @click="selectionChange({value: qSlMonth}, 'qSlNum', 'interFace', 'qSlFlag', 0)">券发送数量</span>
            <span :class="['sub-title m-l', qSlFlag===1?'active':'']" @click="selectionChange({value: qSlMonth}, 'qSlNum', 'interFace1', 'qSlFlag', 1)">券使用数量</span>
          </div>
          <ComboBox v-model="qSlMonth" :data="monthArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'qSlNum', qSlFlag===0?'interFace':'interFace1')"/>
        </div>
        <div id="qSlNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">执行营销次数</span>
          </div>
          <ComboBox v-model="zxyxcsMonth" :data="monthArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'zxyxcsNum')"/>
        </div>
        <div id="zxyxcsNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">营销带动销售额</span>
          </div>
          <ComboBox v-model="ysddxseMonth" :data="monthArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'ysddxseNum')"/>
        </div>
        <div id="ysddxseNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">会员销售额占比</span>
          </div>
          <div class="tb-hb">
            <div :class="['tb', hyxsezbActive==='tb'?'active':'']" @click="selectionChange({value: hyxsezbMonth}, 'hyxsezbNum', 'interFace', 'hyxsezbActive', 'tb')">同比</div>
            <div :class="['hb', hyxsezbActive==='hb'?'active':'']" @click="selectionChange({value: hyxsezbMonth}, 'hyxsezbNum', 'interFace1', 'hyxsezbActive', 'hb')">环比</div>
          </div>
          <ComboBox v-model="hyxsezbMonth" :data="yearArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'hyxsezbNum', hyxsezbActive==='tb'?'interFace':'interFace1')"/>
        </div>
        <div id="hyxsezbNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">新会员销售额占比</span>
          </div>
          <div class="tb-hb">
            <div :class="['tb', xhyxsezbActive==='tb'?'active':'']" @click="selectionChange({value: xhyxsezbMonth}, 'xhyxsezbNum', 'interFace', 'xhyxsezbActive', 'tb')">同比</div>
            <div :class="['hb', xhyxsezbActive==='hb'?'active':'']" @click="selectionChange({value: xhyxsezbMonth}, 'xhyxsezbNum', 'interFace1', 'xhyxsezbActive', 'hb')">环比</div>
          </div>
          <ComboBox v-model="xhyxsezbMonth" :data="yearArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'xhyxsezbNum', xhyxsezbActive==='tb'?'interFace':'interFace1')"/>
        </div>
        <div id="xhyxsezbNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">会员客单价</span>
          </div>
          <div class="tb-hb">
            <div :class="['tb', hykdjActive==='tb'?'active':'']" @click="selectionChange({value: hykdjMonth}, 'hykdjNum', 'interFace', 'hykdjActive', 'tb')">同比</div>
            <div :class="['hb', hykdjActive==='hb'?'active':'']" @click="selectionChange({value: hykdjMonth}, 'hykdjNum', 'interFace1', 'hykdjActive', 'hb')">环比</div>
          </div>
          <ComboBox v-model="hykdjMonth" :data="yearArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'hykdjNum', hykdjActive==='tb'?'interFace':'interFace1')"/>
        </div>
        <div id="hykdjNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">新会员客单价</span>
          </div>
          <div class="tb-hb">
            <div :class="['tb', xhykdjActive==='tb'?'active':'']" @click="selectionChange({value: xhykdjMonth}, 'xhykdjNum', 'interFace', 'xhykdjActive', 'tb')">同比</div>
            <div :class="['hb', xhykdjActive==='hb'?'active':'']" @click="selectionChange({value: xhykdjMonth}, 'xhykdjNum', 'interFace1', 'xhykdjActive', 'hb')">环比</div>
          </div>
          <ComboBox v-model="xhykdjMonth" :data="yearArrs" valueField="value"
                    textField="name" :editable="false" @selectionChange="selectionChange($event, 'xhykdjNum', xhykdjActive==='tb'?'interFace':'interFace1')"/>
        </div>
        <div id="xhykdjNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">会员性别占比</span>
          </div>
        </div>
        <div id="hysbzbNum" class="chart-body"></div>
      </div>
      <div class="chart-item">
        <div class="top-title">
          <div class="title-con">
            <span class="sub-title">会员性别销售额占比</span>
          </div>
        </div>
        <div id="hyxbxszbNum" class="chart-body"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Echart from 'echarts'
  import dayjs from 'dayjs'
  import { GetMemberTotalNum, GetMemberSaleAmount, GetSaleAmount, GetRechargeAmount,
    GetComboAmount, GetCouponAmount, GetMemberRegNum,GetMemberRecharge, GetStorageValueConsumption,
    GetMarketingTimes,GetMembershipSalesPercentageYear, GetMembershipSalesPercentageTwoYear,GetMemberPassengerUnitPriceYear,
    GetMemberPassengerUnitPriceTwoYear, GetMemberSexPercentage,GetShoppingNumber,GetCouponNumber,GetMarketAmount,GetNewMemberShopping,
    GetNewMemberUnitPrice,GetMemberSexAmount, GetShoppingNumber1, GetNewMemberUnitPrice1, GetNewMemberShopping1, GetCouponNumber1} from "@/api/home";

  export default  {
    name: 'home',
    data() {
      return {
        monthArrs: [{
          name: '昨日',
          value: '1'
        },{
          name: '今日',
          value: '2'
        },{
          name: '本周',
          value: '3'
        },{
          name: '本月',
          value: '4'
        }],
        yearArrs: [{
          name: `${new Date().getFullYear()}年`,
          value: new Date().getFullYear()
        },{
          name: `${new Date().getFullYear()-1}年`,
          value: new Date().getFullYear()-1
        }],
        chartInfo: {
          memberRegisterNum: '',
          arriveStoreNum: '',
          memberCzNum: '',
          qSlNum: '',
          zxyxcsNum: '',
          ysddxseNum: '',
          hyxsezbNum: '',
          xhyxsezbNum: '',
          hykdjNum: '',
          xhykdjNum: '',
          hysbzbNum: '',
          hyxbxszbNum: ''
        },
        chartOption: {
          //会员注册数
          memberRegisterNum: {
            options: {
              yName: '人',
              xName: '时间',
              name: '会员注册数',
              year: new Date().getFullYear(),
              type: 'line'
            },
            interFace: GetMemberRegNum
          },
          //到店人数GetShoppingNumber 客单价GetShoppingNumber1
          arriveStoreNum: {
            options: {
              yName: '人',
              xName: '时间',
              name: '到店人数',
              year: new Date().getFullYear(),
              type: 'bar'
            },
            interFace: GetShoppingNumber,
            interFace1: GetShoppingNumber1
          },
          //会员充值GetMemberRecharge 储值消费GetStorageValueConsumption
          memberCzNum: {
            options: {
              yName: '元',
              xName: '时间',
              name: '充值金额',
              year: new Date().getFullYear(),
              type: 'bar'
            },
            interFace: GetMemberRecharge,
            interFace1: GetStorageValueConsumption
          },
          //券发送数量 券使用数量
          qSlNum: {
            options: {
              yName: '数量',
              xName: '时间',
              name: '券数量',
              year: new Date().getFullYear(),
              type: 'line'
            },
            interFace: GetCouponNumber,
            interFace1: GetCouponNumber1
          },
          //执行营销次数
          zxyxcsNum: {
            options: {
              yName: '次',
              xName: '时间',
              name: '执行次数',
              year: new Date().getFullYear(),
              type: 'line'
            },
            interFace: GetMarketingTimes
          },
          //营销带动销售额
          ysddxseNum: {
            options: {
              yName: '元',
              xName: '时间',
              name: '销售额',
              type: 'bar',
              year: new Date().getFullYear()
            },
            interFace: GetMarketAmount
          },
          //会员销售额占比同比GetMembershipSalesPercentageYear 环比GetMembershipSalesPercentageTwoYear
          hyxsezbNum: {
            options: {
              yName: '元',
              xName: '时间',
              isTb: 'tb',
              lastYear: new Date().getFullYear() - 1,
              year: new Date().getFullYear(),
              type: 'bar'
            },
            interFace: GetMembershipSalesPercentageYear,
            interFace1: GetMembershipSalesPercentageTwoYear,
          },
          //新会员销售额占比
          xhyxsezbNum: {
            options: {
              yName: '元',
              xName: '时间',
              isTb: 'tb',
              lastYear: new Date().getFullYear() - 1,
              year: new Date().getFullYear(),
              type: 'bar'
            },
            interFace: GetNewMemberShopping,
            interFace1: GetNewMemberShopping1
          },
          //会员客单价同比GetMemberPassengerUnitPriceYear 环比GetMemberPassengerUnitPriceTwoYear
          hykdjNum: {
            options: {
              yName: '元',
              xName: '时间',
              isTb: 'tb',
              lastYear: new Date().getFullYear() - 1,
              year: new Date().getFullYear(),
              type: 'bar'
            },
            interFace: GetMemberPassengerUnitPriceYear,
            interFace1: GetMemberPassengerUnitPriceTwoYear
          },
          //新会员客单价
          xhykdjNum: {
            options: {
              yName: '元',
              xName: '时间',
              isTb: 'tb',
              lastYear: new Date().getFullYear() - 1,
              year: new Date().getFullYear(),
              type: 'bar'
            },
            interFace: GetNewMemberUnitPrice,
            interFace1: GetNewMemberUnitPrice1
          }
        },
        memberMonth: '4',
        arriveStoreMonth: '4',
        arriveStoreFlag: 0,
        memberCzMonth: '4',
        memberCzFlag: 0,
        qSlMonth: '4',
        qSlFlag: 0,
        zxyxcsMonth: '4',
        ysddxseMonth: '4',
        hyxsezbMonth: new Date().getFullYear(),
        hyxsezbActive: 'tb',
        hykdjMonth: new Date().getFullYear(),
        hykdjActive: 'tb',
        xhykdjMonth: new Date().getFullYear(),
        xhyxsezbActive: 'tb',
        xhyxsezbMonth: new Date().getFullYear(),
        xhykdjActive: 'tb',
        MemberTotalNum: '',
        MemberSaleAmount: '',
        SaleAmount: '',
        RechargeAmount: '',
        ComboAmount: '',
        CouponAmount: ''
      }
    },
    methods: {
      /**
       * 初始化线图
       * @param id 图表ID
       * @param datas 图表数据
       * @param options y轴name,x轴name
       */
      initLines(id, datas, options) {
        if(this.chartInfo[id]) this.chartInfo[id].dispose()
        this.chartInfo[id] = Echart.init(document.getElementById(id))
        let series = ''
        if(options.type === 'line') {
          series = {
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
              color: '#5BA1E7',
              type: 'dashed'
            },
            smooth: true,
            itemStyle: {
              color: 'rgb(33,148,246)',
              borderWidth: 1,
              borderColor: 'rgb(33,148,246)'
            }
          }
        } else if(options.type === 'bar') {
          series = {
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                color: '#0579CC'
              }
            }
          }
        }

        let XDataList = [];
        if(datas.XDataList && datas.XDataList.length>0){
          XDataList = datas.XDataList;
        }
        if(datas.ListColumnNames && datas.ListColumnNames.length>0){
          XDataList = datas.ListColumnNames;
        }
        let option = {
          legend: {
            data: options.name ? [options.name] : this.chartOption[id].options.isTb === 'tb' ? [`${options.year}年`] : [`${options.lastYear}年`, `${options.year}年`],
            show: true,
            bottom: -5,
            textStyle: {
              fontSize: 12,
              color: '#333333'
            }
          },
          tooltip: {
            trigger: 'axis',
            // formatter: function (params) {
            //   return `${params[0].name}` + '<br>' + `${params[0].value}${options.yName || ''}`
            // }
          },
          grid: {
            left: '10%',
            top: '10%',
            bottom: '13%',
            right: '8%',
          },
          xAxis: {
            splitNumber: 6,
            name: options.xName,
            nameTextStyle: {
              color: '#333333',
            },
            boundaryGap: true, //默认，坐标轴留白策略
            axisLine: {
              show: true,
              lineStyle: {
                color: '#A1A1A1'
              }
            },
            axisLabel: {
              show: true,
              color: '#333333',
              fontSize: 12
            },
            axisTick: {
              show: true,
              alignWithLabel: true
            },
            splitLine: {
              show: false
            },
            //data: datas.XDataList ? datas.XDataList : datas.ListColumnNames
            data: XDataList
          },
          yAxis: {
            name: options.yName,
            nameTextStyle: {
              color: '#333333',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'black'
              }
            },
            axisLabel: {
              show: true,
              color: '#333333',
              fontSize: 12
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#DCDCDC'
              }
            },
            axisTick: {
              show: true
            },
            splitArea: {
              show: false,
            }
          },
          series: ((datas) => {
            if(datas.LastYearValueList || datas.ListRowLastYear) {
              return [Object.assign({
                name: `${options.lastYear}年`,
                label: {
                  show: false,
                  distance: 1
                },
                data: datas.LastYearValueList ? datas.LastYearValueList : datas.ListRowLastYear
              }, {
                type: 'bar',
                barWidth: 15,
                itemStyle: {
                  normal: {
                    color: '#FFA779'
                  }
                }
              }),Object.assign({
                name: `${options.year}年`,
                label: {
                  show: false,
                  distance: 1
                },
                data: datas.YearValueList ? datas.YearValueList : datas.ListRowYear
              }, series)]
            }else {
             return [Object.assign({
               name: `${options.year}年`,
               label: {
                 show: false,
                 distance: 1
               },
               data: datas.ValueList ? datas.ValueList : datas.ListRowValue
             }, series)]
            }
          })(datas)
        }
        this.chartInfo[id].setOption(option)
      },
      /**
       * 初始化页面
       */
      init() {
        Object.keys(this.chartOption).map(item => {
          console.log(this.chartOption);
          console.log(item);
          console.log(this.chartOption[item].options);
          this.initCharts(item, this.chartOption[item].options)
        })
        this.inithysbzbNum('hysbzbNum')
        this.inithysbzbNum('hyxbxszbNum')
        this.initTopData()
      },
      //初始化头部信息
      initTopData() {
        GetMemberTotalNum().then(res => {
          if(res.Result.Code === 0) {
            this.MemberTotalNum = res.Result.Data
          }
        })
        GetMemberSaleAmount().then(res => {
          if(res.Result.Code === 0) {
            this.MemberSaleAmount = res.Result.Data
          }
        })
        GetSaleAmount().then(res => {
          if(res.Result.Code === 0) {
            this.SaleAmount = res.Result.Data
          }
        })
        GetRechargeAmount().then(res => {
          if(res.Result.Code === 0) {
            this.RechargeAmount = res.Result.Data
          }
        })
        GetComboAmount().then(res => {
          if(res.Result.Code === 0) {
            this.ComboAmount = res.Result.Data
          }
        })
        GetCouponAmount().then(res => {
          if(res.Result.Code === 0) {
            this.CouponAmount = res.Result.Data
          }
        })
      },
      //会员性别占比
      inithysbzbNum(flag) {
        if(this.chartInfo[flag]) this.chartInfo[flag].dispose()
        this.chartInfo[flag] = Echart.init(document.getElementById(flag))
        let data = []
        let color = ['#0579CC', '#FFA779', '#E6E6E6'];
        let method = flag === 'hysbzbNum' ? GetMemberSexPercentage : GetMemberSexAmount
        let rateName = flag === 'hysbzbNum' ? "会员性别占比":"会员性别销售额占比";
        method().then(res => {
          if(res.Result.Code === 0) {
            console.log(res.Result.Data);
            console.log(Object.keys(res.Result.Data));
            Object.keys(res.Result.Data).map(item => {
              data.push({
              value: res.Result.Data[item],
              //name: item.ManNum ? item === 'ManNum' ? '男' : item === 'WoManNum' ? '女' : '其他' : item === 'MenAmount' ? '男' : item === 'WomenAmount' ? '女' : '其他'
              name: item === 'ManNum' ? '男' : item === 'WoManNum' ? '女' : item === 'MenAmount' ? '男' : item === 'WomenAmount' ? '女' : '其他'
              })
            })
            let data1 = data[0].value + data[1].value + data[2].value;
            let baseData = [];
            for (var i = 0; i < data.length; i++) {
              baseData.push({
                value: data[i].value,
                name: data[i].name,
                itemStyle: {
                  normal: {
                    borderWidth: 10,
                    borderColor: color[i],
                  }
                }
              });
            }
            let option = {
              color: color,
              tooltip: {
                show:true,
                trigger: 'item',
                formatter: function (params) {
                  return `${params.seriesName}: ${params.name}(${params.value})<br>占比: ${params.percent}%`
                }
              },
              legend: {
                data: ['男', '女', '其他'],
                icon: 'circle',
                bottom: '5%',
              },
              grid: {
                top: 'bottom',
                left: '90',
                width: '90%',
                height: '80%',

              },
              series: [{
                zlevel: 1,
                name: rateName,
                type: 'pie',
                selectedMode: 'single',
                radius: [100, 105],
                hoverAnimation: false,
                label: {
                  color: '#333333',
                  fontSize: 14,
                  // formatter: "{a}：{b} \n占比：{d}%"
                },
                data: baseData
              }]
            };
            this.chartInfo[flag].setOption(option)
          }
        })
      },
      initCharts(id, options, start='', end='', interFace='interFace') {
        let StartDate = start ? start : dayjs().startOf('month').add(1, 'day') .toDate()
        let EndDate = end ? end : new Date()
        let year = start.length === 4 ? start : new Date().getFullYear()
        let obj = ['hyxsezbNum', 'hykdjNum', 'xhykdjNum', 'xhyxsezbNum'].includes(id) ? {
            Year: year
          }:{
          StartDate,
          EndDate
        }
        this.chartOption[id][interFace](obj).then(res => {
          if(res.Result.Code === 0) {
            console.log(id+"=");
            console.log(res.Result.Data);
            console.log(options);
            this.initLines(id, res.Result.Data, options)
          }
        })
      },
      selectionChange(e, id, interFaceFlag='interFace', dataFlag='', value='') {
        if(!document.getElementById(id)) return
        if(dataFlag) this[dataFlag] = value
        this.chartOption[id].options.isTb = value
        let startTime = ''
        let endTime = ''
        if(parseInt(e.value)<=4) {
          if(e.value === '1') {
            startTime = dayjs().subtract(1, 'day') .toDate()
            endTime = dayjs().subtract(1, 'day') .toDate()
          }else if(e.value === '2') {
            startTime = new Date()
            endTime = new Date()
          }else if(e.value === '3') {
            startTime = dayjs().subtract(dayjs().day()===0 ? 6 : dayjs().day() - 1, 'day') .toDate()
            endTime = new Date()
          }else if(e.value === '4') {
            startTime = dayjs().startOf('month').add(1, 'day') .toDate()
            endTime = new Date()
          }
          this.initCharts(id, this.chartOption[id].options, startTime, endTime, interFaceFlag)
        }else {
          this.initCharts(id, this.chartOption[id].options, e.value, '', interFaceFlag)
        }
      }
    },
    mounted() {
      this.init()
      window.addEventListener('resize', () => {
        Object.keys(this.chartInfo).map(item => {
          if(this.chartInfo[item]) {
            if(this.chartInfo && this.chartInfo[item]){//阻止resize重新渲染时报错
              this.chartInfo[item].resize();
            }
          }
        })
      })
    },
    destroyed() {
      Object.keys(this.chartInfo).map(item => {
        if(this.chartInfo[item]) this.chartInfo[item].dispose()
      })
    }
  }
</script>

<style scoped>
  .main-container {
    font-family: Source Han Sans CN Normal;
    padding: 15px 0;
  }
  .main-container .top-container {
    display: flex;
    align-items: flex-start;
  }
  .main-container .top-container .top-item {
    background: rgba(255,255,255,1);
    border-radius: 10px 10px 10px 10px;
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.15);
    width: calc(95% / 6);
    padding: 20px 11px 0;
    min-height: 280px;
  }
  .main-container .top-container .top-item:not(:first-child) {
    margin-left: 1%;
  }
  .main-container .top-container .top-item .top01 {
    font-size: 16px;
    color: rgba(68,68,68,1);
    line-height: 24px;
  }
  .top02 {
    margin-top: 15px;
    border-radius: 5px;
    min-height: 147px;
  }
  .top02 .bottom-num, .top02 .top-num {
    padding: 8px 0 11px 17px;
    color: rgba(255,255,255,1);
    position: relative;
  }
  .b-b {
    border-bottom: 1px dotted white;
  }
  .top02 .top-num:after {
    position: absolute;
    bottom: -3px;
    right: -3px;
    content: '';
    width: 5px;
    height: 5px;
    background-color: white;
    transform: rotateZ(45deg);
  }
  .top02 .top-num:before {
    position: absolute;
    bottom: -3px;
    left: -3px;
    content: '';
    width: 5px;
    height: 5px;
    background-color: white;
    transform: rotateZ(45deg);
  }
  .top02 .top-num .label, .top02 .bottom-num .label {
    font-size: 12px;
    line-height: 18px;
  }
  .num-con {
    font-size: 12px;
    color: rgba(255,255,255,1);
    line-height: 18px;
    margin-top: 10px;
  }
  .num-con .num {
    font-size: 30px;
  }
  .top02.hyzs {
    background: rgba(252,153,126,1);
  }
  .top02.hyxsje {
    background: rgba(252,126,126,1);
  }
  .top02.xsje {
    background: rgba(252,194,126,1);
  }
  .top02.czje {
    background: rgba(218,109,151,1);
  }
  .top02.tcje {
    background: rgba(77,191,195,1);
  }
  .top02.qsyqk {
    background: rgba(77,151,195,1);
  }
  .main-container .top-container .top-item .top03 {
    margin-top: 16px;
    font-size: 12px;
    color: rgba(153,153,153,1);
    line-height: 18px;
  }
  .top03.m-t-10 {
    margin-top: 5px!important;
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
    background: rgba(255,255,255,1);
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.15);
  }
  .chart-item:nth-child(2n) {
    margin-left: 20px;
  }
  .chart-item:nth-child(n+3) {
    margin-top: 20px;
  }
  .chart-item .top-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sub-title.active {
    color: rgba(5,121,203,1)!important;
  }
  .sub-title {
    font-size: 16px;
    color: rgba(51,51,51,1);
    cursor: pointer;
  }
  .sub-title.m-l {
    margin-left: 38px;
  }
  .chart-item .f-field.textbox {
    width: 100px!important;
  }
  .chart-item .chart-body {
    margin-top: 20px;
    height: 370px;
  }
  .tb-hb {
    display: flex;
    align-items: center;
  }
  .hb, .tb {
    width: 53px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #222222;
    border-radius: 5px;
    border: 1px solid #5BA1E7;
    cursor: pointer;
  }
  .hb {
    border-radius: 0 5px 5px 0;
  }
  .tb {
    border-radius: 5px 0 0 5px;
  }
  .tb-hb .active {
    background-color: #5BA1E7;
    color: rgba(255,255,255,1)!important;
  }
</style>

