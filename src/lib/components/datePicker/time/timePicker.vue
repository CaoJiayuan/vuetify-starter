<template>
  <v-menu
    ref="timeMenu"
    :close-on-content-click="false"
    v-model="menu2"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template #activator="{on}">
      <v-text-field
          v-on="on"
          v-model="time"
          prepend-icon="mdi-clock-outline"
          readonly
          clearable
          :label="label"
      ></v-text-field>
    </template>

    <v-time-picker v-model="time" format="24hr" @change="$refs.timeMenu.save(time)"></v-time-picker>
  </v-menu>
</template>

<script>
  export default {
    name    : "time-picker",
    props   : {
      status: {type: Boolean, default: false},
      value : [Date, String],
      label: String
    },
    data() {
      return {
        menu2 : false,
      }
    },
    computed: {
      time: {
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
