<template>
    <div class="skuM-page page">
        <!--页面标题-->
        <h3 class="page-title">合约资源管理</h3>
        <div class="chargeBox">
            <div class="filter-box">
                <dropdown-date callback="chooseDate" has-all="true"></dropdown-date>
            </div>

        </div>
        <!--表格-->
        <div class="table-box">
            <div class="table-title">
                <h3 class="table-title-font">合约资源列表</h3>
                <dropdown style="margin-top:30px;" title="全部采买类型" :list="dealTypeList" valueName="name"></dropdown>
                <dropdown style="margin-top:30px;" title="全部资源类型" :list="chargeTypeList" valueName="name"></dropdown>
                <dropdown style="margin-top:30px;" title="全部平台" :list="platformList" valueName="name"></dropdown>
                <dropdown style="margin-top:30px;" title="全部状态" :list="stateList" valueName="name"></dropdown>
                <!-- <search placeholder="请输入名称" value="filter.name" callback="search"></search> -->
            </div>
            <table>
                <thead>
                <tr>
                    <th>状态</th>
                    <th>adxID</th>
                    <th>dealID</th>
                    <th>资源名称</th>
                    <th>采买时段</th>
                    <th>所属平台</th>
                    <th>资源类型</th>
                    <th>采买类型</th>
                    <th>单价(元/千次曝光)</th>
                    <th>量级(千次曝光/每天)</th>
                    <th class="space-info">广告位信息</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in list" :key="item.id">
                    <td ng-bind="item.executeState" ng-class="{state1: item.executeState=='执行中',state2: item.executeState=='交易结束',state3: item.executeState=='已售罄'}"></td>
                    <td ng-bind="item.adxID"></td>
                    <td ng-bind="item.adxDealID"></td>
                    <td ng-bind="item.name"></td>
                    <td>
                        <p v-for="data in item.date.split(';')">{{data}}</p>
                    </td>
                    <td>{{item.platform}}</td>
                    <td>{{item.chargeType}}</td>
                    <td ng-bind="item.skuType"></td>
                    <td ng-bind="item.price"></td>
                    <td ng-bind="item.amount"></td>
                    <td style="text-align: left;padding-left: 20px">
                        <p v-for="space in item.spaceInfo.split(';')">{{space}}</p>
                    </td>
                    <td><button class="dsp-btn btn-blue">查看详情</button></td>
                </tr>
                </tbody>
            </table>
            <skPage id="pageToolbar" :page="pageObj" @change="getList"></skPage>
        </div>
    </div>
</template>

<script>
import {mixin} from './agentMCommon.js'
export default {
    mixins: [mixin],
    data() {
        return {
            pageObj: {
                currentPage: 1,
                size: 20,
                total: 0
            },
            list: []
        }
    },
    methods: {
        getList () {

        }
    }
}
</script>

<style lang="less">

</style>