<template>
    <div class="nav" :class="{off:silderFlag}">
        <div class="nav-left" ref="navleft" v-if="IsPC()">
            <div class="nav-logo-box">
                <div class="nav-logo" :style="'background-image: url('+staticLogo+');'"></div>
                <i class="btn-silder" @click="toggleSilder()"></i>
            </div>
            <div :style="{'overflow': !silderFlag ? 'hidden' : ''}">
                <div :style="{'height': wrapHeight + 'px', 'margin-right': !silderFlag ? '-17px' : '', 'overflow-y': !silderFlag ? 'scroll' : '' }" ref="wrap" @scroll="handleScroll" @mouseover="scrollbarShow=true" @mouseleave="scrollbarShow=false">
                    <ul class="nav-list">
                        <li v-for="item in navList"  :key="item.name"  :class="{'open':item.open, 'active': item.flag}" @click.stop="toitem(item)">
                            <a href="javascript:;">
                                <i class="icon mb" :class="item.icon"></i>
                                <span class="nav-name">{{item.name}}</span>
                                <i v-if="item.sub && !item.hideSub" @click.stop="toggle(item)" class="icon fa fa-angle-right"></i>
                            </a>
                            <!-- 固定二级导航栏 -->
                            <ul v-if="item.sub && !item.hideSub" class="nav-sub-list" @click.stop>
                                <!-- <li v-for="(sub,subi) in item.sub" :key="sub.name" @click="seconed(sub,subi)"> -->
                                    <router-link :to="sub.to" v-for="sub in item.sub" :key="sub.name">
                                        <!-- <a href="javascript:;" :class="{'active': subIndex == subi}"> -->
                                            {{sub.name}}
                                            <i class="icon-disc"></i>
                                        <!-- </a> -->
                                    </router-link>
                                <!-- </li> -->
                            </ul>
                            <!-- 浮动二级导航栏 -->
                            <div v-if="item.sub && !item.hideSub" class="float-box">
                                <ul class="nav-sub-list-float" @click.stop>
                                    <!-- <li v-for="(sub,i) in item.sub" :key="sub.name" @click="silder(sub,i)"> -->
                                        <router-link :to="sub.to" v-for="sub in item.sub" :key="sub.name">
                                            <!-- <a href="javascript:;" :class="{'active': subIndex == i}"> -->
                                                {{sub.name}}
                                                <i class="icon-disc"></i>
                                            <!-- </a> -->
                                        </router-link>
                                    <!-- </li> -->
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="scrollbar-bar is-vertical" v-show="scrollbarShow">
                    <div class="scrollbar-thumb" :style="transform"></div>
                </div>
            </div>
        </div>
        <div class="nav-mobile-left" v-else>
            <div class="nav-mobile-logo" :style="'background-image: url('+staticLogo+');'"></div>
            <div class="nav-mobile-menu-box"><img @click="toggleMenu" src="../img/mobile-menu.png" alt=""></div>
            <ul class="mobile-nav-list" v-if="toggleFlag">
                <li v-for="item in navList"  :key="item.name"  :class="{'open':item.open, 'active': item.flag}" @click.stop="toitem(item,'mobile')">
                    <a href="javascript:;">
                        <i class="icon mb" :class="item.icon"></i>
                        <span class="nav-name">{{item.name}}</span>
                        <i v-if="item.sub && !item.hideSub" @click.stop="toggle(item)" class="icon fa fa-angle-right"></i>
                    </a>
                    <!-- 固定二级导航栏 -->
                    <ul v-if="item.sub && !item.hideSub" class="nav-sub-list" @click.stop>
                        <!-- <li v-for="(sub,subi) in item.sub" :key="sub.name" @click="seconed(sub,subi)"> -->
                            <router-link :to="sub.to" v-for="sub in item.sub" :key="sub.name" @click.native="toogleClose()">
                                <!-- <a href="javascript:;" :class="{'active': subIndex == subi}"> -->
                                    {{sub.name}}
                                    <i class="icon-disc"></i>
                                <!-- </a> -->
                            </router-link>
                        <!-- </li> -->
                    </ul>
                    <!-- 浮动二级导航栏 -->
                    <div v-if="item.sub && !item.hideSub" class="float-box">
                        <ul class="nav-sub-list-float" @click.stop>
                            <!-- <li v-for="(sub,i) in item.sub" :key="sub.name" @click="silder(sub,i)"> -->
                                <router-link :to="sub.to" v-for="sub in item.sub" :key="sub.name">
                                    <!-- <a href="javascript:;" :class="{'active': subIndex == i}"> -->
                                        {{sub.name}}
                                        <i class="icon-disc"></i>
                                    <!-- </a> -->
                                </router-link>
                            <!-- </li> -->
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="nav-top bs">
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
                <li class="user-balance">账户余额(元)：{{balance|number}}</li>
                <li>
                    <div class="user-avatar">
                        <i class="icon fa fa-user"></i>
                    </div>
                </li>
                <li class="user-box" ref='userBox'>
                    <p class="user-account" :title="userInfo.loginName">{{userInfo.loginName}}</p>
                    <p :title="userInfo.name">{{userInfo.name}}</p>
                </li>
                <li v-if="canLogout">
                    <el-button type="danger" class="logout" @click="logout()">
                        <i class="icon fa fa-sign-out"></i>退出
                    </el-button>
                </li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import {
  number
} from "@/common/js/filter"
require("@/common/css/font.css");

