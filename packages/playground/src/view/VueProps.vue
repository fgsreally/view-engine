<template>
  <section class="vue-property-box">
    <el-select
      v-model="instance.clickBlock.vModel"
      placeholder=" v-model绑定变量"
    >
      <el-option v-for="(item, i) in state" :key="i" :label="i" :value="i" />
      <el-option label="无" :value="undefined" />
    </el-select>
  </section>
</template>

<script setup lang="ts">
import { useState } from "@/store/filter";
import { instance } from "../js/init";
let { state } = useState();
</script>

<style scoped>
.vue-property-box {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
