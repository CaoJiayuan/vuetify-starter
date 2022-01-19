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
        flat: true,
        fab: true,
        small: true
      },
      on: {
        click: e => this.toast = false
      }
    }, [h('v-icon', {}, 'close')])

    return h('v-snackbar', {
      props: this.options,
    }, [this.options.text, this.options.timeout >= 3000 ? close : undefined])
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
