import {
  defaultRegisterComponent,
  defaultRegisterModule,
} from "../types/types";
import { reactive } from "vue";
export let allComponentsList: any = reactive(new Map());
export let allModulesList: any = reactive(new Map());

export function getComponent<
  RegisterComponent extends defaultRegisterComponent
>(key?: string) {
  if (key)
    return (allComponentsList as Map<string, RegisterComponent>).get(key);
  return allComponentsList as Map<string, RegisterComponent>;
}

export function getModule<RegisterModule extends defaultRegisterModule>(
  key?: string
) {
  if (key) return (allModulesList as Map<string, RegisterModule>).get(key);
  return allModulesList as Map<string, RegisterModule>;
}

export function createEditorConfig<
  RegisterComponent extends defaultRegisterComponent,
  RegisterModule extends defaultRegisterModule
>(err?: Function) {
  //分区注册
  const componentList: Map<string, RegisterComponent> = reactive(new Map());
  const moduleList: Map<string, RegisterModule> = reactive(new Map());
  return {
    componentList,
    moduleList,

    cancel: (key: string) => {
      const moduleOrComponent = allModulesList.get(key);
      if (moduleOrComponent.type === "component") {
        componentList.delete(key);
        allComponentsList.delete(key);
      } else {
        moduleList.delete(key);
        allModulesList.delete(key);
      }
    },
    register: (module: RegisterComponent | RegisterModule) => {
      if (module.type === "component") {
        componentList.set(module.key, module);
        if (allComponentsList.has(module.key)) {
          err?.(module.key);
          return;
        }
        allComponentsList.set(module.key, module);
      } else {
        moduleList.set(module.key, module);
        if (allModulesList.has(module.key)) {
          err?.(module.key);
          return;
        }
        allModulesList.set(module.key, module);
      }
    },
  };
}
//example:
// export function registerComponent<RegisterModule extends defaultRegisterModule>(
//   RegisterCenter: registerCenter<RegisterModule>,
//   Comp: Component,
//   label: string,
//   key: string,
//   type: string,
//   propsData = {},
//   slotSet = ["default"]
// ) {RegisterCenter.register(....)}
