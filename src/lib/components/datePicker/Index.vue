<template>
  <v-menu
    :close-on-content-click="false"
    v-model="sta"
    :nudge-right="40"
    transition="scale-transition"
    offset-y

    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-on="on"
        slot="activator"
        v-model="date"
        readonly
        prepend-icon="mdi-calendar"
        clearable
        :label="label"
        :rules="rules"
      ></v-text-field>
    </template>
    <div class="date-picker-wrapper">
      <v-date-picker v-model="date" locale="zh-cn"></v-date-picker>
      <p>{{ date }}</p>
    </div>
  </v-menu>
</template>

<script>
import { getFormatter } from "./formatter";

export default {
  name: "date-picker",
  props: {
    status: { type: Boolean, default: false },
    value: {
      type: [String, Date, Number],
    },
    label: String,
    rules: Array,
    fmt: String,
  },
  data() {
    return {};
  },
  computed: {
    date: {
      get() {
        return this.formatter.decode(this.value);
      },
      set(item) {
        this.$emit("input", this.formatter.encode(item));
      },
    },
    sta: {
      get() {
        return this.status;
      },
      set(item) {
        this.$emit("change:status", item);
      },
    },
    formatter() {
      return getFormatter(this.fmt);
    },
  },
  watch: {
    date(n) {},
  },
};
</script>

<style lang="scss" scoped>
.date-picker-wrapper {
  background: white;
}
</style>
