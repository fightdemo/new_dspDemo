<template>
    <div class="reportEff-page page">
        <h3 class="page-title">
            效果报表
            <dropdownDate no-all="true" callback="chooseDate"></dropdownDate>

            <!-- <dropdown-search value="searchOrder" list="orderList" title="全部订单" callback="orderCall"></dropdown-search>
            <dropdown-search value="searchActive" list="activeList" title="全部活动" callback="activeCall"></dropdown-search> -->
        </h3>

        <div class="tabs-box">

            <ul class="nav-tabs clearfix">
                <li v-show="permission.view[101] || permission.view[102] || permission.view[103]" 
                    :class="{'active':item.active == obj.firstTabFlag}"
                    v-for="(item, index) in obj.firstTab" 
                    :key="index" 
                    @click="firstTabFuc(item.active,item)">
                    <a>{{item.name}}</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="report report1" :class="{active:obj.firstTabFlag=='1'?true:false}">
                    <ul class="tab-content-tab">
                        <li :class="{'active':item.active == obj.secondTabFlag}" 
                            v-for="(item, index) in obj.secondTab" 
                            :key="index" 
                            @click="secondTabFuc(item.active,item)">
                            <a>{{item.name}}</a>
                        </li>
                    </ul>

                </div>
                <div class="report report2" :class="{active:obj.firstTabFlag=='2'?true:false}">
                    <ul class="tab-content-tab">
                        <li :class="{'active':item.active == obj.secondTabMeFlag}" 
                            v-for="(item,index) in obj.secondTabMe"
                            :key="index" 
                            @click="secondTabMeFuc(item.active,item)">
                            <a>{{item.name}}</a>
                        </li>
                    </ul>
                </div>
                <div class="report report3" :class="{active:obj.firstTabFlag=='3'?true:false}">
                    <ul class="tab-content-tab">
                        <li class="active">操作系统</li>
                    </ul>
                </div>
                <!-- <div v-show="isReportHide">
                    <div class="search-chart cl">
                        <div class="form-group fr">
                            <label>线状指示</label>
                            <dropdown-filter title="'曝光量'" list="targetList" callback="selectTarget2"></dropdown-filter>
                        </div>
                        <div class="form-group fr">
                            <label>柱状指示</label>
                            <dropdown-filter title="'点击量'" list="targetList" callback="selectTarget1"></dropdown-filter>
                        </div>
                    </div>
                </div> -->
                <div class="chart" id="chart"  ng-hide="isReportHide"></div>

                <b class="glyphicon glyphicon-menu-up chart-hide" :class="{'glyphicon-menu-up':!isReportHide,'glyphicon-menu-down':isReportHide}" ng-click="isReportHide=!isReportHide"></b>
            </div>
        </div>

        <div class="table-box">
            <div class="table-title">
                <h3 class="table-title-font">{{obj.title}}报表</h3>
                <div class="table-download" ng-click="download(obj)"></div>
                <button style="margin-top: 16px;margin-right: 20px;" class="dsp-btn btn-white fr" v-show="obj.titleSub" ng-click="secondTabMeFuc(obj.secondTabMe[2].active,obj.secondTabMe[2])">返回</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>{{obj.titleSub || obj.title}}</th>
                        <th>曝光量</th>
                        <th>点击量</th>
                        <th>点击率</th>
                        <th>花费</th>
                        <th v-show="obj.type == 1 || obj.type == 2">到达</th>
                        <th v-show="obj.type == 1 || obj.type == 2">转化{{obj.type == 2?"1":""}}</th>
                        <th v-show="obj.type == 2">转化2</th>
                        <th v-show="obj.type == 2">转化3</th>
                        <th>CPM（元）</th>
                        <th>CPC（元）</th>
                        <th v-show="obj.title == '行业包'">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-show='!(obj.name == "pkgName" || obj.titleSub)'>
                        <td>总计</td>
                        <td>{{obj.total.view}}</td>
                        <td>{{obj.total.click}}</td>
                        <td>{{obj.total.clickRate*100 | number:2}}%</td>
                        <td>{{obj.total.advertiserCost}}</td>
                        <td v-show="obj.type == 1 || obj.type == 2">{{obj.total.arrive}}</td>
                        <td v-show="obj.type == 1 || obj.type == 2">{{obj.total.action1}}</td>
                        <td v-show="obj.type == 2">{{obj.total.action2}}</td>
                        <td v-show="obj.type == 2">{{obj.total.action3}}</td>
                        <td>{{obj.total.cpm}}</td>
                        <td>{{obj.total.cpc}}</td>
                    </tr>
                    <tr v-for="(item,index) in obj.list" :key="index">
                        <td>{{item[obj.name]}}</td>
                        <td>{{item.view}}</td>
                        <td>{{item.click}}</td>
                        <td>{{item.clickRate*100 | number:2}}%</td>
                        <td>{{item.advertiserCost}}</td>
                        <td v-show="obj.type == 1 || obj.type == 2">{{item.arrive}}</td>
                        <td v-show="obj.type == 1 || obj.type == 2">{{item.action1}}</td>
                        <td v-show="obj.type == 2">{{item.action2}}</td>
                        <td v-show="obj.type == 2">{{item.action3}}</td>
                        <td>{{item.cpm}}</td>
                        <td>{{item.cpc}}</td>
                        <td v-show="obj.title == '行业包'">
                            <a href="javascript:;" ng-click="showIndustry('app','app','appName',item.orderID)">查看APP</a>&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="javascript:;" ng-click="showIndustry('space','广告位','placeName',item.orderID)">查看广告位</a>
                        </td>
                    </tr> -->
                </tbody>
            </table>
            <div id="pageToolbar" class="page"></div>
        </div>
    </div>
