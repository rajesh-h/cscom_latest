<template>
  <v-row>
    <v-col text-xs-center xs="12" sm="12">
      <h2 class="title">Sign In with Google</h2>
      <v-btn class="signIn mb-2" primary @click.native="googleSignUp"
        >Google Sign In</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    emailLogin() {
      this.$store
        .dispatch('signInWithEmail', {
          email: this.formEmail,
          password: this.formPassword
        })
        .then(() => {
          this.formEmail = ''
          this.formPassword = ''
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e.message)
        })
    },

    ...mapActions({
      googleSignUp: 'users/signInWithGoogle'
    })

    //     googleSignUp() {
    //       this.$store
    //         .dispatch('signInWithGoogle')
    //         .then(() => {
    //           // eslint-disable-next-line no-console
    //           console.log('inside then statement on login')
    //         })
    //         .catch((e) => {
    //           // eslint-disable-next-line no-console
    //           console.log(e.message)
    //         })
    //     }
  }
}
</script>

<style></style>
