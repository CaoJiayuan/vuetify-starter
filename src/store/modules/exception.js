const state = {
    data: {},
    triggered: false
};

const getters = {
    data: state => state.data,
    triggered: state => state.triggered
};

const actions = {
    trigger({commit}, data) {
        commit('setData', data)
        commit('setTrigger', true)
    },
    unTrigger({commit}) {
        // commit('setData', {})
        commit('setTrigger', false)
    }
};

const mutations = {
    setData(state, current) {
        state.data = current
    },
    setTrigger(state, triggered) {
        state.triggered = triggered
    }
};


export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}
