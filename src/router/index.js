import Vue from "vue";
import VueRouter from "vue-router";
import Controller from "../views/Controller.vue";
import Data from "../views/Data.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "controller",
    component: Controller
  },
  {
    path: "/data",
    name: "data",
    component: Data
  }
];

const router = new VueRouter({ routes });

export default router;
