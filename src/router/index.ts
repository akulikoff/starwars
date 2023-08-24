import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "people",
    component: () => import("../views/PeopleView.vue"),
    keepAlive: true,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("../views/FavoritesView.vue"),
  },
  {
    path: "/person/:id",
    name: "Person",
    component: () => import("../views/PeoplePageView.vue"),
    props: true,
    params: true,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
