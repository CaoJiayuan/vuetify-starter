require('./panel.sass')
export default {
  name: 'app-panel',
  props: {
    actions: {
      type: Array,
      default: () => []
    },
  },
  render(h){

    return h('v-layout', {
      class: 'app-panel',
      attrs: {
        wrap: true,
        'justify-center': true
      }
    }, [this.renderAction(h), this.renderBody(h)])
  },
  methods:{
    renderAction(h) {
      return h('v-flex', {
        class: 'panel-action',
        attrs: {
          xs12: true
        }
      })
    },
    renderBody(h){

      return h('v-flex', {
        class: 'panel-body',
        attrs: {
          xs12: true
        }
      }, [this.$slots.default])
    }
  }
}
