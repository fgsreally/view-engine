<template>
  <section class="pureRender-box">
    <Render :data="instance.data.blocks" type="render"></Render>
  </section>
</template>

<script setup lang="ts">
import Render from "./Render.vue";
import { useRoute } from "vue-router";
import {  watch } from "vue";
import { useState } from "../store/filter";
import { Engine } from "@view-engine/core";
import { usePageState } from "../store/page";
const route = useRoute();
let pageState = usePageState();
let State = useState();

// const { curState, curInstance } = defineProps<{
//   curState?: Object;
//   curInstance?: Object;
// }>();

let instance = new Engine({ blocks: [] });

watch(
  () => route.params,
  (n: any) => {
    let { state, instance: value } = pageState.find(
        route.params.pageRoute as string
      ) as any;
      State.createState(state);
      instance.load(value);
  },
  { immediate: true }
);
</script>

<style scoped>
.pureRender-box {
  width: 100vw;
  position: relative;
}
</style>
