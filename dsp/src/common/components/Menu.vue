<template>
    <div class="nav">
        <div class="logo" v-if="SKIN == 2" :style="{'background-image':'url('+staticLogo+')'}"></div>
        <div class="logo-box" v-if="SKIN == 3">
            <div class="logo" :style="{'background-image':'url('+staticLogo+')'}"></div>
        </div>
        <ul class="nav-list">
            <li v-for="item in navList"  :key="item.name" :class="{'active': item.flag}" @click.stop="toItem(item)">
                <!-- <router-link :to="item.to.name">
                    {{item.name}}
                    <i v-if="item.sub && !item.hideSub"  class="icon-nav"></i>
                </router-link> -->
                <a href="javascript:;">
                    {{item.name}}
                    <i v-if="item.sub && !item.hideSub" @click.stop="toggle(item)" class="icon-nav"></i>
                </a>
                <ul v-if="item.sub && !item.hideSub" class="nav-dropdown" :class="{'open':item.open}" @click.stop>
                    <li v-for="sub in item.sub" :key="sub.name">
                        <router-link :to="sub.to">
                            {{sub.name}}
                        </router-link>
                    </li>               
                </ul>
            </li>
        </ul>
        <div class="nav-top">
            <div class="tools-box" v-if="navToolList.length > 0" :class="{'disabled': !navToolList[0].name}">
                <i class="icon mb icon-cube"></i>
                <span @click="goToToolPage">工具箱</span>
                <i class="icon fa fa-angle-down"></i>
                <ul class="tools-list" v-if="navToolList.length > 0 && navToolList[0].name">
                    <li v-for="item in navToolList" :key="item.name">
                        <router-link v-if="item.to" :to="item.to" target="_blank">{{item.name}}</router-link>
                        <a v-if="item.href" :href="item.href" target="_blank">{{item.name}}</a>
                    </li>
                </ul>
            </div>
            <ul class="user-info-box fr cl" ref="userInfoBox">
                <li class="user-logout"></li>
                <li class="user-name">{{userInfo.name}}</li>
                <li class="user-balance">
                    账户余额（元）：{{balance|number}}
                </li>
            </ul>
        </div>
    </div>
    <!-- <div class="mobile-nav-top" v-else>
        <div class="logo" v-if="SKIN == 2" :style="{'background-image':'url('+staticLogo+')'}"></div>
        <div class="menu-box" @click="toogleMenu">
            <img class="menu" src="../img/sk2-images/menu.png" alt="">
        </div>
        <div class="logo-box" v-if="SKIN == 3">
            <div class="logo" :style="{'background-image':'url('+staticLogo+')'}"></div>
        </div>
        <ul class="nav-list" v-if="toggleFlag">
            <li v-for="item in navList"  :key="item.name" :class="{'active': item.flag}" @click.stop="toItem(item,'mobile')">
                <router-link :to="item.to.name">
                    {{item.name}}
                    <i v-if="item.sub && !item.hideSub"  class="icon-nav"></i>
                </router-link>

                <ul v-if="item.sub && !item.hideSub" class="nav-dropdown" :class="{'open':item.open}" @click.stop>
                    <li v-for="sub in item.sub" :key="sub.name">
                        <router-link :to="sub.to"  @click.native="toogleClose()">
                            {{sub.name}}
                        </router-link>
                    </li>               
                </ul>
            </li>
        </ul>
    </div> -->
</template>

<script>
export default {
    data() {
        return {
            toggleFlag: false,
        }
    },
    props: {
        navList: Array,
        balance: {
            type:String|Number,
            default: "--"
        },
        userInfo: {
            type: Object,
            default() {
                return {
                    loginName: '--',
                    name: '--',
                }
            }
        },
        navToolList: {
            type: Array,
            default() {
                return []
            }
        },
        canLogout: {
            type: Boolean,
            default: true
        },
    },
    mounted() {
        this.initCurrent()
    },
    computed: {
        staticLogo() {
            return this.$store.state.common.oem.staticLogo
        }
    },
    watch: {
        $route(val) {
            this.initCurrent();
        },
    },
    methods: {
        toogleMenu() {
            this.toggleFlag = !this.toggleFlag
        },
        IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
                }
            }
            return flag;
        },
        // 根据路由获取当前active
        initCurrent() {
            var firstNav = this.navList;
            if(this.$route.name) {
                var firstName = this.$route.name.split('.')[0];
            }                     
            for (var i = 0; i < firstNav.length; i++) {
                this.$set(firstNav[i],"open",false)
                this.$set(firstNav[i],"flag",false)
                // 判断当前选中项是否为该节点 
                if (firstNav[i].to.name == firstName) {
                    this.$set(firstNav[i],"open",true)
                    this.$set(firstNav[i],"flag",true)
                }
            }
        },
        toItem(item,type) {
            if(item.sub) {
                this.$set(item,"open", true)
                this.$router.push({
                    name: item.sub[0].to.name
                })
            }else {
                this.$router.push({
                    name: item.to.name
                })
                if( type == 'mobile' ){
                    this.toggleFlag = false;    
                } 
            }                
        },
        toogleClose() {
            this.toggleFlag = false;
        },
        toggle(item) {
            this.$set(item,"open",!item.open)    
        },
        goToToolPage() {
            if(this.navToolList[0].name) {
                this.$router.push({
                    name: 'toolPage',
                    params: {
                        navToolList: this.navToolList
                    }
                })
            }
        },
    }
}
</script>

