<template>
  <v-select
    :items="items"
    v-model="selected"
    :item-text="itemText"
    :label="label"
    :item-value="itemValue"
    :autocomplete="autocomplete"
    :no-data-text="noDataText"
    @change="onChange"
    clearable
    :multiple="multiple"
  >
    <template v-slot:prepend-item v-if="multiple">
      <v-list-item
          ripple
          @mousedown.prevent
          @click="toggle"
      >
        <v-list-item-action>
          <v-icon :color="selected.length > 0 ? 'indigo darken-4' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            选择全部 <template v-if="selected.length > 0">（共选择{{selected.length}}个）</template>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:selection="{ item, index}">

      <span
          v-if="maxLength > 0 && index == maxLength"
          class="grey--text text-caption"
      >
        (以及另外{{ selected.length - maxLength }}个)
      </span>
      <v-chip v-if="!hitMax(index)" small>
        <span>{{ item[itemText] }}</span>
      </v-chip>
    </template>
  </v-select>
</template>

<script>
  const axios = window.axios
  export default {
    name      : 'data-selector',
    props     : {
      url         : {
        type   : String,
        default: null
      },
      value       : {
        type   : [String, Number, Array],
        default: null
      },
      autocomplete: {
        type   : Boolean,
        default: false
      },
      itemText    : {
        type   : String,
        default: () => 'name'
      },
      itemValue   : {
        type   : String,
        default: () => 'id'
      },
      label       : {
        type   : String,
        default: () => 'Label'
      },
      noDataText  : {
        type   : String,
        default: () => '无相关数据'
      },
      data: {
        type: Array,
        default : () => []
      },
      maxLength: [Number, String]
    },
    model     : {
      prop : 'value'
    },
    data() {
      return {
        items: [],
        multiple: false
      };
    },
    computed  : {
      selected: {
        get() {
          return this.value
        },
        set(item) {
          //this.$emit('change', item !== null ? item: null);
          this.$emit('input', item);
        }
      },
      selectedAll() {
        return this.selected.length === this.items.length
      },
      selectedSome() {
        return this.selected.length > 0 && !this.selectedAll
      },
      icon () {
        if (this.selectedAll) return 'mdi-close-box'
        if (this.selectedSome) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },
    methods   : {
      load() {
        if (this.data.length > 0) {
          this.items = this.data;
          return Promise.resolve(this.items)
        }
        return axios.get(this.url).then(response => {
          this.items = response.data;
          return this.items;
        });
      },
      toggle () {
        if (this.selectedAll) {
          this.selected = []
        } else {
          this.selected = this.items.map(item => item[this.itemValue])
        }
      },
      onChange(v){

      },
      hitMax(index) {
        if (this.maxLength > 0) {
          return index + 1 > this.maxLength
        }

        return false
      }
    },
    mounted() {
      this.multiple = Array.isArray(this.value)
      this.load().then(items => {

      });
    },
    created() {

    },
    watch     : {
      url() {
        this.load();
      }
    }
  };
</script>
