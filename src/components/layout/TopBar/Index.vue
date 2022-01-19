<template>
  <v-app-bar dark class="app-top-bar" :color="$theme.color" fixed :clipped-left="$vuetify.breakpoint.mdAndUp" dense app>
    <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <div class="app-tools">
      <v-toolbar-title>{{user.merchant_id !== 0 ? user.name : ''}}</v-toolbar-title>
      <avatar></avatar>
      <v-btn ripple @click="logout" text>退出</v-btn>
    </div>
  </v-app-bar>
</template>
<script>

  import {mapGetters} from 'vuex'

  import {getNavFromRoutes} from '@/apis/home';
  import UserApi from '@/apis/user';
  import {LOGIN_PATH} from '@/constant';

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
        merchant: 'merchant',
        nav : 'nav'
      })
    },
    mounted() {
      getNavFromRoutes().then(as => this.actions = as)
      document.addEventListener('keyup', this.searchShortCut)
      this.$store.dispatch('loadUser').then(user => {

      });
    },
    beforeDestroy(){
      document.removeEventListener('keyup', this.searchShortCut)
    },
    components: {
      // Notification,
      // More,
      Avatar
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
      },
      logout() {
        this.$confirm({
          title: '确认退出?'
        }).then(dismiss => {
          UserApi.logout().then(() => {
            dismiss();
            this.$router.push(LOGIN_PATH);
          });
        });
      },
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
<style lang="scss">
.app-top-bar {
  opacity: .95;
}

.app-tools {
  display: flex;
  align-items: center;
  div {
    margin: 0 6px;
  }
}

</style>
