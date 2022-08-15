

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
      on: {
        click: this.dismiss
      }
    }, [h('v-icon', {}, 'mdi-close')])

    const title = h('v-toolbar', {
      props: {
        color: this.$theme.color,
        dense: true,
        flat: true,
        dark: true,
        height: '48px'
      }
    }, [h('h3', {}, '预览'), h('v-spacer'), close])

    const img = h('img', {
      attrs: {
        src: this.url,
      },
      style: {
        maxWidth: '80vw',
        maxHeight: '85vh'
      }
    })

    const card = h('v-layout', {
      props: {
        alignCenter: true,
        justifyCenter: true,
        row: true,
        fillHeight: true
      }
    }, [
      img
    ]);

    return h('v-dialog', {
      props: {
        value: this.dialog,
        maxWidth: 'fit-content',
        transition: 'slide-y-reverse-transition',
      },
      on: {
        input: val => this.dialog = val
      }
    }, [card])
  },
  methods: {
    show() {
      this.dialog = true
    },
    close() {
      this.dialog = false
      if (typeof this.destroy === 'function') {
        this.destroy();
      }
    },
    dismiss() {
      this.close()
    },
  }
}
