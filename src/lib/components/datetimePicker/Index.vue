<template>
  <div class="dtp-wrapper">
    <div class="dtp-label">{{ lebel }}</div>
    <div>
      <v-icon>mdi-calendar-clock</v-icon>
      <datetime
        :disabled="disabled"
        :phrases="{ ok: '确定', cancel: '取消' }"
        :placeholder="placeholder"
        type="datetime"
        v-model="dt"
        format="yyyy-MM-dd HH:mm:ss"
      ></datetime>
    </div>
  </div>
</template>
<script>
import "vue-datetime/dist/vue-datetime.css";
import { Datetime } from "vue-datetime";
import { getFormatter } from "./formatter";
export default {
  components: { Datetime },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    fmt: String,
    placeholder: {
      type: String,
      default: "点击选择时间",
    },
    lebel: String,
    disabled: Boolean,
  },
  computed: {
    dt: {
      get() {
        return this.formatter.decode(this.value);
      },
      set(v) {
        this.$emit("input", this.formatter.encode(v));
      },
    },
    formatter() {
      return getFormatter(this.fmt);
    },
  },
};
</script>
<style lang="scss" scoped>
.dtp-wrapper {
  height: 64px;
  margin-top: 4px;
  padding-top: 12px;
  .dtp-label {
    padding: 0 0 0 28px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
  }
  i {
    margin-right: 4px;
  }
}
</style>
<style lang="scss">
.vdatetime {
  display: inline-block;
  input {
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    &[disabled="disabled"] {
      cursor: not-allowed;
    }
  }
}
</style>
