import Client from 'nerio-io-client'

export default {
  install(Vue) {
    Vue.prototype.$io = new Client('http://127.0.0.1:3003')
  }
}
