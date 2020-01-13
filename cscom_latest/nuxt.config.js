import colors from 'vuetify/es5/util/colors'
// const  colors  = require('vuetify/es5/util/colors')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat&display=swap'
      }
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/fireauth.js',
    '~/plugins/TiptapVuetify'
    // { src: '~/plugins/vue2-editor', ssr: false }
    // { src: '~/plugins/quill', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'vue2-editor/nuxt',
    [
      'nuxt-lazy-load',
      {
        // These are the default values
        // images: true,
        // videos: true,
        // audios: true,
        // iframes: true,
        directiveOnly: true

        // To remove class set value to false
        // loadedClass: 'isLoaded',
        // appendClass: 'lazyLoad',

        // observerConfig: {
        //   rootMargin: '50px 0px 50px 0px',
        //   threshold: 0
        //   // See IntersectionObserver documentation
        // }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#8bc34a',
          secondary: '#ff5722',
          accent: '#607d8b',
          error: '#f44336',
          warning: '#e91e63',
          info: '#ffc107',
          success: '#2196f3'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: ['vuetify/lib', 'tiptap-vuetify']
  },

  router: {
    // middleware: 'router-auth'
  },
  generate: {
    routes: ['milijulisabzi-rs']
  }
}
