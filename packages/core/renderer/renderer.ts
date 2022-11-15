import {
  cloneVNode,
  Component,
  DefineComponent,
  h,
  VNode,
  vShow,
  withDirectives,
} from "vue";
import {
  CompList,
  standardBlock,
  defaultDecorator,
  defaultRegisterModule,
  vBlock,
} from "../types/types";

let decorator = (deco: defaultDecorator) => {
  return (content: VNode) =>
    h(
      deco.comp,
      { ...deco.propsData },
      {
        [deco.dirct]: content,
      }
    );
};

export class Renderer<
  BlockType extends standardBlock<BlockType>,
  RegisterModule extends defaultRegisterModule
> {
  protected _vnode: VNode | VNode[] | null = null;

  // stack: { funcName: string; property: any }[];
  renderType: string;
  allComponentsList: CompList<RegisterModule>;
  // slotVNode: { [key in string]: Function };
  constructor(protected block: BlockType, protected comp: Component) {}
  exec() {
    return this._vnode;
  }

  slotRenderer(
    slotSet: string[],
    allComponentsList: CompList<RegisterModule>,
    renderType: string
  ) {
    let slotRenderer: { [key in string]: Function } = {};
    slotSet.forEach((templateName) => {
      slotRenderer[templateName] = () =>
        this.block.blocks.map((block: BlockType) => {
          try {
            if (block.slot === templateName) {
              return (allComponentsList as any)
                .get(block.key)
                [renderType](block);
            }
          } catch (e) {
            console.error(
              `(Method ${this.renderType} or block ${block.key} ) may not be found in the registration module )\n`,
              e
            );
          }
        });
    });
    return slotRenderer;
  }
  slot(
    slotSet: string[] = ["default"],
    allComponentsList: CompList<RegisterModule>,
    renderType: string = "render"
  ) {
    this._vnode = this.slotRenderer(
      slotSet,
      allComponentsList,
      renderType
    ) as any;
    return this;
  }
  main() {
    this._vnode = h(
      this.comp as DefineComponent,
      {
        ...(this.block.propsData||{}),
      },
      this._vnode || undefined
    );
    return this;
  }
  useDecorator() {
    this._vnode = (this.block as any).decorators.reduce(
      (arr: any, cur: any) => {
        return decorator(cur)(arr as VNode);
      },
      this._vnode
    );
    return this;
  }

  useDragger(
    dragEnter: (e: DragEvent, block: BlockType) => void,
    dragOver: (e: DragEvent, block: BlockType) => void
  ) {
    (this._vnode as any).props["ondragenter"] = (e: DragEvent) =>
      dragEnter(e, this.block);
    (this._vnode as any).props["ondragover"] = (e: DragEvent) =>
      dragOver(e, this.block);
    return this;
  }
  useClass(className: string) {
    (this._vnode as any).props["class"] = className;
    return this;
  }
  useID(id: string) {
    (this._vnode as any).props["id"] = id;
    return this;
  }
  useValue(key: string, property: any) {
    (this._vnode as any).props[key] = property;
    return this;
  }
  box() {
    this._vnode = h("div", { default: () => [this._vnode] });
    return this;
  }
  vFor() {
    if (this._vnode) {
      let vnode: VNode[] = [this._vnode as VNode];
      if ((this.block as BlockType & vBlock).vFor.required) {
        for (
          let i = 1;
          i < (this.block as BlockType & vBlock).vFor.value;
          i++
        ) {
          vnode.push(cloneVNode(this._vnode as VNode));
        }
      }
      this._vnode = vnode;
    }

    return this;
  }
  vIf() {
    if (
      (this.block as BlockType & vBlock).vIf.required &&
      !(this.block as BlockType & vBlock).vIf.value
    ) {
      this._vnode = null;
    }

    return this;
  }
  vShow() {
    this._vnode = withDirectives(this._vnode as VNode, [
      [vShow, (this.block as BlockType & vBlock).vShow.value],
    ]);
    return this;
  }
}
