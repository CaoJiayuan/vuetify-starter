import Confirm from './confirm'
import { functions } from 'nerio-js-utils'

let {fastRandom} = functions

Confirm.install = function (Vue) {
  const Component = Vue.extend(Confirm)
  Vue.prototype.$confirm = ({title, content, persistent = true}) => {
    return new Promise(resolver => {
      let container = document.createElement('div')
      container.id = 'confirm-' + fastRandom(16)
      document.body.insertBefore(container, document.body.firstChild)
      let body = document.createElement('div')
      container.appendChild(body)
      const destroy = () => setTimeout(() => document.body.removeChild(container), 600);
      new Component({
        data: {
          title,
          content,
          destroy,
          resolver,
          persistent
        }
      }).$mount(body)
    })
  }
}

export default Confirm
