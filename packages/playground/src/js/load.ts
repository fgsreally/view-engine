export async function load(url: string) {
  const {
    default: component,
    addon,
    css,
  } = await import(/* @vite-ignore */ url);
  loadCss(css);
  let { test: propsData } = await addon();
  return { component, propsData,css };
}

export async function loadJS(url: string) {
  return await import(/* @vite-ignore */ url);
}

export function loadCss(url: string) {
  let css = document.createElement("link");
  css.href = url;
  css.rel = "stylesheet";
  css.type = "text/css";
  document.head.appendChild(css);
}
