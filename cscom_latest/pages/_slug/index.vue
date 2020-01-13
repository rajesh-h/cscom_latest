<template>
  <RecipeComponentSingle :recipe-array="recipeArray" />
</template>
<script>
// import { mapActions } from 'vuex'
import moment from 'moment'
import { StoreDB } from '@/services/fireinit.js'
import RecipeComponentSingle from '@/components/RecipeSingle'

export default {
  name: 'Recipe',
  components: {
    RecipeComponentSingle
  },
  data: () => ({
    recipeArray: {}
  }),
  created() {
    this.fetchSingleRecipe(this.$route.params.slug)
  },
  methods: {
    async fetchSingleRecipe(slug) {
      // Fetch Single Recipe by passing Id
      const requestedPost = []
      const response = StoreDB.collection('recipes')
      try {
        await response
          .where('slug', '==', slug)
          .limit(1)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const UpdatedFmt = moment(
                new Date(doc.data().updated.seconds * 1000)
              ).format('DD-MMM-YYYY hh:mm') // date object
              requestedPost.push({
                ...doc.data(),
                id: doc.id,
                updatedFmt: UpdatedFmt
              }) // Using spread operator to add ID of the document to array
              this.recipeArray = requestedPost[0]
            })
          })
        // eslint-disable-next-line no-console
        console.log(this.recipeArray)
        // eslint-disable-next-line no-console
        // console.log(newAddedRecipe.data())
        // eslint-disable-next-line no-console
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
    }
  }
}
</script>
