<template>
    <div class="aginfo-page page">
        <h3 class="page-title">基本信息</h3>
        <div class="form">
            <div class="form-title">
                <span class="form-title-font">基本信息</span>
                <button v-if='permission.act[71]' v-show="!flagObj.isEditInfo" class="dsp-btn btn-white" @click="flagObj.isEditInfo = !flagObj.isEditInfo">编辑</button>

                <button class="dsp-btn btn-gray" v-show="flagObj.isEditInfo"  @click="flagObj.isEditInfo = false">取消</button>
                <button class="dsp-btn btn-blue" v-show="flagObj.isEditInfo"  ng-click="modify();">确定</button>
            </div>
            <div class="form-group">
                <label>账户名称：</label>
                <div class="form-static">{{obj.info.loginName}}</div>
            </div>
            <div v-show="!flagObj.isEditInfo">
                <div class="form-group">
                    <label>公司名称：</label>
                    <div class="form-static">{{obj.info.name}}</div>
                </div>
                <div class="form-group">
                    <label>公司网址：</label>
                    <div class="form-static">{{obj.info.wwwUrl}}</div>
                </div>
                <div class="form-group">
                    <label>公司地址：</label>
                    <div class="form-static">{{obj.info.address}}</div>
                </div>
                <div class="form-group">
                    <label>联系人：</label>
                    <div class="form-static">{{obj.info.contacts}}</div>
                </div>
                <div class="form-group">
                    <label>手机号码：</label>
                    <div class="form-static">{{obj.info.telephone}}</div>
                </div>
                <div class="form-group">
                    <label>电话号码：</label>
                    <div class="form-static">{{obj.info.phone}}</div>
                </div>
                <div class="form-group">
                    <label>QQ：</label>
                    <div class="form-static">{{obj.info.qq}}</div>
                </div>
            </div>
            <div v-show="flagObj.isEditInfo">
                <div class="form-group">
                    <label>公司名称：</label>
                    <input type="text" class="form-control" v-model="obj.info.name"/>
                </div>
                <div class="form-group">
                    <label>公司网址：</label>
                    <input type="text" class="form-control" v-model="obj.info.wwwUrl"/>
                </div>
                <div class="form-group">
                    <label>公司地址：</label>
                    <input type="text" class="form-control" v-model="obj.info.address"/>
                </div>
                <div class="form-group">
                    <label>联系人：</label>
                    <input type="text" class="form-control" v-model="obj.info.contacts"/>
                </div>
                <div class="form-group">
                    <label>手机号码：</label>
                    <input type="text" class="form-control" v-model="obj.info.telephone"/>
                </div>
                <div class="form-group">
                    <label>电话号码：</label>
                    <input type="text" class="form-control" v-model="obj.info.phone"  />
                </div>
                <div class="form-group">
                    <label>QQ：</label>
                    <input type="text" class="form-control" v-model="obj.info.qq"/>
                </div>
            </div>
            <div class="form-title">
                <span class="form-title-font">密码信息</span>
                <button v-if='permission.act[71]' v-show="!flagObj.isEditPwd" class="dsp-btn btn-white" @click="flagObj.isEditPwd = !flagObj.isEditPwd">编辑</button>

                <button class="dsp-btn btn-gray" v-show="flagObj.isEditPwd" @click="flagObj.isEditPwd = false">取消</button>
                <button class="dsp-btn btn-blue" v-show="flagObj.isEditPwd" ng-click="confirm();">确定</button>
            </div>
            <div v-show="!flagObj.isEditPwd">
                <div class="form-group">
                    <label>密码：</label>
                    <div class="form-static">******</div>
                </div>
            </div>
            <div v-show="flagObj.isEditPwd">
                <div class="form-group">
                    <label>旧密码：</label>
                    <input type="password" class="form-control" v-model="obj.pwd.oldPasswd"/>
                </div>
                <div class="form-group">
                    <label>新密码：</label>
                    <input type="password" class="form-control" v-model="obj.pwd.newPasswd"/>
                </div>
                <div class="form-group">
                    <label>确认密码：</label>
                    <input type="password" class="form-control" v-model="obj.pwd.confirmPasswwd"/>
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
                id: "",
                pwd:{},
                info: {},
            },
            flagObj: {
                isEditInfo: false,
                isEditPwd: false
            },
            
        }
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            this.$ajax({
                url: '/dsp/advertiser',
                data: {id: this.$route.params.advID}
            }).then(res => {
                this.obj.info = res.data;
            })
        }
    }
}
</script>

<style lang="less">
.aginfo-page {
  .dsp-btn {
    margin-right: 40px;
  }
}
</style>