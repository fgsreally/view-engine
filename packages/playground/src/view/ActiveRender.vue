<template>
  <section class="pureRender-box">
    <Render :data="instance.data.blocks" type="render"></Render>
  </section>
</template>

<script setup lang="ts">
import Render from "./Render.vue";
import { useRoute } from "vue-router";
import { watch } from "vue";
import { useState } from "../store/filter";
import { instance } from "../js/init";
import { usePageState } from "../store/page";
</script>

<style scoped>
.pureRender-box {
  width: 100vw;
  position: relative;
}
</style>
