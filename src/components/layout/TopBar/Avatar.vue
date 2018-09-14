<template>
  <v-menu light :close-on-content-click="false" v-model="menu" offset-y="72">
    <v-avatar size="36" slot="activator">
      <img :src="user.avatar" alt="avatar">
    </v-avatar>
    <v-card width="320" class="profile-menu">
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
      <v-card-actions :dark="$theme.dark">
        <v-spacer></v-spacer>
        <v-btn ripple @click="logout" flat :color="$theme.color">退出</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
  const mapGetters = Vuex.mapGetters;
  import UserApi from '../../../apis/user';
  import {LOGIN_PATH} from '../../../constant';

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
          UserApi.logout().then(res => {
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
