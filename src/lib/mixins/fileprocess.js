import moment from "moment";
export default {
  methods: {
    processFile(v) {
      let partials =  v.name ? v.name.split('.') : v.filename.split('.');

      let ext = partials[partials.length - 1];

      let filename = v.name || v.filename
      return {
        id : v.id,
        type : v.type,
        filename: filename,
        name: filename,
        url: v.url,
        preview: v.type.indexOf('image') >= 0 ? v.url : this.getIconByExtention(ext),
        done: true,
        time: v.created_at || moment().format('YYYY-MM-DD HH:mm:ss')
      }
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
  data(){

    return {
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
      fileIconsDir  : '/images/filetypes/'
    }
  }
}
