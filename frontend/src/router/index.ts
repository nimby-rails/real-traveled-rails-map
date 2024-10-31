import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'

const router = createRouter({
  //so this file defines all routes (urls/pages) for the Vue app.
  //You can add routes like this:
  //should work now.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '',
      component: Home //try now?
    },
    {
      name: 'map',
      path: '/map',
      //btw, you can also do this for routes specifically:
      //don't need to import at the top, and the page is lazy-loaded only when you actually get there.
      //Any console errors?
      component: () => import('../pages/Map.vue')
    }
  ]
})

export default router
