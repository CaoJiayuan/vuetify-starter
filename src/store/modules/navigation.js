import HomeApi from '../../apis/home'
const state = {
  nav: {
    items: [],
    mini: false,
    current: {}
  }
}
const getters = {
  nav: state => state.nav
}


const actions = {
  loadNavigation({commit}){
    return HomeApi.getNavigation().then(items => {
      commit('changeNavigation', {
        items
      })

      return items
    })
  },
  switchNav({commit}, current){
    return commit('changeCurrentNav', current)
  }
};

const mutations = {
  changeNavigation(state, {items = []}) {
    state.nav.items = items;
  },
  miniNavigation(state, {mini = true}) {
    state.nav.mini = mini
  },
  changeCurrentNav(state, current) {
    state.nav.current = current
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
