import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailNews from '../views/DetailNews.vue'
import EditNews from '../views/EditNews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Edit/:slug',
      name: 'EditNews',
      component: EditNews
    },
    {
      path: '/news/:slug',
      name: 'slug',
      component: DetailNews
    }
  ]
})

export default router
