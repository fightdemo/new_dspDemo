<template>
    <div>
        <orderSk1 v-if="SKIN == 1"></orderSk1>
        <orderSk2 v-if="SKIN == 2"></orderSk2>
    </div>
</template>
<script>
import orderSk1 from "adv@/components/order/order-sk1"
import orderSk2 from "adv@/components/order/order-sk2"
export default {
    components: {
        orderSk1,
        orderSk2,
    },
    data() {
        return {
            
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>
<style lang="less">

</style>
