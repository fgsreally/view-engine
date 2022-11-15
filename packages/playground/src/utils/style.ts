import { SizeType } from "@view-engine/core";
import { instance } from "../js/init";
export function changeStyleVar(name: string, value: any) {
  document.documentElement.style.setProperty(`--${name}`, value);
}

export function changeStyleValue(name: string, value: string) {
  document.documentElement.style[name as any] = value;
}

export function toPx(block: any, key: string): number {
  let property: { size: SizeType; value: number } = block[key];
  switch (property.size) {
    case "rem":
      return instance.container.fontSize * property.value;
    case "vw":
      return (instance.container.width * property.value) / 100;
    case "vh":
      return (instance.container.height * property.value) / 100;
    case "%":
      return (toPx(instance.parent(block), key) * property.value) / 100;
    default:
      return property.value;
  }
}

export function changeSize(block: any, key: string, to: SizeType) {
  if (block[key].size === to) return;
  let px = toPx(block, key);
  block[key].size = to;
  switch (to) {
    case "rem":
      return (block[key].value = instance.container.fontSize * px);
    case "vw":
      return (block[key].value = (instance.container.width * px) / 100);
    case "vh":
      return (block[key].value = (instance.container.height * px) / 100);
    case "%":
      return (block[key].value =
        (toPx(instance.parent(block), key) * px) / 100);
    default:
      return (block[key].value = px);
  }
}
