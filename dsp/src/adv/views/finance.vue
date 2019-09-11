<template>
    <div>
        <financeSk1 v-if="SKIN == 1"></financeSk1>
        <financeSk2 v-if="SKIN == 2"></financeSk2>
    </div>
</template>
<script>
import financeSk1 from "adv@/components/finance/finance-sk1";
import financeSk2 from "adv@/components/finance/finance-sk2";
export default {
    components: {
        financeSk1,
        financeSk2,
    },
    data() {
        return {
           
        };
    },
    created() {
        
    },
    methods: {

    }
};
</script>
<style lang="less">
</style>