export default {
    filters: {
        number
    },
    computed: {
        getUserInfo() {
            return this.$store.state.common.userInfo;
        },
        staticLogo() {
            if( !this.silderFlag ){
                if( this.getUserInfo && this.getUserInfo.loginName == 'admin' ){
                    return require("@/common/img/nav-logo2.png")
                }else{
                    return this.$store.state.common.oem.staticLogo || require("@/common/img/nav-logo2.png")
                }
            }else{
                if( this.getUserInfo && this.getUserInfo.loginName == 'admin' ){
                    // return require("@/common/img/nav-logo-off2.png")
                }else{
                    //现在后端没有返回小logo，若返回小logo的属性名，应改变staticlog
                    return this.$store.state.common.oem.staticLog || ""
                    // return this.$store.state.common.oem.staticLog || require("@/common/img/nav-logo-off2.png")
                }
            }
        },
        wrap() {
            return this.$refs.wrap;
        },
        wrapH() {
            return this.$refs.navleft;
        },
        
    },
    data() {
        return {
            silderFlag: false,
            parIndex: 0,
            subIndex: 0,
            scrollbarShow: false,
            transform: '',
            moveY: '',
            moveX: '',
            sizeHeight: '',
            sizeWidth: '',
            wrapHeight: '',
            screenHeight: document.body.clientHeight,
            // smStaticLogo: require('../img/nav-logo-off2.png'),
            toggleFlag: false,
        };
    },
    methods: {
        toggleMenu() {
            this.toggleFlag = !this.toggleFlag;
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
        handleScroll() {
            const wrap = this.wrap;

            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
            
            this.transform = `transform: translateY(${ this.moveY }%);height: ${this.sizeHeight}`;

        },
        update() {
            let heightPercentage, widthPercentage;
            const wrap = this.wrap;
            if (!wrap) return;

            heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
            // widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);
            this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
            // this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';

            this.wrapHeight = this.wrapH.clientHeight - 56;
            this.transform = `transform: translateY(0%); height: ${this.sizeHeight}`;
        },
        toitem(item,type) {
            // if(!this.silderFlag) {
                if(item.sub) {
                    this.$set(item,"open",!item.open)
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
            // }            
            this.$nextTick(this.update)
        },
        toogleClose() {
            this.toggleFlag = false;
        },
        toggle(item) {
            if(!this.silderFlag) {
                this.$set(item,"open",!item.open)    
            }            
            this.$nextTick(this.update)
        },
        toggleSilder() {
            this.silderFlag = !this.silderFlag;
            if( this.IsPC() ){
                document.body.style.paddingLeft = this.silderFlag
                    ? "120px"
                    : "290px";
            }
        },
        // showSecondNav(item, index) {
        //     if (this.silderFlag) {
        //         // 显示二级导航栏弹框
        //         this.activeNav = index;
        //     } else {
        //         // 直接跳转界面
        //         this.$router.push(item.to);
        //     }
        // },
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
        logout() {
            this.$ajax({
                url: '/dsp/user/logout',
                data: {},
                load: true
            }).then(res => {
                location.href = "./";
            })
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
        this.initCurrent();
        this.$nextTick(this.update)
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenHeight = document.body.clientHeight
                that.screenHeight = window.screenHeight
            })()
        }  
        var bodyDom = document.getElementsByTagName('body')[0]
        if(!this.IsPC()){
            //更改body
            bodyDom.style.paddingLeft = 0 + 'px';
            bodyDom.style.minWidth = 1100 + 'px';
            document.getElementsByClassName('nav-top')[0].style.width = 100 + '%';
            document.getElementsByClassName('nav-top')[0].style.top = 88 + 'px';
            document.getElementsByClassName('nav-top')[0].style.left = 0 + 'px';
            // this.$refs.userInfoBox.style.marginLeft = 50 + 'px';
            // this.$refs.userBox.style.marginRight = 0 + 'px';
        }else{
            bodyDom.style.paddingTop = 90 + 'px';
            bodyDom.style.paddingLeft = 290 + 'px';
            bodyDom.style.paddingRight = 20 + 'px';
            bodyDom.style.paddingBottom = 60 + 'px';
        }
    },
    watch: {
        $route(val) {
            this.initCurrent();
        },
        silderFlag(val) {
            this.$store.commit('setSilderFlag', val)
        },
        screenHeight(val) {
            this.update()
        },
    }
};
</script>
<style lang="less">

</style>
