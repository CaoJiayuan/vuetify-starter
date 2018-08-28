import Client from 'nerio-io-client'

export default {
  install(Vue) {
    const client = new Client(process.env.IO_URL)
    Vue.prototype.$io = client
  }
}
