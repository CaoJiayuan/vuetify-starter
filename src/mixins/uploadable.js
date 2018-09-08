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
    filesResolver:{
      type: Function,
      default: files => files.filter(file => file.url !== null).map(file => {
        return {
          name: file.name,
          type: file.type,
          url: file.url,
        }
      })
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  methods : {
    triggerUpload() {
      this.uploadInput.click();
    },
    doUpload(e) {
      for (let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files[i];
        let uploadFile = new UploadFile(file), icon;
        let extension = uploadFile.getExtension();
        if (this.knownFileTypes.indexOf(extension) > -1) {
          icon = this.fileIconsDir + extension + '.svg';
        } else {
          icon = this.fileIconsDir + 'file.svg';
        }
        let f = {
          name    : file.name,
          type    : file.type,
          icon,
          progress: 0,
          url     : null,
          error   : false,
          errorMsg: '',
          done    : false
        };
        if (uploadFile.isImage()) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = e => {
            f.preview = e.target.result;
          };
        }
        this.files.push(f);

        upload(file, this.uploadUrl, {
          driver  : this.uploadDriver,
          validate: this.getUploadValidator(),
          chunk   : this.chunk,
          success : data => {
            f.url = data.url.split('?', 2)[0];
            f.percent = 100;
            f.done = true;
            this.emitChangeFiles()
          },
          error   : error => {
            f.error = true;
            f.errorMsg = error.message;
          },
          progress: percent => f.progress = percent
        });
      }
    },
    emitChangeFiles(){
      this.$emit('input', this.resolveUploadFiles(this.files))
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
    bind() {
      this.uploadInput.addEventListener('change', this.doUpload);
    },
    unbind() {
      this.uploadInput.removeEventListener('change', this.doUpload);
    },
  },
  computed: {
    uploadInput() {
      if (this.fileEl === null) {
        this.fileEl = document.createElement('input');
        this.fileEl.type = 'file';
        this.fileEl.multiple = this.multifile;
        // document.body.appendChild(this.fileEl);
      }

      return this.fileEl;
    }
  },
  data() {
    return {
      fileEl        : null,
      multifile     : true,
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
