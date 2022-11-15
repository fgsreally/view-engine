<template>
  <section class="header">
    <div>
      <el-button v-for="(item, i) in btn" :key="i" @click="item.handler">{{
        item.label
      }}</el-button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { instance } from "../js/init";
import { usePageState } from "../store/page";
import { useState } from "../store/filter";
import { getComponent } from "@view-engine/core";
import { $Code, $Load, $Container } from "../components/dialog";
import { useRouter } from "vue-router";
import FileSaver from "file-saver";
import { beFull } from "be-full";
import { getCode } from "../js/code";
import { services } from "../js/service";
const router = useRouter();
const state = useState();
let pageState = usePageState();
let btn = [
  {
    label: "导出代码",
    handler() {
      // let VUEtemplate = instance.data.blocks.reduce((arr, cur) => {
      //   return arr + (getComponent(cur.key) as any).code(cur).template;
      // }, "");
      // let VUEscript = instance.data.blocks.reduce((arr, cur) => {
      //   return arr + (getComponent(cur.key) as any).code(cur).script;
      // }, "");

      $Code(getCode(instance.data, state.state, services));
    },
  },
  {
    label: "容器配置",
    handler() {
      $Container();
    },
  },
  {
    label: "实时预览",
    handler() {
      router.push("/pure");
    },
  },
  {
    label: "本地打包",
    handler() {
      pageState.fetchBundle("fgs");
    },
  },
  {
    label: "全屏模式",
    handler() {
      beFull(document.querySelector(".editor-container") as HTMLElement);
    },
  },
  {
    label: "下载配置",
    handler() {
      var blob = new Blob([JSON.stringify(pageState.generateConfig())], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, "config.json");
    },
  },

  {
    label: "加载模块",
    handler() {
      $Load();
    },
  },
];
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 5vh;
  align-items: center;
}
</style>
