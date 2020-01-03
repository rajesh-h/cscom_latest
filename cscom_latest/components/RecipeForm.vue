<template>
  <v-row wrap>
    <v-col cols="12">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row wrap>
          <v-col xs="12" sm="12" md="8" lg="8" xl="8" px-3>
            <v-text-field
              v-model="recipeArray.title"
              :counter="150"
              :rules="textFieldRules"
              label="Title"
              required
            />
            <v-text-field
              :value="createSlug"
              :counter="150"
              :rules="textFieldRules"
              label="Slug"
              disabled
              placeholer="Auto Populate"
            />
            <v-textarea
              v-model="recipeArray.content"
              filled
              label="Please enter Main Description/Content"
              auto-grow
            ></v-textarea>
            <v-text-field
              v-model="recipeArray.youtubeUrl"
              :counter="150"
              :rules="textFieldRules"
              label="YouTube Url"
            />
            <v-row wrap>
              <v-col xs="6" sm="6" md="3" lg="3" xl="3" px-3>
                <v-text-field v-model="recipeArray.servings" label="Servings" />
              </v-col>
              <v-col xs="6" sm="6" md="3" lg="3" xl="3" px-3>
                <v-text-field
                  v-model="recipeArray.prepTime"
                  label="Prep Time"
                />
              </v-col>
              <v-col xs="6" sm="6" md="3" lg="3" xl="3" px-3>
                <v-text-field
                  v-model="recipeArray.cookTime"
                  label="Cook Time"
                />
              </v-col>
              <v-col xs="6" sm="6" md="3" lg="3" xl="3" px-3>
                <v-text-field
                  v-model="recipeArray.totalTime"
                  label="Total Time"
                />
              </v-col>
            </v-row>

            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Ingredients</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row
                    v-for="(ingredient, index) in recipeArray.ingredients"
                    :key="index"
                    wrap
                    justify-center
                  >
                    <v-col xs="5" sm="5" md="3" lg="3" xl="3" px-3>
                      <v-text-field
                        v-model="ingredient.measurement"
                        :label="'Measurement ' + (index + 1)"
                      />
                    </v-col>
                    <v-col xs="5" sm="5" md="6" lg="6" xl="6" px-3>
                      <v-text-field
                        v-model="ingredient.ingredient"
                        :label="'Ingredient ' + (index + 1)"
                      />
                    </v-col>

                    <v-btn
                      right
                      x-small
                      dark
                      color="red"
                      @click="removeIngredient(index)"
                    >
                      <v-icon dark>mdi-minus</v-icon>
                    </v-btn>
                  </v-row>
                  <v-btn
                    absolute
                    right
                    small
                    fab
                    dark
                    color="green"
                    @click="addExtraIngredient"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Steps Involved</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-row
                    v-for="(step, index) in recipeArray.steps"
                    :key="index"
                    wrap
                    justify-center
                  >
                    <v-col xs="12" sm="9" md="9" lg="9" xl="9" px-3>
                      <v-textarea
                        v-model="recipeArray.steps[index].text"
                        rows="3"
                        filled
                        :label="'Step ' + (index + 1)"
                        auto-grow
                      ></v-textarea>
                    </v-col>
                    <v-col
                      align-self="center"
                      xs="12"
                      sm="3"
                      md="3"
                      lg="3"
                      xl="3"
                      px-3
                      class="text-xs-center"
                    >
                      <ImageUpload
                        ref="stepImgUpload"
                        :image-url="recipeArray.steps[index].stepImageUrl"
                        @imageUploaded="
                          recipeArray.steps[index].stepImageUrl = $event
                        "
                      />
                      <v-btn
                        right
                        x-small
                        dark
                        color="red"
                        @click="removeStep(index)"
                      >
                        <v-icon dark>mdi-minus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn
                    absolute
                    right
                    small
                    fab
                    dark
                    color="green"
                    @click="addExtraStep"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <br />
            <v-textarea
              v-model="recipeArray.recipeNotes"
              filled
              label="Please Enter Recipe Notes"
              auto-grow
            ></v-textarea>
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="4" xl="4" px-3>
            <v-switch v-model="recipeArray.publish" label="Publish"></v-switch>
            <h3>Featured Image</h3>

            <ImageUpload
              ref="imgUpload"
              :image-url="recipeArray.featuredImage"
              @imageUploaded="recipeArray.featuredImage = $event"
            />

            <br />
            <v-expansion-panels focusable>
              <v-expansion-panel>
                <v-expansion-panel-header>Categories</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row v-if="showCategories" wrap class="smallCheckBoxes">
                    <v-col
                      v-for="item in categoriesList.categories"
                      :key="item"
                      xs="12"
                      sm="12"
                      md="4"
                      lg="4"
                      xl="4"
                      class="pa-0 ma-0"
                    >
                      <v-checkbox
                        v-model="recipeArray.categories"
                        class="smallCheckBoxes pa-0 ma-0"
                        style="font-size:10px;"
                        dense
                        :label="item"
                        :value="item"
                        color="green"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col xs="12" class="text-center">
            <v-btn :disabled="!valid" color="info" @click="validate">
              Validate
            </v-btn>

            <v-btn color="error" @click="reset">
              Reset Form
            </v-btn>

            <v-btn color="secondary" @click="resetValidation">
              Reset Validation
            </v-btn>
            <v-btn color="primary" @click="onSubmit">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import ImageUpload from '@/components/ImageUpload'
