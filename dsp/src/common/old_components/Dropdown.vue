<template>
    <div class="dropdown dropdown-filter" :class="{disabled:disabled}">
        <button class="btn btn-default dropdown-toggle cl" data-toggle="dropdown">
            <input style="width: 55%; display: inline-block;background-color:transparent;cursor:inherit;border:none;" v-model="value" type="text" readonly="readonly" autocomplete="off" :placeholder="title">
            <!-- <span v-show="publish" class="estimate">
                <span>流量占比：{{currEstimate * 100}}%</span>
                <span :style="{'width': currEstimate * 100+'%'}"></span>
            </span> -->
        </button>
        <span class="caret"></span>
        <ul class="dropdown-menu">
            <li class="cl" v-for="item in list" :key="item.id" @click="clickFunc(item)">
                <a :title="item[valueName]" href="javascript:;">{{item[valueName]}}</a>
                <!-- <span v-show="publish" class="estimate fl">
                    <span>流量占比：{{estimate[item.templateId] * 100}}%</span>
                    <span :style="{'width': estimate[item.templateId] * 100 +'%'}"></span>
                </span> -->
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue' 
export default {
    data() {
        return {
            visible: false,
            value: '',
        }
    },
    watch: {
        title(val) {
            this.value = val;
        },
    },
    props: {
        list: {
            type: Array|Object,
            default: () => []
        },
        keyName: {
            type: String,
            default: 'id'
        },
        valueName: {
            type: String,
            default: 'value'
        }, 
        publish: {
            type: Boolean,
            default: false
        }, 
        disabled: {
            type: Boolean,
            default: false
        }, 
        title: {
            type: String,
            default: ''
        }, 
    },
    computed: {
        wrap() {
            return this.$refs.wrap;
        }
    },
    mounted() {      
        if(this.title) {
            this.val = this.title;
        }
    },

    methods: {
        clickFunc(item) {
            this.value = item[this.valueName];
            this.$emit('change', item)
        }


    }
}
</script>

<style lang="less">

</style>
