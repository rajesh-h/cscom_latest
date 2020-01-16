<template>
  <v-row>
    <client-only>
      <v-col v-if="!$store.state.users.user" cols="12" class="text-center">
        <login-form></login-form>
      </v-col>
      <v-col>
        <h4
          v-if="
            $store.state.users.user &&
              $store.state.users.user.email != 'cookingshooking2019@gmail.com'
          "
          class="text-center"
        >
          You are not authorised to view this page
        </h4>
        <template
          v-if="
            $store.state.users.user &&
              $store.state.users.user.email == 'cookingshooking2019@gmail.com'
          "
        >
          <h4 class="text-right">
            Welcome {{ $store.state.users.user.displayName }}
            <span><v-icon @click="logout">mdi-logout</v-icon></span>
          </h4>
          <br />
          <h4 class="text-right">
            <v-btn large small color="primary" @click="newRecipe"
              >New Recipe</v-btn
            >
          </h4>
          <br />
          <v-data-table
            :headers="headers"
            :items="dashBoardRecipes"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.featuredImage="{ item }">
              <v-img
                :src="item.featuredImage"
                style="width: 50px; height: auto"
              ></v-img>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small @click="editItem(item.slug)">
                mdi-pen
              </v-icon>
              <!-- <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon> -->
            </template>
          </v-data-table>
        </template>
      </v-col>
    </client-only>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoginForm from '~/components/LoginForm'
export default {
  name: 'Dashboard',
  components: {
    LoginForm
  },
  pageTitle: 'Dashboard',

  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Image',
        align: 'left',
        sortable: false,
        value: 'featuredImage'
      },
      { text: 'Title', value: 'title', align: 'left' },
      { text: 'Updated', value: 'updatedFmt' },
      { text: 'Published', value: 'publish' },
      { text: 'Actions', value: 'action', sortable: false }
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    ...mapState({
      dashBoardRecipes: (state) => state.recipes.dashBoardRecipes
    })
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.fetchDashBoardRecipes()
  },

  methods: {
    ...mapActions({
      logout: 'users/signOut',
      fetchDashBoardRecipes: 'recipes/fetchDashBoardRecipes'
    }),

    editItem(slug) {
      this.$router.push({ name: 'slug-edit', params: { slug } })
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    newRecipe() {
      this.$router.push({ name: 'new' })
    }
  }
}
</script>

<style></style>
