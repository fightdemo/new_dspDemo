<template>
    <div class="order-page page">
        <!--页面标题-->
        <h3 class="page-title">
            订单管理
            <!-- <dropdown-filter-input value="searchActive" list="activeList" placeholder="全部活动" click-callback="activeCall" key-up-callback='activeUp'></dropdown-filter-input> -->
        </h3>
        <div class="filter-box">
            <button v-if='permission.act[65] || permission.act[112]' class="dsp-btn btn-blue new-order" @click="newOrder()">
                新建订单
            </button>
        </div>
        <div class="filter-box">
            <dropdown title="竞价类型" list="typeList"></dropdown>
            <dropdown title="订单状态" list="statusList"></dropdown>
        </div>


         <!--表格-->
        <div class="table-box">
            <div class="table-title">
                <h3 class="table-title-font">订单列表</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>状态</th>
                        <th style="width: 40px;">ID</th>
                        <th>竞价类型</th>
                        <th>名称</th>
                        <th>所属活动</th>
                        <th style="width: 50px;">总预算</th>
                        <th style="width: 50px;">频次</th>
                        <th>投放速率</th>
                        <th>出价</th>
                        <th style="width: 70px;">实时分钟花费（元）</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in list" :key="item.id">
                    <tr @click="showSpace(item, $event);" style="cursor: pointer;">
                        <td style="min-width: 85px;">
                            <span class="close fl" :class="{'icon-open': item.showFlag}"></span>
                            <div v-if='permission.act[67]'>
                                <!-- <switch ng-init="item.open = item.state == 10" callback="setStatus" value="item" index="{{$index}}"></switch> -->
                            </div>
                        </td>
                        <td>{{item.id}}</td>
                        <td v-if="item.type=='pdb' || item.type=='pd'">合约交易</td>
                        <td v-if="item.type=='rtb'">竞价交易</td>
                        <td class="frequency">
                            <div v-show="!item.nameFlag">
                            {{item.name}}<b v-if='permission.act[67]' class="icon-edit" ng-click="editName(item, $event)"></b>
                            </div>
                            <div class="edit-box" v-show="item.nameFlag">
                                <input type="text" class="form-control" ng-click="$event.stopPropagation();" ng-model="item.name"/>
                                <b class="icon icon-ok" ng-click="nameChange(item,'name','nameFlag',$event)"></b>
                                <b class="icon icon-cancel" ng-click="editName(item, $event)"></b>
                            </div>
                        </td>
                        <td>{{item.activityName}}</td>
                        <td v-if="item.orderBudget=='0.00'">无限制</td>
                        <td v-if="item.orderBudget!='0.00'" class="frequency">
                            <div v-show="!item.orderBudgetFlag">
                                {{item.orderBudget}} <b v-if='permission.act[67]' class="icon-edit" ng-click="editMoney(item, $event);"></b>
                            </div>
                            <div class="edit-box" v-show="item.orderBudgetFlag">
                                <input type="text" class="form-control" ng-click="$event.stopPropagation();" ng-model="item.orderBudget"/>
                                <b class="icon icon-ok" ng-click="nameChange(item,'orderBudget','orderBudgetFlag',$event)"></b>
                                <b class="icon icon-cancel" ng-click="editMoney(item, $event);"></b>
                            </div>
                        </td>

                        <td v-if="item.frequencyUnit=='day' && item.frequencyLimit!='0'" class="frequency">
                            <div v-show="!item.frequencyLimitFlag">
                                {{item.frequencyLimit}}/天 <b v-if='permission.act[67]' class="icon-edit" ng-click="editPrice(item, $event);"></b>
                            </div>
                            <div class="edit-box" v-show="item.frequencyLimitFlag">
                                <input type="text" class="form-control" ng-click="$event.stopPropagation();" ng-model="item.frequencyLimit"/>
                                <b class="icon icon-ok" ng-click="nameChange(item,'frequencyLimit','frequencyLimitFlag', $event)"></b>
                                <b class="icon icon-cancel" ng-click="editPrice(item, $event);"></b>
                            </div>
                        </td>
                        <td v-if="item.frequencyUnit=='hour'  && item.frequencyLimit!='0'" class="frequency">
                            <div  ng-show="!item.frequencyLimitFlag">
                                {{item.frequencyLimit}}/小时 <b v-if='permission.act[67]' class="icon-edit" ng-click="editPrice(item, $event)"></b>
                            </div>
                            <div class="edit-box" v-show="item.frequencyLimitFlag">
                                <input type="text" class="form-control" ng-click="$event.stopPropagation();" ng-model="item.frequencyLimit"/>
                                <b class="icon icon-ok" ng-click="nameChange(item,'frequencyLimit','frequencyLimitFlag', $event)"></b>
                                <b class="icon icon-cancel" ng-click="editPrice(item, $event)"></b>
                            </div>
                        </td>
                        <td v-if="item.frequencyLimit=='0'">无限制</td>
                        <td>
                            <span v-if="item.controlMode == '0'">
                                {{item.speedUp=='0'?'匀速':'加速'}}&nbsp;
                                {{item.limitPrice==0?'不限': item.limitPrice + "元/"}}
                                {{item.limitPrice!=0? item.speedUnit=='day'?'天':'小时':''}}
                            </span>
                            <span v-if="item.controlMode != '0'">
                                展现&nbsp;
                                {{item.limitView==0?'不限': item.limitView + "千次/"}}
                                {{item.limitView!=0? item.speedUnit=='day'?'天':'小时':''}}
                            </span>
                        </td>
                        <td class="frequency" v-if="item.type=='rtb'">
                            <div v-show="!item.bidPriceFlag">
                                {{item.bidPrice}} <b v-if='permission.act[67]' class="icon-edit" ng-click="item.bidPriceFlag = !item.bidPriceFlag; $event.stopPropagation();"></b>
                            </div>
                            <div class="edit-box" v-show="item.bidPriceFlag">
                                <input type="text" class="form-control" ng-click="$event.stopPropagation();" ng-model="item.bidPrice"/>
                                <b class="icon icon-ok" ng-click="nameChange(item,'bidPrice','bidPriceFlag', $event);"></b>
                                <b class="icon icon-cancel" ng-click="item.bidPriceFlag = !item.bidPriceFlag;$event.stopPropagation();"></b>
                            </div>
                        </td>
                        <td class="frequency" v-if="item.type!='rtb'">
                            <!--{{item.bidPrice}}-->
                            -
                        </td>
                        <td>
                            {{item.minuteCost}}
                        </td>
                        <td>
                            
                            <a v-if='permission.act[66]' href="javascript:;" ng-click="diagnosis(item.id, $event);" :class="{red:!item.isError}"><i class="icon-error" v-if="!item.isError"></i>诊断</a>
                            <a v-if='permission.act[67]' href="javascript:;" ui-sref="agent.delivery.newOrder({'oType': item.type=='rtb'? '1':'2', orderId: item.id,'activeId': item.activityID})">编辑</a>
                            <a v-if='permission.act[75]' ui-sref="agent.report.effect({'activeID':item.activityID,'activeName':item.activityName,'orderID':item.id,'orderName':item.name})">查看报表</a>
                        </td>
                    </tr>
                    <tr class="table-responsive" v-if="item.showFlag">
                        <td colspan="11" class="secondTd" v-if="item.materialList.length > 0">
                            <table class="table spaceTable">
                                <thead>
                                    <th style="padding-left: 87px;">素材</th>
                                    <th>审核状态</th>
                                    <th>素材信息</th>
                                    <th>素材内容</th>
                                    <th style="min-width: 140px;">操作</th>
                                </thead>
                                <tbody v-for="(i, $mIndex) in item.materialList" :key="$mIndex">
                                <tr>
                                    <td class="spaceInfo">
                                        <div class="material-cover" v-if="i.hasImg" :style="{'background-image':'url('+i.preview+')'}">
                                            <div class="material-cover-mask" ng-click="showImg(i.preview)"></div>
                                        </div>
                                        <div class="material-cover" v-if="i.hasVideo">
                                            <video :src="i.preview"></video>
                                            <div class="material-cover-mask" ng-click="showVideo(i.preview)"></div>
                                        </div>
                                        <div class="material-cover" v-if="i.hasHtml">
                                            <iframe :srcdoc="i.preview|toTrusted" frameborder="0"></iframe>
                                            <div class="material-cover-mask" ng-click="showIframe(i.preview)"></div>
                                        </div>
                                        <div v-show="!i.preview" v-for="m in i.material" :key="m.id">
                                            <!-- 没有预览就显示文本 -->
                                            <div v-if="m.text">
                                                <span>{{m.text.content}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="btns form-inline">
                                        <div>
                                            内部审核：
                                                {{i.auditState=="1"?"待审核":i.auditState=="2"?"审核通过":"审核拒绝"}}
                                        </div>
                                        <div style="padding-left: 65px;" class="form-group">
                                            <label style="width: 61px;">平台审核：</label>
                                            {{i.adxAuditList.approved.length}}个平台通过审核
                                            
                                            <br>
                                            {{i.adxAuditList.reject.length}}个平台审核拒绝
                                            
                                            <br>
                                            {{i.adxAuditList.pending.length}}个平台待审核
                                            
                                        </div>
                                    </td>
                                    <td class="spaceInfo">
                                        <span>创意名称：{{i.name}}</span><br><br>
                                        <span>创意ID：{{i.id}}</span><br><br>
                                        <span>广告位类型：{{adTypes[i.adType]}}</span><br><br>
                                        <span>交互方式：{{interactionTypes[item.interactionType]}}</span><br><br>
                                    </td>
                                    <td>
                                        <div v-for="(m, $first) in i.material" :key="$first">
                                            <div v-if="m.image">
                                                <span>图片：</span>
                                                <button class="dsp-btn btn-gray" ng-click="showImg(m.image.url)">查看</button><br><br>
                                            </div>
                                            <div v-if="m.video">
                                                <span>视频：</span>
                                                <button class="dsp-btn btn-gray" ng-click="showVideo(m.video.url)">查看视频</button><br><br>
                                            </div>
                                            <div v-if="m.text">
                                                <span>文本：</span>
                                                <span>{{m.text.content}}</span><br><br>
                                            </div>
                                            <div v-if="m.data">
                                                <span>{{dataType[m.data.type]}}：</span>
                                                <span>{{m.data.content}}</span><br><br>
                                            </div>
                                            <div v-if="$first == 0">
                                                点击监测：
                                                <button class="dsp-btn btn-gray" ng-click="checkUrl(i.clickUrls.join(','))">查看</button><br><br>
                                                曝光监测：<button class="dsp-btn btn-gray" ng-click="checkUrl(i.viewUrls.join(','))">查看</button><br><br>
                                                落地页：<button class="dsp-btn btn-gray" ng-click="openUrl(i.landingUrl)">查看</button>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <a v-if='permission.act[66]' href="javascript:;" ng-click="checkCrective(i.id, $event);" :class="{red:!i.isError}"><i class="icon-error" v-if="!i.isError"></i>诊断</a>
                                        <button v-if='permission.act[67]' class="dsp-btn btn-red" ng-click="delCreative(item.id, i.id, pIndex ,$index)">停用</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="pageToolbar" class="page"></div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            filter: {},
            adTypes: [0, "banner", "开屏", "插屏", "视频贴片", "原生", "激励视频"],
            interactionTypes: [0, "仅展示", "下载应用", 0 ,"跳转网页"],
            dataType: [0, "	品牌名称/贊助信息", "描述信息", "用户评级", "点赞数", "下载数量",
            "价格", "售卖价格", "服务电话", "地址", "描述信息2", "URL", "评论数", "H5"],
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        // 订单列表
        getList(current, pagesize) {
            var data = {
                'page': (current || 1)+"",
                'size': (pagesize || 20)+"",
                'filter': this.filter,
                //'sTime' : $scope.obj.sTime,
                //'eTime' : $scope.obj.eTime,
                "sort": ["cTime,1"],
            };
            this.$ajax({
                url: '/dsp/order/list',
                data: data,
                load: true
            }).then(res => {
                var data = res.data.data;
                data.forEach(item => {
                    item.showFlag = false;
                    item.nameFlag = false;
                    item.orderBudgetFlag = false;
                    item.frequencyLimitFlag = false;
                    item.bidPriceFlag = false;
                    item.materialList = [];
                });
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

        // 素材
        showSpace(item, $event){
            item.showFlag = !item.showFlag;
            if(item.showFlag){
                this.$ajax({
                    url: '/dsp/order/creative/list',
                    data: {
                        "orderID": item.id
                    },
                    load: true
                }).then(res => {
                    if(res.data.length!=0){
                        item.materialList = res.data || [];
                        item.materialList.forEach(v => {
                            this.getPreview(v)
                        })
                    }
                })
            }

        },

        // 处理素材数据
        getPreview (item) {
            var m = item.material || [];
            for(var i = 0; i < m.length; i++) {
                var v = m[i];
                if(v.image) {
                    item.hasImg = true;
                    item.preview = v.image.url;
                    break;
                }
                if(v.video) {
                    item.hasVideo = true;
                    item.preview = v.video.url;
                    break;
                }
                if(v.data && v.data.type == "13") {
                    item.hasHtml = true;
                    item.preview = v.data.content;
                    break;
                }
            }
        },

        // 新建订单
        newOrder() {
            var bidOrder = this.permission.act[65]
                ,dealOrder = this.permission.act[112];
            if(bidOrder && !dealOrder) {
               this.$router.push({  
                    path:'newOrder',   
                    query:{           
                        oType: '1' ,
                        orderId: '',
                        activeId: ''
                    }
                })
            } else if (!bidOrder && dealOrder) {
                this.$router.push({  
                    path:'newOrder',   
                    query:{           
                        oType: '2' ,
                        orderId: '',
                        activeId: '0'
                    }
                })
            } else {
                localStorage.step = 1;
                layer.open({
                    type: 1,
                    title: "新建广告订单",
                    skin: "layer-style",
                    area: ['520px', '300px'], //宽高
                    content: $(".orderType")
                });
            }
        }
    }
}
</script>

<style lang="less">
.order-page {
  .dateBox{margin-top: 0px;}
  .filter-box {
    .new-order {
      position: relative;
      div {
        
        display: none;
        width: 150px;
        height: 90px;
        position: absolute;
        z-index: 1;
        top: -1px;
        left: 123px;
        border: 1px solid rgb(61, 141, 218);
        border-radius: 5px;
        background-color: #fff;
        a {
          width: 100%;
          height: 50%;
          line-height: 45px;
          box-sizing: border-box;
          display: block;
          color: #0e1e45;
        }
        a:nth-child(1) {
          border-bottom: 1px solid rgb(61, 141, 218);
        }

      }
    }
    //.new-order:hover div {
    //  display: block;
    //}
    .btn-more {
      vertical-align: middle;
      margin-left: 10px;
    }
    .filter-group {
      display: inline-block;
      border-right: 1px solid #dcdfe6;
      padding-right: 10px;
      margin-right: 10px;
      .dropdown-toggle {
        width: 120px;
        min-width: 120px;
      }
      input[type=text] {
        width: 70px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .filter-group:last-child {
      border-right: none;
    }
  }
  .filter-more {
    padding-top: 10px;
    border-top: 1px solid #dcdfe6 ;
  }
  td {
    vertical-align: middle;
    .form-control {
      width: 150px;
    }
    > a {
      margin: 5px;
    }
  }
  td.frequency {
    width: 90px;
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
        color: #fff;
      }
    }
  }

  .copy-order-box {
    width: 100%;
    height: 100%;
    text-align: left;
    .btn-box {
      text-align: center;
      margin-top: 25px;
    }
  }

  .table-box {
    .close {
      display: block;
      width: 14px;
      height: 14px;
      background: url("../../../common/img/sk2-images/icon_close.png") no-repeat top right;
      margin-left: 20px;
      margin-top: 3px;
      opacity: 1;
    }
    .icon-open {
      background: url("../../../common/img/sk2-images/icon_open.png") no-repeat top right;
    }
    .secondTd {
      .table {
        margin: 0;
        border: 0 none;
        thead {
          background-color: #f0f0f0;
          th {
            border: 0 none;
          }
        }
        th {
          height: 20px;
          text-align: left;
        }
        tbody {
          background: #fafafa;
          td {
            text-align: left;
            vertical-align: middle;
            border: 0 none;
          }
        }
      }
      .audit {
        display: block;
        width: 200px;
        height: 30px;
        padding-left: 20px;
        line-height: 30px;
        border-radius: 15px;
        position: relative;
        color: #fff;
        margin-bottom: 20px;
        .audit-text {
          width: 60px;
          height: 22px;
          line-height: 22px;
          background-color: #fff;
          text-align: center;
          border-radius: 11px;
          cursor: default;
          position: absolute;
          right: 4px;
          top: 4px;
          color: #3d3d3d;
          .adx-tips {
            width: 208px;
            border: 1px solid #8ab1ff;
            position: absolute;
            background-color: #fff;
            left: 61px;
            top: 0px;
            display: none;
            z-index: 10;
            li {
              height: 30px;
              line-height: 30px;
              text-align: center;
              padding: 0 5px;
              float: left;
            }
          }
        }
        .audit-text:hover .adx-tips {
          display: block;
        }
      }
      .btn-red {
        background-color: #ff6767;
      }
      .audit-orange {
        background-color: #ffa054;
      }
      .audit-blue {
        background-color: #8ab1ff;
      }
      .audit-green {
        background-color: #3dcb51;
      }
      .audit-red {
        background-color: #ff7171;
        margin-bottom: 0px;
      }
    }
  }
  .spaceInfo {
    .preview {
      width: 100px;
      height: 178px;
      margin: 0 auto;
      display: block;
      width: 100px;
      cursor: pointer;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .icon-error {
    width: 10px;
    height: 10px;
    margin-right: 4px;
    display: inline-block;
    background: url(../../../common/img/sk2-images/icon-error.png)
  }

  .layer-style {
    border-radius: 5px;
  }

  .diagnosis-box {
    position: relative;
    width: 500px;
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 70px;
    color: #000;
    .title {
      height: 40px;
      line-height: 40px;
      background-color: #f5f5f5;
      border-radius: 5px 5px 0 0;
      padding: 0 10px 0 20px;
      font-size: 14px;
      font-weight: 700;
      .icon-close {
        width: 20px;
        height: 20px;
        background: url("../../../common/img/sk2-images/icon-close.png") no-repeat;
        margin-top: 10px;
        background-size: 100% 100%;
        cursor: pointer;
      }

    }
    ul {
      width: 100%;
      padding: 14px 40px 14px 40px;
      li {
        padding: 0 20px 0 20px;
        height: 24px;
        line-height: 24px;
        text-align: left;
      }
      li:nth-child(even) {
        background-color: #f5f5f5;
      }
    }
    .diagnosis-cancel {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 70px;
      line-height: 70px;
      text-align: center;
      border-top: 1px solid #bfbfbf;
      border-radius: 0px 0px 5px 5px;
    }
  }
  
  .green {
    color: #2fca45;
  }
  .red {
    color: #ea4949;
  }
  .blue {
    color: #4292d6;
  }
    
  .material-cover {
    width: 122px;
    height: 130px;
    background-color: #808080;
    margin: 30px auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    position: relative;
    iframe {
      height: 100%;
    }
    iframe, video {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0,-50%);
    }
    .material-cover-mask {
      width: 100%;
      height: 100%;
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      background: url("../../../common/img/sk2-images/icon_magnify.png") no-repeat center;
    }
  }
  .material-cover:hover .material-cover-mask {
    display: block;
  }

  .iframe-box {
    display: none;
  }
  .video-box {
    display: none;
    video {
      width: 500px;
      display: block;
    }
  }
}
</style>