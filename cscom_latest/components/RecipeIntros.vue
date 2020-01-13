<template>
  <v-row>
    <v-row
      v-for="(intro, index) in recipeIntros"
      :key="index"
      wrap
      justify-center
      class="light-green lighten-4 ma-4"
    >
      <v-col cols="12" sm="12" md="12" lg="12" xl="12" px-3>
        <Editor v-model="intro.text" />
      </v-col>
      <v-row justify="space-between">
        <v-col align-self="center" cols="4" px-3 class="text-xs-left">
          <ImageUpload
            ref="introImgUpload"
            :image-url="intro.imageUrl"
            @imageUploaded="intro.imageUrl = $event"
          />
        </v-col>
        <v-col align-self="center" cols="4" px-3 class="text-xs-right">
          <v-btn text icon x-small color="red" @click="removeIntro(index)">
            <v-icon dark>mdi-minus-box</v-icon>REMOVE ABOVE INTRO
          </v-btn>
        </v-col>
      </v-row>
    </v-row>

    <v-btn absolute right bottom small fab dark color="green" @click="addIntro">
      <v-icon dark>mdi-plus</v-icon>ADD
    </v-btn>
  </v-row>
</template>

<script>
import Editor from '@/components/Editor'
import ImageUpload from '@/components/ImageUpload'

export default {
  name: 'RecipeIntros',
  components: {
    Editor,
    ImageUpload
  },
  props: {
    recipeIntros: {
      type: Array,
      default() {
        return [
          {
            text: '',
            imageUrl: ''
          }
        ]
      }
    }
  },
  data: () => ({}),
  methods: {
    addIntro() {
      this.recipeIntros.push({
        text: '',
        imageUrl: ''
      })
    },
    removeIntro(index) {
      this.recipeIntros.splice(index, 1)
    },
    resetImageUploadOnIntros() {
      this.recipeIntros.forEach((intro, index) => {
        this.$refs.introImgUpload[index].resetImageUpload()
      })
    }
  }
}
</script>
