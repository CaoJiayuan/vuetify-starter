<template>
<container grid grid-list-md text-xs-center>
  <v-layout wrap row>
    <v-flex xs12 >
      <v-btn @click="request">
        click
      </v-btn>
    </v-flex>
  </v-layout>
</container>
</template>
<script>
export default {

  mounted(){

  },
  methods:{
    request(){
      axios.get('/test').then(re => {

      })
    }
  }
}
</script>
