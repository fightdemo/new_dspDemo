<template>
    <div>
        <baseSk1 v-if="SKIN == 1"></baseSk1>
        <baseSk2 v-if="SKIN == 2"></baseSk2>
    </div>
</template>
<script>
import baseSk1 from "adv@/components/base/base-sk1"
import baseSk2 from "adv@/components/base/base-sk2"
export default {
    components: {
        baseSk1,
        baseSk2,
    },
};
</script>
<style lang="less">
</style>
