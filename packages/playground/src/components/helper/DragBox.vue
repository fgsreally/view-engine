<template>
  <div>
    <div class="dragBox" @mousedown.capture.self.prevent="startMove">
      <slot></slot>
      <div
        v-show="isActive"
        v-for="(item, i) in moveBlocks"
        :class="item + ' moveblock'"
        :key="i"
        @mousedown.stop="(e) => transform(e, item)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDrag } from "@view-engine/core";
import { instance } from "../../js/init";
import { useContainerStore } from "../../store/container";

const containerState = useContainerStore();
const { isActive } = defineProps<{ isActive: boolean }>();
const moveBlocks = ["tl", "tr", "bl", "br"];

async function startMove(e: MouseEvent) {
  let x = e.clientX;
  let y = e.clientY;
  let initX = instance.clickBlock.x;
  let initY = instance.clickBlock.y;
  useDrag({
    move: (e) => {
      instance.clickBlock.x = initX + e.clientX - x;
      instance.clickBlock.y = initY + e.clientY - y;
    },
    up: () => {
      if (
        instance.clickBlock.x < 0 ||
        instance.clickBlock.y < 0 ||
        instance.clickBlock.x > containerState.wLimit[1] ||
        instance.clickBlock.x > containerState.hLimit[1]
      ) {
        instance.remove(instance.clickBlock);
        instance.$cancel();
      }
    },
  });
}
function transform(evt: MouseEvent, item: string) {
  let x = evt.clientX;
  let y = evt.clientY;
  let w = instance.clickBlock.width.value;
  let h = instance.clickBlock.height.value;
  let initX = instance.clickBlock.x;
  let initY = instance.clickBlock.y;
  useDrag({
    move: (e) => {
      let offsetY = e.clientY - y;
      let offsetX = e.clientX - x;
      if (item.includes("t")) {
        instance.clickBlock.y = initY + offsetY;
        instance.clickBlock.height.value = h - offsetY;
      }
      if (item.includes("l")) {
        instance.clickBlock.x = initX + offsetX;
        instance.clickBlock.width.value = w - offsetX;
      }
      if (item.includes("r")) {
        instance.clickBlock.width.value = w + offsetX;
      }
      if (item.includes("b")) {
        instance.clickBlock.height.value = h + offsetY;
      }
    },
    up: () => {},
  });
}
</script>

<style scoped lang="scss">
.dragBox {
  user-select: none;
  & > .moveblock {
    position: absolute;
    width: 16px;
    height: 16px;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
    border-radius: 50%;
  }
  & > .tl {
    top: -8px;
    left: -8px;
  }
  & > .tr {
    top: -8px;
    left: calc(100% - 8px);
  }
  & > .bl {
    top: calc(100% - 10px);
    left: -8px;
  }
  & > .br {
    top: calc(100% - 8px);
    left: calc(100% - 8px);
  }
}
</style>
