<template>
  <v-toolbar class="elevation-2 app-top-bar" :color="$theme.color" :dark="$theme.dark" fixed :clipped-left="$vuetify.breakpoint.mdAndUp" dense app>
    <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
    <v-toolbar-title>Vuetify admin</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-autocomplete flat solo-inverted height="36px"
                    dense ref="search" v-model="action"
                    :filter="filterNav" @input="jumpTo" solo
                    :items="actions"
                    label="跳转到"
                    no-data-text="这里什么也没有-_-!!!"
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
    <v-menu :close-on-content-click="false" v-model="menu" offset-y="72">
      <v-avatar size="36" slot="activator">
        <img :src="user.avatar" alt="avatar">
      </v-avatar>
      <v-card width="320">
        <v-card-text>
          <v-layout>
            <v-flex xs4>
              <v-avatar size="72">
                <img :src="user.avatar" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex xs8>
              <div>
                <p>{{user.name}}</p>
                <p>{{user.email}}</p>
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions style="background: #eee">
          <v-spacer></v-spacer>
          <v-btn ripple @click="logout" flat :color="$theme.color">退出</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-toolbar>
</template>
<script>
  import AppTheme from '../theme/index'

  const mapGetters = Vuex.mapGetters;
  import {getNavFromRoutes} from '../../../apis/home';
  import Notification from './Notification.vue';
  import More from './More.vue';

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
      Notification, More},
    methods   : {
      logout() {
        this.$confirm({
          title: '确认退出?'
        }).then(dismiss => {
          UserApi.logout().then(res => {
            dismiss();
            this.$router.push(LOGIN_PATH);
          });
        });
      },
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
