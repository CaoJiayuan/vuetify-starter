export default {
  name: 'toast',
  data(){
    return {
      options: {
      },
      toast: false
    }
  },
  render(h) {
    this.options.value = this.toast

    const close = h('v-btn', {
      props: {
        text: true,
        fab: true,
        small: true
      },
      on: {
        click: e => this.toast = false
      }
    }, [h('v-icon', {}, 'mdi-close')])

    return h('v-snackbar', {
      props: this.options,
      scopedSlots: {
        action(attrs) {
          return close
        }
      }
    }, [this.options.content])
  },
  methods:{
    setOptions(o) {
      this.options = o
      return this;
    },
    active(){
      this.toast = true
    }
  }
}
