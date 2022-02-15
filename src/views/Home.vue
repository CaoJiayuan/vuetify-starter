<template>
  <v-container>
    <v-card>
      <v-card-title>Components</v-card-title>

      <v-container>
        <v-btn @click="exc">ex</v-btn>
        <v-btn @click="upload">Upload attachments</v-btn>
        <v-btn @click="$toast('hhh')">toast</v-btn>

        <data-form @submitted="submitted" v-model="formData" url="users">
          <v-text-field v-model="formData.name" label="Name"></v-text-field>
          <date-picker label="DatePicker" v-model="formData.date"></date-picker>
          <time-picker label="TimePicker" v-model="formData.time"/>
          <file-uploader chunk label="上传文件" v-model="formData.fileurl" />
          <data-selector max-length="3" label="Selecter" v-model="formData.tags" url="/lists"/>
          <quill v-model="formData.text"/>
          <a-map @drag="mapDrag"/>
        </data-form>
      </v-container>
    </v-card>
    <br>
    <v-card>
      <v-toolbar flat >
        <span class="text-h5">Users datatable</span>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
          添加
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <data-table @edit="edit" searchable expanded-class="exp-user" @add="tableAdd" :headers="tableHeaders" :actions="tableActions" api-url="/users" selectable v-model="selected">
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
    <dialog-form v-model="formData" max-width="800px" :dialog.sync="dialog" url="users">
      <v-text-field :rules="rules.name" label="Name" v-model="formData.name"></v-text-field>
    </dialog-form>
  </v-container>
</template>

<script>
  import {Quill, DataTable, TimePicker, DatePicker, renderException, DataForm, DataSelector, AMap} from "@/lib";
  import DialogForm from "@/lib/components/form/DialogForm";
  import FileUploader from "@/lib/components/uploader/file";
  const rules = {
    name : [
        v => !!v || 'name is required'
    ],
    text: [
      v => !!v || 'text is required'
    ]
  }

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
            action: 'edit',
            text: '编辑',
            props: {
              small: true,
            },
            granted: item => item.id % 4 === 0,
          },
          {
            action: 'delete',
            text: '删除',
            props: {
              small: true,
              color: 'red',
              dark: true
            },
            granted: item => item.id % 3 === 0,
          },
          {
            action: 'grant',
            text: '授权的操作',
            granted: item => item.id % 2 === 1,
            props: {
              small: true,
              color: 'white'
            }
          }
        ],
        selected: {},
        dialog: false,
        formData: {
          tags: [],
          tag: null
        },
        rules
      }
    },
    components: {
      DataSelector,
      FileUploader,
      DialogForm,
      DataForm,
      DataTable,
      TimePicker,
      Quill,
      DatePicker,
      AMap
    },
    methods: {
      exc() {
        renderException({
          file: "xxxxxx",
          message: 'Server error 500\n' +
              'SQLSTATE[42S22]: Column not found: 1054 Unknown column \'mobile\' in \'where clause\' (SQL: select * from `admins` where `mobile` = 15196600337 and `admins`.`deleted_at` is null limit 1)'
        })
      },
      upload() {
        this.$attachment(console.log, {
          single: true
        })
      },
      tableAdd(item) {
        console.log(item)
      },
      edit(row, reload) {
        console.log(row)
        reload()
      },
      submitted(data) {
        console.log(this.formData)
      },
      mapDrag(pos) {
        console.log(pos)
      }
    }
  }
</script>
