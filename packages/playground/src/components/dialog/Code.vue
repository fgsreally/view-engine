<template>
  <el-dialog v-model="dialogVisible" title="导出代码" width="700px">
    <el-tabs type="border-card">
      <el-tab-pane label="正在编辑"
        ><CodeEditor
          :width="600"
          :height="600"
          language="html"
          :value="code"
        ></CodeEditor
      ></el-tab-pane>
      <el-tab-pane
        v-for="item in pageState.pages"
        :key="item.name"
        :label="item.name"
        ><CodeEditor
          :width="600"
          :height="600"
          language="html"
          :value="getInstanceCode(item.instance, item.state, item.services)"
        ></CodeEditor
      ></el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CodeEditor from "../CodeEditor.vue";
import { usePageState } from "../../store/page";
import { getCode } from "../../js/code";
import { BlockType, Container } from "@/js/init";
const pageState = usePageState();
let code = ref("");
let dialogVisible = ref(false);

function dialog(content: string) {
  dialogVisible.value = true;
  code.value = content;
}

function getInstanceCode(
  instance: Container<BlockType>,
  state: any,
  services: { [key: string]: string }
) {
  return getCode(instance, state, services);
}

defineExpose({ dialog });
</script>
