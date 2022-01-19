import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
require('@/components/confirm')
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
require('./mock')
require('./dependencies')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
