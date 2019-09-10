<template>
    <div>
        <div class="dropdown dropdown-input">
            <input class="form-control dropdown-toggle" data-toggle="dropdown" @blur="blurFunc(value)" v-model="value" @keyup="keyUp($event,value)" :placeholder="placeholder"/>
            <span class="caret"></span>
            <ul class="dropdown-menu">
                <li v-show="list.length == 0">内容为空</li>
                <li v-for="item in list" @click="clickFunc(item)"><a href="javascript:;">{{item.name}}</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
                value:"",
                clickCallback:"",
                nameAttr: "",
        }
    },
    props: {
        placeholder: {
            type: String,
            default: "全部活动"
        },
        list: {
            type: Array,
            default: []
        }
    },
    methods: {
        hasName(item){
            return item[this.nameAttr].indexOf(this.value) != -1
        },
        clickFunc(item) {
            this.value = item[this.nameAttr];
            this.clickCallback && this.clickCallback(item);
        },
        blurFunc(item) {
            // this.blurCallback && scope.blurCallback(item);
        },
        keyUp($event,item) {
            scope.keyUpCallback && scope.keyUpCallback($event,item);
        }
    },
}
</script>
<style lang="less">
    
</style>