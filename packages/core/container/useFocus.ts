import { computed, ref, reactive, UnwrapNestedRefs, Ref } from "vue";

export interface focusBlock {
  focus: boolean;
  clientX: number;
  clientY: number;
  x: number;
  y: number;
  top: { value: number };
  left: { value: number };
  width: { value: number };
  height: { value: number };
}

interface focusBoundary {
  isActive: boolean;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
}

interface ActionHook {
  boundarystart?: () => void;
  boundaryend?: () => void;
  movestart?: () => void;
  moveend?: () => void;
}

interface FocusOpts<BlockType> {
  otherBlocks?: BlockType[];
  container:
    | { width: { value: number }; height: { value: number } }
    | UnwrapNestedRefs<{ width: { value: number }; height: { value: number } }>;
}

export function useFocus<BlockType extends focusBlock>(
  data: Set<BlockType>,
  options: FocusOpts<BlockType>,
  cb: ActionHook = {}
) {
  let state: "IDLE" | "SELECT" = "IDLE";
  const focusData = computed(() => {
    let focus: BlockType[] = [];
    let unfocused: BlockType[] = [];
    for (let block of data) {
      (block.focus ? focus : unfocused).push(block);
    }

    return {
      focus,
      unfocused,
    };
  });

  const clearBlockFocus = () => {
    for (let block of data) {
      block.focus = false;
    }
  };
  const lastSelectBlock = ref(null as any) as Ref<BlockType>;

  let focusBoundary = reactive<focusBoundary>({
    isActive: false,
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
  });
  const boundaryMousemove = (e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    focusBoundary.endPoint.x = x;
    focusBoundary.endPoint.y = y;
    e.stopPropagation();
    e.preventDefault();
  };
  const boundaryMouseup = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    focusBoundary.isActive = false;
    let minX: number, minY: number, maxX: number, maxY: number;
    if (focusBoundary.startPoint.x > focusBoundary.endPoint.x) {
      minX = focusBoundary.endPoint.x;
      maxX = focusBoundary.startPoint.x;
    } else {
      maxX = focusBoundary.endPoint.x;
      minX = focusBoundary.startPoint.x;
    }
    if (focusBoundary.startPoint.y > focusBoundary.endPoint.y) {
      minY = focusBoundary.endPoint.y;
      maxY = focusBoundary.startPoint.y;
    } else {
      maxY = focusBoundary.endPoint.y;
      minY = focusBoundary.startPoint.y;
    }
    if (state === "SELECT") {
      state = "IDLE";
    }

    for (let block of data) {
      if (
        block.clientX > minX &&
        block.clientX < maxX &&
        block.clientY > minY &&
        block.clientY < maxY
      ) {
        block.focus = true;
        if (state === "IDLE") {
          state = "SELECT";
        }
      } else {
        block.focus = false;
      }
    }
    cb.boundaryend?.();

    document.removeEventListener("mousemove", boundaryMousemove);
    document.removeEventListener("mouseup", boundaryMouseup);
    document.removeEventListener("visibilitychange", boundaryMouseup as any);
  };
  const boundaryMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    focusBoundary.isActive = true;
    const { clientX: x, clientY: y } = e;
    focusBoundary.startPoint.x = focusBoundary.endPoint.x = x;
    focusBoundary.startPoint.y = focusBoundary.endPoint.y = y;

    cb.boundarystart?.();

    document.addEventListener("visibilitychange", boundaryMouseup as any);
    document.addEventListener("mousemove", boundaryMousemove);
    document.addEventListener("mouseup", boundaryMouseup);
  };

  const blockMouseDown = (e: MouseEvent, block: BlockType) => {
    e.preventDefault();
    e.stopPropagation();

    if (state === "IDLE") {
      if (!block.focus) {
        clearBlockFocus();
        block.focus = true;
      } else {
        block.focus = false;
      }
    } else {
      state = "IDLE";
      if (focusData.value.focus.length >= 1) {
        block.focus = true;
      } else {
        block.focus = !block.focus;
      }
    }

    lastSelectBlock.value = block;
    mousedown(e);
  };

  let dragState: any = {
    startX: 0,
    startY: 0,
    dragging: false,
  };
  let markLine = reactive({
    x: null,
    y: null,
  });

  const mousemove = (e:MouseEvent) => {
    let { clientX: moveX, clientY: moveY } = e;
    if (!dragState.dragging) {
      dragState.dragging = true;
      cb?.movestart?.();
    }
    let left = moveX - dragState.startX + dragState.startLeft;
    let top = moveY - dragState.startY + dragState.startTop; //偏移距离
    let y = null;
    let x = null;

    for (let i = 0; i < dragState["lines"].y.length; i++) {
      const { top: t, showTop: s } = dragState["lines"].y[i];
      if (Math.abs(t - top) < 5) {
        y = s;
        moveY = dragState.startY - dragState.startTop + t;
        break;
      }
    }
    for (let i = 0; i < dragState["lines"].x.length; i++) {
      const { left: l, showLeft: s } = dragState["lines"].x[i]; //获取每一根线
      if (Math.abs(l - left) < 5) {
        x = s; //线要现实的位置
        moveX = dragState.startX - dragState.startLeft + l;

        break;
      }
    }
    if (x) markLine.x = x;

    if (y) markLine.y = y;
    let durX = moveX - dragState.startX;
    let durY = moveY - dragState.startY;
    focusData.value.focus.forEach((block, idx) => {
      block.top.value = dragState.startPos[idx].top + durY;
      block.left.value = dragState.startPos[idx].left + durX;
    });
  };
  const mouseup = () => {
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
    markLine.x = null;
    markLine.y = null;
    for (let block of data) {
      if (
        block.left.value >= 0 &&
        block.left.value + block.width.value <= options.container.width.value &&
        block.top.value >= 0 &&
        block.top.value + block.height.value <= options.container.height.value
      )
        data.delete(block);
    }

    if (dragState.dragging) {
      cb?.moveend?.();
    }
  };

  const mousedown = (e:MouseEvent) => {
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: lastSelectBlock.value?.left,
      startTop: lastSelectBlock.value?.top,
      startPos: focusData.value.focus.map(({ top, left }) => ({
        top: top.value,
        left: left.value,
      })),
      lines: (() => {
        const { width: BWidth, height: BHeight } = lastSelectBlock.value;
        let lines: any = {
          x: [],
          y: [],
        };
        const { unfocused } = focusData.value;

        [
          ...unfocused,
          ...(options.otherBlocks ? options.otherBlocks : []),
        ].forEach((block) => {
          const {
            top: ATop,
            left: ALeft,
            width: AWidth,
            height: AHeight,
          } = block;

          lines.y.push({
            showTop: ATop.value,
            top: ATop.value,
          });
          lines.y.push({
            showTop: ATop.value,
            top: ATop.value - BHeight.value,
          });

          lines.y.push({
            showTop: ATop.value + AHeight.value / 2,
            top: ATop.value + AHeight.value / 2 - BHeight.value / 2,
          }); //对中
          lines.y.push({
            showTop: ATop.value + AHeight.value,
            top: ATop.value + AHeight.value,
          });
          lines.y.push({
            showTop: ATop.value + AHeight.value,
            top: ATop.value + AHeight.value - BHeight.value,
          });
          lines.x.push({
            showLeft: ALeft.value,
            left: ALeft.value,
          });
          lines.x.push({
            showLeft: ALeft.value + AWidth.value,
            left: ALeft.value + AWidth.value,
          });
          lines.x.push({
            showLeft: ALeft.value + AWidth.value / 2,
            left: ALeft.value + AWidth.value / 2 - BWidth.value / 2,
          });
          lines.x.push({
            showLeft: ALeft.value + AWidth.value,
            left: ALeft.value + AWidth.value - BWidth.value,
          });
          lines.x.push({
            showLeft: ALeft.value,
            left: ALeft.value - BWidth.value,
          }); //左对右
        });
        return lines;
      })(),
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  return {
    blockMouseDown,
    clearBlockFocus,
    markLine,
    boundaryMouseDown,
    focusBoundary,
  };
}
