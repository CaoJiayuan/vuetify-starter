<template>
  <v-app id="app">
    <navigation></navigation>
    <v-toolbar dense app></v-toolbar>
    <v-content app>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import {tween, spring} from 'popmotion'
import {APP_NAME} from './constant'
import Navigation from './components/layout/Navigation.vue'

export default {
  components: {Navigation},
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
