<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-for="post in posts" :key="post.id" xs-12 sm-6 md4 lg3>
        <v-card class="text-xs-center ma-3">
          <!-- <router-link :to="post.id"> -->
          <router-link :to="post.post_slug">
            <v-responsive v-if="post.post_featured_image">
              <v-img :src="post.post_featured_image.url"></v-img>
            </v-responsive>
          </router-link>
          <v-card-text style="height:150px;">
            <div class="subheading">{{ post.post_title }}</div>
            <!-- <div class="grey--text" v-html="post.post_content" /> -->
            <!-- <VueShowdown
              :markdown="post.post_content"
              flavor="github"
              :options="{ emoji: true }"
            /> -->
            <div class="grey--text">{{ post.post_excerpt }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="grey">
              <v-icon small left>mdi-message</v-icon>
              <span>READ</span>
            </v-btn>
          </v-card-actions>
        </v-card></v-flex
      >
    </v-layout>
  </v-container>
  <!-- <section id="posts">
    <PostPreview
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnail-image="post.thumbnailUrl"
    />
  </section> -->
</template>

<script>
// import PostPreview from "@/components/Blog/PostPreview";
import axios from "axios";
// import { VueShowdown } from "vue-showdown";
export default {
  components: {
    // PostPreview
    // VueShowdown
  },
  data() {
    return {
      blogUrl: process.env.blogUrl,
      // postSlug: [], // This is introduced to remove warning , this is actually RouterLink used in nuxt-link
      posts: []
      // posts: [
      //   {
      //     title: "A New Beginning",
      //     previewText: "This will be awesome, don't miss it!",
      //     thumbnailUrl:
      //       "https://cookingshooking.com/wp-content/uploads/2018/12/Tandoori-Gobi.jpg",
      //     id: "a-new-beginning"
      //   },
      //   {
      //     title: "A Second Beginning",
      //     previewText: "This will be awesome, don't miss it!",
      //     thumbnailUrl:
      //       "https://cookingshooking.com/wp-content/uploads/2018/12/Tandoori-Gobi.jpg",
      //     id: "a-second-beginning"
      //   }
      // ]
    };
  },
  // computed: {
  //   reqPosts() {
  //     console.log(this.posts);
  //     return this.posts.filter(item => item.post_status === this.query);
  //   }
  // },
  // async asyncData() {
  //   const { data } = await axios.get(
  //     process.env.blogUrl + "/posts?post_status=2"
  //   );
  //   console.log(data);
  //   return { posts: data };
  // }
  async mounted() {
    try {
      const result = await axios({
        method: "POST",
        url: this.blogUrl + "/graphql",
        data: {
          query: `
                            {
                                posts {
    id
    post_title
    post_excerpt
    post_featured_image{url}    
    updated_at
    post_author{username}
    post_slug
  }
                            }
                        `
        }
      });
      this.posts = result.data.data.posts;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
#posts {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
@media (min-width: 35rem) {
  #posts {
    flex-direction: row;
  }
}
</style>
