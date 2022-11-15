import { createApp } from "vue";
import App from "./App.vue";


import { createPinia } from "pinia";
import "./style.css";
import "./style/editor.scss"
import "element-plus/theme-chalk/el-message.css"
import {router} from "./router"
const store = createPinia();

createApp(App).use(store).use(router).mount("#app");
