<template>
    <div>
        <systemSk1 v-if="SKIN == 1"></systemSk1>
        <systemSk2 v-if="SKIN == 2"></systemSk2>
    </div>
</template>
<script>
import systemSk1 from "adv@/components/system/system-sk1"
import systemSk2 from "adv@/components/system/system-sk2"
export default {
    components: {
        systemSk1,
        systemSk2,
    }
}
</script>
<style lang="less">

</style>
