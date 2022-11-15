<template>
  <section class="code-editor-box">
    <div>
      <CodeEditor
        ref="editor"
        prefix="return "
        :value="JSON.stringify(context.$)"
        :width="350"
        :height="100"
      ></CodeEditor>
    </div>
    <el-button @click="update">确认更改</el-button>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { context, addContext } from "../js/service";
const editor = ref();

function update() {
  try {
    let content = editor.value.content;
    let ret = new Function(content)();
    addContext("$", ret);
    ElMessage("成功更改");
  } catch (e) {
    console.log(e);
    ElMessage.error("更改失败");
  }
}
</script>

<style scoped>
.code-editor-box > div {
  border: 3px solid blue;
}
.el-button {
  position: relative;
  left: 300px;
}
</style>
