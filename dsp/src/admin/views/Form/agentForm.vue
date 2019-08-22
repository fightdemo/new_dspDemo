<template>
    <div>
        <agentFormSk1 v-if="SKIN == 1"></agentFormSk1>
        <agentFormSk2 v-if="SKIN == 2"></agentFormSk2>
    </div>
</template>
<script>
import agentFormSk1 from '../../components/agentForm-sk1'
import agentFormSk2 from '../../components/agentForm-sk2'
export default {
    components: {
        agentFormSk1,
        agentFormSk2
    }
}
</script>



