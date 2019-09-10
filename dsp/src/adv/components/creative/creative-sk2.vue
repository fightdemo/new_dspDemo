<template>
    <div class="creative-page page">
        <h3 class="page-title">
            素材信息
            <!-- <search value="filter.name" callback="search" placeholder="请输入素材名称"></search> -->
            <dropdown title="全部审核状态" list="stateList"></dropdown>
        </h3>
        <div class="filter-box clearfix">
            <div class="fr">
            </div>
        </div>
        <div class="table-box creative-table">
            <div class="table-title">
                <h3 class="table-title-font">素材信息</h3>
            </div>
            <table class="table spaceTable">
                <thead>
                    <th style="text-align:center;">素材</th>
                    <th>创意信息</th>
                    <th>素材内容</th>
                    <th>审核状态</th>
                </thead>
                <tbody v-for="i in list" :key="i.id">
                    <tr>
                        <td class="spaceInfo">
                            <div class="material-cover" v-if="i.hasImg" :style="{'background-image':'url('+i.preview+')'}">
                                <div class="material-cover-mask" @click="showImg(i.preview)"></div>
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
                                <div v-if="m.text" style="text-align: center;">
                                    <span>{{m.text.content}}</span>
                                </div>
                            </div>
                        </td>
                        <td class="spaceInfo">
                            <span>创意名称：{{i.name}}</span><br><br>
                            <span>创意ID：{{i.id}}</span><br><br>
                            <span>广告位类型：{{adTypes[i.adType]}}</span><br><br>
                            <span>交互方式：{{interactionTypes[i.interactionType]}}</span><br><br>
                        </td>
                        <td class="spaceContent">
                            <div v-for="(m, $mIndex) in i.material" :key="$mIndex">
                                <div v-if="m.image">
                                    <span>图片：</span>
                                    <a href="javascript:;" @click="showImg(m.image.url)">查看图片</a><br><br>
                                </div>
                                <div v-if="m.video">
                                    <span>视频：</span>
                                    <a href="javascript:;" ng-click="showVideo(m.video.url)">查看视频</a><br><br>
                                </div>
                                <div v-if="m.text">
                                    <span>文本：</span>
                                    <span>{{m.text.content}}</span><br><br>
                                </div>
                                <div v-if="m.data">
                                    <span>{{dataType[m.data.type]}}：</span>
                                    <span>{{m.data.content}}</span>
                                </div>
                            </div>
                            <div>
                                点击监测：
                                <button class="dsp-btn btn-gray" ng-click="checkUrl(i.clickUrls.join(','))">查看</button><br><br>
                                曝光监测：<button class="dsp-btn btn-gray" ng-click="checkUrl(i.viewUrls.join(','))">查看</button><br><br>
                                落地页：<button class="dsp-btn btn-gray" ng-click="openUrl(i.landingUrl)">查看</button>
                            </div>
                        </td>
                        <td class="btns">
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
                    </tr>
                </tbody>
            </table>
            <div class="page" id="pageToolbar"></div>
        </div>

        <!-- <div class="iframe-box">
            <iframe srcdoc="{{srcdoc|toTrusted}}" frameborder="0"></iframe>
        </div>
        <div class="video-box">
            <video ng-src="{{videoSrc}}" controls></video>
        </div> -->
    </div>
</template>

<script>
import * as Paging from "@/common/js/paging"
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
                var ids = [];
                data.forEach((v) => {
                    this.getPreview(v);
                    ids.push(v.id)
                })
                this.getAdxAudit(ids);
            })
        },

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

        getAdxAudit(ids){
            if(ids.length == 0) return;
            this.$ajax({
                url: '/dsp/creative/adx/auditList',
                load: true,
                data: {
                    data: ids
                }
            }).then(res => {
                // 获得列表
                ids.forEach((v,i) => {
                    this.$set(this.list[i], 'adxAuditList', res.data[v])
                })
            })
        },
        showImg(url) {
            layer.photos({
                photos: {
                    "data": [
                        {
                            "src": url,
                        }
                    ]
                },
                anim: 5
            });
        }
    }
}
</script>

<style lang="less">
.creative-page {
  .table {
    margin: 0;
    thead {
      background-color: #f0f0f0;
    }
    th {
      height: 20px;
      text-align: left;
    }
    tbody {
      tr {
        border-bottom: 1px solid #e0e5eb;
        td {
          text-align: left;
          vertical-align: middle;
          word-wrap: break-word;
        }
      }
    }
  }
  .table>thead>tr>th {
    border-bottom: 0px none;
  }
  .table>tbody>tr>td {
    border-top: 0 none;
  }
  .dropdown-filter {
    float: right;
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
  .spaceContent {
    max-width: 600px;
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
  .icon-error {
    width: 10px;
    height: 10px;
    margin-right: 4px;
    display: inline-block;
    background: url(../../../common/img/sk2-images/icon-error.png)
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
  .layer-style {
    border-radius: 5px;
  }

  .diagnosis-box {
    position: relative;
    width: 500px;
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 70px;
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
}
</style>