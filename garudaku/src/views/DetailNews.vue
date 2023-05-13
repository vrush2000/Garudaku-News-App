<template>
  <div class="col-8">
    <button @click.prevent="navigatePage(`/edit/${newsDetail.slug}`)" class="card" >
      <p>Edit Article</p>
    </button>
    <h1>{{ newsDetail.title }}</h1>
    <p>{{ formatDate(newsDetail.createdAt) }}
</p>
    <img :src="newsDetail.image" alt="image">
    <p>{{ newsDetail.content }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'DetailNews',
  data() {
    return {
      newsDetail: {}
    };
  },
  mounted() {
    this.fetchDetailNews(this.$route.params.slug)
  },
  methods: {
    ...mapActions(["fetchDetailNews"]),
    
    formatDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dd = new Date(date).toLocaleDateString('id-ID', options)
            const tt = new Date(date).toLocaleTimeString('id-ID', ([], { hour: '2-digit', minute: '2-digit' }))
            return `${dd}, ${tt} WIB`
        },
        
        navigatePage(toPage) {
            this.$router.push(toPage)
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