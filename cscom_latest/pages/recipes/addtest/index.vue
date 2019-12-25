<template>
  <div id="app">
    <client-only>
      <!-- <vue-editor v-model="content"></vue-editor> -->
    </client-only>
  </div>
</template>

<script>
// import { VueEditor } from 'vue2-editor'

export default {
  components: {
    // VueEditor
  },

  data() {
    return {
      content: '<h1>Some initial content</h1>'
    }
  }
}
</script>
