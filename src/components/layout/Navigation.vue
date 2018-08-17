<template>
  <v-navigation-drawer width="256" fixed v-model="open" app :clipped="$vuetify.breakpoint.mdAndUp">
    <v-list dense>
      <template v-for="item in items">
        <v-list-group no-action v-if="hasNode(item) && item.granted !== false" :group="item.name">
          <v-list-tile  slot="activator" ripple>
            <v-list-tile-action>
              <v-icon middle>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.display_name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="node.path" ripple v-model="active === item.path" v-for="node in item.nodes"
                       :key="node.name" @click="navigate(node)" v-if="node.granted !== false">
            <v-list-tile-content>
              <v-list-tile-title>{{ node.display_name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon middle>{{ node.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-tile :to="item.path" v-if="item.granted !== false && !hasNode(item)" v-model="active === item.path"
                     ripple :key="item.name"
                     @click="navigate(item)">
          <v-list-tile-action>
            <v-icon middle>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.display_name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  const mapGetters = Vuex.mapGetters;
  const mapActions = Vuex.mapActions;

  export default {
    name: 'navigation',
    data() {
      return {
        active: false
      };
    },
    computed  : {
      items() {
        return this.nav.items;
      },
      open: {
        get() {
          return !this.nav.mini;
        },
        set(open) {
          this.$store.commit('miniNavigation', {mini: !open});
        }
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
.navigation-drawer
  .list__tile__action
    min-width: 32px
</style>
