<template>
    <ul class="user-box cl">
        <li class="user-logout" ng-click="logout()"></li>
        <li class="user-name ng-binding">新版本测试环境测试</li>
        <li class="user-balance ng-binding">账户余额（元）：1034.62</li>
    </ul>      
</template>

<script>
export default {
    props: {
        navList: Array
    },
    mounted() {
    },
    computed: {
      
    },
    watch: {
     
    },
    methods: {

    }
}
</script>

<style lang="less">

</style>