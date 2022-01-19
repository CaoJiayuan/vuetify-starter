require('./theme.sass')
export default {
  name: 'app-theme',
  data(){
    return {
      menu: false,
      btnPos: {x:0, y:0},
      pointer: null
    }
  },
  mounted(){
  },
  render(h){

    const btn = h('v-btn', {
      props:{
        fab: true,
        small: true,
        dark: this.$theme.dark,
        color: this.$theme.color,
        flat: true
      },
      class: 'app-theme-btn',
      slot: 'activator',
      ref: 'btn',
      style: {
        borderColor: this.$theme.dark ? 'white' : 'black'
      }
    })

    const content = this.$theme.getThemes().map(t => {
      let b = h('v-btn', {
        props:{
          fab: true,
          small: true,
          dark: t.dark,
          color: t.color,
          depressed: t.color !== this.$theme.color
        },
        on: {
          click: () => this.$theme.set(t)
        },
        style:{
          border: ['white'].indexOf(t.color) > -1 ? '1px solid #000' : undefined
        }
      })
      return h('v-flex', {
        attrs: {
          xs3: true,
          'text-xs-center': true
        }
      }, [b])
    })

    const card = h('v-card', {
      slot: 'default',
      props: {
        width: 200,
      },
    }, [h('v-layout', {
      attrs: {
        fluid: true,
        wrap: true
      },
      class: 'app-theme-content'
    }, content)])

    return h('v-menu', {
      class: 'app-theme',
      props:{
        offsetY: true,
        closeOnContentClick : false,
        contentClass: 'round-3',
        light: true
      }
    }, [btn, card])
  },
  methods:{

  }
}
