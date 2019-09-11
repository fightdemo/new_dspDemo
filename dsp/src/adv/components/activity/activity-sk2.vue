<template>
    <div class="active-page page">
        <!--页面标题-->
        <h3 class="page-title">
            活动管理
            <dropdown title="选择状态" list="select"></dropdown>
        </h3>
        <!--表格-->
        <div class="table-box">
            <div class="table-title">
                <h3 class="table-title-font">活动列表</h3>
                <button ng-if='obj.permission.act["活动"].sub["新建"]' type="button" class="dsp-btn btn-blue newActive" @click="addActivity()">新建活动</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th n-if='obj.permission.act["活动"].sub["编辑"]'>状态</th>
                    <th>ID</th>
                    <th>名称</th>
                    <th>频次</th>
                    <th>总预算</th>
                    <th>日预算</th>
                    <th>活动时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in list" :key="item.activityID">
                    <td v-if="permission.act[63]">
                        <switch v-if="item.open = item.state == 10" callback="setStatus" value="item" ></switch>
                    </td>
                    <td>{{item.activityID}}</td>
                    <td>
                        <a>{{item.name}}</a>
                    </td>
                    <td class="frequency">
                        <div v-show="item.editFlag" v-if="item.frequency ==''||item.frequency=='0'">
                            不限定 
                        </div>

                        <div v-show="item.editFlag" v-if="item.frequency !=''&&item.frequency!='0'">
                            {{item.frequency}}次/{{item.frequencyUnit=='day'?'天':'小时'}} <b class="icon-edit" @click="item.editFlag = !item.editFlag"></b>
                        </div>


                        <div class="edit-box" v-show="!item.editFlag">
                            <input type="text" class="form-control" v-model="changeNum"/>
                            <b class="icon icon-ok" @click="changeFre(item, changeNum);"></b>
                            <b class="icon icon-cancel" @click="item.editFlag = !item.editFlag"></b>
                        </div>
                    </td>
                    <td>{{item.totalBudget == 0 ? "无限制":item.totalBudget}}</td>
                    <td>{{item.dayBudget == 0 ? "无限制":item.dayBudget}}</td>
                    <td v-if="!item.endTime">{{item.startTime}}-不限</td>
                    <td v-if="item.endTime">{{item.startTime.split(' ')[0]}} — {{item.endTime.split(' ')[0]}}</td>
                    <td>
                        <a ng-if='obj.permission.act["活动"].sub["编辑"]' class="dsp-btn btn-blue" ui-sref="agent.newActive({'appID':item.activityID})">编辑</a>
                        <a ng-if='obj.permission.act["活动"].sub["新建"]' class="dsp-btn btn-blue" ng-click="newOrder(item)">新建订单</a>
                        <a ng-if='obj.permission.act["活动"].sub["查看报表"]' class="dsp-btn btn-white" ui-sref="agent.report.effect({'activeID':item.activityID,'activeName':item.name,'orderID':'0','orderName':'0'})">查看报表</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div id="pageToolbar" class="page"></div>
        </div>

    </div>
</template>

<script>
import * as Paging from "@/common/js/paging"
export default {
    mounted() {
        console.log()
        this.getList()
    },
    data() {
        return {
            list: [],
            changeNum: ''
        }
    },
    methods: {
        // 修改频次
        changeFre(item, num) {
            this.$ajax({
                url: '/dsp/activity/modify',
                data: {
                    data:{
                        'frequency': num,
                        'activityID': item.activityID
                    }
                }
            }).then(res => {
                item.frequency=num;
                item.editFlag = !item.editFlag;
            })

        },

        // 获取活动列表
        getList(current, pagesize) {
            var data = {
                'page': (current || 1)+"",
                'size': (pagesize || 20)+"",
                'filter':{
                    // 'state': $scope.obj.status,
                },
                "sort": ["cTime,1"],
            };
            this.$ajax({
                url: '/dsp/activity/list',
                data: data,
                load: true
            }).then(res => {
                // 获得列表
                var data = res.data.data;
                data.forEach(item => {
                    item.editFlag = true;
                })
                this.list = data;
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

        // 新建活动
        addActivity(id) {
            this.$router.push({
                name: "delivery.activityAdd",
                params: { id: id }
            });
        },
    }
}
</script>

<style lang="less">
.active-page {
  td {
    vertical-align: middle;
    .form-control {
      width: 150px;
    }
    > a {
      margin: 5px;
    }
  }
  .frequency {
    width: 150px;
    .icon-edit {
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
      width: 16px;
      height: 16px;
      margin-left: 5px;
      background: url(../../../common/img/sk2-images/icon_edit_gray.png) center center no-repeat;
    }
    .edit-box {
      position: relative;
      .icon {
        width: 11px;
        height: 11px;
        cursor: pointer;
        margin-right: 3px;
        position: absolute;
        top: 12px;
      }
      .icon-ok {
        right: 17px;
        background: url(../../../common/img/sk2-images/icon_edit_ok.png) no-repeat center center;
      }
      .icon-cancel {
        right: 4px;
        background: url(../../../common/img/sk2-images/icon_edit_cancel.png) no-repeat center center;
      }
    }
  }
  .dateBox{display: inline-block;}
  .table-title .dsp-btn {
    margin-top: 16px;
    margin-right: 20px;
    float: right;
  }


  a.btn-white:hover {
    color: #000000;
  }
  a.btn-blue:hover {
    color: #fff;
  }
}
.orderType {
  width: 100%;
  height: 100%;
  display: none;
  a {
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    div {
      width: 153px;
      margin: 0 auto;
      margin-top: 70px;
    }
    p {
      font-size: 16px;
      line-height: 35px;
      color: #595959;
    }
  }
}
.layer-style {
  border-radius: 5px;
}
</style>