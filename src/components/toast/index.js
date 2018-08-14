import Toast from './toast'
import { functions } from 'nerio-js-utils'

let {fastRandom} = functions

Toast.install = function (Vue) {
  const Component = Vue.extend(Toast)

  Vue.prototype.$toast = function (content, type = 'success', timeout = 2000, top = true, right = true, bottom, left) {
    let container = document.createElement('div')
    container.id = 'toast-' + fastRandom(16)
    document.body.insertBefore(container, document.body.firstChild)
    let body = document.createElement('div')
    container.appendChild(body)
    new Component({
      data: {
        options: {
          text: content,
          color: type,
          top,
          right,
          bottom,
          left,
          timeout
        }
      }
    }).$mount(body)
    setTimeout(() => document.body.removeChild(container), timeout + 500)
  }
}

export default Toast
