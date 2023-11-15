import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "home",
    children: [
      {
        path: "/people/",
        name: "people",
        component: () => import("../views/PeopleView.vue"),
        keepAlive: true,
      },
      {
        path: "/people/page/:page",
        name: "people-page",
        component: () => import("../views/PeopleView.vue"),
        props: true,
        params: true,
      },
      {
        path: "/favorites",
        name: "Favorites",
        component: () => import("../views/FavoritesView.vue"),
      },
      {
        path: "/people/person/:id",
        name: "Person",
        component: () => import("../views/PeoplePageView.vue"),
        props: true,
        params: true,
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
