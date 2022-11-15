<template>
  <el-dialog v-model="dialogVisible" title="配置容器" width="700px">
    <el-form label-width="300px">
      <el-form-item label="页面宽度">
        <el-input-number
          v-model="container.width"
          :min="containerState.wLimit[0]"
          :max="containerState.wLimit[1]"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="页面高度">
        <el-input-number
          v-model="container.height"
          :min="containerState.hLimit[0]"
          :max="containerState.hLimit[1]"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="圆角">
        <el-input-number v-model="container.radius" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="基础尺寸(font-size)">
        <el-input-number
          v-model="container.fontSize"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="外侧边距">
        <el-input-number v-model="container.margin" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="栅格数目">
        <el-input-number v-model="container.gridNum" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="栅格间距">
        <el-input-number v-model="container.gridGap" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-color-picker v-model="container.backgroundColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="栅格颜色">
        <el-color-picker v-model="container.gridColor"></el-color-picker>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { useContainerStore } from "../../store/container";
import { storeToRefs } from "pinia";
import { ref } from "vue";
let containerState = useContainerStore();
let { value: container } = storeToRefs(containerState);
let dialogVisible = ref(false);

function dialog() {
  dialogVisible.value = true;
}
defineExpose({ dialog });
</script>
