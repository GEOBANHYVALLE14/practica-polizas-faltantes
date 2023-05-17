import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
    {
      path: "/polizas",
      name: "polizas",
      component: () => import("../views/PolizasView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/poliza/create",
      name: "/create",
      component: () => import("../views/PolizaCreateView.vue"),
    },
    {
      path: "/poliza/:id",
      name: "/update",
      component: () => import("../views/PolizaUpdateView.vue"),
    },
    {
      path: "/poliza/view/:id",
      name: "/view",
      component: () => import("../views/PolizaReadView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  // redirigir a la página de inicio de sesión si no ha iniciado sesión e intenta acceder a una página restringida
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;
