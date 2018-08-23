const state = {
  theme: {
    color: 'primary',
    dark: true,
    accent: 'primary--text'
  },
  themes: [
    {
      color: 'primary',
      dark: true,
      accent: 'primary--text'
    },
    {
      color: 'green',
      dark: true,
      accent: 'green--text'
    },
    {
      color: 'pink',
      dark: true,
      accent: 'pink--text'
    },
    {
      color: 'smoke',
      dark: false,
      accent: 'primary--text'
    },
  ]
};

const getters = {
  theme: state => state.theme,
  themes: state => state.themes
};

const actions = {
  setTheme({commit}, theme) {
    commit('changeTheme', theme)
  }
};

const mutations = {
  changeTheme(state, theme) {
    state.theme = theme
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
