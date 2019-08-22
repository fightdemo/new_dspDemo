<template>
    <div>
        <indexSk1 v-if="SKIN == 1"></indexSk1>
        <indexSk2 v-if="SKIN == 2"></indexSk2>
    </div>
</template>

<script>
import indexSk1 from '../components/index-sk1.vue'
import indexSk2 from '../components/index-sk2.vue'
export default {
    components: {
        indexSk1,
        indexSk2
    }
}
</script>