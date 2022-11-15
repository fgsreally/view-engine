<template>
  <RouterView :data="config" :ctx="{}"></RouterView>
  <div ref="el" :style="style" style="position: fixed" class="dragbox">
    <div v-for="(item, i) in config.pages" :key="i" @click="toPureRender(i)">
      {{ i }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDraggable } from "@vueuse/core";
import { ref } from "vue";
import { useRouter } from "vue-router";
import config from "./config.json";
const el = ref<HTMLElement | null>(null);
// `style` will be a helper computed for `left: ?px; top: ?px;`
const { style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
});

let router = useRouter();

function toPureRender(params: string) {
  router.push(`/pure/${params}`);
}
</script>
