<template>
  <v-row wrap>
    <v-col cols="12">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row wrap>
          <v-col xs="12" sm="12" md="8" lg="8" xl="8" px-3>
            <v-text-field
              v-model="requestedPostData.title"
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

            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Ingredients</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row
                    v-for="(ingredient, index) in ingredients"
                    :key="index"
                    wrap
                    justify-center
                  >
                    <v-col xs="12" sm="9" md="9" lg="9" xl="9" px-3>
                      <v-text-field
                        v-model="ingredients[index]"
                        :counter="200"
                        :label="'Ingredient ' + (index + 1)"
                        required
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
                    v-for="(step, index) in steps"
                    :key="index"
                    wrap
                    justify-center
                  >
                    <v-col xs="12" sm="9" md="9" lg="9" xl="9" px-3>
                      <v-textarea
                        v-model="steps[index].text"
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
                        :image-url="steps[index].stepImageUrl"
                        @imageUploaded="steps[index].stepImageUrl = $event"
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
              v-model="recipeNotes"
              filled
              label="Please Enter Recipe Notes"
              auto-grow
            ></v-textarea>

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
              ref="imgUpload"
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
            <br />
            <v-expansion-panels focusable>
              <v-expansion-panel>
                <v-expansion-panel-header>Categories</v-expansion-panel-header>
                <v-expansion-panel-content>
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
import moment from 'moment'
import { StoreDB } from '@/services/fireinit.js'

export default {
  name: 'EditRecipe',
  pageTitle: 'Edit Recipe',
  data: () => ({
    requestedPostData: {}
  }),
  created() {
    this.fetchSingleRecipeForEdit(this.$route.params.slug)
  },
  methods: {
    async fetchSingleRecipeForEdit(slug) {
      // Fetch Single Recipe by passing Id
      const requestedPost = []
      const response = StoreDB.collection('recipes')
      try {
        await response
          .where('slug', '==', slug)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const UpdatedFmt = moment(
                new Date(doc.data().updated.seconds * 1000)
              ).format('DD-MMM-YYYY hh:mm') // date object
              requestedPost.push({
                ...doc.data(),
                id: doc.id,
                updated_fmt: UpdatedFmt
              }) // Using spread operator to add ID of the document to array
              this.requestedPostData = requestedPost[0]
            })
          })
        // eslint-disable-next-line no-console
        console.log(requestedPost[0].id)
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

<style></style>
