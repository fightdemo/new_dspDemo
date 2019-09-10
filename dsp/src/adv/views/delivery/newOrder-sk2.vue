<template>
    <div class="page ag-new-order">
        <!--页面标题-->
        <h3 class="page-title">创建订单-我可以随意改变</h3>
        <div class="step">
            <div class="step-prompt cl bs">
                <ul class="cl">
                    <li ng-class="{'cur-step': step>=1 || orderId != ''}" ng-click="stepJump(1);">
                        <i class="step-num">1</i>
                        <span>基本信息</span>
                    </li>
                    <li ng-class="{'cur-step': step>=2 || orderId != ''}" ng-click="stepJump(2);">
                        <i class="step-num">2</i>
                        <span>{{orderType=='bid' ? '定向设置':'选取合约资源'}}</span>
                    </li>
                    <li ng-class="{'cur-step': step>=3 || orderId != ''}" ng-click="stepJump(3);">
                        <i class="step-num">3</i>
                        <span>上传素材</span>
                    </li>
                    <li ng-class="{'cur-step': step>=4 || orderId != ''}" ng-click="stepJump(4);">
                        <i class="step-num">4</i>
                        <span>提交信息</span>
                    </li>
                </ul>
            </div>
            <!-- 第一步-->
            <div class="main page-one" v-show="step==1" data-ng-init="load()">
                <div class="title">基本信息</div>
                <div class="form-box">
                    <div class="form-group">
                        <label><i class="icon-must">*</i>活动名称：</label>
                        <dropdown :disabled="orderId!=''" title="activeTitle" list="activeList" callback="selectActive"></dropdown>
                        <a ui-sref="agent.newActive({'appID':'0'})">新建活动</a>
                    </div>
                    <div class="form-group">
                        <label><i class="icon-must">*</i>订单名称：</label>
                        <input type="text" class="form-control" ng-model="data.name" maxlength="100" placeholder="请输入订单名称"/>
                    </div>
                    <div class="form-group form-ctrl">
                        <label><i class="icon-must">*</i>售卖类型：</label>
                        <radio-sk :disabled="orderId!=''" module="data.chargeMode" value="cpm">CPM</radio-sk>
                        <span ng-if="hasCPC != 0 && orderType != 'deal'">
                            <radio-sk  :disabled="orderId!=''" module="data.chargeMode" value="cpc">CPC</radio-sk>
                        </span>

                    </div>
                    <div class="form-group form-ctrl">
                        <label><i class="icon-must">*</i>后续行为：</label>
                        <radio-sk :disabled="orderId!=''" module="data.interactionType" value="1">仅展示</radio-sk>
                        <radio-sk :disabled="orderId!=''" module="data.interactionType" value="2">下载应用</radio-sk>
                        <radio-sk :disabled="orderId!=''" module="data.interactionType" value="4">跳转网页</radio-sk>
                    </div>
                    <div class="form-group" ng-if="orderType=='deal'">
                        <label><i class="icon-must">*</i>资源平台：</label>
                        <radio-sk :disabled="orderId!=''" module="data.platform" value="ios">IOS</radio-sk>
                        <radio-sk :disabled="orderId!=''" module="data.platform" value="android">Android</radio-sk>
                    </div>
                    <div class="form-group" ng-if="orderType=='deal'">
                        <label><i class="icon-must">*</i>资源类型：</label>
                        <radio-sk :disabled="orderId!=''" module="data.type" value="pdb">PDB</radio-sk>
                        <radio-sk :disabled="orderId!=''" module="data.type" value="pd">PD</radio-sk>
                    </div>
                    <div class="form-group" ng-if="orderType=='bid'">
                        <label><i class="icon-must">*</i>操作系统：</label>
                        <radio-sk :disabled="orderId!=''" module="data.platform" value="ios">IOS</radio-sk>
                        <radio-sk :disabled="orderId!=''" module="data.platform" value="android">Android</radio-sk>
                    </div>
                    <div class="form-group" ng-show="data.interactionType == '222'">
                        <label><i class="icon-must">*</i>APP推广数量：</label>
                        <radio-sk :disabled="orderId!=''" module="app_num" callback="extensionNum" value="one">单个</radio-sk>
                        <radio-sk :disabled="orderId!=''" module="app_num" callback="extensionNum" value="more">多个</radio-sk>
                    </div>
                    <div class="order-row" ng-if="orderType=='bid'">
                        预算控制
                    </div>
                    <div ng-if="orderType=='bid'" class="form-group">
                        <label><i class="icon-must">*</i>预算控制：</label>
                        <input type="text" class="form-control" ng-disabled="limit" ng-model="data.orderBudget" maxlength="100" placeholder="请输入控制预算"/>
                        <check-sk module='limit' callback="orderBudget">无预算限制</check-sk>
                    </div>
                    <div ng-if="orderType=='bid'" class="form-group form-ctrl">
                        <label><i class="icon-must">*</i>投放速率：</label>
                        <radio-sk :disabled="orderId!=''" module="data.controlMode" value="0">按花费控制</radio-sk>
                        <radio-sk :disabled="orderId!=''" module="data.controlMode" value="1">按展示量控制</radio-sk>
                        <div class="form-group rate-box" ng-show="data.controlMode==0">
                            <dropdown title="speed" list="rateDrop" callback="isSpeed"></dropdown>
                            <input ng-model="data.limitPrice" ng-keydown="filterNum();" type="text" class="form-control"/>
                            <span class="unit">元/天</span>
                            <dropdown title="sUnit" list="timeUnit" callback="speedUnit"></dropdown>
                        </div>
                        <div class="form-group rate-box" ng-show="data.controlMode==1">
                            <input ng-model="data.limitView" ng-keydown="filterNum();" type="text" class="form-control"/>
                            <span class="unit">千次/</span>
                            <dropdown title="sUnit" list="timeUnit" callback="speedUnit"></dropdown>
                        </div>
                    </div>
                    <div ng-if="orderType=='bid'" class="form-group form-ctrl">
                        <label>频次展示：</label>
                        <span class="unit">展示</span>
                        <input type="text" ng-keydown="filterNum();" ng-model="data.frequencyLimit" class="form-control"/>
                        <span class="unit">次/</span>
                        <dropdown title="tUnit" list="timeUnit" callback="frequencyUnit"></dropdown>
                    </div>
                    <div class="order-row">
                        投放时间
                    </div>
                    <div class="form-group">
                        <label>选择时间：</label>

                        <input type="text" ng-disabled="orderId!=''" class="form-control" ng-model="data.startTime" id="startTime">
                        <span class="unit">至</span>
                        <input type="text" class="form-control" ng-disabled="endTime" ng-model="data.endTime" id="endTime">
                        <span ng-show="isLongTime">
                            <check-sk module='endTime'>长期投放</check-sk>
                        </span>
                        <div class="hourDirective" check-arr="checkArr" edit="orderId!=''"></div>
                    </div>
                </div>
            </div>
            <!-- 竞价第二步-->
            <div class="page-two-bid"  v-show="step==2 && orderType=='bid'">
                <div class="box1 main">
                    <div class="title">哪些用户可以看到广告</div>
                    <div class="form-box">
                        <div class="order-row">
                            人口属性
                        </div>
                        <div class="form-group form-ctrl">
                            <label>性别定向：</label>
                            <radio-sk module="position.people" value="all">不限</radio-sk>
                            <radio-sk module="position.people" value="custom">指定</radio-sk>
                            <div class="form-group" style="padding-left: 66px;" ng-show="position.people=='custom'">
                                <radio-sk module="position.sex" value="m">男</radio-sk>
                                <radio-sk module="position.sex" value="f">女</radio-sk>
                            </div>
                        </div>
                        <div class="form-group form-ctrl">
                            <label>收入定向：</label>
                            <radio-sk module="position.income" value="all">不限</radio-sk>
                            <radio-sk module="position.income" value="custom">指定</radio-sk>
                            <div class="form-group" style="padding-left: 66px;" ng-show="position.income=='custom'">
                                <check-sk value="1" module="position.incomes">1000RMB以下</check-sk>
                                <check-sk value="2" module="position.incomes">1001-3000RMB</check-sk>
                                <check-sk value="3" module="position.incomes">3001-5000RMB</check-sk>
                                <check-sk value="4" module="position.incomes">5001-10000RMB</check-sk>
                                <check-sk value="5" module="position.incomes">10000RMB以上</check-sk>
                            </div>
                        </div>
                        <div class="form-group form-ctrl">
                            <label>年龄定向：</label>
                            <radio-sk module="position.age" value="all">不限</radio-sk>
                            <radio-sk module="position.age" value="custom">指定</radio-sk>
                            <div class="form-group" style="padding-left: 66px;" ng-show="position.age=='custom'">
                                <check-sk value="1" module="position.ages">&lt;18</check-sk>
                                <check-sk value="2" module="position.ages">18-24</check-sk>
                                <check-sk value="3" module="position.ages">25-34</check-sk>
                                <check-sk value="4" module="position.ages">&gt;35</check-sk>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box2 main">
                    <div class="title">用户在哪可以看到广告</div>
                    <div class="form-box">
                        <div class="order-row">
                            地域选择
                        </div>
                        <div class="form-group">
                            <label>投放区域：</label>
                            <radio-sk module="position.area" value="all">不限</radio-sk>
                            <radio-sk module="position.area" callback="getLocationType" value="cityLevel">一二线城市</radio-sk>
                            <radio-sk module="position.area" callback="getLocationType" value="location">省市</radio-sk>
                            <div class="form-group" style="padding-left: 0px;" ng-show="position.area == 'location' || position.area == 'cityLevel'">

                            </div>
                        </div>
                        <div class="order-row">
                            媒体选择
                        </div>
                        <div class="form-group publish-box">
                            <label><span class="icon-must">*</span>流量来源：</label>
                            <radio-sk module="position.publish" value="all" callback="publishChange">全网智能优化</radio-sk>
                            <radio-sk module="position.publish" value="space" callback="publishChange" ng-show="data.chargeMode == 'cpm'">指定广告位</radio-sk>
                            <radio-sk module="position.publish" value="select" callback="publishChange" ng-show="data.chargeMode == 'cpm'">精选媒体</radio-sk>
                            <radio-sk module="position.publish" value="new" callback="publishChange" ng-show="data.chargeMode == 'cpm'">新品媒体</radio-sk>
                            <i ng-mouseenter="newAppTips()" style="margin-right: 10px; color: #d8d58d;" class="newAppTips glyphicon glyphicon-question-sign" ng-show="data.chargeMode == 'cpm'"></i>
                            <radio-sk module="position.publish" value="type" callback="publishChange">媒体分类</radio-sk>
                            <radio-sk module="position.publish" value="industry" callback="publishChange" ng-show="data.chargeMode == 'cpm'">精选行业包</radio-sk>
                            <radio-sk module="position.publish" value="crowd" callback="publishChange" ng-show="data.chargeMode == 'cpm'">精选人群包</radio-sk>
                            <!-- <div class="form-group" ng-show="position.publish == 'crowd'"> -->
                            <!-- 人群包 -->
                            <div ng-show="position.publish == 'crowd'" class="crowdPkg" edit="editCrowdPkgId" list="crowdPkgList" viewdata="pkgView" space-ids="pkgSpaceIds" callback="crowdSelectPkg"></div>
                            <!-- 行业包 -->
                            <div ng-show="position.publish == 'industry'" edit="editIndustryPkgId" viewdata="pkgView" list="industryPkgList" space-ids="pkgSpaceIds" callback="industrySelectPkg" class="industryPkg"></div>
                            
                            <div ng-show="position.publish == 'space'">
                                <div class="form-group cl" style="padding-left: 0px;">
                      
                                </div>
                            </div>
                            <!-- <div ng-if="publishConfig" ng-show="position.publish == 'all'"> -->
                            <div style="display: none;" ng-if="publishConfig">
                                <!-- <publish-source config="publishConfig"></publish-source> -->
                            </div>
                            <div ng-if="mediaConfig" ng-show="position.publish == 'select'">
                                <!-- <publish-source media="mediaName" config="mediaConfig" is-search="true"></publish-source> -->
                            </div>
                            
                            <div ng-if="newMediaConfig" ng-show="position.publish == 'new'">
                                <!-- <publish-source media="mediaName" config="newMediaConfig" is-search="true"></publish-source> -->
                            </div>

                            <div ng-show="position.publish == 'type'">
                                <div class="form-group">
                                    <label>媒体：</label>
                                    <radio-sk module="typeInOut" callback="clearTree2" value="in">定向</radio-sk>
                                    <radio-sk module="typeInOut" callback="clearTree2" value="out">排除</radio-sk>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box3 main">
                    <div class="title">用户在什么场景下看到广告</div>
                    <div class="form-box">
                        <div class="order-row">
                            设备选择
                        </div>

                        <div class="form-group">
                            <label>设备价格：</label>
                            <radio-sk module="position.dePrice" value="all">不限</radio-sk>
                            <radio-sk module="position.dePrice" value="custom">指定设备价格</radio-sk>
                            <div class="form-group" style="padding-left: 66px;" ng-show="position.dePrice=='custom'">
                                <check-sk value="1" module="position.dePrices">500元以下</check-sk>
                                <check-sk value="2" module="position.dePrices">500-1000元</check-sk>
                                <check-sk value="3" module="position.dePrices">1000-2000元</check-sk>
                                <check-sk value="4" module="position.dePrices">2000-3000元</check-sk>
                                <check-sk value="5" module="position.dePrices">3000-4000元</check-sk>
                                <check-sk value="6" module="position.dePrices">4000元以上</check-sk>
                            </div>
                        </div>
                        <div class="form-group cl">
                            <label>设备品牌：</label>
                            <radio-sk module="position.deBrand" value="all">不限</radio-sk>
                            <radio-sk module="position.deBrand" value="custom">指定设备品牌</radio-sk>
                            <!--<div class="form-group" ng-show="position.deBrand=='custom'">-->
                            <div style="padding-left: 0px;" class="form-group" ng-show="position.deBrand == 'custom'">
                                
                            </div>
                        </div>
                        <div class="form-group cl">
                            <label>设备版本：</label>
                            <radio-sk module="position.deVersion" value="all">不限</radio-sk>
                            <radio-sk module="position.deVersion" value="custom">选择系统版本</radio-sk>
                            <!--<div class="form-group" ng-show="position.deBrand=='custom'">-->
                            <div style="padding-left: 0px;" class="form-group" ng-show="position.deVersion == 'custom'">
                                
                            </div>
                        </div>
                        <div class="order-row">
                            联网场景
                        </div>
                        <div class="form-group">
                            <label>联网方式：</label>
                            <radio-sk module="position.net" value="all">不限</radio-sk>
                            <radio-sk module="position.net" value="custom">指定联网方式</radio-sk>
                            <div class="form-group" style="padding-left: 66px;" ng-show="position.net=='custom'">
                                <check-sk value="1" module="position.nets">wifi</check-sk>
                                <check-sk value="2" module="position.nets">2G</check-sk>
                                <check-sk value="3" module="position.nets">3G</check-sk>
                                <check-sk value="4" module="position.nets">4G</check-sk>
                                <check-sk value="5" module="position.nets">5G</check-sk>
                                <check-sk value="6" module="position.nets">其他</check-sk>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>运营商：</label>
                            <radio-sk module="position.ISP" value="all">不限</radio-sk>
                            <radio-sk module="position.ISP" value="custom">指定运营商</radio-sk>
                            <div class="form-group" style="padding-left: 66px;" ng-show="position.ISP=='custom'">
                                <check-sk value="1" module="position.ISPs">移动</check-sk>
                                <check-sk value="2" module="position.ISPs">联通</check-sk>
                                <check-sk value="3" module="position.ISPs">电信</check-sk>
                                <check-sk value="4" module="position.ISPs">其他</check-sk>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 合约第三步 -->
            <div class="page-three" v-show="step==3">
              <button class="dsp-btn btn-upload" @click="uploadBoxShow();">上传素材</button>
              <div class="main bs" style="border-radius: 5px;border-left: 0px;border-right: 0px;">
                    <div class="title">素材列表</div>
                    <table class="table material-list">
                        <thead>
                        <tr>
                            <td style="padding-left: 22px;">素材</td>
                            <td>素材内容</td>
                            <td>素材类型</td>
                            <td>审核状态</td>
                            <!--<td>广告位尺寸</td>-->
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(mItem, index) in materialList" :key="index">
                                <td>
                                    ID： {{mItem.id}}
                                </td>
                                <td class="td-creative-content">
                                    创意名称：{{mItem.name}}<br><br>
                                    创意ID： {{mItem.id}}<br><br>
                                    广告位类型：{{adTypes[mItem.adType]}}<br><br>
                                    交互方式：{{interactionTypes[mItem.interactionType]}}<br><br>
                                </td>
                                <td>
                                    <div v-for="i in mItem.material">
                                        <div v-if="i.image">
                                            <span>图片：</span>
                                            <a href="javascript:;" @click="showImg(i.image.url)">查看图片</a><br><br>
                                        </div>
                                        <div v-if="i.video">
                                            <span>视频：</span>
                                            <a href="javascript:;" @click="showVideo(i.video.url)">查看视频</a><br><br>
                                        </div>
                                        <div v-if="i.text">
                                            <span>文本：</span>
                                            <span>{{i.text.content}}</span><br><br>
                                        </div>
                                        <div v-if="i.data">
                                            <span>{{dataType[i.data.type * 1]}}：</span>
                                            <span>{{i.data.content}}</span><br><br>
                                        </div>
                                        <div v-if="$first">
                                            点击监测：<button class="dsp-btn btn-gray" @click="checkUrl(mItem.clickUrls.join(','))">查看</button><br><br>
                                            曝光监测：<button class="dsp-btn btn-gray" @click="checkUrl(mItem.viewUrls.join(','))">查看</button><br><br>
                                            落地页：<button class="dsp-btn btn-gray" @click="openUrl(mItem.landingUrl)">查看</button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        内部审核：
                                            {{mItem.auditState=="1"?"待审核":mItem.auditState=="2"?"审核通过":"审核拒绝"}}
                                    </div>
                                    <div style="padding-left: 65px;" class="form-group">
                                        <label style="width: 61px;">平台审核：</label>
                                        {{mItem.adxAuditList.approved.length}}个平台通过审核
                                        
                                        <br>
                                        {{mItem.adxAuditList.reject.length}}个平台审核拒绝
                                        
                                        <br>
                                        {{mItem.adxAuditList.pending.length}}个平台待审核
                                    </div>
                                </td>
                                <td>
                                    <button :disabled="mItem.auditState=='2'" class="dsp-btn btn-blue" :class="{'btn-not': mItem.auditState=='2'}" @click="creativeEdit(mItem, $index)">编辑</button>
                                    <button class="dsp-btn btn-red" @click="delCreative(mItem.id, $index)">停用</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- 第四步 -->
            <div class="main page-four" v-show="step==4">
              <div class="form-box">
                <div class="form-group">
                    <label>交易类型：</label>
                    <span>{{orderType=="bid"?"竞价交易":"合约交易"}}</span>
                </div>
                <div class="form-group">
                    <label>活动名称：</label>
                    <span ng-bind="dataView.activeName"></span>
                </div>
                <div class="form-group">
                    <label>订单名称：</label>
                    <span ng-bind="data.name"></span>
                </div>
                <div class="form-group">
                    <label>创意形式：</label>
                    <span>
                        <!-- <span ng-repeat="material in materialList">
                            <span ng-if="!$last">{{creativeTypes[material.creativeType]}}，</span>
                            <span ng-if="$last">{{creativeTypes[material.creativeType]}}</span>
                        </span> -->
                    </span>
                    <!--<span ng-bind="dataView.materialType"></span>-->
                </div>
                <div class="form-group">
                    <label>预算控制：</label>
                    <span ng-bind="dataView.orderBudget"></span>
                </div>
                <div class="form-group">
                    <label>投放速率：</label>
                    <!-- <span>{{dataView.controlMode}}{{data.speedUp=='0'?"匀速":"加速"}}
                        {{data.controlMode=="0"?data.limitPrice:data.limitView}}{{data.speedUnit=='day'?"天":"小时"}}</span> -->
                    <!--<span ng-bind="dataView."></span>-->
                </div>
                <div class="form-group">
                    <label>频次控制：</label>
                    <!-- <span>{{data.frequencyLimit != "" ? (data.frequencyLimit + "次/" + dataView.frequencyUnit) : "不限"}}</span> -->
                    <!--<span ng-bind="dataView."></span>-->
                </div>
                <div class="form-group">
                    <label>投放时间：</label>
                    <span ng-bind="dataView.time"></span>
                    <!--<span ng-bind="dataView."></span>-->
                </div>
                <div ng-if="orderType=='bid'">
                  <div class="order-row">
                      定向信息
                  </div>
                  <div class="form-group">
                      <label>性别定向：</label>
                      <span ng-bind="dataView.sex"></span>
                  </div>
                  <div class="form-group">
                      <label>收入定向：</label>
                      <span ng-bind="dataView.income"></span>
                  </div>
                  <div class="form-group">
                      <label>年龄定向：</label>
                      <span ng-bind="dataView.age"></span>
                  </div>
                  <div class="form-group flowSource cl" style="display: block;">
                      <label>流量来源：</label>
                      <span ng-if="position.publish=='all'">
                          <!-- {{publishConfig.selectNameArr.join("，")}} -->
                      </span>

                      <span ng-if="position.publish=='select'">
                          <!-- {{mediaConfig.selectNameArr.join("，")}} -->
                      </span>

                      <span ng-if="position.publish=='new'">
                          <!-- {{newMediaConfig.selectNameArr.join("，")}} -->
                      </span>

                      <span ng-if="position.publish=='space'">
                          <!-- {{position.spaceNames.join("，")}} -->
                      </span>

                      <!-- <li class="pkg-crowd cl" ng-if="position.publish=='crowd'" ng-class="{'pkg-checked': config.crowd == pkgView.id + ''}">
                          <div class="radio-box">
                          </div>
                          <div class="name-box">
                              <img ng-src="{{pkgView.icon}}" /><br>
                              <span ng-bind="pkgView.name"></span>
                          </div>
                          <div class="remark-box" ng-class="{'line-hei': pkgView.description.length > 22}">
                              <span ng-bind="pkgView.description"></span>
                          </div>
                      </li> -->

                      <!-- <li ng-if="position.publish=='industry'" class="cl pkg-industry">
                          <div class="radio-box">
                          </div>
                          <div ng-class="{'pkg-checked': config.industry == pkgView.id + ''}" class="app-list cl">
                              <div class="name-box">
                                  <span ng-bind="pkgView.name"></span>
                              </div>
                              <div class="app-box cl">
                                  <ul class="cl" ng-style="{width:pkgView.appInfo.length * 126 + 20+'px'}">
                                      <li ng-repeat="s in pkgView.appInfo">
                                          <div class="img-box">
                                              <img ng-src="{{s.appIcon}}" />
                                          </div>
                                          <div class="app-name-box" ng-bind="s.appName">
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </li> -->
                  </div>
                  <div class="form-group">
                      <label>操作系统：</label>
                      <span ng-bind="data.platform"></span>
                  </div>
                  <div class="order-row">素材信息</div>
                  <div class="form-group">
                      <label>创意信息：</label>
                      <span>
                          <span ng-repeat="material in materialList">
                              <!-- 素材名称：{{material.name}}，目标地址：{{material.landingUrl}}<br> -->
                          </span>
                      </span>
                  </div>
                  <div>
                    <div class="order-row">广告单元控制</div>
                    <div class="form-group" ng-if="accountType != '0' && isDirect != '1'">
                        <label>利润设置：</label>
                        <radio module="profit" value="false" callback="switchProfit">否</radio>
                        <radio module="profit" value="true" callback="switchProfit">是</radio>
                        <input type="text" ng-model="data.profit" class="form-control" ng-disabled="profit=='false'"/>&nbsp;%
                    </div>

                    <div class="form-group" ng-if="data.type == 'rtb'">
                        <label><span class="icon-must">*</span>订单出价：</label>
                        <!-- <radio disabled="orderId!=''" module="data.chargeMode" value="cpm">CPM</radio>
                        <span ng-if="hasCPC == 1">
                            <radio disabled="orderId!=''" module="data.chargeMode" value="cpc">CPC</radio>
                        </span> -->
                        <input class="form-control" ng-model="data.bidPrice" type="text"/>&nbsp;元
                    </div>
                </div>
                </div>
              </div>
            </div>
        </div>
        <div class="footer">
            <div class="fl">
                <button style="width: 80px;" class="dsp-btn btn-gray" v-show="step!=1" @click="previous()">上一步</button>
            </div>
            <div class="fr">
                <button style="width: 140px;" class="dsp-btn btn-blue" @click="next()">{{nextText}}</button>
                <button style="width: 80px;" class="dsp-btn btn-gray" ng-click="cancel()" v-show="step==1">取消</button>
            </div>
        </div>

        <div class="skuTime" ng-click="clearLayer()">
            <div class="checkCalendar">

            </div>
            <div class="select-time">
                <button class="dsp-btn btn-white2" onclick="layer.closeAll()">取消</button>
                <button class="dsp-btn btn-blue" ng-click="getTime()">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderType: "bid",
            orderId: "",
            step: 1,
            nextText: "下一步",
        }
    },
    methods: {
        next(step) {
            // var err = inputCheck($scope);
            // if (err) {
            //     layer.msg(err);
            //     return;
            // }
            if (this.step < 4) {
                this.nextText = "下一步";
            }

            if (step) {
                this.step = step;
            } else if (this.step != 4){
                this.step++;
            }
            if( this.step == 4 ){
              this.nextText = "完成"
            }
        },
        // 上一步
        previous() {
            this.step--;
            if (this.step == 1) {
                
            }
            // if(this.step == 2 && $stateParams.oType == '2' ) {
            //     // 解决当页面切换至第合约二步时瀑布流样式错乱
            //     setTimeout(function () {
            //         $('.res-list').masonry(masOption);
            //     },300)
            // }
            this.nextText = "下一步";
        }
    }
}
</script>

