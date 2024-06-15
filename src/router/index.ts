import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {UseStore} from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/HomePage.vue"),
    meta: {
      active: "1"
    }
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/MessagePage.vue"),
    meta: {
      active: "2"
    }
  },
  {
    path: "/statistic",
    name: "statistic",
    component: () => import("@/views/StatisticPage.vue"),
    meta: {
      active: "3"
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export const safeBack = function (path: string) {
  return !window.history.state.back && path ? router.replace(path || "/") : router.back()
}

export default router
