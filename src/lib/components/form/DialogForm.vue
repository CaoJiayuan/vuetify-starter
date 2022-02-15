<template>
  <v-dialog v-model="visible" v-bind="$attrs" persistent>
    <template #activator="props">
      <slot name="activator" v-bind:props="props"></slot>
    </template>
    <v-card>
      <v-toolbar dark color="primary" flat dense>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            dark
            @click="visible = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <data-form @posting="postingData" @submitted="submitted" v-model="formData" ref="form" :url="url">
        <v-container>
          <slot></slot>
        </v-container>
        <v-card-actions slot="action">
          <div class="mt-4">
            <v-btn color="primary" :loading="posting" :disabled="posting" class="mr-4" @click="submit()">提交</v-btn>
            <v-btn @click="cancel">取消</v-btn>
          </div>
        </v-card-actions>
      </data-form>
    </v-card>
  </v-dialog>
</template>

<script>
import DataForm from "./Index";

export default {
  name: "DialogForm",
  components: {DataForm},
  props: {
    dialog: Boolean,
    title: String,
    url: {
      type: String,
      required: true
    },
    value: Object,
    dismiss: Boolean,
    successMessage: {
      type: String,
      default: () => '保存成功'
    }
  },
  data() {
    return {
      posting: false
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialog
      },
      set(v) {
        this.$emit('update:dialog', v)
      }
    },
    formData: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    cancel() {
      //this.$refs.form.reset()
      this.visible = false
    },
    submit() {
      this.$refs.form.submit()
    },
    submitted(data, res) {
      this.$emit('submitted', data,res)
      this.cancel()
    },
    postingData(d) {
      this.posting = d
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>