<template>
    <div class="qualification-page page">
        <h3 class="page-title">资质管理</h3>
        <div class="form">
            <div class="form-title">
                <span class="form-title-font">基本信息</span>
                <button v-if='permission.act[73]' v-show="obj.isEditInfo" class="dsp-btn btn-white" ng-click="upLoad(obj.flag)">编辑</button>

                <button class="dsp-btn btn-white" v-show="!obj.isEditInfo" ng-click="upLoad(obj.flag)">关闭</button>
                <button class="dsp-btn btn-green" v-show="!obj.isEditInfo" ng-click="saveQualification()">保存</button>
            </div>
            <div v-show="obj.isEditInfo">
                <div class="form-group" v-for="(item, index) in list" :key="index">
                    <label>{{item.name}}</label>
                    <div class="form-static" v-if="item.isString">{{item.url}}</div>
                    <a class="form-link" v-if="!item.isString && item.url!=''" ng-click="showPhoto(item.url)">查看</a>
                    <a class="form-link" v-if="!item.isString && item.url==''" style="color: #19bc98 !important">暂未上传</a>

                </div>
            </div>
            <div v-show="!obj.isEditInfo" id="container">
                <div class="form-group" v-for="(item, index) in list" :key="index">
                    <label><span class="star" v-if="item.isNecessary">*</span>{{item.name}}</label>
                    <input type="text" class="form-control" v-if="item.isString" v-model="item.url"/>
                    <button class="dsp-btn btn-green" :id="'upload'+index" v-if="!item.isString">选择文件</button>
                    <div class="form-details-img" v-if="!item.isString && item.url" :style="{'background-image':'url('+item.url+')'}" ng-click="showPhoto(item.url)"></div>
                </div>
                <div class="form-group">
                    <label>其他资质：</label>
                    <p class="form-static"><a ng-click="addQua()" class="btn-font" href="javascript:;">添加其他资质</a><small>最多添加20个资质</small></p>
                </div>
                <div class="form-group" v-for="(qua,index) in quaList" :key="index">

                    <label>资质名称：</label>
                    <input type="text" class="form-control" v-model="qua.name"/>
                    <span>资质文件</span>
                    <button class="dsp-btn btn-green" :id="'upOther'+index">选择文件</button>
                    <a href="javascript:;" class="btn-font" ng-click="deleteQua($index)">删除</a>
                    <div class="form-details-img" v-if="qua.url" :style="{'background-image':'url('+qua.url+')'}" ng-click="showPhoto(qua.url)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            obj: {
                isEditInfo:true,
                flag:true,
                tempArr:[],
            },
            quaList: [],
            list: [],
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList(){
            this.$ajax({
                url: '/dsp/advertiser/qualification/list',
                data:{
                    "filter": {
                        "orgID": this.$route.params.advID
                    },
                },
                load: true
            }).then(res => {
                this.list = res.data;
                this.obj.tempArr = [];
                this.list.forEach((val,index) => {
                    if(val.isNecessary || val.isString){
                        this.obj.tempArr.push(val);
                    }
                })
                // this.upImg($scope,proxy,'upload',$scope.list);
            })
        }
    }
}
</script>

<style lang="less">
.qualification-page {
  .btn-group, .btn-group-vertical{margin-left: 66px;}
  .btn-green {
    margin-right: 30px;
  }
  .form-group {
    padding-left: 200px;
    > label {
      width: 180px;
    }
    span {
      font-weight: 700;
      margin-right: 10px;
    }
    .form-control {
      margin-right: 20px;
      display: inline-block;
    }
    .btn-green {
      margin-right: 30px;
    }
    small {
      margin-left: 40px;
      color: #dedcd6;
    }
  }
}
</style>