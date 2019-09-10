<template>
    <div>
        <indexSk1 v-if="SKIN == 1"></indexSk1>
        <indexSk2 v-if="SKIN == 2"></indexSk2>
    </div>
</template>
<script>
import indexSk1 from '../components/indexSk1'
import indexSk2 from '../components/index/index-sk2'
export default {
    components: {
        indexSk1,
        indexSk2
    },
};
</script>
<style lang="less">
</style>
