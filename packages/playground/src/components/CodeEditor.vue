<template>
  <div id="root" ref="root"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from "vue";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import onedark from "../assets/atomDark.json";
// import darktheme from "theme-vitesse/themes/vitesse-dark.json";
// import lightTheme from "theme-vitesse/themes/vitesse-light.json";
// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

export default defineComponent({
  props: {
    value: String, // 编辑器默认内容
    width: Number,
    height: Number,
    prefix: { type: String, default: "" },
    language: {
      type: String,
      default: "javascript",
    },
  },
  emits: { contentChange: null },
  setup(props, { emit, expose }) {
    const root = ref<HTMLElement>();
    const content = ref<string>("");
    let editor: monaco.editor.IStandaloneCodeEditor;
    monaco.editor.defineTheme("atom-one-dark", onedark as any);
    monaco.editor.setTheme("atom-one-dark");
    expose({
      content,
      update: (v: string) => {
        editor.setValue(props.prefix + v);
      },
    });

    watch(
      () => props.value,
      (n) => {
        editor.setValue(props.prefix + n);
      }
    );
    onMounted(() => {
      // monaco.editor.defineTheme("vitesse-dark", darktheme);
      // // @ts-expect-error
      // monaco.editor.defineTheme("vitesse-light", lightTheme);
      console.log(props.value)
      editor = monaco.editor.create(root.value as HTMLElement, {
        value: props.prefix + props.value,
        language: props.language,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      });

      editor.onDidChangeModelContent(() => {
        content.value = editor?.getValue() as string;
      });

      editor.layout({
        height: props.height as number,
        width: props.width as number,
      });
    });

    onUnmounted(() => {
      editor.dispose(); // 销毁
    });

    return {
      root,
    };
  },
});
</script>
