const state = () => ({
    temporaryValues: {
        'name-input': "",
        "cpf-input": "",
        "number-input": "",
        "city-input": "",
        "state-input": "",
    }
})

const getters = {
    GetTemporaryValues: (state: any) => state.temporaryValues
}

type TemporaryType = {
    name: String,
    value: Number | String
}

const actions = {
    SetTemporaryValues({ commit, state }: any, payload: TemporaryType) {
        commit('SET_TEMPORATY_VALUES', [payload.name, payload.value])
    }
}

const mutations = {
    SET_TEMPORATY_VALUES: (state: any, payload: any) => state.temporaryValues[payload[0]] = payload[1],
}

export default {
    namespaced: true,
    state, actions, getters, mutations
}