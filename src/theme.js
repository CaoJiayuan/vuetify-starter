import store from './store'

export default {
  install(Vue){
    Vue.prototype.$theme = new Vue({
      computed:{
        color(){
          return 'orange darken-3'
        },
        dark(){
          return this.theme.dark
        },
        accent(){
          return this.theme.accent || this.theme.color
        },
      },
      data: {
        theme : {}
      },
      methods: {
        getThemes(){
          return store.getters.themes
        },
        set(theme) {
          this.$storage.put('app-theme', theme)
          this.theme = theme
          return store.dispatch('setTheme', theme)
        }
      },
      created(){
        let exist = this.$storage.get('app-theme')
        if (exist) {
          this.theme = exist
        } else {
          this.theme = store.getters.theme
        }
      }
    })
  }
}
