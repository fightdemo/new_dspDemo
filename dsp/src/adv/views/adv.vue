<template>
    <div class="adv-content">
        <!-- 用户信息 （皮肤2，3，4使用）-->
        
        <!-- 左侧菜单 （皮肤1使用） -->
        <Nav v-if="SKIN == 1" :canLogout="!!permission.act[100]" :navList="navList" :navToolList="navToolList" :balance="balance" :userInfo="userInfo"></Nav>
        <!-- 左侧菜单 （皮肤2，3，4使用）-->
        <Menu v-if="SKIN == 2" :canLogout="!!permission.act[100]" :navList="navList" :navToolList="navToolList" :balance="balance" :userInfo="userInfo"></Menu>
        <router-view></router-view>
    </div>
</template>

<script>
import Nav from "@/common/components/Nav";
import NavSk from "@/common/old_components/Nav-sk";
import Menu from "@/common/old_components/Menu";
import navList from "adv@/router/navList";

export default {
    components: {
        Nav,
        NavSk,
        Menu,
    },
    computed: {
        balance() {
            return this.$store.state.balance;
        },
        userInfo() {
            return this.$store.state.common.userInfo;
        },
        permission() {
            return this.$store.state.common.permission;
        }
    },
    created() {
        console.log( this.$store.state.common.permission )
        if(this.$route.name != 'tool.audiences') {
            document.body.style.paddingLeft = '90px 20px 60px 290px';
        }
        this.getDepot()
    },
    data() {
        return {
            hasDepot: false,
            navList: navList,
            navToolList: [{
                name: '监测管理',
                to: {name:'tool.audiences'},
                color: 'rgb(150, 213, 79)',
                introdution: '用于落地页嵌入监测代码，并将后续监测效果回收至平台报表。',
            },{
                name: 'DMP数据管理平台',
                // href: './dmp.html#/audience'
                to: {name:'dmp'},
                color: 'rgb(107, 157, 255)',
                introdution: '用于人群库的管理及人群数据的管理和报表展示，并将人群应用到广告推广中。',
            },
            // {
            //     name: '落地页在线制作',
            //     href: 'http://www.baidu.com'
            // },{
            //     name: '线索管理平台',
            //     href: 'http://www.baidu.com'
            // },{
            //     name: '商品管理平台',
            //     href: 'http://www.baidu.com'
            // },{
            //     name: '落地页检测',
            //     to: {name:'tool.detection'}
            // }
            ]
        };
    },
    mounted() {
        if( this.SKIN == '1' ){
            document.getElementsByClassName('adv-content')[0].style.paddingLeft = 0 + 'px'
        }
    },
    methods: {
        getDepot() {
            this.$ajax({
                url: '/dsp/sys/parameter/query',
                data: {
                    "filter":{"feature":"dsp.feature.device.depot.allow"},
                }
            }).then( res => {
                //DMP数据管理权限
                this.hasDepot = res.data[0].value == 1 && this.permission.act['132'];
                if(!this.hasDepot && !this.permission.act['69']) {
                        this.navToolList = [{}];
                }else {
                    if(!this.hasDepot) {
                        this.navToolList = [{
                            name: '监测管理',
                            to: {name:'tool.audiences'},
                            color: 'rgb(150, 213, 79)',
                            introdution: '用于落地页嵌入监测代码，并将后续监测效果回收至平台报表。',
                        }]
                    }
                    if(!this.permission.act['69']) {
                        this.navToolList = [{
                            name: 'DMP数据管理平台',
                            to: {name:'dmp'},
                            color: 'rgb(107, 157, 255)',
                            introdution: '用于人群库的管理及人群数据的管理和报表展示，并将人群应用到广告推广中。',
                        }]
                    }
                }
            })
                        
        }
    }
};
</script>

<style>
.adv-content{
    margin: 0;
    width: 100%;
    padding: 53px 40px 100px 40px;
}
</style>
