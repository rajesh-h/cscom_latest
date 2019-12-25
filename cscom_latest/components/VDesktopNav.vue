<template>
  <v-toolbar-items class="align-center">
    <v-btn
      v-for="nav in navs"
      :key="nav.name"
      large
      text
      :to="nav.path"
      height="50% !important"
    >
      {{ nav.name }}
    </v-btn>
  </v-toolbar-items>
</template>

<script>
export default {
  name: 'VDesktopNav',
  data: () => ({
    navs: [
      {
        path: '/',
        name: 'home'
      },
      {
        path: '/recipes',
        name: 'recipes'
      },
      {
        path: '/about',
        name: 'about'
      },
      {
        path: '/contact',
        name: 'contact'
      }
    ]
  })
}
</script>
