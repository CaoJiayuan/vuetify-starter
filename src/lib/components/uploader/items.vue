<template>
  <card>
    <div class="upload-preview-wrap">
      <v-layout class="upload-item" :key="i" row wrap v-for="(file,i) in files">
        <v-flex xs3 class="preview">
          <img :src="file.preview" alt="">
          <div v-if="file.error" class="upload-error-icon">
            <v-icon color="red">error</v-icon>
          </div>
        </v-flex>
        <v-flex xs9>
          <div style="height: 40px">
            <p class="upload-item-title pull-left">{{ file.filename | strLimit(32) }}</p>
            <v-btn @click="delImage(i)" small icon class=" pull-right upload-remove">
              <v-icon color="red">close</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </card>
</template>

<script>
  import {functions} from 'nerio-js-utils'

  const {strLimit} = functions
  export default {
    data() {
      return {};
    },
    props     : {
      value: Array
    },
    computed  : {
      files: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    },
    components: {},
    methods   : {
      delImage(i) {
        this.files.splice(i, 1)
      }
    },
    mounted() {

    },
    created() {

    },
    filters   : {
      strLimit
    }
  };
</script>
<style lang="sass">
  .upload-preview-wrap
    width: 100%
    padding: 10px 0
    max-height: 512px
    overflow-y: scroll
    overflow-x: hidden
    .upload-item
      padding: 0 5px
      height: 86px

      &:hover
        background-color: #E2E2E2

        .upload-remove
          display: block

        .uploaded-icon
          display: none

      .upload-remove
        display: none
        width: 32px
        height: 32px
        text-align: center
        margin: 0 6px
        padding: 0

      .upload-progress
        margin: 2px 0

      .preview
        text-align: center
        position: relative
        height: 100%
        .upload-error-icon
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)

        img
          width: 100%

      .upload-item-title
        font-weight: bold
        padding: 5px 0 0

      .uploaded-icon
        width: 32px
        text-align: center

</style>
