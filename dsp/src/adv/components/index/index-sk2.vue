
<template>
        
    <div class="active-page page ng-scope">
        <!--页面标题-->
        <h3 class="page-title">首页</h3>

        <!--总计列表-->
        <ul class="deal-list">
            <li v-for="item in targetList" :key="item.name">
                <p>{{item.name}}</p>
                <h3 class="ng-binding">{{item.t}}</h3>
            </li>
        </ul>

        <!--趋势分析-->
        <div class="chart-box bs">
            <div class="chart-title">
                <div class="form-group fr">
                    <label>线状指示</label>
                    <Dropdown :list="chartTargetList" title="曝光量" valueName="name" @change="selectRight"></Dropdown>
                </div>
                <div class="form-group fr">
                    <label>柱状指示</label>
                    <Dropdown :list="chartTargetList" title="点击量" valueName="name" @change="selectLeft"></Dropdown>
                </div>
                <h3>趋势分析</h3>
            </div>
            <Chart-Box :data="chartData" :targetList="defalutTarget"></Chart-Box>
        </div>
    </div>    

</template>
<script>
import { getNowFormatDate } from "@/common/js/utils";
import Target from "@/common/components/target"; 
import Chart from "@/common/components/chart";
import Dropdown from "@/common/components/Dropdown";
import ChartBox from "@/common/components/Chart-Box";
export default {
    data(){
        return {
            sTime: getNowFormatDate() + " " + "00:00:00",
            eTime: getNowFormatDate() + " " + "23:59:59",
            targetData: {},
            targetList: [
                {
                    name: '代理商当日花费',
                    t: 'dspCost',
                    yT: 'ytdspCost',
                    ybT: 'ybtdspCost'
                   
                },{
                    name: '当日成本',
                    t: 'adminCost',
                    yT: 'ytadminCost',
                    ybT: 'ybtadminCost'
                },{
                    name: '当日利润',
                    t: 'adminProfit',
                    yT: 'ytadminProfit',
                    ybT: 'ybtadminProfit'
                    
                },{
                    name: '当日利润率',
                    t: 'adminProfitRate',
                    isRate: true,
                    yT: 'ytadminProfitRate',
                    ybT: 'ybtadminProfitRate'
                },{
                    name: 'CPM',
                    t: 'cpm',
                    yT: 'ytcpm',
                    ybT: 'ybtcpm'
                },{
                    name: 'CPC',
                    t: 'cpc',
                    yT: 'ytcpc',
                    ybT: 'ybtcpc'
                }
            ],
            chartData:{},
            chartTargetList: [
                {id:"click",name:"点击量"},
                {id:"clickRate",name:"点击率"},
                {id:"view",name:"曝光量"},
                {id:"action",name:"转化"},
                {id:"actionRate",name:"转化率"},
                {id:"cpm",name:"cpm"},
                {id:"cpc",name:"cpc"},
            ],
            defalutTarget: {
                data1: [],
                data2: [],
                title1: "点击量",
                title2: "曝光量",
                xAxis: []
            }
        }
    },
    mounted(){
        this.getTarget();
        this.getChartData();
    },
    methods: {
        // 获取汇总数据
        getTarget(){
            this.$ajax({
                url: '/dsp/rpt/admin/summary',
                data:{
                    eTime: this.eTime,
                    sTime:this.sTime,
                    filter:{},
                },
                load: true
            }).then(res=>{
                var Obj = {};
                this.targetData = res.data;
                var todayObj = res.data.today;
                for(const key in todayObj){
                    Obj[key] = todayObj[key];
                }
                var yesterday = res.data.yesterday;
                for(const key in yesterday){
                    Obj['yt'+key] = yesterday[key];
                }
                var beforeYesterday = res.data.beforeYesterday;
                for(const key in beforeYesterday){
                   Obj['ybt'+key] = beforeYesterday[key];
                }
                this.targetData = Obj;
            })
        },
        // 趋势图数据
        getChartData(){
            this.$ajax({
                url: '/dsp/rpt/admin/time',
                data:{
                    dataGrain: "hour",
                    eTime: this.eTime,
                    filter: {},
                    page: "1",
                    sTime: this.sTime,
                    size: "20"
                },
                load: true
            }).then(res=>{
                var chartDate = {
                    xAxis: [],
                    advertiserCost: [],
                    view: [],
                    click: [],
                    clickRate: [],
                    action: [],
                    actionRate: [],
                    cpm: [],
                    cpc: []
                }
                res.data.forEach(function(v){
                    chartDate.xAxis.push(v.tsName);
                    chartDate.advertiserCost.push(v.advertiserCost);
                    chartDate.view.push(v.view);
                    chartDate.click.push(v.click);
                    chartDate.clickRate.push(v.clickRate);
                    chartDate.action.push(v.action);
                    chartDate.actionRate.push(v.actionRate);
                    chartDate.cpm.push(v.cpm);
                    chartDate.cpc.push(v.cpc);
                })
                this.chartData = chartDate;
                this.defalutTarget = {
                    data1: chartDate.click,
                    data2: chartDate.view,
                    title1: "点击量",
                    title2: "曝光量",
                    xAxis: chartDate.xAxis
                }
            })
        },
        // 柱状指示
        selectLeft(val) {
            this.defalutTarget.data1 = this.chartData[val.id];
            this.defalutTarget.title1 = val.name;
        },
        // 线状指示
        selectRight(val) {
            this.defalutTarget.data2 = this.chartData[val.id];
            this.defalutTarget.title2 = val.name;
        }
    },
    components:{
        'target': Target,
        'chart': Chart,
        'Dropdown': Dropdown,
        'Chart-Box': ChartBox,
    }
    
}
</script>
<style lang="less">
</style>