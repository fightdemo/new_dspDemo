<template>
    <div style="padding:0 40px;">
        <newOrder-sk1 v-if="SKIN == 1"></newOrder-sk1>
        <newOrder-sk2 v-if="SKIN == 2"></newOrder-sk2>
    </div>
</template>

<script>
import newOrderSk1 from "./newOrder-sk1"
import newOrderSk2 from "./newOrder-sk2"
export default {
    filters: {
        
    },
    components: {
        'newOrder-sk1': newOrderSk1,
        'newOrder-sk2': newOrderSk2,
    },
    data() {
        return {
            
        }
    },
    watch: {

    },
    mounted() {
        
        
    },
    computed: {
       
    },
    methods: {

    }
}
</script>

<style lang="less">
</style>
