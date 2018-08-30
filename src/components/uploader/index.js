import uploadable from '../../mixins/uploadable'

export default {
  name: 'uploader',
  mixins: [uploadable],
  props: {
    label: {
      type: String,
      default: () => 'Select file'
    }
  },

  render(h){
    const trigger = this.$slots.trigger ||
      h('v-btn', {}, this.label)

    return h('div', {
      on: {
        click: this.triggerUpload
      }
    }, [trigger])
  }
}
