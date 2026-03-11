import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import AboutPage from '../views/AboutPage.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/projects', name: 'projects', component: ProjectsPage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

