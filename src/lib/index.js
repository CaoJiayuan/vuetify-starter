let vuetify
import Vue from 'vue'
import Attachment from "./components/attachment"
import Preview from "./components/preview"
import Confirm from "./components/confirm"
import Toast from "./components/toast"
import {toast} from "./components/toast"
import DataTable from "./components/dataTable"
import DataList from "./components/dataList"
import DataSelector from "./components/dataSelector/Index"
import Quill from "./components/editor/quill/index.vue"
import DatePicker from "./components/datePicker/Index";
import DataForm from "./components/form/Index";
import FileUploader from "./components/uploader/file";
import DialogForm from "./components/form/DialogForm";
import AMap from "./components/mapDrag/Index";
import TimePicker from "./components/datePicker/time/timePicker";
import {renderException} from "./components/exception";
import { initDefaultFormatter } from './components/datePicker/formatter'
import DatetimePicker from "./components/datetimePicker/Index.vue";
import { initDefaultDtFormatter } from './components/datetimePicker/formatter'
import Search from './components/search/Index'

export function setup(vueApp) {
    require('./styles/app.scss')
    vuetify = vueApp.$vuetify
    Vue.use(Attachment)
    Vue.use(Confirm)
    Vue.use(Toast)
    Vue.use(Preview)
    initDefaultFormatter()
    initDefaultDtFormatter()
}

export {vuetify, Attachment, Confirm, DataTable, DataList,
    Quill, TimePicker, DatePicker, renderException, toast,
    DataForm, DialogForm, FileUploader, DataSelector, AMap, DatetimePicker, Search}
