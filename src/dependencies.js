import Vue from 'vue'


import Toast from './components/toast'
import Panel from './components/layout/panel'
import Card from './components/layout/card'
import Attachment from './components/attachment'

import Container from './components/layout/container'

import Theme from './theme'



// import VCharts from 'v-charts'

import { functions } from 'nerio-js-utils'
require('./utils/request')
let {Storage} = functions
Vue.use(Toast)
Vue.use(Storage)
Vue.use(Panel)
Vue.use(Container)
Vue.use(Attachment)
Vue.use(Theme)
Vue.component('card', Card)
// Vue.use(VCharts)

