import { CompList, standardBlock } from "../types/types";

interface Content {
  template: string;
  script: string;
}

export abstract class codeGenerator<
  BlockType extends standardBlock<BlockType>
> {
  content: string = "";
  tag: string = "";
  property: string = "";
  template: string = "";
  script: string = "";
  slotCode: { [key in string]: Content[] } | undefined;
  constructor(protected block: BlockType) {}
  slot(slotSet: string[], allCompList: CompList<any>, renderType: string) {
    this.slotCode = {};
    slotSet.forEach((templateName) => {
      (this.slotCode as { [key in string]: Content[] })[templateName] =
        this.block.blocks.map((block: BlockType) => {
          try {
            if (block.slot === templateName) {
              return (allCompList as any).get(block.key)[renderType](block);
            }
          } catch (e) {
            console.error(
              `(Method ${renderType} or block ${block.key} ) may not be found in the registration module )\n`,
              e
            );
          }
        }) as any;
    });

    return this;
  }

  useTemplate() {
    let slotTemplate = Object.entries(
      this.slotCode as { [key in string]: Content[] }
    ).reduce((arr: any, cur: [string, Content[]]): any => {
      return arr + cur[1].length > 0
        ? `<template v-slot:${cur[0]}>
  ${cur[1].reduce((p, c) => {
    return c.template;
  }, "")}
</template>`
        : "";
    }, "");

    this.template = `<${this.tag} ${this.property}>${slotTemplate}</${this.tag}>`;
    return this;
  }
  useScript() {
    let slotScript = Object.entries(
      this.slotCode as { [key in string]: Content[] }
    ).reduce((arr: any, cur: [string, Content[]]) => {
      return (
        arr +
        cur[1].reduce((p, c) => {
          return c.script;
        }, "")
      );
    }, "");
    this.script += slotScript || "";
    return this;
  }
  abstract useProperty<T>(params?: T): this;
  abstract useTag<T>(params?: T): this;

  exec() {
    this.useTemplate();
    this.useScript();
    return {
      script: this.script,
      template: this.template,
    };
  }
}

export class sourceGenerator<
  BlockType extends standardBlock<BlockType>,
  NodeType extends {
    tag: string;
    children: NodeType[];
    slot?: string;
    props: { [key: string]: any };
  }
> {
  node: NodeType;
  constructor(protected block: BlockType) {
    this.node = { props: {}, children: [] } as any;
  }
  useSlot(slotSet: string[], allCompList: CompList<any>, renderType: string) {
    slotSet.forEach((templateName) => {
      let childrenNodes = this.block.blocks.map((block: BlockType) => {
        try {
          if (block.slot === templateName) {
            return (allCompList as any).get(block.key)[renderType](block);
          }
        } catch (e) {
          console.error(
            `(Method ${renderType} or block ${block.key} ) may not be found in the registration module )\n`,
            e
          );
        }
      }) as NodeType[];
      if (childrenNodes.length > 0) {
        this.node.children.push({
          tag: "template",
          slot: templateName,
          children: childrenNodes,
        } as NodeType);
      }
    });
    return this;
  }
  useTag(tag?: string) {
    this.node.tag = tag || this.block.key;
    return this;
  }
  useProps(key: string, value: any) {
    this.node.props[key] = value;
    return this;
  }
  exec() {
    return this.node;
  }
}
