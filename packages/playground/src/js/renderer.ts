import { cloneDeep } from "lodash-es";
import { allComponentsList, Renderer } from "@view-engine/core";
import DragBox from "../components/helper/DragBox.vue";
import { h, DefineComponent, VNode, Component, createVNode, render } from "vue";
import { instance } from "./init";
import { applyService, getService, services } from "./service";

enum VUEOPTS {
  IF = "if",
  MODEL = "vModel",
}
export class myRenderer extends Renderer<any, any> {
  getSize() {
    (this._vnode as any).props["onVnodeMounted"] = ({
      el,
    }: {
      el: HTMLElement;
    }) => {
      this.block.width = { value: el.offsetWidth, type: "px" };
      this.block.height = { value: el.offsetHeight, type: "px" };
    };

    return this;
  }
  draggable() {
    this._vnode = h(
      DragBox as DefineComponent,
      { isActive: this.block === instance.clickBlock },
      this._vnode as VNode
    );

    return this;
  }
  useSize() {
    if (this.block.width)
      (this._vnode as any).props[
        "style"
      ] = `width:${this.block.width.value}${this.block.width.type};height:${this.block.height.value}${this.block.height.type}`;
    return this;
  }
  response(width: number, height: number) {
    (this._vnode as any).props["onVnodeMounted"] = ({ el }: any) => {
      let offsetWidth = el.offsetWidth;
      let offsetHeight = el.offsetHeight;
      let scale = Math.min(1, height / offsetHeight, width / offsetWidth);
      el.style = `transform:scale(${scale});`;
    };

    return this;
  }
  useOffset() {
    (this._vnode as any).props[
      "style"
    ] = `top:${this.block.y}px;left:${this.block.x}px`;
    return this;
  }
  useFilter(filter: any) {
    // this.block = filter(this.block);
    return this;
  }
  render(filter: any) {
    this._vnode = h(
      this.comp as DefineComponent,
      filter(cloneDeep(this.block.propsData || {})),
      this._vnode || undefined
    );
    return this;
  }
  editAction() {
    (this._vnode as any).props["onMousedownCapture"] = (e: MouseEvent) => {
      instance.$select(this.block);
    };
    (this._vnode as any).props["ondragover"] = (e: MouseEvent) => {
      instance.$select(this.block, "hoverBlock");
    };

    (this._vnode as any).props["onmouseleave"] = (e: MouseEvent) => {
      instance.$cancel("hoverBlock");
      e.stopPropagation();
    };
    return this;
  }
  renderAction(state: any) {
    if (this.block[VUEOPTS.MODEL]) {
      (this._vnode as any).props[`modelValue`] =
        state[this.block[VUEOPTS.MODEL]];
      (this._vnode as any).props[`onUpdate:modelValue`] = (v: any) =>
        (state[this.block[VUEOPTS.MODEL]] = v);
    }
    this.block.actions.forEach(
      (item: { key: string | undefined; handler: string | undefined }) => {
        if (item.key && item.handler) {
          console.log(services);
          console.log(getService(item.handler as string, state));
          (this._vnode as any).props[`on${item.key}`] = console.log; // getService(item.handler as string, state);
        }
      }
    );
    return this;
  }
  mount() {
    render(this._vnode as any, document.body);
    return this;
  }
}
