<template>
  <v-avatar size="36">
    <img :src="user.avatar" alt="avatar">
  </v-avatar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import UserApi from '@/apis/user';
  import {LOGIN_PATH} from '@/constant';

  export default {
    data () {
      return {
        menu: false
      }
    },
    computed:{
      ...mapGetters({
        user: 'user',
      })
    },
    components: {},
    methods: {
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
    mounted () {

    },
    created () {

    },

  }
</script>

<style lang="sass">
  .profile-menu
    .v-card__actions
      border-top: 1px solid rgba(170, 170, 170, 0.3)
</style>
