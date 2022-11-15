<template>
  <Teleport :disabled="instance.container.isFull" to="body">
    <el-select
      v-model="instance.clickBlock.class"
      multiple
      filterable
      allow-create
      default-first-option
      :reserve-keyword="false"
      placeholder="Choose tags for your article"
    >
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-option-group>
    </el-select>
  </Teleport>
</template>

<script setup lang="ts">
import { instance } from "../js/init";
import { computed } from "vue";
const options = [
  {
    label: "Popular cities",
    options: [
      {
        value: "Shanghai",
        label: "Shanghai",
      },
      {
        value: "Beijing",
        label: "Beijing",
      },
    ],
  },
  {
    label: "City name",
    options: [
      {
        value: "Chengdu",
        label: "Chengdu",
      },
      {
        value: "Shenzhen",
        label: "Shenzhen",
      },
      {
        value: "Guangzhou",
        label: "Guangzhou",
      },
      {
        value: "Dalian",
        label: "Dalian",
      },
    ],
  },
];
</script>
