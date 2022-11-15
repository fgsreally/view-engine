<template>
  <div class="test2" @click="emits('a',1)">{{ props.value }}<slot /></div>
</template>

<script setup lang="ts">
const props = defineProps<{ value: string }>();
const emits = defineEmits(["a"]);
</script>
<style scoped>
.test2 {
  width: 100px;
  height: 100px;
  background-color: blue;
}
</style>
