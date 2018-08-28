<template>
<container grid grid-list-md text-xs-center>
  <v-layout wrap row>
    <v-flex xs12 md3>
      <card round="2" @click="add(100)">
        <v-toolbar :color="$theme.color" :dark="$theme.dark" flat dense>
          <h3>Users</h3>
          <v-spacer></v-spacer>
          <v-icon>account_box</v-icon>
          </v-toolbar>
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs6><h2>{{ users | amount}}</h2> amount</v-flex>
            <v-flex xs6 class="green--text"><h2>{{ today | amount}}</h2> today</v-flex>
          </v-layout>
        </v-card-text>
      </card>
    </v-flex>
  </v-layout>
</container>
</template>
<script>
import {tween, value} from 'popmotion'
import {functions}  from 'nerio-js-utils'

const {rand} = functions

export default {
  data(){
    return {
      val: value(0)
    }
  },
  computed:{
    users(){
      return this.val.get()
    },
    today(){
      return Math.floor(this.users / rand(10, 20))
    }
  },
  mounted(){
    this.add(rand(100, 299) * rand(100, 199))
  },
  methods:{
    add(to){
      tween({
        to: this.val.get() + to,
        from : this.val.get(),
        duration: 1500
      }).pipe(Math.floor).start(this.val)
    }
  },
  filters: {
    amount(v) {
      return accounting.format(v)
    }
  }
}
</script>
