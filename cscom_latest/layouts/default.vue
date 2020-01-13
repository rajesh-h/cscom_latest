<template>
  <v-app>
    <v-container px-0>
      <v-site-header />
      <!-- <v-row>
        <v-col cols="12" class="page-title" align-center>
          <h2 class="text-center">
            <v-icon large color="primary" class="pr-2">{{ pageIcon }}</v-icon>
            <span class="headline font-weight-medium">{{ pageTitle }}</span>
          </h2>
        </v-col>
      </v-row> -->

      <v-site-content />
      <!-- <v-mobile-nav /> -->
      <!-- <v-site-footer /> -->
    </v-container>
  </v-app>
</template>

<script>
// import VMobileNav from '@/components/VMobileNav.vue'
import VSiteContent from '@/components/VSiteContent.vue'
import VSiteHeader from '@/components/VSiteHeader.vue'
// import VSiteFooter from '@/components/VSiteFooter.vue'

export default {
  name: 'DefaultLayout',
  components: {
    // VMobileNav,
    VSiteContent,
    VSiteHeader
    // VSiteFooter
  },
  props: {
    // pageTitle: {
    //   type: String,
    //   default: 'HOME'
    // },
    pageIcon: {
      type: String,
      default: 'mdi-home'
    }
  },

  data: () => ({}),
  computed: {
    pageTitle() {
      return this.$route.matched.map((r) => {
        return r.components.default.options
          ? r.components.default.options.pageTitle
          : r.components.default.pageTitle
      })[0]
    },
    logInfo() {
      // eslint-disable-next-line no-console
      console.log(this.pageTitle)
      return true
    }
  }
}
</script>

<style>
.page-title {
  border-bottom: 1px dashed #999;
  border-top: 1px dashed #999;
}

div#app {
  font-family: Montserrat, Roboto, sans-serif !important;
  font-size: 14px;
}
.v-application .headline {
  font-family: Montserrat, Roboto, sans-serif !important;
}
</style>
