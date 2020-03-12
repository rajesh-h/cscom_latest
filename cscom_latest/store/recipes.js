import moment from 'moment'
import { StoreDB } from '@/services/fireinit.js'

export const state = () => ({
  recipesList: [],
  dashBoardRecipes: [],
  categories: []
})

export const getters = {
  // allRecipes: state => state.recipes
}
export const actions = {
  async addRecipe({ commit, dispatch }, dataArray) {
    const response = StoreDB.collection('recipes')
    try {
      await response.add(dataArray).then((res) => {
        // eslint-disable-next-line no-console
        // console.log('Added document with ID: ', res.id)
        const newID = res.id // Id received from the added recipe
        dispatch('fetchSingleRecipe', { newID }) // Pass the newID as param for this action
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('There was a error adding data')
      // eslint-disable-next-line no-console
      console.log(e)

      alert(e)
      return
    }
    alert('New Recipe Added.')
  },
  async editRecipe({ commit, dispatch }, dataArray) {
    const response = StoreDB.collection('recipes').doc(dataArray.id)
    try {
      await response.set(dataArray, { merge: true }).then((res) => {
        // eslint-disable-next-line no-console
        // console.log('Added document with ID: ', res.id)
        const newID = res.id // Id received from the added recipe
        dispatch('fetchSingleRecipe', { newID }) // Pass the newID as param for this action
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('There was a error editing data')
      // eslint-disable-next-line no-console
      console.log(e)

      alert(e)
      return
    }
    alert('Recipe Edited.')
  },
  async fetchSingleRecipe({ commit }, { newID }) {
    // Fetch Single Recipe by passing Id
    const response = StoreDB.collection('recipes').doc(newID)
    try {
      const newAddedRecipe = await response.get()
      // eslint-disable-next-line no-console
      // console.log(newAddedRecipe.data())
      commit('addRecipe', { ...newAddedRecipe.data(), id: newID })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(
        'Error Fetching Data from firestore, As Precaution Error message is not printed here. Go Ahead and print error message on debug mode'
      )
      // eslint-disable-next-line no-console
      // console.log(e)
      // alert(e)
      alert('Error Fetching Data, please contact Webmaster')
    }
  },
  async fetchRecipes({ commit }) {
    const recipeArray = []
    const response = StoreDB.collection('recipes')
    try {
      await response
        .where('publish', '==', true)
        .orderBy('updated', 'desc')
        .limit(15)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const UpdatedFmt = moment(new Date(doc.data().updated)).format(
              'DD-MMM-YYYY hh:mm'
            ) // date object
            recipeArray.push({
              ...doc.data(),
              id: doc.id,
              updatedFmt: UpdatedFmt
            }) // Using spread operator to add ID of the document to array
          })
        })
      // eslint-disable-next-line no-console
      console.log(recipeArray)
      commit('setRecipes', recipeArray)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(
        'Error Fetching Data from firestore, As Precaution Error message is not printed here. Go Ahead and print error message on debug mode'
      )
      // eslint-disable-next-line no-console
      // console.log(e)
      // alert(e)
      alert('Error Fetching Data, please contact Webmaster')
    }
  },
  async fetchDashBoardRecipes({ commit }) {
    const recipeDashBoardArray = []
    const response = StoreDB.collection('recipes')
    try {
      await response
        .orderBy('created', 'desc')
        .limit(15)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const UpdatedFmt = moment(new Date(doc.data().updated)).format(
              'DD-MMM-YYYY hh:mm'
            ) // date object
            recipeDashBoardArray.push({
              ...doc.data(),
              id: doc.id,
              updatedFmt: UpdatedFmt
            }) // Using spread operator to add ID of the document to array
          })
        })
      // eslint-disable-next-line no-console
      console.log(recipeDashBoardArray)
      commit('setDashBoardRecipes', recipeDashBoardArray)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(
        'Error Fetching Data from firestore, As Precaution Error message is not printed here. Go Ahead and print error message on debug mode'
      )
      // eslint-disable-next-line no-console
      console.log(e)
      // alert(e)
      alert('Error Fetching Data, please contact Webmaster')
    }
  },
  async fetchCategories({ commit }) {
    const response = StoreDB.collection('categories').doc('categories')
    try {
      const categoriesArray = await response.get()
      // eslint-disable-next-line no-console
      console.log(categoriesArray)
      commit('setCategories', categoriesArray)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(
        'Error Fetching Data from firestore, As Precaution Error message is not printed here. Go Ahead and print error message on debug mode'
      )
      // console.log(e)
      // alert(e)
      alert('Error Fetching Data, please contact Webmaster')
    }
  }
}

export const mutations = {
  setRecipes: (state, recipesList) => (state.recipesList = recipesList),
  addRecipe: (state, recipe) => state.recipesList.unshift(recipe),
  setDashBoardRecipes: (state, dashBoardRecipes) =>
    (state.dashBoardRecipes = dashBoardRecipes),
  setCategories: (state, categories) => (state.categories = categories)
}
