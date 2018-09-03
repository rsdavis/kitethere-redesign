import axios from 'axios'

export const state = () => ({
  collection: Object.create(null),
  id: null,
  fetchPromise: null
})

export const getters = {
  selection (state) {
    if (state.id === null) return null
    return state.collection[state.id]
  },

  collection (state) { return Object.values(state.collection) }
}

export const mutations = {
  setId (state, id) { state.id = id },
  setCollection (state, data) {
    state.collection = Object.create(null)
    data.forEach(item => {
      state.collection[item.spotID] = item
    })
  },
  setPromise (state, promise) { state.fetchPromise = promise }
}

export const actions = {

  // select an item from the collection
  select (context, id) { context.commit('setId', id) },

  // clear the selection
  clear (context) { context.commit('setId', null) },

  fetch (context, url) {
    if (context.state.fetchPromise) return context.state.fetchPromise

    var fetchPromise = new Promise((resolve, reject) => {
      axios({
        'url': url,
        'method': 'get'
      }).then(response => {
        context.commit('setCollection', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })

    context.commit('setPromise', fetchPromise)

    return context.state.fetchPromise
  },

  async reload (context) {
    context.state.fetchPromise = null
    await context.dispatch('fetch')
  }

}
