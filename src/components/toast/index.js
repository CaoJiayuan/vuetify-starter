import Toast from './toast'
import { functions } from 'nerio-js-utils'
import Vue from 'vue'

let {fastRandom} = functions

Toast.install = function (Vue) {
  Vue.prototype.$toast = toast
}

export function toast(content, type = 'success', timeout = 2000, top = true, right = true, bottom, left) {
  const Component = Vue.extend(Toast)
  let container = document.createElement('div')
  container.id = 'toast-' + fastRandom(16)
  document.body.insertBefore(container, document.body.firstChild)
  let body = document.createElement('div')
  container.appendChild(body)
  let com = new Component().$mount(body)
  com.setOptions({
    text: content,
    color: type,
    top,
    right,
    bottom,
    left,
    timeout
  }).active()
  setTimeout(() => document.body.removeChild(container), timeout + 500)
}

export default Toast
