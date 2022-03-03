import Toast from './toast'
import {functions} from 'nerio-js-utils'
import Vue from 'vue'
import {vuetify} from '../../index'

let {fastRandom} = functions

Toast.install = function (Vue) {
    Vue.prototype.$toast = toast
}

export function toast(content, type = 'success', options) {
    options = options || {
        timeout: 5000,
        top: true,
        right: true,
        bottom: false,
        left: false
    }

    let {right = true, top = true, bottom, left, timeout = 5000} = options

    const Component = Vue.extend(Toast)
    let container = document.createElement('div')
    let app = document.getElementById('app')
    container.id = 'toast-' + fastRandom(16)
    app.appendChild(container)
    let body = document.createElement('div')
    container.appendChild(body)
    let com = new Component()
    com.$vuetify = vuetify
    com.$mount(body)
    com.setOptions({
        content: content,
        color: type,
        top,
        right,
        bottom,
        left,
        timeout
    }).active()
    setTimeout(() => app.removeChild(container), timeout + 500)
}

export default Toast
