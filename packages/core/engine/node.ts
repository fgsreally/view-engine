import { cloneDeep, set, pick } from "lodash-es";
import { nanoid } from "nanoid";
import {
  reactive,
  UnwrapNestedRefs,
  ref,
  Ref,
  UnwrapRef,
  effectScope,
  EffectScope,
  watch,
} from "vue";
import {
  defaultActState,
  EngineConfig,
  inputBlock,
  basicBlock,
  nodeState,
} from "../types/types";
// import { diffData } from "../utils/diff";

/**
 *
 *
 * @export
 * @class Engine
 * @template DataState
 * @template ActState
 * @template Container
 */
export class Engine<
  BlockType extends basicBlock<BlockType>, //每个block的类型，可以往上面加需要的属性
  DataState extends nodeState<BlockType> = nodeState<BlockType>, //单例，整体的json
  ActState extends defaultActState<BlockType, DataState> = defaultActState<
    BlockType,
    DataState
  > //单例，操作中的block与dom
> {
  source: Ref<UnwrapRef<DataState>>;
  blockMap: Map<string, BlockType>;
  oldBlockMap: Map<string, BlockType>;
  oldSource: any;
  actState: UnwrapNestedRefs<ActState>;
  snapshotList: string[];
  dataStack: DataState[] = [];
  history: any[] = [];
  isFixed: boolean = false;
  historyLength: number;
  error: Function;
  scope: EffectScope;
  allowFullHistory: boolean;
  allowCustomRecord: boolean;
  // ruleMap: Map<string, { path: string; getter: ComputeGetter }[]> = new Map();
  constructor(
    data: DataState,
    config: EngineConfig = {},
    error: Function = (msg: string) => console.error(msg)
  ) {
    // super(config);
    this.scope = effectScope();
    this.source = ref<DataState>(data);

    this.actState = reactive<any>({
      ...{
        clickBlock: null,
        hoverBlock: null,
        clickDom: null,
        hoverDom: null,
        container: this.source.value,
      },
      ...(config.actionConfig || {}),
    });

    this.error = error;
    this.snapshotList = config.snapshotList || [];

    this.blockMap = new Map();
    this.blockMap.set("1", this.source.value as any);
    this.historyLength = config.historyLength || 10;
    this.allowFullHistory = config.allowFullHistory || false;
    this.allowCustomRecord = config.allowCustomRecord || false;
  }
  // setRule(key: string, path: string, cb: ComputeGetter) {
  //   if (!this.ruleMap.has(key)) {
  //     this.ruleMap.set(key, []);
  //   }
  //   this.ruleMap.get(key)?.push({ path, getter: cb });
  // }
  fixed() {
    this.isFixed = true;
  }
  unfixed() {
    this.isFixed = false;
  }
  record(historyData: any, data?: DataState) {
    if (!this.allowCustomRecord) return;
    if (
      this.allowFullHistory &&
      data &&
      this.dataStack.length < this.historyLength
    ) {
      this.dataStack.push(cloneDeep(data));
    }
    this.history.push(historyData);
  }
  track(num?: number) {
    return this.dataStack[num ? num : this.dataStack.length - 1];
  }
  clearRecord(num?: number) {
    if (!num) {
      this.dataStack = [];
    } else {
      this.dataStack.splice(0, num);
    }
  }
  clearHistory(num?: number) {
    if (!num) {
      this.history = [];
    } else {
      this.history.splice(0, num);
    }
  }
  get data() {
    return this.source.value as DataState;
  }
  get container() {
    return this.actState.container as DataState;
  }
  get clickBlock() {
    return this.actState.clickBlock as BlockType;
  }
  get hoverBlock() {
    return this.actState.hoverBlock as BlockType;
  }
  get clickDom() {
    return this.actState.clickDom as HTMLElement;
  }

  updateContainer() {
    this.actState.container = this.source.value;
  }
  $select(Block: BlockType | string, actObj: keyof ActState = "clickBlock") {
    if (typeof Block === "string") {
      Block = (this as any).find(Block);
    }
    (this.actState as any)[actObj] = Block;
  }

  $cancel(actObj: keyof ActState | [keyof ActState] = "clickBlock") {
    if (Array.isArray(actObj)) {
      actObj.forEach((item) => {
        (this.actState as any)[item] = null;
      });
    } else {
      (this.actState as any)[actObj] = null;
    }
  }
  $update<ActKey extends keyof ActState>(
    key: ActKey,
    property: ActState[ActKey],
    actObj: keyof ActState = "clickBlock"
  ) {
    set((this.actState as any)[actObj], key, property);
  }

  $add(Block: inputBlock<BlockType>, actObj: keyof ActState = "clickBlock") {
    if (this.isFixed) {
      this.error("it has been fixed");
      return;
    }
    (Block as any).parent = (this.actState as any)[actObj];
    (this.actState as any)[actObj]?.blocks.push(Block);
  }

  $remove(id: string, actObj: keyof ActState = "clickBlock") {
    if (this.isFixed) {
      this.error("it has been fixed");
      return;
    }
    (this.actState as any)[actObj].blocks = (this.actState as any)[
      actObj
    ].blocks.filter((block: BlockType) => id !== block.uuid);
  }
  $removeAll(id: string[], actObj: keyof ActState = "clickBlock") {
    if (this.isFixed) {
      this.error("it has been fixed");
      return;
    }
    (this.actState as any)[actObj].blocks = (this.actState as any)[
      actObj
    ].blocks.filter((block: BlockType) => !id.includes(block.uuid));
  }

  $reuseShot(name: string, actObj: keyof ActState = "clickBlock") {
    (this.actState as ActState)[actObj] = {
      ...(this.actState as ActState)[actObj],
      ...(this.actState as any)[actObj].snapshot[name],
    };
  }
  $snapshot(name: string, actObj: keyof ActState = "clickBlock") {
    if (!(this.actState as any)[actObj].snapshot)
      (this.actState as any)[actObj].snapshot = {};
    (this.actState as any)[actObj].snapshot[name] = cloneDeep(
      pick((this.actState as ActState)[actObj], this.snapshotList)
    );
  }

  $selectDom(dom: HTMLElement | string, actObj: keyof ActState = "clickDom") {
    (this.actState as any)[actObj] =
      typeof dom === "string" ? document.getElementById(dom) : dom;
  }

  load(data: DataState) {
    if (this.isFixed) {
      this.error("it has been fixed");
      return;
    }
    //for json storage
    // this._initTraverse(data);
    (this.source as any).value = data;
    this.blockMap.set("1", this.source.value as any);
  }

  _create(Block: Partial<BlockType>) {
    this.blockMap.set(Block.uuid || nanoid(), Block as any);
    // this._init(Block);
    return this;
  }

  find(BlockOrID: string | BlockType) {
    if (typeof BlockOrID === "string") {
      return this.blockMap.get(BlockOrID);
    } else {
      return this.blockMap.has(BlockOrID.uuid) ? BlockOrID : false;
    }
  }

  parent(BlockOrID: string | BlockType) {
    let block = this.find(BlockOrID);
    return block && this.blockMap.get(block.parent);
  }

  add(
    Block: Partial<BlockType> | Partial<BlockType>[],
    BlockOrID?: string | BlockType
  ) {
    if (this.isFixed) {
      this.error("it has been fixed");
      return;
    }
    if (Array.isArray(Block)) {
      Block.forEach((block) => {
        this.add(block, BlockOrID);
      });
    } else {
      this._create(Block);
      if (!BlockOrID) {
        this.source.value.blocks.push(Block as any);
        Block.parent = "1";
      } else {
        if (typeof BlockOrID === "string") {
          let parent = this.blockMap.get(BlockOrID);

          if (parent) {
            Block.parent = BlockOrID;
            parent.blocks.push(Block as BlockType);
          }
        } else {
          BlockOrID.blocks.push(Block as BlockType);
          Block.parent = BlockOrID.uuid;
        }
      }
    }

    return this;
  }
  _insert(
    Block: Partial<BlockType> | Partial<BlockType>[],
    BlockOrID: string | BlockType,
    type: "before" | "after"
  ) {
    if (this.isFixed) {
      this.error("it has been fixed");
      return;
    }
    let keyBlock = this.find(BlockOrID);
    if (!keyBlock) return false;
    let parent = this.blockMap.get((keyBlock as BlockType).parent);

    (parent as BlockType).blocks.splice(
      (parent as BlockType).blocks.findIndex(
        (block) => block.uuid === (keyBlock as BlockType).uuid
      ) +
        type ===
        "before"
        ? 0
        : 1,
      0,
      Array.isArray(Block) ? { ...(Block as any) } : Block
    );
    if (Array.isArray(Block)) {
      // this.record(
      //   {
      //     type: "addGroup",
      //     node: Block,
      //     id: (parent as BlockType).uuid,
      //     timestamp: Date.now(),
      //   },
      //   this.data
      // );
      Block.forEach((block) => {
        block.parent = (parent as BlockType).uuid;
        this._create(block);
      });
    } else {
      // this.record(
      //   {
      //     type: "add",
      //     node: Block,
      //     id: (parent as BlockType).uuid,
      //     timestamp: Date.now(),
      //   },
      //   this.data
      // );
      Block.parent = (parent as BlockType).uuid;
      this._create(Block);
    }

    return this;
  }
  insertBefore(
    Block: Partial<BlockType> | Partial<BlockType>[],
    BlockOrID: string | BlockType
  ) {
    this._insert(Block, BlockOrID, "before");
  }
  insertAfter(
    Block: Partial<BlockType> | Partial<BlockType>[],
    BlockOrID: string | BlockType
  ) {
    this._insert(Block, BlockOrID, "after");
  }

  traverse(Block: BlockType, cb: (block: BlockType) => void) {
    Block.blocks.forEach((item) => {
      cb(item);
      this.traverse(item, cb);
    });
  }

  clone(Block: BlockType) {
    let cloneBlock = cloneDeep(Block);
    this.traverse(cloneBlock, (item) => {
      item.uuid = nanoid();
    });
    return cloneBlock;
  }

  remove(BlockOrID: string | BlockType) {
    if (this.isFixed) {
      this.error("it has been fixed");
      return;
    }
    let Block = this.find(BlockOrID) as BlockType;
    if (Block) {
      let parent = this.find(Block.parent) as any;
      if (parent) {
        this.traverse(Block, (block: BlockType) => {
          this.blockMap.delete(block.uuid);
        });
        let uuid = Block.uuid;
        parent.blocks = parent.blocks.filter((block: BlockType) => {
          return block.uuid !== uuid;
        });
        this.blockMap.delete(Block.uuid);
      }
    }
  }

  removeAll(BlockOrID: string | BlockType) {
    if (this.isFixed) {
      this.error("it has been fixed");
      return;
    }
    let parentBlock = this.find(BlockOrID);

    if (parentBlock) {
      parentBlock.blocks.forEach((block) => {
        this.blockMap.delete(block.uuid);
      });
      parentBlock.blocks = [];
      return this;
    }
    return this;
  }

  // watch(excludes: string[] = ["uuid", "blocks", "parent", "key"]) {
  //   this.scope.run(() => {
  //     this.oldSource = cloneDeep(this.source.value);
  //     this.oldBlockMap = cloneDeep(this.blockMap);
  //     watch(
  //       () => this.source,
  //       () => {
  //         if (this.oldSource && this.oldBlockMap) {
  //           let r: string[] = [];
  //           if (this.oldBlockMap.size > this.blockMap.size) {
  //             this.oldBlockMap.forEach((value, key) => {
  //               if (!this.blockMap.has(key)) {
  //                 r.push(key);
  //               }
  //             });
  //             this.record({ type: "delNode", r });
  //           } else {
  //             if (this.oldBlockMap.size < this.blockMap.size) {
  //               this.blockMap.forEach((_, key) => {
  //                 if (!this.oldBlockMap.has(key)) {
  //                   r.push(key);
  //                 }
  //               });
  //               this.record({ type: "addNode", r });
  //             } else {
  //               let r = diffData(
  //                 this.oldSource.blocks,
  //                 this.source.value.blocks,
  //                 excludes
  //               );
  //               if (Object.keys(r).length > 0) {
  //                 this.record({ type: "propertyChange", r });
  //               }
  //             }
  //           }
  //         }
  //         this.oldSource = cloneDeep(this.source.value);
  //         this.oldBlockMap = cloneDeep(this.blockMap);
  //       },
  //       { deep: true }
  //     );
  //   });
  // }
  unwatch() {
    this.scope.stop();
  }
}
