<template>
  <div class="test1">{{ props.value }}<slot /></div>
</template>
<script setup lang="ts">
const props = defineProps<{ value: string }>();
</script>
<style>
.test1 {
  width: 50px;
  height: 50px;
  background-color: red;
}
</style>
