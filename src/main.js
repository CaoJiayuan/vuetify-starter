import Vue from 'vue'
import App from './App.vue'
import Vuetify from "vuetify";
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import {setup} from './lib'
Vue.use(Vuetify);
Vue.config.productionTip = false
require('./mock')
require('./dependencies')

console.log(process.env.VUE_APP_GAODE_MAP_KEY)
console.log(process.env.VUE_APP_GAODE_MAP_PROXY)
window._AMapSecurityConfig = {
    serviceHost:`${process.env.VUE_APP_GAODE_MAP_PROXY}/_AMapService`,
}

export const VueApp = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
})
setup(VueApp)
VueApp.$mount('#app')
