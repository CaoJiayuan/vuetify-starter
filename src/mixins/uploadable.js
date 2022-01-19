import {upload, UploadFile} from 'nerio-uploader';
import {functions} from 'nerio-js-utils'
import fileprocess from './fileprocess'

const {fastRandom} = functions
const DRIVER_SERVER = 'server'

export default {
  props   : {
    uploadUrl      : {
      type   : String,
      default: '/upload'
    },
    stsUrl      : {
      type   : String,
      default: '/oss/sts'
    },
    uploadDriver   : {
      type   : String,
      default: process.env.UPLOAD_DRIVER || DRIVER_SERVER
    },
    uploadValidator: {
      type   : Function,
      default: undefined
    },
    accept         : {
      type   : String,
      default: '*/*'
    },
    filename        : {
      type   : String,
      default: 'file'
    },
    chunk          : Boolean,
    filesResolver  : {
      type   : Function,
      default: files => files.filter(file => file.url !== null).map(file => {
        return {
          name: file.name,
          type: file.type,
          url : file.url,
          path: file.path
        };
      })
    },
    value          : {
      type   : Array,
      default: () => []
    },
    chunkSize: {
      type: Number,
      default: 256 * UploadFile.KB
    },
    multifile:{
      type: Boolean,
      default: true
    }
  },
  mixins: [fileprocess],
  methods : {
    triggerUpload() {
      this.uploadInput.click();
    },
    doUpload(e) {
      this.files = []
      for (let i = 0; i < e.target.files.length; i++) {
        this.uploadSingle(e.target.files[i]);
      }
    },
    /**
     *
     * @param {File} file
     */
    uploadSingle(file) {
      let uploadFile = new UploadFile(file);
      let extension = uploadFile.getExtension();
      let icon = this.getIconByExtention(extension)
      let f = {
        id       : md5(new Date().getTime() + fastRandom(10)),
        name     : file.name,
        filename : file.name,
        type     : file.type,
        progress : 0,
        url      : null,
        error    : false,
        errorMsg : '',
        done     : false,
        tick     : 0
      };
      this.files.push(f);

      if (uploadFile.isImage()) { // image preview has issues with mockjs
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = e => {
          f.preview = e.target.result;
        };
      } else {
        f.preview = icon;
      }

      upload(file, this.uploadDriver, {
        validate: this.getUploadValidator(),
        chunk   : this.chunk,
        progress: percent => f.progress = percent,
        chunkSize: this.chunkSize,
        name: this.filename,
        stsUrl: this.stsUrl
      }).then(data => {
        f.url = data.url.split('?', 2)[0];
        f.percent = 100;
        f.done = true;
        f.path = data.path
        this.emitChangeFiles();
      }).catch(error => {
        f.error = true;
        f.errorMsg = error.message;
      });
    },
    emitChangeFiles() {
      this.$emit('input', this.resolveUploadFiles(this.files));
    },
    getUploadValidator() {
      if (this.uploadValidator) {
        return this.uploadValidator;
      }
      if (this.accept && this.accept !== '*/*') {
        return uploadFile => {
          let reg = new RegExp(this.accept.replace('*', '.*'));
          return reg.test(uploadFile.file.type);
        };
      }
      return uploadFile => true;
    },
    resolveUploadFiles(files) {
      return this.filesResolver(files);
    },
    removeUploadFile(index) {
      this.files.splice(index, 1)
      this.emitChangeFiles();
    },
    bind() {
      this.uploadInput.addEventListener('change', this.doUpload);
    },
    unbind() {
      this.uploadInput.removeEventListener('change', this.doUpload);
    },
    parseValue(){

      return this.value.map(v => this.processFile(v))
    },
  },
  computed: {
    uploadInput() {
      if (this.fileEl === null) {
        this.fileEl = document.createElement('input');
        this.fileEl.type = 'file';
        this.fileEl.multiple = this.multifile;
        this.fileEl.accept = this.accept;
        // document.body.appendChild(this.fileEl);
      }

      return this.fileEl;
    },
    items() {
      if (this.files.length > 0) {
        return this.files;
      }
      this.files = this.parseValue();

      return this.files;
    }
  },
  data() {
    return {
      fileEl        : null,
      files         : [],
    };
  },
  mounted() {
    this.bind();
  },
  beforeDestroy() {
    this.unbind();
  }
};
