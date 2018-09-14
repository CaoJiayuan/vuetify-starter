<template>
  <container grid grid-list-lg fluid>
    <v-layout wrap row>
      <v-flex xs12 md3 text-xs-center>
        <card round="2" to="users">
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
      <v-flex xs12 md3>
        <card loading round="2">
          <v-toolbar :color="$theme.color" :dark="$theme.dark" flat dense>
            <h3>Loading card</h3>
          </v-toolbar>
          <v-card-text>
            <v-subheader>emmmmmmm</v-subheader>
          </v-card-text>
        </card>
      </v-flex>
      <v-flex xs12 md12>
        <card>
          <v-toolbar flat dense><h3>Components</h3></v-toolbar>
          <v-card-text>
            <v-layout wrap row>
              <v-flex xs12 md4>
                <v-toolbar :color="$theme.color" :dark="$theme.dark" flat dense>
                  <h3>Uploader</h3>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="showFiles"><v-icon>save</v-icon></v-btn>
                </v-toolbar>
                <uploader upload-url="http://storage.test/upload" chunk v-model="files">
                </uploader>
              </v-flex>
              <v-flex xs12>
               <card >
                 <v-toolbar :color="$theme.color" :dark="$theme.dark" flat dense>
                   <h3>Editor (quill)</h3>
                 </v-toolbar>
                 <quill-editor v-model="content"></quill-editor>
               </card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </card>
      </v-flex>
    </v-layout>
  </container>
</template>
<script>
  import {tween, value} from 'popmotion';
  import {functions} from 'nerio-js-utils';
  import Uploader from '../../components/uploader';


  const {rand} = functions;

  export default {
    data() {
      return {
        val  : value(0),
        files: [

        ],
        content: '<h1>Text editor title</h1><p>text content</p>'
      };
    },
    components: {
      Uploader,
    },
    computed  : {
      users() {
        return this.val.get();
      },
      today() {
        return Math.floor(this.users / rand(10, 20));
      }
    },
    mounted() {
      this.add(rand(100, 299) * rand(100, 199));
    },
    methods   : {
      add(to) {
        tween({
          to      : this.val.get() + to,
          from    : this.val.get(),
          duration: 1500
        }).pipe(Math.floor).start(this.val);
      },
      showFiles() {
        alert(JSON.stringify(this.files))
      }
    },
    filters   : {
      amount(v) {
        return accounting.format(v);
      }
    }
  };
</script>
