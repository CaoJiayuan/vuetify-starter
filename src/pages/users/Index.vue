<template>
 <v-container>
   <v-card>

     <vuetify-table selectable api-url="/users" :headers="headers" :actions="actions"></vuetify-table>
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
        ],
        actions: [
          {
            icon: 'delete',
            color: 'error',
            click: 'deleteItem',
          }
        ]
      }
    },
    components: {},
    methods: {
      deleteItem(item){
        this.$confirm({
          title: "Is that ok?"
        }).then(dismiss => {
          alert(JSON.stringify(item))
          dismiss()
        })
      }
    },
    mounted () {

    },
    created () {

    },

  }
</script>
