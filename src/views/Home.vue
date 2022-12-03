<template>
  <v-container>
    <v-card>
      <v-card-title>Components</v-card-title>

      <v-container>
        <v-btn @click="exc">ex</v-btn>
        <v-btn @click="upload">Upload attachments</v-btn>
        <v-btn @click="$toast('information', 'success', { timeout: 5000 })"
          >toast</v-btn
        >

        <data-form
          :resolver="dataResolver"
          @submitted="submitted"
          v-model="formData"
          url="users"
        >
          <pre>{{ formData }}</pre>
          <v-text-field v-model="formData.name" label="Name"></v-text-field>
          <date-picker label="DatePicker" v-model="formData.date"></date-picker>
          <time-picker label="TimePicker" v-model="formData.time" />
          <file-uploader
            size="10rem"
            chunk
            label="上传文件"
            v-model="formData.fileurl"
            hint="上传大小不能超过2MB"
          />
          <data-selector
            max-length="3"
            label="Selecter"
            v-model="formData.tags"
            url="/lists"
          />
          <quill v-model="formData.text" />
          <a-map @drag="mapDrag" editable/>
          <datetime-picker
            lebel="开始时间"
            fmt="ts"
            v-model="formData.datetime"
          ></datetime-picker>
        </data-form>
      </v-container>
    </v-card>
    <br />
    <v-card>
      <v-toolbar flat>
        <span class="text-h5">Data list</span>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <data-list
          @delete="delList"
          :actions="listActions"
          :headers="listHeaders"
          api-url="/lists"
        />
      </v-container>
    </v-card>
    <v-card>
      <v-toolbar flat>
        <span class="text-h5">Users datatable</span>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
          添加
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <data-table
          filter-key="ps"
          @name="$toast"
          @edit="edit"
          expanded-class="exp-user"
          @add="tableAdd"
          :headers="tableHeaders"
          :actions="tableActions"
          api-url="/users"
          selectable
          v-model="selected"
          :initFilters="initFilters"
        >
          <template #expanded="{ item }">
            <div>{{ item.name }}</div>
          </template>
          <template #filters="filters">
            <v-col sm="3"
              ><v-text-field v-model="filters.name" label="Name"></v-text-field
            ></v-col>
            <v-col sm="3"
              ><date-picker
                v-model="filters['created_at,=']"
                label="Create Date"
              ></date-picker
            ></v-col>
          </template>
          <template #tools="{ selected }">
            <v-btn
              outlined
              small
              color="red"
              text
              :disabled="selected.length == 0"
              >批量删除({{ selected.length }})</v-btn
            >
          </template>
        </data-table>
      </v-container>
    </v-card>
    <dialog-form
      v-model="formData"
      max-width="800px"
      :dialog.sync="dialog"
      url="users"
      :resolver="dataResolver"
    >
      <v-text-field
        :rules="rules.name"
        label="Name"
        v-model="formData.name"
      ></v-text-field>
    </dialog-form>
  </v-container>
</template>

<script>
import {
  AMap,
  DataForm,
  DataSelector,
  DataTable,
  DatePicker,
  Quill,
  renderException,
  TimePicker,
  DatetimePicker,
  DataList,
} from "@/lib";
import DialogForm from "@/lib/components/form/DialogForm";
import FileUploader from "@/lib/components/uploader/file";

const rules = {
  name: [(v) => !!v || "name is required"],
  text: [(v) => !!v || "text is required"],
};

export default {
  name: "Home",
  data() {
    return {
      date: 1659024000,
      text: null,
      time: null,
      tableHeaders: [
        {
          text: "Name",
          value: "name",
          render: (h, { value, emit }) => {
            return h(
              "v-btn",
              {
                on: {
                  click: () => {
                    console.log(emit);
                    emit("name", value);
                  },
                },
              },
              value
            );
          },
        },
        {
          text: "Created at",
          value: "created_at",
          align: "right",
        },
        {
          text: "Header not show",
          value: "created_at",
          show: false,
        },
      ],
      tableActions: [
        {
          action: "edit",
          text: "编辑",
          props: {
            small: true,
          },
          granted: ({ item }) => item.id % 4 === 0,
        },
        {
          action: "delete",
          text: "删除",
          props: {
            small: true,
            color: "red",
            dark: true,
          },
          granted: ({ item }) => item.id % 3 === 0,
        },
        {
          action: "grant",
          text: "授权的操作",
          disabled: ({ item }) => item.id % 2 === 1,
          props: {
            small: true,
            color: "white",
          },
        },
      ],
      selected: [],
      dialog: false,
      formData: {
        tags: [],
        tag: null,
        fileurl:
          "https://feast.oss-cn-shenzhen.aliyuncs.com/uploads/2022-02-23/45cfb9a8f5f54de8c5215fb4f3dcb409.webp",
        poi: {},
      },
      rules,
      listHeaders: [
        {
          text: "index",
          value: "$index",
          render: (h, item) => {
            return h("span", item.index);
          },
        },
        {
          text: "id",
          value: "id",
        },
        {
          text: "名称",
          value: "name",
        },
      ],
      listActions: [
        {
          action: "edit",
          text: "编辑",
          props: {
            small: true,
          },
          granted: ({ item }) => item.id % 4 === 0,
        },
        {
          action: "delete",
          text: "删除",
          props: {
            small: true,
            color: "red",
            dark: true,
          },
        },
      ],
      initFilters : {
        test : 1
      }
    };
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
    AMap,
    DataList,
    DatetimePicker,
  },
  methods: {
    exc() {
      renderException({
        file: "xxxxxx",
        message:
          "Server error 500\n" +
          "SQLSTATE[42S22]: Column not found: 1054 Unknown column 'mobile' in 'where clause' (SQL: select * from `admins` where `mobile` = 15196600337 and `admins`.`deleted_at` is null limit 1)",
      });
    },
    upload() {
      this.$attachment(
        (f) => {
          console.log("attachment", f);
        },
        {
          single: true,
        }
      );
    },
    tableAdd(item) {
      console.log(item);
    },
    edit(row, reload) {
      console.log(row);
      reload();
    },
    submitted(data) {
      console.log(this.formData);
    },
    mapDrag(pos) {
      this.formData.poi = pos;
      console.log(pos);
    },
    dataResolver(data) {
      console.log(data);
      data.name += "xxxxxxx";
      return data;
    },
    delList(data) {
      alert(JSON.stringify(data));
    },
  },
  mounted() {},
};
</script>
