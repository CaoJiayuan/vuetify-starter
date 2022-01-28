import Vue from 'vue'
import {Toast, Attachment, Confirm} from './lib'
import Panel from './components/layout/panel'
import Card from './components/layout/card'
import Container from './components/layout/container'
import Theme from './theme'

import { functions } from 'nerio-js-utils'
require('./utils/request')
let {Storage} = functions
Vue.use(Toast)
Vue.use(Confirm)
Vue.use(Storage)
Vue.use(Panel)
Vue.use(Container)
Vue.use(Attachment)
Vue.use(Theme)
Vue.component('card', Card)
// Vue.use(VCharts)

