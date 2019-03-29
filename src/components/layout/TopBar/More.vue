<template>
  <v-menu light :close-on-content-click="false" v-model="menu" offsetY>
    <v-btn :dark="$theme.dark" icon slot="activator">
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-card width="200">
      <v-list dense>
        <v-list-tile to="/settings">
          <v-list-tile-content>
            <v-list-tile-title>偏好设置</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>

</template>

<script>
  export default {
    data () {
      return {
        menu: false
      }
    },
    components: {},
    methods: {},
    mounted () {

    },
    created () {

    },

  }
</script>
