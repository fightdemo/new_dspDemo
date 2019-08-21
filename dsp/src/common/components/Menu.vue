<template>
  <div class="nav-top">
    <div class="logo" v-if="SKIN == 2" :style="{'background-image':'url('+staticLogo+')'}"></div>
    <div class="logo-box" v-if="SKIN == 3">
        <div class="logo" :style="{'background-image':'url('+staticLogo+')'}"></div>
    </div>
    <ul class="nav-list">
        <li v-for="item in navList"  :key="item.name" :class="{'active': item.flag}" @click.stop="toItem(item)">
            <router-link :to="item.to.name">
                {{item.name}}
                <i v-if="item.sub && !item.hideSub"  class="icon-nav"></i>
            </router-link>

            <ul v-if="item.sub && !item.hideSub" class="nav-dropdown" :class="{'open':item.open}" @click.stop>
                <li v-for="sub in item.sub" :key="sub.name">
                    <router-link :to="sub.to">
                        {{sub.name}}
                    </router-link>
                </li>               
            </ul>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        navList: Array
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
        toItem(item) {
            if(item.sub) {
                this.$set(item,"open", true)
                this.$router.push({
                    name: item.sub[0].to.name
                })
            }else {
                this.$router.push({
                    name: item.to.name
                })
            }                
        },
        toggle(item) {
            this.$set(item,"open",!item.open)    
        },
    }
}
</script>

<style lang="less">

</style>