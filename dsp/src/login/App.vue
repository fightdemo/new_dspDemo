<template>
    <div style="width:100%;height: 100%;">
        <login-skin-one v-if="SKIN == 1"></login-skin-one>
        <login-skin-two v-if="SKIN == 2"></login-skin-two>
        <login-skin-three v-if="SKIN == 3"></login-skin-three>
    </div>
</template>

<script>


import LoginSkinOne from "login@/views/login1"
import LoginSkinTwo from "login@/views/login2"
import LoginSkinThree from "login@/views/login3"
export default {
    components: {
        LoginSkinOne,
        LoginSkinTwo,
        LoginSkinThree
    },
    name: "App",
    data() {
        return {};
    },
    mounted() {},
    methods: {}

    
};
</script>

<style lang="less">

</style>

