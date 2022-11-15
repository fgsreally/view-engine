<template>
  <section v-for="(item, i) in instance.clickBlock.actions" :key="i">
    <el-select v-model="item.key" placeholder="事件名" size="small">
      <el-option
        v-for="(item, i) in events"
        :key="i"
        :label="item.label"
        :value="item.value"
        :disabled="isDisabed(item.value)"
      />
      <el-option label="无" :value="undefined" />
    </el-select>
    <el-select v-model="item.handler" placeholder="事件函数" size="small">
      <el-option v-for="(item, i) in services" :key="i" :label="i" :value="i" />
      <el-option label="无" :value="undefined" />
    </el-select>
  </section>
  <el-button @click="addEvent">添加事件</el-button>
</template>

<script setup lang="ts">
import { getComponent } from "@view-engine/core";
import { services } from "../js/service";
import { instance } from "../js/init";

let comp = (getComponent(instance.clickBlock.key) as any).comp;
let events = [{ label: "点击", value: "click" }];

function eventCase(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

if (comp.emits)
  events.push(
    ...comp.emits?.map((item: string) => {
      return { label: eventCase(item), value: eventCase(item) };
    })
  );

function isDisabed(key: string) {
  if (instance.clickBlock.actions.some((item) => item.key === key)) return true;
  return false;
}
function addEvent() {
  instance.clickBlock.actions.push({ key: undefined, handler: undefined });
}
</script>
