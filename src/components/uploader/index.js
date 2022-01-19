import uploadable from '../../mixins/uploadable'

import Card from '../layout/card'
import Items from './items.vue'

require('./uploader.sass')
export default {
  name: 'uploader',
  mixins: [uploadable],
  props: {
    label: {
      type: String,
      default: () => 'Select file'
    },
    placeholder: {
      type: String,
      default: () => 'No file selected'
    }
  },

  render(h){
    const trigger = this.$slots.trigger ||
              h('v-btn', {
                props: {
                  flat: true,
                  color: this.$theme.accent
                }
              }, this.label)

    let items = h(Items, {
      props:{
        files: this.items
      },
      on:{
        remove: index => this.removeUploadFile(index)
      }
    })

    let preview

    if (this.$scopedSlots.preview) {
      preview = this.$scopedSlots.preview(this.files)
    } else  {
      preview = h('v-responsive', {
        class: 'upload-preview',
      }, this.files.length > 0 ? [items] : [h('p', {
        style: {
          textAlign: 'center',
          width: '100%',
          color: 'gray'
        }
      }, [this.placeholder])])
    }

    const button = h('div', {
      on: {
        click: this.triggerUpload
      },
      style:{
        display: 'inline-block'
      }
    }, [trigger])



    return h(Card, {
      class:'uploader',
    }, [preview, button])
  }
}
