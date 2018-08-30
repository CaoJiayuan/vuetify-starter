import {uploader} from 'nerio-js-utils'

const {upload} = uploader

export default {
  props: {
    uploadUrl: {
      type: String,
      default: '/upload'
    }
  },
  methods: {
    triggerUpload(){
      this.uploadInput.click()
    },
    doUpload(e) {
      for(let i = 0; i < e.target.files.length; i ++) {
        let file = e.target.files[i]
        console.log(file)

        let f = {
          name: file.name,
          type: file.type
        }


        upload(file, this.uploadUrl, {

        })
      }
    },
    bind() {
      this.uploadInput.addEventListener('change', this.doUpload);
    },
    unbind() {
      this.uploadInput.removeEventListener('change', this.doUpload);
    },
  },
  computed:{
    uploadInput(){
      if (this.fileEl === null) {
        this.fileEl = document.createElement('input')
        this.fileEl.type = 'file'
        this.fileEl.multiple = this.multifile
        document.body.appendChild(this.fileEl)
      }

      return this.fileEl
    }
  },
  data(){
    return {
      fileEl : null,
      multifile: true,
      files: []
    }
  },
  mounted() {
    this.bind();
  },
  beforeDestroy() {
    this.unbind();
  }
}
