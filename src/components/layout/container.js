let Container = {
  name: 'container',
  render(h){
    const c = h('v-container', {
      attrs: this.$attrs
    }, [this.$slots.default])

    return h('div', {
      class: 'container-wrap'
    }, [c])
  },
}

Container.install = Vue => {
  Vue.component('container', Container)
}

export default Container
