<template>
  <div class="file-upload-wrapper">
    <div
      class="uploader-preview rounded-lg"
      :style="{ width: this.boxSize, height: this.boxSize }"
    >
      <v-icon
        class="clickable file-upload-icon"
        @click="triggerUpload"
        v-if="!file.uploading"
        >mdi-plus</v-icon
      >
      <v-img
        contain
        :max-height="boxSize"
        :max-width="boxSize"
        v-if="item.preview"
        :src="item.preview"
        @click="previewItem(item)"
      />
      <div @click="removeFile" class="file-upload-delete" v-if="item.preview">
        <v-icon>mdi-delete</v-icon>
      </div>
      <div class="file-upload-progress" v-if="file.uploading">
        <span>{{ item.progress }}%</span>
      </div>
    </div>
    <div :style="{ width: this.boxSize }" class="uploader-label-wrapper">
      <span v-if="label" class="uploader-label">{{ label }}</span>
    </div>
  </div>
</template>

<script>
import uploadable from "../../mixins/uploadable";

const sizes = {
  xs: "32px",
  sm: "64px",
  md: "86px",
  lg: "168px",
};
const MimeTypes = {
  flv: "video/x-flv",
  mp4: "video/mp4",
  mov: "video/quicktime",
  avi: "video/x-msvideo",
  wmv: "video/x-ms-wmv",
};
export default {
  name: "file-uploader",
  mixins: [uploadable],
  props: {
    size: {
      type: String,
      default: "md",
    },
    label: String,
    value: String,
    multifile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    boxSize() {
      return sizes[this.size] || this.size;
    },
    item() {
      if (this.file.valid && this.value) {
        return this.file;
      }
      return this.parseValue();
    },
  },
  methods: {
    onUploaded(file) {
      this.$emit("input", file.url);
      this.$emit("uploaded", file);
    },
    emitChangeFiles() {},
    parseValue() {
      if (this.value) {
        let partials = this.value.split(".");
        let ext = partials[partials.length - 1];
        let type = "file";
        if (this.imageExts.indexOf(ext) >= 0) {
          type = "image/" + ext;
        }

        if (["mp4", "mov", "flv"].indexOf(ext) >= 0) {
          type = MimeTypes[ext];
        }
        return (this.file = {
          type: type,
          name: "",
          url: this.value,
          preview: this.isImageFile(this.value)
            ? this.value
            : this.getIconByExtention(ext),
          done: true,
          valid: true,
        });
      }

      return (this.file = {
        progress: 0,
        url: null,
        error: false,
        errorMsg: "",
        done: false,
        uploading: false,
        valid: false,
      });
    },
    removeFile() {
      this.file.preview = null;
      this.file.progress = 0;
      this.file.done = false;
      this.file.uploading = false;
      this.file.error = false;
      this.file.errorMsg = "";
      this.$emit("input", null);
      this.clearFiles();
    },
    previewItem(item ) {
      if (item.preview) {
        this.$preview(item.preview);
      }
    }
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.file-upload-wrapper {
  margin: 6px 0;

  .uploader-preview {
    border: 1px dashed #d9d9d9;
    position: relative;
    overflow: hidden;
    &:hover .file-upload-delete {
      display: block;
    }

    .file-upload-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
    }
    .file-upload-delete {
      height: 20px;
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      background: rgba(0, 0, 0, 0.25);
      line-height: 20px;
      cursor: pointer;
      display: none;
      .v-icon {
        font-size: 16px;
      }
    }
    .file-upload-progress {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .v-progress-circular {
    }
  }
  .uploader-label-wrapper {
    text-align: center;
    padding: 4px 0 0;
    .uploader-label {
      color: rgba(0, 0, 0, 0.56);
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
