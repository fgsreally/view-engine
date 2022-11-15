<template>
  <div>
    <el-input v-model="pageName" placeholder="页面名"></el-input
    ><el-button size="small" type="primary" @click="storePage">添加</el-button>
  </div>

  <el-table :data="pageState.pages" style="width: 100%">
    <el-table-column prop="label" label="名称" width="100" />
    <el-table-column label="操作" width="140">
      <template #default="scope">
        <el-button type="primary" size="small" @click="load(scope.row.value)">
          加载
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="pageState.delPage(scope.row.label)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { usePageState } from "../store/page";
import { BlockType, instance } from "../js/init";
import { cloneDeep } from "lodash-es";
import { useState } from "../store/filter";
import { getComponent, getModule } from "@view-engine/core";
import { LoadPkg } from "@view-engine/backend";
import { useServiceState } from "../store/service";

import { pick } from "lodash-es";
let pageName = ref("default");
let pageState = usePageState();
let State = useState();
let service = useServiceState();
pageState.load();

window.addEventListener("unload", function () {
  pageState.storage();
});

function storePage() {
  let dependencesKey: string[] = [];
  instance.traverse(instance.data as any, (item: BlockType) => {
    if (!dependencesKey.includes(item.key)) dependencesKey.push(item.key);
  });
  let dependenceComponent: LoadPkg[] = [];

  dependenceComponent = dependencesKey
    .map((key) => (getComponent(key) as any).meta)
    .flat(1);
  let dependencesModule = service.pageDependences.map((item) => {
    return (getModule(item) as any).meta;
  });

  pageState.addPage(
    cloneDeep({
      name: pageName.value, //页面名
      instance: instance.data, //block 数据
      state: State.state, //页面状态
      modules: service.pageDependences, //调用的module
      components: dependencesKey,
      services: service.pageServices,
      dependences: [...dependenceComponent, ...dependencesModule] as LoadPkg[], //调用的components  +
    })
    //依赖关系
  );
}

function load(data: any) {
  instance.load(data);
}
</script>

<style scoped>
.el-input {
  width: 200px;
  margin-right: 5px;
}
</style>
