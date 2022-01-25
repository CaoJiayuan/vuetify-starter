<template>
  <v-menu
    :close-on-content-click="false"
    v-model="sta"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
          v-on="on"
          slot="activator"
          v-model="date"
          readonly
          clearable
      ></v-text-field>
    </template>

    <v-date-picker  v-model="date" locale="zh-cn"></v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name    : "date-picker",
    props   : {
      status: {type: Boolean, default: false},
      value : {
        type: [String, Date]
      }
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
      },
      sta: {
        get() {
          return this.status
        },
        set(item) {
          this.$emit('change:status', item);
        }
      }
    },
    watch: {
      date(n) {
      }
    }
  }
</script>

<style scoped>

</style>
