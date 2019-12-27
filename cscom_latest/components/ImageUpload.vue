<template>
  <div>
    <v-btn v-if="!uploadEnd && !uploading" my-4 @click.native="selectFile">
      Upload Image
      <v-icon right aria-hidden="true">
        mdi-add_a_photo
      </v-icon>
    </v-btn>

    <input
      id="files"
      ref="uploadInput"
      type="file"
      name="file"
      accept="image/*"
      style="display: none"
      :multiple="false"
      @change="detectFiles($event)"
    />

    <v-progress-circular
      v-if="uploading && !uploadEnd"
      :size="100"
      :width="15"
      :rotate="360"
      :value="progressUpload"
      color="primary"
    >
      {{ progressUpload }}%
    </v-progress-circular>
    <img v-if="uploadEnd" :src="imageUrl" width="50%" />
    <div v-if="uploadEnd" mb-4>
      <v-btn class="ma-0" dark small color="error" @click="deleteImage()">
        Delete
      </v-btn>
    </div>
  </div>
</template>
<script>
import { firestorage } from '@/services/fireinit.js'

export default {
  name: 'ImageUpload',
  props: {
    // uploadEnd: {
    //   type: Boolean,
    //   default: false
    // },
    imageUrl: {
      type: String,
      default: ''
    }
    // uploading: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data: () => ({
    progressUpload: 0,
    fileName: '',
    uploadTask: '',
    uploading: false,
    uploadEnd: false,
    imageUrlAfterUpload: '',
    uploadEndAfterUpload: false
  }),

  watch: {
    uploadTask() {
      this.uploadTask.on(
        'state_changed',
        (sp) => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          )
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.uploadEnd = true
            this.imageUrlAfterUpload = downloadURL
            this.$emit('imageUploaded', this.imageUrlAfterUpload)
          })
        }
      )
    }
  },
  methods: {
    selectFile() {
      this.$refs.uploadInput.click()
    },
    detectFiles(e) {
      const fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.upload(fileList[x])
      })
    },
    upload(file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firestorage.ref('content/' + file.name).put(file)
    },
    deleteImage() {
      firestorage
        .ref('content/' + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.imageUrlAfterUpload = ''
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(`file delete error occured: ${error}`)
        })
      // this.$refs.form.reset()
    },
    resetImageUpload() {
      this.uploading = false
      this.uploadEnd = false
    }
  }
}
</script>
