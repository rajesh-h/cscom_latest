<template>
  <v-row wrap>
    <v-col cols="12" sm="12" md="9" lg="9" xl="9">
      <div class="primary--text text-center py-2">LATEST RECIPES</div>
      <v-carousel
        cycle
        progress
        hide-delimiter-background
        show-arrows-on-hover
        height="auto"
      >
        <v-carousel-item
          v-for="(recipe, i) in latestRecipes.slice(0, 5)"
          :key="i"
          transition="fade-transition"
        >
          <v-img
            :src="recipe.featuredImage"
            :lazy-src="require('~/assets/images/placeholder_image.png')"
          >
          </v-img>
          <div class="slidertitle subtitle-1 text-center">
            <nuxt-link :to="recipe.slug">{{ recipe.title }}</nuxt-link>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3" xl="3">
      <div class="primary--text text-center py-2">CHECK OUT</div>
      <v-img
        :src="require('~/assets/images/placeholder_image.png')"
        :lazy-src="require('~/assets/images/placeholder_image.png')"
      >
      </v-img>
      <v-img
        :src="require('~/assets/images/placeholder_image.png')"
        :lazy-src="require('~/assets/images/placeholder_image.png')"
      >
      </v-img>
      <v-img
        :src="require('~/assets/images/placeholder_image.png')"
        :lazy-src="require('~/assets/images/placeholder_image.png')"
      >
      </v-img>
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
      <v-row wrap>
        <v-col cols="12" sm="12" md="3" lg="3" xl="3">
          <v-img
            :src="require('~/assets/images/placeholder_image.png')"
            :lazy-src="require('~/assets/images/placeholder_image.png')"
          >
          </v-img>
        </v-col>
        <v-col
          v-for="(recipe, i) in latestRecipes.slice(6, 13)"
          :key="i"
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <v-card class="mx-auto">
            <v-img
              v-if="recipe.featuredImage"
              class="white--text align-end"
              height="auto"
              :src="recipe.featuredImage"
              :lazy-src="require('~/assets/images/placeholder_image.png')"
            >
              <v-card-title class="caption slidertitle" style="bottom:0">{{
                recipe.title
              }}</v-card-title>
            </v-img>
            <v-img
              v-else
              class="white--text align-end"
              height="auto"
              :src="require('~/assets/images/placeholder_image.png')"
              :lazy-src="require('~/assets/images/placeholder_image.png')"
            >
              <v-card-title class="caption slidertitle" style="bottom:0">{{
                recipe.title
              }}</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  pageTitle: 'Home',
  components: {},
  data: () => ({}),
  computed: {
    ...mapState({
      latestRecipes: (state) => state.recipes.recipesList
    })
  },
  created() {
    this.fetchLatestRecipes()
  },
  methods: {
    ...mapActions({
      fetchLatestRecipes: 'recipes/fetchRecipes'
    })
  }
}
</script>
<style scoped>
.slidertitle {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 100%;
}
</style>
