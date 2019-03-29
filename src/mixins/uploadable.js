import {uploader} from 'nerio-js-utils';

const {upload, UploadFile, DRIVER_SERVER} = uploader;

export default {
  props   : {
    uploadUrl      : {
      type   : String,
      default: '/upload'
    },
    uploadDriver   : {
      type   : String,
      default: DRIVER_SERVER
    },
    uploadValidator: {
      type   : Function,
      default: undefined
    },
    accept         : {
      type   : String,
      default: '*/*'
    },
    chunk          : Boolean,
    filesResolver  : {
      type   : Function,
      default: files => files.filter(file => file.url !== null).map(file => {
        return {
          name: file.name,
          type: file.type,
          url : file.url,
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
  methods : {
    triggerUpload() {
      this.uploadInput.click();
    },
    doUpload(e) {
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
        name    : file.name,
        type    : file.type,
        progress: 0,
        url     : null,
        error   : false,
        errorMsg: '',
        done    : false,
        tick    : 0
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


      upload(file, this.uploadUrl, {
        driver  : this.uploadDriver,
        validate: this.getUploadValidator(),
        chunk   : this.chunk,
        success : data => {
          f.url = data.url.split('?', 2)[0];
          f.percent = 100;
          f.done = true;

          this.emitChangeFiles();
        },
        error   : error => {
          f.error = true;
          f.errorMsg = error.message;
        },
        progress: percent => f.progress = percent,
        chunkSize: this.chunkSize
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

      return this.value.map(v => {
        let partials = v.name.split('.');

        let ext = partials[partials.length - 1];

        return {
          type : v.type,
          name: v.name,
          url: v.url,
          preview: v.type.indexOf('image') >= 0 ? v.url : this.getIconByExtention(ext),
          done: true
        }
      })
    },
    getIconByExtention(extension){
      let icon
      if (this.knownFileTypes.indexOf(extension) > -1) {
        icon = this.fileIconsDir + extension + '.svg';
      } else {
        icon = this.fileIconsDir + 'file.svg';
      }
      return icon
    }
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
      knownFileTypes: [
        'aep',
        'ai',
        'audition',
        'avi',
        'bridge',
        'css',
        'csv',
        'dbf',
        'doc',
        'dreamweaver',
        'dwg',
        'exe',
        'file',
        'fireworks',
        'fla',
        'flash',
        'html',
        'illustrator',
        'indesign',
        'iso',
        'javascript',
        'jpg',
        'jpeg',
        'json-file',
        'mp3',
        'mp4',
        'pdf',
        'photoshop',
        'png',
        'ppt',
        'prelude',
        'premiere',
        'psd',
        'rtf',
        'search',
        'svg',
        'txt',
        'xls',
        'xlsx',
        'xml',
        'zip-1',
        'zip'
      ],
      fileIconsDir  : '/static/images/filetypes/'
    };
  },
  mounted() {
    this.bind();
  },
  beforeDestroy() {
    this.unbind();
  }
};
