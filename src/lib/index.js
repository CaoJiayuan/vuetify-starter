let vuetify
import Vue from 'vue'
import Attachment from "./components/attachment"
import Confirm from "./components/confirm"
import Toast from "./components/toast"
import DataTable from "./components/dataTable"
import Quill from "./components/editor/quill/index.vue"
import DatePicker from "./components/datePicker/Index";
import TimePicker from "./components/datePicker/time/timePicker";
import {renderException} from "./components/exception";

export function setup(vueApp) {
    vuetify = vueApp.$vuetify
    Vue.use(Attachment)
    Vue.use(Confirm)
    Vue.use(Toast)
}

export {vuetify, Attachment, Confirm, DataTable, Quill, TimePicker, DatePicker, renderException, Toast}