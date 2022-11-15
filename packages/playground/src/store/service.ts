import { defineStore } from "pinia";
import { analyseService } from "../utils/parser";
import { pick } from "lodash-es";
import { getModule } from "@view-engine/core";
import { addService, delService } from "../js/service";
export const useServiceState = defineStore("service", {
  state: () => ({
    services: {} as { [key: string]: string },
    pageServicesName: new Set() as Set<string>,
    dependences: new Set() as Set<string>,
  }),

  getters: {
    pageServices: (state) => {
      return pick(state.services, [...state.pageServicesName]);
    },
    pageDependences: (state) => {
      return [...state.dependences].filter(getModule);
    },
  },
  actions: {
    clearPage() {
      [...this.pageServicesName].forEach((item) => delete this.services[item]);
      this.pageServicesName.clear();
    },

    loadPage(services: { [key: string]: string }, dependences: string[]) {
      this.clearPage();
      this.services = Object.assign(this.services, services);
      Object.keys(services).forEach((item) => {
        this.pageServicesName.add(item);
      });
      Object.keys(dependences).forEach((item) => {
        this.dependences.add(item);
      });
    },
    updateService(key: string, str: string) {
      let { hasState, dependences } = analyseService(str);
      this.services[key] = str;
      addService(key, str);
      if (hasState) {
        this.pageServicesName.add(key);
      } else {
        this.pageServicesName.delete(key);
      }
      dependences.forEach((item) => this.dependences.add(item));
    },
    deleteService(key: string) {
      delete this.services[key];
      delService(key);
    },
  },
});
