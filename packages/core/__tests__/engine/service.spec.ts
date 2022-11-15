import { describe, expect, it } from "vitest";
import { createService } from "../../engine/service";

describe("createService", () => {
  it("basic", () => {
    let { addService, applyService,  } = createService(
      {
        add: (a: number, b: number) => a + b,
      },
      { type: "functional", name: ["ctx"] }
    );
    addService("test", "return add(1,1)");

    expect(applyService("test")).toEqual(2);
  });

  it("service to ctx", () => {
    let { addService, getService, applyService, addContext } = createService(
      {
        add: (a: number, b: number) => a + b,
      },
      { type: "functional", name: ["ctx"] }
    );
    addService("test", "return add(1,1)");
    addContext("test", getService("test"));
    addService("Test", "return test()");

    expect(applyService("Test")).toEqual(2);
  });
});
