import Client from 'nerio-io-client'

export default {
  install(Vue) {
    Vue.prototype.$io = new Client(process.env.IO_URL)
  }
}
