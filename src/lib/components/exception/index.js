import Exception from './exception'
import Vue from 'vue'
import {vuetify} from '../../index'
import {rememberCom} from "../../utils/utils";
const md5 = window.md5

Exception.install = function (Vue) {
    Vue.prototype.$exception = renderException
}

export function renderException(data) {
    // store.dispatch('exception/trigger', data)
    const Component = Vue.extend(Exception)
    let id = 'exception-' + md5(JSON.stringify(data))
    let comp = rememberCom(id, () => {
        let container = document.createElement('div')
        let app = document.getElementById('app')
        container.id = id
        app.appendChild(container)
        document.body.insertBefore(container, document.body.firstChild)
        let body = document.createElement('div')
        container.appendChild(body)
        const destroy = () => {};
        let com = new Component({
          data: {
            data,
            destroy
          }
        })
        com.$vuetify = vuetify
    
        com.$mount(body)
        return com
    })

    comp.active()
}

export default Exception
