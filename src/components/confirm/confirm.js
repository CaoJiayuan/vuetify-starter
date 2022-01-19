import Overlayable from 'vuetify/es5/mixins/overlayable';
import Stackable from 'vuetify/es5/mixins/stackable';
import Dependent from 'vuetify/es5/mixins/dependent';
import {VCard, VCardText, VCardActions, VSpacer, VBtn, VOverlay} from 'vuetify/lib'
// import VOverlay from "vuetify/src/components/VOverlay/index";

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
      this.createOverlay();
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
    },
    createOverlay () {
      const overlay = document.createElement('div')
      overlay.className = 'app-overlay'
      overlay.id = this.id + '-overlay'
      const container = document.getElementById(this.id)
      container.insertBefore(overlay, container.firstChild)

      this.overlay = overlay
    },
    removeOverlay(){
      if (!this.overlay) return
      const container = document.getElementById(this.id)

      container.removeChild(this.overlay)
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

    let content = h(VCardText, {}, this.content);
    let title = h('div', {}, [h('div', {
      class: 'header'
    }, this.title)]);

    let actions = h(VCardActions, {}, [
      h(VSpacer),
      h(VBtn, {
        props   : {text: true},
        class   : 'round-2',
        nativeOn: {
          click: this.dismiss
        }
      }, '取消'),
      h(VBtn, {
        props   : {text: true, color: 'red'},
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

    children.push(h(VCard, {
      class: 'confirm-content',
      style: {
      }
    }, [title, content, actions]));

    let confirm = h('div', {
      style     : {
        zIndex         : this.activeZIndex + 10000,
        backgroundColor: this.backgroundColor ? this.backgroundColor : '#fff',
      },
      directives: [
        {name: 'show', value: this.isActive},
        // {
        //   name: 'click-outside',
        //   value: () => {
        //     console.log('OUT')
        //   },
        //   args: {
        //     include: this.getOpenDependentElements
        //   }
        // }
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
