<template>
 <v-container>
   <v-card>
     <v-card-title>
       Users
     </v-card-title>
     <vuetify-table api-url="/users" :headers="headers"></vuetify-table>
   </v-card>
 </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            value: 'id',
            text : 'ID'
          },
          {
            value: 'avatar',
            text : 'Avatar',
            display: v => `<img src="${v}" width="32" class="circle"/>`
          },
          {
            value: 'name',
            text : 'Name'
          },
          {
            value: 'created_at',
            text : 'Created at'
          },
        ]
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
