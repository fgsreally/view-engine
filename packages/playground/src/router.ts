import { createRouter, createWebHashHistory } from "vue-router"
import Editor from "./view/Editor.vue";

const routes = [
  { path: '/', component: Editor },
  {
    path: "/pure",
    component: () => import("./view/ActiveRender.vue")
  },
  {
    path: "/pure/:pageRoute",
    component: () => import("./view/pureRender.vue")
  }

]
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})


