import uploadable from '../../mixins/uploadable'

import Card from '../layout/card'

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

    const items = this.files.map(file => {

      let i = file.preview || file.icon

      const icon = h('img', {
        attrs:{
          src: i
        }
      })

      return h('div',{
        class: 'upload-preview-item'
      }, [icon, file.name])
    })

    let preview

    if (this.$scopedSlots.preview) {
      preview = this.$scopedSlots.preview(this.files)
    } else  {
      preview = h('v-card-media', {
        class: 'upload-preview'
      }, this.files.length > 0 ? items : [h('p', {
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
      props: {
        round: 3
      }
    }, [preview, button])
  }
}
