<template>
  <v-app id="app">
    <navigation v-if="!isLogin"></navigation>

    <top-bar v-if="!isLogin"></top-bar>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view>
        </router-view>
      </transition>
    </v-main>
    <!--<v-footer app>-->
    <!--<v-toolbar flat dense>-->
    <!--<v-spacer></v-spacer>-->
    <!--&copy;{{ new Date().getFullYear() }} - Vuetify admin-->
    <!--</v-toolbar>-->
    <!--</v-footer>-->
    <exception ref="exc" v-if="!production"></exception>
  </v-app>
</template>

<script>
import {APP_NAME, LOGIN_PATH} from './constant'
import Navigation from './components/layout/Navigation.vue'
import TopBar from './components/layout/TopBar/Index.vue'
import Exception from "@/lib/components/exception/exception";
import {mapGetters} from 'vuex'
import {isProduction} from "@/utils/utils";

export default {
  components: {
    Exception,
    Navigation,
    TopBar
  },
  name: 'App',
  methods: {
    tap() {

    }
  },
  computed: {
    ...mapGetters({
      excData: 'exception/data',
      excTriggered: 'exception/triggered',
    }),
    isLogin() {
      return this.$route.path === LOGIN_PATH
    },
    production() {
      return isProduction()
    }
  },
  mounted() {
    document.title = `${APP_NAME} - ${this.$route.meta.title}`

    console.log("App version", process.env.VUE_APP_VERSION)
  },
  watch: {
    $route(route) {
      document.title = `${APP_NAME}-${route.meta.title}`
    },
    excTriggered(et) {
      if (et) {
        this.$refs.exc.trigger(this.excData)
      } else {
        this.$refs.exc.unbind()
      }
    }
  }
}
</script>
<style lang="sass">
@import "assets/style/app"
</style>
