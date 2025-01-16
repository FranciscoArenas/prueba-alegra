import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Winner from "../pages/Winner.vue";
import Seller from "../pages/Seller.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/winner", component: Winner },
  { path: "/vendedores", component: Seller }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
