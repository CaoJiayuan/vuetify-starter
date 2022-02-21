import pagination from '../../mixins/pagination';

export default {
  name  : 'app-list',
  mixins: [pagination],
  props: {
    queries: {
      type: Object,
      default: {}
    },
    autoload: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    loadList() {
      this.apiUrl && this.load({
        filters: this.queries
      });
    }
  },
  mounted(){
    this.loadList()
  },
  render(h) {
    let items
    if (this.$scopedSlots.item) {
      items = h('v-layout', {
        attrs: {
          row: true,
          wrap: true
        }
      }, this.paginator.data.map(item => this.$scopedSlots.item(item)))
    }
    if (this.paginator.total < 1) {
      items = h('h3',{}, '没有相关数据')
    }

    const page = () => {
      return this.paginator.last_page < 2 ?
        undefined :
        h('v-pagination', {
          props: {
            length      : this.paginator.last_page,
            totalVisible: 5,
            value: this.pagination.page,
            circle: true,
          },
          on: {
            input: this.page
          },
        });
    };

    return h('v-container', {
      class: 'app-listview',
      attrs: {
        "justify-center": true,
        "grid-list-md" : true
      }
    }, [
      items,
      page()
    ]);
  }
};
