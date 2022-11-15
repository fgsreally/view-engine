<template>
  <section class="preview-section">
    <el-scrollbar style="height: 500px">
      <el-badge
        v-for="(module, i) in compList"
        :key="i"
        :value="module.key"
        type="primary"
        class="preview-badge"
      >
        <div
          class="preview-section-box"
          draggable
          @dragend="dragend"
          @dragstart.stop="
          (e) => {
            dragstart(e, module as any);
          }
        "
        >
          <Preview
            :value="module"
            class="preview-section-item"
            v-bind="$attrs"
          ></Preview>
        </div>
      </el-badge>
    </el-scrollbar>
  </section>
</template>

<script setup lang="ts">
import { instance } from "../js/init";
import { defaultRegisterComponent, useMenuDragger } from "@view-engine/core";
import { nanoid } from "nanoid";
import { inject } from "vue";
import Preview from "./Preview.vue";

const { compList, containerWidth, containerHeight } = defineProps<{
  compList: Array<defaultRegisterComponent>;
  containerWidth: string;
  containerHeight: string;
}>();

const container = inject("container");

let { dragstart, dragend } = useMenuDragger(container as any, {
  drop: ({ e, module }: any) => {
    let layer = instance.hoverBlock ? instance.hoverBlock.layer + 1 : 1;
    instance.add(
      {
        blocks: [],
        vModel: null,
        propsData: { value: "{{value}}" },
        rawProps: { value: "{{value}}" },
        key: module.key,
        uuid: "view_" + nanoid(4),
        x: layer === 1 ? e.offsetX : 0,
        y: layer === 1 ? e.offsetY : 0,
        slot: "default",
        layer: layer,
        actions: [],
      } as any,
      instance.hoverBlock ? instance.hoverBlock : "1"
    );
  },
});
</script>

<style scoped>
.preview-section {
  width: 100%;
}
.preview-section-item {
  pointer-events: none;
}

.preview-section-box {
  margin-left: 12px;
  width: v-bind(containerWidth);
  height: v-bind(containerHeight);
  border: 3px solid;
  border-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%) 1;
  display: flex;
  user-select: all;
  /* background-color: white; */
  justify-content: center;
  align-items: center;
}
.preview-badge {
  margin-top: 10px;
  user-select: none;
}
</style>
