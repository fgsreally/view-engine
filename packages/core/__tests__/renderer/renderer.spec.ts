import { describe, it, expect } from "vitest";
import { Renderer } from "../../renderer";
import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";

const Comp = defineComponent({
  template: `<div data-test="todo">{{a}}</div>`,
  props: { a: Number },
  setup: () => {},
});

let block: any = {
  uuid: "1",
  key: "test1",
  propsData: { a: 1 },
  blocks: [],
  vIf: { required: true, value: false },
  vFor: { required: true, value: 3 },
};


describe("Renderer test", () => {
  it("base render", () => {
    let renderer = new Renderer(block, Comp);

    const RealBlock = defineComponent({ render: () => renderer.main().exec() });
    const wrapper = mount(RealBlock);
    const todo = wrapper.get('[data-test="todo"]');

    expect(todo.text()).toBe("1");
    // expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
  });
  it("wrap render(v-if)", () => {
    let renderer = new Renderer(block, Comp);

    const RealBlock = defineComponent({
      render: () => renderer.main().vIf().exec(),
    });
    const wrapper = mount(RealBlock);
    expect(wrapper.find('[data-test="todo"]').exists()).toBe(false);
  });

  it("wrap render(v-for)", () => {
    let renderer = new Renderer(block, Comp);
    const RealBlock = defineComponent({
      render: () => renderer.main().vFor().exec(),
    });
    const wrapper = mount(RealBlock);
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(3);
  });

  it("wrap render(id/class)", () => {
    let renderer = new Renderer(block, Comp);
    const RealBlock = defineComponent({
      render: () => renderer.main().useClass("testClass").exec(),
    });
    const wrapper = mount(RealBlock);
    expect(wrapper.get('[data-test="todo"]').classes()).toContain("testClass");
  });
});
