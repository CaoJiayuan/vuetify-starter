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
  >
  </v-select>
</template>

<script>
  export default {
    name      : 'data-selector',
    props     : {
      url         : {
        type   : String,
        default: null
      },
      value       : {
        type   : String | Number,
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
      }
    },
    model     : {
      prop : 'value',
      event: 'change'
    },
    data() {
      return {
        items: [],
      };
    },
    computed  : {
      selected: {
        get() {
          return this.value
        },
        set(item) {
          this.$emit('change', item !== null ? item: null);
          this.$emit('input', item);
        }
      }
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
      onChange(v){

      }
    },
    mounted() {
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
