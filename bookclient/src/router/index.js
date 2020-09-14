import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Feachered from "../components/Book/FeturedBook.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        component: Feachered
      },
      {
        path: "/genre/:id",
        props: true,
        component: () =>
          import(/* webpackChunkName: "Genre" */ "../views/GenrePage.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
