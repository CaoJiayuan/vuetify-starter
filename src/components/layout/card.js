export default {
  name: 'card',
  props: {
    round: {
      type: Number,
      default: 0
    },
    flat: Boolean,
    loading: Boolean
  },
  computed:{
    cardClass(){
      return this.round > 0 ?
        'app-card ' + 'round-' + this.round :
        'app-card'
    }
  },
  render(h){
    return h('v-card', {
      class: this.flat ? this.cardClass + ' flat-card' : this.cardClass,
      attrs: this.$attrs,
      nativeOn: this.$listeners,
      props: {
        flat: this.flat
      }
    }, [this.$slots.default, this.loading ? this.renderLoading(h) : undefined])
  },
  methods:{
    renderLoading(h){
      const p = h('v-progress-circular', {
        props: {
          indeterminate: true,
          color: this.$theme.accent,
          width: 3
        },
        class: 'loading-progress'
      })

      return h('div', {
        class: 'loading-wrapper'
      }, [p])
    }
  }
}
