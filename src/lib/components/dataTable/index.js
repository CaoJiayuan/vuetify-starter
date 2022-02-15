import pagination from '../../mixins/pagination';
import './datatable.scss'
import {functions} from "nerio-js-utils";
const {standby, useAsFunction} = functions
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
        }
    },
    mixins: [pagination],
    data() {
        return {
            options: {},
            currentPage: 1,
            expanded: [],
            tableFilters: {}
        }
    },
    computed: {
        multiple() {
            return Array.isArray(this.value)
        },
        validHeaders() {
            if (this.actions) {
                return [...this.headers, {
                    value: '_actions',
                    text: '操作',
                    align: this.actionsAlign,
                    render:(h, {item}) => {
                        let btns = this.actions.map(act => {
                            if (act.granted !== undefined) {
                                if (!useAsFunction(act.granted)(item)) {
                                    return undefined
                                }
                            }

                            let renderer = act.render || ((h, act) => {
                                let ps = Object.assign({
                                    color: act.color || 'primary'
                                }, act.props || {})
                                let icon
                                if (act.icon) {
                                    icon = h('v-icon', {}, [act.icon])
                                }

                                return h('v-btn', {
                                    props: ps,
                                    on: {
                                        click: e => this.$emit(act.action, item, this.refresh)
                                    }
                                }, [icon, act.text])
                            })

                            return renderer(h, act)
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
            return this.headers
        }
    },
    methods: {
        renderColumn(option, h, column) {
            let renderer = option.render || ((h, {value, index}) => {
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
                }, [h('span',{
                    attrs: {
                        class: 'app-data-table-title'
                    }
                }, [this.title])]))
            }
            if (this.searchable) {
                coms.push(h('v-col', {
                    props: {
                        md: 4,
                        sm: 12
                    }
                }, [h('v-text-field', {
                    props: {
                        appendIcon: 'mdi-magnify',
                        label: '搜索',
                        clearable: true,
                        value: this.keyword
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
            if (coms.length > 0) {
                return h('v-row', {
                    attrs: {
                        class: 'app-data-table-head justify-space-between'
                    }
                }, coms)
            }

            return undefined;
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
                        color: 'primary'
                    }
                }, ['筛选']);
                let clear = h('v-btn', {
                    on: {
                        click: () => {
                            this.tableFilters = {}
                            this.refresh()
                        }
                    }
                }, ['重置'])
                let actions = h('v-col', {
                    props: {
                        sm: 12,
                    },
                    attrs: {
                        class:   'app-data-table-actions'
                    }
                }, [clear, filter])
                return h('v-row', {
                    class:   'app-data-table-filters'
                }, [this.$scopedSlots.filters(this.tableFilters), actions])
            }
            return undefined
        }
    },
    render(h) {
        let columns = {}
        for (let i =0; i < this.validHeaders.length; i++) {
            let header = this.validHeaders[i]
            columns[`item.${header.value}`] = ({item, index, value}) => {
                let idx = index + 1 + (this.currentPage - 1) * this.pageSize
                return this.renderColumn(header, h, {
                    item,
                    value,
                    key: header.value,
                    index: idx
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
                    let v = this.multiple ? value : value[0]
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
        this.autoload && this.load({})
    }
}