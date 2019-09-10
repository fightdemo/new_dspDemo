<template>
  <div
    class="check"
    :class="{'disabled':disabled,'checked':value === undefined ? module : module.indexOf(value) !== -1}"
    @click="clickFunc"
  >
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
            var check;
            if(this.disabled) return;
            if(this.value === undefined) {
                // 不存在value,module值为true或false
                check = this.module = !this.module;
            } else {
                // 存在value,module值为数组
                var index = this.module.indexOf(this.value);
                check = index == -1;
                if(check) {
                    this.module.push(this.value);
                } else {
                    this.module.splice(index,1);
                }
            }
        }
    }
};
</script>

<style lang="less">
</style>