import { StoreDB } from '@/services/fireinit.js'

export default {
  name: 'RecipeForm',
  components: {
    ImageUpload
  },
  props: {},
  data: () => ({
    pageTitle: 'Recipes',
    valid: true,
    recipeArray: {
      title: '',
      slug: '',
      content: '',
      youtubeUrl: '',
      servings: '',
      prepTime: '',
      cookTime: '',
      totalTime: '',
      ingredients: [
        { measurement: '', ingredient: '' },
        { measurement: '', ingredient: '' }
      ],
      steps: [{ text: '', stepImageUrl: '' }, { text: '', stepImageUrl: '' }],
      recipeNotes: '',
      publish: false,
      featuredImage: '',
      categories: []
    },
    categoriesList: [],
    showCategories: false,
    textFieldRules: [
      (v) => !!v || 'Required',
      (v) => (v && v.length <= 150) || 'Must be less than 150 characters'
    ]
  }),
  computed: {
    createSlug() {
      if (this.recipeArray.title) {
        return this.recipeArray.title
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-')
      } else {
        return ''
      }
    }
  },
  async mounted() {
    // eslint-disable-next-line no-console
    await StoreDB.collection('categories')
      .doc('categories')
      .get()
      .then((res) => {
        // eslint-disable-next-line no-console
        this.categoriesList = res.data()
        this.showCategories = true
      })
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      // Reset Steps images
      this.recipeArray.steps.forEach((value, index) => {
        this.$refs.stepImgUpload[index].resetImageUpload()
      })

      this.$refs.imgUpload.resetImageUpload()
      this.recipeArray = {
        title: '',
        slug: '',
        content: '',
        servings: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        ingredients: [
          { measurement: '', ingredient: '' },
          { measurement: '', ingredient: '' }
        ],
        steps: [{ text: '', stepImageUrl: '' }, { text: '', stepImageUrl: '' }],
        recipeNotes: '',
        publish: false,
        featured_image: '',
        categories: []
      }
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    ...mapActions({
      addRecipe: 'recipes/addRecipe'
    }),
    onSubmit(e) {
      if (this.$refs.form.validate()) {
        e.preventDefault()
        this.addRecipe(this.recipeArray)
        // eslint-disable-next-line no-console
        console.log(this.recipeArray)
        // this.reset()
      }
    },
    addExtraStep() {
      this.recipeArray.steps.push({ text: '', stepImageUrl: '' })
    },
    removeStep(index) {
      this.recipeArray.steps.splice(index, 1)
    },
    addExtraIngredient() {
      this.recipeArray.ingredients.push({ measurement: '', ingredient: '' })
    },
    removeIngredient(index) {
      this.recipeArray.ingredients.splice(index, 1)
    }
  }
}
</script>

<style></style>
