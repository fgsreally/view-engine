import { Engine } from "../../engine/node";
import { expect, describe, it } from "vitest";

describe("normal action on engine instance", () => {
  let instance = new Engine<any>(
    {
      container: {},
      blocks: [],
      testKey: "UUID",
    } as any,
    { allowCustomRecord: true }
  );

  it("root instance in blockMap", () => {
    expect((instance as any).find("1").testKey).toEqual("UUID");
  });

  it("add block to root", () => {
    instance.add({ uuid: "test1", key: "test1", blocks: [] });
    expect((instance as any).find("test1").uuid).toEqual("test1");
  });

  it("add block to specifier", () => {
    instance.add({ uuid: "test2", key: "test2", blocks: [] }, "test1");
    expect((instance as any).find("test1").blocks.length).toEqual(1);
  });

  it("remove a block", () => {
    instance.remove("test1");
    expect((instance as any).find("1").blocks.length).toEqual(0);
    expect((instance as any).find("test2")).toEqual(undefined);
  });
  // it("watch mode", async () => {
  //   instance.watch();
  //   let block: any = {
  //     uuid: "test1",
  //     key: "test1",
  //     blocks: [],
  //     name: "fgs",
  //   };
  //   instance.add(block);
  //   await nextTick();
  //   expect((instance as any).history[0].type).toEqual("addNode");
  //   instance.$select("test1");
  //   instance.clickBlock.name = "fgp";
  //   await nextTick();

  //   expect((instance as any).history[1].type).toEqual("propertyChange");
  // });
});

describe("control active block", () => {
  let instance = new Engine({ container: {}, blocks: [], testKey: "UUID" });

  instance.add({ uuid: "test1", key: "test1", blocks: [] }, "1");
  it("select a block", () => {
    instance.$select("test1");
    expect(instance.clickBlock.uuid).toEqual("test1");
  });
  it("cancel", () => {
    instance.$cancel();
    expect(instance.clickBlock).toEqual(null);
  });
});

describe("snapshot", () => {
  let instance = new Engine<any>(
    { blocks: [] },
    { snapshotList: ["class", "x"] }
  );

  instance.add(
    {
      uuid: "test1",
      key: "test1",
      blocks: [],
      x: { value: 100 },
    },
    "1"
  );
  it("snapshot store", () => {
    instance.$select("test1");
    instance.$snapshot("store");

    instance.clickBlock.x.value = 10;
    expect(instance.clickBlock.snapshot).toEqual({
      store: { x: { value: 100 } },
    });
  });
  it("snapshot reuse", () => {
    instance.$reuseShot("store");
    expect(instance.clickBlock.x).toEqual({ value: 100 });
  });
});
// describe("getter or setter", () => {
//   let instance = new Engine({ container: {}, blocks: [], testKey: "UUID" });

//   it(" shallow property", () => {
//     instance.setRule("test1", "name", {
//       get(v) {
//         return v + "s";
//       },
//       set(v) {
//         return v + "s";
//       },
//     });
//     instance.add(
//       {
//         uuid: "test1",
//         key: "test1",
//         blocks: [],
//         name: "fgs",
//       } as any,
//       "1"
//     );

//     expect((instance as any).find("test1").name).toEqual("fgss");

//     (instance as any).find("test1").name = "fgp";
//     expect((instance as any).find("test1").name).toEqual("fgpss");
//   });

//   it("deep property", () => {
//     instance.setRule("test2", "prop.a", {
//       get(v) {
//         return v + 1;
//       },
//       set(v) {
//         return v + 1;
//       },
//     });
//     instance.add(
//       {
//         uuid: "test2",
//         key: "test2",
//         blocks: [],
//         prop: { a: 1 },
//       } as any,
//       "1"
//     );
//     expect((instance as any).find("test2").prop.a).toEqual(2);
//     (instance as any).find("test2").prop.a = 1;
//     expect((instance as any).find("test2").prop.a).toEqual(3);
//   });
// });
