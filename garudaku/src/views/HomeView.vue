<template>
  <div>
    <h1 class="col-8">List of News Articles</h1>
    <NewsList/>
  </div>
</template>

<script>
import NewsList from '../components/NewsList.vue';

export default {
    name: "Home",
    components: { NewsList }
};
</script>
