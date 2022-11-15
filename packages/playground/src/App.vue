<template>
  <keep-alive v-slot="{ Component }">
    <router-view></router-view>
  </keep-alive>

  <div ref="el" :style="style" style="position: fixed" class="dragbox">
    <p class="dragbox-title">页面管理</p>
    <el-scrollbar style="height: 100%">
      <div
        v-show="$route.path !== '/'"
        class="dragbox-item"
        @click="router.push('/')"
      >
        editor
      </div>
      <div
        v-for="(item, i) in pageState.pages"
        :key="i"
        class="dragbox-item"
        @click="toPureRender(item.name)"
      >
        {{ item.name }}
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "@vueuse/core";
import { usePageState } from "./store/page";
import { useRouter } from "vue-router";
import "./view/testComp/index";
const el = ref<HTMLElement | null>(null);
const pageState = usePageState();
// `style` will be a helper computed for `left: ?px; top: ?px;`
const { style } = useDraggable(el, {
  initialValue: { x: 28, y: 610 },
});

let router = useRouter();
console.log(router.currentRoute);
function toPureRender(params: string) {
  router.push(`/pure/${params}`);
}
</script>

<style lang="scss" scoped>
.dragbox {
  user-select: none;
  width: 200px;
  height: 100px;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  padding: 10px 0;
  border-radius: 20px;
  display: flex;
  justify-content: center;
}

.dragbox-title {
  font-size: 12px;
  position: absolute;
  top: -16px;
  left: 20px;
  font-weight: 700;
  
  color: #fa7d35;
  user-select: none;
}
.dragbox-item {
  cursor: pointer;
  color: #fa7d35;
}
</style>
