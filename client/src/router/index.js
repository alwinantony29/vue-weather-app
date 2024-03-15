import { createRouter, createWebHistory } from "vue-router";
import LoginSignupFormVue from "../components/LoginSignupForm.vue";
import HomeVue from "../views/Home.vue";

const routes = [
  { path: "/", component: LoginSignupFormVue },
  { path: "/home", component: HomeVue}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
