<template>
    <div id="app">
        <button type="button" class="dsp-btn btn-blue newActive" @click="checkout()" style="position:absolute;z-index:99;">切换皮肤{{SKIN == 2 ? 1 : 2}}</button>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    mounted() {
        this.judgePlatform();
    },
    methods: {
        judgePlatform(){
            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                document.getElementById("app").style.minWidth = '1100px';
            }
        },
        checkout() {
            let SKIN = localStorage.getItem("SKIN") * 1;
            if(SKIN) {
                SKIN = SKIN == 1 ? 2 : 1;
            }
            localStorage.setItem("SKIN", SKIN * 1)
            this.$router.go(0);
        }
    }
};
</script>

<style lang="less">
#app{
    // min-width: 1100px;
    padding-left: 16%;
}
</style>
