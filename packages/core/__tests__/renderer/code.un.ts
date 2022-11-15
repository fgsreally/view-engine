import { codeGenerator } from "../../renderer";
import { describe, expect, it } from "vitest";

interface testBlock {
  tag: string;
  classNames: string;
  blocks: testBlock[];
}
function codeService(block: testBlock) {
  return new Code(block).useTag().useProperty().useTemplate().template;
}
class Code extends codeGenerator<any> {
  useTag() {
    this.tag = this.block.tag;
    return this;
  }
  useProperty() {
    this.property += `class="${this.block.classNames}"`;

    return this;
  }
}

describe("abstract code generator", () => {
  it("basic", () => {
    let testData: testBlock = {
      tag: "div",
      classNames: "red blue",
      blocks: [],
    };
    let code = codeService(testData);
    expect(code).toEqual(`<div class="red blue"></div>`);
  });
  // it("Nested", () => {
  //   let testData: testBlock = {
  //     tag: "div",
  //     classNames: "red blue",
  //     blocks: [
  //       {
  //         tag: "p",
  //         classNames: "green",
  //         blocks: [],
  //       },
  //     ],
  //   };
  //   let code = codeService(testData);
  //   expect(code).toEqual(`<div class="red blue"><p class="green"></p></div>`);
  // });
});
