
export function useVis(visCb: Function, disCb: Function) {
  let event = function () {
    if (document.visibilityState === "visible") {
      visCb();
    } else {
      disCb();
    }
  };
  document.addEventListener("visibilitychange", event);
  return () => document.removeEventListener("visibilitychange", event);
}

export function useFull(fullCb: Function, disCb: Function) {
  let event = function () {
    if (document.fullscreenElement) {
      fullCb();
    } else {
      disCb();
    }
  };
  document.addEventListener("fullscreenchange", event);
  return () => document.removeEventListener("fullscreenchange", event);
}

interface MouseOptions {
  move: (e: MouseEvent) => void;
  up: (e: MouseEvent) => void;
}
export function useDrag(
  opts: MouseOptions,
  dom: Element | Document | string = document
) {
  let element: any;

  let moveEvent = (e: MouseEvent) => {
    opts.move(e);
  };
  let upEvent = (e: MouseEvent) => {
    opts.up(e);
    element.removeEventListener("mousemove", moveEvent);
    element.removeEventListener("mouseup", upEvent);
  };
  if (typeof dom === "string") {
    element = document.querySelector(dom);
  } else {
    element = dom;
  }
  element.addEventListener("mousemove", moveEvent as EventListener);
  element.addEventListener("mouseup", upEvent as EventListener);
}
