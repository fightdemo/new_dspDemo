<template>
    <div>
        <craetiveSk1 v-if="SKIN == 1"></craetiveSk1>
        <craetiveSk2 v-if="SKIN == 2"></craetiveSk2>
    </div>
</template>
<script>
import craetiveSk1 from "adv@/components/creative/creative-sk1"
import craetiveSk2 from "adv@/components/creative/creative-sk2"
export default {
    
    components: {
        craetiveSk1,
        craetiveSk2,
    },
    data() {
        return {
        
        };
    },
    mounted() {
    },
    methods: {
           
    }
};
</script>
<style lang="less">
</style>
