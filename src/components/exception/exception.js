import {mapActions} from "vuex";

require('./exception.sass')
import {VCard, VCardText, VCardActions, VSpacer, VBtn, VIcon, VToolbar, VDialog} from 'vuetify/lib'

export default {
  name: 'exception',
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
    const close = h(VBtn, {
      props: {
        text: true,
        small: true,
        fab: true,
        dark: false
      },
      on:{
        click: this.unbind
      }
    }, [h(VIcon, {
      dark: false
    }, 'mdi-close')])

    const chip = h('div',{
      class: 'exception-chip'
    }, 'Server error '+ this.data.code)
    const t = h('div', {
      class: 'execption-title'
    },[h('p', {}, this.data.message), h('small', {}, 'file: ' + this.data.file)])

    const title = h(VToolbar, {
      props:{
        color:'red',
        dense: true,
        flat: true,
        dark: true
      }
    }, [chip, t , h(VSpacer) ,close])

    let trace = this.data.trace || []
    const body = trace.map(t => {
      return h('p', {}, t)
    })

    const card = h(VCard, {
      class: 'exception-wrap'
    }, [title, h(VCardText, {
      class: 'exception-body'
    }, body.length > 0 ? body : ['No trace to show, server may not in debug mode'] )])

    return h(VDialog, {
      props: {
        maxWidth: '1024',
        value: this.dialog,
        transition: 'slide-y-reverse-transition',
        persistent: true,
        contentClass: 'exception round-3',
      },
      attrs: {
        id: 'dialog-exception'
      },
      ref: 'dialog'
    }, [card])
  },
  methods:{
    ...mapActions({
      unTrigger: 'exception/unTrigger'
    }),
    unbind(){
      this.dialog = false
      this.unTrigger()
      if (typeof this.destroy === 'function') {
        this.destroy();
      }
    },
    active(){
      this.dialog = true
    },
    trigger(data) {
      this.data = data
      this.active()
    }
  }
}
