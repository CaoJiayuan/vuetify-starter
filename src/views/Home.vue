<template>
  <app-panel title="Home" :actions="['add', 'edit', 'refresh']">
    <v-btn @click="exc">ex</v-btn>
    <v-btn @click="upload">Upload</v-btn>
    <date-picker v-model="date"></date-picker>
    <quill v-model="text"/>
  </app-panel>
</template>

<script>

  import {renderException} from "@/components/exception";
  import DatePicker from "@/components/datePicker/date/datePicker";
  import Quill from "@/components/editor/quill";

  export default {
    name: 'Home',
    data() {
      return {
        date: null,
        text: null
      }
    },
    components: {
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
      }
    }
  }
</script>
