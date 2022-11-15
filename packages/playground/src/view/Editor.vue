<template>
  <el-row>
    <el-col :span="4">
      <el-tabs @tabClick="clickTab" v-model="activeTab">
        <el-tab-pane label="组件" name="LocalComponent">
          <PreviewPart
            :compList="localCenter.componentList"
            containerWidth="210px"
            containerHeight="310px"
            :width="180"
            :height="280"
          ></PreviewPart>
        </el-tab-pane>
        <el-tab-pane label="附加组件" name="addonComponent">
          <PreviewPart
            :compList="addonCenter.componentList"
            containerWidth="100px"
            containerHeight="50px"
            type="text"
          ></PreviewPart>
        </el-tab-pane>
        <el-tab-pane label="数据树" name="NodeTree">
          <Tree :data="instance.data.blocks" v-if="isShowTree"></Tree>
        </el-tab-pane>
        <el-tab-pane label="页面管理" name="PageAdmin">
          <PageAdmin></PageAdmin>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="14">
      <Header></Header>
      <el-scrollbar style="height: 95vh">
        <div class="editor-container">
          <div
            ref="container"
            class="editor-container-canvas-content"
            :class="containerStore.isGrid ? 'grid' : ''"
            @mousedown.self="instance.$cancel()"
          >
            <Render :data="instance.data.blocks" type="edit"></Render>
          </div>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="6">
      <State></State>
      <Props v-if="instance.clickBlock"></Props>
      <VProps v-if="instance.clickBlock"></VProps>

      <Property v-if="instance.clickBlock"></Property>
    </el-col>
    <el-drawer v-model="drawer" title="右侧Service">
      <Api></Api>
    </el-drawer>
  </el-row>
</template>

<script setup lang="ts">
import Api from "./Api.vue";
import { provide, ref, watch } from "vue";
import { instance } from "../js/init";
import PreviewPart from "./PreviewPart.vue";
import Render from "./Render.vue";
import State from "./State.vue";
import Props from "./Props.vue";
import Property from "./Property.vue";
import { useContainerStore } from "../store/container";
import { changeStyleVar, changeStyleValue } from "../utils/style";
import Header from "./Header.vue";
import Tree from "../components/EditorTree.vue";
import { responseScreen } from "../js/size";
import PageAdmin from "../components/PageAdmin.vue";
import VProps from "./VueProps.vue";
import { localCenter, addonCenter } from "../js/register";
let drawer = ref(false);
let containerStore = useContainerStore();
let isShowTree = ref(false);
let activeTab = ref("LocalComponent");
responseScreen();

function clickTab(n: any) {
  if (n.props.label === "数据树") {
    isShowTree.value = true;
  } else {
    isShowTree.value = false;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.altKey) drawer.value = true;
});

watch(
  instance.container,
  (n) => {
 
    changeStyleValue("fontSize", n.fontSize + "px");
    changeStyleVar("gridGap", n.gridGap / 2);
    changeStyleVar("radius", n.radius / 2);
    changeStyleVar("gridLen", (n.width - n.margin * 2) / n.gridNum);
    changeStyleVar("bkColor", n.backgroundColor);
    changeStyleVar("width", n.width);
    changeStyleVar("height", n.height);
    changeStyleVar("margin", n.margin);
    changeStyleVar("gridColor", n.gridColor);
  },
  {
    immediate: true,
  }
);
let container = ref<HTMLElement | null>(null);
provide("container", container);
</script>
