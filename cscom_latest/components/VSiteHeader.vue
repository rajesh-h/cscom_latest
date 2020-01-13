<template>
  <v-toolbar color="transparent" flat style="flex:0;" height="80px">
    <v-toolbar-title style="padding:0px">
      <nuxt-link
        tag="img"
        :src="require('~/assets/images/logo.png')"
        to="/"
        style="cursor:pointer; padding-top:5px;margin-left:-10px"
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

<style lang="sass" scoped></style>
