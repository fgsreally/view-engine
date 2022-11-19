import { reactive } from "vue";

export function createService<
  ServiceContextType extends {
    services: { [key: string]: string };
    context: { [key: string]: any };
  }
>(
  initCtx: { [key in string]: any } = {},
  opts: { type: "standard" | "functional" | "class"; name: string[] } = {
    type: "standard",
    name: ["ctx", "addon"],
  }
) {
  let ctx = reactive<ServiceContextType>({
    context: initCtx || {},
    services: {},
  } as any);

  const serviceStore: { [key: string]: any } = {};
  const contextStore: { [key: string]: any } = {};

  let hydrate = (externals: { [key in string]: any }) => {
    if (opts.type === "functional") {
      for (let i in externals) {
        if (i in ctx.context) throw new Error(`已存在${i}(${opts.type})`);
      }
    }
    if (opts.type === "standard") {
      if ("ctx" in externals)
        throw new Error(`externals 中不能有ctx属性(${opts.type})`);
    }
    switch (opts.type) {
      case "standard":
        return [
          [opts.name[0]],
          Object.keys(externals),
          [ctx.context],
          Object.values(externals),
        ];
      case "functional":
        return [
          Object.keys(ctx.context),
          Object.keys(externals),
          Object.values(ctx.context),
          Object.values(externals),
        ];
      case "class":
        return [[opts.name[0]], [opts.name[1]], [ctx.context], [externals]];
    }
  };

  let addService = (key: string, content: string) => {
    ctx.services[key] = content;
  };

  let isValid = (content: string, externals: { [key in string]: any } = {}) => {
    try {
      let params = hydrate(externals);
      new Function(...params[0], ...params[1], content)(
        ...params[2],
        ...params[3]
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  let addContext = (key: string, value: any) => {
    ctx.context[key] = value;
  };
  let delContext = (key: string) => {
    delete ctx.context[key];
  };

  let getService = (key: string, externals: { [key in string]: any } = {}) => {
    if (!ctx.services[key]) return;

    let params = hydrate(externals);
    return () =>
      new Function(...params[0], ...params[1], ctx.services[key])(
        ...params[2],
        ...params[3]
      );
  };

  let delService = (key: string) => {
    delete ctx.services[key];
  };
  let applyService = (
    key: string,
    externals: { [key in string]: any } = {}
  ) => {
    if (!ctx.services[key]) return;

    let params = hydrate(externals);
    return new Function(...params[0], ...params[1], ctx.services[key])(
      ...params[2],
      ...params[3]
    );
  };

  let initContext = (params?: any) => {
    ctx.context = params || initCtx || {};
  };
  let initService = (params?: any) => {
    ctx.services = params || {};
  };

  let init = () => {
    initContext();
    initService();
  };

  let storeService = (key: string) => {
    serviceStore[key] = ctx.services;
  };

  let storeContext = (key: string) => {
    contextStore[key] = ctx.context;
  };

  let applyStore = (key: string, category: "services" | "context") => {
    let store = category === "services" ? serviceStore : contextStore;
    ctx[category] = store[key];
  };
  return {
    storeService,
    storeContext,
    applyStore,
    isValid,
    addService,
    ctx,
    delService,
    applyService,
    getService,
    addContext,
    delContext,
    initService,
    init,
    initContext,
  };
}
