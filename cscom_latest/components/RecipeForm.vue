<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row wrap>
      <v-col xs="12" sm="12" md="8" lg="8" xl="8" px-3>
        <v-text-field
          v-model="recipeArray.title"
          :counter="150"
          :rules="titleRules"
          label="Title"
          required
        />
        <v-text-field
          v-model="slug"
          :counter="150"
          :rules="titleRules"
          label="Slug"
          disabled
          placeholer="Auto Populate"
        />
        <v-text-field
          v-model="recipeArray.content"
          :rules="titleRules"
          label="Content"
          placeholer="Enter Post Content"
        />
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="4" xl="4" px-3>
        <v-switch v-model="recipeArray.publish" label="Publish"></v-switch>

        <v-text-field
          v-model="recipeArray.featured_image"
          :rules="titleRules"
          label="Featured Image"
          required
        />

        <v-select
          v-model="recipeArray.categories"
          :items="categoriesData.categories"
          label="Categories"
          multiple
        ></v-select>
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
</template>

<script>
export default {
  name: 'RecipeForm',
  props: {
    categoriesData: {
      type: Object,
      default() {
        return []
      }
    }
  },

  data: () => ({
    recipeArray: {
      title: '',
      publish: false,
      content: '',
      email: '',
      categories: ['Uncategorized'],
      ingredients: [],
      featured_image: '',
      slug: ''
    },
    valid: true,

    titleRules: [
      (v) => !!v || 'Title is required',
      (v) => (v && v.length <= 150) || 'Title must be less than 150 characters'
    ],

    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
    dataArray: {},

    // categories :

    ingredientList: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    showCategories: true
  }),
  computed: {
    slug: {
      get() {
        // `this` points to the vm instance
        if (this.recipeArray.title) {
          return this.recipeArray.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-')
        } else {
          return ''
        }
      },
      set(value) {
        this.recipeArray.slug = value
      }
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.slug = ''
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    onSubmit(e) {
      // eslint-disable-next-line no-console
      // console.log('Pressed Submit')
      if (this.$refs.form.validate()) {
        // eslint-disable-next-line no-console
        // console.log(this.title)
        // eslint-disable-next-line no-console
        console.log(this.recipeArray)
        e.preventDefault()
        this.$emit('submit', this.recipeArray)
        this.reset()
      }
    }
  }
}
</script>

<style></style>
