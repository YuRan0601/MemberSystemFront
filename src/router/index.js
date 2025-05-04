import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/layouts/Login.vue"),
    },
    {
      path: "/regist",
      name: "regist",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/reset-password/:token?",
      name: "reset-password",
      component: () => import("@/views/ResetPassword.vue"),
      beforeEnter: (to, from, next) => {
        if (to.params.token) {
          next();
        } else {
          next({ name: "login" });
        }
      },
    },
    {
      path: "/",
      name: "default",
      component: () => import("@/layouts/Default.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/layouts/Dashboard.vue"),
    },
  ],
});

export default router;
