import { Ref } from "vue";
import { defaultRegisterModule } from "../types/types";

interface DragCB<RegisterModule> {
  drop?: (opts: { e: DragEvent; module: RegisterModule }) => void;
  dragstart?: (e?: DragEvent) => void;
  dragend?: (e?: DragEvent) => void;
}
export function useMenuDragger<RegisterModule extends defaultRegisterModule>(
  container: Ref,
  cb?: DragCB<RegisterModule>
) {
  let currentModule: any = null;

  const dragenter = (e: DragEvent) => {
    (e.dataTransfer as any).dropEffect = "move";
  };
  const dragover = (e: DragEvent) => {
    e.preventDefault();
  };
  const dragleave = (e: DragEvent) => {
    (e.dataTransfer as any).dropEffect = "none";
  };
  const drop = (e: DragEvent) => {
    cb?.drop?.({ module: currentModule, e });
    currentModule = null;
  };
  let containerDom: any = container;

  const dragstart = (e: DragEvent, module: RegisterModule) => {
    containerDom.value.addEventListener("dragenter", dragenter);
    containerDom.value.addEventListener("dragover", dragover);
    containerDom.value.addEventListener("dragleave", dragleave);
    containerDom.value.addEventListener("drop", drop);
    currentModule = module;
    cb?.dragstart?.(e);
  };
  const dragend = (e: DragEvent) => {
    containerDom.value.removeEventListener("dragenter", dragenter);
    containerDom.value.removeEventListener("dragover", dragover);
    containerDom.value.removeEventListener("dragleave", dragleave);
    containerDom.value.removeEventListener("drop", drop);
    cb?.dragend?.(e);
  };
  return {
    dragstart,
    dragend,
  };
}
