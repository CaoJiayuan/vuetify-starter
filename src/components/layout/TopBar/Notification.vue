<template>
  <v-menu maxHeight="386" v-model="menu" offset-y="72">
      <v-badge slot="activator" v-ripple class="badge-small clickable" overlap color="red">
        <span slot="badge" v-if="notifications.length > 0">{{ notifications.length }}</span>
        <v-icon>
          notifications
        </v-icon>
      </v-badge>
      <v-card width="320">
        <v-card-text v-if="notifications.length < 1" class="text-xs-center">
           还没有通知
        </v-card-text>
        <template v-for="(n,i) in notifications">
            <v-card-text :key="i">
              <p>{{ n.message }}</p>
              <small>{{n.date}}</small>
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
    this.$io.subscribe('notification').on('message', data => this.notifications.push({
      message: data,
      date:new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }))
  }
}
</script>
