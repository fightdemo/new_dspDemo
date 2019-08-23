<template>
    <div class="agentRep-page page">
        <!--页面标题-->
        <h3 class="page-title">
            报表中心
            <dropdown-date class="dropdownDate" @chooseDate="chooseDate"></dropdown-date>
        </h3>
        <!--表格-->
        <div class="table-box">
            <div class="table-title">
                <h3 class="table-title-font">代理商报表</h3>
                <div class="table-download" @click="download()"></div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>代理商ID</th>
                        <th>代理商名称</th>
                        <th>曝光数</th>
                        <th>点击数</th>
                        <th>点击率</th>
                        <th>到达数</th>
                        <th>转化</th>
                        <th>转化率</th>
                        <th>CPM单价（元）</th>
                        <th>CPC单元（元）</th>
                        <th>代理商成本</th>
                        <th>代理商利润</th>
                        <th>代理商利润率</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in tableList" :key="index">
                    <td>{{ item.dspID }}</td>
                    <td>{{ item.dspName }}</td>
                    <td>{{ item.view|number }}</td>
                    <td>{{ item.click|number }}</td>
                    <td>{{ item.clickRate*100|number(2)}}%</td>
                    <td>{{ item.arrive|number }}</td>
                    <td>{{ item.action|number }}</td>
                    <td>{{ item.actionRate*100|number(2)}}%</td>
                    <td>{{item.cpm ? fmoney(item.cpm, 2) : '-'}}</td>
                    <td>{{item.cpc ? fmoney(item.cpc, 2) : '-'}}</td>
                    <td>{{item.dspCost ? fmoney(item.dspCost, 2) : '-'}}</td>
                    <td>{{item.dspProfit ? fmoney(item.dspProfit, 2) : '-'}}</td>
                    <td>{{ item.dspProfitRate*100|number(2)}}%</td>
                </tr>
                </tbody>
            </table>
            <skPage id="pageToolbar" :page="pageObj" @change="getList"></skPage>
        </div>
    </div>
</template>
<script>
import adminDate from "@/common/components/select-data";
import adminSearch from "@/common/components/search";
import { floatScroll, getNowFormatDate } from "@/common/js/utils";
import {mixin} from '../views/Form/common.js'
export default {
    mixins: [mixin],
    data() {
        return {
            sTime: getNowFormatDate() + " " + "00:00:00",
            eTime: getNowFormatDate() + " " + "23:59:59",
            tableList: [],
            pageObj: {
                currentPage: 1,
                size: 20,
                total: 0
            },
            filter: {},
            transform: '',
            moveX: 0,
            url: "/dsp/rpt/all/saasdsp",
            title: [
                "代理商ID",
                "代理商名称",
                "点击量",
                "点击率",
                "到达量",
                "转化量",
                "花费(元)",
                "CPM(元)",
                "CPC(元)",
                "代理商成本"
            ],
            titleForKey: [
                "dspID",
                "dspName",
                "view",
                "click",
                "clickRate",
                "arrive",
                "action",
                "advertiserCost",
                "cpm",
                "cpc",
                "dspCost"
            ],
            reprotName: "代理商报表"
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        chooseDate(val) {
            if(val.start) {
                this.sTime = val.start + " 00:00:00";
                this.eTime = val.end + " 23:59:59";
            } else {
                this.sTime = this.eTime = undefined;
            }
            this.getList();
        },
        getList() {
            this.$ajax({
                url: "/dsp/rpt/all/saasdsp",
                data: {
                    page: this.pageObj.currentPage + "",
                    size: this.pageObj.size + "",
                    filter: this.filter,
                    eTime: this.eTime,
                    sTime: this.sTime,
                    sort: ["cTime,1"]
                },
                load: true
            }).then(res => {
                this.tableList = res.data.data;
                this.pageObj.total = res.data.total;
                this.pageObj.currentPage = res.data.page;
                this.$nextTick(this.init)
                // setTimeout(() => {
                //     this.init()
                // },1000)
            });
        },
        search(val) {
            this.pageObj.currentPage = "1";
            this.filter.dspName = val;
            this.getList();
            this.tableShow = true;
        },
        selectDate(val) {
            this.dataGrain = val.start == val.end ? "hour" : "day";
            this.sTime = val.start + " 00:00:00";
            this.eTime = val.end + " 23:59:59";
            this.getList();
        },     
    },
    components: {
        adminDate: adminDate,
        adminSearch: adminSearch,
    }
};
</script>
<style lang="less" scoped>
// .table{
//     overflow-y: hidden;
//     overflow-x: scroll;
//     white-space: nowrap;
// }
// .table-box{
//     width: 1593px;
// } 
</style>


