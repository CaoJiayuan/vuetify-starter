<template>
  <v-form ref="form">
    <slot></slot>
    <slot name="action">
      <div class="mt-4">
        <v-btn :loading="posting" :disabled="posting" color="primary" class="mr-4" @click="submit">{{ submitText }}</v-btn>
        <v-btn @click="reset" :disabled="posting" v-if="clearable">{{ clearText }}</v-btn>
      </div>
    </slot>
  </v-form>
</template>

<script>
const axios = window.axios
export default {
  name: "DataForm",
  props: {
    value: Object,
    url: {
      type: String,
      required: true
    },
    id: [Number, String],
    restfull: {
      type: Boolean,
      default: () => true
    },
    successMessage: {
      type: String,
      default: () => '保存成功'
    },
    submitText: {
      type: String,
      default: () => '提交'
    },
    clearText: {
      type: String,
      default: () => '清除'
    },
    clearable: {
      type: Boolean,
      default: () => false
    },
    resolver: {
      type: Function,
      default: data => data
    }
  },
  data() {
    return {
      posting: false
    }
  },
  methods: {
    submit() {
      let valid = this.$refs.form.validate()
      this.posting = true


      return new Promise((resolve, reject) => {
        if (valid) {
          let method = 'POST', url = this.url
          if (this.id && this.restfull) {
            method = 'PUT'
            url = `${this.url}/${this.id}`
          }

          axios.request({
            method,
            url,
            data: this.resolver(Object.assign({}, this.value))
          }).then(res => {
            this.posting = false
            if (this.successMessage) {
              this.$toast(this.successMessage)
            }
            this.$emit('submitted', this.value, res)
            return resolve(res)
          }).catch(err => {
            this.posting = false
            return reject(err)
          })
        } else {
          this.posting = false
          this.$emit('validate-error')
          //reject('validation error')
        }
      })
    },
    reset() {
      this.posting = false
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    posting(now) {
      this.$emit('posting', now)
    }
  }
}
</script>

<style scoped>

</style>
