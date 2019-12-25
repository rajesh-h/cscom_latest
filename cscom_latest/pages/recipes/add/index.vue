<template>
  <v-row wrap>
    <v-col cols="12">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row wrap>
          <v-col xs="12" sm="12" md="8" lg="8" xl="8" px-3>
            <v-text-field
              v-model="title"
              :counter="150"
              :rules="titleRules"
              label="Title"
              required
            />
            <v-text-field
              :value="createSlug"
              :counter="150"
              :rules="titleRules"
              label="Slug"
              disabled
              placeholer="Auto Populate"
            />
            <v-textarea
              v-model="content"
              filled
              label="Please enter Main Description/Content"
              auto-grow
            ></v-textarea>
            <v-row wrap>
              <v-col xs="6" sm="6" md="3" lg="3" xl="3" px-3>
                <v-text-field v-model="servings" label="Servings" />
              </v-col>
              <v-col xs="6" sm="6" md="3" lg="3" xl="3" px-3>
                <v-text-field v-model="prepTime" label="Prep Time" />
              </v-col>
              <v-col xs="6" sm="6" md="3" lg="3" xl="3" px-3>
                <v-text-field v-model="cookTime" label="Cook Time" />
              </v-col>
              <v-col xs="6" sm="6" md="3" lg="3" xl="3" px-3>
                <v-text-field v-model="totalTime" label="Total Time" />
              </v-col>
            </v-row>
            <h3>Steps Involved</h3>
            <v-row
              v-for="(step, index) in steps"
              :key="step.name"
              wrap
              justify-center
            >
              <v-col xs="12" sm="9" md="9" lg="9" xl="9" px-3>
                <v-textarea
                  v-model="steps[index].text"
                  rows="3"
                  filled
                  :label="steps[index].name"
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
                  :image-url="steps[index].stepImageUrl"
                  @imageUploaded="steps[index].stepImageUrl = $event"
                />
              </v-col>
            </v-row>

            <!-- <no-ssr placeholder="Loading Your Editor...">
              <vue-editor
                id="editor"
                v-model="content"
                placeholder="Write Something..."
                use-custom-image-handler
                @imageRemoved="handleImageRemoved"
                @imageAdded="handleImageAdded"
              >
              </vue-editor>
            </no-ssr> -->
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="4" xl="4" px-3>
            <v-switch v-model="publish" label="Publish"></v-switch>
            <h3>Featured Image</h3>

            <ImageUpload
              :image-url="featuredImageUrl"
              @imageUploaded="featuredImageUrl = $event"
            />

            <!-- <v-select
              v-model="categories"
              class="mt-5"
              :items="categoriesData.categories"
              label="Categories"
              multiple
            ></v-select> -->
            <h3>Categories</h3>

            <v-row wrap class="smallCheckBoxes">
              <v-col
                v-for="item in categoriesData.categories"
                :key="item"
                xs="12"
                sm="12"
                md="4"
                lg="4"
                xl="4"
                class="pa-0 ma-0"
              >
                <v-checkbox
                  v-model="categories"
                  class="smallCheckBoxes pa-0 ma-0"
                  style="font-size:10px;"
                  dense
                  :label="item"
                  :value="item"
                  color="green"
                ></v-checkbox>
              </v-col>
            </v-row>
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
// import { firestorage } from '@/services/fireinit.js'

const getCategories = () =>
  import('~/data/categories.json').then((m) => m.default || m)

export default {
  name: 'AddEditRecipe',
  pageTitle: 'ADD RECIPE',
  components: {
    ImageUpload
  },

  data: () => ({
    pageTitle: 'Recipes',
    valid: true,
    title: '',
    slug: '',
    image: '',
    publish: false,
    content: '',
    titleRules: [
      (v) => !!v || 'Title is required',
      (v) => (v && v.length <= 150) || 'Title must be less than 150 characters'
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
    dataArray: {},
    categories: [],
    // categories :
    ingredients: [],
    featured_image: '',
    ingredientList: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    showCategories: true,
    // uploadEndFeaturedImage: false,
    featuredImageUrl: '',
    featuredImageUrl2: '',
    servings: '',
    prepTime: '',
    cookTime: '',
    totalTime: '',
    step1: '',
    step1ImageUrl: '',
    steps: [
      { name: 'Step 1', text: 'This is Step 1', stepImageUrl: '' },
      { name: 'Step 2', text: '', stepImageUrl: '' },
      { name: 'Step 3', text: '', stepImageUrl: '' }
    ]
  }),
  computed: {
    createSlug() {
      // `this` points to the vm instance
      if (this.title) {
        return this.title
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-')
      } else {
        return ''
      }
    }
  },

  async asyncData({ req }) {
    const categoriesData = await getCategories()
    // eslint-disable-next-line no-console
    // console.log(categoriesData)

    return { categoriesData }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.slug = ''
      this.featuredImageUrl = ''
      this.featuredImageUrl2 = ''
      this.content = ''
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
        // eslint-disable-next-line no-console
        // console.log(this.title)
        this.dataArray = {
          title: this.title,
          slug: this.createSlug,
          publish: this.publish,
          created: new Date(),
          updated: new Date(),
          categories: this.categories,
          ingredients: this.ingredients,
          featured_image: this.featuredImageUrl,
          featured_image2: this.featuredImageUrl2,
          content: this.content,
          steps: this.steps
        }
        e.preventDefault()
        // this.addRecipe(this.dataArray)
        // eslint-disable-next-line no-console
        console.log(this.dataArray)
        this.reset()
      }
    }
  }
}
</script>

<style scoped></style>
