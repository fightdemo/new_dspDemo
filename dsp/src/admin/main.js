// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue';
import layer from 'vue-layer'

Vue.prototype.$layer = layer(Vue);

let Base64 = require('js-base64').Base64;

import {
  ajax, fmoney
} from '@/common/js/utils'
import {
  number
} from "@/common/js/filter"

Vue.use(ElementUI);
Vue.use(BootstrapVue);
// import '@/common/css/base.css'
import hoursSelect from '@/common/components/hours-select'
import mCheck from '@/common/components/check'
import mRadio from '@/common/components/radio'
import mSwitch from '@/common/components/switch'
import mSelect from '@/common/components/select'
import mChart from '@/common/components/chart'
import mTree from '@/common/components/tree'
import mPacket from '@/common/components/packet'
import mInput from '@/common/components/input'
import imageViewer from '@/common/components/imageViewer'
import vuePreview from 'vue-preview'
import Page from "@/common/components/page"
import navList from './router/navList';
import Search from "@/common/components/search";

import skPage from "@/common/old_components/sk-page"
import searchSk from "@/common/old_components/search-sk";
import dspButton from "@/common/components/dspButton"
import selectData from "@/common/components/select-data";
import dropdown from "@/common/old_components/Dropdown";
import dropdownInput from "@/common/old_components/Dropdown-Input";
import dropdownDate from "@/common/old_components/Dropdown-Date";
import checksk from "@/common/old_components/check-sk";
import radiosk from "@/common/old_components/radio-sk";

Vue.component('hoursSelect', hoursSelect)
Vue.component('mCheck', mCheck)
Vue.component('mRadio', mRadio)
Vue.component('mSwitch', mSwitch)
Vue.component('mSelect', mSelect)
Vue.component('mChart', mChart)
Vue.component('mTree', mTree)
Vue.component('mPacket', mPacket)
Vue.component('mInput', mInput)
Vue.component('page', Page)
Vue.component('skPage', skPage)
Vue.component('search', Search)
Vue.component('searchSk', searchSk)


Vue.component('dspButton', dspButton)
Vue.component('selectData', selectData)
Vue.component('dropdownDate', dropdownDate)
Vue.component('dropdown', dropdown)
Vue.component('dropdownInput', dropdownInput)
Vue.component('check-sk', checksk)
Vue.component('radio-sk', radiosk)

Vue.prototype.$ajax = ajax
Vue.prototype.fmoney = fmoney
var token = localStorage["adminToken"];
ajax.setToken(token);
store.commit("setToken", token);
Vue.filter("number", number);
Vue.use(imageViewer)
Vue.use(vuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {
    top: 0,
    bottom: 0
  },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})


var page = Vue.prototype.PAGE = {};

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

getCode()
function getCode() {
  let random = Math.floor(Math.random() * 2) + 1;
  switch (2) {
    case 1:
      require('@/common/css/sk1/sk1.css');
      Vue.prototype.SKIN = 1;
      break;
    case 2:
      require('@/common/css/sk2/sk2.css');
      require ('bootstrap/dist/css/bootstrap.css')
      require ('bootstrap/dist/js/bootstrap.js')
      // require ('bootstrap-vue/dist/bootstrap-vue.css')
      Vue.prototype.SKIN = 2;
      break;
    case 3:
      require('@/common/css/sk3/sk3.css');
      require ('bootstrap/dist/css/bootstrap.css')
      require ('bootstrap/dist/js/bootstrap.js')
      // require ('bootstrap-vue/dist/bootstrap-vue.css')
      Vue.prototype.SKIN = 3;
      break;
  
    default:
      break;
  }
}


// 路由守卫
router.beforeEach((to, from, next) => {
  // 跳转页面时初始化滚动条状态
  document.documentElement.scrollTop = 0;
  // 跳转界面
  if (page[to.name]) {
    next(page[to.name][0].to)
  } else {
    next();
  }
})


document.title = store.state.common.oem.title
store.dispatch("getBalance")
ajax.all([store.dispatch("getUserInfo"), store.dispatch("getPermission")])
  .then(res => {
    Vue.prototype.permission = store.state.common.permission;
    // 根据权限过滤导航栏
    initNavList(navList);
    // 根据nav生成跳转页面
    getPage(navList, '')


    new Vue({
      el: '#app',
      router,
      store,
      components: {
        App
      },
      template: '<App/>'
    })

  })

function initNavList(arr) {
  var view = store.state.common.permission.view,
    item, i;
  // 根据路由设置navList
  for (i = 0; i < arr.length; i++) {
    item = arr[i];
  if (item.actionCode && !view[item.actionCode]) {
      arr.splice(i, 1);
      i--;
    }
    if (item.sub) initNavList(item.sub)
  }
}

function getPage(arr, parent) {
  page[parent] = []
  arr.forEach(item => {
    page[parent].push(item);
    if (item.sub) getPage(item.sub, item.to.name)
  })
}
