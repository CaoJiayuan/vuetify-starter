<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md4 lg3>
          <card class="login-wrap" round="3">
            <div class="login-progress">
              <v-progress-linear color="success" indeterminate height="4" v-if="loading"></v-progress-linear>
            </div>
            <div class="text-xs-center login-title" >
              <h2>Login</h2>
              <small class="desc grey--text">login with your account</small>
            </div>


            <v-card-text>
              <v-form ref="form">
                <v-text-field :rules="rules.email" label="Email"></v-text-field>
                <v-text-field type="password" :rules="rules.password" label="Password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <router-link to="">Sign up</router-link>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">login</v-btn>
            </v-card-actions>
          </card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

const required = v => !!v || 'Field is required'

export default {
  data(){
    return {
      loading: false,
      verified: false,
      rules: {
        email: [
          required
        ],
        password: [
          required
        ]
      }
    }
  },
  methods:{
    login(){
      if(this.$refs.form.validate()){
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$router.push('/')
        }, 300)
      }
    }
  }
}
</script>
<style lang="sass">
  .login-wrap
    margin-top: 128px
    .login-progress
      height: 4px
    .v-progress-linear
      margin: 0
    .login-title
      margin: 32px 0 0
      position: relative
      h2
        margin: 12px 0
      .login-icon
        position: absolute
        right: 16px
</style>
