<template>
    <div class="newActive-page page">
        <!--页面标题-->
        <h3 class="page-title">{{obj.name}}</h3>

        <!--form表单-->
        <div class="form cl">
            <div class="form-group">
                <label><span class="star">*</span>活动名称：</label>
                <input type="text" class="form-control" placeholder="请输入活动名称" v-model="obj.dataObj.name"/>
            </div>
            <div class="form-group">
                <label><span class="star">*</span>活动时间：</label>
                <div class="flatform cl">
                    <div class="fl">
                        <div class="dropdown data_show fl" style="margin-left: 0px;">
                            <button  class="btn btn-default dropdown-toggle" type="button" id="dpd1"
                                    data-toggle="dropdown" ng-disabled="startLimit">
                                {{obj.start}}
                            </button>
                            <span class="caret"></span>`
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="fr">  长期投放 ( 仅设置开始时间 )</span>
                        <!-- <check value="value" module="module" callback="checkTimeback"></check> -->

                        <div class="dropdown data_show fr" style="margin-right: 0px;" >
                            <button class="btn btn-default dropdown-toggle" type="button" id="dpd2"
                                    data-toggle="dropdown" ng-disabled="timeLimit" style="width: 197px;height: 30px;" ng-bind="timeLimit? '' : obj.end">
                            </button>
                            <span class="caret"></span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="form-group cl">
                <label><span class="star">*</span>总预算：</label>
                <!-- <check-input module='checkAll' value="1" module-input="obj.dataObj.totalBudget" callback="allCall">check1</check-input><span class="fl">无预算限制</span> -->
            </div>

            <div class="form-group cl">
                <label>每日预算：</label>
                <div>
                    <!-- <check-input module='checkDay' value="2" module-input="obj.dataObj.dayBudget" callback="dayCall">check2</check-input><span class="fl">无预算限制</span> -->
                </div><br>
            </div>
            <div class="form-group frequency">
                <label>频次控制：</label>
                <input type="text" class="form-control" ng-model="obj.dataObj.frequency"/>次/&nbsp;&nbsp;&nbsp;&nbsp; <dropdown title="obj.frequencyType" list="select"></dropdown>
            </div>
            <div class="form-group chooseType">
                <label><span class="star">*</span>行业分类：</label>
                <dropdown title="firstType" list="firstList"></dropdown>
                <dropdown title="secondType" list="secondList"></dropdown>
            </div>
        </div>
        <div class="btns">
            <button type="button" class="dsp-btn btn-blue" ng-click="saveActive();">保存</button>
            <button type="button" class="dsp-btn btn-green" ng-click="saveAngOrder();" v-if='permission.act[65]'>保存并创建订单</button>
            <button type="button" class="dsp-btn btn-white fr" @click="$router.go(-1)">取消</button>
        </div>

        <div class="orderType">
            <a ng-click="addOrder('1')">
                <div>
                    <!-- <img src="./images/pic-contract.png" alt=""/> -->
                </div>
                <p>竞价交易</p>
            </a>
            <a ng-click="addOrder('2')">
                <div>
                    <!-- <img src="./images/pic-bid.png" alt=""/> -->
                </div>
                <p>合约交易</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            obj: {
                // 'start':date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日",
                // 'end':date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日",
                'znode':[],
                'spaceIdArr' :[],
                'spaceObj':{},
                'appID': "",
                'dataObj':{
                    "industry": "" ,        //行业分类
                    'frequencyUnit':'day',  //频次限制单位，默认天
                    'dayBudget':'0' ,       //日预算，默认不限制
                    'totalBudget':'0' ,     //总预算，默认不限制
                    'industryName':''       //行业分类的名称
                },
                'name':'新建活动',
                'frequencyType':'天'
            },

        }
    }
}
</script>

<style lang="less">
// @import "../../../lib/Datepicker20161107/css/foundation-datepicker.css";

.newActive-page {
  .btn.disabled, .btn[disabled], fieldset[disabled] .btn{opacity: 1;background-color: #f3f3f3;}
  .page-title{height: 96px;}
  .form{margin-top: 20px;padding-top: 20px;}
  .flatform .check{float: right;margin-left: 10px;margin-right: 3px;}
  //�������������ʽ
  .choose_versions .zTreeDemoBackground,.location .zTreeDemoBackground{height: 320px;width: 214px;border: 1px solid #ccc;}
  .choose_versions .zTreeDemoBackground ul.ztree,.location .zTreeDemoBackground ul.ztree{background: #fff;overflow-y:visible;width: 177px;border: 0px;height: 260px;overflow: auto;}
  .btn_right{margin: 146px 14px;cursor: pointer;}
  .showBox{width: 214px;height: 320px;border: 1px solid #ccc;overflow: auto;text-align: center;}
  .showBox .btns img{margin-top: 3px;cursor: pointer;}
  .zTreeDemoBackground .search{position:relative;width: 100%;height:34px;border-bottom: 1px solid #ccc;background-color: #f5f5f5; font-size: 12px;}
  .zTreeDemoBackground .search .icon_search{position:absolute;top:1px;left:9px;background: url("../../../common/img/sk2-images/icon_search.png")no-repeat;width: 16px;height: 16px;margin-top: 7px;margin-right: 3px;}
  .zTreeDemoBackground .search input{border: 1px solid #ccc;margin-top: 4px;margin-left: 5px;padding-left: 28px;width: 96%;height: 24px;line-height: 24px;}
  .showBox .btns{height: 34px;border-bottom: 1px solid #ccc;background-color: #f5f5f5;}
  .showBox .btns .dropdown{width: 88px;height: 24px;margin-top: 4px;margin-left: 4px;cursor: pointer;}
  .showBox .btns .dropdown .btn{width: 100%;height: 26px;line-height: 15px;text-align: center;font-size: 12px;color: #595959;}
  .showBox .btns .dropdown .dropdown-menu{width: 100%; }
  .showBox .btns .dropdown .caret{margin-left: 24px;}
  .showBox .btns span:nth-child(2){width: 68px;margin-right: 4px;border: 0px;height: 24px;margin-top: 4px;cursor: pointer;}
  .ztree li span.button.ico_open{display: none;}
  .ztree li span.button.ico_docu{display: none;}
  .ztree li span.button.ico_close{display: none;}
  .showBox .selec_cont{padding-top: 10px;}
  .showBox .selec_cont span{width: 100%;font-size: 12px;padding-left: 7px;color: #595959;padding-top: 5px;text-align: left;}
  .showBox .selec_cont span img{margin-top:4px;margin-right:4px;cursor: pointer;}
  .showBox .dropdown-menu>li>a{padding-left: 10px;text-align: center;}
  .choose_versions >span{float: left;}
  .choose_versions .spaceBox{float: left;}
  .confirm_btns {margin-top: 20px;padding: 20px;}
  .confirm_btns .btn-info{margin-left: 20px;}
  .checkInput{float:left;}
  .yusuan{float: left;margin-top: 20px;}
  .yusuan .form-control{display: inline-block;width: 114px;}
  .frequency .form-control{display: inline-block;width: 149px;margin-right: 20px;}
  .btns{margin-top: 30px;}
  .btns .btn:nth-child(1){background-color: #4a9dd2;border: 1px solid #4a9dd2 !important;}
  .btns .btn:nth-child(2){background-color: #15a384;border: 1px solid #19bc98 !important;}
  .btns .btn:nth-child(3){background-color: #b3b3b3;border: 1px solid #b3b3b3 !important;}
  .btns .btn:nth-child(3)[focus]{background-color: #b3b3b3;border: 1px solid #b3b3b3 !important;}
  .data_show .btn{padding: 4px 44px;}
  .data_show .caret{position: absolute;right: 20px;top: 16px;}
  .dropdown-filter .btn{padding: 4px 12px;margin-top: -7px;}
  .chooseType .dropdown-menu{max-height: 200px;width: 100%;overflow: auto;}
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
}
</style>