import {PluginFunction} from "vue";
import {UploadFile} from "nerio-js-utils/lib/uploader";

declare interface FileData {
  id: string | Number,
  filename?: string,
  type?: string,
  url?: string
}

declare interface AttachmentOptions {
  filters?: Object,
  single?: Boolean,
  accept?: string,
  validator?: (file: UploadFile) => Boolean
}

declare module 'vue/types/vue' {
  interface Vue {
    $attachment: (onSubmit: (files: FileData[]) => void, options ?: AttachmentOptions) => void
  }
}

declare class Attachment {
  static install : PluginFunction<never>
}

export default Attachment
