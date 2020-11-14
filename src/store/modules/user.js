import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: getName(),
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },

}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { ps } = userInfo
        return new Promise((resolve, reject) => {
            login({ ps: ps.trim() }).then(response => {
                const { data } = response
                console.log(data, '--------------data');
                commit('SET_TOKEN', data.uuid);
                commit('SET_NAME', data.uuid);
                setToken(data.uuid);
                setName(data.uuid);
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },


    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {

            removeToken() // must remove  token  first
            removeName()
            resetRouter()
            commit('RESET_STATE')
            resolve()

        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}