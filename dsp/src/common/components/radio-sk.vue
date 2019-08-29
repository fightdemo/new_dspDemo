<template>
  <div class="radio" 
    :class="{'disabled':disabled,'checked':module==value}" 
    @click="clickFunc">
    <b></b>
    <span>
        <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            module: []
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickFunc() {
            if(this.disabled) return;
            if(this.module == this.value) return;
            this.module = this.value;
        }
    }
};
</script>

<style lang="less">
</style>