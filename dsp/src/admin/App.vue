<template>
  <div id="app">
    <Menu :navList='navList'  v-if="SKIN == 2"></Menu>
    <Nav v-if='SKIN == 1' :navList='navList' :userInfo='nameInfo'></Nav>
    <!-- <NavSk v-if="SKIN == 2" :navList='navList' :userInfo='nameInfo'></NavSk> -->
    <div class="component_con" :style="SKIN == '2' ? 'padding-left:16%;background-color: #2A323C;' : ''">
      <div class="content-box">
        <MenuTool  v-if="SKIN == 2"></MenuTool>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import navList from "./router/navList";
import Menu from "@/common/components/Menu";
import MenuTool from "@/common/components/MenuTool";
import Nav from "@/common/components/Nav";
import NavSk from "@/common/old_components/Nav-sk";
export default {
  name: 'App',
  data(){
    return{
      navList: navList,
      nameInfo:{}
    }
  },
  mounted(){
    this.getuserInfo();
    if( this.SKIN == '1' && this.judgePlatform() ){
      document.getElementsByClassName('component_con')[0].style.marginTop = 175 + 'px';
    }
    if( this.SKIN == '2' && this.judgePlatform() ){
      document.getElementsByClassName('component_con')[0].style.paddingLeft = 0 + 'px';
      document.getElementsByClassName('component_con')[0].style.marginTop = 100 + 'px';
    }
  },
  methods:{
    judgePlatform(){
      if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          return true;
      }else{
        return false;
      }
    },
    getuserInfo(){
      this.$ajax({
        url: '/dsp/UserInfo',
        data:{
          'type': "admin"
        },
        load: true
      }).then(res=>{
        this.nameInfo = res.data;
      })
    },
  },
  components:{
    'Menu':Menu,
    'MenuTool': MenuTool,
    'Nav':Nav,
    'NavSk': NavSk
  }
}
</script>

<style lang='less'>
#app{
  min-width: 1200px;
  height: 100%;
  .component_con{
    width: 100%;
    // height: 100%;
    padding-bottom: 100px;
  }
}


</style>
