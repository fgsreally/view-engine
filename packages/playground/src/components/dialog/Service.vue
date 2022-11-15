<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="70%">
    <section class="code-editor-box">
      <div>
        <CodeEditor
          ref="editor"
          :value="serviceContent"
          :width="600"
          :height="400"
        ></CodeEditor>
      </div>
      <div class="code-editor-rightSide">
        <el-select
          v-model="serviceName"
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="服务名"
          @change="changeService"
        >
          <el-option
            v-for="(item, i) in services"
            :key="i"
            :label="i"
            :value="i"
          />
        </el-select>
        <!-- <div>服务名： <el-input v-model="name"> </el-input></div> -->
        <el-button @click="updateService">确认更改</el-button>
      </div>
    </section>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { useServiceState } from "../../store/service";
import { services } from "../../js/service";
let serviceName = ref("default");
const editor = ref();
const dialogVisible = ref(false);
const serviceContent = computed(() => {
  return services[serviceName.value] || "()=>{}";
});
const serviceState = useServiceState();
function dialog(name: string) {
  dialogVisible.value = true;
  serviceName.value = name;
}
defineExpose({ dialog });

function changeService() {
  editor.value.updateService(services[serviceName.value] || "()=>{}");
}

function updateService() {
  try {
    let content = editor.value.content;
    serviceState.updateService(serviceName.value, content || "()=>{}");
    ElMessage.success("更改成功");
  } catch (e) {
    console.error(e);
    ElMessage.error("更改失败");
  }
}
</script>

<style scoped>
.code-editor-box {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
}
.code-editor-rightSide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
