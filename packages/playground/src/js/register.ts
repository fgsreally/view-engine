import { ElMessage } from "element-plus";
import {
  createEditorConfig,
  defaultRegisterModule,
  Renderer,
  allComponentsList,
  getComponent,
  getModule,
} from "@view-engine/core";
import { Component, createVNode, h, render, VNode } from "vue";
import { myCodeGenerator } from "./code";
import { myRenderer } from "./renderer";
import { useState } from "../store/filter";
import { LoadPkg } from "@view-engine/backend";
import { parseComputed } from "../utils/parser";
import { cloneDeep } from "lodash-es";
export interface registerModule extends defaultRegisterModule {
  propsData: any;
}

export let localCenter = createEditorConfig();
export let addonCenter = createEditorConfig();

function isValid(key: string) {
  return !(getComponent(key) || getModule(key));
}

export function registerModule(
  type: "local" | "addon",
  key: string,
  opts: { url: string; isShare: boolean; label?: string },
  module: any
) {
  if (!isValid(key)) {
    ElMessage.error(`已存在${key}`);
    return;
  }
  let meta: LoadPkg[] = Object.keys(module).map((i) => {
    return { ...opts, key: `${key}_${i}`, imports: i, type: "JS" };
  });
  let RegisterCenter = type === "local" ? localCenter : addonCenter;

  RegisterCenter.register({
    type: "module",
    key,
    label: opts.label || "",
    module,
    meta,
  } as any);
}

export function registerComponent(
  type: "local" | "addon",
  Comp: Component,
  key: string,
  opts: { url: string; isShare: boolean; label?: string },
  addon: { map?: Component; cssUrl?: string; category?: "mask" } = {},
  propsData = {}
) {
  if (!isValid(key)) {
    ElMessage.error(`已存在${key}`);
    return;
  }
  let meta: LoadPkg[] = [{ imports: "default", key, type: "JS", ...opts }];

  if (addon.cssUrl) {
    let cssOptions: any = { type: "assets", ...opts }.type;
    cssOptions.url = addon.cssUrl;
    meta.push(cssOptions);
  }

  let RegisterCenter = type === "local" ? localCenter : addonCenter;
  RegisterCenter.register({
    comp: Comp,
    key: key,
    label: opts.label || "",
    type: "component",
    meta,
    text: () => {
      return h("p", key);
    },

    preview: (width: number, height: number) => {
      let renderer = new myRenderer({}, Comp);
      let node = renderer
        .main()
        .useClass("block_preview")
        .response(width, height)
        .exec();
      return node;
    },
    edit: (Block: any) => {
      let State = useState();
      let renderer = new myRenderer(Block, Comp);

      let node;
      if (!addon.category) {
        node = renderer
          // .useFilter(State.filter)
          .slot(["default"], allComponentsList, "edit")
          .render(State.filter)
          .getSize()
          .useClass("innerBlock_edit")
          .useSize()
          .draggable()
          .useClass(Block.layer > 1 ? "slotBlock_edit" : "block_edit")
          .useOffset()
          .editAction()
          .exec();
      } else {
        node = renderer
          .useFilter(State.filter)
          .slot(["default"], allComponentsList, "edit")
          .main()
          .editAction()
          .exec();
      }

      return node as VNode;
    },
    render: (Block: any) => {
      let State = useState();
      if (!addon.category) {
        let renderer = new myRenderer(Block, Comp);
        let node = renderer
          // .useFilter(State.filter)
          .slot(["default"], allComponentsList, "render")
          .render(State.filter)
          .useSize()
          .useClass(Block.layer > 1 ? "slotBlock_render" : "block_render")
          .useOffset()
          .renderAction(State.state)
          .exec();
        return node as VNode;
      } else {
        let renderer = new myRenderer(Block, addon.map as Component);
        renderer
          .useFilter(State.filter)
          .slot(["default"], allComponentsList, "render")
          .main()
          .renderAction(State.state)
          .mount();
        return null;
      }
    },

    code: (Block: any) => {
      let generator = new myCodeGenerator(Block);

      const propsData = cloneDeep(Block.rawProps);

      parseComputed(propsData);
      generator
        .useSlot(["default"], allComponentsList, "code")
        .useTag(Block.key);
      Object.entries(propsData as any).forEach(([key, value]) => {
        generator.useProps(key, value);
      });

      return generator.exec();
    },

    propsData: propsData,
  } as any);
}
