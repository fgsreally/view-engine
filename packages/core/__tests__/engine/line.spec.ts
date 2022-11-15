import {  describe, expect, it } from "vitest";
import { Line } from "../../engine/line";

describe("line test", () => {
  let line = new Line();
  let points = { a: { x: 1, y: 1 }, b: { x: 2, y: 2 } };
  let lineID = line.add("a", "b");

  line.setBinding((id: string) => {
    if (id in points) {
      return points[id];
    } else {
      return false;
    }
  });
  it("add line", () => {
    expect(line.lineMap.size).toBe(1);
  });
  it("find line by Node", () => {
    expect(line.findByNode({ startNode: "a" })[0]).toBe(lineID);
  });

  it("find line by line", () => {
    expect(line.findByLine(lineID)).toBeDefined();
  });

  it("del line", () => {
    delete points.a;
    line.update();
    expect(line.lineMap.size).toBe(0);
  });
});
