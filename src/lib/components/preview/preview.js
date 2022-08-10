

export default {
  data() {
    return {
      dialog: false,
      destroy: null,
    }
  },
  props: {
    url: String
  },
  render(h) {
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
        height: '48px'
      }
    }, [h('h3', {}, '预览'), h('v-spacer'), close])

    const img = h('v-img', {
      props: {
        src: this.url,
        maxWith: '100%',
        contain: true
      }
    })

    const card = h('v-card' , {
      props: {

      }
    }, [
      title,
      img
    ]);

    return h('v-dialog', {
      props: {
        value: this.dialog,
        width: 768,
        transition: 'slide-y-reverse-transition',
        persistent: true,
      }
    }, [card])
  },
  methods: {
    show(){
      this.dialog = true
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
  }
}
