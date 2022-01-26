<template>
  <app-panel title="Home" :actions="['add', 'edit', 'refresh']">
    <v-btn @click="exc">ex</v-btn>
    <v-btn @click="upload">Upload</v-btn>
    <date-picker v-model="date"></date-picker>
    <time-picker v-model="time"/>
    <quill v-model="text"/>
    <data-table title="Users" searchable expanded-class="exp-user" @add="tableAdd" :headers="tableHeaders" :actions="tableActions" api-url="/333users" selectable v-model="selected">
      <template #expanded="{item}">
        <div>{{item.name}}</div>
      </template>
      <template #filters="filters">
        <v-col sm="12"><div>{{filters}}</div></v-col>
        <v-col sm="3"><v-text-field v-model="filters.name" label="Name"></v-text-field></v-col>
        <v-col sm="3"><date-picker v-model="filters['created_at,=']" label="Create Date"></date-picker></v-col>
      </template>
    </data-table>
    <div>
      {{selected}}
    </div>
  </app-panel>
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
