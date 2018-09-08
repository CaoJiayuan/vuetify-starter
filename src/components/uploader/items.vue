<template>
<div class="upload-preview-wrap">
  <v-layout class="upload-item" :key="i" row wrap v-for="(file,i) in files">
    <v-flex xs3 class="preview">
      <img :src="file.preview" alt="">
    </v-flex>
    <v-flex xs9>
      <p class="upload-item-title pull-left">{{ file.name }}</p>
      <v-icon v-if="file.done" color="lime" class="uploaded-icon pull-right">checked</v-icon>

      <v-progress-linear v-if="!file.done"  height="4" :color="$theme.accent" background-color="grey" :value="file.progress"></v-progress-linear>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
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

  };
</script>
