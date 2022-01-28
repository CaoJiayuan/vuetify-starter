<template>
  <v-dialog v-model="dialog" max-width="fit-content">
    <v-layout align-center justify-center row fill-height>
      <img :src="url" alt="" style="max-height: 80vh;max-width: 80vw">
<!--      <v-img :src="url" max-height="500" max-width="500" aspect-ratio="1.7"></v-img>-->
    </v-layout>
  </v-dialog>
</template>

<script>
  export default {
    name    : "ImageDialog",
    props   : {
      value: Boolean,
      url  : String,
    },
    data() {
      return {}
    },
    computed: {
      dialog: {
        get() {
          return this.value
        },
        set(v) {
          this.$emit('input', v)
        }
      }
    },
  }
</script>

<style scoped>

</style>
