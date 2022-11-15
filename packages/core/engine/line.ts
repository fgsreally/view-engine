import { nanoid } from "nanoid";
import { lineData, pointData } from "../types/types";

export class Line {
  lineMap: Map<string, lineData>;

  canvas: HTMLCanvasElement;
  isDrawing: boolean;
  constructor(
    el: HTMLCanvasElement,
    public binding: (id: string) => pointData | false | undefined,
    public drawLine: (start: pointData, end: pointData) => void
  ) {
    this.canvas = el;
    this.lineMap = new Map();
    this.isDrawing = false;
  }
  setBinding(cb: (id: string) => pointData | false | undefined) {
    this.binding = cb;
    return this;
  }
  setCanvas(el: HTMLCanvasElement) {
    this.canvas = el;
    return this;
  }
  setDrawLine(cb: (start: pointData, end: pointData) => void) {
    this.drawLine = cb;
    return this;
  }

  add(startNode: string, endNode: string) {
    let uuid = nanoid();
    this.lineMap.set(uuid, { startNode, endNode });
    return uuid;
  }

  findByLine(lineID: string) {
    return this.lineMap.get(lineID);
  }
  findByNode(cond: { startNode?: string; endNode?: string }) {
    //return lineID
    let ret: string[] = [];
    for (let i of this.lineMap) {
      let isFinish: boolean = true;
      for (let j in cond) {
        if ((cond as any)[j] !== (i as any)[1][j]) {
          isFinish = false;
          break;
        }
      }
      isFinish && ret.push(i[0]);
    }
    return ret;
  }
  update() {
    if (!this.binding) throw new Error("miss binding");
    for (let i of this.lineMap) {
      if (!this.binding(i[1].startNode) || !this.binding(i[1].endNode)) {
        this.lineMap.delete(i[0]);
      }
    }
  }
  _draw() {
    if (!this.isDrawing) return;
    requestAnimationFrame(() => {
      for (let i of this.lineMap) {
        let START_POINT = this.binding(i[1].startNode);
        let END_POINT = this.binding(i[1].endNode);

        if (START_POINT && END_POINT) {
          this.drawLine(START_POINT, END_POINT);
        } else {
          this.lineMap.delete(i[0]);
        }
      }
      this._draw();
    });
  }

  draw() {
    if (!this.canvas) throw new Error("miss canvas");
    if (!this.drawLine) throw new Error("miss drawLine");
    this.isDrawing = true;
    this._draw();
  }
  stop() {
    this.isDrawing = false;
  }
}
