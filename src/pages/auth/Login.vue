<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 sm6 md4>
          <card class="login-wrap" round="3">
            <div class="text-xs-center login-title" >
              <v-icon class="login-icon">account_box</v-icon>
              <h2>Login</h2>
              <small class="desc grey--text">login with your account</small>
            </div>


            <v-card-text>
              <v-text-field label="Email"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Next</v-btn>
            </v-card-actions>
          </card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {

}
</script>
<style lang="sass">
  .login-wrap
    margin-top: 64px
    .login-title
      margin: 16px 0 0
      position: relative
      h2
        margin: 12px 0
      .login-icon
        position: absolute
        right: 16px
</style>
