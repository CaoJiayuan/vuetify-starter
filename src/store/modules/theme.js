const state = {
  theme: {
    color: 'primary',
    dark: true,
  },
  themes: [
    {
      color: 'primary',
      dark: true,
    },
    {
      color: 'green',
      dark: true,
    },
    {
      color: 'pink',
      dark: true,
    },
    {
      color: 'smoke',
      dark: false,
      accent: 'primary'
    },
    {
      color: 'purple',
      dark: true,
    },
    {
      color: 'cyan',
      dark: true,
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
