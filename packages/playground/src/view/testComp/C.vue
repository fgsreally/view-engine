<template>
  <div class="C">
    {{ modelValue }}
    <div class="c_inner"><slot>mask</slot></div>
  </div>
</template>

<script lang="ts" setup>
const { modelValue } = defineProps<{ modelValue: string }>();
</script>
<style scoped>
.C {
  background-color: rgba(38, 106, 38, 0.856);
  min-width: 100px;
  min-height: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c_inner {
  background-color: green;
  width: 100px;
  height: 100px;
  position: relative;
}
</style>