</template>

<script>
import {getNowFormatDate} from "@/common/js/utils";
export default {
    data() {
        return {
            obj: {
                firstTab: [],
                firstTabFlag: '1',
                secondTab: [],
                secondTabFlag:'1',
                secondTabMe: [],
                secondTabMeFlag:'1',
                title: "活动",
                name: "campName",
                type: "1",
                url:'/dsp/rpt/loc/camp',
                sTime: getNowFormatDate() + " 00:00:00", //默认今天
                eTime: getNowFormatDate() + " 23:59:59",
                list:'',
                filter: {},
                dataGrain: 'hour',
            },
            isReportHide: true,
        }
    },
    mounted() {
        this.init(this.permission);
        // this.getList();
    },
    methods: {
        // 根据权限进行初始化
        init(permission) {
            // var sub,item,obj = this.obj;
            this.obj.firstTab = [
                permission.view[101] 
                ? {'name':'投放报表','active':'1',url:'/dsp/rpt/loc/camp','thTil':'活动','tdTil':'campName',type: 1}
                : '' ,
                permission.view[102] 
                ? {'name':'媒体报表','active':'2',url:'/dsp/rpt/loc/app','thTil':'APP','tdTil':'appName',type: 1}
                : '' ,
                permission.view[103] 
                ? {'name':'定向报表','active':'3',url:'/dsp/rpt/loc/platform','thTil':'操作系统','tdTil':'platformTag'}
                : '' 
            ];
            this.obj.secondTab = [
                permission.view[124]
                ? {'name':'活动报表','active':'1',url:'/dsp/rpt/loc/camp','thTil':'活动','tdTil':'campName',type: 1}
                : '',
                permission.view[125]
                ? {'name':'订单报表','active':'2',url:'/dsp/rpt/loc/order','thTil':'订单','tdTil':'orderName',type: 2}
                : '',
                permission.view[126]
                ? {'name':'素材报表','active':'3',url:'/dsp/rpt/loc/ad','thTil':'素材','tdTil':'adName',type: 2}
                : '',
                permission.view[127]
                ? {'name':'时间报表','active':'4',url:'/dsp/rpt/loc/time','thTil':'时间','tdTil':'tsName',type: 1}
                : '',
                permission.view[116]
                ? {'name':'地域报表','active':'5',url:'/dsp/rpt/loc/location','thTil':'地域','tdTil':'locTag'}
                : '',
            ];
            this.obj.secondTabMe = [
                permission.view[120] 
                ? {'name':'App报表','active':'1',url:'/dsp/rpt/loc/app','thTil':'APP','tdTil':'appName',type: 2}
                : '',
                permission.view[121] 
                ? {'name':'广告位报表','active':'2',url:'/dsp/rpt/loc/place','thTil':'广告位','tdTil':'placeName',type: 2}
                : '',
                permission.view[122] 
                ? {'name':'行业包报表','active':'3',url:'/dsp/rpt/industry/package/rpt','thTil':'行业包','tdTil':'pkgName',type: 2}
                : '',
                permission.view[123] 
                ? {'name':'人群包报表','active':'4',url:'/dsp/rpt/people/package/rpt','thTil':'人群包','tdTil':'pkgName',type: 2}
                : '',
            ]
        },
        //一级tab切换----投放、媒体、场景
        firstTabFuc(currid,item) {
            this.obj.firstTabFlag = currid;
            this.getChartDate(item.url,item.thTil,item.tdTil)
            this.getTotal(item.url,this.obj)
            this.obj.secondTabFlag = 1;
            this.obj.type = item.type;
            this.obj.secondTabMeFlag = 1;
        },
        //投放报表的二级
        secondTabFuc(currid,item) {
            this.obj.secondTabFlag = currid;
            this.getChartDate(item.url,item.thTil,item.tdTil)
            this.obj.type = item.type;
            this.getTotal(item.url,this.obj)
        },
        //媒体报表的二级
        secondTabMeFuc(currid,item) {
            this.obj.secondTabMeFlag = currid;
            this.getChartDate(item.url,item.thTil,item.tdTil);
            if(item.tdTil != "pkgName") {
                this.getTotal(item.url,this.obj)
            }
        },
        //请求报表数据
        getReport(url,obj){
            var data = {
                sTime : this.obj.sTime,
                eTime : this.obj.eTime,
                "filter": this.obj.filter,
                "dataGrain":this.obj.dataGrain,
                "size": "99999"
            }
            this.$ajax({
                url: url,
                data: data,
                load: true
            }).then(res => {
                this.obj.reportList =  res.data.data;
                // exportCsv({
                //     title: [''+obj.title+'','曝光量','点击量','点击率','花费','转化量','CPM（元）','cpc（元）'],
                //     titleForKey: [''+obj.name+'','view','click','clickRate','advertiserCost','action','cpm','cpc'],
                //     data: obj.reportList,
                // },""+ obj.title+"报表.csv");
            })
        },
        //请求报表数据
        getTotal(url,obj) {
            var data = {
                sTime : this.obj.sTime,
                eTime : this.obj.eTime,
                "filter": this.obj.filter,
                "dataGrain":this.obj.dataGrain,
                "size": "99999"
            }
            this.$ajax({
                url: url+"/sum",
                data: data,
                load: true
            }).then(res => {
                this.obj.total =  res.data.data[0];
            })
        },
        getChartDate(url,thTil,tdTil,current,titleSub,orderID){
            var data = {
                sTime : this.obj.sTime,
                eTime : this.obj.eTime,
                "filter": this.obj.filter,
                "dataGrain":this.obj.dataGrain,
                "page": (current || 1)+"",
                "size": "20"
            }
            if(orderID) {
                data.filter.orderID = orderID
            }
            this.$ajax({
                url: url,
                data: data,
                load:true
            }).then(res => {
                    this.obj.title=thTil;
                    this.obj.titleSub=titleSub;
                    this.obj.name = tdTil;
                    this.obj.url = url;
                    this.obj.titleSub = titleSub;
                    this.obj.orderID = orderID;
                    this.chartDate = {
                        advertiserCost: [],
                        view: [],
                        click: [],
                        clickRate: [],
                        action: [],
                        actionRate: [],
                        cpm: [],
                        cpc: [],
                    }
                    this.chartDate[tdTil]=[];
                    this.obj.list = res.data.data;

                    $("#pageToolbar").html("");
                    $('#pageToolbar').Paging({
                        pagesize:  '20',
                        current: current || '1',
                        count:res.data.total,
                        hash: false,
                        toolbar: false,
                        callback:function(current){
                            this.getChartDate(url,thTil,tdTil,current,titleSub,orderID)
                        }});
                    var chartDate = this.chartDate;
                    res.data.data.forEach(function(v){
                        chartDate[tdTil].push(v[tdTil]);
                        chartDate.advertiserCost.push(v.advertiserCost);
                        chartDate.view.push(v.view);
                        chartDate.click.push(v.click);
                        chartDate.clickRate.push(v.clickRate);
                        chartDate.action.push(v.action);
                        chartDate.actionRate.push(v.actionRate);
                        chartDate.cpm.push(v.cpm);
                        chartDate.cpc.push(v.cpc);
                        //chartDate.advertiserCost.push((Math.random()*100).toFixed(2));
                        //chartDate.view.push((Math.random()*100).toFixed(2));
                        //chartDate.click.push((Math.random()*100).toFixed(2));
                        //chartDate.clickRate.push((Math.random()*100).toFixed(2));
                        //chartDate.action.push((Math.random()*100).toFixed(2));
                        //chartDate.actionRate.push((Math.random()*100).toFixed(2));
                        //chartDate.cpm.push((Math.random()*100).toFixed(2));
                        //chartDate.cpc.push((Math.random()*100).toFixed(2));
                    })
                    this.chartOpt = {
                        data1:chartDate.click,
                        data2:chartDate.view,
                        title1:"点击",
                        title2:"曝光",
                        xAxis:chartDate[tdTil],
                    }
                    // setChart(this.chartOpt)
            })
        },
    }
}
</script>