<style lang="less">


.nav {
    width: 16%;
    background-color: #ffffff;
    padding-top: 26px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;

    .logo {
        width: 170px;
        height: 48px;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-bottom: 26px;
    }

    .nav-list {
        cursor: pointer;

        >li {
            width: 100%;
            line-height: 60px;

            >a {
                width: 100%;
                height: 60px;
                display: block;
                color: #000000;
                padding-left: 30px;
                font-size: 12px;

                .icon-nav {
                width: 10px;
                height: 5px;
                float: right;
                margin-top: 28px;
                margin-right: 20px;
                line-height: 60px;
                background: url('../img/sk2-images/icon_nav.png') no-repeat bottom;
                }
            }

            .nav-dropdown {
                display: none;
                background-color: #fafafa;

                >li {
                    height: 60px;
                    line-height: 60px;

                    a {
                        padding-left: 47px;
                        position: relative;
                        display: block;
                        color: #000000;
                        height: 100%;
                    }

                    a.active:before {
                        content: '';
                        width: 6px;
                        height: 60px;
                        top: 0;
                        left: 0;
                        position: absolute;
                        background-color: #04a2b3;
                    }
                }
            }
        }

        >li.active {
            >a {
                color: #ffffff;
                background-color: #04a2b3;

                .icon-nav {
                    background-position: top;
                }
            }

            .nav-dropdown {
                display: block;
            }
        }
    }
    .nav-top {
        position: fixed;
		width: calc(~"100% - 16%");
        // height: 70px;
        // line-height: 70px;
        left: 16%;
        top: 0px;
        background-color: #2a323c;
        min-width: 550px;
        padding: 15px 40px 0 40px;
        .icon {
            vertical-align: middle;
        }
        .tools-box {
            user-select: none;
            width: 164px;
            height: 38px;
            margin-left: 20px;
            font-size: 16px;
            float: left;
            cursor: pointer;
            position: relative;
            .icon-cube {
                margin-left: 30px;
                margin-right: 10px;
            }
            .fa {
                margin-left: 20px;
                margin-top: -3px;
            }
            .tools-list {
                // width: 621px;
                // height: 174px;
                width: 510px;
                height: 110px;
                position: absolute;
                top: 70px;
                left: 0;
                display: none;
                z-index: 10;
                cursor: default;
                li {
                    width: 160px;
                    margin-left: 47px;
                    float: left;
                    height: 87px;
                    line-height: 87px;
                    font-size: 14px;
                    list-style-type: disc;
                    a {
                        color: #fff;
                    }
                }
            }
        }
        .tools-box:hover {
            color: #fff;
            background-color: rgba(30, 30, 30, 0.7);

            .fa-angle-down {
                transform: rotate(180deg);
            }
            .tools-list {
                background-color: rgba(30, 30, 30, 0.7);
                display: block;
            }
        }
        .tools-box.disabled{
            cursor: not-allowed;
            &:hover{
                background-color: #fff;
                color: #595959;
            }
        }
        .user-info-box {
            li {
                float: right;
                height: 38px;
                border-radius: 19px;
                margin-left: 20px;
                line-height: 38px;
                padding-left: 25px;
                padding-right: 25px;
                color: #ffffff;
                background-color: #323c48;
            }
            .user-logout {
                width: 38px;
                height: 38px;
                padding: 0;
                cursor: pointer;
                background: url(../../common/img/sk2-images/logout.png) no-repeat center;
            }
            .logout {
                margin-right: 20px;
                margin-top: 15px;
            }
        }
    }
}



</style>