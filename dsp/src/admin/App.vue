<template>
  <div id="app">
    <Menu :navList='navList'></Menu>
    <div class="component_con">
      <div class="content-box">
        <MenuTool></MenuTool>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import navList from "./router/navList";
import Menu from "@/common/components/Menu";
import MenuTool from "@/common/components/MenuTool";
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
  },
  methods:{
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
    'MenuTool': MenuTool
  }
}
</script>

<style lang='less'>
#app{
  min-width: 1200px;
  padding-bottom: 100px;
  .component_con{
    width: 100%;
    height: 100%;
    padding-left: 16%;
  }
}


</style>
