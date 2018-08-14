import HomeApi from '../../apis/home'
const state = {
  nav: {
    items: [],
    mini: false
  }
}
const getters = {
  nav: state => state.nav
}


const actions = {
  loadNavigation({commit}){
    return HomeApi.getNavigation().then(items => commit('changeNavigation', {
      items
    }))
  }
};

const mutations = {
  changeNavigation(state, {items = []}) {
    state.nav.items = items;
  },
  miniNavigation(state, {mini = true}) {
    state.nav.mini = mini
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
