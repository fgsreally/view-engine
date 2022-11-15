import { defineStore } from "pinia";
import { LoadPkg } from "@view-engine/backend";
import axios from "axios";
import { context, services } from "../js/service";
import { ElMessage } from "element-plus";

type viewServices = { [key in string]: string };

interface pageData {
  name: string;
  instance: any;
  state: any;
  dependences: LoadPkg[];
  components: string[];
  modules: string[];
  services: viewServices;
}
export const usePageState = defineStore("config", {
  state: () => ({
    pages: [] as pageData[],
    ctx: null as any,
  }),
  actions: {
    addPage(newPage: {
      name: string;
      instance: any;
      state: any;
      modules: string[];
      components: string[];
      services: viewServices;
      dependences: LoadPkg[];
    }) {
      if (!newPage.name) {
        ElMessage.error("必须要有名称");
        return;
      }
      if (this.pages.some((item) => item.name === newPage.name)) {
        ElMessage.error("已存在同名组件");
        return;
      }
      this.pages.push(newPage);
    },

    delPage(name: string) {
      this.pages = this.pages.filter((item) => item.name !== name);
    },
    load() {
      // this.pages = JSON.parse(localStorage.getItem("view-engine-playground:pages") as string) as any || []
    },
    storage() {
      localStorage.setItem(
        "view-engine-playground:pages",
        JSON.stringify(this.pages)
      );
    },
    find(name: string) {
      return this.pages.find((page) => page.name === name);
    },

    generateConfig() {
      this.ctx = context["$"];
      interface viewData {
        context: any;
        services: viewServices;
        pages: {
          [key in string]: {
            services: viewServices;
            state: any;
            components: string[];
            modules: string[];
            instance: any;
          };
        };
      }
      let ret: viewData = { context: this.ctx, services, pages: {} };
      for (let i of this.pages) {
        ret.pages[i.name] = {
          services: i.services,
          state: i.state,
          instance: i.instance,
          components: i.components,
          modules: i.modules,
        };
      }
      return ret;
    },

    fetchBundle(project: string) {
      let pkgs: any = {};
      this.pages.forEach((item) => {
        pkgs[item.name] = item.dependences;
      });

      axios
        .post(
          "localhost:3005/createProject",
          { project, pkgs },
          { timeout: 600000 }
        )
        .catch((e) => {
          if (e.code === `ERR_BAD_REQUEST`) {
            ElMessage.error("连接不到服务");
          }
          if (e.code === "ECONNABORTED") {
            ElMessage.error("打包超时");
          }
        });
    },
  },
});
