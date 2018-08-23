<template>
  <v-app id="app">
    <navigation></navigation>

    <top-bar></top-bar>

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view>
        </router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import {tween, spring} from 'popmotion'
import {APP_NAME} from './constant'
import Navigation from './components/layout/Navigation.vue'
import TopBar from './components/layout/TopBar/Index.vue'
import AppTheme from './components/layout/theme/index'


export default {
  components: {
    AppTheme,
    Navigation,TopBar},
  name: 'App',
  methods:{
    tap(){

    }
  },
  mounted(){
    document.title = `${APP_NAME} - ${this.$route.meta.title}`

  },
  watch:{
    $route(route) {
      document.title = `${APP_NAME}-${route.meta.title}`
    }
  }
}
</script>
<style lang="sass">
  @import "./assets/style/app"
</style>
