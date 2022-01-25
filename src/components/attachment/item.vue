<template>
  <card class="attachment-item" :class="itemClass" row wrap @click="select">
    <v-layout wrap>
      <v-flex xs3 class="preview">
        <div class="preview-img" :style="{backgroundImage: `url(${file.preview})`}"></div>
        <div v-if="file.error" class="preview-error">
          <v-icon color="red">mdi-alert-circle</v-icon>
        </div>
      </v-flex>
      <v-flex xs9 text-xs-left>
        <div style="height: 50%">
          <p class="attachment-item-title pull-left">{{ file.name | strLimit(32) }}</p>
          <v-icon v-if="isSelected" color="lime" class="uploaded-icon pull-right">mdi-check</v-icon>
        </div>
        <small style="color: gray;">{{ file.time }}</small>
        <v-progress-linear class="upload-progress" v-if="!file.done && !file.error" height="4" :color="$theme.accent"
                           background-color="grey" :value="file.progress"></v-progress-linear>
        <small style="color: red; display: block;clear: both;" v-if="file.error">{{ file.errorMsg }}</small>
      </v-flex>
    </v-layout>
  </card>
</template>
<script>
  import {functions} from 'nerio-js-utils';

  const {strLimit} = functions;
  export default {
    props   : {
      file      : {
        type: Object,
      },
      selectable: Boolean,
      selected  : Boolean
    },
    data() {
      return {
        isSelected: false
      };
    },
    mounted() {
      this.isSelected = this.selected;
    },
    methods : {
      select() {
        if (!this.file.done) {
          return
        }
        this.isSelected = !this.isSelected
        this.selectable && this.$emit('select', this.file, this.isSelected)
      }
    },
    computed: {
      itemClass(){
        let str = ''
        if (this.selected) {
          str = 'is-selected'
        }

        return this.selectable ? str + ' selectable' : str
      }
    },
    watch:{
      selected(now) {
        this.isSelected = now
      }
    },
    filters : {
      strLimit
    }
  };
</script>

<style lang="sass">
  .attachment-item
    padding: 10px 5px
    &.selectable
      cursor: pointer
    &.is-selected
      background-color: #eeeeee
    .preview-img
      width: 80px
      height: 80px
      background-size: contain
      background-position: center
    .preview-error
      text-align: center
</style>
