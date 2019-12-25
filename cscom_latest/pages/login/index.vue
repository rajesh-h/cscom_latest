<template>
  <v-row justify-center align-center>
    <v-col xs="12" sm="8">
      <div class="mt-5">
        <div v-if="!$store.state.user">
          <login-form></login-form>
        </div>
        <div v-else class="flexWrapper align-center">
          <h4 class="blue--text">You're logged in!</h4>
          <v-btn icon class="blue white--text">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </div>
      </div>
      <v-btn @click="logout">LOGOUT</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import LoginForm from '~/components/LoginForm'

export default {
  components: {
    LoginForm
  },
  computed: {
    user() {
      return this.$store.users.getters.activeUser
    }
  },
  methods: {
    ...mapActions({
      logout: 'users/signOut'
    })
    // logout() {
    //   this.$store.users.dispatch('signOut').then(() => {
    //     alert('logged out!')
    //     this.$router.push('/')
    //   })
    // }
  }
}
</script>

<style scoped>
.fake {
  background: blue;
}
.wrapper {
  margin-top: -7.5em;
}
.flexWrapper {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
.container {
  height: calc(100vh - 100px);
  align-items: center;
  align-content: center;
  display: flex;
  justify-content: center;
}
.title {
  font-size: 2.5em !important;
  /*margin-top: -5em;*/
}
@media (min-width: 750px) {
  .title {
    font-size: 3.5em !important;
  }
}
</style>
