<template>
  <v-app id="app">
    <navigation v-if="!isLogin"></navigation>

    <top-bar v-if="!isLogin"></top-bar>

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view>
        </router-view>
      </transition>
    </v-content>
    <!--<v-footer app>-->
    <!--<v-toolbar flat dense>-->
    <!--<v-spacer></v-spacer>-->
    <!--&copy;{{ new Date().getFullYear() }} - Vuetify admin-->
    <!--</v-toolbar>-->
    <!--</v-footer>-->
  </v-app>
</template>

<script>
import {APP_NAME, LOGIN_PATH} from './constant'
import Navigation from './components/layout/Navigation.vue'
import TopBar from './components/layout/TopBar/Index.vue'
export default {
  components: {
    Navigation,
    TopBar
  },
  name: 'App',
  methods:{
    tap(){

    }
  },
  computed:{
    isLogin(){
      return this.$route.path === LOGIN_PATH
    }
  },
  mounted(){
    document.title = `${APP_NAME} - ${this.$route.meta.title}`

    console.log("App version", process.env.APP_VERSION)
  },
  watch:{
    $route(route) {
      document.title = `${APP_NAME}-${route.meta.title}`
    }
  }
}
</script>
<style lang="sass">
@import "assets/style/app"
</style>
