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
    path: "/history",
    name: "background",
    component: () => import("../views/history.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
