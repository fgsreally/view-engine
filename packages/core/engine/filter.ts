import { get, set } from "lodash-es";
import { reactive } from "vue";
import { ComputeGetter } from "../types/types";
export let COMPUTE_RE = /^{{(.*)}}$/;

type Rule = {
  path: string;
  getter: ComputeGetter;
}[];

export function createFilter<ContextType extends { state: any }>(
  initState: any = {},
  option: { re?: RegExp; exclude?: string[] }={}
) {
  option = Object.assign(
    {
      re: COMPUTE_RE,
      exclude: [],
    },
    option
  );
  let ctx = reactive<ContextType>({ state: initState || {} } as any);
  const store: { [key: string]: any } = {};
  function applyRule(obj: any, rules?: Rule) {
    rules?.forEach((rule) => {
      let path = rule.path.split(".");
      let key = path.pop() as string;
      let getValue = () => get(obj, path.join(".") + "_" + key);
      let setValue = (v: any) => set(obj, path.join(".") + "_" + key, v);
      setValue(get(obj, rule.path));
      Object.defineProperty(path.length ? get(obj, path.join(".")) : obj, key, {
        set: (v) => {
          if (!rule.getter.set) {
            setValue(v);
          } else {
            let ret = rule.getter.set(v);
            if (ret) {
              setValue(ret);
            }
          }
        },
        get: () => {
          if (!rule.getter.get) {
            return getValue();
          } else {
            return rule.getter.get(getValue());
          }
        },
      });
    });
  }

  function traverse(obj: any) {
    for (let i in obj) {
      if (Array.isArray(obj[i]) || (option as any).exclude.includes(i))
        continue;
      if (typeof obj[i] === "object" && obj[i]) {
        traverse(obj[i]);
      }
      if (typeof obj[i] === "string" && (option as any).re.test(obj[i])) {
        let body = obj[i].match(option.re)[1];
        Object.defineProperty(obj, i, {
          get() {
            let ret = new Function(...Object.keys(ctx.state), "return " + body)(
              ...Object.entries(ctx.state).map((item) => item[1])
            );
            return ret;
          },
        });
      }
    }
  }
  function filter(obj: any, rules?: Rule) {
    applyRule(obj, rules);
    traverse(obj);
    return obj;
  }
  function setState(key: string, value: any) {
    ctx.state[key] = value;
  }

  function setStore(key: string) {
    store[key] = ctx.state;
  }

  function init(params: any) {
    ctx.state = params || initState || {};
  }
  return { filter, ctx, init, setState, setStore, store };
}
