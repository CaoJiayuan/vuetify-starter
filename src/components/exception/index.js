import Exception from './exception'
import { functions } from 'nerio-js-utils'

let {fastRandom} = functions

Exception.install = function (Vue) {
  Vue.prototype.$exception = renderException
}

export function renderException(data) {
  const Component = Vue.extend(Exception)

  let container = document.createElement('div')
  container.id = 'exception-' + fastRandom(16)
  document.body.insertBefore(container, document.body.firstChild)
  let body = document.createElement('div')
  container.appendChild(body)
  const destroy = () => setTimeout(() => document.body.removeChild(container), 600);
  let com = new Component({
    data: {
      data,
      destroy
    }
  }).$mount(body)

  com.active()
}

export default Exception
