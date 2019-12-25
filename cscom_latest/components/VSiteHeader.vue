<template>
  <v-toolbar color="transparent" flat style="flex:0;" height="80px">
    <v-toolbar-title>
      <nuxt-link
        tag="img"
        :src="require('~/assets/images/logo.png')"
        to="/"
        style="cursor:pointer; padding-top:5px"
      ></nuxt-link>
    </v-toolbar-title>
    <v-spacer />

    <v-desktop-nav class="hidden-sm-and-down" />
  </v-toolbar>
</template>

<script>
import VDesktopNav from '@/components/VDesktopNav.vue'

export default {
  name: 'VSiteHeader',
  components: { VDesktopNav },
  data: () => ({
    logoText: 'Cooking Shooking'
  })
}
</script>

<style scoped>
.v-toolbar__title a {
  color: inherit;
  text-decoration: none;
}
</style>
