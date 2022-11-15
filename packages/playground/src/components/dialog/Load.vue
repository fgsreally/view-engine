<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="70%">
    <el-input v-model="url" placeholder="url"> </el-input>
    <el-input v-model="key" placeholder="key"> </el-input>
    <el-switch v-model="isShare" />
    <el-input v-model="label" placeholder="注释"> </el-input>
    <el-select v-model="type" placeholder="type">
      <el-option label="组件" value="component" />
      <el-option label="js模块" value="js" />
    </el-select>
    <el-button @click="loadModule">加载</el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import { addContext } from "../../js/service";
import { ref } from "vue";
// import { useMethodStore, useServiceStore } from "@/store/index";
import { load, loadJS } from "../../js/load";
import { registerComponent, registerModule } from "../../js/register";
import { useServiceState } from "../../store/service";
let service = useServiceState();
let dialogVisible = ref(false);
let url = ref("");
let label = ref("");
let type = ref("");
let key = ref("");
let isShare = ref(false);
function dialog() {
  dialogVisible.value = true;
}
defineExpose({ dialog });
async function loadModule() {
  try {
    if (type.value == "component") {
      let { component, propsData, css } = await load(url.value);
      registerComponent(
        "addon",
        component,
        key.value,
        {
          label: label.value,
          url: url.value,
          isShare: isShare.value,
        },
        css,
        propsData
      );
      dialogVisible.value = false;
    } else {
      let m = await loadJS(url.value);
      registerModule(
        "addon",
        key.value,
        {
          label: label.value,
          url: url.value,
          isShare: isShare.value,
        },
        m
      );
      addContext(key.value, m);
      // service.clear("stack");
      dialogVisible.value = false;
    }
  } catch (e) {
    console.log(e);
  }
}
</script>
<style scoped></style>
