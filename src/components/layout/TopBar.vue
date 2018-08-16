<template>
      <v-toolbar color="primary" dark fixed :clipped-left="$vuetify.breakpoint.mdAndUp" dense app>
        <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-icon>more_vert</v-icon>
        <v-avatar size="36">
          <img :src="user.avatar" alt="avatar">
        </v-avatar>
        <v-btn ripple @click="logout" flat>退出</v-btn>
      </v-toolbar>
</template>
<script>
const mapGetters = Vuex.mapGetters;

export default {
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
