import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/option",
    name: "option",
    component: () => import("../views/Option.vue")
  },
  {
    path: "/popup",
    name: "popup",
    component: () => import("../views/Popup.vue")
  },
  {
    path: "/background",
    name: "background",
    component: () => import("../views/Background.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
