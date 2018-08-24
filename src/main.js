// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Using cdn libraries

import App from './App'
import {router} from './router'
import store from './store'
import {isProduction} from './assets/js/utils'

require('./dependencies')
Vue.config.productionTip = false

if (!isProduction()) {
  require('./mock')   // better comment this in production
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
