import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import EditorLayout from "@/layouts/EditorLayout.vue";

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
        {
          name: "pages",
          path: "/pages",
          component: () => import("../views/pages/ListPages.vue"),
        },
      ],
    },
    {
      path: "/components/:id/edit",
      name: "editComponentLayout",
      component: EditorLayout,
      children: [
        {
          name: "edit-component",
          path: "/components/:id/edit",
          component: () => import("../views/components/EditComponent.vue"),
        },
      ],
    },
    {
      path: "/pages/:id/edit",
      name: "editPageLayout",
      component: EditorLayout,
      children: [
        {
          name: "edit-pages",
          path: "/pages/:id/edit",
          component: () => import("../views/pages/EditPage.vue"),
        },
      ],
    },
    {
      path: "/pageBuilder",
      name: "pageBuilder",
      component: () => import("../views/PageBuilderView.vue"),
    },
  ],
});

export default router;
