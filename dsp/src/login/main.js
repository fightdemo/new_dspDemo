// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

require('@/common/css/base.css');

Vue.config.productionTip = false;

Vue.use(BootstrapVue)

import {
  ajax
} from '@/common/js/utils'


Vue.prototype.$ajax = ajax

getCode()
function getCode() {
  let random = Math.floor(Math.random() * 3) + 1;
  switch (2) {
    case 1:
      require('@/common/css/sk1/sk1.css');
      Vue.prototype.SKIN = 1;
      store.commit("setSKIN", 1);
      break;
    case 2:
      require('@/common/css/sk2/sk2.css');
      Vue.prototype.SKIN = 2;
      store.commit("setSKIN", 2);
      break;
    case 3:
      require('@/common/css/sk3/sk3.css');
      Vue.prototype.SKIN = 3;
      store.commit("setSKIN", 3);
      break;
  
    default:
      break;
  }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
