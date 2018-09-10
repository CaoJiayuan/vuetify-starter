import VuetifyTable from 'nerio-vuetify-table'
import Confirm from './components/confirm'
import Toast from './components/toast'
import Panel from './components/layout/panel'
import Card from './components/layout/card'

import Container from './components/layout/container'

import Socket from 'nerio-io-client'

import Theme from './theme'


import { functions } from 'nerio-js-utils'

require('./assets/js/request')
let {Storage} = functions
Vue.use(VuetifyTable)
Vue.use(Toast)
Vue.use(Confirm)
Vue.use(Storage)
Vue.use(Panel)
Vue.use(Container)
Vue.use(Socket, {
  url: process.env.IO_URL,
  autoCreate: false
})
Vue.use(Theme)
Vue.component('card', Card)

