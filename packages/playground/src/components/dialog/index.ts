import { render, createVNode, VNode, Component } from "vue";
import Load from "./Load.vue";
import Code from "./Code.vue";
import Container from "./Container.vue";
import Service from "./Service.vue";
let vm: { [key: string]: VNode } = {};

function createModelVnode(key: string, comp: Component) {
  if (!vm[key]) {
    let el = document.createElement("div");
    vm[key] = createVNode(comp); // 将组件渲染成虚拟节点
    // 这里需要将el 渲染到我们的页面中
    document.body.appendChild((render(vm[key], el), el)); // 渲染成真实节点扔到页面中
  }
  return vm[key];
}

export function $Load() {
  // 手动挂载组件   new SubComponent.$mount()

  let vm = createModelVnode("load", Load);
  let { dialog } = (vm as any).component?.exposed;
  dialog();
}
export function $Code(content: string) {
  // 手动挂载组件   new SubComponent.$mount()
  let vm = createModelVnode("code", Code);
  let { dialog } = (vm as any).component.exposed;
  dialog(content);
}

export function $Container() {
  let vm = createModelVnode("container", Container);
  let { dialog } = (vm as any).component.exposed;
  dialog();
}

export function $Service(serviceName:string) {
  let vm = createModelVnode("service", Service);
  let { dialog } = (vm as any).component.exposed;
  dialog(serviceName);
}
