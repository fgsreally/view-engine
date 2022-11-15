import {
  codeGenerator,
  sourceGenerator,
  COMPUTE_RE,
  getComponent,
} from "@view-engine/core";
import { BlockType, Container, instance } from "./init";
import { getService } from "./service";

export class myCodeGenerator extends sourceGenerator<any, any> {}
// export class myCodeGenerator extends codeGenerator<any> {
//   useTag() {
//     this.tag = this.block.key;
//     return this;
//   }
//   useProperty() {
//     let set = new Set();
//     this.script += `let ${
//       this.block.name || this.block.uuid
//     }= ref(${JSON.stringify(this.block.propsData).replace(
//       /{{(.*)}}/g,
//       (_, js) => {
//         return js.replace(/([a-zA-Z]+)/gim, (_: string) => {
//           return `state.${_}`;
//         });
//       }
//     )})`;
//     this.property += ` v-bind="${this.block.name || this.block.uuid}" `;
//     this.block.actions.forEach((item: { key: string; handler: any }) => {
//       set.add(item.key);
//       if (item.key) this.property += ` @${item.key}="${item.handler}" `;
//     });

//     for (let key of set.keys()) {
//       this.script += `\nlet key=${getService(key as string)}`;
//     }
//     return this;
//   }
// }

export function template(str: string) {
  return `<template>${str}</template>`;
}

export function script(str: string) {
  return `<script setup>${str}</script>`;
}

export function getTemplate(node: any) {
  console.log(node);
  let ret = "";

  ret += `<${node.tag} `;

  for (let i in node.props) {
    console.log(node.props[i], COMPUTE_RE.test(node.props[i]));
    if (COMPUTE_RE.test(node.props[i])) {
      ret += `:${i}="${node.props[i].match(COMPUTE_RE)[1]}" `;
    } else {
      ret += `${i}='${JSON.stringify(node.props[i])}' `;
    }
  }
  if (node.slot) {
    ret += `v-slot:${node.slot}`;
  }
  ret += `>`;

  node.children.forEach((item: any) => {
    ret += getTemplate(item);
  });

  return ret + `</${node.tag}>`;
}

export function getCode(
  instance: Container<BlockType>,
  state: any,
  services: { [key: string]: string }
) {
  return (
    template(
      instance.blocks
        .map((block) => {
          return (getComponent(block.key) as any).code(block);
        })
        .reduce((prev, cur) => prev + getTemplate(cur), "")
    ) +
    script(
      `let state=${JSON.stringify(state)}\n` +
        Object.entries(services).reduce((arr, cur) => {
          return arr + `let ${cur[0]}=${cur[1]}`;
        }, "")
    )
  );
}
