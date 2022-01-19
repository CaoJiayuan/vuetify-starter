import Attachment from './attachment'
import {fastRandom} from "nerio-js-utils/lib/functions";

const defaultOptions = {
  filters: {},
  accept: '*/*',
  single: false,
  params: {}
}

Attachment.install = function (Vue) {
  const Component = Vue.extend(Attachment)
  Vue.prototype.$attachment = function(onSubmit, options = {}) {

    let opt = Object.assign({}, defaultOptions, options)

    let container = document.createElement('div')
    container.id = 'attachment-' + fastRandom(16)
    document.body.insertBefore(container, document.body.firstChild)
    let body = document.createElement('div')
    container.appendChild(body)

    const destroy = () => setTimeout(() => document.body.removeChild(container), 600);
    let com = new Component({
      data: {
        destroy,
      },
      propsData:{
        accept: opt.accept,
        filters: opt.filters,
        onSubmit: onSubmit,
        single: opt.single,
        chunk: true,
        uploadValidator: opt.validator,
        params: opt.params
      }
    }).$mount(body)

    com.show()
  }
}


export default Attachment
