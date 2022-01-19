<template>
  <v-menu light :close-on-content-click="false" maxHeight="386" v-model="menu" offset-y="72">
      <v-badge slot="activator" v-ripple class="badge-small clickable" overlap color="red">
        <span slot="badge" v-if="unreads > 0">{{ unreads }}</span>
        <v-icon :dark="$theme.dark">
          notifications
        </v-icon>
      </v-badge>
      <v-card width="320">
        <v-card-text v-if="notifications.length < 1" class="text-xs-center">
           还没有通知
        </v-card-text>
        <template v-for="(n,i) in notifications">
            <v-card-text :key="i" @click="read(n)">
              <p>{{ n.message }}</p>
              <small>{{n.date}}  <v-chip small v-if="n.unread">unread</v-chip>  </small>
            </v-card-text>
            <v-divider></v-divider>
        </template>
      </v-card>
    </v-menu>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      notifications: []
    }
  },
  mounted() {
  //  this.$io.subscribe('notification').on('message', data => this.notifications.push({
  //    message: data,
  //    date:new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
  //    unread: true
  //  }))
  },
  computed:{
    unreads(){
      return this.notifications.filter(n => n.unread).length
    }
  },
  methods:{
    read(n){
      n.unread = false
    }
  }
}
</script>
