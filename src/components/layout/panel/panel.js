require('./panel.sass');

import {functions} from 'nerio-js-utils'

const {useAsFunction} = functions

const presetActions = {
  add    : {
    icon : 'add_box',
    click: 'add',
    temp: '创建%s'
  },
  edit    : {
    icon : 'edit',
    click: 'edit',
    temp: '编辑%s'
  },
  refresh: {
    icon : 'refresh',
    click: 'refresh',
    temp: '刷新'
  }
};

export default {
  name : 'app-panel',
  props: {
    actions: {
      type   : Array,
      default: () => []
    },
    title  : {
      type   : String,
      default: 'Panel'
    },
    name   : {
      type   : String
    },
    loading: Boolean
  },

  data() {
    return {
      presetActions
    };
  },
  mounted() {
    this.name = this.name || this.title;
  },
  render(h) {

    return h('v-layout', {
      class: 'app-panel',
      attrs: {
        wrap            : true,
        'justify-center': true
      }
    }, [this.renderAction(h), this.renderBody(h)]);
  },
  methods: {
    renderAction(h) {

      const title = h('v-subheader', {
        class: 'panel-title',
      }, this.title);

      const actions = this.actions.map(action => {
        if (typeof action === 'string') {
          action = this.findActionByName(action)
        }

        let icon;
        if (action.icon) {
          icon = h('v-icon', {}, action.icon);
        }
        let click = e => {
          if (action.click) {
            this.$emit(action.click, e);
            this.$emit('action', action.click, e)
          }
        };

        let disabled = useAsFunction(action.disabled)()
        let d = disabled ? false : this.$theme.dark
        return h('v-btn', {
          class: 'panel-action-item',
          props: {
            flat : true,
            color: action.color || this.$theme.color,
            dark: action.dark || d,
            disabled: disabled,
            small: true
          },
          on   : {
            click: click
          }
        }, [icon, action.text]);
      });

      const progress = h('v-flex', {
        attrs:{
          xs12: true
        }
      }, [h('v-progress-linear', {
        value: this.loading
      })])

      return h('v-flex', {
        class: 'panel-action',
        attrs: {
          xs12: true
        }
      }, [title, h('div', {
        class: 'panel-action-items'
      }, actions)]);
    },
    renderBody(h) {

      const b = h('div', {
        directives: [
          {
            name: 'scroll',
            value: e => {
              e => console.log(e, 1)
            },
            arg: '.panel-body-content'
          },
        ],
        class: 'panel-body-content'
      }, [this.$slots.default])

      return h('v-flex', {
        class: 'panel-body',
        attrs: {
          xs12: true
        }
      }, [b]);
    },
    findActionByName(name) {
      let found
      if (found = this.presetActions[name]) {
        found.text = sprintf(found.temp, this.name)
        return found
      }
    }
  }
};