<style lang="less">
.ag-new-order {
  color: #fff;
  .page-title{
    height: 90px;
    font-weight: 700;
    border-bottom: 0 none;
  }
  .step {
    width: 100%;
    .step-prompt {
      padding: 30px 0px 30px 0px;
      background-color: #323c48;
      width: 100%;
      border-radius: 20px;
      ul {
        margin-left: calc(~"(25% - 195px)/2");
        li {
          width: 25%;
          float: left;
          position: relative;
          cursor: pointer;
          span {
            color: #8f9398;
            display: inline-block;
            margin-left: 10px;
          }
          .step-num {
            display: inline-block;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 32px;
            color: #8f9398;
            background-color: #3f4c5b;
          }
        }
        >li:nth-child(4) {
          width: 220px;
        }
        .cur-step {
          span {
            color: #fff;
          }
          .step-num {
            color: #fff;
          }
        }
      }

    }
    .main {
      width: 100%;
      margin-top: 30px;
      .title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding-left: 20px;
        background-color: #323c48;
        border-radius: 20px 20px 0px 0px;
      }
      .form-box {
        padding: 25px 20px;
        border: 0 none;
        background-color: #3f4c5b;
        border-radius: 0px 0px 20px 20px;
        .dropdown-toggle {
          height: 34px;
          border: 1px solid #e1e5ec;
          border-radius: 5px;
          background: #fff;
          padding-left: 10px;
        }
        .dropdown-menu {
          width: 100%;
          min-width: inherit;
        }
        //bootstrap
        .form-control {
          display: inline-block;
          padding: 0px 0px 0px 10px;
        }
        .form-control[disabled] {
          background-color: #ccc;
        }
        //
        .icon-must {
          color: #EE645D;
          margin-right: 5px;
        }
      }
      //
      .order-row {
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
        font-size: 16px;
        color: #fff;
        border-bottom: 1px solid #646f7b;
      }
    }
    //
    .page-one {
      .rate-box {
        padding-left: 0px;
      }
      .form-ctrl {
        .btn {
          width: 80px;
          min-width: inherit;
        }
        .form-control {
          width: 85px;
          vertical-align: bottom;
        }
      }
      .data_show {
        display: inline-block;
        button {
          width: 110px;
        }
      }

    }
    //
    .page-two-bid {
      .form-group {
        font-size: 12px;
      }
      .publish-box {
        .search-input {
          padding-left: 33px;
          background: url("../../../common/img/sk2-images/icon_search.png") no-repeat 5px 7px;
          background-color: #fff;
          border-radius: 20px;
          width: 280px;
        }
        .radio:nth-child(5) {
          margin-right: 2px;
        }
      }
      .select-box {
        width: 300px;
        border-radius: 10px;
        height: 320px;
        overflow-y: auto;
        background-color: #4d5c6e;
        .search-box {
          width: 100%;
          height: 35px;
          border-radius: 10px 10px 0 0;
          padding-left: 5px;
          padding-top: 2px;
          input {
            width: 287px;
            border-radius: 20px;
          }
        }
        ul.ztree {
          width: 100%;
          margin-top: 0;
          border: 0;
          overflow: auto;
          border-radius: 10px;
        }
        .ico_open, .ico_close, .ico_docu {
          display: none;
        }

      }
      .btn-box {
        height: 320px;
        line-height: 320px;
        margin: 0 20px;
      }
      .show-box {
        width: 300px;
        position: relative;
        border-radius: 10px;
        height: 320px;
        padding-top: 50px;
        background-color: #4d5c6e;
        .show-filter-box {
          width: 260px;
          height: 50px;
          position: absolute;
          left: 20px;
          top: 0;
          border-bottom: 1px solid #717d8b;
          border-radius: 10px 10px 0 0;
          padding-left: 10px;
          padding-top: 10px;
        }
        .select-show {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          padding: 0px 20px;
          li {
            padding: 0 20px 0 5px;
            float: left;
            position: relative;
            font-size: 14px;
            color: #000;
            background: #fff;
            margin: 5px 0 5px 5px;
            span {
              position: absolute;
              width: 10px;
              height: 10px;
              right: 5px;
              top: 50%;
              margin-top: -5px;
              cursor: pointer;
              background: url(../../../common/img/sk2-images/icon_remove.png) no-repeat;
            }
          }
        }
      }
    }
    //
    .page-two-deal {
      .list-page {
        .content {
          position: relative;
          margin: 0 auto;
          border-radius: 5px;
          background-color: #3f4c5b;
          .content-title {
            font-size: 14px;
            padding: 0 20px;
            font-weight: bold;
            line-height: 56px;
            border-bottom: 1px solid #cccccc;
            .content-title-filter {
              float: right;
              margin-top: 13px;
              .dropdown {
                float: left;
                margin-right: 10px;
              }
            }
            .search {
              float: left;
              margin-right: 10px;
            }
            .dropdown-filter {
              float: left;
              line-height: 34px;
            }

          }
        }
        .res-list {
          margin: 20px 20px 0;
          border-radius: 20px;
          > li {
            width: calc(~'50% - 13px');
            color: #ffffff;
            padding: 20px 0;
            padding-right: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            float: left;
            background-color: #4d5c6e;
            .app-detail {
              float: left;
              width: 210px;
            }
            .res-detail {
              height: 100%;
              width: calc(~'100% - 215px');
              padding-top: 10px;
              padding-left: 35px;
              float: left;
              min-height: 226px;
              border-left: 1px solid #717d8b;
            }
          }
          // li:nth-child(2n-1) {
          //   margin-left: 20px;
          //   margin-right: 20px;
          // }
          .res-title {
            font-size: 14px;
            text-align: center;
            margin-top: 10px;
            font-weight: bold;
            padding: 0;
            .icon-os {
              width: 14px;
              height: 16px;
              vertical-align: sub;
              margin-right: 5px;
              display: inline-block;
            }
            .icon-android {
              background: url("../../../common/img/sk2-images/icon_android.png");
            }
            .icon-ios {
              width: 13px;
              background: url("../../../common/img/sk2-images/icon_ios.png");
            }
          }
          .app-cover-list {
            width: 135px;
            height: 135px;
            margin: 20px auto 0;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
            align-items: center;
            border-radius: 16px;
            background-color: #e6e6e6;
            li {
              height: 52px;
              width: 52px;
              border-radius: 15px;
              position: relative;
              background-size: 100% 100%;
              background-position: center;
              a {
                display: block;
                width: 100%;
                height: 100%;
                color: #44a1f7;
                text-align: center;
                padding: 10px;
                border-radius: 15px;
                background-color: #ffffff;
              }
            }
          }
          .app-more {
            width: 440px;
            position: absolute;
            padding: 20px;
            padding-bottom: 0;
            background-color: #fff;
            top: -20px;
            left: 60px;
            border-radius: 5px;
            box-shadow: 0px 0px 5px 2px #ccc;
            z-index: 10;
            .app-more-info {
              width: 50%;
              margin-bottom: 20px;
              .app-more-cover {
                height: 52px;
                width: 52px;
                float: left;
                margin-right: 20px;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
              }
              > p {
                margin: 0;
                line-height: 26px;
              }
            }
          }
          .app-name {
            font-size: 14px;
            margin: 10px 20px 0;
            text-align: center;
          }
          .app-info {
            margin-bottom: 20px;
            font-size: 12px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            p {
              margin: 0;
              display: inline-block;
              vertical-align: top;
              span {
                display: block;
              }
            }
          }
          .dsp-btn {
            width: 80%;
          }
        }
      }
      .detail-page {
        padding-bottom: 40px;
        .res-info {
          margin: 40px;
          li {
            float: left;
            margin-right: 40px;
            p {
              width: 226px;
              border-right: 1px solid #e6e6e6;
            }
            p:first-child {
              margin-bottom: 20px;
            }
          }
          li:last-child {
            p {
              width: auto;
              border-right: none;
            }
          }
        }
        .space-list {
          li {
            float: left;
            width: 300px;
            border: 1px solid #e6e6e6;
            border-left: none;
            .space-title {
              height: 60px;
              line-height: 60px;
              padding-left: 20px;
              color: #595959;
              background-color: #fafafa;
              border-bottom: 1px solid #e6e6e6;
            }
            .app-name {
              padding-left: 20px;
              color: #595959;
              margin: 20px 0;
              .app-cover {
                width: 28px;
                height: 28px;
                margin: 0 5px;
                display: inline-block;
                vertical-align: middle;
              }
            }
            .space-cover {
              width: 240px;
              height: 430px;
              margin: 0 auto 25px;
              background-color: #d9d9d9;
              background-size: cover;
              background-position: center;
            }
          }
          li:first-child {
            border-left: 1px solid #e6e6e6;
          }
        }
        .btn-blue {
          width: 240px;
          height: 40px;
          margin-left: 10px;
        }
        .btn-white {
          width: 120px;
          height: 40px;
        }
        .group-btn {
          padding: 20px;
        }
      }
      .buy-page {
        padding-bottom: 40px;
        .res-info {
          margin: 40px;
          li {
            float: left;
            margin-right: 40px;
            p {
              width: 226px;
              border-right: 1px solid #e6e6e6;
            }
            p:first-child {
              margin-bottom: 20px;
            }
          }
          li:last-child {
            p {
              width: auto;
              border-right: none;
            }
          }
        }
        .space-list {
          li {
            float: left;
            width: 300px;
            border: 1px solid #e6e6e6;
            border-left: none;
            .space-title {
              height: 60px;
              line-height: 60px;
              padding-left: 20px;
              color: #595959;
              background-color: #fafafa;
              border-bottom: 1px solid #e6e6e6;
            }
            .app-name {
              padding-left: 20px;
              color: #595959;
              margin: 20px 0;
              .app-cover {
                width: 28px;
                height: 28px;
                margin: 0 5px;
                display: inline-block;
                vertical-align: middle;
              }
            }
            .space-cover {
              width: 240px;
              height: 430px;
              margin: 0 auto 25px;
              background-color: #d9d9d9;
              background-size: cover;
              background-position: center;
            }
          }
          li:first-child {
            border-left: 1px solid #e6e6e6;
          }
        }
        .content-form {
          padding: 30px 20px;
          //.form-control {
          //  width: 500px;
          //  display: inline-block;
          //}
          .radio {
            margin-right: 20px;
          }
          .calendar {
            margin-left: 20px;
            margin-bottom: 60px;
          }
        }
        .form-control {
          display: initial;
        }
        .btn-blue {
          width: 240px;
          height: 40px;
          margin-left: 10px;
        }
        .btn-white {
          width: 120px;
          height: 40px;
        }
        .group-btn {
          padding: 20px;
        }
        .calendar {
          margin-top: 20px;
        }
      }
      .btn-back {
        width: 118px;
        height: 30px;
        position: absolute;
        left: 10px;
        line-height: 30px;
        top: 50%;
        margin-top: -16px;
        border: 1px solid #cfccc7;
        border-radius: 5px;
        background: url("../../../common/img/sk2-images/back-btn-bg.png") no-repeat center;
      }
      .more-load {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        border-top: 1px solid #ccc;
      }
      #waterfallBox {
        margin: 0 auto;
      }
      #pageToolbar {
        padding: 20px;
      }
    }
    //����ҳ
    .page-three {
      .table {
        tr {
          td {
            vertical-align: middle;
          }
        }
        tbody {
          tr {
            td {
              word-wrap: break-word;
              max-width: 450px;
              border-top: 0 none;
            }
          }
        }
        thead {
          tr {
            td {
              white-space:nowrap;
            }
          }
        }
      }
      .btn-upload {
        width: 238px;
        height: 34px;
        background-color: #62abf2;
        border: 1px solid #519fea;
        color: #fff;
        margin-top: 30px;
      }
      .material-list {
        .td-creative-content {
          max-width: 200px;
          word-break: break-all;
        }
        .td-monitor {
          max-width: 200px;
          word-break: break-all;
        }
      }
      .creative-box {

        .form {
          border-bottom: 0 none;
        }
        .select-tmp .dropdown-filter {
          width: 350px;
          .dropdown-toggle {
            width: 100%;
          }
          .dropdown-menu {
            li {
              margin-bottom: 5px;
              a {
                width: 60%;
                float: left;
              }
            }
          }
        }
        .mask {
          width: 100%;
          height: 100%;
          background: rgba(0,0,0, .4);
          position: fixed;
          top: 0;
          left: 0;
        }
        .creative-main {
          width: 635px;
          height: 100%;
          background-color: #fff;
          position: fixed;
          top: 0;
          right: 0;
          color: #333;
          .form-box {
            height: calc(~"100% - 145px");
            overflow-y: auto;
          }
          .creative-main-head {
            padding-left: 20px;
            height: 70px;
            line-height: 70px;
            background-color: #fafafa;
            font-size: 18px;
          }
          .line {
            display: block;
            width: 470px;
            height: 1px;
            background-color: #ccc;
            margin-left: 120px;
          }
          .upload-tip:hover {
            .upload-tip-content {
              display: block;
            }
          }
          .upload-tip {
            vertical-align: middle;
            display: inline-block;
            text-align: center;
            width: 15px;
            height: 15px;
            line-height: 12px;
            margin-left: 2px;
            background-color: #fffee5;
            color: #d8d58d;
            border: 1px solid #d8d58d;
            border-radius: 100%;
            cursor: default;
            position: relative;
            .upload-tip-content {
              display: none;
              position: absolute;
              padding: 0 15px;
              height: 30px;
              line-height: 30px;
              top: -7px;
              left: 20px;
              border: 1px solid #d8d58d;
              white-space:nowrap;
            }
            .upload-tip-content.mult {
              padding: 4px 15px;
              height: auto;
              line-height: 16px;
            }
          }
          .upload-pic-info {
            width: 370px;
            height: 70px;
            background-color: #f5f5f5;
            padding: 10px;
            margin-top: 10px;
            border-radius: 5px;
            >div {
              height: 50px;
            }
            >div:nth-child(1) {
              width: 50px;
              position: relative;
              border-radius: 5px;
              img,video {
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
              .enlarge {
                .icon-enlarge {
                  width: 50px;
                  height:50px;
                  border-radius: 5px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: rgba(0,0,0,.4) url("../../../common/img/sk2-images/icon-enlarge.png") no-repeat center;
                  cursor: pointer;
                }
              }
            }
            >div:nth-child(2) {
              padding: 0 10px;
              line-height: 50px;
            }
            >div:nth-child(3) {
              height: 50px;
              line-height: 58px;
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                cursor: pointer;
              }
              .icon-material-set {
                background: url("../../../common/img/sk2-images/icon-material-set.png") no-repeat center;
              }
              .icon-material-delete {
                background: url("../../../common/img/sk2-images/icon-material-delete.png") no-repeat center;
              }
            }
          }
          .w75 {
            width: 75%;
          }
          .inline-blcok {
            display: inline-block;
          }
          .star-box {
            position: relative;
            .btn-star {
              width: 100px;
              height: 24px;
              margin: 0 auto;
              border: 1px solid #cccccc;
              border-radius: 12px;
              padding: 0 15px;
              line-height: 22px;
              cursor: pointer;
              // background: url("../../../common/img/sk2-images/icon_arr.png") no-repeat left 17px center;
              i {
                width: 12px;
                height: 12px;
                margin-right: 5px;
                margin-top: 6px;
                float: left;
                background: url("../../../common/img/sk2-images/icon_arr.png") no-repeat center;
                transform: rotate(180deg);
              }
            }
            .star-line {
              position: absolute;
              height: 1px;
              width: 235px;
              top: 12px;
              background-color: #cccccc;
            }
            .line1 {
              left: 20px;
            }
            .line2 {
              right: 20px;
            }
            .form-group {
              display: none;
            }
          }
          .star-box.open {
            .btn-star i {
              transform: rotate(0deg);
            }
            .form-group {
              display: block;
            }
          }
        }
        .creative-main-footer {
          width: 100%;
          height: 75px;
          line-height: 75px;
          text-align: center;
          position: absolute;
          left: 0;
          bottom: 0;
          border-top: 1px solid #ccc;
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
            background-color: #fff;
            position: absolute;
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
    .page-four {
      .flowSource {
        .pkg-crowd {
          float: left;
          position: relative;
          width: 48%;
          height: 108px;
          background-size: 100% 100%;
          margin-bottom: 10px;
          .radio-box {
            float: left;
            width: 4%;
            height: 100%;
            line-height: 106px;
          }
          .name-box {
            float: left;
            width: 32%;
            height: 100%;
            border: 1px solid #e6e6e6;
            text-align: center;
            padding-top: 29px;
            img {
              width: 28px;
              height: 28px;
            }
          }
          .remark-box {
            float: left;
            width: 62%;
            height: 100%;
            padding: 0 25px;
            border: 1px solid #e6e6e6;
            border-left: 0 none;
            text-align: center;
            line-height: 106px;
            span {
              display: inline-block;
              line-height: 20px;
            }
          }

          .line-hei {
            line-height: 150px;
          }

          .label-icon {
            position: absolute;
            width: 58px;
            height: 16px;
            left: 25px;
            top: 0px;
          }
        }

        .pkg-industry{
          width: 60%;
          height: 106px;
          margin-bottom: 10px;
          .radio-box {
            float: left;
            width: 5%;
            height: 100%; 
            line-height: 106px;
            padding-left: 10px;
          }
          .app-list {
            width: 95%;
            border: 1px solid #ccc;
            height: 100%;
            float: left;
            .name-box {
              float: left;
              width: 18.5%;
              height: 106px;
              line-height: 106px;
              text-align: center;
              border-right: 1px solid #ccc;
            }
            .app-box {
              width: 81%;
              height: 100%;
              padding: 15px 10px;
              float: left;
              overflow-y: hidden;
              overflow-x: auto;
              li {
                float: left;
                width: 126px;
                height: 106px;
                padding: 0 10px;
                .img-box {
                  height: 44px;
                  text-align: center;
                  border-bottom: 1px solid #ccc;
                  img {
                    width: 34px;
                    height: 34px;
                  }
                }
                .app-name-box {
                  height: 25px;
                  text-align: center;
                }
              }
            }
          }
          .app-list:hover, .app-list:hover .name-box {
            border-color: #3e9cfa;
          }

          .pkg-checked, .pkg-checked .name-box {
            border-color: #3e9cfa;
          }
        }
        >li:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .unit {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: #ccc;
      padding: 0 10px;
    }
    
  }

  //����ʱ��
  .skuTime {
    display: none;
    text-align: center;
    .select-time {
      margin-top: 32px;
    }
  }
  .checkCalendar {
    margin: 10px auto;
  }
  //������
  .custom-box {
    .left {
      min-width: 535px;
      height: 430px;
      border-radius: 2px;
      overflow: hidden;
      color: #0e1e45;
      .cus-title {
        height: 38px;
        line-height: 38px;
        text-indent: 10px;
        background: #f5f9fc;
        color: #0e1e45;
        width: 100%;
        border-bottom: 1px solid #E1E5EC;
        position: relative;
        .icon-search {
          display: inline-block;
          background: url(../../../common/img/sk2-images/icon_media_search.png) no-repeat center center;
          width: 18px;
          height: 16px;
          cursor: pointer;
          position: absolute;
          top: 50%;
          margin-top: -9px;
          left: 70px;
        }
        .search-input {
          width: 100%;
          position: absolute;
          left: 0;
          top: 36px;
          border-color: #cfccc7;
        }
        .type-drop {
          width: 80px;
          position: absolute;
          right: 10px;
          top: 50%;
          margin-top: -15px;
        }
      }
      .select-box {
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;
        ul.one {
          color: #fff;
          li {
            width: 520px;
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            margin: 5px 0px;
            cursor: pointer;
            ul.two {
              position: absolute;
              right: 0;
              top: 0;
              li {
                width: 370px;
                display: none;
                border-left: 2px solid transparent;
              }
              >li.current {
                background: url('../../../common/img/sk2-images/li-bg.png') no-repeat 15px;
                height: 100%;
                background-size: 50% 100%;
              }
              ul.three {
                position: absolute;
                height: 390px;
                overflow: auto;
                right: 0;
                top: 0;
                li {
                  width: 180px;
                  border-left: none;
                }
              }
            }
            .check {
              margin-right: 0;
            }
          }
          li.current {
            background: url('../../../common/img/sk2-images/li-bg.png') no-repeat 5px;
            height: 100%;
            background-size: 33% 100%;
            >ul>li {
              display: block!important;
            }
          }
          .three {
            li.current {
              background: none;
              height: auto;
            }
          }
          .bgfff {
            background-color: #fff;
            border-left: 1px solid #E1E5EC;
          }
        }
      }
    }
    .middle {
      width: 120px;
      height: 430px;
      position: relative;
      .dsp-btn {
        position: absolute;
        left: 10px;
        top: 50%;
        margin-top: -17px;
      }
    }
    .right {
      width: 500px;
      height: 430px;
      padding-top: 20px;
      background-color: #4d5c6e;
      border-radius: 10px;
      li {
        padding: 0px 20px;
        float: left;
        position: relative;
        font-size: 14px;
        color: #000;
        background: #fff;
        margin: 0 0px 10px 10px;
        span {
          position: absolute;
          width: 10px;
          height: 10px;
          right: 5px;
          top: 50%;
          margin-top: -5px;
          cursor: pointer;
          background: url("../../../common/img/sk2-images/icon_remove.png") no-repeat;
        }
      }
    }
  }

  //ȫ�������Ż�
  .publish-source {
    width: 750px;
    overflow: hidden;
    .filter-box {
      span {
        padding: 0 15px;
        border: 1px solid #cfccc7;
        border-radius: 20px;
        background-color: #fdfdfc;
        cursor: pointer;
        margin-right: 5px;
        color: #000;
      }

    }
    .content {
      background-color: #4d5c6e;
      ul {
        width: 740px;
        max-height: 360px;
        overflow-y: auto;
        padding-top: 14px;
      }
      li {
        width: 170px;
        height: 88px;
        position: relative;
        margin-left: 5px;
        margin-bottom: 5px;
        padding: 8px 9px 0 20px;
        float: left;
        cursor: pointer;
        .ps-pic {
          width: 34px;
          height: 34px;
          .icon {
            width: 34px;
            height: 34px;
          }
        }
        .ps-text {
          width: 65px;
          line-height: 34px;
          padding-left: 5px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        img {
          width: 100%;
          height: 42px;
        }
      }
    }
  }

  .creative-library {
    .table {
      text-align: left;
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
  }
  .footer {
    width: 100%;
    padding: 50px 0;
  }
  //��ťdisable
  .btn-not {
    background: #999999;
    cursor: not-allowed;
    border-color: #999999;
  }

  .video_temp_box {
    width: 0;
    height: 0;
    position: relative;
    overflow: hidden;
    .video_temp {
      position: absolute;
      top: 0;
      left:9999px;
    }
  }
  
  .video-box {
    display: none;
    video {
      width: 500px;
      display: block;
    }
  }
}

th.switch {
  display: table-cell;
  height: auto;
  background: none;
  cursor: default;
}

.layui-layer-page .layui-layer-content {
  text-align: center;
}

@media screen and (max-width: 1750px) {
  .ag-new-order .custom-box .left {
    min-width: 320px;
  }
  .ag-new-order .custom-box .left .select-box ul.one li {
    width: 320px;
  }
  .ag-new-order .custom-box .left .select-box ul.one li ul.two li {
    width: 220px;
  }
  .ag-new-order .custom-box .left .select-box ul.one li ul.two ul.three li {
    width: 105px;
  }
  .ag-new-order .custom-box .right {
    width: 280px;
  }
}
.layui-layer-tips {
  left: 560px!important;
}

::-webkit-scrollbar-track-piece {  
    background-color: transparent;  
    border-left: 0 none;  
}  
::-webkit-scrollbar {  
    width:8px;  
    height:13px;  
}  
::-webkit-scrollbar-thumb {  
    background-color: #3a4552;  
    background-clip: padding-box;  
    border-radius: 6px;  
}  
::-webkit-scrollbar-thumb:hover {  
    border: 0 none;  
}
</style>