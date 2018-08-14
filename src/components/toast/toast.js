export default {
  name: 'toast',
  data(){
    return {
      options: {
      },
    }
  },
  render(h) {
    this.options.value = true
    return h('v-snackbar', {
      props: this.options,
    }, this.options.text)
  }
}
