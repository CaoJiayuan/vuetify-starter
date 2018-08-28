export default {
  name: 'card',
  props: {
    round: {
      type: Number,
      default: 0
    },
    flat: Boolean
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
    }, [this.$slots.default])
  }
}
