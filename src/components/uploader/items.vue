<template>
<div class="upload-preview-wrap">
  <v-layout class="upload-item" :key="i" row wrap v-for="(file,i) in files">
    <v-flex xs3 class="preview">
      <img :src="file.preview" alt="">
      <div v-if="file.error" class="upload-error-icon"><v-icon color="red">error</v-icon></div>
    </v-flex>
    <v-flex xs9>
      <div style="height: 40px">
        <p class="upload-item-title pull-left">{{ file.name | strLimit(32) }}</p>
        <v-icon v-if="file.done" color="lime" class="uploaded-icon pull-right">checked</v-icon>
        <v-btn @click="$emit('remove', i, file)" small icon class=" pull-right upload-remove">
          <v-icon color="red">close</v-icon>
        </v-btn>
      </div>


      <v-progress-linear class="upload-progress" v-if="!file.done && !file.error"  height="4" :color="$theme.accent" background-color="grey" :value="file.progress"></v-progress-linear>
      <small style="color: red; display: block;clear: both;" v-if="file.error">{{ file.errorMsg }}</small>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
  import {functions} from 'nerio-js-utils'

  const {strLimit} = functions
  export default {
    data() {
      return {};
    },
    props:{
      files:{
        type: Array
      }
    },
    components: {},
    methods   : {},
    mounted() {

    },
    created() {

    },
    filters:{
      strLimit
    }
  };
</script>
