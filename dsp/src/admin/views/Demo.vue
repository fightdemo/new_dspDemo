<template>
    <div class="demo-page">
        <div class="page">
            <h3 class="page-title">基础组件</h3>
        </div>
        1、搜索框<search-sk @search="search"></search-sk>
        2、下拉框（圆角）<Dropdown :list="chartTargetList" title="曝光量" valueName="name" @change="selectRight"></Dropdown><br/>
        3、按钮（样式一）<button type="button" class="dsp-btn btn-blue newActive">新建活动</button><br/>
        4、按钮（样式二）<button type="button" class="dsp-btn btn-white newActive">查看报表</button><br/>
        5、下拉框可输入<dropdownInput :list="chartTargetList"></dropdownInput>
        6、时间选择<dropdown-date callback="chooseDate" has-all="true"></dropdown-date>
        7、输入框<div class="form-group">
            <input type="text" class="form-control"/>
        </div>
        8、分页<skPage id="pageToolbar" :page="pageObj" @change="getList"></skPage>
        9、单选框和多选框   <radio-sk module="position.income" value="all">不限</radio-sk>
        <radio-sk module="position.income" value="custom">指定</radio-sk>
        <div class="form-group" style="padding-left: 66px;" ng-show="position.income=='custom'">
            <check-sk value="1" module="position.incomes">1000RMB以下</check-sk>
            <check-sk value="2" module="position.incomes">1001-3000RMB</check-sk>
            <check-sk value="3" module="position.incomes">3001-5000RMB</check-sk>
            <check-sk value="4" module="position.incomes">5001-10000RMB</check-sk>
            <check-sk value="5" module="position.incomes">10000RMB以上</check-sk>
        </div>
        10、图表
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
        11、查询图片
        <a href="javascript:;" @click="showPhoto('http://res1.hubcloud.com.cn/dsp/oem/2019/9/9/1568022345990.png')">查看</a>
    </div>
</template>
<script>
import { getNowFormatDate } from "@/common/js/utils";
import Dropdown from "@/common/old_components/Dropdown";
import ChartBox from "@/common/components/Chart-Box";
import Target from "@/common/components/target"; 
import Chart from "@/common/components/chart";
export default {
    data() {
        return {
            sTime: getNowFormatDate() + " " + "00:00:00",
            eTime: getNowFormatDate() + " " + "23:59:59",
            chartTargetList: [
                {id:"click",name:"点击量"},
                {id:"clickRate",name:"点击率"},
                {id:"view",name:"曝光量"},
                {id:"action",name:"转化"},
                {id:"actionRate",name:"转化率"},
                {id:"cpm",name:"cpm"},
                {id:"cpc",name:"cpc"},
            ],
            pageObj: {
                currentPage: 1,
                size: 20,
                total: 0
            },
            chartData:{},
            defalutTarget: {
                data1: [],
                data2: [],
                title1: "点击量",
                title2: "曝光量",
                xAxis: []
            }
        }
    },
    mounted() {
        this.getTarget();
        this.getChartData();
    },
    methods: {
        search(val) {
            console.log( val )
        },
        selectRight(val){

        },
        getList() {

        },
        showPhoto(url){
            if(url) {
                this.$layer.photos({
                    photos:{
                        "title": "", //相册标题
                        "id": 1, //相册id
                        "start": 0, //初始显示的图片序号，默认0
                        "data": [   //相册包含的图片，数组格式
                            {
                                "alt": "",
                                "pid": 2, //图片id
                                "src": url, //原图地址
                                "thumb": "" //缩略图地址
                            }
                        ]
                    },
                    anim: 5
                })
            }
        },
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
        selectLeft(val) {
            this.defalutTarget.data1 = this.chartData[val.id];
            this.defalutTarget.title1 = val.name;
        },
        selectRight(val) {
            this.defalutTarget.data2 = this.chartData[val.id];
            this.defalutTarget.title2 = val.name;
        }
    },
    components:{
        'Dropdown': Dropdown,
        'Chart-Box': ChartBox,
        'target': Target,
        'chart': Chart,
    }
}
</script>
<style lang="less">
.demo-page{
    color: #fff;
}
</style>