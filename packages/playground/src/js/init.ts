import { Engine, SizeType } from "@view-engine/core";

type property = {
  type: string;
  value: number;
};
// export interface BlockType {
//   vModel: null | string;
//   slot?: string;
//   uuid: string;
//   key: string;
//   propsData: any; rawProps: any;
//   x: number;
//   y: number;
//   blocks: BlockType[];
//   parent: string;
//   layer: number;
//   width: property;
//   height: property; actions: { key: string | undefined, handler: string | undefined }[]
// }
type SizeProp = { size: SizeType; value: number };
export interface BlockType {
  vModel: null | string;
  slot?: string;
  uuid: string;
  key: string;
  propsData: any;
  rawProps: any;
  x: SizeProp;
  y: SizeProp;
  blocks: BlockType[];
  parent: string;
  layer: number;
  width: property;
  height: property;
  actions: { key: string | undefined; handler: string | undefined }[];
}

export type Container<BlockType> = {
  width: number;
  height: number;
  fontSize: number;
  backgroundColor: string;
  gridNum: number;
  gridGap: number;
  gridColor: string;
  margin: number;
  radius: number;
  isFull: boolean;
  blocks: BlockType[];
};

let data = {
  width: 640,
  height: 600,
  fontSize: 16,
  backgroundColor: "#ffff00",
  gridColor: "#ff00006b",
  gridNum: 10,
  gridGap: 20,
  margin: 0,
  radius: 0,
  isFull: false,
  blocks: [],
};

export let instance = new Engine<BlockType, Container<BlockType>>(data);

window.addEventListener("unload", function () {
  localStorage.setItem(
    "view-engine-playground:activePage",
    JSON.stringify(instance.data)
  );
});
