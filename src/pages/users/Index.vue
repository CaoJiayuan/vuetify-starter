<template>
 <app-panel loading title="Users" name="用户" :actions="panel.actions" @action="action">
   <v-card>
     <vuetify-table v-model="items" selectable api-url="/users" :headers="headers" :actions="actions"></vuetify-table>
   </v-card>
 </app-panel>
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
        ],
        panel: {
          actions: [
            'add',
            {
              icon: 'edit',
              text: '编辑用户',
              disabled : () => this.items.length !== 1,
              click: 'edit'
            },
          ]
        },
        items: []
      }
    },
    computed:{
      selected(){
        return this.items.length > 0
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
      },
      action(action){
        console.log(action)
      }
    },
    mounted () {

    },
    created () {

    },

  }
</script>
