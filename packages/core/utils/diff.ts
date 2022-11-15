import { basicBlock } from "../types/types";
import { diff } from "deep-object-diff";
import { cloneDeep, get, set } from "lodash-es";

export function diffData<BlockType extends basicBlock<BlockType>>(
  group1: BlockType[],
  group2: BlockType[],
  exclude: string[] = ["uuid", "blocks", "parent"],
  ret: { [key in string]: object[] } = {}
) {
  if (group1.length !== group2.length)
    throw new Error("two groups have different structure");
  for (let i in group1) {
    if (group1[i].uuid !== group2[i].uuid) {
      throw new Error("two groups have different structure");
    }
    let effectArr: any[] = [];
    ret[group1[i].uuid] = effectArr;
    for (let j in group1[i]) {
      if (exclude.includes(j)) continue;
      let diffInfo = baseDiff(j, group1[i][j], group2[i][j]);
      if (diffInfo) effectArr.push(diffInfo);
    }
    diffData(group1[i].blocks, group2[i].blocks, exclude, ret);
  }
  return ret;
}

function baseDiff<T extends unknown>(key: string, param1: T, param2: T) {
  //without undefined and null
  let ret: any = {};
  if (typeof param1 !== typeof param2)
    throw new Error("property has different structure");
  switch (typeof param1) {
    case "string":
    case "number":
      if (param1 === param2) return null;

      ret[key] = param2;
      return ret;
    case "object":
      ret[key] = diff(param1 as Object, param2 as Object);
      return ret;
  }
}

export function applyDiff<O extends object>(
  originValue: O,
  variationSet: object[]
) {
  variationSet.forEach((item) => {
    traverseApplyDiff(item, item, originValue);
  });
  return originValue;
}

function traverseApplyDiff(
  partVar: unknown,
  variation: object,
  originValue: object,
  path = ""
) {
  if (typeof partVar === "object") {
    for (let i in partVar) {
      traverseApplyDiff(
        (partVar as any)[i],
        variation,
        originValue,
        path ? path + "." + i : i
      );
    }
  } else {
    let parent: unknown = get(
      originValue,
      path.slice(0, path.lastIndexOf("."))
    );

    set(originValue, path, get(variation, path));
    if (Array.isArray(parent)) {
      set(
        originValue,
        path.slice(0, path.lastIndexOf(".")),
        parent.filter((item) => item)
      );
    }
  }
}

export function reverseDiffInfo(
  origin: object,
  info: { [x: string]: object[] }
) {
  let copyInfo = cloneDeep(info);
  for (let i in copyInfo) {
    traverseDiff(origin, copyInfo, i);
  }
  return copyInfo;
}

function traverseDiff(
  origin: object,
  copyInfo: { [x: string]: object[] },
  path: string
) {
  if (typeof get(copyInfo, path) === "object") {
    for (let i in copyInfo) {
      traverseDiff(origin, copyInfo, path + "." + i);
    }
  } else {
    set(copyInfo, path, get(origin, path));
  }
}

// export function patchBlocks(
//   oldNodes: any[],
//   newNodes: any[],
//   excludes: string[] = ["blocks"],
//   ret: any[] = []
// ) {
//   for (let i in oldNodes) {
//     let newNode = newNodes.find((node) => node.uuid === oldNodes[i].uuid);
//     if (!newNode) {
//       ret.push({ type: "delNode", uuid: oldNodes[i].uuid });
//     }else{
//       ret.push({type:})
//     }

//   }
// }
