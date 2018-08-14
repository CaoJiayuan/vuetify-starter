import Overlayable from 'vuetify/es5/mixins/overlayable';
import Stackable from 'vuetify/es5/mixins/stackable';
import Dependent from 'vuetify/es5/mixins/dependent';

require('./confirm.sass');
export default {
  name   : 'confirm',
  mixins : [Overlayable, Stackable, Dependent],
  data() {
    return {
      isActive: false,
      attempt : false
    };
  },
  methods: {
    show() {
      this.genOverlay();
      this.bind()
    },
    dismiss() {
      this.isActive = false;
      this.unbind();
      if (typeof this.destroy === 'function') {
        this.destroy();
      }
    },
    bind(){
      if (this.overlay){
        this.overlay.addEventListener('mousedown', this.onOverlayClickDown);
        this.overlay.addEventListener('mouseup', this.onOverlayClickUp);
      }
    },
    unbind(){
      if (this.overlay){
        this.overlay.removeEventListener('mousedown', this.onOverlayClickDown);
        this.overlay.removeEventListener('mouseup', this.onOverlayClickUp);
      }
    },
    onOverlayClickDown(){
      this.attempt = true
    },
    onOverlayClickUp(){
      this.attempt = false
    },
    clickOutside(){
      this.persistent || this.dismiss()
    }
  },
  mounted() {
    this.isActive = true;
    document.addEventListener('click', this.clickOutside)
  },
  beforeDestroy(){
    document.removeEventListener('click', this.clickOutside)
  },
  render(h) {
    let children = [];

    let content = h('v-card-text', {}, this.content);
    let title = h('div', {}, [h('div', {
      class: 'header'
    }, this.title)]);

    let actions = h('v-card-actions', {}, [
      h('v-spacer'),
      h('v-btn', {
        props   : {flat: true},
        class   : 'round-2',
        nativeOn: {
          click: this.dismiss
        }
      }, '取消'),
      h('v-btn', {
        props   : {flat: true, color: 'red'},
        class   : 'round-2',
        nativeOn: {
          click: () => {
            this.$emit('dismiss');
            if (typeof this.resolver === 'function') {
              this.resolver(this.dismiss);
            }
          }
        }
      }, '确定'),
    ]);

    children.push(h('v-card', {
      class: 'confirm-content',
      style: {
      }
    }, [title, content, actions]));

    let confirm = h('div', {
      style     : {
        zIndex         : this.activeZIndex + 10,
        backgroundColor: this.backgroundColor ? this.backgroundColor : '#fff',
      },
      directives: [
        {name: 'show', value: this.isActive},
        {
          name: 'click-outside',
          value: () => {
            console.log('OUT')
          },
          args: {
            include: this.getOpenDependentElements
          }
        }
      ],
      class     : 'confirm',
      ref       : 'content',
      on : {
        click : e => e.stopPropagation()
      }
    }, children);

    return h('transition', {
      props: {
        name: 'confirm-trans',
      }
    }, [confirm]);
  },
  watch  : {
    isActive(active) {
      if (active) {
        this.show();
      } else {
        this.removeOverlay();
      }
    }
  }
};
