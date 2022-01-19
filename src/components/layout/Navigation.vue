<template>
  <v-navigation-drawer width="256" fixed v-model="open" app :clipped="$vuetify.breakpoint.mdAndUp">
    <v-list dense>
      <template v-for="(item, index) in items">
        <v-list-group :key="index" no-action v-if="hasNode(item) && item.granted !== false" :group="item.name">
          <v-list-item :activeClass="accent + '--text'" slot="activator" ripple>
            <v-list-item-action>
              <v-icon middle>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.display_name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :activeClass="accent + '--text'" :to="node.path" ripple v-for="node in item.nodes"
                       :key="node.name" @click="navigate(node)">
            <v-list-item-content>
              <v-list-item-title>{{ node.display_name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon middle>{{ node.icon }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
        <v-list-item :activeClass="accent + '--text'" :to="item.path" v-if="item.granted !== false && !hasNode(item)"
                     ripple :key="item.name"
                     @click="navigate(item)">
          <v-list-item-action>
            <v-icon middle>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.display_name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: 'navigation',
    data() {
      return {
        active: false
      };
    },
    computed  : {
      items() {
        return this.nav.items.filter(i => i.granted !== false).map(item => {
          let nodes = item.nodes || []
          item.nodes = nodes.filter(i => i.granted !== false)
          return item
        });
      },
      open: {
        get() {
          return !this.nav.mini;
        },
        set(open) {
          this.$store.commit('miniNavigation', {mini: !open});
        }
      },
      accent(){
        return this.$theme.accent
      },
      ...mapGetters({
        nav  : 'nav',
        user : 'user'
      })
    },
    components: {},
    methods   : {
      navigate(item) {
        this.active = item.path;
        this.switchNav(item);
      },
      hasNode(item) {
        let node = this.getNode(item);
        let hasOne = false;
        node.forEach(n => {
          if (n.granted !== false) {
            hasOne = true;
          }
        });

        return node.length > 0 && hasOne;
      },
      getNode(item) {
        return item.nodes ? item.nodes : [];
      },
      ...mapActions({
        switchNav: 'switchNav'
      })
    },
    mounted() {
      this.$store.dispatch('loadNavigation').then(items => this.switchNav(items[0]));
      this.$store.dispatch('loadUser');
    },
    created() {

    },
    watch:{
      $route(now){
        this.active = now.path
      }
    }
  };
</script>
<style lang="sass">
.v-navigation-drawer
  .v-list__tile__action
    min-width: 32px
</style>
