import { describe, expect, it } from "vitest";
import { createFilter } from "../../engine/filter";

describe("createFilter", () => {
  it("base", () => {
    let { filter, setState } = createFilter();
    let ret = filter({
      name: "{{name}}",
      age: 17,
    });
    setState("name", "fgp");
    expect(ret.name).toBe("fgp");
  });

  it("exclude Array", () => {
    let { filter, setState } = createFilter();
    let ret = filter({
      name: ["{{name}}"],
      age: 17,
    });
    setState("name", "fgp");
    expect(ret.name).toEqual(["{{name}}"]);
  });

  it("deep", () => {
    let { filter, setState } = createFilter();
    let ret = filter({
      name: { cn: "{{name}}" },
      age: 17,
    });
    setState("name", "fgp");
    expect(ret.name.cn).toBe("fgp");
  });

  it("rules", () => {
    let { filter } = createFilter();

    let ret = filter(
      {
        name: { cn: "fgp" },
        key: "key",
      },
      [
        {
          path: "name.cn",
          getter: {
            get(v) {
              return v + "1";
            },
            set(v) {
              return v + "really";
            },
          },
        },
      ]
    );

    expect(ret.name.cn).toBe("fgp1");
    ret.name.cn = "fgs";
    expect(ret.name.cn).toBe("fgsreally1");
  });
});