<style lang="less">

.reportEff-page {
  color: #fff;
  .nav-tabs>li{cursor: pointer;}
  .tab-content div.report{display: none;}
  .tab-content div.active{display: block;}
  .tab-content .dropdown-filter .btn{padding: 3px 12px;}
  // .tab-content-tab li.active{color: #fff;}
  .page-title {
    .dropdown-filter {
      float: right;
    }
  }
  .tab-content-tab li {
    width: 190px;
  }
  .chart {
    width: 100%;
    height: 360px;
    margin-top: 20px;
  }
  .tabs-box {
    margin-top: 20px;
  }
  .table-box {
    margin-top: 20px;
  }
  .nav-tabs {
    border: none;
    >li>a{
        display: block;
    }
  }
  .tab-content {
    border-top: none;
    position: relative;
  }
  .search-chart {
    padding-left: 30px;
    .form-group {
      float: left;
      padding-left: 60px;
      margin-right: 20px;
      > label {
        width: 80px;
        text-align: left;
      }
    }
    .dropdown-toggle {
      width: 120px;
      min-width: 120px;
    }
    .dropdown-menu {
      min-width: 120px;
    }
  }
  .chart-hide {
    font-size: 16px;
    left: 50%;
    margin-left: -9px;
    margin-top: 20px;
    cursor: pointer;
    color: #5ab1ef;
  }
}
</style>