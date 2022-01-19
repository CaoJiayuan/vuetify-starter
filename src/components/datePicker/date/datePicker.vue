<template>
  <v-menu
    :close-on-content-click="false"
    v-model="status"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="date"
      readonly
      clearable
    ></v-text-field>
    <v-date-picker  v-model="date" @input="status = false" locale="zh-cn"></v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name    : "date-picker",
    props   : {
      status: {type: Boolean, default: false},
      value : Date
    },
    data() {
      return {}
    },
    computed: {
      date: {
        get() {
          return this.value
        },
        set(item) {
          this.$emit('input', item);
        }
      }
    }
  }
</script>

<style scoped>

</style>
