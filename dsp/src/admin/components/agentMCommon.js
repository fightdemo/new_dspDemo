let mixin = {
    data() {
        return {
            platformList: [{name:'全部平台'},{id:'android',name:'Android'},{id:'ios',name:'iOS'}],
            chargeTypeList: [{name:'全部资源类型'},{id:'cpc',name:'CPC'},{id:'cpm',name:'CPM'}],
            dealTypeList: [{name:'全部采买类型'},{id:'pdb',name:'保价保量'},{id:'pd',name:'保价不保量'}],
            stateList: [{name:'全部状态'},{id:'10',name:'待执行'},{id:'20',name:'执行中'},{id:'30',name:'交易结束'},{id:'40',name:'已售罄'}],
        }
    },
    mounted() {
 
    },
    methods: {
       
       
    }
}

export {mixin}