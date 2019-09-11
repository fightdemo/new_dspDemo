<template>
    <div>
        <qualificationSk1 v-if="SKIN == 1"></qualificationSk1>
        <qualificationSk2 v-if="SKIN == 2"></qualificationSk2>
    </div>
</template>
<script>
import qualificationSk1 from "adv@/components/qualification/qualification-sk1";
import qualificationSk2 from "adv@/components/qualification/qualification-sk2";
export default {
    components: {
        qualificationSk1,
        qualificationSk2,
    }
};
</script>
<style lang="less">
</style>
