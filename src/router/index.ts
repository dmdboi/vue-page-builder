import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: DashboardLayout,
      children: [
        {
          name: "home",
          path: "",
          component: HomeView,
        },
        {
          name: "components",
          path: "/components",
          component: () => import("../views/components/ListComponents.vue"),
        },
        {
          name: "component",
          path: "/components/:id",
          component: () => import("../views/components/ViewComponent.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/pageBuilder",
      name: "pageBuilder",
      component: () => import("../views/PageBuilderView.vue"),
    },
  ],
});

export default router;
