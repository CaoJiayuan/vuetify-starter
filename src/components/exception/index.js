import Exception from './exception'
import store from "@/store";

Exception.install = function (Vue) {
    Vue.prototype.$exception = renderException
}

export function renderException(data) {
    store.dispatch('exception/trigger', data)
    // const Component = Vue.extend(Exception)
    //
    // let container = document.createElement('div')
    // let app = document.getElementById('app')
    // container.id = 'exception-' + fastRandom(16)
    // app.appendChild(container)
    // document.body.insertBefore(container, document.body.firstChild)
    // let body = document.createElement('div')
    // container.appendChild(body)
    // const destroy = () => {};
    // let com = new Component({
    //   data: {
    //     data,
    //     destroy
    //   }
    // }).$mount(body)
    //
    // com.active()
}

export default Exception
