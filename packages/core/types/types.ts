import { Component, VNode } from "vue";
export interface defaultContainerState<Screen extends string> {
  isEdit: boolean;
  isFull: boolean;
  isGrid: boolean;
  isHelperLine: boolean;
  isHelper: boolean;
  screen: Screen;
  curContainer: any;
}
export type defaultActState<BlockType, DataState> = {
  clickBlock: null | BlockType;
  hoverBlock: null | BlockType;
  clickDom: null | HTMLElement | string;
  hoverDom: null | HTMLElement | string;
  container: DataState;
};

// type Container = {
//   [key in string]: string | number;
// };

export interface nodeState<BlockType> {
  blocks: BlockType[];
}

export interface baseBlock {
  uuid: string;
  parent: string;
  key: string;
}
export type basicBlock<BlockType> = baseBlock & { blocks: BlockType[] };

export type inputBlock<BlockType> = Omit<BlockType, "parent"> & {
  parent?: string;
  // propsData: any;
};

export interface standardBlock<BlockType> {
  parent?: string; //默认parent=''时本节点为未挂载节点，为'1'时即父节点为根节点
  slot: string; //use in renderer
  key: string;
  propsData: any;
  uuid: string;
  blocks: BlockType[];
}

export interface vBlock {
  vIf: { value: boolean; required: boolean };
  vShow: { value: boolean; required: boolean };
  vFor: { value: number; required: boolean };
}

export interface defaultDecorator {
  comp: Component;
  propsData: any;
  dirct: string;
}

export type CompList<RegisterBlock> = Map<string, RegisterBlock>;

export type defaultRegisterComponent = {
  type: "component";
  comp: Component;
  key: string;
};

export type defaultRegisterModule = {
  key: string;

  type: "module";
  module: any;
};

export interface registerCenter<RegisterComponent> {
  componentList: RegisterComponent[];
  register(module: RegisterComponent): void;
}

export interface EngineConfig {
  actionConfig?: { [key in string]: any };
  containerConfig?: { [key in string]: any };
  snapshotList?: string[];
  historyLength?: number;
  allowFullHistory?: boolean;
  allowCustomRecord?: boolean;
}

export interface lineData {
  startNode: string;
  endNode: string;
}

export interface pointData {
  x: number;
  y: number;
}

export interface ComputeGetter {
  get?: (v: any) => any;
  set?: (v: any) => any;
}
