import uploadable from '@/mixins/uploadable'
const axios = window.axios
import ListView from '../listview'
import Item from './item'

require('./attachment.sass')


export default {
  name: 'vuetify-attachment',
  data() {
    return {
      apiUrl : '/attachments',
      dialog: false,
      destroy: null,
      selected: [],
      tabIndex: 0,
      $vuetify: null
    };
  },
  props:{
    onSubmit: {
      type: Function,
      default: () => {}
    },
    filters: {
      type: Object,
      default: {}
    },
    single: Boolean,
    params: {
      type: Object,
      default: {}
    }
  },
  mixins: [uploadable],
  methods : {
    show(){
      this.dialog = true
    },
    selectFile(file, selected) {
      if (selected) {
        this.single ? this.selected = [file] : this.selected.push(file)
      }  else  {
        if (this.single) {
          this.selected = []
        } else {
          this.selected = this.selected.filter(f => f.id !== file.id)
        }
      }
    },
    isSelected(file) {
      return this.selected.filter(f => f.id === file.id).length > 0
    },
    close(){
      this.dialog = false
      if (typeof this.destroy === 'function') {
        this.destroy();
      }
    },
    dismiss(){
      this.close()
    },
    renderBody(h) {

      let self = this
      const upload = this.renderUpload(h)
      const attachments = this.renderAttachments(h)

      let items = ['上传', '选择附件'].map((t, index) => h('v-tab', {
        props: {
          key: index
        }
      }, t)).concat(upload, attachments)


      const tabs = h('v-tabs', {
        props: {
          color:  'write',
        },
        on:{
          change(k) {
            self.selected = []
            self.tabIndex = k
          }
        }
      }, items)


      return h('div', {
        class: 'attachment-body'
      } , [tabs])
    },
    renderUpload(h) {

      let previews = this.items.map(file => {

        let card = h(Item, {
          props: {
            file,
            selectable: true,
            selected: this.isSelected(file)
          },
          on: {
            select: this.selectFile
          }
        });

        return h('v-flex', {
          attrs: {
            xs6: true,
          }
        }, [card])
      });


      const files = this.items.length > 0 ? previews : [
        h('h4', {
          class: 'attachment-placeholder'
        }, '没有选择文件')
      ]

      const items = h('v-layout', {
        class: 'attachment-items',
        attrs: {
          wrap: true,
          "justify-center": this.items.length < 1,
        }
      }, files)

      const btn = h('v-btn', {
        props: {
          color: this.$theme.color,
          dark: this.$theme.dark
        },
        on: {
          click : this.triggerUpload
        },
        class: 'attachment-btn'
      }, ['选择文件'])

      const body = h('v-card', {}, [h('v-container', {
        attrs: {
          "grid-list-md" : true
        }
      }, [items]), btn])

      return h('v-tab-item', {

      }, [body])
    },
    renderAttachments(h) {
      let self = this

      const body = h('card', {
        props: {

        },
        class: 'attachment-list'
      }, [h(ListView, {
        scopedSlots: {
          item(item) {
            return h('v-flex', {
              attrs: {
                xs6: true
              }
            }, [h(Item, {
              props: {
                file: self.processFile(item),
                selectable: true,
                selected: self.isSelected(item)
              },
              on: {
                select: self.selectFile
              }
            })])
          }
        },
        props: {
          apiUrl: '/attachments',
          queries: this.filters
        }
      })])

      return h('v-tab-item', {

      }, [body])
    }
  },
  render(h) {
    var self = this
    const close = h('v-btn', {
      props: {
        text: true,
        small: true,
        fab: true
      },
      on:{
        click: this.dismiss
      }
    }, [h('v-icon', {}, 'mdi-close')])

    const title = h('v-toolbar', {
      props:{
        color: this.$theme.color,
        dense: true,
        flat: true,
        dark: true,
        height: '38px'
      }
    }, [h('h3', {}, '附件'), h('v-spacer'), close])

    const body = this.renderBody(h)

    let actions = h('v-card-actions', {}, [
      h('v-spacer'),
      h('v-btn', {
        props   : {text: true},
        class   : 'round-2',
        nativeOn: {
          click: this.dismiss
        }
      }, '取消'),
      h('v-btn', {
        props   : {text: true, color: this.$theme.color},
        class   : 'round-2',
        attrs: {
          disabled: this.selected < 1
        },
        nativeOn: {
          click: () => {
            this.$emit('dismiss', self.selected);
            self.dismiss()
            if(self.tabIndex === 0) {
              self.selected.length > 0 && axios.post('/attachments/batch', {
                data: self.selected.map(file => {
                  return {
                    url: file.url,
                    filename: file.filename,
                    type: file.type,
                  }
                })
              }, {
                params: this.params
              }).then(res => {
                let files = res.data.map(item => self.processFile(item))
                files = files.single ? files[0] : files
                self.$emit('submit', files)
                self.onSubmit(files)
              })
            } else {
              let files = self.single ? self.selected[0] : self.selected
              self.$emit('submit', files)
              self.onSubmit(files)
            }
          }
        }
      }, '确定'),
    ]);

    const card = h('v-card' , {
      props: {

      }
    }, [
      title,
      body,
      actions
    ]);


    return h('v-dialog', {
      props: {
        value: this.dialog,
        width: 768,
        transition: 'slide-y-reverse-transition',
        persistent: true,

      }
    }, [card])
  }
};
