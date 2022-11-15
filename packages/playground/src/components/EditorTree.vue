<template>
  <div>
    <el-tree
      class="tree"
      :data="props.data"
      :props="{ children: 'blocks', label: 'key' }"
      @node-click="handleNodeClick"
      default-expand-all
      empty-text="空"
      node-key="uuid"
      :highlight-current="true"
    />
  </div>
</template>

<script setup lang="ts">
import { instance } from "../js/init";
const props = defineProps({
  data: Array,
});

const handleNodeClick = (data: any) => {
  instance.$select(data);
};
</script>

<style scoped>
.tree {
  margin-top: 50px;
}
</style>
