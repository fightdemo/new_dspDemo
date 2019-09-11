<template>
    <div>
        <activitySk1 v-if="SKIN == 1"></activitySk1>
        <activitySk2 v-if="SKIN == 2"></activitySk2>
    </div>
</template>
<script>
import activitySk1 from 'adv@/components/activity/activity-sk1'
import activitySk2 from 'adv@/components/activity/activity-sk2'
export default {
    components: {
        activitySk1,
        activitySk2,
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
