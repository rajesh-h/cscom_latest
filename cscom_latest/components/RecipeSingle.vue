<template>
  <v-row pa-4>
    <template v-if="!loading">
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <template v-if="recipeArray.featuredImage">
          <v-col cols="12" class="featured_image">
            <v-img
              class="f_image"
              :src="recipeArray.featuredImage"
              :lazy-src="require('~/assets/images/placeholder_image.png')"
            >
            </v-img>
            <div class="recipe_title px-2">
              <h2 class="white--text">
                {{ recipeArray.title }}
              </h2>

              <v-row wrap no-gutters px-2>
                <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                  <div class=" white--text">
                    <v-icon class="white--text" left>mdi-chef-hat</v-icon
                    >{{ recipeArray.author }}
                  </div>
                </v-col>
                <v-col cols="6" sm="6" md="2" lg="2" xl="2">
                  <div class=" white--text">
                    <v-icon class="white--text" left>mdi-account-group</v-icon
                    >{{ recipeArray.serves }}
                  </div>
                </v-col>
                <v-col cols="6" sm="6" md="2" lg="2" xl="2">
                  <div class=" white--text">
                    <v-icon class="white--text" left>mdi-clock</v-icon
                    >{{ recipeArray.cookTime }}
                  </div>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                  <div class=" white--text">
                    <v-icon class="white--text" left>mdi-calendar</v-icon
                    >{{ recipeArray.updatedFmt }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="12" class="main_title">
            <div class="recipe_title px-2">
              <h2 class="white--text">
                {{ recipeArray.title }}
              </h2>

              <v-row wrap no-gutters px-2>
                <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                  <p class=" white--text">
                    <v-icon class="white--text" left>mdi-chef-hat</v-icon
                    >{{ recipeArray.author }}
                  </p>
                </v-col>
                <v-col cols="6" sm="6" md="2" lg="2" xl="2">
                  <p class=" white--text">
                    <v-icon class="white--text" left>mdi-account-group</v-icon
                    >{{ recipeArray.serves }}
                  </p>
                </v-col>
                <v-col cols="6" sm="6" md="2" lg="2" xl="2">
                  <p class=" white--text">
                    <v-icon class="white--text" left>mdi-clock</v-icon
                    >{{ recipeArray.cookTime }}
                  </p>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                  <p class=" white--text">
                    <v-icon class="white--text" left>mdi-calendar</v-icon
                    >{{ recipeArray.updatedFmt }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </template>

        <v-col
          v-for="(intro, index) in recipeArray.recipeIntros"
          :key="index"
          cols="12"
          class="intro_text ma-2"
        >
          <div v-html="intro.text"></div>
          <v-img
            v-if="intro.imageUrl"
            class="intro_image"
            :src="intro.imageUrl"
            :lazy-src="require('~/assets/images/placeholder_image.png')"
          >
          </v-img>
        </v-col>
        <v-col v-if="recipeArray.youtubeUrl" cols="12" class="youtube_video">
          <LazyYoutubeVideo :src="recipeArray.youtubeUrl" />
        </v-col>
        <v-col cols="12" class="recipe_instructions light-green lighten-4">
          <v-row fill-height wrap align="center">
            <v-col cols="4" sm="4" md="3" lg="3" xl="3">
              <v-avatar height="90" width="160" tile>
                <v-img
                  :src="recipeArray.featuredImage"
                  :lazy-src="require('~/assets/images/placeholder_image.png')"
                >
                </v-img>
              </v-avatar>
            </v-col>
            <v-col class="mx-2">{{ recipeArray.title }}</v-col>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              right
              color="primary"
              @click="printRecipe"
            >
              <v-icon dark>mdi-download</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-simple-table style="background-color: transparent;">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Serves</th>
                      <th class="text-center">Prep Time</th>
                      <th class="text-center">Cook Time</th>
                      <th class="text-center">Total Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center overline">
                        {{ recipeArray.serves }}
                      </td>
                      <td class="text-center overline">
                        {{ recipeArray.prepTime }}
                      </td>
                      <td class="text-center overline">
                        {{ recipeArray.cookTime }}
                      </td>
                      <td class="text-center overline">
                        {{ recipeArray.totalTime }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table></v-col
            >
            <v-col cols="12">
              <h5>INGREDIENTS:</h5>
            </v-col>
            <v-col
              v-for="(recipeIngredient,
              ri_index) in recipeArray.recipeIngredients"
              :key="ri_index"
              cols="12"
            >
              <h4 v-if="recipeIngredient.group.name">
                {{ recipeIngredient.group.name }}
              </h4>

              <ul
                v-for="(ingredient, rgi_index) in recipeIngredient.group
                  .ingredients"
                :key="rgi_index"
                class=""
              >
                <li>
                  {{ ingredient.ingredient }} --- {{ ingredient.quantity }}
                </li>
              </ul>
            </v-col>
            <v-col cols="12">
              <h5>RECIPE INSTRUCTIONS:</h5>
            </v-col>
            <v-col
              v-for="(recipeStep, rs_index) in recipeArray.recipeSteps"
              :key="rs_index + 100"
              cols="12"
            >
              <h4 v-if="recipeStep.group.name">
                {{ recipeStep.group.name }}
              </h4>
              <ol>
                <li
                  v-for="(step, rgs_index) in recipeStep.group.steps"
                  :key="rgs_index"
                  class=""
                >
                  {{ step.text }}
                  <div v-if="step.stepImageUrl">
                    <v-img
                      :src="step.stepImageUrl"
                      :lazy-src="
                        require('~/assets/images/placeholder_image.png')
                      "
                    >
                    </v-img>
                  </div>
                </li>
              </ol>
            </v-col>
            <v-col cols="12">
              <h5>RECIPE NOTES:</h5>
            </v-col>
            <v-col cols="12">
              <div v-html="recipeArray.recipeNotes"></div>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="categories">
        <v-col cols="12">
          <h5>CATEGORIES</h5>
        </v-col>
        <v-col v-if="recipeArray.categories">{{
          recipeArray.categories.join(', ')
        }}</v-col>
      </v-col>
    </template>
    <template v-else>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row
              align="center"
              justify="center"
              class="grey lighten-5"
              style="height: 300px;"
            >
              <div id="spinner"></div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-row>
</template>
<script>
import LazyYoutubeVideo from 'vue-lazy-youtube-video'
import 'vue-lazy-youtube-video/dist/style.css'

export default {
  name: 'RecipeSingleComponent',
  components: {
    LazyYoutubeVideo
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    recipeArray: {
      type: Object,
      default() {
        return {
          id: '',
          title: '',
          slug: '',
          recipeIntros: [
            {
              text: '',
              imageUrl: ''
            }
          ],
          youtubeUrl: '',
          serves: '',
          prepTime: '',
          cookTime: '',
          totalTime: '',
          recipeIngredients: [
            {
              group: {
                name: '',
                ingredients: [
                  { ingredient: '', quantity: '' },
                  { ingredient: '', quantity: '' }
                ]
              }
            }
          ],
          recipeSteps: [
            {
              group: {
                name: '',
                steps: [
                  { text: '', stepImageUrl: '' },
                  { text: '', stepImageUrl: '' }
                ]
              }
            }
          ],
          recipeNotes: '',
          publish: false,
          featuredImage: '',
          categories: [],
          created: '',
          updated: '',
          author: '',
          updatedFmt: ''
        }
      }
    }
  },
  async mounted() {
    await this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  },
  methods: {
    printRecipe() {
      alert('Coming Soon')
    }
  }
}
</script>
<style lang="css">
.featured_image {
  position: relative;
}

.intro_image {
  position: relative;
}


.featured_image .f_image:hover {
  position: relative;
  animation: scaleMe 500ms ease-in-out 0s forwards;
}

@keyframes scaleMe {
   100% {
    transform: scale(1.02);
   }
}

.recipe_title{

   position: absolute;
   top: 50%;
   left: 12px;
   right: 12px;
   background-color: rgba(0, 0, 0, 0.5);


}
#spinner {
    position:relative;
    width: 90px;
    height: 90px;
    animation: sweep 1s infinite linear;
    border-radius: 90px;
    border-bottom: 5px solid #8bc34a;
}

@keyframes sweep {
    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>
