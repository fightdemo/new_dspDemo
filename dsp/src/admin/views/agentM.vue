<template>
    <div>
        <agentM-sk1 v-if="SKIN == 1"></agentM-sk1>
        <agentM-sk2 v-if="SKIN == 2"></agentM-sk2>
    </div>
</template>
<script>
import agentMsk1 from "../components/agentM-sk1"
import agentMsk2 from "../components/agentM-sk2"
export default {
    data() {
        return {
            
        };
    },
    mounted() {
       
    },
    computed: {
        
    },
    watch: {
        
    },
    methods: {
    

    },
    components: {
        "agentM-sk1": agentMsk1,
        "agentM-sk2": agentMsk2,
    }
};
</script>
<style lang="less">
.w245 {
    width: 245px;
}
.w80 {
    width: 80px;
}

.table {
    // width: 100%;
    .table-top {
        line-height: 60px;
    }
}


// @media screen and (max-width: 1720px) {
//     .dsp_edit{
//         white-space: nowrap;
//     }
// }
</style>


