<template>
  <div class="col-8">
    <h1>Edit Article</h1>
    <form @submit.prevent="updateNews(newsDetail)">
      <label for="fname">Title</label>
      <input type="text" name="title" v-model="newsDetail.title" placeholder="Your name..">
      <label for="lname">Image Url</label>
      <input type="text" name="image" v-model="newsDetail.image" placeholder="Your last name..">
      <img :src="newsDetail.image" alt="image" style="width: 100%;">
      <br />
      <label for="lname">Content</label>
      <textarea name="content" v-model="newsDetail.content" placeholder="Your last name..">
      </textarea>
      <input type="submit" value="Submit">
    </form>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios"
export default {
  name: 'DetailNews',
  data() {
    return {
      newsDetail: {},
      errors: []
    };
  },
  mounted() {
    this.fetchDetailNews(this.$route.params.slug)
    this.updateNews(this.$route.params.slug)
  },


  methods: {
    ...mapActions(["fetchDetailNews",]),
    updateNews(newsDetail) {
      axios.put(`http://localhost:3000/news/${this.$route.params.slug}`, newsDetail)
        .then(() => {
          this.$router.push(`/news/${this.$route.params.slug}`);
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    newsDetail() {
      return this.$store.state.newsDetail;
    }
  }

};
</script>

<style>
input[type=text],
textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

h1 {
  font-size: 2em;
}

p {
  font-size: 1em;
}

img {
  width: 100%;
}
</style>