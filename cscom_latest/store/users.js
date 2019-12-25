import { auth, GoogleProvider } from '@/services/fireinit.js'

export const state = () => ({
  user: null
})

export const getters = {
  activeUser: (state, getters) => {
    return state.user
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  autoSignIn({ commit }, payload) {
    commit('setUser', payload)
  },

  signInWithGoogle({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider)
      resolve()
    })
  },

  signOut({ commit }) {
    auth
      .signOut()
      .then(() => {
        commit('setUser', null)
        // eslint-disable-next-line no-console
        console.log('User logged out')
        alert('You are logged out')
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }
}
