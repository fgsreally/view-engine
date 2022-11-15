<template>
  <ContextState></ContextState>
  <!-- <ModuleList></ModuleList> -->

  <el-button @click="changeService('default')">增加service</el-button>

  <el-table
    :data="allService"
    style="width: 100%"
    @row-click="({name}:any)=>changeService(name)"
  >
    <el-table-column prop="name" label="服务名" width="160" />
    <el-table-column prop="type" label="分类" width="160" />
    <el-table-column width="80" label="操作">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click.stop="delService(scope.row.name)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-dialog v-model="dialogVisible" title="Tips" width="70%">
    <Service :value="content"></Service>
  </el-dialog> -->
</template>

<script lang="ts" setup>
import { isRef, computed } from "vue";
// import { useMethodStore, useServiceStore } from "@/store/index";
import { useServiceState } from "../store/service";
import ContextState from "./ContextState.vue";
import { $Service } from "../components/dialog";

const service = useServiceState();
function changeService(s: string) {
  $Service(s);
}

function delService(name: string) {
  service.deleteService(name);
}
const allService = computed(() => {
  return Object.keys(service.services).map((serviceName) => {
    return {
      name: serviceName,
      type: service.pageServicesName.has(serviceName) ? "局部" : "全局",
    };
  });
});
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.service-box {
  border: 1px solid grey;
}
</style>
