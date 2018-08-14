import VuetifyTable from 'nerio-vuetify-table'
import Confirm from './components/confirm'
import Toast from './components/toast'
import { functions } from 'nerio-js-utils'

let {Storage} = functions
Vue.use(VuetifyTable)
Vue.use(Toast)
Vue.use(Confirm)
Vue.use(Storage)
