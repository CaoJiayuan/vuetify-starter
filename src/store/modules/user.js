import UserApi from '../../apis/user';
const state = {
  user: {}
};

const getters = {
  user: state => state.user
};

const actions = {
  loadUser({commit}) {
    return UserApi.getUser().then(user => {
      commit('setUser', {user})
      return user
    })
  }
};

const mutations = {
  setUser(state, {user}) {
    state.user = user;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
