<template>
    <div class="resDetail-page page">
        <h3 class="page-title">合约资源列表</h3>
        <div class="content bs main">
            <div class="content-title">
                {{sku.name}}
            </div>
            <ul class="res-info clearfix">
                <li>
                    <p>资源平台：{{sku.platform}}</p>
                    <p v-if="sku.skuType == 'pdb'">保价保量单价：{{sku.sellPrice| number(2)}} 元/{{sku.chargeType=='cpm'?'千次曝光':'点击'}}</p>
                    <p v-if="sku.skuType == 'pd'">保价不保量单价：{{sku.sellPrice| number(2)}}  元/{{sku.chargeType=='cpm'?'千次曝光':'点击'}}</p>
                </li>
                <li>
                    <p>售卖类型：{{sku.chargeType}}</p>
                    <p v-if="sku.skuType != 'pd'">资源天量：{{sku.amount}} {{sku.chargeType == 'cpm'?'千次曝光':'点击'}}/每天</p>
                    <p v-if="sku.skuType == 'pd'">时&nbsp;间&nbsp;段：<span v-if="sku.date">{{sku.date[0].startDate}}</span>-<span v-if="sku.date">{{sku.date[0].endDate}}</span>；共计{{sku.totalDay}}天</p>
                </li>
                <li v-if="sku.skuType != 'pd'">
                    <p>时&nbsp;间&nbsp;段：<span v-if="sku.date">{{sku.date[0].startDate}}</span>-<span v-if="sku.date">{{sku.date[0].endDate}}</span>；共计{{sku.totalDay}}天</p>
                </li>
            </ul>

            <ul class="space-list clearfix">
                <li v-for="(space, index) in sku.spacesDetail" :key="index">
                    <div class="space-title">广告位名称：{{space.spaceName}}</div>
                    <div class="app-name">App名称：<span class="app-cover" v-bind:style="{backgroundImage:'url('+space.appIcon+')'}"></span>{{space.appName}}</div>
                    <div class="space-cover" v-bind:style="{backgroundImage:'url('+space.examplePic+')'}"></div>
                </li>
            </ul>
        </div>
        <div class="content bs main buy-res">
            <div class="content-title">采买资源</div>
            <div class="content-form">
                <div class="form-group">
                    <label>订单名称：</label><m-Input class="form-control" placeholder="请输入资源名称" :value.sync="sku.name" :name="sku.name" size="big" maxlength="30"></m-Input>
                    <!-- <label style="margin-left:20px;">卖出价格：</label><m-Input class="form-control" placeholder="请输入卖出价格" :value.sync="sellPrice" size="big" maxlength="30"></m-Input> -->
                </div>
            </div>
        </div>
        <div class="content bs main clearfix group-btn">
            <el-input v-model="skuSellPrice" style="width: 300px"></el-input>
            <button class="btn-blue fr" @click="buy">确认采买合约资源</button>
            <button class="btn-white fr" onclick="history.go(-1)">返回</button>
        </div>
    </div>
</template>
<script>
import {
    number
} from "@/common/js/filter";
export default {
    data() {
        return {
            sku: [],
            skuID: 1,
            resName: "",
            // sellPrice: 0,
            skuSellPrice: '0.00',
        }
    },
    created(){
        this.getList()
        this.skuID = this.$route.params.id
    },
    methods: {
        getList(){
            var data = {
                'skuID': this.$route.params.id
            }
            this.$ajax({
                url: "/dsp/sku",
                load: true,
                data: data
            }).then( res => {
                console.log( res.data )
                this.sku = res.data
                this.skuSellPrice = res.data.sellPrice
            } )
        },
        //确认采买合约资源
        buy(){
            // this.sku.name = this.resName
            // this.sku.sellPrice = this.sellPrice
            // if(this.sku.skuType == "pd") {
			// 	this.sku.amount = "0";
            // }
            var sku = this.sku;
            if( Number(sku.sellPrice) > Number(this.skuSellPrice) ){ 
                this.$message.error("价格低于原价，请修改！");
                return
            }
            var data = {
                data: [{
                    id: this.$route.params.id,
                    setSellPrice: this.skuSellPrice
                }]
            }
            this.$ajax({
                url: "/dsp/sku/buy",
                load: true,
                data: data
            }).then( res => {
                this.$message.success("操作成功");
                this.$router.go(-1)
            } )
        }
    }
}
</script>
<style lang="less" scoped>
.resDetail-page {
  padding-bottom: 40px;
  .content{
      .content-title{
          font-size: 14px;
          font-weight: bold;
          padding: 0 20px;
          line-height: 56px;
          border-bottom: 1px solid #cccccc;
      }
  }
  .res-info {
    margin: 40px;
    background: #ffffff;
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
  .res-info:after{
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
        width: 0;
        line-height: 0;
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
          background-size: 100% 100%;
          background-position: center;
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
  .space-list:after{
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
        width: 0;
        line-height: 0;
    }
    .buy-res{
        border: 1px solid #cccccc;
        .content-form{
            margin-left: 17px;
            .form-group{
                padding-left: 78px;
                margin: 0;
                padding: 10px 0;
                min-height: 50px;
                line-height: 30px;
                position: relative;
                display: flex;
                label{
                    width: 68px;
                    font-size: 12px;
                    color: #595959;
                    font-weight: bold;
                    text-align: center;
                    line-height: 40px;
                    margin: 0;
                }
            }
        }
    }
    .btn-blue {
        width: 240px;
        height: 40px;
        margin-left: 10px;
        border: 1px solid #4a9dd2;
        background: #4a9dd2;
        color: white;
    }
    .btn-white {
        width: 120px;
        height: 40px;
        border: 1px solid #65b1d8;
        background: #fff;
        color: #65b1d8;
    }
    .group-btn {
        padding: 20px;
    }
    .group-btn:after{
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
        width: 0;
        line-height: 0;
    }
    .buy-res:after{
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
        width: 0;
        line-height: 0;
    }
}
</style>
