<template>
    <div v-if="SKIN != 1" class="demo-page" :style="SKIN == '3' ? 'color: #000;' : ''">
        <div class="page">
            <h3 class="page-title">基础组件</h3>
            <!-- <button style="position: absolute; top: 11%; right: 5%;" @click="toggleSkin(SKIN)">切换皮肤</button> -->
        </div>
        1、搜索框<search-sk @search="search"></search-sk>
        2、下拉框（圆角）<Dropdown :list="chartTargetList" title="曝光量" valueName="name" @change="selectRight"></Dropdown><br/>
        3、按钮（样式一）<button type="button" class="dsp-btn btn-blue newActive">新建活动</button><br/>
        4、按钮（样式二）<button type="button" class="dsp-btn btn-white newActive">查看报表</button><br/>
        5、下拉框可输入<dropdownInput :list="chartTargetList"></dropdownInput>
        6、时间选择<dropdown-date callback="chooseDate" has-all="true"></dropdown-date><br/>
        7、输入框<div class="form-group">
            <input type="text" class="form-control"/>
        </div>
        8、分页
        <div class="page" id="pageToolbar"></div>
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
    </div>
    <div v-else>
        <div class="page">
            <h3 class="page-title">基础组件</h3>
        </div>
        <div class="content">
            1、搜索框<search @search="search" placeholder="公司名称"></search><br/><br/>
            2、下拉框（圆角）<dsp-select
                        title="全部类型"
                        :list="filterType"
                        valueName="name"
                        keyName="action"
                        @change="selectType"
                    ></dsp-select><br/><br/>
            3、按钮（样式一）<dsp-button
                                type="success"
                                size="mini"
                                round
                                plain
                            >充值</dsp-button><br/><br/>
            4、按钮（样式二）<dsp-button
                                type="primary"
                                size="mini"
                                round
                                plain
                                @click="showMask('putin',item)"
                            >充值</dsp-button><br/><br/>
            6、时间选择<dsp-date></dsp-date><br/><br/>
            7、输入框<m-Input placeholder="输入订单名称" size="big" maxlength="30"></m-Input>
            8、分页
            <!-- <div class="table content">
                <div class="scroll-wrap">
                    <div class="h-bar"></div>
                </div>
                <admin-page id="pageToolbar" :page="pageObj"></admin-page>  
            </div> -->
            <admin-page id="pageToolbar" :page="pageObj"></admin-page>  

            9、单选框和多选框<m-Radio :list="[{'label': 'cpm', 'name': 'CPM'}]" :size="'big'"></m-Radio>
                            <m-Radio :list="[{'label': 'cpc', 'name': 'CPC'}]" :size="'big'" style="margin-left:50px;"></m-Radio><br/>
                <mCheck keyName="label">a</mCheck>
                <mCheck keyName="label">b</mCheck><br/>
            10、图表
            <chart :targetList="chartTargetList" :data="chartData"></chart>
        </div>
    </div>
</template>
<script>
import { getNowFormatDate } from "@/common/js/utils";
import Dropdown from "@/common/old_components/Dropdown";
import ChartBox from "@/common/components/Chart-Box";
import Target from "@/common/components/target"; 
import Chart from "@/common/components/chart";
import * as Paging from "@/common/js/paging"
import dspSelect from "@/common/components/select";
import dspDate from "@/common/components/select-data";
import Page from "@/common/components/page";
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
            },
            filterType: [
                { action: "", name: "全部类型" },
                { action: "purchase", name: "合约扣款" },
                { action: "deposit", name: "充值" },
                { action: "withdraw", name: "提取" }
            ],
            featureSupportList: [{'label':'1', 'name':'Deeplink'},
                                {'label':'2', 'name':'一键下载'},
                                {'label':'3', 'name':'GIF动图'}],
        }
    },
    mounted() {
        this.getList()
        this.getTarget();
        this.getChartData();
    },
    methods: {
        selectType(val) {
            this.pageObj.currentPage = 1;
            this.filter.action = val.action;
        },
        search(val) {
            console.log( val )
        },
        selectRight(val){

        },
        getList(current, pagesize) {
            var data = {
                'page': (current || 1)+"",
                'size': (pagesize || 20)+"",
                "sort": ["cTime,1"],
                'filter': this.filter
            };
            this.$ajax({
                url: '/dsp/creative/list',
                data: data,
                load: true
            }).then(res => {
                // 获得列表
                var data = res.data.data;
                this.list = data;

                $("#pageToolbar").html("");
                $('#pageToolbar').Paging({
                    pagesize: pagesize || '20',
                    current: current || '1',
                    count: res.data.total,
                    toolbar: true,
                    'hash': false,
                    callback: this.getList
                });
            })
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
        dspSelect,
        dspDate,
        adminPage: Page
    }
}
</script>
<style lang="less">
.demo-page{
    color: #fff;
}
</style>