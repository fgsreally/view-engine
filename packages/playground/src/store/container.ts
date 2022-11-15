import { load } from "@/js/load";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";



export const useContainerStore = defineStore("container", {
  state: () => ({
    value: {
      width: 640,
      height: 600,
      fontSize: 16,
      backgroundColor: "#ffff00",
      gridColor: "#ff00006b",
      gridNum: 10,
      gridGap: 20,
      margin: 0,
      radius: 0,
    },
    wLimit: [640, 768],
    hLimit: [600, Infinity],
    breakPoint: "sm",
    isEdit: true,
    isFull: false,
    isGrid: true,
    isHelper: true,
    screen: "normal",
    helperBlock: true,
  }),
  getters: {},
  actions: {
    responsive(breakpoint: "normal" | "sm" | "md" | "lg") {
      this.breakPoint = breakpoint
      switch (breakpoint) {
        case 'normal':
          this.wLimit = [200, 640];
          this.value.width = 640
          this.value.height = 600
          break;
        case 'sm':
          this.wLimit = [640, 768];
          this.value.width = 640
          this.value.height = 600
          break;
        case 'md':
          this.wLimit = [768, 1024];
          this.value.width = 768
          this.value.height = 600; break;
        case 'lg':
          this.wLimit = [1024, Infinity];
          this.value.width = 1024
          this.value.height = 600; break;
      }

    }

  },
});


