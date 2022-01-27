<template>
  <v-container>
    <v-card>
      <v-card-title>Components</v-card-title>

      <v-container>
        <v-btn @click="exc">ex</v-btn>
        <v-btn @click="upload">Upload attachments</v-btn>
        <date-picker label="DatePicker" v-model="date"></date-picker>
        <time-picker label="TimePicker" v-model="time"/>
        <quill v-model="text"/>
      </v-container>
    </v-card>
    <br>
    <v-card>
      <v-toolbar flat >
        <span class="text-h5">Users datatable</span>
        <v-spacer></v-spacer>
        <v-btn color="primary">
          <v-icon>mdi-plus</v-icon>
          添加
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <data-table searchable expanded-class="exp-user" @add="tableAdd" :headers="tableHeaders" :actions="tableActions" api-url="/users" selectable v-model="selected">
      <template #expanded="{item}">
        <div>{{item.name}}</div>
      </template>
      <template #filters="filters">
        <v-col sm="3"><v-text-field v-model="filters.name" label="Name"></v-text-field></v-col>
        <v-col sm="3"><date-picker v-model="filters['created_at,=']" label="Create Date"></date-picker></v-col>
      </template>
    </data-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>

  import {renderException} from "@/components/exception";
  import DatePicker from "@/components/datePicker/Index";
  import Quill from "@/components/editor/quill";
  import TimePicker from "@/components/datePicker/time/timePicker";
  import DataTable from "@/components/dataTable";

  export default {
    name: 'Home',
    data() {
      return {
        date: null,
        text: null,
        time: null,
        tableHeaders: [
          {
            text: "Name",
            value: 'name'
          },
          {
            text: "Created at",
            value: 'created_at',
            align: 'right'
          },
        ],
        tableActions: [
          {
            action: 'add',
            icon: 'mdi-plus',
            text: 'add',
            props: {
              small: true,
              text: true
            }
          }
        ],
        selected: {}
      }
    },
    components: {
      DataTable,
      TimePicker,
      Quill,
      DatePicker
    },
    methods: {
      exc() {
        renderException({
          file: "xxxxxx"
        })
      },
      upload() {
        this.$attachment(console.log, {
          // single: true
        })
      },
      tableAdd(item) {
        console.log(item)
      }
    }
  }
</script>
