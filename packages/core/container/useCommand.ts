import { onUnmounted } from "vue";

interface defaultCommand {
  name: string;
  execute: () => { redo(): void; undo(): void };
  keyboard?: string;
  init?: () => () => void;
  pushQueue?: boolean;
}

interface commandState<Command> {
  isActive: boolean;
  current: number;
  queue: { redo: any; undo: any }[];
  commands: { [key in string]: () => void };
  commandArray: Command[];
  destroyArray: Function[];
}
export function useCommand<Command extends defaultCommand>() {
  const state: commandState<Command> = {
    isActive: true,
    current: -1, //索引、指针
    queue: [], //命令栈
    commands: {}, //映射
    commandArray: [], //所有命令
    destroyArray: [], //销毁
  };

  const registry = (command: Command) => {
    state.commandArray.push(command);
    state.commands[command.name] = () => {
      //命令名字对应执行函数
      const { redo, undo } = command.execute();
      redo();
      if (!command.pushQueue) {
        return;
      }
      let { queue, current } = state;
      if (queue.length > 0) {
        queue = queue.slice(0, current + 1);
        state.queue = queue;
      }
      queue.push({
        redo,
        undo,
      });
      state.current = current + 1;
    };
  };
  //注册我们需要的命令
  registry({
    name: "redo",
    keyboard: "ctrl+y",
    execute() {
      return {
        redo() {
          let item = state.queue[state.current + 1];
          if (item) {
            item.redo && item.redo();
            state.current++;
          }
        },
      };
    },
  } as Command);

  registry({
    name: "undo",
    keyboard: "ctrl+z",
    execute() {
      return {
        redo() {
          if (state.current === -1) return;
          let item = state.queue[state.current];
          if (item) {
            item.undo && item.undo();
            state.current--;
          }
        },
      };
    },
  } as Command);

  const keyboardEvent = (() => {
    const onKeydowm = (e: KeyboardEvent) => {
      const { ctrlKey, key } = e;
      // ctrl+z / ctrl+y
      let keyString: any = [];
      if (ctrlKey) keyString.push("ctrl");
      keyString.push(key);
      keyString = keyString.join("+");
      state.commandArray.forEach(({ keyboard, name }) => {
        if (!keyboard) return; //没有键盘事件
        if (keyboard === keyString) {
          state.commands[name]();
          e.preventDefault();
        }
      });
    };

    const init = () => {
      //初始化事件
      window.addEventListener("keydown", onKeydowm);
      return () => {
        //销毁事件
        window.removeEventListener("keydown", onKeydowm);
      };
    };
    return init;
  })();

  state.destroyArray.push(keyboardEvent());

  function initialize() {
    state.commandArray.forEach(
      (command) => command.init && state.destroyArray.push(command.init())
    );
  }

  function destroy() {
    state.isActive && state.destroyArray.forEach((fn) => fn && fn());
  }
  onUnmounted(() => {
    destroy();
  });

  return { state, registry, initialize, destroy }; //initialize after all registry
}
