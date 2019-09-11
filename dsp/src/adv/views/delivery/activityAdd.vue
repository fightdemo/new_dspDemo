<template>
    <div>
        <activityAddSk1 v-if="SKIN == 1"></activityAddSk1>
        <activityAddSk2 v-if="SKIN == 2"></activityAddSk2>
    </div>
</template>
<script>
import activityAddSk1 from "adv@/components/activityAdd/activityAdd-sk1";
import activityAddSk2 from "adv@/components/activityAdd/activityAdd-sk2";
export default {
    components: {
        activityAddSk1,
        activityAddSk2,
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
