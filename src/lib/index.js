let vuetify
import Vue from 'vue'
import Attachment from "./components/attachment"
import Confirm from "./components/confirm"
import Toast from "./components/toast"
import {toast} from "./components/toast"
import DataTable from "./components/dataTable"
import DataSelector from "./components/dataSelector/Index"
import Quill from "./components/editor/quill/index.vue"
import DatePicker from "./components/datePicker/Index";
import DataForm from "./components/form/Index";
import FileUploader from "./components/uploader/file";
import DialogForm from "./components/form/DialogForm";
import TimePicker from "./components/datePicker/time/timePicker";
import {renderException} from "./components/exception";

export function setup(vueApp) {
    require('./styles/app.scss')
    vuetify = vueApp.$vuetify
    Vue.use(Attachment)
    Vue.use(Confirm)
    Vue.use(Toast)
}

export {vuetify, Attachment, Confirm, DataTable,
    Quill, TimePicker, DatePicker, renderException, toast,
    DataForm, DialogForm, FileUploader, DataSelector}