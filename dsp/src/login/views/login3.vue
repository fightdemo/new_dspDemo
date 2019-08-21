<template>
    <div style="width:100%;height: 100%">
        <div class="form-box">
            <div class="form-group logo-box">
                <img width="100%" height="100%" :src="oem.loginLogo">
            </div>
            <form id="ldoginForm">
                <div class="form-group">
                    <input @keyup.enter="login()" type="text" class="form-control user-input" name="Uid" placeholder="请输入用户名..." v-model="uid">
                    <input @keyup.enter="login()" type="password" class="form-control pwd-input" name="Passwd" placeholder="请输入密码..." v-model="passwd">
                </div>
            </form>
            <button class="btn btn-login" @click="login();">立即登录</button>
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