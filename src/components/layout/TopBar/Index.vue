<template>
  <v-toolbar class="app-top-bar" :color="$theme.color" :dark="$theme.dark" fixed :clipped-left="$vuetify.breakpoint.mdAndUp" dense app>
    <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
    <v-toolbar-title>Vuetify admin</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-autocomplete flat solo-inverted height="36px"
                    dense ref="search" v-model="action"
                    :filter="filterNav" @input="jumpTo" solo
                    :items="actions"
                    label="跳转到"
                    no-data-text="这里什么也没有-_-!!!"
                    :dark="$theme.dark"
                    hideDetails>
      <template
        slot="selection"
        slot-scope="data"
      >
        {{ data.item.display_name }}
      </template>

      <template
        slot="item"
        slot-scope="data"
      >
        <template>
          <v-list-tile-avatar>
            <v-icon>{{data.item.icon}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.display_name"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
    <v-spacer></v-spacer>
    <app-theme></app-theme>
    <notification/>
    <more></more>
    <avatar></avatar>
  </v-toolbar>
</template>
<script>
  import AppTheme from '../theme/index'

  const mapGetters = Vuex.mapGetters;
  import {getNavFromRoutes} from '../../../apis/home';


  import Notification from './Notification.vue';
  import More from './More.vue';
  import Avatar from './Avatar.vue';

  export default {
    data() {
      return {
        menu   : false,
        search : false,
        actions: [],
        action: {},
      };
    },
    computed: {
      mini: {
        get() {
          return this.nav.mini;
        },
        set(now) {
          this.$store.commit('miniNavigation', {mini: now});
        }
      },
      ...mapGetters({
        user: 'user',
        nav : 'nav'
      })
    },
    mounted() {
      getNavFromRoutes().then(as => this.actions = as)
      document.addEventListener('keyup', this.searchShortCut)
    },
    beforeDestroy(){
      document.removeEventListener('keyup', this.searchShortCut)
    },
    components: {
      AppTheme,
      Notification, More, Avatar
    },
    methods   : {

      jumpTo(nav) {
        this.$router.push(nav.path)
        this.search = false
        this.action = {}
      },
      filterNav(item, text){
        return item.display_name.indexOf(text) > -1 || item.path.indexOf(text) > -1
      },
      searchShortCut(e){
        if(e.key === 'G' && e.shiftKey && e.ctrlKey) {
//          this.$refs.search.blur()
//          this.$refs.search.focus()
          this.search = !this.search
        }
      }
    },
    watch:{
      search(now) {
        let search = this.$refs.search
        now ? search.focus() : search.blur()
//        console.log(search)
      }
    }
  };
</script>
<style lang="sass">
.app-top-bar
  opacity: .95
</style>
