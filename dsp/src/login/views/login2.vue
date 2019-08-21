<template>
    <div class="cl" style="width:100%;height: 100%">
        <div class="login-left" :style="{'background':'url('+oem.background+') no-repeat center center / cover'}">
            
        </div>
        <div class="login-right">
            <div class="form-box">
                <div class="form-group logo-box">
                    <img width="100%" height="41" :src="oem.loginLogo">
                </div>
                <form id="ldoginForm">
                    <input @keyup.enter="login()" type="text" class="form-control user-input" name="Uid" placeholder="输入账号..." v-model="uid">
                    <input @keyup.enter="login()" type="password" class="form-control pwd-input" name="Passwd" placeholder="输入密码..." v-model="passwd">
                </form>
                <button class="btn btn-login" @click="login()">登录系统</button>
            </div>
        </div>
        
        <div class="copyright">{{oem.copyright}}&nbsp;&nbsp;&nbsp;&nbsp;{{oem.icp}}</div>
    </div>
</template>

<script>
import {mixin} from './common.js'
export default {
    mixins: [mixin],
}
</script>

<style lang="less">

</style>