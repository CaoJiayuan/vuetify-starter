require('./exception.sass')

export default {
  data () {
    return {
      data: {
        code: 500,
        file: 'unknown',
        message: 'Error',
        trace: []
      },
      dialog: false
    }
  },
  render (h) {
    const close = h('v-btn', {
      props: {
        flat: true,
        small: true,
        fab: true
      },
      on:{
        click: this.unbind
      }
    }, [h('v-icon', {}, 'close')])

    const chip = h('div',{
      class: 'exception-chip'
    }, 'Server error '+ this.data.code)
    const t = h('div', {
      class: 'execption-title'
    },[h('p', {}, this.data.message), h('small', {}, 'file: ' + this.data.file)])

    const title = h('v-toolbar', {
      props:{
        color:'red',
        dense: true,
        flat: true,
        dark: true
      }
    }, [chip, t , h('v-spacer') ,close])

    const body = this.data.trace.map(t => {
      return h('p', {}, t)
    })

    const card = h('v-card', {
      class: 'exception-wrap'
    }, [title, h('v-card-text', {
      class: 'exception-body'
    }, body.length > 0 ? body : ['No trace to show, server may not in debug mode'] )])

    return h('v-dialog', {
      props: {
        maxWidth: '1024',
        value: this.dialog,
        transition: 'slide-y-reverse-transition',
        persistent: true,
        contentClass: 'exception round-3'
      },
      ref: 'dialog'
    }, [card])
  },
  methods:{
    unbind(){
      this.dialog = false
      if (typeof this.destroy === 'function') {
        this.destroy();
      }
    },
    active(){
      this.dialog = true
    }
  }
}
