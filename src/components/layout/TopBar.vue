<template>
  <v-toolbar color="primary" dark fixed :clipped-left="$vuetify.breakpoint.mdAndUp" dense app>
    <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
    <v-toolbar-title>Vuetify admin</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="search = true">
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-menu v-model="menu" offset-y="72">
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
          <v-btn ripple @click="logout" flat color="primary">退出</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-dialog v-model="search" width="512" content-class="search-bar" transition="slide-y-transition">
      <v-autocomplete :filter="filterNav" @input="jumpTo" solo :items="actions" label="Search something"
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
    </v-dialog>
  </v-toolbar>
</template>
<script>
  const mapGetters = Vuex.mapGetters;
  import {getNavFromRoutes} from '../../apis/home';

  export default {
    data() {
      return {
        menu   : false,
        search : false,
        actions: []
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
    },

    components: {},
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
      searchInput() {
        console.log('search');
      },
      jumpTo(nav) {
        console.log(nav)
        this.$router.push(nav.path)
        this.search = false
      },
      filterNav(item, text){
        return item.display_name.indexOf(text) > -1 || item.path.indexOf(text) > -1
      }
    }
  };
</script>
<style lang="sass">
  .search-bar
    position: absolute
    top: 64px
</style>
