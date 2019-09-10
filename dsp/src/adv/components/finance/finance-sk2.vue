<template>
    <div class="trade-page page">
        <h3 class="page-title">
            财务信息
            <dropdownDate></dropdownDate>
        </h3>

        <ul class="deal-list">
            <li>
                <p>{{time}}充值</p>
                <h3>{{obj.inCome|number}}</h3>
            </li>
            <li>
                <p>{{time}}消费</p>
                <h3>{{obj.cost|number}}</h3>
            </li>
            <li class="empty"></li>
            <li class="empty"></li>
            <li class="empty"></li>
        </ul>
        <div class="table-box">
            <div class="table-title">
                <h3 class="table-title-font">财务信息列表</h3>
            </div>
            <table>
                <thead>
                <tr>
                    <th>交易类型</th>
                    <th>操作日期</th>
                    <th>交易金额</th>
                    <th>操作说明</th>
                    <!--<th>账户余额</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td ng-if="item.action=='adverIn'">充值</td>
                    <td ng-if="item.action=='adverOut'">转出</td>
                    <td>{{item.cTime}}</td>
                    <td>{{item.money}}</td>
                    <td>{{item.comment}}</td>
                </tr>
                </tbody>
            </table>
            <div id="pageToolbar" class="page"></div>

        </div>

    </div>
</template>

<script>
import { getNowFormatDate, exportCsv } from "@/common/js/utils";
export default {
    data() {
        return {
            list: [],
            time: "",
            obj: {
                sTime: getNowFormatDate() + " 00:00:00",
                eTime: getNowFormatDate() + " 23:59:59"
            },
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList(current, pagesize) {
            var data = {
                'page': (current || 1)+"",
                'size': (pagesize || 20)+"",
                "filter": {
                    "relateAccount": this.$route.params.advID,
                    "action":"adverIn,adverOut",
                },
                'sTime' : this.obj.sTime,
                'eTime' : this.obj.eTime,
                "sort": ["cTime,1"],
            };
            this.$ajax({
                url:'/dsp/advertiser/transaction',
                data: data,
                load:true
            }).then(res => {
                // 获得列表
                this.list = res.data.data;
                $("#pageToolbar").html("");
                $('#pageToolbar')
                .Paging({
                    pagesize: pagesize || '20',
                    current: current || '1',
                    count: res.data.total,
                    toolbar: true,
                    'hash': false,
                    callback: this.getList
                });
            })
        },
    }
}
</script>

<style lang="less">
.trade-page {
  .trade-list {
    float: left;
    margin-top: 3px;
    border: 1px solid #e1e5ec;
    border-radius: 5px;
    font-size: 12px;
    li {
      padding: 5px 15px;
      float: left;
      color: #eec35d;
      b {
        font-weight: bold;
      }
    }
    li:last-child {
      color: #ee7f5d;
      border-left: 1px solid #e1e5ec;
    }
  }
}
</style>