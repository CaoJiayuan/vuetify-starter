import Preview from './preview'
import {rememberCom} from "../../utils/utils";
import Vue from 'vue';
const md5 = window.md5

export const PreviewComp = Vue.extend(Preview)

export function preview(url, options = {}) {
  let opt = Object.assign({}, options, {url})
  let id = 'preview-' + md5(JSON.stringify(opt));
  let com = rememberCom(id, () => {
    let container = document.createElement('div')
    container.id = id
    document.body.insertBefore(container, document.body.firstChild)
    let body = document.createElement('div')
    container.appendChild(body)
    const destroy = () => {

    };
    let com = new PreviewComp({
      data: {
        destroy,
        $vuetify: this.$vuetify
      },
      propsData:{
        url: url,
      }
    })
    com.$vuetify = this.$vuetify
    com.$mount(body)
    return com
  })
  com.show()
}

Preview.install = function (vue) {
  vue.prototype.$preview = preview
}

export default Preview
