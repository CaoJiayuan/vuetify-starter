import { functions } from "nerio-js-utils";
const { standby, useAsFunction } = functions
const _ = window._
const axios = window.axios
import './datalist.scss'

export default {
  name: 'data-list',
  props: {
    headers: Array,
    actions: Array,
    dataKey: String,
    apiUrl: String,
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      items: []
    }
  },
  computed: {
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
  render(h) {
    const headers = this.validHeaders
    const head = this.renderHead(h, headers)

    const body = this.renderBody(h, headers)

    return h('v-simple-table', {
      class: 'app-data-list'
    }, [head, body])
  },
  methods: {
    renderHead(h, headers) {
      let th = headers.map(header => {
        return h('th', {
          class: `text-${header.align || 'left'}`
        }, [header.text])
      })

      return h('thead', {}, [h('tr', {}, th)])
    },
    renderBody(h, headers) {
      let emit = (ev, ...args) => {
          this.$emit(ev, ...args)
      }
      let items = []
      for (let index =0; index < this.items.length; index++) {
        let item = this.items[index]
        let td = headers.map(header => {
          let value = item[header.value]
          let idx = index + 1
          let cell = this.renderCell(header, h, {
              item: _.clone(item),
              value,
              key: header.value,
              index: idx,
              emit
          })

          return h('td', {}, [cell])
        })

        items.push(h('tr', {}, td))
      }

      return h('tbody', {}, items)
    },
    renderCell(option, h, column) {
      let renderer = option.render || ((h, { value, index }) => {
        return value
      })

      return renderer(h, column)
    },
    load() {
      if (this.apiUrl) {
        axios.get(this.apiUrl, {
          params: this.params
        }).then(({ data }) => {
          if (this.dataKey) {
            this.items = data[this.dataKey]
          } else {
            this.items = data
          }
        })
      }
    },
    refresh(){
      this.load()
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    apiUrl(now) {
      now && this.load()
    },
    params(now) {
      now && this.load()
    }
  }
}
