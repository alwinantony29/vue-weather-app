import { createRouter, createWebHistory } from "vue-router";
import LoginSignupFormVue from "../components/LoginSignupForm.vue";

const routes = [{ path: "/", component: LoginSignupFormVue }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
