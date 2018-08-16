<template>
      <v-toolbar color="primary" dark fixed :clipped-left="$vuetify.breakpoint.mdAndUp" dense app>
        <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
        <v-toolbar-title>Vuetify admin</v-toolbar-title>
        <v-spacer></v-spacer>
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
                <v-flex xs6>
                  <v-avatar size="72">
                    <img :src="user.avatar" alt="avatar">
                  </v-avatar>
                </v-flex>
                <v-flex xs6>
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
      </v-toolbar>
</template>
<script>
const mapGetters = Vuex.mapGetters;

export default {
    data(){
      return  {
        menu : false
      }
    },
    computed  : {
      mini: {
        get() {
          return this.nav.mini;
        },
        set(now) {
          this.$store.commit('miniNavigation', {mini: now});
        }
      },
      ...mapGetters({
        user : 'user',
        nav  : 'nav'
      })
    },
    components: {},
    methods   : {
      logout() {
        this.$confirm({
          title : '确认退出?'
        }).then(dismiss => {
          UserApi.logout().then(res => {
            dismiss();
            this.$router.push(LOGIN_PATH);
          });
        })

      }
    }
}
</script>
