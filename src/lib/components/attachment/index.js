import Attachment from './attachment'
import { rememberCom, forgetCom } from "../../utils/utils";
const md5 = window.md5

const defaultOptions = {
  filters: {},
  accept: '*/*',
  single: false,
  params: {}
}

Attachment.install = function (Vue) {
  const Component = Vue.extend(Attachment)
  Vue.prototype.$attachment = function (onSubmit, options = {}) {
    let opt = Object.assign({}, defaultOptions, options)
    let id = 'attachment-' + md5(JSON.stringify(options));
    let com = rememberCom(id, () => {
      let container = document.createElement('div')
      container.id = id
      document.body.insertBefore(container, document.body.firstChild)
      let body = document.createElement('div')
      container.appendChild(body)
      const destroy = () => {
        setTimeout(() => {
          document.body.removeChild(container)
          forgetCom(id)
        }, 20)
      };
      let com = new Component({
        data: {
          destroy,
          $vuetify: this.$vuetify
        },
        propsData: {
          accept: opt.accept,
          filters: opt.filters,
          onSubmit: onSubmit,
          single: opt.single,
          chunk: true,
          uploadValidator: opt.validator,
          params: opt.params,
        }
      })
      com.$vuetify = this.$vuetify
      com.$mount(body)
      return com
    })
    com.show()
  }
}


export default Attachment
