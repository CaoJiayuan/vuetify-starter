import Vue from 'vue'
import Panel from './components/layout/panel'
import Card from './components/layout/card'
import Container from './components/layout/container'
import Theme from './theme'

import { functions } from 'nerio-js-utils'
require('./utils/request')
let {Storage} = functions
Vue.use(Storage)
Vue.use(Panel)
Vue.use(Container)
Vue.use(Theme)
Vue.component('card', Card)
// Vue.use(VCharts)

