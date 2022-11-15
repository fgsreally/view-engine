<template>
  <section class="pureRender-box">
    <Render :data="instance.data.blocks" type="render"></Render>
  </section>
</template>

<script setup lang="ts">
import Render from "./Render.vue";
import { useRoute } from "vue-router";
import { reactive, watch } from "vue";
import {
  createFilter,
  Engine,
  getComponent,
  nodeState,
} from "@view-engine/core";

import { Component } from "vue";
import {
  allComponentsList,
  createEditorConfig,
  createService,
} from "@view-engine/core";
import { Renderer } from "@view-engine/core";
import { VNode, ref } from "vue";
import A from "../components/A.vue";
interface BlockType {
  slot?: string;
  uuid: string;
  key: string;
  propsData: any;
  rawProps: any;
  x: number;
  y: number;
  blocks: BlockType[];
  parent: string;
  layer: number;
  width: number;
  height: number;
  actions: { key: string | undefined; handler: string | undefined }[];
}

type viewServices = { [key in string]: string };

interface viewData extends Object {
  url: string;
  context: any;
  services: viewServices;
  pages: {
    [key in string]: {
      services: viewServices;
      state: any;
      components: string[];
      modules: string[];
      instance: nodeState<BlockType>;
    };
  };
}

let { data, ctx } = defineProps<{ data: viewData; ctx: Object }>();

let transformer = reactive<any>({});

function updateTransformer(initState: any = {}) {
  let { filter, state } = createFilter(initState, {
    exclude: ["blocks", "rawProps"],
  });
  transformer.filter = filter;
  transformer.state = state;
}

let { applyService, addService, services, addContext } = createService(ctx);

addContext("$", data.context);

class myRenderer extends Renderer<any, any> {
  useSize() {
    if (this.block.width)
      (this._vnode as any).props[
        "style"
      ] = `width:${this.block.width.value}${this.block.width.type};height:${this.block.height.value}${this.block.height.type}`;
    return this;
  }

  useOffset() {
    (this._vnode as any).props[
      "style"
    ] = `top:${this.block.y}px;left:${this.block.x}px`;
    return this;
  }
  useFilter(filter: any) {
    this.block = filter(this.block);
    return this;
  }

  renderAction(state: any) {
    this.block.actions.forEach(
      (item: { key: string | undefined; handler: string | undefined }) => {
        if (item.key && item.handler) {
          (this._vnode as any).props[`on${item.key}`] = () => {
            applyService(item.handler as string, state);
          };
        }
      }
    );
    return this;
  }
}

let RegisterCenter = createEditorConfig();
function registerModule(module: any, key: string) {
  if (!getComponent(key)) {
    RegisterCenter.register({
      type: "module",
      key,
      module,
    } as any);
  }
}
function registerComponent(Comp: Component, key: string) {
  if (!getComponent(key))
    RegisterCenter.register({
      comp: Comp,
      key: key,
      type: "component",
      render(Block: any) {
        let renderer = new myRenderer(Block, Comp as any);
        let node = renderer
          .useFilter(transformer.filter)
          .slot(["default"], allComponentsList, "render")
          .main()
          .useSize()
          .useClass(Block.layer > 1 ? "slotBlock_render" : "block_render")
          .useOffset()
          .renderAction(transformer.state)
          .exec();

        return node as VNode;
      },
    } as any);
}

registerComponent(A, "test1");

const route = useRoute();

let routeSet: Set<string> = new Set();
let instance = new Engine({ blocks: [] });

watch(
  () => route.params,
  (n: any) => {
    let page = n.pageRoute;
    if (!routeSet.has(page)) {
      routeSet.add(page);
      // data.pages[page].components.forEach(async (key) => {
      //   let { key: component } = await import(
      //     /* @vite-ignore */ data.url + page + ".js"
      //   );
      //   registerComponent(component, key);
      // });
      data.pages[page].modules.forEach(async (key) => {
        let mN = key.split("_")[0];
        let m = await import(/* @vite-ignore */ data.url + page + ".js");

        console.log(m[mN])
        registerModule(m[mN], mN);
        addContext(key, m[mN]);
      });
      for (let i in data.pages[page].services) {
        if (!services[i]) addService(i, data.pages[page].services[i]);
      }
    }
    updateTransformer(data.pages[page].state);
    instance.load(data.pages[page].instance as any);
  },
  { immediate: true }
);
</script>

<script lang="ts">
export default {
  name: "pureRender",
};
</script>

<style scoped>
.pureRender-box {
  width: 100vw;
  position: relative;
}
</style>
