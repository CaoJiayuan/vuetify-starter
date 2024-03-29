import pagination from '../../mixins/pagination';
import './datatable.scss'
import { functions } from "nerio-js-utils";
const { standby, useAsFunction } = functions
const _ = window._
export default {
  name: 'data-table',
  props: {
    headers: Array,
    autoload: {
      type: Boolean,
      default: () => true
    },
    selectable: Boolean,
    value: {
      type: [Array, Object],
      default: () => []
    },
    actions: Array,
    expandedClass: String,
    title: String,
    searchable: Boolean,
    actionsAlign: {
      type: String,
      default: () => 'right'
    },
    showTools: {
      type: Boolean,
      default: () => true
    },
    initFilters :{
      type: Object,
      default: () => ({})
    }
  },
  mixins: [pagination],
  data() {
    return {
      options: {},
      currentPage: 1,
      expanded: [],
      tableFilters: {},
      originValue: null
    }
  },
  computed: {
    multiple() {
      return Array.isArray(this.value)
    },
    validHeaders() {
      let headers = this.headers.filter(header => {
        let show = header.show
        if (show === undefined) {
          show = () => true
        }

        return useAsFunction(show)()
      })

      if (this.actions) {
        return [...headers, {
          value: '_actions',
          text: '操作',
          align: this.actionsAlign,
          sortable: false,
          render: (h, value) => {
            let btns = this.actions.map(action => {
              if (action.granted !== undefined) {
                if (!useAsFunction(action.granted)(value)) {
                  return undefined
                }
              }

              let renderer = action.render || ((h, act, { item }) => {
                let ps = Object.assign({
                  color: act.color || 'primary'
                }, act.props || {})
                let icon
                if (act.icon) {
                  icon = h('v-icon', {}, [act.icon])
                }
                if (action.disabled !== undefined) {
                  ps.disabled = useAsFunction(action.disabled)(value)
                }

                return h('v-btn', {
                  props: ps,
                  on: {
                    click: e => this.$emit(act.action, item, this.refresh)
                  }
                }, [icon, act.text])
              })

              return renderer(h, action, value)
            }).filter(v => v !== undefined)
            if (btns.length === 0) {
              btns = [h('span', {
                style: {
                  color: 'gray'
                }
              }, '无操作权限')]
            }

            return h('div', {
              class: 'app-data-table-actions'
            }, btns)
          }
        }]
      }
      return headers
    }
  },
  methods: {
    renderColumn(option, h, column) {
      let renderer = option.render || ((h, { value, index }) => {
        return value
      })

      return renderer(h, column)
    },
    renderHead(h) {
      let coms = []
      if (this.title) {
        coms.push(h('v-col', {
          props: {
            md: 8,
            sm: 12
          }
        }, [h('span', {
          attrs: {
            class: 'app-data-table-title'
          }
        }, [this.title])]))
      }
      if (this.searchable) {
        coms.push(h('v-col', {
          props: {
            md: 4,
            sm: 12,
            dense: true
          }
        }, [h('v-text-field', {
          props: {
            appendIcon: 'mdi-magnify',
            label: '搜索',
            clearable: true,
            value: this.keyword,
            dense: true
          },
          on: {
            'keyup.enter': e => {
              console.log(e)
            },
            input: v => {
              standby(() => {
                this.search(v)
              }, 300)
            }
          }
        })]))
      }
      this.renderTools(coms, h)

      if (coms.length > 0) {
        return h('v-row', {
          attrs: {
            class: 'app-data-table-head justify-space-between'
          }
        }, coms)
      }

      return undefined;
    },
    renderTools(coms, h) {
      if (this.$scopedSlots.tools) {
        let len = coms.length

        coms.push(h('v-col', {
          props: {
            md: len > 0 ? 8 : 12,
            sm: 12
          },
          class: 'd-flex justify-end'
        }, [this.$scopedSlots.tools({ selected: this.value })]))
      }
      return undefined
    },
    renderFilters(h) {
      if (this.$scopedSlots.filters) {
        let filter = h('v-btn', {
          on: {
            click: () => {
              this.filter(this.tableFilters)
            }
          },
          props: {
            color: 'primary',
            small: true
          }
        }, ['筛选']);
        let clear = h('v-btn', {
          on: {
            click: () => {
              this.resetFilters()
              this.filter(this.tableFilters)
            }
          },
          props: {
            small: true
          }
        }, ['重置'])
        let actions = h('v-col', {
          props: {
            sm: 12,
          },
          attrs: {
            class: 'app-data-table-actions'
          }
        }, [clear, filter])
        return h('v-row', {
          class: 'app-data-table-filters',
          props: {
            dense: true
          }
        }, [this.$scopedSlots.filters(this.tableFilters), actions])
      }
      return undefined
    },
    resetFilters() {
      this.tableFilters = Object.assign({}, this.initFilters)
    }
  },
  render(h) {
    let columns = {}
    let emit = (ev, ...args) => {
      this.$emit(ev, ...args)
    }

    for (let i = 0; i < this.validHeaders.length; i++) {
      let header = this.validHeaders[i]
      columns[`item.${header.value}`] = ({ item, index, value }) => {
        let idx = index + 1 + (this.currentPage - 1) * this.pageSize
        return this.renderColumn(header, h, {
          item: _.clone(item),
          value,
          key: header.value,
          index: idx,
          emit
        })
      }
    }
    let expanded = this.$scopedSlots.expanded
    if (expanded) {
      columns['expanded-item'] = data => {
        return h('td', {
          attrs: {
            colspan: data.headers.length,
            class: this.expandedClass
          },
        }, [expanded(data)])
      }
    }

    let table = h('v-data-table', {
      props: {
        headers: this.validHeaders,
        serverItemsLength: this.paginator.total,
        items: this.paginator.data,
        loading: this.loading,
        showExpand: expanded !== undefined,
        singleExpand: true,
        singleSelect: !this.multiple,
        showSelect: this.selectable,
        value: this.multiple ? this.value : [this.value],
        footerProps: {
          itemsPerPageOptions: [5, 10, 15, 20, 30, 50]
        }
      },
      scopedSlots: {
        ...columns,
      },
      on: {
        'update:options': options => {
          this.options = options
        },
        'update:page': page => {
          this.currentPage = page
          this.page(page)
        },
        'update:sort-by': sortBy => {
          if (sortBy.length > 0) {
            this.pagination.sortBy = sortBy[0]
          } else {
            this.pagination.sortBy = null
          }
          this.load({})
        },
        'update:sort-desc': sortDesc => {
          if (sortDesc.length > 0) {
            this.pagination.descending = sortDesc[0]
          }
          this.load({})
        },
        'update:items-per-page': perPage => {
          this.pageSize = perPage
          this.load({})
        },
        input: value => {
          let v
          if (this.multiple) {
            v = value
          } else {
            if (value.length > 0) {
              v = value[0]
            } else {
              v = this.originValue
            }
          }
          this.$emit('input', v)
        }
      },
    })
    const refresh = h('v-btn', {
      props: {
        text: true,
        small: true
      },
      class: 'app-data-table-refresh',
      on: {
        click: this.refresh
      }
    }, [h('v-icon', {
      class: this.loading ? '_rotating' : ''
    }, 'mdi-sync'), '刷新'])


    return h('div', {
      attrs: {
        class: 'app-data-table'
      }
    }, [this.renderFilters(h), this.renderHead(h), table, refresh])
  },
  mounted() {
    this.resetFilters()
    this.autoload && this.filter(this.tableFilters)
    this.originValue = this.value
  },
  watch: {
    apiUrl(now) {
      now && this.refresh()
    },
    initFilters(filters) {
      this.resetFilters()
      this.filter(this.tableFilters)
    }
  }
}
