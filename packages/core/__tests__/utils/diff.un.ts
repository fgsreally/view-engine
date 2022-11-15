// import { expect, test } from "vitest";
// import { applyDiff, diffData } from "../../utils/diff";

// test("diff nodes and apply diff", () => {
//   let block1 = {
//     parent: "1",
//     uuid: "10",
//     class: ["a", "b", "c"],
//     blocks: [
//       {
//         parent: "10",
//         uuid: "20",
//         class: ["a", "b", "c"],
//         blocks: [],
//         data: { test: 3 },
//         name: "a",
//       },
//     ],
//     name: "a",
//     data: { test: 4 },
//   };
//   let block2 = {
//     parent: "1",
//     uuid: "10",
//     class: ["a", "b", "d", "e"],
//     blocks: [
//       {
//         parent: "10",
//         uuid: "20",
//         class: ["a", "c"],
//         blocks: [],
//         name: "a",
//         data: { test: 2 },
//       },
//     ],
//     name: "f",
//     data: { test: 5 },
//   };
//   let diff = diffData([block1], [block2]);
//   expect(diff).toEqual({
//     "10": [
//       { class: { "2": "d", "3": "e" } },
//       { name: "f" },
//       { data: { test: 5 } },
//     ],
//     "20": [{ class: { "1": "c" } }, { data: { test: 2 } }],
//   });
//   applyDiff(block1, diff["10"]);
//   applyDiff(block1.blocks[0], diff["20"]);
//   expect(block1).toEqual(block2)
// });
