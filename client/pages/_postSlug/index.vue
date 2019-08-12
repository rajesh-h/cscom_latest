<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs-12 sm-8 md8 lg8>
        <v-card class="text-xs-center ma-3">
          <v-responsive v-if="post.post_featured_image">
            <v-img :src="blogUrl + post.post_featured_image.url"></v-img>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ post.post_title }}</div>
            <!-- <div class="grey--text" v-html="post.post_content" /> -->
            <VueShowdown
              v-if="post.post_content"
              :markdown="post.post_content"
              flavor="github"
              :options="{ emoji: true }"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn text color="grey">
              <v-icon small left>mdi-share</v-icon>
              <span>SHARE</span>
            </v-btn>
          </v-card-actions>
        </v-card></v-flex
      >
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { VueShowdown } from "vue-showdown";
export default {
  name: "Post",
  components: {
    VueShowdown
  },
  data() {
    return {
      blogUrl: process.env.blogUrl,
      post: []
    };
  },
  async mounted() {
    try {
      // console.log(this.$route.params.postSlug);
      // const id = this.$route.params.postSlug;
      const result = await axios({
        method: "POST",
        url: this.blogUrl + "/graphql",
        data: {
          query: `query ($slug: JSON!){
  posts (where: $slug) {
    id
    post_title
    post_excerpt
    post_featured_image{url}
    post_content
    post_category{category_name}
    postingredients{ingredient{ingredient_name}, ingredient_unit}
    updated_at
    post_author{username}
    post_slug
    
  }
  }`,
          variables: {
            slug: {
              post_slug: this.$route.params.postSlug
            }
          }
        }
      });
      this.post = result.data.data.posts[0];
      console.log(this.post);
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<style></style>
